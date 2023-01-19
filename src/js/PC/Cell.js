export default class Cell {
  constructor(inputs) {
    this.inputs = inputs;
    this.initValues(inputs);
  }

  initValues() {
    this.line = this.inputs.map((input) => input.value);
  }

  //Code (0 - 3)
  getCodeBin() {
    this.initValues();
    return this.line.slice(0, 3).join("");
  }
  getCodeDec() {
    return this.toDec(this.getCodeBin());
  }

  //A1 (3 - 7)
  getA1Bin() {
    this.initValues();
    return this.line.slice(3, 7).join("");
  }
  getA1Dec() {
    return this.toDec(this.getA1Bin());
  }
  setA1Bin(valueBin) {
    for (let i = 3; i < 7; i++) {
      this.inputs[i].value = valueBin[i - 3];
    }
  }
  setA1Dec(valueDec) {
    this.setA1Bin(this.toBin(valueDec));
  }

  //A2 (7 - 11)
  getA2Bin() {
    this.initValues();
    return this.line.slice(7, 11).join("");
  }
  getA2Dec() {
    return this.toDec(this.getA2Bin());
  }
  setA2Bin(valueBin) {
    for (let i = 7; i < 11; i++) {
      this.inputs[i].value = valueBin[i - 7];
    }
  }
  setA2Dec(valueDec) {
    this.setA2Bin(this.toBin(valueDec));
  }

  //A3 (11 - 15)
  getA3Bin() {
    this.initValues();
    return this.line.slice(11, 15).join("");
  }
  getA3Dec() {
    return this.toDec(this.getA3Bin());
  }
  setA3Bin(valueBin) {
    for (let i = 11; i < 15; i++) {
      this.inputs[i].value = valueBin[i - 11];
    }
  }
  setA3Dec(valueDec) {
    this.setA3Bin(this.toBin(valueDec));
  }

  //(0 - 15)
  getValueBin() {
    this.initValues();
    return this.line.join("");
  }
  getValueDec() {
    return this.toDec(this.getValueBin());
  }
  setValueBin(valueBin) {
    for (let i = 0; i < 15; i++) {
      this.inputs[i].value = valueBin.at(i);
    }
  }
  setValueDec(valueDec) {
    this.setValueBin(this.toBin(valueDec, 15));
  }
  setValueCell(cell) {
    for (let i = 0; i < 15; i++) {
      this.inputs[i].value = cell.getValueBin().at(i);
    }
  }

  toDec(valueBin) {
    return parseInt(valueBin, 2);
  }
  toBin(valueDec, length = 4) {
    return valueDec.toString(2).padStart(length, 0);
  }
}
