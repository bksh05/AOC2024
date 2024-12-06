import { AdventOfCode } from "./AdventOfCode";

export class Day05 extends AdventOfCode<{ rules: string[]; updates: string[] }> {
  private adjacencyList = new Map<number, Set<number>>();
  private incorrectUpdates: number[][] = [];

  protected part1(): number {
    this.buildAdjacencyList();
    let sum = 0;

    this.data.updates.forEach((update) => {
      const pages = update.split(",").map(Number);
      if (this.isValidUpdate(pages)) {
        sum += this.getMiddleValue(pages);
      } else {
        this.incorrectUpdates.push(pages);
      }
    });

    return sum;
  }

  protected part2(): number {
    return this.incorrectUpdates.reduce((sum, update) => {
      const sortedUpdate = this.sortUpdate(update);
      return sum + this.getMiddleValue(sortedUpdate);
    }, 0);
  }

  protected parseData(input: string): { rules: string[]; updates: string[] } {
    const [rulesString, updatesString] = input.split("\n\r\n");
    return {
      rules: rulesString.split("\n"),
      updates: updatesString.split("\n"),
    };
  }

  // Helper to build adjacency list from rules
  private buildAdjacencyList(): void {
    this.data.rules.forEach((rule) => {
      const [parent, child] = rule.split("|").map(Number);
      if (!this.adjacencyList.has(parent)) {
        this.adjacencyList.set(parent, new Set());
      }
      this.adjacencyList.get(parent)!.add(child);
    });
  }

  // Helper to check if an update is valid
  private isValidUpdate(pages: number[]): boolean {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const children = this.adjacencyList.get(page);
      if (children) {
        for (let j = i - 1; j >= 0; j--) {
          if (children.has(pages[j])) {
            return false;
          }
        }
      }
    }
    return true;
  }

  // Helper to sort updates based on adjacency rules
  private sortUpdate(update: number[]): number[] {
    return update.sort((a, b) => {
      if (this.adjacencyList.get(a)?.has(b)) return -1;
      if (this.adjacencyList.get(b)?.has(a)) return 1;
      return 0;
    });
  }

  // Helper to get the middle value of an array
  private getMiddleValue(array: number[]): number {
    return array[Math.floor(array.length / 2)];
  }
}
