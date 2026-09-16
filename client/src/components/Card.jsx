import { memo } from 'react';

/**
 * Card component — A single memory card with 3D flip animation.
 *
 * Props:
 *  - card: { id, type, name, icon } — Card data
 *  - isFlipped: boolean — Whether the card is currently face-up
 *  - isMatched: boolean — Whether this card has been matched
 *  - onClick: Function — Called when the card is clicked
 *  - disabled: boolean — Whether clicking is disabled
 */
const Card = memo(({ card, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = () => {
    if (disabled || isFlipped || isMatched) return;
    onClick(card.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`card ${isFlipped ? 'card--flipped' : ''} ${
        isMatched ? 'card--matched' : ''
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled || isMatched ? -1 : 0}
      aria-label={
        isFlipped || isMatched ? `Card: ${card.name}` : 'Hidden card'
      }
      aria-pressed={isFlipped || isMatched}
      id={`card-${card.id}`}
    >
      <div className="card__inner">
        {/* Card Back — Vault-Tec logo */}
        <div className="card__face card__back">
          <div className="card__back-content">
            <span className="card__vt-logo">VT</span>
          </div>
        </div>

        {/* Card Front — Icon */}
        <div className="card__face card__front">
          <div
            className="card__icon"
            dangerouslySetInnerHTML={{ __html: card.icon }}
          />
          <span className="card__name">{card.name}</span>
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
