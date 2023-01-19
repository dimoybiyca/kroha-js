import Info from "../Parts/Info";
import ALU from "../Parts/ALU";
import RAM from "../Parts/RAM";

export default class LW {
  constructor() {
    this.initValues();
  }

  initValues() {
    this.step = 1;
    this.ram = RAM.getInstance();
    this.alu = ALU.getInstance();
    this.info = Info.getInstance();
  }

  execute() {
    for (let i = 1; i < 5; i++) {
      this.executeStep(i);
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
        const cell = this.ram.getByAddr(this.alu.getIR().getA3Bin());
        cell.setValueBin(this.alu.getAC().getValueBin());
        return 0;
    }

    this.step++;
  }

  printStatus() {
    this.info.setStatusContent(tacts[this.step]);
  }
}

const tacts = {
  1: "Read instruction at the address from the PC to RC",
  2: "Increase PC by 1 (Prepare to execute the next instruction)",
  3: "Number for the address A1 into AC",
  4: "Write from the AC into cell for address A3",
};
