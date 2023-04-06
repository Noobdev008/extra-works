import { createContext, useState } from "react";
import {  THEME_VARIANT, noop } from "../constants";
import { defaultTheme } from "../../themes/default";

const defaultState = {
  theme: defaultTheme,
  themeVariant: THEME_VARIANT.DEFAULT,
  appData: {},
  setAppData: noop,
  setTheme: noop,
  setThemeVariant: noop,
};

export const AppContext = createContext(defaultState);

export const AppContextConsumer = AppContext.Consumer;

export const AppContextProvider = ({ children }) => {
  const setAppData = (key, data) => {
    setState((prevState) => ({
      ...prevState,
      appData: {
        ...prevState.appData,
        [key]: data,
      }
    }));
  };

  const setTheme = (theme) => {
    setState((prevState) => ({
      ...prevState,
      theme,
    }));
  };

  const setThemeVariant = (themeVariant) => {
    setState((prevState) => ({
      ...prevState,
      themeVariant,
    }));
  };

  const [state, setState] = useState({
    ...defaultState,
    setAppData,
    setTheme,
    setThemeVariant,
  });

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

