import "../scss/style.scss";
import Computer from "./PC/Computer";
import PageBuilder from "./PC/pageBuilder";

new PageBuilder(3, 4, 16).buildComputer();

const inputs = document.getElementsByTagName("input");

const computer = new Computer();

const control = computer.getControl();

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  control.process(e.key);

  switch (e.key.toUpperCase()) {
    case "A":
      console.log("A");
      computer.auto();
      break;
    case "S":
      computer.step();
      break;
    case "T":
      computer.tact();
      break;
    case "E":
    case "1":
    case "0":
    case "BACKSPACE":
      computer.reset();
  }
});

for (let input of inputs) {
  input.addEventListener("click", function () {
    control.setFocusVal(parseInt(this.id.slice(1)), false);
  });
}

document
  .querySelectorAll(".btn-auto")
  .forEach((btn) => btn.addEventListener("click", () => computer.auto()));

document
  .querySelectorAll(".btn-step")
  .forEach((btn) => btn.addEventListener("click", () => computer.step()));

document
  .querySelectorAll(".btn-tact")
  .forEach((btn) => btn.addEventListener("click", () => computer.tact()));

/*
let initCode = [
  [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

for (let i = 0; i < 16; i++) {
  for (let k = 0; k < 15; k++) {
    inputs[i * 15 + k].value = initCode[i][k];
  }
}
*/
