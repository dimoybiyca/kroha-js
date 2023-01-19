import LW from "./LW";
import ADD from "./ADD";
import DIV from "./DIV";
import SUB from "./SUB";
import MUL from "./MUL";
import HALT from "./HALT";
import JEQ from "./JEQ";
import JG from "./JG";

export default class Instruction {
  static getInstruction(code) {
    switch (code) {
      case "000":
        return new LW();
      case "001":
        return new ADD();
      case "010":
        return new DIV();
      case "100":
        return new JEQ();
      case "011":
        return new SUB();
      case "101":
        return new MUL();
      case "110":
        return new JG();
      default:
        return new HALT();
    }
  }
}
