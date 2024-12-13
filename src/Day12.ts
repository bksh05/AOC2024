import { AdventOfCode } from "./AdventOfCode";

export class Day12 extends AdventOfCode<string[][]> {
  private calculatePerimeterAndArea(i: number, j: number, visited: Set<string>) {
    const plantType = this.data[i][j];
    let perimeter = 0;
    let area = 0;

    visited.add(`${i}_${j}`);

    if (i - 1 >= 0 && this.data[i - 1][j] === plantType) {
      // top
      if (!visited.has(`${i - 1}_${j}`)) {
        const result = this.calculatePerimeterAndArea(i - 1, j, visited);
        perimeter += result[0];
        area += result[1];
      }
    } else {
      perimeter += 1;
    }

    if (i + 1 < this.data.length && this.data[i + 1][j] === plantType) {
      // bottom

      if (!visited.has(`${i + 1}_${j}`)) {
        const result = this.calculatePerimeterAndArea(i + 1, j, visited);
        perimeter += result[0];
        area += result[1];
      }
    } else {
      perimeter += 1;
    }

    if (j - 1 >= 0 && this.data[i][j - 1] === plantType) {
      if (!visited.has(`${i}_${j - 1}`)) {
        const result = this.calculatePerimeterAndArea(i, j - 1, visited);
        perimeter += result[0];
        area += result[1];
      }
    } else {
      perimeter += 1;
    }

    if (j + 1 < this.data[0].length && this.data[i][j + 1] === plantType) {
      if (!visited.has(`${i}_${j + 1}`)) {
        const result = this.calculatePerimeterAndArea(i, j + 1, visited);
        perimeter += result[0];
        area += result[1];
      }
    } else {
      perimeter += 1;
    }

    return [perimeter, area + 1];
  }

  private calculateSidesAndArea(i: number, j: number, visited: Set<string>): number[] {
    const plantType = this.data[i][j];

    visited.add(`${i}_${j}`);
    let corners = 0;
    let area = 0;

    if (this.data[i - 1]?.[j] !== plantType && this.data[i]?.[j - 1] !== plantType) {
      corners += 1;
    }

    if (this.data[i - 1]?.[j] !== plantType && this.data[i]?.[j + 1] !== plantType) {
      corners += 1;
    }

    if (this.data[i]?.[j + 1] !== plantType && this.data[i + 1]?.[j] !== plantType) {
      corners += 1;
    }

    if (this.data[i]?.[j - 1] !== plantType && this.data[i + 1]?.[j] !== plantType) {
      corners += 1;
    }

    if (this.data[i]?.[j + 1] === plantType && this.data[i + 1]?.[j] === plantType && this.data[i + 1]?.[j + 1] !== plantType) {
      corners += 1;
    }

    if (this.data[i]?.[j - 1] === plantType && this.data[i + 1]?.[j] === plantType && this.data[i + 1]?.[j - 1] !== plantType) {
      corners += 1;
    }

    if (this.data[i - 1]?.[j] === plantType && this.data[i]?.[j - 1] === plantType && this.data[i - 1]?.[j - 1] !== plantType) {
      corners += 1;
    }

    if (this.data[i - 1]?.[j] === plantType && this.data[i]?.[j + 1] === plantType && this.data[i - 1]?.[j + 1] !== plantType) {
      corners += 1;
    }

    if (i - 1 >= 0 && this.data[i - 1][j] === plantType) {
      // top
      if (!visited.has(`${i - 1}_${j}`)) {
        const result = this.calculateSidesAndArea(i - 1, j, visited);
        corners += result[0];
        area += result[1];
      }
    }

    if (i + 1 < this.data.length && this.data[i + 1][j] === plantType) {
      // bottom

      if (!visited.has(`${i + 1}_${j}`)) {
        const result = this.calculateSidesAndArea(i + 1, j, visited);
        corners += result[0];
        area += result[1];
      }
    }

    if (j - 1 >= 0 && this.data[i][j - 1] === plantType) {
      if (!visited.has(`${i}_${j - 1}`)) {
        const result = this.calculateSidesAndArea(i, j - 1, visited);
        corners += result[0];
        area += result[1];
      }
    }

    if (j + 1 < this.data[0].length && this.data[i][j + 1] === plantType) {
      if (!visited.has(`${i}_${j + 1}`)) {
        const result = this.calculateSidesAndArea(i, j + 1, visited);
        corners += result[0];
        area += result[1];
      }
    }

    return [corners, area + 1];
  }

  protected part1(): number {
    const visited = new Set<string>();
    let sol = 0;

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data.length; j++) {
        if (!visited.has(`${i}_${j}`)) {
          const result = this.calculatePerimeterAndArea(i, j, visited);
          sol += result[0] * result[1];
        }
      }
    }

    return sol;
  }

  protected part2(): number {
    const visited = new Set<string>();
    let sol = 0;
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data.length; j++) {
        if (!visited.has(`${i}_${j}`)) {
          const result = this.calculateSidesAndArea(i, j, visited);
          sol += result[0] * result[1];
        }
      }
    }
    return sol;
  }

  protected parseData(input: string): string[][] {
    return input.split("\r\n").map((line) => line.split(""));
  }
}
