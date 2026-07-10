import useSettings from "../hooks/useSettings";

const Settings = () => {
  const { unit, setUnit, theme, setTheme } = useSettings();

  return (
    <div className="settings">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-row">
        <span className="settings-label">Temperature unit</span>
        <div className="unit-toggle-group">
          <button
            className={`unit-option ${unit === "metric" ? "active" : ""}`}
            onClick={() => setUnit("metric")}
          >
            °C
          </button>
          <button
            className={`unit-option ${unit === "imperial" ? "active" : ""}`}
            onClick={() => setUnit("imperial")}
          >
            °F
          </button>
        </div>
      </div>

      <div className="settings-row">
        <span className="settings-label">Theme</span>
        <div className="unit-toggle-group">
          <button
            className={`unit-option ${theme === "default" ? "active" : ""}`}
            onClick={() => setTheme("default")}
          >
            Default
          </button>
          <button
            className={`unit-option ${theme === "calm" ? "active" : ""}`}
            onClick={() => setTheme("calm")}
          >
            Calm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
