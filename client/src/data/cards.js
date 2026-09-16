/**
 * Card data for the Vault-Tec Memory Game.
 * Each card type has a unique id, name, and SVG icon component.
 * All icons are original designs inspired by retro sci-fi / vault themes.
 */

// SVG icon components — inline for zero external dependencies
const icons = {
  vaultBoy: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="20" r="12" fill="#F7C936" stroke="#03172D" stroke-width="2"/>
    <circle cx="28" cy="18" r="2" fill="#03172D"/>
    <circle cx="36" cy="18" r="2" fill="#03172D"/>
    <path d="M27 24 Q32 30 37 24" stroke="#03172D" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M22 32 L22 52 L30 52 L30 42 L34 42 L34 52 L42 52 L42 32" fill="#3B82F6" stroke="#03172D" stroke-width="2"/>
    <line x1="22" y1="38" x2="14" y2="32" stroke="#F7C936" stroke-width="2" stroke-linecap="round"/>
    <line x1="42" y1="38" x2="50" y2="28" stroke="#F7C936" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  pipBoy: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="8" width="40" height="48" rx="6" fill="#1a3a5c" stroke="#F7C936" stroke-width="2"/>
    <rect x="18" y="14" width="28" height="22" rx="3" fill="#0a1628" stroke="#4ade80" stroke-width="1.5"/>
    <circle cx="32" cy="25" r="6" fill="none" stroke="#4ade80" stroke-width="1.5"/>
    <line x1="32" y1="19" x2="32" y2="31" stroke="#4ade80" stroke-width="1"/>
    <line x1="26" y1="25" x2="38" y2="25" stroke="#4ade80" stroke-width="1"/>
    <circle cx="24" cy="44" r="4" fill="#0a1628" stroke="#F7C936" stroke-width="1.5"/>
    <circle cx="40" cy="44" r="4" fill="#0a1628" stroke="#F7C936" stroke-width="1.5"/>
    <rect x="30" y="40" width="4" height="8" rx="1" fill="#F7C936"/>
  </svg>`,

  nukaCola: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8 L24 16 L20 20 L20 56 Q20 60 24 60 L40 60 Q44 60 44 56 L44 20 L40 16 L40 8 Z" fill="#dc2626" stroke="#03172D" stroke-width="2"/>
    <rect x="24" y="8" width="16" height="8" rx="1" fill="#991b1b" stroke="#03172D" stroke-width="1"/>
    <rect x="22" y="28" width="20" height="16" rx="2" fill="#fbbf24"/>
    <text x="32" y="39" text-anchor="middle" font-size="7" font-weight="bold" fill="#dc2626" font-family="monospace">NUKA</text>
    <ellipse cx="32" cy="18" rx="6" ry="2" fill="#7f1d1d"/>
  </svg>`,

  vaultDoor: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="26" fill="#374151" stroke="#F7C936" stroke-width="3"/>
    <circle cx="32" cy="32" r="20" fill="#1f2937" stroke="#6b7280" stroke-width="2"/>
    <line x1="32" y1="12" x2="32" y2="52" stroke="#6b7280" stroke-width="1.5"/>
    <line x1="12" y1="32" x2="52" y2="32" stroke="#6b7280" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="6" fill="#F7C936" stroke="#03172D" stroke-width="2"/>
    <text x="32" y="35" text-anchor="middle" font-size="8" font-weight="bold" fill="#03172D" font-family="monospace">VT</text>
  </svg>`,

  powerArmor: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 18 L20 8 L44 8 L44 18" fill="#4b5563" stroke="#F7C936" stroke-width="2"/>
    <rect x="16" y="18" width="32" height="26" rx="4" fill="#374151" stroke="#F7C936" stroke-width="2"/>
    <rect x="22" y="24" width="8" height="6" rx="1" fill="#60a5fa"/>
    <rect x="34" y="24" width="8" height="6" rx="1" fill="#60a5fa"/>
    <path d="M28 34 L36 34" stroke="#F7C936" stroke-width="2" stroke-linecap="round"/>
    <rect x="14" y="44" width="14" height="14" rx="3" fill="#4b5563" stroke="#F7C936" stroke-width="1.5"/>
    <rect x="36" y="44" width="14" height="14" rx="3" fill="#4b5563" stroke="#F7C936" stroke-width="1.5"/>
  </svg>`,

  robot: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="16" width="28" height="24" rx="5" fill="#6b7280" stroke="#F7C936" stroke-width="2"/>
    <circle cx="26" cy="26" r="4" fill="#ef4444" stroke="#03172D" stroke-width="1.5"/>
    <circle cx="38" cy="26" r="4" fill="#ef4444" stroke="#03172D" stroke-width="1.5"/>
    <rect x="24" y="34" width="16" height="3" rx="1" fill="#03172D"/>
    <line x1="32" y1="8" x2="32" y2="16" stroke="#F7C936" stroke-width="2"/>
    <circle cx="32" cy="8" r="3" fill="#F7C936"/>
    <rect x="22" y="40" width="8" height="16" rx="2" fill="#6b7280" stroke="#F7C936" stroke-width="1.5"/>
    <rect x="34" y="40" width="8" height="16" rx="2" fill="#6b7280" stroke="#F7C936" stroke-width="1.5"/>
  </svg>`,

  bottle: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 6 L38 6 L38 14 L42 22 L42 54 Q42 58 38 58 L26 58 Q22 58 22 54 L22 22 L26 14 Z" fill="#059669" stroke="#03172D" stroke-width="2"/>
    <rect x="26" y="6" width="12" height="6" rx="1" fill="#047857"/>
    <rect x="24" y="30" width="16" height="12" rx="2" fill="#fbbf24"/>
    <text x="32" y="39" text-anchor="middle" font-size="6" font-weight="bold" fill="#047857" font-family="monospace">BEER</text>
    <ellipse cx="32" cy="52" rx="6" ry="2" fill="rgba(255,255,255,0.2)"/>
  </svg>`,

  computer: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="48" height="34" rx="3" fill="#1f2937" stroke="#F7C936" stroke-width="2"/>
    <rect x="12" y="14" width="40" height="26" rx="2" fill="#0a1628"/>
    <text x="16" y="26" font-size="7" fill="#4ade80" font-family="monospace">&gt;_</text>
    <text x="16" y="35" font-size="5" fill="#4ade80" font-family="monospace">VAULT OS</text>
    <rect x="24" y="44" width="16" height="4" rx="1" fill="#374151" stroke="#F7C936" stroke-width="1"/>
    <rect x="20" y="48" width="24" height="6" rx="2" fill="#374151" stroke="#F7C936" stroke-width="1.5"/>
  </svg>`,

  gear: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 6 L36 6 L38 14 L46 18 L54 14 L58 22 L52 28 L54 36 L62 38 L62 46 L54 48 L52 56 L58 62 L50 66 L46 58 L38 62 L36 58 L28 58 L26 62 L18 58 L14 52 L6 54 L2 46 L10 42 L8 34 L2 30 L6 22 L14 24 L18 16 L14 10 L22 6 L26 14 Z" fill="#6b7280" stroke="#F7C936" stroke-width="2" transform="scale(0.85) translate(6,4)"/>
    <circle cx="32" cy="32" r="10" fill="#374151" stroke="#F7C936" stroke-width="2"/>
    <circle cx="32" cy="32" r="4" fill="#F7C936"/>
  </svg>`,

  radiation: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="26" fill="#1f2937" stroke="#F7C936" stroke-width="2"/>
    <circle cx="32" cy="32" r="6" fill="#F7C936"/>
    <path d="M32 26 L22 10 Q32 6 42 10 Z" fill="#F7C936"/>
    <path d="M27 34 L10 40 Q8 28 16 18 Z" fill="#F7C936"/>
    <path d="M37 34 L54 40 Q56 28 48 18 Z" fill="#F7C936"/>
    <circle cx="32" cy="32" r="4" fill="#1f2937"/>
  </svg>`,

  nuclear: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="24" fill="none" stroke="#F7C936" stroke-width="2"/>
    <circle cx="32" cy="32" r="16" fill="none" stroke="#F7C936" stroke-width="1.5" stroke-dasharray="4 4"/>
    <path d="M32 8 L32 56" stroke="#F7C936" stroke-width="1.5"/>
    <path d="M8 32 L56 32" stroke="#F7C936" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="5" fill="#ef4444" stroke="#F7C936" stroke-width="1.5"/>
    <circle cx="32" cy="12" r="3" fill="#F7C936"/>
    <circle cx="32" cy="52" r="3" fill="#F7C936"/>
    <circle cx="12" cy="32" r="3" fill="#F7C936"/>
    <circle cx="52" cy="32" r="3" fill="#F7C936"/>
  </svg>`,

  weapon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="26" width="40" height="12" rx="3" fill="#6b7280" stroke="#F7C936" stroke-width="2"/>
    <rect x="44" y="24" width="14" height="16" rx="2" fill="#4b5563" stroke="#F7C936" stroke-width="2"/>
    <rect x="30" y="38" width="8" height="16" rx="2" fill="#4b5563" stroke="#F7C936" stroke-width="1.5"/>
    <circle cx="14" cy="32" r="3" fill="#03172D"/>
    <rect x="4" y="29" width="8" height="6" rx="1" fill="#9ca3af"/>
  </svg>`,

  helmet: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 36 Q16 12 32 8 Q48 12 48 36 L48 44 Q48 52 32 56 Q16 52 16 44 Z" fill="#4b5563" stroke="#F7C936" stroke-width="2"/>
    <rect x="20" y="28" width="24" height="10" rx="3" fill="#1f2937" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="20" y1="33" x2="44" y2="33" stroke="#60a5fa" stroke-width="1"/>
    <path d="M24 42 L40 42" stroke="#F7C936" stroke-width="2" stroke-linecap="round"/>
    <circle cx="22" cy="22" r="2" fill="#F7C936"/>
    <circle cx="42" cy="22" r="2" fill="#F7C936"/>
  </svg>`,

  dog: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="34" rx="18" ry="16" fill="#92400e" stroke="#F7C936" stroke-width="2"/>
    <circle cx="32" cy="22" r="12" fill="#a16207" stroke="#F7C936" stroke-width="2"/>
    <path d="M20 14 L16 4 L24 12" fill="#a16207" stroke="#F7C936" stroke-width="1.5"/>
    <path d="M44 14 L48 4 L40 12" fill="#a16207" stroke="#F7C936" stroke-width="1.5"/>
    <circle cx="28" cy="20" r="2.5" fill="#03172D"/>
    <circle cx="36" cy="20" r="2.5" fill="#03172D"/>
    <ellipse cx="32" cy="26" rx="3" ry="2" fill="#03172D"/>
    <path d="M29 28 Q32 32 35 28" stroke="#03172D" stroke-width="1.5" fill="none"/>
  </svg>`,

  camp: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8 L52 52 L12 52 Z" fill="#374151" stroke="#F7C936" stroke-width="2"/>
    <rect x="26" y="36" width="12" height="16" rx="1" fill="#1f2937" stroke="#F7C936" stroke-width="1.5"/>
    <line x1="32" y1="8" x2="32" y2="4" stroke="#F7C936" stroke-width="2"/>
    <path d="M28 4 L32 0 L36 4" fill="none" stroke="#ef4444" stroke-width="2"/>
    <rect x="8" y="52" width="48" height="4" rx="1" fill="#4b5563"/>
    <rect x="28" y="42" width="4" height="4" rx="1" fill="#60a5fa"/>
  </svg>`,

  caps: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="32" rx="22" ry="22" fill="#F7C936" stroke="#92400e" stroke-width="3"/>
    <ellipse cx="32" cy="32" rx="16" ry="16" fill="#fbbf24" stroke="#92400e" stroke-width="1.5"/>
    <text x="32" y="37" text-anchor="middle" font-size="14" font-weight="bold" fill="#92400e" font-family="monospace">¢</text>
    <path d="M10 32 Q10 12 32 10" stroke="#92400e" stroke-width="1" fill="none" stroke-dasharray="3 3"/>
    <path d="M54 32 Q54 52 32 54" stroke="#92400e" stroke-width="1" fill="none" stroke-dasharray="3 3"/>
  </svg>`,

  map: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="10" width="48" height="44" rx="2" fill="#d4a574" stroke="#92400e" stroke-width="2"/>
    <path d="M20 10 L20 54" stroke="#92400e" stroke-width="1" stroke-dasharray="4 2"/>
    <path d="M38 10 L38 54" stroke="#92400e" stroke-width="1" stroke-dasharray="4 2"/>
    <path d="M12 24 L52 24" stroke="#92400e" stroke-width="1" stroke-dasharray="4 2"/>
    <path d="M12 38 L52 38" stroke="#92400e" stroke-width="1" stroke-dasharray="4 2"/>
    <circle cx="32" cy="30" r="4" fill="#ef4444" stroke="#03172D" stroke-width="1.5"/>
    <path d="M32 26 L32 20 L36 20" stroke="#ef4444" stroke-width="1.5" fill="none"/>
    <text x="42" y="46" font-size="6" fill="#92400e" font-family="monospace">N↑</text>
  </svg>`,

  radio: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="44" height="36" rx="5" fill="#374151" stroke="#F7C936" stroke-width="2"/>
    <circle cx="26" cy="38" r="10" fill="#1f2937" stroke="#F7C936" stroke-width="1.5"/>
    <circle cx="26" cy="38" r="4" fill="#F7C936"/>
    <rect x="40" y="28" width="8" height="20" rx="2" fill="#1f2937" stroke="#F7C936" stroke-width="1.5"/>
    <line x1="40" y1="32" x2="48" y2="32" stroke="#4ade80" stroke-width="1"/>
    <line x1="40" y1="36" x2="48" y2="36" stroke="#4ade80" stroke-width="1"/>
    <line x1="40" y1="40" x2="48" y2="40" stroke="#4ade80" stroke-width="1"/>
    <line x1="32" y1="20" x2="44" y2="6" stroke="#F7C936" stroke-width="2" stroke-linecap="round"/>
    <circle cx="44" cy="6" r="2" fill="#ef4444"/>
  </svg>`,
};

/**
 * All 18 unique card types.
 * Each has a type (unique identifier), name (display), and icon (SVG string).
 */
export const CARD_TYPES = [
  { type: 'vault-boy', name: 'Vault Boy', icon: icons.vaultBoy },
  { type: 'pip-boy', name: 'Pip-Boy', icon: icons.pipBoy },
  { type: 'nuka-cola', name: 'Nuka Cola', icon: icons.nukaCola },
  { type: 'vault-door', name: 'Vault Door', icon: icons.vaultDoor },
  { type: 'power-armor', name: 'Power Armor', icon: icons.powerArmor },
  { type: 'robot', name: 'Robot', icon: icons.robot },
  { type: 'bottle', name: 'Bottle', icon: icons.bottle },
  { type: 'computer', name: 'Computer', icon: icons.computer },
  { type: 'gear', name: 'Gear', icon: icons.gear },
  { type: 'radiation', name: 'Radiation', icon: icons.radiation },
  { type: 'nuclear', name: 'Nuclear', icon: icons.nuclear },
  { type: 'weapon', name: 'Weapon', icon: icons.weapon },
  { type: 'helmet', name: 'Helmet', icon: icons.helmet },
  { type: 'dog', name: 'Dog', icon: icons.dog },
  { type: 'camp', name: 'Camp', icon: icons.camp },
  { type: 'caps', name: 'Caps', icon: icons.caps },
  { type: 'map', name: 'Map', icon: icons.map },
  { type: 'radio', name: 'Radio', icon: icons.radio },
];

/**
 * Difficulty configurations.
 * Defines grid size, number of pairs, and move limit for each level.
 */
export const DIFFICULTIES = {
  easy: {
    pairs: 8,
    cards: 16,
    cols: 4,
    rows: 4,
    moveLimit: 30,
    label: 'Easy',
  },
  medium: {
    pairs: 10,
    cards: 20,
    cols: 5,
    rows: 4,
    moveLimit: 40,
    label: 'Medium',
  },
  hard: {
    pairs: 18,
    cards: 36,
    cols: 6,
    rows: 6,
    moveLimit: 70,
    label: 'Hard',
  },
};

/**
 * Game status constants.
 */
export const GAME_STATUS = {
  READY: 'READY',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  WON: 'WON',
  GAME_OVER: 'GAME_OVER',
};
