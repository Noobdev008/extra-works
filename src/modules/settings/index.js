import { useState } from "react";
import SettingsView from "./view";

const defaultState = {
  title: "Settings Page"
};
const Settings = () => {
  const [state, setState] = useState(defaultState);

  return (
    <SettingsView
      title={state.title}
    />
  );
};

export default Settings;
