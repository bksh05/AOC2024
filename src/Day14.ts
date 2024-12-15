import { AdventOfCode } from "./AdventOfCode";

interface Robot {
  position: number[];
  velocity: number[];
}

export class Day14 extends AdventOfCode<Robot[]> {
  private WIDE = 101;
  private TALL = 103;

  protected part1(): number {
    let q1Count = 0;
    let q2Count = 0;
    let q3Count = 0;
    let q4Count = 0;
    this.data.forEach((robot) => {
      const xDistance = robot.velocity[0] * 100;
      const yDistance = robot.velocity[1] * 100;
      let xFinalPosition = (robot.position[0] + xDistance) % this.WIDE;
      let yFinalPosition = (robot.position[1] + yDistance) % this.TALL;

      if (xFinalPosition < 0) {
        xFinalPosition = this.WIDE + xFinalPosition;
      }

      if (yFinalPosition < 0) {
        yFinalPosition = this.TALL + yFinalPosition;
      }

      if (xFinalPosition < Math.floor(this.WIDE / 2) && yFinalPosition < Math.floor(this.TALL / 2)) {
        q1Count += 1;
      }

      if (xFinalPosition > Math.floor(this.WIDE / 2) && yFinalPosition < Math.floor(this.TALL / 2)) {
        q2Count += 1;
      }

      if (xFinalPosition < Math.floor(this.WIDE / 2) && yFinalPosition > Math.floor(this.TALL / 2)) {
        q3Count += 1;
      }

      if (xFinalPosition > Math.floor(this.WIDE / 2) && yFinalPosition > Math.floor(this.TALL / 2)) {
        q4Count += 1;
      }
    });

    return q1Count * q2Count * q3Count * q4Count;
  }

  protected part2(): number {
    console.warn("To find solution of part2 run src/util/Day14/Day14.html");
    return 0;
  }

  protected parseData(input: string): Robot[] {
    return input.split("\r\n").map((ele) => {
      const [positionString, velocityString] = ele.split(" ");
      return {
        position: positionString
          .slice(2)
          .split(",")
          .map((ele) => Number.parseInt(ele)),
        velocity: velocityString
          .slice(2)
          .split(",")
          .map((ele) => Number.parseInt(ele)),
      };
    });
  }
}
