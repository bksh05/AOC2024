import { readFileSync } from "fs";
import path from "path";

export abstract class AdventOfCode<T> {
    // Protected property to hold the parsed data
    protected data: T;

    // Constructor to ensure data is parsed when the class is instantiated
    constructor() {
        const input = readFileSync(path.join(__dirname, 'data', `${this.constructor.name}.txt`), 'utf-8')
        console.log(path.join(__dirname, 'data', `${this.constructor.name}.txt`))
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