import useSettings from "../hooks/useSettings";

const Settings = () => {
  const { unit, toggleUnit } = useSettings();

  return (
    <div className="settings">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-row">
        <span className="settings-label">Temperature unit</span>
        <button className="unit-toggle" onClick={toggleUnit}>
          {unit === "metric" ? "°C" : "°F"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
