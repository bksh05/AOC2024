import fs from 'fs';
import { Day01 } from "./Day01";
import { Day02 } from "./Day02";
import { Day03 } from "./Day03";
import { Day04 } from "./Day04";
import { Day05 } from "./Day05";
import { Day06 } from "./Day06";
import { Day07 } from "./Day07";
import { Day08 } from './Day08';
import { Day09 } from './Day09';
import { Day10 } from './Day10';
import { Day11 } from './Day11';
import { Day12 } from './Day12';
import { Day13 } from './Day13';
import { Day14 } from './Day14';

function getLatestDay() {
  const files = fs.readdirSync(__dirname);
  const dayFolders = files.filter((file) => /^Day[0-9]+.ts$/.test(file));
  const days = dayFolders.map((folder) => parseInt(folder.replace("Day", ""), 10));
  return Math.max(...days); 
}

function getDayValueFromArgs () {
  const args = process.argv.slice(2);
  const dayArg = args.find((arg) => arg.startsWith("--day="));
  if (dayArg) {
    const day = dayArg.split("=")[1];
    return Number.parseInt(day);
  } else {
    return getLatestDay();
  }
}

function run() {
  const day = getDayValueFromArgs();
  switch(day){
    case 1: return new Day01().runApp();
    case 2: return new Day02().runApp();
    case 3: return new Day03().runApp();
    case 4: return new Day04().runApp();
    case 5: return new Day05().runApp();
    case 6: return new Day06().runApp();
    case 7: return new Day07().runApp();
    case 8: return new Day08().runApp();
    case 9: return new Day09().runApp();
    case 10: return new Day10().runApp();
    case 11: return new Day11().runApp();
    case 12: return new Day12().runApp();
    case 13: return new Day13().runApp();
    case 14: return new Day14().runApp();

    default: console.error("Invalid day");

  }

}

run();
