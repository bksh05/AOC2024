import { AdventOfCode } from "./AdventOfCode";

export class Day09 extends AdventOfCode<number[][]> {
  protected calculateCheckSum(memory: number[][]) {
    let blockNumber = 0;
    let sum = 0;
    memory.forEach((block) => {
      const [fileId, count] = block;
      if (fileId !== -1) {
        for (let i = 0; i < count; i++) {
          sum += blockNumber * fileId;
          blockNumber += 1;
        }
      } else {
        blockNumber += count;
      }
    });
    return sum;
  }

  protected part1(): number {
    const memory = [...this.data];
    let i = 1;
    let j = memory.length - 1;

    while (i <= j) {
      if (memory[i][0] !== -1) {
        i += 1;
      } else if (memory[j][0] === -1) {
        j -= 1;
      } else {
        const [_, emptySpace] = memory[i];
        const [fileId, numberOfIteration] = memory[j];
        if (emptySpace === numberOfIteration) {
          memory[i] = [fileId, numberOfIteration];
          memory.splice(j, 1);
          j -= 1;
        } else if (emptySpace > numberOfIteration) {
          memory.splice(j, 1);
          memory[i] = [fileId, numberOfIteration];
          memory.splice(i + 1, 0, [-1, emptySpace - numberOfIteration]);
          j -= 1;
        } else if (emptySpace < numberOfIteration) {
          memory[j] = [fileId, numberOfIteration - emptySpace];
          memory[i] = [fileId, emptySpace];
        }

        i += 1;
      }
    }

    return this.calculateCheckSum(memory);
  }

  protected part2(): number {
    const memory = [...this.data];
    for (let j = memory.length - 1; j >= 0; j--) {
      const [fileId, iteration] = memory[j];
      if (fileId !== -1) {
        for (let i = 0; i < j; i++) {
          const [spaceId, emptySpace] = memory[i];
          if (spaceId === -1) {
            if (emptySpace > iteration) {
              memory[j] = [-1, iteration];
              memory[i] = [fileId, iteration];
              memory.splice(i + 1, 0, [-1, emptySpace - iteration]);
              break;
            } else if (emptySpace === iteration) {
              memory[j] = [-1, iteration];
              memory[i] = [fileId, iteration];
              break;
            }
          }
        }
      }
    }

    return this.calculateCheckSum(memory);
  }

  protected parseData(input: string): number[][] {
    const result: number[][] = [];
    let fileId = 0;
    for (let i = 0; i < input.length; i++) {
      if (i % 2 === 0) {
        result.push([fileId, +input[i]]);
        fileId += 1;
      } else {
        result.push([-1, +input[i]]);
      }
    }
    return result;
  }
}
