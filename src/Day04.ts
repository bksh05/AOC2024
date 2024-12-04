import { AdventOfCode } from "./AdventOfCode";

export class Day04 extends AdventOfCode<string[]> {
  protected part1(): number {
    let count = 0;
    const row = this.data.length;
    const col = this.data[0].length;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (this.data[i][j] === "X") {
          // CASE 1: Top
          if (this.data[i - 1][j] === "M" && this.data[i - 2][j] === "A" && this.data[i - 3][j] === "S") {
            count += 1;
          }

          // CASE 2: Top right
          if (this.data[i - 1][j + 1] === "M" && this.data[i - 2][j + 2] === "A" && this.data[i - 3][j + 3] === "S") {
            count += 1;
          }

          // CASE 3: Left
          if (this.data[i][j + 1] === "M" && this.data[i][j + 2] === "A" && this.data[i][j + 3] === "S") {
            count += 1;
          }

          // CASE 4: Down right
          if (this.data[i + 1][j + 1] === "M" && this.data[i + 2][j + 2] === "A" && this.data[i + 3][j + 3] === "S") {
            count += 1;
          }

          // CASE 5: Down
          if (this.data[i + 1][j] === "M" && this.data[i + 2][j] === "A" && this.data[i + 3][j] === "S") {
            count += 1;
          }

          // CASE 6: Down left
          if (this.data[i + 1][j - 1] === "M" && this.data[i + 2][j - 2] === "A" && this.data[i + 3][j - 3] === "S") {
            count += 1;
          }

          // CASE 7: Left
          if (this.data[i][j - 1] === "M" && this.data[i][j - 2] === "A" && this.data[i][j - 3] === "S") {
            count += 1;
          }

          // CASE 8: Top right
          if (this.data[i - 1][j - 1] === "M" && this.data[i - 2][j - 2] === "A" && this.data[i - 3][j - 3] === "S") {
            count += 1;
          }
        }
      }
    }
    return count;
  }

  protected part2(): number {
    let count = 0;
    const row = this.data.length;
    const col = this.data[0].length;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (this.data[i][j] === "A") {
          if (this.data[i - 1][j - 1] === "M" && this.data[i + 1][j + 1] === "S") {
            if (this.data[i - 1][j + 1] === "M" && this.data[i + 1][j - 1] === "S") {
              count += 1;
            } else if (this.data[i - 1][j + 1] === "S" && this.data[i + 1][j - 1] === "M") {
              count += 1;
            }
          } else if (this.data[i - 1][j - 1] === "S" && this.data[i + 1][j + 1] === "M") {
            if (this.data[i - 1][j + 1] === "S" && this.data[i + 1][j - 1] === "M") {
              count += 1;
            } else if (this.data[i - 1][j + 1] === "M" && this.data[i + 1][j - 1] === "S") {
              count += 1;
            }
          }
        }
      }
    }
    return count;
  }

  protected parseData(input: string): string[] {
    let lines = input.split("\n");
    lines = lines.map((line) => "...." + line + "....");
    const padding = new Array(lines[0].length).fill(".").join("");
    lines = [padding, padding, padding, padding, ...lines, padding, padding, padding, padding];
    return lines;
  }
}
