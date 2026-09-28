# AGENTS.md - Guia do Projeto Code Connect para Agentes de IA

Este documento reúne todas as especificações técnicas, padrões arquiteturais, fluxos de execução, convenções e regras do projeto **Code Connect**. Ele foi desenvolvido para orientar agentes autônomos e desenvolvedores que venham a interagir, manter ou evoluir este repositório.

---

## 1. Objetivo e Propósito do Projeto

O **Code Connect** é uma plataforma full-stack estruturada em formato de monorepo gerenciado por `pnpm`. O repositório abriga tanto a camada de interface do usuário quanto a camada de API backend:

- **Frontend (`apps/web`)**: Aplicação Single Page Application (SPA) reativa construída com React 19, TypeScript, Vite e Tailwind CSS. A interface é estruturada sob o paradigma de **Atomic Design**, garantindo alta modularidade, reusabilidade e consistência visual, com cobertura obrigatória de testes para todo e qualquer componente criado.
- **Backend (`apps/server`)**: API RESTful construída com o framework NestJS 10 sobre Node.js e Express, projetada com rigorosa adesão às boas práticas e **princípios REST**, injeção de dependências e arquitetura em camadas.

---

## 2. Arquitetura

O projeto adota uma arquitetura de **Monorepo por Workspaces** via pnpm (`pnpm-workspace.yaml`), com duas aplicações independentes localizadas em `apps/`:

```
+-----------------------------------------------------------------------+
|                         Code Connect Monorepo                         |
+-----------------------------------------------------------------------+
       |                                                 |
       v                                                 v
+-------------------------------+       +-------------------------------+
|          apps/web             |       |          apps/server          |
|  - React 19 (SPA)             |       |  - NestJS 10 (API RESTful)    |
|  - Atomic Design              |       |  - Princípios REST Estritos   |
|  - Tailwind CSS               |       |  - Express Platform           |
|  - Vite 8 + OXC Plugin        |       |  - TypeScript (CommonJS/Node) |
|  - Testes Essenciais p/ Comp. |       |  - Jest (Unit & E2E)          |
|  - Porta padrão: 5173         |       |  - Porta padrão: 3000         |
+-------------------------------+       +-------------------------------+
```

### 2.1. Arquitetura do Frontend (`apps/web`)
- **Padrão de Organização Visual**: **Atomic Design**. A interface é decomposta em níveis crescentes de complexidade:
  - **Átomos (`atoms`)**: Elementos visuais indivisíveis (botões, inputs, ícones, tags, tipografia).
  - **Moléculas (`molecules`)**: Composições de átomos com função focada (barra de busca, campo de formulário com label e validação).
  - **Organismos (`organisms`)**: Seções completas e autocontidas da interface (header, navbar, card de post interativo, lista/feed).
  - **Templates (`templates`)**: Estruturas de layout da página sem vinculação direta a dados reais, definindo posicionamento e grid.
  - **Páginas / Telas (`pages`)**: Instâncias dos templates integradas com fontes de dados, hooks de estado e regras de negócio.
- **Estilização**: **Tailwind CSS**, priorizando classes utilitárias semânticas, tokens de design padronizados e responsividade mobile-first.
- **Testes Obrigatórios de Componentes**: Cada componente (átomo, molécula ou organismo) deve obrigatoriamente possuir um arquivo de teste adjacente (`*.spec.tsx` ou `*.test.tsx`) cobrindo seu **uso essencial** (renderização, eventos do usuário, variações visuais e estados de borda).
- **Entrada da aplicação**: O arquivo `index.html` carrega `/src/main.tsx`, que inicializa o container raiz com `createRoot` e renderiza `<App />` dentro de `<StrictMode>`.
- **Bundler & Dev Server**: Vite 8 utilizando `@vitejs/plugin-react` (com suporte a transformações rápidas baseadas em OXC).
- **Estratégia TypeScript**: Projeto dividido em Project References (`tsconfig.json`), separando o contexto da aplicação (`tsconfig.app.json` direcionado a `src/`) e o contexto de ferramentas/Node (`tsconfig.node.json` direcionado a `vite.config.ts`).
- **Linter**: Oxlint para análise estática de altíssima velocidade.

