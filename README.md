# Rishi Dusane — Portfolio

A responsive, dark-themed single-page portfolio. The frontend includes static portfolio content and can be deployed independently; an optional read-only Express API can override that content.

## Prerequisites

- Node.js 20.19 or newer (or 22.12+) and npm
- MySQL 8.0
- Docker Desktop (optional, for the complete Docker setup)

## Local setup

1. From this directory, install all workspace dependencies:

   ```sh
   npm install
   ```

2. Copy `server/.env.example` to `server/.env` and set the credentials for a MySQL user that can create databases. To use the optional API in the client, set `VITE_API_URL` in `client/.env` to its base URL. Without that setting, the client uses its bundled static content and does not contact a backend.

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

Place your actual PDF at `client/public/resume.pdf`. The hero and navbar download buttons link directly to `/resume.pdf`, which Vite and Vercel serve as a static asset.

## Docker

From this directory, start MySQL, the API, and the Nginx-served client:

```sh
docker compose up --build
```

Visit `http://localhost:8080`. Nginx serves the SPA with history fallback and proxies `/api` to the server container. The MySQL data is stored in the `mysql_data` volume. Compose uses development-only default database passwords; override `DB_ROOT_PASSWORD`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` in your shell or a root `.env` file before using it beyond local development. The server waits for MySQL's healthcheck before starting, and its healthcheck verifies database connectivity.

## Deployment notes

- **Vercel frontend:** create a project from this repository and set the Root Directory to `client`, Framework Preset to `Vite`, Build Command to `npm run build`, and Output Directory to `dist`. The frontend builds from its own package manifest and uses bundled static content unless an optional `VITE_API_URL` is configured.
- The Vercel project is the `client` npm workspace. Its `vercel.json` installs from the workspace root (using the root `package-lock.json`) and builds the Vite client to `dist`; this does not start or require the API or database.
- From the repository root, push the portfolio changes with:

  ```sh
  git add README.md client
  git commit -m "Prepare portfolio frontend for Vercel"
  git push origin main
  ```

- After deployment, open the site URL and `/resume.pdf` directly. Check the About, Skills, Projects, Education, and Contact links, then click either Download Resume button and confirm the downloaded file is `Rishi_Dusane_Resume.pdf`.
- **Generic VPS:** build the images with Docker Compose, use strong database credentials, configure a persistent MySQL volume, and put a TLS-enabled reverse proxy (such as Caddy or Nginx) in front of the client.
- **Render/Railway:** deploy the client and server as separate services, provision a managed MySQL 8 database, and set the server environment variables in the provider dashboard. Set `CLIENT_ORIGIN` to the deployed client origin. Build the client with `VITE_API_URL` pointing to the public API base URL plus `/api`, or keep the bundled Nginx proxy when deploying the Docker stack.
- Keep secrets in provider environment settings; do not commit `.env` files. Run `npm run db:setup` once against the target database before exposing the app.
