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
        "remotion-best-practices": {
          "source": "remotion-dev/skills",
          "sourceType": "github",
          "skillPath": "skills/remotion/SKILL.md",
          "computedHash": "006f8413941b59eff54a7ce64851b8a2fb79e7a3a5f1a895e97a48f01482553d"
        },
        "supabase": {
          "source": "supabase/agent-skills",
          "sourceType": "github",
          "skillPath": "skills/supabase/SKILL.md",
          "computedHash": "d414d598b9428b3e851c4ce61898649906b19e55aa7415bb42a286bd9ca2ab32"
        },
        "supabase-postgres-best-practices": {
          "source": "supabase/agent-skills",
          "sourceType": "github",
          "skillPath": "skills/supabase-postgres-best-practices/SKILL.md",
          "computedHash": "0d2c4857a7d6fdcd3fbc46e458fa4c497f029cab89a01548b3defce203003932"
        },
        "ui-ux-pro-max-skill": {
          "source": "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git",
          "sourceType": "github",
          "skillPath": "skills/ui-ux-pro-max-skill/SKILL.md",
          "ref": "b7e3af80f6e331f6fb456667b82b12cade7c9d35"
        },
        "ponytail": {
          "source": "DietrichGebert/ponytail",
          "sourceType": "github",
          "skillPath": "skills/ponytail/SKILL.md",
          "ref": "40e50d9e03242aa5dd53ac771950f9127362b25f"
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

      const supabaseSkillPath = path.join(cwd, 'skills/supabase/SKILL.md');
      const supabasePgSkillPath = path.join(cwd, 'skills/supabase-postgres-best-practices/SKILL.md');
      const remotionSkillPath = path.join(cwd, 'skills/remotion-best-practices/SKILL.md');

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
      console.log(chalk.white('\nI have installed the standard libraries for Kota Skillz, Supabase, and Remotion into the `skills/` directory. Please read `skills/kota-skillz/SKILL.md` to understand your operational constraints and review the other SKILL.md files for domain-specific best practices.\n'));
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
