#!/usr/bin/env node
/**
 * Updates the lastmod frontmatter field in Markdown files to the current timestamp.
 * Use with: node scripts/update-lastmod.js [paths...]
 * If no paths given, updates all .md files in content/ that have lastmod.
 * With --staged, only updates git staged files (run from pre-commit).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contentDir = path.join(__dirname, '..', 'content');
const lastmodRegex = /^(lastmod:\s*)[^\s\r\n]+(\s*)$/m;
const isoNow = new Date().toISOString();

function getFilesToUpdate() {
  let args = process.argv.slice(2);
  const stagedOnly = args.includes('--staged');
  args = args.filter((a) => a !== '--staged');

  if (stagedOnly) {
    try {
      const output = execSync('git diff --cached --name-only --diff-filter=ACMR', {
        encoding: 'utf-8',
      });
      return output
        .trim()
        .split('\n')
        .filter((f) => f.endsWith('.md'))
        .map((f) => path.join(__dirname, '..', f));
    } catch {
      return [];
    }
  }

  if (args.length > 0) {
    return args
      .map((p) => path.resolve(p))
      .filter((p) => fs.existsSync(p) && p.endsWith('.md'));
  }

  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) files.push(full);
    }
  }
  walk(contentDir);
  return files;
}

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('---')) return false;

  const frontmatterEnd = content.indexOf('---', 3);
  if (frontmatterEnd === -1) return false;

  const before = content.slice(0, frontmatterEnd);
  const hasLastmod = lastmodRegex.test(before);

  if (!hasLastmod) return false;

  const newContent = content.replace(lastmodRegex, `$1${isoNow}$2`);
  if (newContent === content) return false;

  fs.writeFileSync(filePath, newContent);
  return true;
}

const files = getFilesToUpdate();
let updated = 0;
for (const f of files) {
  if (updateFile(f)) {
    updated++;
    console.log('Updated:', path.relative(process.cwd(), f));
  }
}
if (updated > 0) {
  console.log(`\nUpdated lastmod in ${updated} file(s).`);
}
