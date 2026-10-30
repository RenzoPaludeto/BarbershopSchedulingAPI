# Barbershop Scheduling API

API de agendamento para barbearias, desenvolvida em Node.js com Express e MariaDB. Projeto de portfólio, somente backend.

> **Status:** em desenvolvimento. Hoje existe a fundação do projeto (servidor, configuração, conexão com o banco e `GET /health`). As funcionalidades de agendamento estão no [roadmap](#roadmap).

## Stack

- Node.js (>= 20) e Express 5
- MariaDB, acessado com o driver `mysql2` e SQL puro
- `dotenv` para variáveis de ambiente
- ESLint e Prettier para qualidade e padronização de código

## Pré-requisitos

- Node.js 20 ou superior (há um `.nvmrc`; com nvm, rode `nvm use`)
- MariaDB instalado e em execução (desenvolvido no Debian 13)
- Git

## Como rodar

### 1. Clonar e instalar

```bash
git clone https://github.com/RenzoPaludeto/BarbershopSchedulingAPI.git
cd BarbershopSchedulingAPI
npm install
```

### 2. Configurar o banco de dados

Acesse o MariaDB como administrador (`sudo mariadb`) e execute, trocando a senha:

```sql
CREATE DATABASE barbearia_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE barbearia_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'barbearia_app'@'localhost' IDENTIFIED BY 'troque_esta_senha';
GRANT ALL PRIVILEGES ON barbearia_dev.* TO 'barbearia_app'@'localhost';
GRANT ALL PRIVILEGES ON barbearia_test.* TO 'barbearia_app'@'localhost';
FLUSH PRIVILEGES;
```

O usuário não é `root` e só tem permissão nos dois bancos do projeto.

### 3. Configurar as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com os seus valores. O arquivo `.env` não é versionado.

| Variável      | Descrição                                       | Exemplo             |
| ------------- | ----------------------------------------------- | ------------------- |
| `NODE_ENV`    | Ambiente: `development`, `test` ou `production` | `development`       |
| `PORT`        | Porta da API                                    | `3030`              |
| `DB_HOST`     | Host do MariaDB                                 | `localhost`         |
| `DB_PORT`     | Porta do MariaDB (opcional, padrão `3306`)      | `3306`              |
| `DB_USER`     | Usuário do banco (não use root)                 | `barbearia_app`     |
| `DB_PASSWORD` | Senha do usuário                                | `troque_esta_senha` |
| `DB_NAME`     | Nome do banco                                   | `barbearia_dev`     |

Todas as variáveis são obrigatórias, exceto `DB_PORT` (padrão `3306`). Se alguma obrigatória estiver ausente ou inválida, a API não inicia e informa quais são.

### 4. Iniciar a API

```bash
npm run dev    # desenvolvimento, reinicia ao salvar (node --watch)
npm start      # execução simples
```

### 5. Verificar

```bash
curl -i localhost:3030/health
```

Resposta esperada com o banco disponível: `200` e `{"status":"ok","database":"up"}`. Se o banco estiver fora do ar, a resposta é `503` e `{"status":"error","database":"down"}`.

## Scripts

| Script                 | O que faz                                  |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Inicia a API com reinício automático       |
| `npm start`            | Inicia a API                               |
| `npm run lint`         | Analisa o código com ESLint                |
| `npm run lint:fix`     | Aplica correções automáticas do ESLint     |
| `npm run format`       | Formata o código com Prettier              |
| `npm run format:check` | Verifica a formatação sem alterar arquivos |

## Estrutura

```
.
├── app.js            # monta o Express e as rotas (não abre porta)
├── src/
│   ├── server.js     # ponto de entrada: sobe o servidor
│   ├── config/       # leitura e validação das variáveis de ambiente
│   └── db/           # pool de conexões do MariaDB
├── .env.example
└── eslint.config.mjs
```

O `app.js` fica separado do `server.js` para que os testes automatizados (marco 6) possam importar a aplicação sem abrir uma porta.

## Decisões técnicas

- **Express:** framework mais difundido do ecossistema Node, com muita documentação. Fastify não foi descartado e pode ser avaliado numa migração futura.
- **MariaDB com `mysql2` e SQL puro:** para aprender SQL e o que acontece entre a API e o banco, sem a abstração de um ORM.
- **Sem Docker:** o MariaDB roda direto na máquina de desenvolvimento, para manter o MVP simples.
- **CommonJS:** não exige configuração extra e é o que já domino. A migração para TypeScript (e ESM) está planejada como refatoração.
- **Estrutura simples:** sem camadas de pastas no MVP. Elas serão criadas conforme houver regra de negócio para separar.
- **Datas em UTC:** o banco e o pool (`timezone: 'Z'`) usam UTC, e a API trafega datas em ISO 8601. Evita ambiguidade com fusos e horário de verão nas regras de agenda.
- **Usuário dedicado no banco:** princípio do menor privilégio. Em produção, o ideal seria separar o usuário da aplicação do usuário das migrations.
- **`node --watch` e `dotenv`:** reinício automático nativo, sem dependência extra, e carregamento do `.env` com a biblioteca padrão de mercado.

## Fluxo de trabalho

- Commits no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `docs:`, `chore:`, `style:`, `test:`).
- Uma branch por tarefa (por exemplo, `feat/health-endpoint`) e Pull Request para `main`.

## Roadmap

Escopo do MVP: barbearia única, login de admin e de cliente, um serviço por agendamento, grade fixa de horários, marcar e cancelar (cancelamento até 24h antes).

- [x] Marco 0: fundação do repositório, configuração e conexão com o banco
- [ ] Marco 1: modelagem do banco e requisitos
- [ ] Marco 2: CRUD de barbeiros, serviços e clientes
- [ ] Marco 3: regras de agenda (horários, conflitos, cancelamento)
- [ ] Marco 4: autenticação e permissões
- [ ] Marco 5: validação e tratamento de erros
- [ ] Marco 6: testes automatizados
- [ ] Marco 7: documentação da API (OpenAPI/Swagger)
- [ ] Marco 8: deploy

Pós-MVP: alteração de agendamento (antecedência mínima de 48h, configurável pelo admin) e migração para TypeScript.

## Autor

Renzo Paludeto
