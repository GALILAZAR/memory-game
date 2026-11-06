# Vault-Tec Memory Game

A memory-card matching game with a React frontend and an Express API. Play as a guest or create an account to save game results and view leaderboards.

## Features

- Three difficulty levels: easy, medium, and hard.
- Timed card-matching gameplay with move counts and completion ratings.
- Guest play, account registration and login, and a player profile.
- Leaderboards with optional difficulty filtering.
- PostgreSQL persistence for users, games, and scores.

## Technology

- **Frontend:** React 19, React Router, Vite, Axios
- **Backend:** Node.js, Express 5
- **Database:** PostgreSQL with Sequelize
- **Authentication:** JSON Web Tokens

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL

### Install dependencies

From the repository root, run:

```bash
npm run install-all
```

### Configure environment

Configure the backend variables in `server/.env`:

```env
PORT=5000
DATABASE_URL=postgres://<username>:<password>@localhost:5432/memorygame
JWT_SECRET=<a-long-random-secret>
```

Create the `memorygame` database in PostgreSQL before starting the server. Sequelize connects to it and synchronizes the application models at startup.

Optionally configure the frontend API URL in `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

When omitted, the frontend uses `/api` as its API base URL.

### Run the application

Start the frontend and backend together:

```bash
npm run dev
```

The Vite development server is available at `http://localhost:5173`, and the API runs at `http://localhost:5000`.

You can also run either part separately:

```bash
npm run server
npm run client
```

Create a production frontend build with:

```bash
npm run build
```

## Application Routes

| Path | Description |
| --- | --- |
| `/` | Play the memory game |
| `/login` | Sign in |
| `/register` | Create an account |
| `/profile` | View player profile and scores |
| `/leaderboard` | View the leaderboard |

## API Overview

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Check API availability |
| `POST` | `/auth/register` | Register an account |
| `POST` | `/auth/login` | Sign in |
| `GET` | `/auth/me` | Get the authenticated user |
| `POST` | `/games` | Create a game session |
| `GET` | `/games/:id` | Retrieve a game session |
| `PATCH` | `/games/:id` | Update a game session |
| `POST` | `/games/:id/complete` | Complete a game |
| `GET` | `/leaderboard` | Get leaderboard results; accepts an optional `difficulty` query |
| `POST` | `/scores` | Submit a score (authenticated) |
| `GET` | `/scores/me` | Get the authenticated user's scores |

## Project Structure

```text
client/   React application and Vite configuration
server/   Express API, Sequelize models, routes, and controllers
```

## License

This project is licensed under the MIT License.
