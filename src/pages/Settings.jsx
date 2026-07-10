import useSettings from "../hooks/useSettings";

const Settings = () => {
  const { unit, setUnit } = useSettings();

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
    </div>
  );
};

export default Settings;
