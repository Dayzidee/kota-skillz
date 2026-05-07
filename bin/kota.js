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
  .version('1.0.1');

program
  .command('init')
  .description('Initialize Kota Skillz in your current project (creates kota-skillz/ directory with all patterns and instructions)')
  .action(async () => {
    const cwd = process.cwd();
    const targetDir = path.join(cwd, 'kota-skillz');
    console.log(chalk.blue('Initializing Kota Skillz in ' + targetDir));

    try {
      // Create the root kota-skillz directory in the user's project
      await fs.mkdir(targetDir, { recursive: true });

      // Specific files and directories to include (everything making up the knowledge base)
      const filesToCopy = ['AI_ONBOARDING.md', 'onboarding.md', 'task.md', 'README.md'];
      const dirsToCopy = [
        'patterns',
        'debugging',
        'failures',
        'features',
        'instructions',
        'prompts',
        'skeleton',
        'stack'
      ];

      for (const file of filesToCopy) {
        try {
          await fs.copyFile(path.join(packageRoot, file), path.join(targetDir, file));
          console.log(chalk.green(`✅ Copied ${file}`));
        } catch (e) {
          // Silent skip for optional files if not found
        }
      }

      for (const dir of dirsToCopy) {
        try {
          await copyDir(path.join(packageRoot, dir), path.join(targetDir, dir));
          console.log(chalk.green(`✅ Copied ${dir}/ directory`));
        } catch (e) {
          // Silent skip if directory doesn't exist
        }
      }

      console.log(chalk.bold.magenta('\n🚀 Kota Skillz initialized successfully!'));
      
      console.log(chalk.yellow('\n---------------------------------------------------------'));
      console.log(chalk.cyan('Copy me and paste in your customizations, instructions or rules:'));
      console.log(chalk.white('\nCRITICAL: Before writing any code or making architectural decisions, you MUST read the rules in `kota-skillz/AI_ONBOARDING.md` and consult the relevant architectural patterns in the `kota-skillz/patterns/` directory. Strict adherence is required.\n'));
      console.log(chalk.yellow('---------------------------------------------------------'));
      
      console.log(chalk.cyan('\nCopy me and paste in your agent chat:'));
      console.log(chalk.white('\nI have initialized the Kota Skillz standard library in the `kota-skillz/` directory. This contains our execution protocol, architectural patterns, and learning modules. Please read `kota-skillz/AI_ONBOARDING.md` to understand your operational constraints and prepare to consult it for every build.\n'));
      console.log(chalk.yellow('---------------------------------------------------------'));

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
