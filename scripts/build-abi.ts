import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { FULL_NODE, MODULE_ADDRESS } from "../src/constants.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getABI(moduleName: string): Promise<void> {
  try {
    const response = await axios.get(`${FULL_NODE}/accounts/0x${MODULE_ADDRESS}/module/${moduleName}`);
    const abi = response.data.abi;

    const content = `export const ABI = ${JSON.stringify(abi)} as const`;

    await fs.writeFile(path.join(__dirname, "..", "src", "services", `${moduleName}.ts`), content);

    console.log(`ABI for ${moduleName} has been written successfully.`);
  } catch (error) {
    console.error(`Error fetching ABI for ${moduleName}:`, error);
  }
}

async function main() {
  await getABI("launchpad");
  await getABI("banana_farm");
  await getABI("banana");
}

main().catch(console.error);
