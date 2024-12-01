import { AdventOfCode } from "./AdventOfCode";

export class Day01 extends AdventOfCode<number[][]> {
  protected parseData(input: string) {
    const line1: number[] = [];
    const line2: number[] = [];
    input.split("\n").forEach((line, index) => {
      const [num1, num2] = line.split("   ").map((num) => +num);
      line1.push(num1);
      line2.push(num2);
    });
    return [line1, line2];
  }

  protected part1(): number {
    const list1 = [...this.data[0]].sort((a, b) => a - b);
    const list2 = [...this.data[1]].sort((a, b) => a - b);
    let sum = 0;
    for (let i = 0; i < list1.length; i++) {
      sum += Math.abs(list1[i] - list2[i]);
    }
    return sum;
  }

  protected part2(): number {
    const frequencyMap = new Map<number, number>();
    this.data[1].forEach((num) => {
      if (!frequencyMap.has(num)) {
        frequencyMap.set(num, 1);
      } else {
        frequencyMap.set(num, frequencyMap.get(num)! + 1);
      }
    });

    let similarityScore = 0;
    this.data[0].forEach((num) => {
      if (frequencyMap.has(num)) {
        similarityScore += num * frequencyMap.get(num)!;
      }
    });

    return similarityScore;
  }
}
