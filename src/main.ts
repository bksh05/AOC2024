import fs from 'fs';
import { Day01 } from "./Day01";
import { Day02 } from "./Day02";
import { Day03 } from "./Day03";
import { Day04 } from "./Day04";
import { Day05 } from "./Day05";
import { Day06 } from "./Day06";
import { Day07 } from "./Day07";

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
    default: console.error("Invalid day");

  }

}

run();
