#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

program
  .name('kota')
  .description('Kota Skillz: An industrial-grade standard library for AI coding agents (Vibe Coding).')
  .version('1.1.0');

program
  .command('generate-lock')
  .description('Generate a skills-lock.json file preconfigured with Kota Skillz, Supabase, and Remotion')
  .action(async () => {
    const cwd = process.cwd();
    const lockPath = path.join(cwd, 'skills-lock.json');
    console.log(chalk.blue('Generating skills-lock.json in ' + cwd));

    const lockData = {
      "version": 1,
      "skills": {
        "kota-skillz": {
          "source": "Dayzidee/kota-skillz",
          "sourceType": "github",
          "skillPath": "SKILL.md"
        },
        "supabase": {
          "source": "supabase/agent-skills",
          "sourceType": "github",
          "skillPath": "skills/supabase/SKILL.md"
        },
        "supabase-postgres-best-practices": {
          "source": "supabase/agent-skills",
          "sourceType": "github",
          "skillPath": "skills/supabase-postgres-best-practices/SKILL.md"
        },
        "remotion-best-practices": {
          "source": "remotion-dev/skills",
          "sourceType": "github",
          "skillPath": "SKILL.md"
        }
      }
    };

    try {
      await fs.writeFile(lockPath, JSON.stringify(lockData, null, 2), 'utf8');
      console.log(chalk.green(`✅ Created skills-lock.json successfully!`));
      console.log(chalk.bold.magenta('\n🚀 Next Step: Run `npx skills install` to pull down all agent protocols!'));
      
      console.log(chalk.yellow('\n---------------------------------------------------------'));
      console.log(chalk.cyan('Once installed, copy me and paste in your agent chat:'));
      console.log(chalk.white('\nI have installed the standard libraries for Kota Skillz, Supabase, and Remotion into the `.agents/skills/` directory. Please read `.agents/skills/kota-skillz/SKILL.md` to understand your operational constraints and review the other SKILL.md files for domain-specific best practices.\n'));
      console.log(chalk.yellow('---------------------------------------------------------'));
    } catch (err) {
      console.error(chalk.red('❌ Error generating lockfile:'), err.message);
    }
  });

program
  .command('audit')
  .description('Runs a basic check to see if your current project has the required security patterns.')
  .action(() => {
    console.log(chalk.yellow('🚧 Audit command is currently a work in progress. Coming soon!'));
  });

program.parse(process.argv);
