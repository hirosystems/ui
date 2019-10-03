const colors = {
  transparent: "transparent",
  current: "currentColor",
  black: "#000000",
  white: "#ffffff",
  blue: Object.assign("#3700ff", {
    50: "#f2f2ff",
    100: "#e3e5ff",
    150: "#D8DAF3",
    200: "#c5ccff",
    300: "#aab3ff",
    900: "#5548ff",
    hover: "#3100DC"
  }),
  ink: Object.assign("#0f1117", {
    50: "#f4f4f5",
    100: "#e7e7e8",
    250: "#c8c8cc",
    400: "#a7a7ad",
    600: "#6e727d",
    900: "#27292e"
  }),
  darken: {
    50: "rgba(15, 17, 23, 0.05)",
    100: "rgba(15, 17, 23, 0.1)",
    150: "rgba(15, 17, 23, 0.15)"
  },
  red: "#de0014",
  green: "#00a73e",
  orange: "#f7aa00",
  cyan: "#00d4ff",
  feedback: {}
};

colors.feedback = {
  error: colors.red,
  success: colors.green,
  warning: colors.orange,
  info: colors.cyan
};

export default colors;
