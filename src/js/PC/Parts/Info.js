import RAM from "./RAM";

export default class Info {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Info();
    }

    return this.instance;
  }

  constructor() {
    this.initValues();
  }

  initValues() {
    this.ram = RAM.getInstance();
    this.mode = document.querySelectorAll(".mode-content");
    this.cell = document.querySelectorAll(".cell-content");
    this.decimal = document.querySelectorAll(".decimal-content");
    this.instruction = document.querySelectorAll(".instruction-content");
    this.addresses = document.querySelectorAll(".info__col-bin");
    this.values = document.querySelectorAll(".info__col-dec");
    this.status = document.querySelectorAll(".info__status");
  }

  updateUI(addr, line) {
    this.setCellContent(addr);
    this.setDecimalContent(line);
    this.setAddressesContent(line);
    this.setInstructionContent(line);
  }

  setModeContent(mode) {
    this.mode.forEach((e) => (e.textContent = mode));
  }

  setCellContent(addr) {
    const text = addr.toString(2).padStart(4, 0);
    this.cell.forEach((e) => (e.textContent = text));
  }

  setDecimalContent(line) {
    const value = parseInt(line.join(""), 2);
    this.decimal.forEach((e) => (e.textContent = value));
  }

  setAddressesContent(line) {
    for (let i = 0; i < 3; i++) {
      const temp = 3 + i * 4;
      const addr = line.slice(temp, temp + 4).join("");

      this.addresses[i].textContent = addr;
      this.values[i].textContent = this.ram.getByAddr(addr).getValueDec();
    }
  }

  setInstructionContent(line) {
    const value = parseInt(line.slice(0, 3).join(""), 2);
    this.instruction.forEach((e) => (e.textContent = instructions[value]));
  }

  setStatusContent(text) {
    this.status.forEach((e) => (e.textContent = text));
  }
}

const instructions = {
  0: "A1 ==> A3",
  1: "A1 + A2 ==> A3",
  2: "A1 / A2 ==> A3",
  3: "|A1-A2| ==> A3",
  4: "if A1 = A2 goto A3",
  5: "A1 * A2 ==> A3",
  6: "if A1 > A2 goto A3",
  7: "HALT, OUTPUT",
};
