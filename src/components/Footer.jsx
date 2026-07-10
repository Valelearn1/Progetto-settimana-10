const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Breezy</p>
      <p>
        Weather data by{" "}
        <a
          href="https://openweathermap.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeatherMap
        </a>
      </p>
    </footer>
  );
};

export default Footer;