### 2.2. Arquitetura do Backend (`apps/server`)
- **Aderência aos Princípios REST**:
  - **Orientação a Recursos**: URIs representam substantivos no plural (ex: `/posts`, `/users`), evitando verbos na rota.
  - **Verbos HTTP Semânticos**: Uso estrito de `GET` (leitura segura e idempotente), `POST` (criação), `PUT` (substituição integral idempotente), `PATCH` (atualização parcial), `DELETE` (remoção idempotente).
  - **Códigos de Resposta Semânticos**: Uso rigoroso de status codes HTTP (200, 201, 204, 400, 401, 403, 404, 409, 422, 500).
  - **Statelessness**: Nenhuma sessão de cliente é armazenada em memória no servidor; cada requisição carrega os dados necessários para autenticação e autorização (via headers padronizados como `Authorization: Bearer <token>`).
- **Padrão Modular NestJS**:
  - **Controllers (`*.controller.ts`)**: Mapeamento de rotas REST, extração de parâmetros (`@Param`, `@Query`, `@Body`), aplicação de pipes de validação e retorno com status codes adequados.
  - **Services / Providers (`*.service.ts`)**: Encapsulamento de regras de negócio, integrações externas e manipulação de entidades.
  - **Modules (`*.module.ts`)**: Declaração, agrupamento e injeção de dependências.
  - **DTOs (`*.dto.ts`)**: Contratos de entrada e saída validados estaticamente e em runtime.
- **Ponto de Entrada**: `src/main.ts` inicializa a aplicação com `NestFactory.create(AppModule)` e escuta na porta definida pela variável de ambiente `PORT` ou `3000`.
- **Plataforma HTTP**: Express (`@nestjs/platform-express`).
- **Compilação**: Nest CLI e TypeScript transpilando para a pasta `dist/` (`tsconfig.build.json`).

---

## 3. Estrutura de Diretórios

