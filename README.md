# KrohaJS
## _The first generation computer emulator_

CISC - complex instruction set computing

## Info
KROHA.JS is an emulator of the Neumann machine (computer) of the first generation with CISC architecture. It support 8 instructions:

## Interface

KROHA.JS is an emulator of the Neumann machine (computer) of the first generation with CISC architecture.

The computer have 5 windows:

- The main window with memory in which the cursor is moved and data is entered.
- Information window that shows information about the current memory cell and the state of the computer.
- A help window with a brief description of the instruction and its code and hotkeys.
- Arithmetic logic unit (ALU) that shows the state of the instruction register (IR), the accumulator (AC) and the program counter (PC).
- Screen on which the specified cells are output

>The computer does not distinguish between data and instructions, the user (programmer) determines this

## Modes
The computer can work in 3 modes - automatic(auto), clock-by-clock(tact) and step-by-step(step).In automatic mode, the computer executes instructions until it encounters the HALT stop instruction. In Step mode, the computer executes 1 instruction at a time. In Tact mode, each instruction is executed clock by clock and displays what is happening on the information window

## Instructions
| Name | Code | Legend | Description |
| ------ | ------ | ------ | ------ |
| (LW) | 000 | A1 ==> A3 | Load Value into cell for address in A3|
| (ADD) | 001 | A1 + A2 ==> A3 | Add value in cell for address A1 to value in cell for address A2, result into A3|
| (DIV) | 010 | A1 / A2 ==> A3 | Divide value in cell for address A1 by value in cell for address A2, result into A3|
| (SUB) | 011 | /A1 - A2/ ==> A3 | Subtract from value in cell for address A1 value in cell for address A2, result into A3|
| (JEQ) | 100 | if A1 == A2 goto A3 | Jump to execution instruction by address A3 if values in cells by addresses A1 and A2 are equal|
| (MUL) | 101 | A1 * A2 ==> A3 | Multiply value in cell for address A1 on value in cell for address A2, result into A3|
| (JG) | 110 | if A1 > A2 goto A3 | Jump to execution instruction by address A3 if value in cell by address A1 greater than value in cell by address A2 |
| (HALT) | 111 | STOP, OUTPUT | Stop the execution of commands. Output values in cells by addresses A1, A2, A3 on screen|

>Negative values doesn't support. So you will get absolute value, sign will be omitted

## Recap
The original "Krokha" is a DOS program that is run in a DOS window. The only way to run the original program on a modern computer is to use a DOS emulator or a virtual machine. It is not convenient and in the process many problems related to the age of the software arise.

 KROHA.JS was written for educational purposes for learning JavaScript. It is based on a real program from 1995. In which the number of RAM cells was increased to 16

