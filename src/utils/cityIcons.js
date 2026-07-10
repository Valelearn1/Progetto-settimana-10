// Emoji simbolo per alcune città note (nessuna vera foto, per evitare
// problemi di licenza). Per le città non presenti in questa mappa
// usiamo un'emoji generica di fallback.
const CITY_ICONS = {
  Rome: "🏛️",
  Turin: "🏰",
  Paris: "🗼",
  Tokyo: "⛩️",
  London: "🎡",
  "New York": "🗽",
  Milan: "⛪",
  Venice: "🚤",
  Florence: "🌸",
  Naples: "🍕",
  Barcelona: "🏖️",
  Berlin: "🐻",
  Amsterdam: "🚲",
  Cairo: "🐪",
  Dubai: "🕌",
  Sydney: "🌉",
  "Rio de Janeiro": "🗿",
};

const DEFAULT_ICON = "🏠";

const getCityIcon = (city) => CITY_ICONS[city] || DEFAULT_ICON;

export default getCityIcon;