```
code-connect/
├── .git/                      # Controle de versão Git
├── .gitignore                 # Regras globais de arquivos ignorados
├── AGENTS.md                  # Este arquivo de documentação técnica para agentes
├── package.json               # Configurações e scripts agregadores do monorepo
├── pnpm-lock.yaml             # Lockfile v9 do pnpm
├── pnpm-workspace.yaml        # Definição dos pacotes do workspace (apps/*)
└── apps/
    ├── server/                # Aplicação Backend (NestJS)
    │   ├── .eslintrc.js       # Configuração ESLint com TypeScript e Prettier
    │   ├── .gitignore         # Regras de ignore do backend (dist, logs, coverage)
    │   ├── .prettierrc        # Regras de formatação de código Prettier
    │   ├── nest-cli.json      # Configuração da CLI do NestJS
    │   ├── package.json       # Scripts e dependências do backend
    │   ├── README.md          # Documentação original do starter NestJS
    │   ├── tsconfig.build.json# Configuração TS para build (exclui specs e testes)
    │   ├── tsconfig.json      # Configuração TS base do NestJS
    │   ├── src/
    │   │   ├── app.controller.spec.ts # Teste unitário do AppController
    │   │   ├── app.controller.ts      # Controller inicial (GET /)
    │   │   ├── app.module.ts          # Módulo principal da aplicação
    │   │   ├── app.service.ts         # Serviço inicial (retorna 'Hello World!')
    │   │   └── main.ts                # Bootstrap da aplicação NestJS
    │   └── test/
    │       ├── app.e2e-spec.ts        # Testes de ponta a ponta (e2e com Supertest)
    │       └── jest-e2e.json          # Configuração Jest para testes e2e
    └── web/                   # Aplicação Frontend (React + Vite + Tailwind)
        ├── .gitignore         # Regras de ignore do frontend (dist, node_modules)
        ├── .oxlintrc.json     # Configuração de regras do linter Oxlint
        ├── index.html         # Template HTML principal da SPA
        ├── package.json       # Scripts e dependências do frontend
        ├── README.md          # Documentação original do template Vite + React
        ├── tsconfig.app.json  # Configuração TS para o código da SPA (src/)
        ├── tsconfig.json      # Configuração TS com referências para app e node
        ├── tsconfig.node.json # Configuração TS para scripts de tooling (vite.config.ts)
        ├── vite.config.ts     # Configuração do bundler Vite
        ├── public/
        │   ├── favicon.svg    # Favicon da aplicação
        │   └── icons.svg      # Sprite de ícones SVG
        └── src/
            ├── App.css        # Folha de estilos legada ou complementar
            ├── App.tsx        # Componente principal React
            ├── index.css      # Diretivas do Tailwind (@tailwind base...) e estilos globais
            ├── main.tsx       # Bootstrap e renderização React DOM
            ├── assets/        # Imagens e vetores estáticos
            │   ├── hero.png
            │   ├── react.svg
            │   └── vite.svg
            └── components/    # Arquitetura de Componentes Atomic Design
                ├── atoms/     # Átomos (ex: Button, Input, Icon, Typography)
                │   └── Button/
                │       ├── Button.tsx
                │       └── Button.spec.tsx  # Teste obrigatório do uso essencial
                ├── molecules/ # Moléculas (ex: SearchBar, FormField)
                │   └── SearchBar/
                │       ├── SearchBar.tsx
                │       └── SearchBar.spec.tsx
                ├── organisms/ # Organismos (ex: Header, PostCard, Feed)
                │   └── Header/
                │       ├── Header.tsx
                │       └── Header.spec.tsx
                ├── templates/ # Templates estruturais de layout
                └── pages/     # Telas da aplicação com dados e rotas
```

---

## 4. Tecnologias e Versões

### 4.1. Ambiente e Monorepo
- **Node.js**: v22.x (testado e validado em `v22.12.0`)
- **Gerenciador de Pacotes**: `pnpm` (lockfile versão `9.0`, validado em `10.34.5`)

### 4.2. Frontend (`apps/web`)
| Tecnologia | Versão Declarada / Alvo | Finalidade |
| :--- | :--- | :--- |
| **React** | `^19.2.8` | Biblioteca de interface declarativa |
| **React DOM** | `^19.2.8` | Renderizador web do React |
| **Tailwind CSS** | `^3.4.x` ou `^4.x` | Framework utilitário de estilização |
| **Atomic Design** | Padrão Arquitetural | Organização modular da biblioteca de componentes |
| **Vite** | `^8.3.0` (instalado `8.3.1`) | Ferramenta de build e servidor de desenvolvimento |
| **@vitejs/plugin-react** | `^6.1.1` | Integração do Vite com React e OXC |
| **TypeScript** | `~6.0.2` | Superset JavaScript tipado estaticamente |
| **Oxlint** | `^1.81.0` | Linter estático de alta performance |
| **Vitest / Testing Library** | Recomendado para SPA React | Execução dos testes essenciais de componentes |

### 4.3. Backend (`apps/server`)
| Tecnologia | Versão Declarada | Finalidade |
| :--- | :--- | :--- |
| **@nestjs/core** | `^10.0.0` (instalado `10.4.22`) | Núcleo do framework NestJS |
| **@nestjs/common** | `^10.0.0` | Decorators, utilitários e interfaces NestJS |
| **@nestjs/platform-express** | `^10.0.0` | Camada de abstração HTTP Express |
| **reflect-metadata** | `^0.2.0` (instalado `0.2.2`) | Suporte a decorators e metadata de injeção |
| **rxjs** | `^7.8.1` (instalado `7.8.2`) | Programação reativa e observáveis |
| **TypeScript** | `^5.1.3` | Compilador TypeScript para o backend |
| **Jest** | `^29.5.0` | Framework de testes unitários e de integração |
| **ts-jest** | `^29.1.0` | Transformador TypeScript para Jest |
| **Supertest** | `^7.0.0` | Utilitário de testes de requisição HTTP e2e |
| **ESLint** | `^8.0.0` | Linter estático |
| **Prettier** | `^3.0.0` | Formatador de código |

