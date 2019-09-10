import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import React, { useContext } from "react";
import theme from "../theme";

export let ThemeContext = React.createContext({})

const ThemeProvider = ({ theme, children }) => (
  <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
);

ThemeProvider.defaultProps = {
  theme,
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export default ThemeProvider;
export { useTheme };
