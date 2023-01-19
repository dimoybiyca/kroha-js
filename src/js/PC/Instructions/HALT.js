import Info from "../Parts/Info";
import ALU from "../Parts/ALU";
import RAM from "../Parts/RAM";
import Screen from "../Parts/Screen";

export default class HALT {
  constructor() {
    this.initValues();
  }

  initValues() {
    this.step = 1;
    this.ram = RAM.getInstance();
    this.alu = ALU.getInstance();
    this.info = Info.getInstance();
    this.screen = Screen.getInstance();
  }

  execute() {
    for (let i = 1; i < 7; i++) {
      this.executeStep(i);
    }

    return -1;
  }

  executeStep() {
    this.printStatus(this.step);

    switch (this.step) {
      case 1:
        this.alu.initIR();
        break;
      case 2:
        this.alu.incPC();
        break;
      case 3:
        this.printValue(1, this.alu.getIR().getA1Bin());
        break;
      case 4:
        this.printValue(2, this.alu.getIR().getA2Bin());
        break;
      case 5:
        this.printValue(3, this.alu.getIR().getA3Bin());
        break;
      case 6:
        return -1;
    }

    this.step++;
  }

  printValue(num, addr) {
    this.screen.printValues(num - 1, this.ram.getByAddr(addr));
  }

  printStatus(tact) {
    this.info.setStatusContent(tacts[tact]);
  }
}

const tacts = {
  1: "Read instruction at the address from the PC to IR",
  2: "Increase PC by 1 (Prepare to execute the next instruction)",
  3: "Output first number on screen",
  4: "Output second number on screen",
  5: "Output third number on screen",
  6: "HALT",
};
