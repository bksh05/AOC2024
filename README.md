# Advent of Code Repository

This repository contains solutions for Advent of Code challenges implemented in TypeScript. Each day’s problem is encapsulated in its own class, extending a common base class `AdventOfCode`, to ensure consistency and reusability across solutions.

## Folder Structure

```
├── src
│   ├── AdventOfCode.ts   # Base class for all challenges
│   ├── Day01.ts          # Solution for Day 1
│   ├── Day02.ts          # Solution for Day 2
│   ├── DayXX.ts          # Solution for Day XX
├── data
│   ├── Day01.txt         # Input file for Day 1
│   ├── Day02.txt         # Input file for Day 2
│   ├── DayXX.txt         # Input file for Day XX
├── package.json          # Project configuration and dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Usage

### Running the Solutions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the solution for a specific day:
   ```bash
   npm start -- --day=XX
   ```
   Replace `XX` with the day number (e.g., `01` for Day 1).


## Implementation Details

Each solution file (e.g., `DayXX.ts`) extends the `AdventOfCode` base class, which provides a standard structure:

- **`parseData(input: string)`**:
  Processes the raw input into a usable format.

- **`part1()`**:
  Implements the logic for Part 1 of the challenge.

- **`part2()`**:
  Implements the logic for Part 2 of the challenge.

### Example Base Class (`AdventOfCode.ts`)
```typescript
export abstract class AdventOfCode<T> {
  // Protected property to hold the parsed data
  protected data: T;

  // Constructor to ensure data is parsed when the class is instantiated
  constructor() {
    const input = readFileSync(
      path.join(__dirname, "data", `${this.constructor.name}.txt`),
      "utf-8",
    );
    console.log(path.join(__dirname, "data", `${this.constructor.name}.txt`));
    this.data = this.parseData(input);
  }

  // Protected abstract methods for solving the challenge
  protected abstract part1(): number;
  protected abstract part2(): number;

  // Abstract method to parse input data
  protected abstract parseData(input: string): T;

  // Public method to run the application
  public runApp() {
    console.log(`Running ${this.constructor.name}`);

    const result1 = this.part1();
    console.log(`Result of part 1: ${result1}`);

    const result2 = this.part2();
    console.log(`Result of part 2: ${result2}`);
  }
}

```
