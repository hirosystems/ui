import * as StyledSystem from "styled-system";
import * as React from "react";
import { Omit } from "../common-types";

type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";


type FontWeight =
  | "hairline"
  | "thin"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

interface IFontSize {
  fontSize?:
  | StyledSystem.ResponsiveValue<FontSize>
  | StyledSystem.FontSizeProps["fontSize"];
}


interface IFontWeight {
  fontWeight?:
  | StyledSystem.ResponsiveValue<FontWeight>
  | StyledSystem.FontWeightProps["fontWeight"];
}

type LineHeight = "none" | "shorter" | "short" | "normal" | "tall" | "taller";

interface ILineHeight {
  lineHeight?:
  | StyledSystem.ResponsiveValue<LineHeight>
  | StyledSystem.LineHeightProps["lineHeight"];
}

type LetterSpacing =
  | "tighter"
  | "tight"
  | "normal"
  | "wide"
  | "wider"
  | "widest";

interface ILetterSpacing {
  letterSpacing?:
  | StyledSystem.ResponsiveValue<LetterSpacing>
  | StyledSystem.LetterSpacingProps["letterSpacing"];
}

interface As {
  as?: React.ElementType;
}

type TypographyProps = Omit<
  StyledSystem.TypographyProps,
  "fontWeight" | "lineHeight" | "fontSize" | "letterSpacing"
>;

export type BoxProps = React.RefAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  StyledSystem.LayoutProps &
  StyledSystem.ColorProps &
  StyledSystem.SpaceProps &
  StyledSystem.BordersProps &
  StyledSystem.BackgroundProps &
  StyledSystem.PositionProps &
  StyledSystem.FlexboxProps &
  StyledSystem.ShadowProps &
  StyledSystem.GridProps &
  StyledSystem.OpacityProps &
  TypographyProps &
  IFontSize &
  ILetterSpacing &
  IFontWeight &
  ILineHeight &
  As;

export type BoxComponent = React.FC<BoxProps>;
