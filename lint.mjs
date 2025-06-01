import chalk from "chalk";
import { ESLint } from "eslint";
import ora from "ora";

const eslint = new ESLint({
  overrideConfigFile: "eslint.config.js", // optional: ESLint will auto-detect if present
});

console.clear();
const startTime = Date.now();
const indicator = ora(" Linting...", {
  spinner: "sand",
});
indicator.start();

const results = await eslint.lintFiles(["."]);
const formatter = await eslint.loadFormatter("stylish");
const resultText = formatter.format(results);

const hasIssues = results.some((r) => r.errorCount > 0 || r.warningCount > 0);

const check = chalk.hex("#10B981").bold(" ✔ ");
const es = chalk.hex("#A5B4FC").bold(" eslint ");
const proper = `${es} ❬${chalk.hex("#10B981").bold("100%")}❭ `;

const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
const took = chalk.hex("#FCE7F3").bold(`elapsed ${elapsed}s`);

if (hasIssues) {
  console.log(resultText);
  console.log(took);
  process.exit(1);
} else {
  console.clear();
  console.log(`${check}${proper} ${took}`);
  process.exit(0);
}
