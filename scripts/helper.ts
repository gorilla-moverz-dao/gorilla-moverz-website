/* eslint-disable @typescript-eslint/no-explicit-any */
import { exec } from "child_process";
import * as yaml from "js-yaml";
import * as fs from "fs";

// Function to run a command in a specific directory
export function runCommand(command: string, directory: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    exec(command, { cwd: directory }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      console.log(`Stdout: ${stdout}`);
      resolve();
    });
  });
}

export function parsePrivateKey(filePath: string): string | undefined {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents) as any;

    if (data && data.profiles && data.profiles.default) {
      return data.profiles.default.private_key;
    } else {
      throw new Error("Invalid YAML structure");
    }
  } catch (error) {
    console.error(`Error reading or parsing YAML file: ${error.message}`);
    return undefined;
  }
}

export function convertToAmount(amount: number) {
  return amount * Math.pow(10, 9);
}

export function dateToSeconds(date: Date | undefined) {
  if (!date) return;
  const dateInSeconds = Math.floor(+date / 1000);
  return dateInSeconds;
}
