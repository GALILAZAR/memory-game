# ⚙ VAULT-TEC MEMORY GAME — PROJECT & INTERVIEW HANDBOOK

> **A full-stack Fallout/Vault-Tec themed retro sci-fi memory matching game built with React 19, Node.js, Express 5, PostgreSQL, and Sequelize ORM.**

![Vault-Tec](https://img.shields.io/badge/VAULT--TEC-Approved-gold?style=for-the-badge&labelColor=03172D)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791?style=flat-square&logo=postgresql)
![Sequelize](https://img.shields.io/badge/Sequelize-6.37.8-52B0E7?style=flat-square&logo=sequelize)
![JWT](https://img.shields.io/badge/JWT-Auth-black?style=flat-square&logo=jsonwebtokens)
![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Synthesized-FF6F00?style=flat-square)

---

## 📑 TABLE OF CONTENTS

1. [Project Overview & Architecture](#-project-overview--architecture)
2. [Tech Stack & Justifications](#-tech-stack--justifications)
3. [Features & Capabilities](#-features--capabilities)
4. [Folder Structure & Clean Architecture](#-folder-structure)
5. [Installation & Setup](#-installation--setup)
6. [RESTful API Specification](#-restful-api-specification)
7. [Comprehensive Interview Questions & Answers](#-the-interview-handbook)
   - [Section 1: High-Level Architecture & System Design](#section-1-high-level-architecture--system-design)
   - [Section 2: Frontend Engineering & React 19 Internals](#section-2-frontend-engineering--react-19-internals)
   - [Section 3: Backend Architecture & Express 5](#section-3-backend-architecture--express-5)
   - [Section 4: Database Design, PostgreSQL & Sequelize ORM](#section-4-database-design-postgresql--sequelize-orm)
   - [Section 5: Security, Authentication & Anti-Cheat Mechanisms](#section-5-security-authentication--anti-cheat-mechanisms)
   - [Section 6: Algorithms, Mathematics & Game Logic](#section-6-algorithms-mathematics--game-logic)
   - [Section 7: Performance Optimization & Scalability](#section-7-performance-optimization--scalability)
   - [Section 8: Real-World Debugging Case Study (The PostgreSQL Sync Bug)](#section-8-real-world-debugging-case-study)
   - [Section 9: Rapid-Fire Interview Flashcards](#section-9-rapid-fire-interview-flashcards)

---

## 🌟 Project Overview & Architecture

The **Vault-Tec Memory Game** is a full-stack web application designed with high visual fidelity and robust backend architecture. It features a retro-futuristic terminal UI inspired by the *Fallout* universe, paired with an algorithmic card game engine, synthesized sound generation (Web Audio API), JWT-based stateless authentication, persistent session tracking, and a PostgreSQL-backed global leaderboard.

### Architecture Diagram

```mermaid
graph TD
    subgraph Client [Frontend: React 19 + Vite]
        UI[UI Components / Pages] --> Hooks[Custom Hooks: useGame & useTimer]
        Hooks --> WebAudio[Web Audio API Synthesizer]
        Hooks --> AxiosInst[Axios HTTP Client + Interceptor]
        UI --> AuthCtx[AuthContext / localStorage]
    end

    subgraph Server [Backend: Express 5.1 on Node.js]
        AxiosInst -->|HTTP / JSON + Bearer JWT| Middlewares[CORS & Auth Middlewares]
        Middlewares --> Routes[Express Routers: auth, game, leaderboard]
        Routes --> Controllers[Controllers: auth, game, leaderboard]
        Controllers --> ErrHandler[Global Error Middleware]
    end

    subgraph Storage [Database: PostgreSQL + Sequelize]
        Controllers --> ORM[Sequelize ORM Models]
        ORM -->|Connection Pool| PG[(PostgreSQL Database)]
        PG -->|Tables| T1[users]
        PG -->|Tables| T2[games]
        PG -->|Tables| T3[scores]
    end
```

---

## 🛠 Tech Stack & Justifications

| Layer | Technology | Version | Engineering Rationale |
|---|---|---|---|
| **Frontend Framework** | React | `19.1.0` | Declarative UI, efficient Virtual DOM reconciliation, modern hooks (`useCallback`, `useRef`, `useContext`). |
| **Bundler & Tooling** | Vite | `6.3.5` | Instant HMR (Hot Module Replacement), native ES modules support, optimized rollup production builds. |
| **Routing** | React Router DOM | `7.6.2` | Declarative client-side routing, protected routes, URL state sync. |
| **Audio Engine** | Web Audio API | Native Browser | Zero audio asset payloads (no mp3/wav files). Low-latency programmatic sound synthesis using `OscillatorNode` and `GainNode`. |
| **Styling** | Vanilla CSS3 | Standard | Custom Vault-Tec design system with CSS variables, GPU-accelerated 3D transforms (`perspective`, `backface-visibility`), CRT scanlines, and responsive grid layouts without framework overhead. |
| **Backend Runtime** | Node.js + Express | `5.1.0` | Express 5 offers native async error propagation (eliminating repetitive `try/catch` wrappers), lightweight micro-framework footprint, and high I/O throughput. |
| **Database** | PostgreSQL | `16+` | Strict ACID compliance, relational integrity with foreign keys, ENUM types, and compound B-tree indexing for sub-millisecond leaderboard sorting. |
| **ORM** | Sequelize | `6.37.8` | Object-Relational Mapping with schema validation, lifecycle hooks (password hashing), declarative model associations, and automatic migration synchronization (`alter: true`). |
| **Authentication** | JWT (`jsonwebtoken`) + `bcryptjs` | `9.0.2` / `3.0.2` | Stateless authorization using HMAC-SHA256 tokens stored client-side; one-way salted password hashing (12 salt rounds). |
| **Validation** | `express-validator` | `7.2.1` | Declarative schema validation and sanitization for request payloads before controller execution. |

---

## 🎮 Features & Capabilities

- 🃏 **3 Difficulty Levels**: Easy (4×4 grid, 8 pairs), Medium (5×4 grid, 10 pairs), Hard (6×6 grid, 18 pairs).
- 🔄 **3D Card Flip Animation**: Hardware-accelerated CSS 3D transforms with flip state tracking.
- 🎨 **18 Custom SVG Icons**: Pure inline SVG graphics representing Fallout Pip-Boy perks and items.
- ⏱ **Precision Stopwatch & Move Tracker**: Decoupled `useTimer` hook running on `requestAnimationFrame` / `setInterval` with pause/resume support.
- 🌟 **Dynamic Star Rating Formula**: Computes a 1-to-3 star performance rating based on move efficiency ratios and time per pair.
- 🔊 **Zero-Asset Web Audio Synthesizer**: Procedural sound generation for flip, match, mismatch, victory, game-over, and button clicks.
- 🤖 **Play Demo Mode**: Automated asynchronous demonstration that showcases game mechanics without user input.
- 💡 **Tactical Hint System**: Reveals an unrevealed pair for 1.2 seconds (limited to 3 uses per session).
- 🔒 **Guest & Authenticated Gameplay**: Guests can play freely; logging in unlocks automatic persistent game tracking, leaderboard submission, and personal profile stats.
- 🏆 **High-Performance Leaderboard**: Multi-criteria ranking (Pairs DESC, Moves ASC, Time ASC) supported by PostgreSQL compound indexes.

---

## 📁 Folder Structure

```
memory-game/
├── client/                               # Frontend Single Page Application (SPA)
│   ├── src/
│   │   ├── components/                   # Modular UI Components
│   │   │   ├── Card.jsx                  # 3D flippable card component
│   │   │   ├── GameBoard.jsx             # Responsive CSS grid & card orchestration
│   │   │   ├── GameControls.jsx          # New Game, Pause, Demo, Hint controls
│   │   │   ├── DifficultySelector.jsx   # Difficulty tier switcher
│   │   │   ├── Header.jsx                # Navigation, User status, Sound toggle
│   │   │   ├── Sidebar.jsx               # HUD panel displaying stats & leaderboard preview
│   │   │   ├── Stats.jsx                 # Live HUD: moves, timer, rating, pairs
│   │   │   ├── WinModal.jsx              # Victory celebration & summary modal
│   │   │   ├── AuthModal.jsx             # Quick login/register popover
│   │   │   └── Leaderboard.jsx           # Tabular ranking presentation
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Global user authentication provider
│   │   ├── data/
│   │   │   └── cards.js                  # 18 SVG definitions, difficulty configs, constants
│   │   ├── hooks/
│   │   │   ├── useGame.js                # Core game engine state machine & DB sync
│   │   │   └── useTimer.js               # Precision timer hook with pause/resume
│   │   ├── pages/
│   │   │   ├── Home.jsx                  # Main arena page
│   │   │   ├── Login.jsx                 # Full login view
│   │   │   ├── Register.jsx              # Vault registration view
│   │   │   ├── Profile.jsx               # Personal score history & best metrics
│   │   │   └── LeaderboardPage.jsx       # Comprehensive leaderboard view with filters
│   │   ├── services/
│   │   │   ├── api.js                    # Axios instance with request/response interceptors
│   │   │   ├── authService.js            # Auth API client
│   │   │   └── scoreService.js           # Game & Score REST client
│   │   ├── App.jsx                       # Root layout & route configuration
│   │   ├── App.css                       # Global design system & theme tokens
│   │   └── main.jsx                      # Vite entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                               # Backend RESTful API Server
│   ├── config/
│   │   └── db.js                         # Sequelize singleton & DB connection pool
│   ├── controllers/
│   │   ├── authController.js             # Registration, login, profile retrieval
│   │   ├── gameController.js             # Game lifecycle: create, sync, complete
│   │   └── leaderboardController.js      # Ranked leaderboard queries & user stats
│   ├── middleware/
│   │   ├── authMiddleware.js             # protect (strict JWT) & optionalAuth (guest play)
│   │   └── errorMiddleware.js            # Centralized 404 & 500 error dispatcher
│   ├── models/
│   │   ├── index.js                      # Relational associations (1:N User-Game, User-Score)
│   │   ├── User.js                       # User schema with bcrypt lifecycle hooks
│   │   ├── Game.js                       # Active game sessions schema (ENUM difficulty/status)
│   │   └── Score.js                      # Completed scores schema with compound index
│   ├── routes/
│   │   ├── authRoutes.js                 # /api/auth routes
│   │   ├── gameRoutes.js                 # /api/games routes
│   │   └── leaderboardRoutes.js          # /api/leaderboard & /api/scores routes
│   ├── utils/
│   │   └── generateToken.js              # JWT issuance helper
│   ├── server.js                         # Express 5 initialization, CORS, routing
│   ├── package.json
│   └── .env
│
├── package.json                          # Monorepo root scripts (concurrent execution)
└── README.md                             # Project manual & interview preparation guide
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: v14.0 or higher installed and running locally on port 5432
- **npm** or **yarn**

### 1. Database Creation
In your PostgreSQL terminal (`psql`):
```sql
CREATE DATABASE memorygame;
```

### 2. Configure Environment Variables
Create or verify `server/.env`:
```env
PORT=5000
DATABASE_URL=postgres://postgres:your_password@localhost:5432/memorygame
JWT_SECRET=super_secret_vault_tec_key_2026
NODE_ENV=development
```

Create or verify `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies & Launch
From the root directory:
```bash
# Install root, client, and server dependencies
npm run install-all

# Run frontend (port 5173) and backend (port 5000) concurrently
npm run dev
```

---

## 🎯 RESTful API Specification

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description | Request Body |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new vault dweller | `{ name, email, password }` |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT | `{ email, password }` |
| `GET` | `/api/auth/me` | Protected | Fetch authenticated user profile | *Bearer Token in Header* |

### Game Lifecycle (`/api/games`)
| Method | Endpoint | Access | Description | Request Body |
|---|---|---|---|---|
| `POST` | `/api/games` | Optional | Initialize a new game session in DB | `{ difficulty: 'easy'\|'medium'\|'hard' }` |
| `GET` | `/api/games/:id` | Optional | Fetch game state by primary key | *None* |
| `PATCH` | `/api/games/:id` | Optional | Debounced sync of moves, time, pairs | `{ moves, time, pairsFound, status }` |
| `POST` | `/api/games/:id/complete`| Optional | Finalize game, mark won/lost, save Score | `{ moves, time, pairsFound, rating }` |

### Leaderboard & Scores (`/api/leaderboard` & `/api/scores`)
| Method | Endpoint | Access | Description | Request Body / Query |
|---|---|---|---|---|
| `GET` | `/api/leaderboard` | Public | Get top 50 scores sorted by ranking | `?difficulty=easy` (optional) |
| `POST` | `/api/scores` | Protected | Submit a score record directly | `{ difficulty, moves, time, pairs, rating }` |
| `GET` | `/api/scores/me` | Protected | Get user's score history + best scores | *Bearer Token in Header* |

---

# 🎓 THE INTERVIEW HANDBOOK

This section compiles **all the questions technical interviewers expect you to master** regarding this project. It is structured into 9 core engineering disciplines.

---

## Section 1: High-Level Architecture & System Design

### Q1.1: Can you give a 2-minute elevator pitch of your project?
> **Answer:**  
> "I built the Vault-Tec Memory Game, a full-stack, retro-futuristic memory matching application inspired by the Fallout universe.  
> 
> On the frontend, it uses **React 19 and Vite**, featuring a custom game engine encapsulated within custom hooks, hardware-accelerated CSS 3D transforms for card flipping, and procedural audio synthesized entirely in the browser using the **Web Audio API**—eliminating the need for static audio assets.  
> 
> On the backend, I used **Node.js with Express 5**, following a layered MVC pattern with centralized error handling and JWT-based stateless authentication.  
> 
> For persistence, I chose **PostgreSQL with Sequelize ORM**, leveraging relational integrity, composite B-tree indexing for sub-millisecond leaderboard queries, and an architecture that supports both anonymous guest players and authenticated users seamlessly."

---

### Q1.2: Walk me through the end-to-end request lifecycle when a user wins a game.
> **Answer:**  
> 1. **Client Event:** In `useGame.js`, when `matchedCards.length + 2 === cards.length`, the game state shifts to `GAME_STATUS.WON`.
> 2. **Audio & UI Trigger:** The `sound('win')` method fires four musical chord frequencies sequentially via `AudioContext`. The `WinModal` renders showing moves, elapsed time, and star rating.
> 3. **API Dispatch:** `useGame.js` calls `scoreService.completeGame(gameId, payload)`.
> 4. **Network & Interceptor:** The Axios instance in `api.js` intercepts the outgoing request, checks `localStorage` for `vt_token`, and attaches `Authorization: Bearer <token>` if present.
> 5. **Server Ingress:** Express passes the request through `cors()` and JSON parsing middleware.
> 6. **Middleware:** `optionalAuth` extracts and verifies the JWT. If valid, it attaches the decoded user object to `req.user`; if absent or invalid, it allows the request to continue as a guest (`req.user = null`).
> 7. **Controller Execution:** `gameController.completeGame` validates the payload (e.g., verifying `moves >= pairsFound` to prevent cheating), marks the `Game` instance in PostgreSQL as `'won'`, records `completed_at`, and if the user is authenticated, atomically inserts a new record into the `scores` table.
> 8. **Response:** A JSON payload `{ success: true, game, score }` is returned with HTTP 200, which the client uses to invalidate or update the leaderboard.

---

### Q1.3: Why did you separate concerns between `useGame` and UI components rather than storing state in `GameBoard`?
> **Answer:**  
> "Separation of concerns and maintainability. `useGame` serves as a **Headless Game Engine**. It handles:
> - Deck generation and card shuffling
> - Click validation rules and matching logic
> - Sound dispatching
> - Backend synchronization and timer interfacing
> 
> By decoupling the business logic from presentation:
> 1. **Component Purity:** `GameBoard.jsx` and `Card.jsx` remain purely presentational, focused solely on rendering the grid, receiving user interactions, and triggering CSS animations.
> 2. **Testability:** The game engine logic can be unit-tested in isolation using `@testing-library/react-hooks` without mocking DOM nodes or CSS transitions.
> 3. **Reusability:** The same game engine could power an alternate UI (e.g., a terminal interface, React Native mobile app, or Canvas-based renderer) without changing a single line of game logic."

---

## Section 2: Frontend Engineering & React 19 Internals

### Q2.1: How do you prevent race conditions when a user rapidly clicks multiple cards?
> **Answer:**  
> "Rapid clicking can break memory game logic if a user clicks a 3rd or 4th card while the first two are still undergoing comparison. I solved this using a multi-tiered guard clause in `handleCardClick` in [useGame.js](file:///d:/memory%20game/client/src/hooks/useGame.js):
> 
> ```javascript
> if (
>   isCheckingRef.current ||                    // 1. Comparison lock is active
>   flippedCards.length >= 2 ||                 // 2. Two cards are already turned
>   flippedCards.some(c => c.id === card.id) || // 3. Clicked the same card twice
>   matchedCards.includes(card.id) ||           // 4. Card is already matched
>   gameStatus === GAME_STATUS.PAUSED ||        // 5. Game is paused
>   isDemo                                      // 6. Demo mode is running
> ) return;
> ```
> 
> **Why `isCheckingRef` instead of `useState`?**  
> React state updates are asynchronous. If a user double-clicks within 5 milliseconds, the state variable `isChecking` may not have re-rendered yet, allowing the second event into the comparison block. By using a mutable `useRef` (`isCheckingRef.current = true`), the lock is acquired **synchronously in the same tick of the event loop**, guaranteeing mutual exclusion."

---

### Q2.2: How does the 3D card flip animation work under the hood without external animation libraries?
> **Answer:**  
> "It is implemented purely in CSS using 3D perspective transforms to achieve 60 FPS GPU-accelerated rendering:
> 
> 1. **Perspective Container:** The parent container sets `perspective: 1000px`, creating a 3D viewing space with depth.
> 2. **3D Preserve Space:** The inner card wrapper sets:
>    ```css
>    transform-style: preserve-3d;
>    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
>    ```
> 3. **Backface Culling:** Both `.card-front` and `.card-back` share:
>    ```css
>    backface-visibility: hidden;
>    position: absolute;
>    ```
> 4. **Orientation:** The front face is pre-rotated by 180 degrees (`transform: rotateY(180deg)`). When the `.flipped` class is added, the parent card rotates `transform: rotateY(180deg)`. This brings the front face to 0 degrees (visible) and sends the back face to 180 degrees (hidden).
> 
> Because only `transform` is animated, the browser skips Layout and Paint stages and executes directly on the **Compositor thread**, avoiding frame drops."

---

### Q2.3: How and why did you use the Web Audio API instead of loading MP3/WAV files?
> **Answer:**  
> "I chose the **Web Audio API** (`AudioContext`) to generate procedural audio dynamically.
> 
> **Advantages:**
> 1. **Zero Asset Overhead:** Eliminates HTTP requests and network latency for loading sound files.
> 2. **Instant Response:** Sounds trigger with microsecond latency without buffering delays.
> 3. **Dynamic Customization:** Frequencies, waveforms, and decays are modulated programmatically in JavaScript.
> 
> **Implementation Details:**
> - In `useGame.js`, I instantiate `AudioContext` lazily on the first user click (complying with modern browser autoplay policies).
> - For a **card flip**, an `OscillatorNode` generates a sine wave sweeping from 800 Hz down to 400 Hz over 0.1 seconds, controlled by `exponentialRampToValueAtTime`.
> - For a **match**, it plays a major triad chord (523 Hz, 659 Hz, 784 Hz — C5, E5, G5).
> - For a **mismatch**, it switches the oscillator type to `'sawtooth'` at a low dissonant frequency (300 Hz dropping to 200 Hz)."

---

### Q2.4: How does the Demo Mode work, and how do you prevent memory leaks when components unmount?
> **Answer:**  
> "The Demo Mode simulates an automated player solving the game. It uses an async loop with `setTimeout` scheduling card flips.  
> 
> **Memory Leak Prevention:**  
> When asynchronous timers (`setTimeout`, `setInterval`) run inside React hooks, if the user navigates away or resets the game while a timeout is pending, the callback will attempt to call state setters (`setFlippedCards`, etc.) on an unmounted component, causing memory leaks and console warnings.  
> 
> To prevent this, every timer is assigned to a React ref (`demoTimeoutRef.current`). In `useGame.js`, an effect cleanup function cancels all pending timers:
> ```javascript
> useEffect(() => {
>   return () => {
>     if (demoTimeoutRef.current) clearTimeout(demoTimeoutRef.current);
>     if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
>   };
> }, []);
> ```
> Additionally, any call to `resetGame()` explicitly cancels active demo timers and resets `isCheckingRef.current = false`."

---

## Section 3: Backend Architecture & Express 5

### Q3.1: What are the key differences between Express 4 and Express 5, and why did you use Express 5?
> **Answer:**  
> 1. **Native Async Rejection Handling:** In Express 4, if an async route handler threw an unhandled rejected Promise (`await User.create()`), the server would hang or crash unless wrapped in `try/catch` or an `express-async-errors` monkey-patch. In **Express 5**, rejected promises in route handlers and middleware are automatically caught and forwarded to the global error handler (`next(error)`).
> 2. **Updated Path-to-RegExp Engine:** Express 5 uses an updated routing parser with stricter route pattern matching.
> 3. **Modern Node Compatibility:** Native support for modern Node.js ES Modules (`import/export`) and cleaner internal middleware dispatch."

---

### Q3.2: Walk me through your centralized error-handling middleware strategy.
> **Answer:**  
> "In `server/middleware/errorMiddleware.js`, I structured two levels of error handling:
> 
> 1. **404 Not Found Middleware:** Placed after all registered routes. If no route matched the incoming URL, it creates an `Error('Not Found - ${req.originalUrl}')` and sets `res.status(404)`.
> 2. **Global Error Handler (`errorHandler`):** Has the 4-argument signature `(err, req, res, next)`.
>    - **Sequelize Validation Errors:** Detects `SequelizeValidationError` and extracts user-friendly validation messages (e.g., 'Password must be at least 6 characters').
>    - **Sequelize Unique Constraint Errors:** Detects `SequelizeUniqueConstraintError` (e.g., duplicate email) and returns a clean 400 Bad Request instead of exposing SQL schema details.
>    - **Environment-Aware Stack Traces:** In development, it returns the error stack trace to assist debugging. In production (`NODE_ENV === 'production'`), the stack trace is omitted to prevent leaking internal directory structures or database internals."

---

### Q3.3: How does the `optionalAuth` middleware work, and why is it necessary?
> **Answer:**  
> "Most applications use strict authentication where missing tokens yield a 401 Unauthorized. However, in our game, we wanted a seamless **guest experience**: anyone can play without logging in, but authenticated users should have their scores saved and attached to their user account.
> 
> In `server/middleware/authMiddleware.js`:
> - It checks if the `Authorization` header exists and starts with `Bearer`.
> - If **present**, it verifies the token with `jwt.verify(token, process.env.JWT_SECRET)` and attaches the user model to `req.user`.
> - If **absent or expired**, it does **not** throw an error or block the request; it simply sets `req.user = null` and calls `next()`.
> 
> In `gameController.js`, we can then do:
> ```javascript
> user_id: req.user ? req.user.id : null
> ```
> This enables the same endpoint (`POST /api/games`) to serve both guests and authenticated players."

---

## Section 4: Database Design, PostgreSQL & Sequelize ORM

### Q4.1: Why did you choose PostgreSQL over MongoDB for this project?
> **Answer:**  
> "While memory games can be stored in document databases, PostgreSQL was the superior architectural choice for three primary reasons:
> 
> 1. **Relational Integrity & Foreign Keys:** Our data model is inherently relational. A `User` has many `Games` and many `Scores`. PostgreSQL enforces referential integrity using foreign keys (`ON DELETE CASCADE` or `SET NULL`), preventing orphaned game records.
> 2. **Strict Data Typing & Enum Constraints:** We use native PostgreSQL ENUMs (`'easy'`, `'medium'`, `'hard'` and `'playing'`, `'won'`, `'game_over'`), preventing invalid state entries at the database engine level.
> 3. **Deterministic Multi-Column Indexing:** Leaderboards require deterministic sorting across multiple fields (`pairs DESC, moves ASC, time ASC`). Relational B-tree compound indexing in PostgreSQL optimizes this exact query structure down to O(log N) lookups."

---

### Q4.2: Explain your database schema and table relationships.
> **Answer:**  
> We have three primary entities:
> 
> ```
>   ┌────────────────────────┐
>   │         users          │
>   ├────────────────────────┤
>   │ id (PK, SERIAL)        │
>   │ name (VARCHAR 50)      │
>   │ email (VARCHAR 255, U) │
>   │ password (VARCHAR 255) │
>   └──────────┬─────────────┘
>              │ 1
>              ├────────────────────────┐
>              │ N                      │ N
>   ┌──────────▼─────────────┐   ┌──────▼──────────────────────────┐
>   │         games          │   │             scores              │
>   ├────────────────────────┤   ├─────────────────────────────────┤
>   │ id (PK, SERIAL)        │   │ id (PK, SERIAL)                 │
>   │ user_id (FK, nullable) │   │ user_id (FK, NOT NULL)          │
>   │ difficulty (ENUM)      │   │ difficulty (ENUM)               │
>   │ moves (INT)            │   │ moves (INT)                     │
>   │ time (INT)             │   │ time (INT)                      │
>   │ pairs_found (INT)      │   │ pairs (INT)                     │
>   │ total_pairs (INT)      │   │ rating (INT: 1-3)               │
>   │ status (ENUM)          │   │ completed (BOOLEAN)             │
>   └────────────────────────┘   └─────────────────────────────────┘
> ```
> 
> **Model Associations (`server/models/index.js`):**
> - `User.hasMany(Game, { foreignKey: 'user_id', as: 'games' })`
> - `Game.belongsTo(User, { foreignKey: 'user_id', as: 'user' })`
> - `User.hasMany(Score, { foreignKey: 'user_id', as: 'scores' })`
> - `Score.belongsTo(User, { foreignKey: 'user_id', as: 'user' })`"

---

### Q4.3: How did you optimize the Leaderboard query for high read throughput?
> **Answer:**  
> "The leaderboard endpoint filters by `difficulty` and sorts by:
> 1. `pairs DESC` (most pairs matched)
> 2. `moves ASC` (fewest moves taken)
> 3. `time ASC` (fastest time)
> 
> Without an index, PostgreSQL would execute a full table scan followed by an in-memory `QuickSort` (`Sort Method: external/quicksort`), which degrades drastically as millions of games are logged.
> 
> In `server/models/Score.js`, I defined a **Compound B-Tree Index**:
> ```javascript
> indexes: [
>   {
>     name: 'idx_leaderboard',
>     fields: ['difficulty', 'pairs', 'moves', 'time'],
>   },
>   {
>     name: 'idx_user_recent_scores',
>     fields: ['user_id', 'created_at'],
>   }
> ]
> ```
> **How this optimizes the query:**  
> PostgreSQL uses this index to directly seek matching difficulty rows already stored in sorted order. It satisfies both the `WHERE difficulty = :diff` filter and the `ORDER BY pairs DESC, moves ASC, time ASC` clause in a single **Index Scan**, bypassing the need to sort the dataset at runtime."

---

## Section 5: Security, Authentication & Anti-Cheat Mechanisms

### Q5.1: How is user authentication implemented, and how do you protect against token theft?
> **Answer:**  
> "Authentication is implemented using **stateless JWT tokens**:
> 
> 1. **Password Hashing:** Passwords are never stored in plaintext. In `server/models/User.js`, Sequelize lifecycle hooks (`beforeCreate`, `beforeUpdate`) hash passwords using `bcryptjs` with **12 salt rounds**.
> 2. **Token Issuance:** On successful login, the server issues a signed JWT containing `{ id: user.id }` with a 30-day expiration, signed with `JWT_SECRET`.
> 3. **Token Transmission:** On the client, the token is stored in `localStorage` and automatically injected into every API request header as `Authorization: Bearer <token>` via Axios interceptors.
> 4. **Safe JSON Serialization:** The `User` model defines an instance method `toSafeJSON()` that deletes the password hash before sending user data in API responses."

---

### Q5.2: How do you prevent User Enumeration attacks during login?
> **Answer:**  
> "If a login endpoint returns *'Email does not exist'* when an email is wrong, but returns *'Incorrect password'* when the email exists, an attacker can write a script to test thousands of email addresses to discover registered users.  
> 
> In `server/controllers/authController.js`, I prevented this by returning the **exact same generic 401 response and error message** for both cases:
> ```javascript
> const user = await User.findOne({ where: { email } });
> if (!user || !(await user.matchPassword(password))) {
>   return res.status(401).json({
>     success: false,
>     message: 'Invalid email or password',
>   });
> }
> ```
> Additionally, timing attacks are mitigated because `bcrypt.compare` executes consistent hashing operations."

---

### Q5.3: What prevents a malicious user from sending a fake score (e.g., 1 move, 0 seconds) directly to your API?
> **Answer:**  
> "A common vulnerability in web games is trusting client-submitted statistics. We implement **strict server-side game validation** in both `gameController.completeGame` and `leaderboardController.submitScore`:
> 
> 1. **Move-to-Pair Lower Bound:** In a memory game, it is mathematically impossible to find $N$ pairs in fewer than $N$ moves. The server asserts:
>    ```javascript
>    if (moves < pairsFound) {
>      return res.status(400).json({ message: 'Move count cannot be less than pairs found' });
>    }
>    ```
> 2. **Boundary Validation:** `pairsFound` cannot exceed `game.total_pairs` (8 for easy, 10 for medium, 18 for hard).
> 3. **Rating Boundaries:** Rating must strictly be an integer between 1 and 3.
> 4. **State Machine Lock:** Once a game's status is `'won'` or `'game_over'`, subsequent PATCH or complete requests are rejected:
>    ```javascript
>    if (game.status !== 'playing') {
>      return res.status(400).json({ message: 'Game is already completed' });
>    }
>    ```"

---

## Section 6: Algorithms, Mathematics & Game Logic

### Q6.1: Which shuffle algorithm did you use for the card deck, and why not `array.sort(() => Math.random() - 0.5)`?
> **Answer:**  
> "I implemented the **Fisher-Yates (Knuth) Shuffle** algorithm in `useGame.js`:
> 
> ```javascript
> const shuffleArray = (array) => {
>   const shuffled = [...array];
>   for (let i = shuffled.length - 1; i > 0; i--) {
>     const j = Math.floor(Math.random() * (i + 1));
>     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
>   }
>   return shuffled;
> };
> ```
> 
> **Why `array.sort(() => Math.random() - 0.5)` is fundamentally flawed:**
> 1. **Biased Permutations:** The JavaScript `sort` algorithm (like V8's TimSort) expects a consistent comparator function satisfying transitivity ($A > B$ and $B > C \implies A > C$). `Math.random() - 0.5` violates transitivity, resulting in a heavily skewed, non-uniform distribution where some card arrangements appear significantly more often than others.
> 2. **Time Complexity:** Fisher-Yates operates in **strictly $O(N)$ linear time**, performing exactly $N - 1$ swaps. `sort()` runs in $O(N \log N)$ comparisons."

---

### Q6.2: How is the Star Rating mathematically determined?
> **Answer:**  
> "The rating algorithm evaluates both **move efficiency** and **temporal speed** relative to the total number of pairs:
> 
> $$\text{moveRatio} = \frac{\text{moves}}{\text{totalPairs}}, \quad \text{timePerPair} = \frac{\text{seconds}}{\text{totalPairs}}$$
> 
> In `client/src/hooks/useGame.js`:
> - **3 Stars (★★★):** $\text{moveRatio} \le 1.6 \text{ AND } \text{timePerPair} \le 5\text{s}$ (Requires near-perfect recall and rapid decision making).
> - **2 Stars (★★☆):** $\text{moveRatio} \le 2.2 \text{ AND } \text{timePerPair} \le 8\text{s}$.
> - **1 Star (★☆☆):** Any completion that exceeds these thresholds.
> 
> Normalizing by `totalPairs` ensures the rating scale remains fair and proportional across all difficulty tiers (8 pairs on Easy vs 18 pairs on Hard)."

---

## Section 7: Performance Optimization & Scalability

### Q7.1: How do you prevent flooding the PostgreSQL database with update queries while the user is actively flipping cards?
> **Answer:**  
> "If we made an HTTP request on every single card flip or move increment, a fast player could fire dozens of requests per minute, overwhelming database connection pools.
> 
> I implemented **Debounced Backend Synchronization** in `useGame.js`:
> - A ref `syncTimeoutRef` holds the timer ID.
> - When `moves` or `matchedCards` updates, any existing timeout is cleared:
>   ```javascript
>   if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
>   syncTimeoutRef.current = setTimeout(() => {
>     scoreService.updateGame(gameIdRef.current, {
>       moves,
>       time: timer.seconds,
>       pairsFound,
>     });
>   }, 1500); // Debounce interval: 1.5 seconds
>   ```
> - This collates rapid move bursts into a single network packet, reducing write traffic by up to 80%."

---

### Q7.2: If this application scaled to 100,000 active concurrent players, how would you evolve the architecture?
> **Answer:**  
> "To handle 100K concurrent players:
> 1. **Redis Caching Layer for Leaderboards:**  
>    Instead of querying PostgreSQL for every leaderboard hit, cache the top 50 in a **Redis Sorted Set (`ZSET`)**. Updates use `ZADD`, and leaderboard queries fetch via `ZREVRANGE` in $O(\log N)$ time with in-memory latency (< 1ms).
> 2. **Database Read/Write Splitting:**  
>    Configure PostgreSQL with one primary writer instance and multiple read-replicas. Leaderboard queries route to replicas; writes (`completeGame`) go to the primary.
> 3. **Connection Pooling:**  
>    Deploy **PgBouncer** in front of PostgreSQL to pool and reuse connections efficiently without exhausting backend thread limits.
> 4. **Stateless API Clustering:**  
>    Run Express instances in Docker containers orchestrated by Kubernetes behind an Nginx or AWS ALB reverse proxy with horizontal auto-scaling (HPA).
> 5. **CDN & Edge Asset Caching:**  
>    Host the built Vite client on a global CDN (Cloudflare or AWS CloudFront) so HTML/CSS/JS is served from edge caches."

---

## Section 8: Real-World Debugging Case Study

> **Interviewer Favorite:** *"Tell me about a difficult technical bug you encountered in this project, how you diagnosed it, and how you resolved it."*

### The Case of the Failing PostgreSQL Game Synchronization

#### 1. The Symptom
"During end-to-end integration testing after migrating from MongoDB to PostgreSQL, players could complete games on the frontend, but their final scores were never showing up on the leaderboard, and the browser console reported 400 Bad Request and 404 errors during game completion."

#### 2. Root Cause Analysis (RCA)
"I investigated the network panel and server logs and discovered three interconnected issues:

1. **Stale State Closure in React Hook:**  
   In `useGame.js`, `createBackendGame` ran asynchronously to generate a game record in PostgreSQL. However, due to React state closure, `gameId` in the completion callback was still evaluating to `null`.
2. **Missing Ref Synchronization:**  
   Because `gameId` was null, `completeBackendGame` either skipped the call or fired a request with an undefined route parameter (`/api/games/null/complete`).
3. **Database Column / Enum Mismatch:**  
   The backend `Game` model was expecting `pairs_found` and `status: 'won'`, but the client payload was sending `pairs` with unmapped fields. Additionally, the backend was blocking completed games from saving scores if `game.status` had prematurely transitioned."

#### 3. The Resolution
"I resolved the issue in five targeted steps:
1. **Synchronous Ref Tracker:** Added `gameIdRef = useRef(null)` and updated both `setGameId(newId)` and `gameIdRef.current = newId` immediately upon creation.
2. **Fallback Creation:** In `completeBackendGame`, if `gameIdRef.current` is missing, it creates the game record synchronously before dispatching the completion call.
3. **Optimistic Payload Normalization:** Standardized payload names (`pairsFound`, `time`, `moves`, `rating`) across `scoreService.js` and `gameController.js`.
4. **Atomic Score Creation:** In `gameController.js`, wrapped the `game.save()` and `Score.create()` in an atomic operation when `game.status === 'won'`.
5. **Verified with Automated Tests:** Ran multiple full game playthroughs on Easy and Hard to verify that every win generated a row in PostgreSQL with verified foreign keys."

---

## Section 9: Rapid-Fire Interview Flashcards

| # | Question | 1-Sentence Answer |
|---|---|---|
| 1 | **What is the time complexity of the Fisher-Yates shuffle?** | Exactly $O(N)$ time complexity and $O(1)$ auxiliary space. |
| 2 | **Why did you use `useCallback` in `useGame.js`?** | To memoize callback functions so child components wrapped in `React.memo` do not needlessly re-render. |
| 3 | **What does `backface-visibility: hidden` do?** | It instructs the CSS rendering engine to avoid painting the back of a transformed 3D element when facing away from the screen. |
| 4 | **How are SVG icons bundled?** | As pure inline JSX SVG vectors inside `cards.js`, eliminating external image asset network roundtrips. |
| 5 | **What is the purpose of `express-validator`?** | To validate and sanitize incoming client request bodies (like email formatting and password length) before they reach controllers. |
| 6 | **What does `sequelize.sync({ alter: true })` do?** | It checks the current PostgreSQL table schema and applies necessary `ALTER TABLE` commands to match models without dropping data. |
| 7 | **Why is JWT stored in `localStorage` instead of cookies?** | For straightforward stateless client-side cross-origin API integration without CSRF vulnerability, though httpOnly cookies are preferred for higher XSS resistance in production. |
| 8 | **How does the Hint feature work?** | It searches the deck for the first unmatched pair, momentarily adds their IDs to `flippedCards`, and uses a 1.2s timeout to flip them back down. |
| 9 | **What prevents negative time or moves in the DB?** | Sequelize model validation rules: `validate: { min: 0 }` for time and `min: 1` for moves. |
| 10 | **How is the total number of pairs determined per difficulty?** | In `cards.js`: Easy has 8 pairs (16 cards), Medium has 10 pairs (20 cards), and Hard has 18 pairs (36 cards). |
| 11 | **How do you handle audio autoplay restrictions in modern browsers?** | The `AudioContext` is created lazily inside a user gesture event listener (first card click), bypassing browser autoplay blocking. |
| 12 | **What does `User.prototype.matchPassword` do?** | It invokes `bcrypt.compare(enteredPassword, this.password)` to safely check bcrypt hashes without exposing the salt. |
| 13 | **What does the compound index `idx_leaderboard` contain?** | `['difficulty', 'pairs', 'moves', 'time']` to match the exact `WHERE` and `ORDER BY` execution plan of the leaderboard. |
| 14 | **How are guests represented in the database?** | In the `games` table, `user_id` is set to `null` with `allowNull: true`. |
| 15 | **What HTTP status code is returned when a duplicate email registers?** | HTTP 400 Bad Request, handled gracefully by Sequelize `UniqueConstraintError`. |

---

## 📄 License
This project is licensed under the MIT License. Vault-Tec and Fallout aesthetics are inspired by Bethesda Softworks.
