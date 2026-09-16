# ⚙ VAULT-TEC Memory Game

A full-stack Fallout/Vault-Tec-inspired memory card matching game built with React, Node.js, Express, and MongoDB.

![Vault-Tec](https://img.shields.io/badge/VAULT--TEC-Approved-gold?style=for-the-badge&labelColor=03172D)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square)

## 🎮 Features

- **Memory Card Game** — Match pairs of Vault-Tec themed cards
- **3 Difficulty Levels** — Easy (4×4), Medium (5×4), Hard (6×6)
- **3D Card Flip Animation** — Smooth CSS 3D transforms
- **18 Unique SVG Card Icons** — Original retro sci-fi designs
- **Timer & Move Counter** — Track your performance
- **Star Rating System** — 3-star rating based on moves/time
- **Move Limit Mode** — Optional maximum move restriction
- **Pause/Resume** — Freeze the game at any time
- **Reveal Pair Hints** — 3 hints per game to reveal a pair
- **Play Demo** — Auto-demonstration of gameplay
- **Sound Effects** — Web Audio API sounds (flip, match, win, etc.)
- **Mute Toggle** — Silence all sounds
- **User Authentication** — Register/Login with JWT
- **Leaderboard** — Ranked scores with difficulty filter
- **Score History** — Personal game history on profile page
- **Export CSV** — Download leaderboard as CSV
- **Share Scores** — Native sharing via navigator.share
- **Responsive Design** — Desktop, tablet, and mobile layouts

## 🛠 Tech Stack

### Frontend
- React 19 + Vite
- React Router DOM v7
- Axios
- CSS (Vault-Tec design system)
- Web Audio API

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS

## 📁 Folder Structure

```
memory-game/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Card.jsx       # Single card with 3D flip
│   │   │   ├── GameBoard.jsx  # Card grid + controls
│   │   │   ├── Sidebar.jsx    # Stats/controls/leaderboard panel
│   │   │   ├── Stats.jsx      # Moves/timer/rating/pairs
│   │   │   ├── DifficultySelector.jsx
│   │   │   ├── GameControls.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── Header.jsx
│   │   │   └── WinModal.jsx
│   │   ├── pages/             # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── LeaderboardPage.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useGame.js     # Core game logic
│   │   │   └── useTimer.js    # Timer management
│   │   ├── services/          # API communication
│   │   │   ├── api.js         # Axios instance
│   │   │   ├── authService.js
│   │   │   └── scoreService.js
│   │   ├── data/
│   │   │   └── cards.js       # 18 SVG card types + configs
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── App.jsx
│   │   ├── App.css            # Complete design system
│   │   └── main.jsx
│   └── package.json
│
├── server/                    # Express backend
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── gameController.js
│   │   └── leaderboardController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Game.js
│   │   └── Score.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── gameRoutes.js
│   │   └── leaderboardRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── config/
│   │   └── db.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
├── .env.example
├── package.json              # Root scripts (concurrently)
└── README.md
```

## 🚀 Installation

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org)
- **MongoDB** — Local install or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)

### Step 1: Clone the repository

```bash
cd memory-game
```

### Step 2: Install all dependencies

```bash
# Install root dependencies (concurrently)
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

### Step 3: Set up MongoDB

**Option A: Local MongoDB**
1. Install MongoDB Community Server
2. Start the MongoDB service:
   ```bash
   mongod
   ```
3. The default connection string is: `mongodb://localhost:27017/vaulttec-memory`

**Option B: MongoDB Atlas (Cloud)**
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Update `server/.env` with your connection string

### Step 4: Configure environment variables

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/vaulttec-memory
JWT_SECRET=your_super_secret_key_change_this
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start the application

**Run both frontend and backend together:**
```bash
npm run dev
```

**Or run them separately:**
```bash
# Terminal 1 — Backend
npm run server

# Terminal 2 — Frontend
npm run client
```

### Step 6: Open in browser

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 🎯 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login & get JWT token | No |
| GET | `/api/auth/me` | Get current user profile | Yes |

### Games

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/games` | Create a new game session | Optional |
| GET | `/api/games/:id` | Get game details | Optional |
| PATCH | `/api/games/:id` | Update game progress | Optional |
| POST | `/api/games/:id/complete` | Complete game & save score | Optional |

### Leaderboard & Scores

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/leaderboard` | Get ranked scores | No |
| GET | `/api/leaderboard?difficulty=easy` | Filter by difficulty | No |
| POST | `/api/scores` | Submit a score | Yes |
| GET | `/api/scores/me` | Get my score history | Yes |

## 🔐 Authentication

Authentication uses **JSON Web Tokens (JWT)**:

1. User registers or logs in → server returns a JWT token
2. Token is stored in `localStorage` as `vt_token`
3. The Axios interceptor automatically attaches the token to all API requests
4. Protected routes verify the token on the server
5. Token expires after 30 days
6. **Guests can play** the game — login is only required to save scores

Password security:
- Passwords are hashed with **bcrypt** (12 salt rounds)
- Passwords are never returned in API responses (`select: false`)
- Login returns the same error for wrong email or wrong password (prevents email enumeration)

## 🃏 Game Logic

### Deck Generation
1. Select N random card types from the 18 available (N = pairs for difficulty)
2. Duplicate each to create pairs
3. Assign unique IDs (e.g., `vault-boy-a`, `vault-boy-b`)
4. **Fisher-Yates shuffle** the deck

### Card Matching Algorithm
1. Player clicks first card → flip it, store in `flippedCards`
2. Player clicks second card → flip it, add to `flippedCards`, increment moves
3. Compare both cards by `type` property:
   - **Match**: Add both IDs to `matchedCards`, clear `flippedCards`
   - **No match**: Wait 1 second, then flip both back
4. Check if all cards matched → trigger WIN state

### Click Prevention
- Cannot click the same card twice
- Cannot click while 2 cards are being compared
- Cannot click matched cards
- Cannot click during pause, demo, or game over

### Rating Calculation
Based on move efficiency and time per pair:
- **3 stars** ★★★: ≤1.6 moves per pair AND ≤5 seconds per pair
- **2 stars** ★★☆: ≤2.2 moves per pair AND ≤8 seconds per pair
- **1 star** ★☆☆: Everything else

## 📊 Score Storage

Scores are stored in MongoDB when:
1. The user is authenticated (has valid JWT)
2. The game is won (all pairs found)
3. The score passes server-side validation

Server validates:
- Moves ≥ pairs found (impossible to match in fewer moves)
- Pairs found ≤ total pairs
- Time is non-negative
- Rating is 1-3

## 🏆 Leaderboard Ranking

Scores are ranked by (in priority order):
1. **Most pairs** completed (descending)
2. **Fewest moves** (ascending)
3. **Least time** (ascending)

MongoDB compound index ensures efficient queries:
```
{ difficulty: 1, pairs: -1, moves: 1, time: 1 }
```

## 🏗 Production Build

```bash
cd client
npm run build
```

The built files will be in `client/dist/`. Serve them with any static file server.

## 📄 License

MIT
