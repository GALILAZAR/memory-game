import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import LeaderboardPage from './pages/LeaderboardPage';
import './App.css';

/**
 * App — Root component with routing and layout.
 *
 * Routes:
 *  /              → Home (game)
 *  /login         → Login page
 *  /register      → Register page
 *  /profile       → Profile page (protected)
 *  /leaderboard   → Full leaderboard page
 */
const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </div>
  );
};

export default App;
