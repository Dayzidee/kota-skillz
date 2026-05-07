#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.join(__dirname, '..');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  let entries = await fs.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ?
      await copyDir(srcPath, destPath) :
      await fs.copyFile(srcPath, destPath);
  }
}

program
  .name('kota')
  .description('Kota Skillz: An industrial-grade standard library for AI coding agents (Vibe Coding).')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize Kota Skillz in your current project (copies patterns/ and AI_ONBOARDING.md)')
  .action(async () => {
    const cwd = process.cwd();
    console.log(chalk.blue('Initializing Kota Skillz in ' + cwd));

    try {
      // Copy AI_ONBOARDING.md
      const onboardingSrc = path.join(packageRoot, 'AI_ONBOARDING.md');
      const onboardingDest = path.join(cwd, 'AI_ONBOARDING.md');
      await fs.copyFile(onboardingSrc, onboardingDest);
      console.log(chalk.green('✅ Copied AI_ONBOARDING.md'));

      // Copy patterns directory
      const patternsSrc = path.join(packageRoot, 'patterns');
      const patternsDest = path.join(cwd, 'patterns');
      await copyDir(patternsSrc, patternsDest);
      console.log(chalk.green('✅ Copied patterns/ directory'));

      console.log(chalk.bold.magenta('\n🚀 Kota Skillz initialized successfully!'));
      console.log('To use: Attach AI_ONBOARDING.md as your system prompt or project context, and let the AI read the patterns when making architectural decisions.');
    } catch (err) {
      console.error(chalk.red('❌ Error initializing Kota Skillz:'), err.message);
    }
  });

program
  .command('onboard')
  .description('Print the AI_ONBOARDING.md protocol to the console')
  .action(async () => {
    try {
      const content = await fs.readFile(path.join(packageRoot, 'AI_ONBOARDING.md'), 'utf-8');
      console.log(chalk.cyan(content));
    } catch (err) {
      console.error(chalk.red('❌ Error reading onboarding file:'), err.message);
    }
  });

program
  .command('audit')
  .description('Runs a basic check to see if your current project has the required security patterns.')
  .action(() => {
    console.log(chalk.yellow('🚧 Audit command is currently a work in progress. Coming soon!'));
  });

program.parse(process.argv);
