import { AdventOfCode } from "./AdventOfCode";

export class Day08 extends AdventOfCode<string[][]> {
  private antennasLocationByFrequency = new Map<string, number[][]>();

  private checkValidAntinode = (antinode: number[], freq: string, cols: number, rows: number) => {
    return antinode[0] >= 0 && antinode[0] < cols && antinode[1] >= 0 && antinode[1] < rows;
  };

  protected part1(): number {
    const uniquePosition = new Set();
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] !== ".") {
          if (!this.antennasLocationByFrequency.has(this.data[i][j])) {
            this.antennasLocationByFrequency.set(this.data[i][j], []);
          }
          this.antennasLocationByFrequency.get(this.data[i][j])?.push([i, j]);
        }
      }
    }

    for (let entries of this.antennasLocationByFrequency) {
      const [freq, locations] = entries;

      for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
          const [x1, y1] = locations[i];
          const [x2, y2] = locations[j];

          const dx = x2 - x1;
          const dy = y2 - y1;

          const antinode1 = [x1 - dx, y1 - dy];
          const antinode2 = [x2 + dx, y2 + dy];

          if (this.checkValidAntinode(antinode1, freq, this.data.length, this.data[0].length)) {
            uniquePosition.add(`${antinode1[0]},${antinode1[1]}`);
            this.data[antinode1[0]][antinode1[1]] = "#";
          }

          if (this.checkValidAntinode(antinode2, freq, this.data.length, this.data[0].length)) {
            uniquePosition.add(`${antinode2[0]},${antinode2[1]}`);
            this.data[antinode2[0]][antinode2[1]] = "#";
          }
        }
      }
    }

    return uniquePosition.size;
  }

  protected part2(): number {
    const uniquePosition = new Set();

    for (let entries of this.antennasLocationByFrequency) {
      const [freq, locations] = entries;

      for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
          const [x1, y1] = locations[i];
          const [x2, y2] = locations[j];

          const dx = x2 - x1;
          const dy = y2 - y1;

          let antinode1 = [x1 - dx, y1 - dy];
          let antinode2 = [x2 + dx, y2 + dy];
          uniquePosition.add(`${x1},${y1}`);
          uniquePosition.add(`${x2},${y2}`);

          while (this.checkValidAntinode(antinode1, freq, this.data.length, this.data[0].length)) {
            uniquePosition.add(`${antinode1[0]},${antinode1[1]}`);
            antinode1 = [antinode1[0] - dx, antinode1[1] - dy];
          }

          while (this.checkValidAntinode(antinode2, freq, this.data.length, this.data[0].length)) {
            uniquePosition.add(`${antinode2[0]},${antinode2[1]}`);
            antinode2 = [antinode2[0] + dx, antinode2[1] + dy];
          }
        }
      }
    }

    return uniquePosition.size;
  }

  protected parseData(input: string): string[][] {
    return input.split("\r\n").map((s) => s.split(""));
  }
}
