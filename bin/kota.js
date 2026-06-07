#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

program
  .name('kota')
  .description('Kota Skillz: An industrial-grade standard library for AI coding agents (Vibe Coding).')
  .version('1.1.1');

program
  .description('Automatically configures the AI agent ecosystem (Kota Skillz, Supabase, Remotion)')
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
      console.log(chalk.blue('\n⏳ Pulling down AI agent skills (this may take a moment)...'));
      
      // Execute the skills.sh installation
      execSync('npx --yes skills experimental_install', { stdio: 'inherit' });
      
      console.log(chalk.blue('\n⚙️ Injecting cross-references into domain skills...'));
      
      const injectionText = `\n\n---\n\n> [!IMPORTANT]\n> **KOTA SKILLZ INTEGRATION:** You are operating inside a Kota Skillz environment. In addition to these domain-specific instructions, you MUST also adhere to the architectural constraints and execution protocols defined in \`../kota-skillz/SKILL.md\`.\n`;

      const supabaseSkillPath = path.join(cwd, '.agents/skills/supabase/SKILL.md');
      const supabasePgSkillPath = path.join(cwd, '.agents/skills/supabase-postgres-best-practices/SKILL.md');
      const remotionSkillPath = path.join(cwd, '.agents/skills/remotion-best-practices/SKILL.md');

      for (const skillFile of [supabaseSkillPath, supabasePgSkillPath, remotionSkillPath]) {
        try {
          await fs.appendFile(skillFile, injectionText, 'utf8');
          console.log(chalk.gray(`  ↳ Injected Kota Skillz reference into ${path.basename(path.dirname(skillFile))}`));
        } catch (e) {
          // Ignore errors if the file doesn't exist (e.g., if the user removed a skill from the lockfile)
        }
      }

      console.log(chalk.bold.magenta('\n🚀 AI Ecosystem completely configured!'));
      
      console.log(chalk.yellow('\n---------------------------------------------------------'));
      console.log(chalk.cyan('Copy me and paste in your agent chat:'));
      console.log(chalk.white('\nI have installed the standard libraries for Kota Skillz, Supabase, and Remotion into the `.agents/skills/` directory. Please read `.agents/skills/kota-skillz/SKILL.md` to understand your operational constraints and review the other SKILL.md files for domain-specific best practices.\n'));
      console.log(chalk.yellow('---------------------------------------------------------'));
    } catch (err) {
      console.error(chalk.red('❌ Error during installation:'), err.message);
    }
  });

program
  .command('audit')
  .description('Runs a basic check to see if your current project has the required security patterns.')
  .action(() => {
    console.log(chalk.yellow('🚧 Audit command is currently a work in progress. Coming soon!'));
  });

program.parse(process.argv);
