import chalk from "chalk";
import { ESLint } from "eslint";
import ora from "ora";

const eslint = new ESLint({
  overrideConfigFile: "eslint.config.js", // optional: ESLint will auto-detect if present
});

console.clear("Linting...");
const indicator = ora(" ");
indicator.spinner = "dots12";
indicator.start();

const results = await eslint.lintFiles(["."]);
const formatter = await eslint.loadFormatter("stylish");
const resultText = formatter.format(results);

const hasIssues = results.some((r) => r.errorCount > 0 || r.warningCount > 0);

const check = chalk.hex("#10B981").bold(" ✔ ");
const es = chalk.hex("#A5B4FC").bold(" eslint ");
const proper = `${es} - ❬${chalk.hex("#10B981").bold(" GOOD ")}❭`;

const spice = chalk.hex("#f9a8d4").bold(" code's clean daddy!");
const teen = `${spice}`;

if (hasIssues) {
  console.log(resultText);
  process.exit(1);
} else {
  console.clear();
  console.log(`${check}${proper} - ${teen}`);
  process.exit(0);
}
