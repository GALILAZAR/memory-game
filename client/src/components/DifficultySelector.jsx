import { DIFFICULTIES } from '../data/cards';

/**
 * DifficultySelector — Toggle buttons for Easy/Medium/Hard.
 *
 * Props:
 *  - difficulty: string — Current difficulty
 *  - onChange: Function — Called with new difficulty value
 *  - disabled: boolean — Whether selection is disabled
 */
const DifficultySelector = ({ difficulty, onChange, disabled }) => {
  const levels = Object.entries(DIFFICULTIES);

  return (
    <div className="difficulty-selector" role="radiogroup" aria-label="Difficulty level">
      {levels.map(([key, config]) => (
        <button
          key={key}
          className={`difficulty-btn ${
            difficulty === key ? 'difficulty-btn--active' : ''
          }`}
          onClick={() => onChange(key)}
          disabled={disabled}
          role="radio"
          aria-checked={difficulty === key}
          id={`difficulty-${key}`}
        >
          {config.label}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
