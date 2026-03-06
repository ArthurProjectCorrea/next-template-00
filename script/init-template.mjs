import { exec } from 'node:child_process';
import { readFile, writeFile, unlink, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const UI = {
  info: (msg) => console.log(`${COLORS.cyan}○${COLORS.reset} ${msg}`),
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warn: (msg) => console.log(`${COLORS.yellow}⚠️  ${msg}${COLORS.reset}`),
  error: (msg) => console.log(`${COLORS.red}✖  ${msg}${COLORS.reset}`),
  header: (msg) =>
    console.log(`\n${COLORS.bright}${COLORS.cyan}🔧 ${msg}${COLORS.reset}\n`),
};

async function run(cmd) {
  try {
    const { stdout } = await execAsync(cmd, { cwd: root });
    return stdout.trim();
  } catch {
    return null;
  }
}

async function getRepoName() {
  const url = await run('git remote get-url origin');
  if (url) {
    const match = url.match(/\/([^/]+?)(?:\.git)?$/);
    if (match) return match[1];
  }

  const dirName = path.basename(root);
  if (dirName && !['.', '..'].includes(dirName)) {
    UI.info(`Usando nome da pasta como nome do projeto: ${dirName}`);
    return dirName;
  }

  return null;
}

async function updatePackageJson(newName, newVersion = '0.0.0') {
  const pkgPath = path.join(root, 'package.json');
  try {
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
    pkg.name = newName;
    pkg.version = newVersion;
    pkg.initialized = true;
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    UI.success(
      `package.json atualizado: name = "${newName}", version = "${newVersion}"`
    );
  } catch (err) {
    UI.error(`Falha ao atualizar package.json: ${err.message}`);
  }
}

async function removeChangelog() {
  const changelogPath = path.join(root, 'CHANGELOG.md');
  try {
    await access(changelogPath);
    await unlink(changelogPath);
    UI.success('CHANGELOG.md removido');
  } catch {
    UI.info('CHANGELOG.md não encontrado');
  }
}

async function amendFirstCommit() {
  if (!existsSync(path.join(root, '.git'))) {
    UI.info('Diretório .git não encontrado; pulando atualização do commit.');
    return;
  }

  const hasChanges = await run('git status --porcelain');
  if (!hasChanges) {
    UI.info('Nenhuma alteração para incluir no commit.');
    return;
  }

  try {
    await execAsync('git add -A', { cwd: root });
    await execAsync('git commit --amend -m "chore: first commit"', {
      cwd: root,
    });
    UI.success('Primeiro commit atualizado (chore: first commit)');
  } catch (err) {
    UI.warn(`Falha ao atualizar commit: ${err.message}`);
  }
}

async function isAlreadyInitialized() {
  try {
    const pkg = JSON.parse(
      await readFile(path.join(root, 'package.json'), 'utf8')
    );
    return !!pkg.initialized;
  } catch {
    return false;
  }
}

async function main() {
  UI.header('Iniciando configuração do template');

  if (await isAlreadyInitialized()) {
    UI.warn('Projeto já inicializado anteriormente. Abortando.');
    process.exit(0);
  }

  const repoName = await getRepoName();
  if (repoName) {
    await updatePackageJson(repoName);
  } else {
    UI.warn(
      'Não foi possível obter o nome do projeto. Configure manualmente no package.json.'
    );
  }

  await removeChangelog();
  await amendFirstCommit();

  UI.success('\nConfiguração concluída!');
  UI.info('Próximos passos: npm install && npm run dev\n');
}

main().catch((err) => {
  UI.error(`Erro inesperado: ${err.message}`);
  process.exit(1);
});
