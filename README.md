# Rishi Dusane — Portfolio

A responsive, dark-themed single-page portfolio. Portfolio content is stored in MySQL and served to the React client by a read-only Express API.

## Prerequisites

- Node.js 20.19 or newer (or 22.12+) and npm
- MySQL 8.0
- Docker Desktop (optional, for the complete Docker setup)

## Local setup

1. From this directory, install all workspace dependencies:

   ```sh
   npm install
   ```

2. Copy `server/.env.example` to `server/.env` and set the credentials for a MySQL user that can create databases. Copy `client/.env.example` to `client/.env` if the API is not at `http://localhost:3000/api`.

   Required server settings: `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `CLIENT_ORIGIN`. `CLIENT_ORIGIN` can be a comma-separated list of exact allowed origins.

3. With MySQL running, create the schema and load the seed data:

   ```sh
   npm run db:setup
   ```

   The setup command creates the configured database if necessary, creates the tables, and replaces the seed records transactionally. It uses `DELETE` statements rather than MySQL `TRUNCATE`, since `TRUNCATE` implicitly commits and cannot be rolled back.

4. Start the API and Vite development server together:

   ```sh
   npm run dev
   ```

   Open `http://localhost:5173`. The API listens on `http://localhost:3000`.

Useful checks:

```sh
npm run lint
npm run build
```

## Resume

Place your PDF at `client/public/Rishi_Dusane_Resume.pdf`. The navbar and hero download buttons link directly to `/Rishi_Dusane_Resume.pdf`.

## Docker

From this directory, start MySQL, the API, and the Nginx-served client:

```sh
docker compose up --build
```

Visit `http://localhost:8080`. Nginx serves the SPA with history fallback and proxies `/api` to the server container. The MySQL data is stored in the `mysql_data` volume. Compose uses development-only default database passwords; override `DB_ROOT_PASSWORD`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in your shell or a root `.env` file before using it beyond local development. The server waits for MySQL's healthcheck before starting, and its healthcheck verifies database connectivity.

## Deployment notes

- **Generic VPS:** build the images with Docker Compose, use strong database credentials, configure a persistent MySQL volume, and put a TLS-enabled reverse proxy (such as Caddy or Nginx) in front of the client.
- **Render/Railway:** deploy the client and server as separate services, provision a managed MySQL 8 database, and set the server environment variables in the provider dashboard. Set `CLIENT_ORIGIN` to the deployed client origin. Build the client with `VITE_API_URL` pointing to the public API base URL plus `/api`, or keep the bundled Nginx proxy when deploying the Docker stack.
- Keep secrets in provider environment settings; do not commit `.env` files. Run `npm run db:setup` once against the target database before exposing the app.
