export default class Screen {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Screen();
    }

    return this.instance;
  }

  constructor() {
    this.initValues();
  }

  initValues() {
    this.outputs = document.querySelectorAll(".screenB");
    this.decimal = document.querySelectorAll(".screenDec");
  }

  printValues(num, cell) {
    this.outputs[num * 4].textContent = cell.getCodeBin();
    this.outputs[1 + num * 4].textContent = cell.getA1Bin();
    this.outputs[2 + num * 4].textContent = cell.getA2Bin();
    this.outputs[3 + num * 4].textContent = cell.getA3Bin();
    this.decimal[num].textContent = cell.getValueDec();
  }

  resetScreen() {
    for (let i = 0; i < 12; i++) {
      this.outputs[i].textContent = "0".padStart(i % 4 === 0 ? 3 : 4, 0);
    }
    for (let i = 0; i < 3; i++) {
      this.decimal[i].textContent = 0;
    }
  }
}
