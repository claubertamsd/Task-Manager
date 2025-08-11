# Gerenciador de Tarefas - API

Este projeto consiste em uma API RESTful para gerenciamento de tarefas, desenvolvida como parte de um desafio da Rocketseat.

## Funcionalidades

- Autenticação e autorização utilizando JWT
- Níveis de acesso: administrador e membro
- Gerenciamento de usuários e equipes
- CRUD de tarefas com:
  - Status: pendente, em progresso, concluído
  - Prioridade: alta, média, baixa
  - Atribuição a membros


## Tecnologias Utilizadas

- Node.js com Express
- TypeScript
- PostgreSQL com Prisma ORM
- Zod para validações
- Jest para testes automatizados
- Docker para ambiente isolado
- JWT para autenticação
- Render para deploy em produção



## Utilização com Docker

Para subir o projeto com Docker:

    docker-compose up --build

## Execução Local

1. Clone o repositório:

       git clone https://github.com/seu-usuario/gerenciador-tarefas-api.git

2. Instale as dependências:

       npm install

3. Configure o arquivo .env (exemplo abaixo)

4. Execute as migrations:

       npx prisma migrate dev

5. Inicie o servidor:

       npm run dev

## Exemplo de Arquivo .env

    DATABASE_URL="postgresql://user:password@localhost:5432/gerenciador"
    JWT_SECRET="sua_chave_secreta"
    PORT=3333

## Deploy

A aplicação ficará disponível em produção por meio da plataforma Render.

## Licença

Este projeto está licenciado sob os termos da licença MIT.