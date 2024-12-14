import { AdventOfCode } from "./AdventOfCode";

interface Instruction {
  Ax: number;
  Ay: number;
  Bx: number;
  By: number;
  X: number;
  Y: number;
}

export class Day13 extends AdventOfCode<Instruction[]> {
  private calculateNumberOfTokenRequired(Ax: number, Ay: number, Bx: number, By: number, X: number, Y: number) {
    const b = (Y * Ax - X * Ay) / (By * Ax - Ay * Bx);
    const a = (X - Bx * b) / Ax;
    if (Number.isInteger(a) && Number.isInteger(b)) {
      return a * 3 + b;
    }
    return 0;
  }

  protected part1(): number {
    let totalTokens = 0;
    this.data.forEach((instruction) => {
      totalTokens += this.calculateNumberOfTokenRequired(
        instruction.Ax,
        instruction.Ay,
        instruction.Bx,
        instruction.By,
        instruction.X,
        instruction.Y
      );
    });
    return totalTokens;
  }

  protected part2(): number {
    let totalTokens = 0;
    this.data.forEach((instruction) => {
      totalTokens += this.calculateNumberOfTokenRequired(
        instruction.Ax,
        instruction.Ay,
        instruction.Bx,
        instruction.By,
        instruction.X + 10000000000000,
        instruction.Y + 10000000000000
      );
    });
    return totalTokens;
  }

  protected parseData(input: string): Instruction[] {
    return input.split("\r\n\r\n").map((ele) => {
      const instructions = ele.split("\r\n");
      return instructions.reduce((acc: Instruction, ele) => {
        if (ele.includes("Button A:")) {
          const result = Array.from(ele.matchAll(/[0-9]+/g));
          acc.Ax = +result[0][0];
          acc.Ay = +result[1][0];
        } else if (ele.includes("Button B:")) {
          const result = Array.from(ele.matchAll(/[0-9]+/g));
          acc.Bx = +result[0][0];
          acc.By = +result[1][0];
        } else if (ele.includes("Prize")) {
          const result = Array.from(ele.matchAll(/[0-9]+/g));
          acc.X = +result[0][0];
          acc.Y = +result[1][0];
        }
        return acc;
      }, {} as Instruction);
    });
  }
}