---

## 5. Como Executar a Aplicação

Todos os comandos podem ser executados a partir da raiz do monorepo graças aos scripts configurados em `package.json`.

### 5.1. Execução Concorrente (Frontend + Backend)
Para subir o servidor backend e o servidor frontend simultaneamente em modo de desenvolvimento:
```bash
pnpm dev
```
*(Executa `pnpm -r --parallel dev`)*

### 5.2. Execução Específica do Frontend (`apps/web`)
A partir da raiz:
```bash
# Iniciar o servidor de desenvolvimento do Vite (porta padrão: 5173)
pnpm dev:web

# Compilar para produção (tsc -b && vite build)
pnpm build:web

# Visualizar a compilação de produção localmente
pnpm preview:web
```
Ou navegando até a pasta `apps/web`:
```bash
pnpm dev
pnpm build
pnpm preview
```

### 5.3. Execução Específica do Backend (`apps/server`)
A partir da raiz:
```bash
# Iniciar o servidor NestJS em modo watch (recompila a cada alteração)
pnpm dev:server

# Compilar o backend para produção (gera pasta dist/)
pnpm build:server

# Iniciar o backend sem modo watch
pnpm start:server

# Iniciar o backend compilado em produção (node dist/main)
pnpm start:server:prod
```
Ou navegando até a pasta `apps/server`:
```bash
pnpm start:dev
pnpm build
pnpm start:prod
```

---

## 6. Como Executar os Testes e Linters

### 6.1. Testes Automatizados

#### Backend (`apps/server`)
- **Testes Unitários**:
  - Da raiz: `pnpm test:server`
  - No diretório `apps/server`: `pnpm test`
  - Modo interativo/watch: `cd apps/server && pnpm test:watch`
  - Cobertura de código: `cd apps/server && pnpm test:cov`

- **Testes de Ponta a Ponta (E2E)**:
  - Da raiz: `pnpm --filter server test:e2e`
  - No diretório `apps/server`: `pnpm test:e2e`

#### Frontend (`apps/web`)
- **Regra Mandatória**: Todo componente criado deve ter um arquivo de teste adjacente (`<NomeDoComponente>.spec.tsx`) que garanta a validação do seu uso essencial.
- **Execução**:
  - Da raiz: `pnpm --filter web test` (ou script correspondente configurado com Vitest)
  - No diretório `apps/web`: `pnpm test`

### 6.2. Linters e Análise Estática
- **Linter do Frontend**:
  - Da raiz: `pnpm lint:web`
  - No diretório `apps/web`: `pnpm lint` (executa `oxlint`)
- **Linter do Backend**:
  - Da raiz: `pnpm lint:server`
  - No diretório `apps/server`: `pnpm lint` (executa `eslint "{src,apps,libs,test}/**/*.ts" --fix`)
- **Formatação do Backend**:
  - No diretório `apps/server`: `pnpm format` (executa `prettier --write "src/**/*.ts" "test/**/*.ts"`)

---

## 7. Padrões de Código e Diretrizes Arquiteturais

### 7.1. Backend (`apps/server`): Princípios REST Estritos

Para assegurar consistência, previsibilidade e maturidade da API (Nível 2+ do Modelo de Maturidade de Richardson), todas as rotas e controladores devem seguir estas diretrizes:

