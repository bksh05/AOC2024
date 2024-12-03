import { AdventOfCode } from "./AdventOfCode";

export class Day03 extends AdventOfCode<string> {
  private static readonly numberRegex = /[0-9]{1,3}/g;
  private static readonly mulRegex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
  private static readonly doRegex = /do\(\)/g;
  private static readonly doNotRegex = /don't\(\)/g;

  private compute(mulCommand: string): number {
    const numbers = mulCommand.match(Day03.numberRegex);
    return numbers ? +numbers[0] * +numbers[1] : 0;
  }

  protected part1(): number {
    return this.data
      .split("\n")
      .flatMap((line) => [...line.matchAll(Day03.mulRegex)])
      .reduce((sum, match) => sum + this.compute(match[0]), 0);
  }

  protected part2(): number {
    let solution = 0;
    this.data.split("\n").forEach((line) => {
      const instructions = [
        ...line.matchAll(Day03.mulRegex),
        ...line.matchAll(Day03.doRegex),
        ...line.matchAll(Day03.doNotRegex),
      ].sort((a, b) => a.index - b.index);

      let shouldMultiply = true;
      instructions.forEach(({ 0: command }) => {
        if (command.startsWith("mul(") && shouldMultiply) {
          solution += this.compute(command);
        } else if (command === "do()") {
          shouldMultiply = true;
        } else if (command === "don't()") {
          shouldMultiply = false;
        }
      });
    });

    return solution;
  }

  protected parseData(input: string): string {
    return input.replace(/\n/g, "");
  }
}
