import RAM from "./RAM";

export default class Register {
  constructor(elements) {
    this.elements = elements;
    this.initValues();
  }

  initValues() {
    this.ram = RAM.getInstance();
  }

  getCodeBin() {
    return this.elements[0].textContent;
  }
  getCodeDec() {
    return this.toDec(this.elements[0].textContent);
  }

  getA1Bin() {
    return this.elements[1].textContent;
  }
  getA1Dec() {
    return this.toDec(this.elements[1].textContent);
  }

  getA2Bin() {
    return this.elements[2].textContent;
  }
  getA2Dec() {
    return this.toDec(this.elements[2].textContent);
  }

  getA3Bin() {
    return this.elements[3].textContent;
  }
  getA3Dec() {
    return this.toDec(this.elements[3].textContent);
  }

  getValueBin() {
    return Array.from(this.elements)
      .map((e) => e.textContent)
      .join("");
  }
  getValueDec() {
    return this.toDec(this.getValueBin());
  }

  setValueBin(valueBin) {
    this.elements[0].textContent = valueBin.slice(0, 3);
    for (let i = 1; i < this.elements.length; i++) {
      const len = 4;
      const start = i * 4 - 1;
      this.elements[i].textContent = valueBin.slice(start, start + len);
    }
  }
  setValueDec(valueDec) {
    const binary = this.toBin(valueDec, 15);
    this.setValueBin(binary);
  }
  setValueCell(cell) {
    this.setValueBin(cell.getValueBin());
  }

  resetValues() {
    for (let i = 0; i < 4; i++) {
      this.elements[i].textContent = this.toBin(0, i === 0 ? 3 : 4);
    }
  }

  toDec(valueBin) {
    return parseInt(valueBin, 2);
  }
  toBin(valueDec, length = 4) {
    return valueDec.toString(2).padStart(length, 0);
  }
}
