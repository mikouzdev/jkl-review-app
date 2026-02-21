# Usage

- you need to setup the .env file found at the project root. Rename it from .env.example to just .env and fill in the missing fields.

## Docker usage

## Development compose stack

`docker compose -f docker-compose.dev.yml up --build`

- it starts both front and backend, and refreshes on changes.
- after you have your docker dev container running, you need to exec the following commands inside the container:

1. `npm run prisma:migrate:dev`
2. `npm run prisma:seed`

## "Production" compose stack

`docker compose -f docker-compose.prod.yml up --build`

- it builds both front and backend and copies the frontend build to be served statically by the express server.
