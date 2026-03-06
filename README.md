# 🚀 Next.js Template

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Um template robusto e pré-configurado para o desenvolvimento de aplicações modernas com Next.js, focado em produtividade, qualidade de código e automação.

---

## 🛠️ Primeiros Passos (Uso do Template)

Se você acabou de criar um repositório usando este botão de **Use this template** no GitHub, siga estes passos para inicializar o seu novo projeto:

1. **Clone o seu novo repositório**:

   ```bash
   git clone <url-do-seu-repositorio>
   cd <nome-do-projeto>
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicialize o Template**:
   Execute o script de inicialização para configurar o seu projeto (isso atualizará o `package.json`, removerá arquivos de exemplo e preparará o ambiente):
   ```bash
   npm run init
   ```

---

## ⚙️ Preparação Manual (Clone Direto)

Caso você esteja apenas clonando este repositório diretamente para estudo ou uso manual, siga estes passos:

1. **Instale as dependências**:

   ```bash
   npm install
   ```

2. **Suba o ambiente de desenvolvimento**:

   ```bash
   npm run dev
   ```

3. **Formatação de Código**:
   O projeto já vem com Husky e Lint-staged. Para formatar manualmente:
   ```bash
   npm run format
   ```

---

## ✨ Sobre este Template

Este template foi projetado para seguir as melhores práticas atuais do ecossistema Next.js.

### O que está incluso:

- **Next.js 15+ (App Router)**: Otimizado para performance e SEO.
- **shadcn/ui**: Componentes de UI acessíveis e totalmente customizáveis.
- **Tailwind CSS 4**: O motor de estilização mais rápido e moderno.
- **Qualidade de Código**:
  - **ESLint**: Para encontrar e corrigir problemas no código.
  - **Prettier**: Para garantir um estilo de código consistente.
  - **Commitlint**: Garante que todas as mensagens de commit sigam o padrão [Conventional Commits](https://www.conventionalcommits.org/).
- **Automação de Git (Husky)**:
  - Verificação de lint e formatação no pré-commit.
  - Validação de mensagem no commit-msg.
  - Validação de build no pré-push.
- **CI/CD**: Workflows de GitHub Actions configurados para integração contínua.

### Diretrizes do Projeto

Para garantir a integridade do template, consulte os guias na pasta `.agents/rules/`:

- [Regras Next.js](.agents/rules/next-js.md)
- [Regras shadcn/ui](.agents/rules/shandc-ui.md)

---

Desenvolvido com ❤️ para acelerar o seu próximo grande projeto.
