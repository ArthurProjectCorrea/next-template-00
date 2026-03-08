#!/usr/bin/env node
/**
 * Script de primeiros passos: ao clonar este template, configura o projeto
 * com o nome do repositório, zera a versão, remove o CHANGELOG e atualiza
 * o primeiro commit. Execute uma vez após clonar: npm run init
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { encoding: 'utf8', cwd: root, ...opts }).trim();
  } catch {
    return null;
  }
}

function getRepoName() {
  const url = run('git remote get-url origin');
  if (url) {
    // https://github.com/user/repo.git ou git@github.com:user/repo.git -> repo
    const match = url.match(/\/([^/]+?)(?:\.git)?$/);
    if (match) return match[1];
  }
  // Fallback: nome da pasta atual (geralmente igual ao nome do repo ao clonar)
  const dirName = path.basename(root);
  if (dirName && dirName !== '.' && dirName !== '..') {
    console.log('○ Usando nome da pasta como nome do projeto:', dirName);
    return dirName;
  }
  console.warn(
    '⚠️  Não foi possível obter o nome (remote ou pasta). Defina "name" em package.json manualmente.'
  );
  return null;
}

function updatePackageJson(newName, newVersion = '0.0.0') {
  const pkgPath = path.join(root, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.name = newName;
  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(
    '✓ package.json atualizado: name = "%s", version = "%s"',
    newName,
    newVersion
  );
}

function removeChangelog() {
  const changelogPath = path.join(root, 'CHANGELOG.md');
  if (fs.existsSync(changelogPath)) {
    fs.unlinkSync(changelogPath);
    console.log('✓ CHANGELOG.md removido');
  } else {
    console.log('○ CHANGELOG.md não encontrado (já removido ou não existia)');
  }
}

function amendFirstCommit() {
  const gitDir = path.join(root, '.git');
  if (!fs.existsSync(gitDir)) {
    console.log(
      '○ Diretório .git não encontrado; pulando atualização do commit.'
    );
    return;
  }
  const hasChanges = run('git status --porcelain');
  if (!hasChanges) {
    console.log(
      '○ Nenhuma alteração para incluir no commit. Para apenas alterar a mensagem:'
    );
    console.log('  git commit --amend -m "chore: first commit"');
    return;
  }
  run('git add -A');
  run('git commit --amend -m "chore: first commit"');
  run('git push --force');
  console.log('✓ Primeiro commit atualizado (mensagem: "chore: first commit")');
}

// --- main
console.log('\n🔧 Primeiros passos do template\n');

const repoName = getRepoName();
if (repoName) {
  updatePackageJson(repoName, '0.0.0');
} else {
  console.log(
    '○ Pulando alteração do package.json. Defina "name" e "version" manualmente.'
  );
}

removeChangelog();
amendFirstCommit();

console.log(
  '\n✅ Próximos passos: npm install && npm run prepare && npm run dev\n'
);
