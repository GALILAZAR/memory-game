/**
 * Stats component — Displays game statistics.
 *
 * Shows:
 * - Moves counter
 * - Timer (MM:SS)
 * - Star rating (1-3 stars)
 * - Pairs found / total
 */
const Stats = ({ moves, time, formatTime, rating, pairsFound, totalPairs }) => {
  /**
   * Render star rating as filled/empty stars.
   * @param {number} rating - 1, 2, or 3
   */
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(
        <span
          key={i}
          className={`stat__star ${i <= rating ? 'stat__star--filled' : ''}`}
          aria-label={i <= rating ? 'Filled star' : 'Empty star'}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="stats">
      <div className="stat" id="stat-moves">
        <span className="stat__label">MOVES</span>
        <span className="stat__value">{moves}</span>
      </div>

      <div className="stat" id="stat-timer">
        <span className="stat__label">TIME</span>
        <span className="stat__value stat__value--mono">{formatTime(time)}</span>
      </div>

      <div className="stat" id="stat-rating">
        <span className="stat__label">RATING</span>
        <span className="stat__value stat__stars">{renderStars(rating)}</span>
      </div>

      <div className="stat" id="stat-pairs">
        <span className="stat__label">PAIRS</span>
        <span className="stat__value">
          {pairsFound} / {totalPairs}
        </span>
      </div>
    </div>
  );
};

export default Stats;