1. **URIs Semânticas e Orientadas a Recursos**:
   - Sempre utilize substantivos no plural: `/posts`, `/users`, `/categories`.
   - **Nunca use verbos no caminho da URI**:
     - Incorreto: `POST /api/createPost`, `GET /api/getUsers`, `DELETE /api/deleteComment/1`
     - Correto: `POST /posts`, `GET /users`, `DELETE /comments/1`
   - Hierarquias e sub-recursos naturais:
     - `GET /posts/:postId/comments`: Lista comentários de uma postagem específica.
     - `POST /posts/:postId/comments`: Cria um novo comentário vinculado à postagem.
   - Filtros, ordenação e paginação devem ser passados via query parameters, nunca no path:
     - Exemplo: `GET /posts?page=1&limit=10&sort=desc&status=published`

2. **Verbos HTTP Semânticos**:
   - `GET`: Recuperação de recursos. **Idempotente e seguro** (sem efeitos colaterais no estado do servidor).
   - `POST`: Criação de novo recurso subordinado. **Não idempotente**.
   - `PUT`: Substituição integral de um recurso existente. **Idempotente**.
   - `PATCH`: Modificação parcial de atributos de um recurso.
   - `DELETE`: Exclusão de um recurso. **Idempotente**.

3. **Status Codes HTTP Semânticos**:
   - `200 OK`: Sucesso com retorno de payload (consultas, atualizações com retorno).
   - `201 Created`: Criação bem-sucedida de recurso via `POST`. Recomenda-se incluir o cabeçalho `Location` ou o payload do item criado.
   - `204 No Content`: Ação executada com sucesso que não requer retorno de corpo (comum em `DELETE` ou `PUT`/`PATCH` sem payload).
   - `400 Bad Request`: Dados enviados pelo cliente são inválidos ou malformados (falha de validação do DTO via `ValidationPipe`).
   - `401 Unauthorized`: O cliente não está autenticado (falta de token ou token inválido).
   - `403 Forbidden`: O cliente está autenticado, mas não possui autorização/permissão para acessar o recurso.
   - `404 Not Found`: O recurso solicitado não existe na base de dados.
   - `409 Conflict`: Conflito de estado do recurso (ex: tentativa de cadastrar um e-mail já existente).
   - `422 Unprocessable Entity`: Requisição bem formada, mas com erros de validação semântica das regras de negócio.
   - `500 Internal Server Error`: Falha inesperada do servidor (sem vazar detalhes sensíveis ou stack traces em produção).

4. **Tratamento Uniforme de Erros**:
   - Retornos de erro devem seguir uma estrutura JSON padronizada:
     ```json
     {
       "statusCode": 400,
       "message": ["email must be an email"],
       "error": "Bad Request",
       "timestamp": "2026-09-25T22:30:00.000Z",
       "path": "/users"
     }
     ```

5. **Padrões Estruturais do NestJS**:
   - Injeção de dependência via construtor com modificadores explícitos (`constructor(private readonly postsService: PostsService) {}`).
   - DTOs rigorosamente tipados para validação de entrada (`CreatePostDto`, `UpdatePostDto`).
   - Nomenclatura uniforme: `*.controller.ts`, `*.service.ts`, `*.module.ts`, `*.dto.ts`, `*.entity.ts`.

---

### 7.2. Frontend (`apps/web`): Atomic Design, Tailwind e Testes Obrigatórios

#### A. Atomic Design
Os componentes da aplicação devem ser organizados em `apps/web/src/components/` respeitando as cinco camadas conceituais:

1. **Átomos (`src/components/atoms/`)**:
   - Blocos de construção básicos e indivisíveis: botões, inputs de texto, checkboxes, rótulos, ícones isolados, badges.
   - Devem ser puramente visuais, recebendo props e callbacks sem conhecimento de regras de negócio ou requisições de API.
2. **Moléculas (`src/components/molecules/`)**:
   - Agrupamentos simples de átomos atuando conjuntamente: um campo de formulário com rótulo e aviso de erro (`FormField`), uma barra de pesquisa com input e botão (`SearchBar`).
