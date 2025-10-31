# dockerfile for building the "production" version of the app

#frontend build
FROM node:24-alpine AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

#backend build
FROM node:24-alpine AS backend
WORKDIR /backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

# prod runtime
FROM node:24-alpine AS prod
WORKDIR /app

# install backend runtime deps
COPY backend/package*.json ./
RUN npm ci

# copy backend compiled output
COPY --from=backend /backend/dist ./dist

# copy frontend compiled output
COPY --from=frontend /frontend/dist ./frontend/dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
