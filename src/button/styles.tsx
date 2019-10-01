import { useTheme } from "../theme-provider";

const baseProps = {
  display: "inline-flex",
  appearance: "none",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 250ms",
  userSelect: "none",
  position: "relative",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
  lineHeight: "shorter",
  outline: "none",
  border: "1px solid",
  borderColor: "transparent"
};

const sizes = {
  lg: {
    height: 12,
    minWidth: 9 * 14,
    fontSize: "body.small",
    px: 5
  },
  md: {
    height: 8,
    minWidth: 10,
    fontSize: "body.small",
    px: 4
  },
  sm: {
    height: 6,
    minWidth: 8,
    fontSize: "caption",
    px: 3
  }
};

const unstyledStyle = {
  userSelect: "inherit",
  bg: "none",
  border: 0,
  color: "inherit",
  display: "inline",
  font: "inherit",
  lineHeight: "inherit",
  m: 0,
  p: 0,
  textAlign: "inherit"
};

const linkVariantProps = () => {
  return {
    p: 0,
    height: "unset",
    lineHeight: "normal",
    color: "blue",
    minWidth: "unset",
    _hover: {
      color: "blue.hover",
      textDecoration: "underline"
    },
    _active: {
      textDecoration: "underline"
    },
    _focus: {
      textDecoration: "underline"
    },
    _disabled: {
      color: "#A7A7AD"
    }
  };
};

const solidVariantProps = ({ mode }) => {
  let style = {
    primary: {
      bg: `blue`,
      color: "white",
      _hover: {
        bg: "blue.hover",
        cursor: "pointer"
      },
      _focus: {
        borderColor: "blue.300",
        boxShadow: "0 0 0 3px rgba(170, 179, 255, 0.75)"
      },
      _disabled: {
        bg: "blue.200",
        cursor: "not-allowed"
      }
    },
    secondary: {
      bg: `blue.100`,
      color: "blue",
      _hover: {
        bg: "blue.150",
        cursor: "pointer"
      },
      _focus: {
        borderColor: "blue.300",
        boxShadow: "0 0 0 3px rgba(170, 179, 255, 0.75)"
      },
      _disabled: {
        bg: "blue.50",
        pointerEvents: "none",
        cursor: "not-allowed",
        color: "blue.300"
      }
    }
  };

  return style[mode];
};

const sizeProps = ({ size }) => sizes[size];

const variantProps = props => {
  switch (props.variant) {
    case "solid":
      return solidVariantProps(props);
    case "link":
      return linkVariantProps(props);
    case "unstyled":
      return unstyledStyle;
    default:
      return {};
  }
};

const useButtonStyle = props => {
  const theme = useTheme();

  const _props = { ...props, theme };
  return {
    ...baseProps,
    ...variantProps(_props),
    ...sizeProps(_props)
  };
};

export { useButtonStyle };