3. **Organismos (`src/components/organisms/`)**:
   - Seções complexas da interface compostas por moléculas e átomos: barra de navegação superior (`Header`), barra lateral (`Sidebar`), cartão de postagem completo com comentários e curtidas (`PostCard`). Podem conter estado local ou invocar hooks de dados.
4. **Templates (`src/components/templates/`)**:
   - Esqueletos de layout estruturais que definem grades, áreas de cabeçalho, conteúdo e rodapé, recebendo componentes via slots/props sem conter dados estáticos específicos.
5. **Páginas / Telas (`src/pages/` ou `src/components/pages/`)**:
   - Telas concretas que instanciam os templates e fornecem os dados reais obtidos da API ou gerenciadores de estado.

#### B. Estilização com Tailwind CSS
- **Classes Utilitárias**: Toda a estilização deve ser feita utilizando as classes do Tailwind CSS no JSX.
- **Evitar CSS inline ou tags `<style>` avulsas**.
- **Consistência de Espaçamento e Cores**: Usar a paleta e os multiplicadores padrão do Tailwind (ex: `p-4`, `gap-2`, `text-sm`, `bg-slate-900`, `text-white`).
- **Responsividade Mobile-First**: Definir estilos padrão para telas menores e sobrescrever com prefixos responsivos (`sm:`, `md:`, `lg:`, `xl:`).
- **Variantes de Estado**: Usar variantes utilitárias (`hover:`, `focus:`, `disabled:`, `dark:`).

#### C. Obrigatoriedade de Testes cobrindo o Uso Essencial
**Regra Inegociável**: Nenhum componente deve ser adicionado ao repositório sem um arquivo de teste adjacente cobrindo o seu uso essencial.

- **Localização**: Sempre co-localizado na mesma pasta do componente:
  ```
  Button/
  ├── Button.tsx
  └── Button.spec.tsx
  ```
- **O que constitui a cobertura do uso essencial?**:
  1. **Renderização Básica**: O componente renderiza corretamente sem lançar erros, exibindo o texto, ícone ou elementos filhos esperados.
  2. **Disparo de Ações e Eventos**: Eventos essenciais (ex: `onClick`, `onChange`, `onSubmit`) são disparados com os argumentos esperados quando o usuário interage.
  3. **Variações Visuais / Props Críticas**: Validação de estados fundamentais definidos por props (ex: `variant="primary"`, `size="sm"`, `disabled={true}`, `isLoading={true}`).
  4. **Acessibilidade Fundamental**: Papéis acessíveis (`role="button"`, `aria-label`, estados desabilitados).

