import Info from "../Info";
import ALU from "./ALU";
import RAM from "./RAM";
import Control from "../Control";
import Instruction from "./Instructions/Instruction";
import Screen from "./Screen";

export default class Computer {
  constructor(inputs) {
    this.inputs = inputs;
    this.initValues();
  }

  initValues() {
    this.ram = RAM.getInstance();
    this.alu = ALU.getInstance();
    this.info = Info.getInstance();
    this.control = Control.getInstance();
    this.screen = Screen.getInstance();
    this.instruction = null;
    this.isHalted = false;
  }

  getControl() {
    return this.control;
  }

  auto() {
    if (this.isHalted) {
      this.reset();
      return;
    }

    while (!this.isHalted) {
      this.tact();
    }
    this.info.setModeContent("Auto");
  }

  step() {
    this.info.setModeContent("Step");
    if (this.isHalted) {
      this.reset();
      return;
    }

    this.selectInstruction();
    if (this.instruction.execute() === -1) {
      this.processResult(-1);
    }
    this.instruction = null;
    this.control.updateUI();
  }

  tact() {
    this.info.setModeContent("Tact");
    if (this.isHalted) {
      this.reset();
      return;
    }

    this.selectInstruction();

    const tact = this.instruction.executeStep();

    this.processResult(tact);
    this.control.updateUI();
  }

  processResult(tact) {
    if (tact === 0) {
      this.instruction = null;
    } else if (tact === -1) {
      this.instruction = null;
      this.isHalted = true;
      this.control.removeHighlight();
    }
  }

  selectInstruction() {
    if (!this.instruction) {
      this.control.setFocusVal(this.alu.getPCDec() * 15);

      const code = this.ram.getByAddr(this.alu.getPCBin()).getCodeBin();
      this.instruction = Instruction.getInstruction(code);
    }
  }

  reset() {
    this.instruction = null;
    this.isHalted = false;
    this.info.setModeContent("Editor");
    this.info.setStatusContent("");
    this.control.removeHighlight();
    this.alu.reset();
    this.screen.resetScreen();
  }
}
