import Info from "../Parts/Info";
import ALU from "../Parts/ALU";
import RAM from "../Parts/RAM";

export default class JEQ {
  constructor() {
    this.initValues();
  }

  initValues() {
    this.step = 1;
    this.condition = false;
    this.ram = RAM.getInstance();
    this.alu = ALU.getInstance();
    this.info = Info.getInstance();
  }

  execute() {
    for (let i = 1; i < 6; i++) {
      this.executeStep();
    }
  }

  executeStep() {
    this.printStatus();

    switch (this.step) {
      case 1:
        this.alu.initIR();
        break;
      case 2:
        this.alu.incPC();
        break;
      case 3:
        this.alu.initAC();
        break;
      case 4:
        const acVal = this.alu.getAC().getValueDec();
        const a2Val = this.ram
          .getByAddr(this.alu.getIR().getA2Bin())
          .getValueDec();

        this.condition = acVal === a2Val;
        break;
      case 5:
        if (this.condition) {
          this.alu.setPCBin(this.alu.getIR().getA3Bin());
        }
        return 0;
    }

    this.step++;
  }

  printStatus() {
    if (this.condition) {
      this.info.setStatusContent(tacts[6]);
    } else {
      this.info.setStatusContent(tacts[this.step]);
    }
  }
}

const tacts = {
  1: "Read instruction at the address from the PC to IR",
  2: "Increase PC by 1 (Prepare to execute the next instruction)",
  3: "Number for the address A1 into AC",
  4: "Compare AC with value in cell by address A3",
  5: "Condition is not fulfilled, transition does not occur",
  6: "Condition complete, perform transition",
};