Exemplo de teste de uso essencial para um Átomo (`Button.spec.tsx`):
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button (Atom)', () => {
  it('deve renderizar o conteúdo essencial do botão', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument()
  })

  it('deve disparar o evento onClick quando acionado pelo usuário', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Ação</Button>)
    fireEvent.click(screen.getByRole('button', { name: /ação/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve refletir o estado desabilitado e não disparar o evento', () => {
    const handleClick = vi.fn()
    render(<Button disabled onClick={handleClick}>Desabilitado</Button>)
    const button = screen.getByRole('button', { name: /desabilitado/i })
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
```

---

## 8. Convenções de Git e Mensagens de Commit (Conventional Commits)

Ambos os projetos e toda a raiz do monorepo devem utilizar estritamente o padrão **Conventional Commits** para manter o histórico de alterações rastreável, semântico e compatível com versionamento automatizado.

### 8.1. Estrutura Padrão da Mensagem
```
<tipo>(<escopo opcional>): <descrição no imperativo e minúsculo>

[corpo opcional explicando o motivo da alteração]

[rodapé opcional com referências a issues ou BREAKING CHANGE]
```

### 8.2. Tipos Permitidos
| Tipo | Quando Utilizar |
| :--- | :--- |
| `feat` | Introdução de uma nova funcionalidade no sistema |
| `fix` | Correção de um bug ou comportamento incorreto |
| `refactor` | Refatoração de código sem alterar regra de negócio ou funcionalidade externa |
| `test` | Adição, correção ou refatoração de testes unitários, e2e ou de componentes |
| `docs` | Alteração exclusiva em documentação (`AGENTS.md`, READMEs, comentários) |
| `style` | Alterações puramente de formatação (espaçamento, ponto e vírgula, Prettier) |
| `perf` | Mudança de código voltada diretamente para melhoria de desempenho |
| `chore` | Manutenção de tarefas de build, ajustes de ferramentas, dependências ou configs gerais |
| `ci` | Modificações em scripts e configurações de integração contínua (CI/CD) |

### 8.3. Escopos Recomendados para o Monorepo
Para facilitar o isolamento das mudanças no histórico, use escopos que identifiquem a aplicação ou módulo alterado:
- `web`: Modificações no frontend (`apps/web`).
- `web/atom`: Modificações em átomos do Atomic Design.
- `web/molecule`: Modificações em moléculas.
- `web/organism`: Modificações em organismos.
- `web/page`: Modificações em páginas.
- `server`: Modificações no backend (`apps/server`).
- `server/<modulo>`: Modificações em um módulo específico do backend (ex: `server/posts`, `server/auth`).
- `repo` ou `root`: Modificações nos arquivos globais do monorepo (`package.json`, `pnpm-workspace.yaml`).

### 8.4. Exemplos Práticos
- `feat(web/atom): criar componente Button com variantes de tamanho e suporte a Tailwind`
- `test(web/atom): adicionar teste cobrindo uso essencial do Button`
- `feat(server/posts): adicionar endpoint REST GET /posts com suporte a filtros e paginação`
- `fix(server/posts): retornar 404 ao buscar post com identificador inexistente`
- `docs: atualizar AGENTS.md com diretrizes de REST, Tailwind e Conventional Commits`
- `refactor(web/molecule): reestruturar SearchBar para utilizar o átomo Button`
- `chore(repo): atualizar dependências de desenvolvimento do pnpm`

### 8.5. Breaking Changes
Alterações com quebra de compatibilidade de contrato de API ou interfaces de componentes devem incluir uma exclamação após o tipo/escopo e uma nota no rodapé:
```
feat(server/posts)!: remover suporte ao campo legado authorName em favor do relacionamento authorId

BREAKING CHANGE: O payload de POST /posts agora exige 'authorId' obrigatório em vez de 'authorName'.
```

---

## 9. Regras e Convenções que Devem ser Preservadas

1. **Uso Exclusivo do pnpm**:
   - Nunca use `npm` ou `yarn` para instalar dependências. O monorepo depende do `pnpm-lock.yaml` e dos workspaces do pnpm (`pnpm-workspace.yaml`).

2. **Isolamento de Configuração TypeScript**:
   - Não misture as configurações de compilação do `apps/server` (CommonJS / Node / decorators emitidos) com `apps/web` (ESNext / Bundler / verbatimModuleSyntax).
   - No frontend, preserve o uso de Project References (`tsconfig.app.json` e `tsconfig.node.json`).

3. **Restrições de Sintaxe no Frontend (`erasableSyntaxOnly`)**:
   - No `apps/web`, a regra `erasableSyntaxOnly: true` está habilitada. É proibido usar `enum`, `namespace`, ou `parameter properties` em classes TypeScript no frontend, pois essas sintaxes não podem ser simplesmente apagadas pelo compilador. Use `const` objects ou unions literais (`type Status = 'active' | 'inactive'`).

4. **Imports de Tipos Estritos**:
   - Em virtude de `verbatimModuleSyntax: true` no frontend, sempre importe tipos usando `import type { ... } from '...'`.

5. **Organização de Scripts na Raiz**:
   - Sempre que um novo fluxo ou comando for adicionado a um dos apps, exponha um alias conveniente no `package.json` raiz usando `--filter <app>` para manter a ergonomia do monorepo.

6. **Portas e Variáveis de Ambiente**:
   - O backend escuta em `process.env.PORT ?? 3000`. Essa convenção de fallback deve ser mantida para compatibilidade com ambientes de contêineres e deploy em nuvem.

7. **Testes Obrigatórios de Componentes**:
   - Todo componente adicionado ao frontend deve vir acompanhado de seu teste de uso essencial adjacente.

8. **Adesão a Princípios REST no Backend**:
   - Qualquer novo endpoint criado no backend deve seguir substantivos no plural, verbos corretos e códigos HTTP semânticos.

9. **Mensagens de Commit Semânticas**:
   - Todos os commits do repositório devem seguir a convenção de Conventional Commits.

---

## 10. Decisões Arquiteturais Relevantes

- **Monorepo Simples com Workspaces pnpm**:
  - Evita dependência de ferramentas pesadas de build system (como Turborepo ou Nx) na fase inicial, mantendo o repositório leve e fácil de clonar e executar.
- **Atomic Design no Frontend**:
  - Garante escalabilidade da UI, desacopla elementos básicos de regras de negócio complexas e facilita a criação de design systems reutilizáveis.
- **Tailwind CSS para Estilização**:
  - Adoção de CSS utilitário para agilidade no desenvolvimento, eliminação de arquivos CSS gigantes e manutenção simplificada do design.
- **RESTful API Semântica no Backend**:
  - Garante previsibilidade para clientes frontend, padronização no consumo de dados e total aderência às melhores práticas de desenvolvimento de APIs web.
- **Diferenciação de Linters**:
  - O frontend adotou `oxlint` para ganho massivo de performance em checagem estática no desenvolvimento do React.
  - O backend mantém `eslint` tradicional com plugins do ecossistema NestJS e Prettier integrado.

---

## 11. Pontos de Atenção para Futuras Alterações

1. **Habilitação de CORS no Backend**:
   - No estado atual, o arquivo `apps/server/src/main.ts` não possui chamada a `app.enableCors()`.
   - Quando o frontend (`apps/web` em `http://localhost:5173`) começar a consumir endpoints do backend (`http://localhost:3000`), será mandatório ativar o CORS no NestJS ou configurar proxy reverso no `vite.config.ts`.

2. **Instalação e Configuração do Tailwind CSS no Frontend**:
   - Ao iniciar a criação de novos componentes com Tailwind, assegurar a presença de `tailwindcss`, `postcss` e `autoprefixer` (ou Tailwind v4 com `@tailwindcss/vite`) nas configurações do `apps/web`.

3. **Configuração do Runner de Testes do Frontend**:
   - Para suportar a regra obrigatória de testes nos componentes (`*.spec.tsx`), instalar e configurar o `Vitest` com `@testing-library/react`, `@testing-library/jest-dom` e `jsdom` em `apps/web`.

4. **Gerenciamento Centralizado de Variáveis de Ambiente**:
   - O backend ainda não possui o pacote `@nestjs/config` configurado. Futuras integrações com banco de dados ou autenticação exigirão a instalação do `@nestjs/config` e importação do `ConfigModule` no `AppModule`.
   - No frontend, qualquer variável injetada deve seguir o padrão do Vite (`VITE_*` acessadas via `import.meta.env`).

5. **Criação de Pacote Compartilhado (`packages/shared`)**:
   - À medida que entidades, DTOs e contratos de API forem criados no `apps/server`, será altamente recomendável criar um pacote compartilhado em `packages/shared` ou `packages/types` dentro do monorepo para evitar duplicidade de interfaces TypeScript entre cliente e servidor.

6. **Validação de DTOs no Backend**:
   - Para que as regras de status code 400 (Bad Request) e integridade de dados REST funcionem de forma automática, deve-se registrar o `ValidationPipe` global em `main.ts` (`app.useGlobalPipes(new ValidationPipe({ whitelist: true }))`) com as bibliotecas `class-validator` e `class-transformer`.
