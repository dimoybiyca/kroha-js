"use strict";
import RAM from "./RAM";
import Register from "./Register";

export default class ALU {
  static getInstance() {
    if (!this.instance) {
      this.instance = new ALU();
    }

    return this.instance;
  }

  constructor() {
    this.initValues();
  }

  initValues() {
    this.pcElement = document.querySelector("#pc");
    this.irElements = document.querySelectorAll("#rc");
    this.acElements = document.querySelectorAll("#ad");
    this.ram = RAM.getInstance();
    this.ir = new Register(this.irElements);
    this.ac = new Register(this.acElements);
  }

  getPCBin() {
    return this.pcElement.textContent;
  }
  getPCDec() {
    return parseInt(this.getPCBin(), 2);
  }
  setPCBin(valueBin) {
    this.pcElement.textContent = valueBin;
  }
  setPCDec(valueDec) {
    this.setPCBin(valueDec.toString(2).padStart(4, 0));
  }
  incPC() {
    let newPC = this.getPCDec() + 1;
    if (newPC === 16) {
      newPC = 0;
    }

    this.setPCDec(newPC);
  }

  getIR() {
    return this.ir;
  }
  initIR() {
    this.ir.setValueBin(this.ram.getByAddr(this.getPCBin()).getValueBin());
  }

  getAC() {
    return this.ac;
  }
  initAC() {
    this.ac.setValueCell(this.ram.getByAddr(this.ir.getA1Bin()));
  }

  reset() {
    this.ac.resetValues();
    this.ir.resetValues();
    this.setPCDec(0);
  }
}
