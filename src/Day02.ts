import { AdventOfCode } from "./AdventOfCode";

export class Day02 extends AdventOfCode<number[][]> {
  protected parseData(input: string): number[][] {
    return input.split("\n").map((line) => line.split(" ").map(Number));
  }

  private isReportSafe(
    arr: number[],
    comparator: (a: number, b: number) => boolean,
    tolerance = 0
  ): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (!comparator(arr[i - 1], arr[i]) || ![1, 2, 3].includes(Math.abs(arr[i] - arr[i - 1]))) {
        if (tolerance === 0) return false;

        const newArr1 = arr.slice(0, i).concat(arr.slice(i + 1));
        const newArr2 = arr.slice(0, i - 1).concat(arr.slice(i));
        return (
          this.isReportSafe(newArr1, comparator, tolerance - 1) ||
          this.isReportSafe(newArr2, comparator, tolerance - 1)
        );
      }
    }
    return true;
  }

  private isIncreasing = (a: number, b: number): boolean => a <= b;
  private isDecreasing = (a: number, b: number): boolean => a >= b;

  protected part1(): number {
    return this.data.reduce(
      (sum, record) =>
        sum +
        (this.isReportSafe(record, this.isIncreasing) || this.isReportSafe(record, this.isDecreasing) ? 1 : 0),
      0
    );
  }

  protected part2(): number {
    return this.data.reduce(
      (sum, record) =>
        sum +
        (this.isReportSafe(record, this.isIncreasing, 1) || this.isReportSafe(record, this.isDecreasing, 1) ? 1 : 0),
      0
    );
  }
}
