import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WeatherDetail from "./pages/WeatherDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import useSettings from "./hooks/useSettings";
import "./App.css";

function App() {
  // Chiamiamo useSettings() qui, anche se App non mostra nulla che dipenda
  // da unit/theme, perché App è l'unico componente montato SEMPRE, su ogni
  // pagina. Il suo useEffect interno applica l'attributo data-theme
  // sull'<html> ad ogni caricamento — altrimenti pagine come Home, che non
  // chiamano useSettings() per conto loro, si aprirebbero sempre con il
  // tema di default anche se l'utente aveva scelto "Calm".
  useSettings();

  return (
    // HashRouter invece di BrowserRouter: GitHub Pages è hosting statico,
    // non ha un server che gestisce le rotte. Con BrowserRouter, aggiornando
    // la pagina su un URL tipo /weather/london otterresti un 404 (GitHub
    // cerca un file reale a quel percorso). HashRouter mette le rotte dopo
    // un "#" (es. /#/weather/london): la parte dopo il # non viene mai
    // inviata al server, quindi GitHub serve sempre index.html e React
    // Router gestisce la navigazione interamente lato client.
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<WeatherDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
