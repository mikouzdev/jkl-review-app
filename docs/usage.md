# Docker usage

## Development compose stack  
`docker compose -f docker-compose.dev.yml up --build`  
- it starts both front and backend and refreshes on changes.

## "Production" compose stack  
`docker compose -f docker-compose.prod.yml up --build`
- it builds both front and backend and copies the frontend build to be served statically by the express server. 