import { AdventOfCode } from "./AdventOfCode";

export class Day06 extends AdventOfCode<Array<string[]>> {
  private directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  private guardPosition: number[] = [];

  protected part1(): number {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        if (this.data[i][j] === "^") {
          this.guardPosition = [i, j];
        }
      }
    }

    let [x, y] = this.guardPosition;
    let directionIndex = 0;
    let count = 0;
    while (x < this.data.length && x >= 0 && y < this.data[0].length && y >= 0) {
      let direction = this.directions[directionIndex];
      if (this.data[x][y] === "." || this.data[x][y] === "^") {
        this.data[x][y] = "X";
        x += direction[0];
        y += direction[1];
        count += 1;
      } else if (this.data[x][y] === "X") {
        x += direction[0];
        y += direction[1];
      } else if (this.data[x][y] === "#") {
        // Move back
        x -= direction[0];
        y -= direction[1];

        // Change direction
        directionIndex = (directionIndex + 1) % this.directions.length;
        direction = this.directions[directionIndex];

        // Move forward
        x += direction[0];
        y += direction[1];
      }
    }

    return count;
  }

  protected part2(): number {
    let numberOfLoops = 0;
    for (let p = 0; p < this.data.length; p++) {
      for (let q = 0; q < this.data[0].length; q++) {
        if (this.data[p][q] === "X" || this.data[p][q] === ".") {
          let [x, y] = this.guardPosition;
          this.data[p][q] = "#";
          let directionIndex = 0;
          let numberOfTurns = 0;

          while (x < this.data.length && x >= 0 && y < this.data[0].length && y >= 0) {
            if (numberOfTurns > 10000) {
              // Using magic number 10000, if we hit this many turns then there might be a loop
              numberOfLoops += 1;
              break;
            }
            let direction = this.directions[directionIndex];
            if (this.data[x][y] === "." || this.data[x][y] === "^" || this.data[x][y] === "X") {
              x += direction[0];
              y += direction[1];
            } else if (this.data[x][y] === "#") {
              numberOfTurns += 1;
              // Move back
              x -= direction[0];
              y -= direction[1];
              // Change direction
              directionIndex = (directionIndex + 1) % this.directions.length;
              direction = this.directions[directionIndex];
              // Move forward
              x += direction[0];
              y += direction[1];
            }
          }

          this.data[p][q] = ".";
        }
      }
    }

    return numberOfLoops;
  }

  protected parseData(input: string): Array<string[]> {
    return input.split("\r\n").map((s) => s.split(""));
  }
}
