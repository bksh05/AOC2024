import { AdventOfCode } from "./AdventOfCode";

export class Day10 extends AdventOfCode<number[][]> {
  private calculateScoreAndRanking(index: number[], trailHead?: Set<string>): number {
    const [i, j] = index;
    if (this.data[i][j] === 9) {
      trailHead?.add(`${i},${j}`);
      return 1;
    }
    const nextElement = this.data[i][j] + 1;
    let final = 0;

    if (i < this.data.length - 1 && this.data[i + 1][j] === nextElement) {
      final += this.calculateScoreAndRanking([i + 1, j], trailHead);
    }
    if (i >= 1 && this.data[i - 1][j] === nextElement) {
      final += this.calculateScoreAndRanking([i - 1, j], trailHead);
    }
    if (j < this.data.length - 1 && this.data[i][j + 1] === nextElement) {
      final += this.calculateScoreAndRanking([i, j + 1], trailHead);
    }
    if (j > 0 && this.data[i][j - 1] === nextElement) {
      final += this.calculateScoreAndRanking([i, j - 1], trailHead);
    }

    return final;
  }

  protected part1(): number {
    let score = 0;
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] === 0) {
          const uniqueTrailHeads = new Set<string>();
          this.calculateScoreAndRanking([i, j], uniqueTrailHeads);
          score += uniqueTrailHeads.size;
        }
      }
    }
    return score;
  }

  protected part2(): number {
    let ranking = 0;
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] === 0) {
          ranking += this.calculateScoreAndRanking([i, j]);
        }
      }
    }
    return ranking;
  }

  protected parseData(input: string): number[][] {
    return input.split("\r\n").map((ele) => ele.split("").map((ele) => Number.parseInt(ele)));
  }
}
