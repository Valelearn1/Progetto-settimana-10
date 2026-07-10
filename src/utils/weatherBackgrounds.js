// Gradiente diverso in base alla condizione meteo principale restituita
// dall'API (weather.weather[0].main). Usiamo colori chiari così il testo
// scuro esistente resta leggibile senza dover cambiare colore del testo.
const WEATHER_BACKGROUNDS = {
  Clear: "linear-gradient(135deg, #ffe9a8 0%, #ffd166 100%)",
  Clouds: "linear-gradient(135deg, #dfe6ee 0%, #c2ccd9 100%)",
  Rain: "linear-gradient(135deg, #b8cbe0 0%, #8fa8c4 100%)",
  Drizzle: "linear-gradient(135deg, #c7d7e6 0%, #a4bdd4 100%)",
  Thunderstorm: "linear-gradient(135deg, #b0aec2 0%, #7a7896 100%)",
  Snow: "linear-gradient(135deg, #f3f7fb 0%, #dceaf6 100%)",
  Mist: "linear-gradient(135deg, #e3e6ea 0%, #cdd2d8 100%)",
  Fog: "linear-gradient(135deg, #e3e6ea 0%, #cdd2d8 100%)",
  Haze: "linear-gradient(135deg, #e9e2d6 0%, #d6c9b4 100%)",
};

const DEFAULT_BACKGROUND = "linear-gradient(135deg, #e7eeff 0%, #d8e2ff 100%)";

const getWeatherBackground = (condition) =>
  WEATHER_BACKGROUNDS[condition] || DEFAULT_BACKGROUND;

export default getWeatherBackground;
