import { AdventOfCode } from "./AdventOfCode";

export class Day11 extends AdventOfCode<number[]> {
  private cache = new Map<string, number>();

  /**
   * Split the number in to two numbers
   */
  private splitNumber(number: string) {
    const length = number.length;
    const part1 = number.slice(0, length / 2);
    const part2 = number.slice(length / 2);
    return [+part1, +part2];
  }

  /**
   * Recursive function with memoisation to calculate total number of stones generated from one single stone after n blink 
   */
  private numberOfStonesAfterBlink(stone: number, blinkCount: number): number {
    if (blinkCount === 0) {
      return 1;
    }

    const key = `${stone}_${blinkCount}`;
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    let result = 0;
    if (stone === 0) {
      result = this.numberOfStonesAfterBlink(1, blinkCount - 1);
    } else if (stone.toString().length % 2 === 0) {
      const [part1, part2] = this.splitNumber(stone.toString());
      result = this.numberOfStonesAfterBlink(part1, blinkCount - 1) + this.numberOfStonesAfterBlink(part2, blinkCount - 1);
    } else {
      result = this.numberOfStonesAfterBlink(stone * 2024, blinkCount - 1);
    }

    this.cache.set(key, result);
    return result;
  }

  protected part1(): number {
    let count = 0;
    this.data.forEach((ele) => (count += this.numberOfStonesAfterBlink(ele, 25)));
    return count;
  }

  protected part2(): number {
    let count = 0;
    this.data.forEach((ele) => {
      count += this.numberOfStonesAfterBlink(ele, 75);
    });
    return count;
  }

  protected parseData(input: string): number[] {
    return input.split(" ").map((ele) => Number.parseInt(ele));
  }
}
