import Control from "./Control";
import ALU from "./Parts/ALU";
import Info from "./Parts/Info";
import RAM from "./Parts/RAM";
import Screen from "./Parts/Screen";
import Instruction from "./Instructions/Instruction";

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
    let flag = 0;

    if (this.isHalted) {
      this.reset();
      return;
    }

    while (!this.isHalted) {
      if (flag < 5000) {
        this.executeInstruction();
        flag++;
      } else {
        this.reset();
        this.info.setStatusContent("ERROR Infinite loop");
        break;
      }
    }

    this.info.setModeContent("Auto");
  }

  step() {
    this.info.setModeContent("Step");
    if (this.isHalted) {
      this.reset();
      return;
    }

    this.executeInstruction();
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

  executeInstruction() {
    this.selectInstruction();
    if (this.instruction.execute() === -1) {
      this.processResult(-1);
    }
    this.instruction = null;
    this.control.updateUI();
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
