import { AdventOfCode } from "./AdventOfCode";

export class Day07 extends AdventOfCode<string[]> {
  private evaluate(result: number, numbers: number[], target: number, allowConcatenation = false): boolean {
    if (numbers.length === 0) return result === target;
    if (result > target) return false;

    const [current, ...remaining] = numbers;

    return (
      this.evaluate(result * current, remaining, target, allowConcatenation) ||
      this.evaluate(result + current, remaining, target, allowConcatenation) ||
      (allowConcatenation && this.evaluate(Number.parseInt(`${result}${current}`), remaining, target, allowConcatenation))
    );
  }

  private solve(allowConcatenation: boolean): number {
    return this.data.reduce((sum, equation) => {
      const [target, first, ...remaining] = equation.split(" ").map((e) => Number.parseInt(e));
      return this.evaluate(first, remaining, target, allowConcatenation) ? sum + target : sum;
    }, 0);
  }

  protected part1(): number {
    return this.solve(false);
  }

  protected part2(): number {
    return this.solve(true);
  }

  protected parseData(input: string): string[] {
    return input.split("\r\n");
  }
}
