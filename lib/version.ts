import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Retorna a versão do projeto definida no package.json.
 * Deve ser chamado apenas no lado do servidor.
 */
export function getProjectVersion(): string {
  try {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJsonContent = readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.version || '0.0.0';
  } catch (error) {
    console.error('Erro ao ler a versão do projeto:', error);
    return '0.0.0';
  }
}
