import camelCase from 'camelcase';
import { properties } from '../common/css-properties';
import { aliases, css, multiples, Theme } from '../css';
import { useCallback } from 'react';

export const config: any = {
  w: 'width',
  minW: 'minWidth',
  maxW: 'maxWidth',
  h: 'height',
  minH: 'minHeight',
  maxH: 'maxHeight',
  bgImg: 'backgroundImage',
  bgSize: 'backgroundSize',
  bgPos: 'backgroundPosition',
  bgRepeat: 'backgroundRepeat',
  pos: 'position',
  flexDir: 'flexDirection',
  dir: 'flexDirection',
  direction: 'flexDirection',
  align: 'alignItems',
  justify: 'justifyContent',
  wrap: 'flexWrap',
  shadow: 'boxShadow',

  // grid
  templateColumns: 'gridTemplateColumns',
  gap: 'gridGap',
  rowGap: 'gridRowGap',
  columnGap: 'gridColumnGap',
  autoFlow: 'gridAutoFlow',
  autoRows: 'gridAutoRows',
  autoColumns: 'gridAutoColumns',
  templateRows: 'gridTemplateRows',
  templateAreas: 'gridTemplateAreas',
  area: 'gridArea',
  column: 'gridColumn',
  row: 'gridRow',
};

config['bgAttachment'] = config.backgroundAttachment;
config['textDecor'] = config.textDecoration;
config['listStylePos'] = config.listStylePosition;
config['listStyleImg'] = config.listStyleImage;

const variantProps = ['textStyle', 'buttonStyle', 'colorStyle'];

/**
 * The selectors are based on [WAI-ARIA state properties](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties) and common CSS Selectors
 */
const hover = '&:hover';
const active = '&:active, &[data-active=true]';
const focus = '&:focus';
const visited = '&:visited';
const even = '&:nth-of-type(even)';
const odd = '&:nth-of-type(odd)';
const disabled =
  '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover';
const checked = '&[aria-checked=true]';
const mixed = '&[aria-checked=mixed]';
const selected = '&[aria-selected=true]';
const invalid = '&[aria-invalid=true]';
const pressed = '&[aria-pressed=true]';
const readOnly = '&[aria-readonly=true], &[readonly]';
const first = '&:first-of-type';
const last = '&:last-of-type';
const expanded = '&[aria-expanded=true]';
const grabbed = '&[aria-grabbed=true]';
const notFirst = '&:not(:first-of-type)';
const notLast = '&:not(:last-of-type)';
const groupHover = '[role=group]:hover &';

export const allPossibleProps = [
  ...variantProps,
  ...properties.map(prop => camelCase(prop)),
  ...Object.keys(aliases),
  ...Object.keys(multiples),
  ...Object.keys(config),
];

export const useCss = ({
  _after,
  _focus,
  _selected,
  _focusWithin,
  _hover,
  _invalid,
  _active,
  _disabled,
  _grabbed,
  _pressed,
  _expanded,
  _visited,
  _before,
  _readOnly,
  _first,
  _notFirst,
  _notLast,
  _last,
  _placeholder,
  _checked,
  _groupHover,
  _mixed,
  _odd,
  _even,
  css: _cssProp,
  sx: _sxProp,
  ...props
}: any) => {
  const _css: Record<string, any> = {};
  const _pseudo: Record<string, any> = {
    [hover]: _hover,
    [focus]: _focus,
    [active]: _active,
    [visited]: _visited,
    [disabled]: _disabled,
    [selected]: _selected,
    [invalid]: _invalid,
    [expanded]: _expanded,
    [grabbed]: _grabbed,
    [readOnly]: _readOnly,
    [first]: _first,
    [notFirst]: _notFirst,
    [notLast]: _notLast,
    [last]: _last,
    [odd]: _odd,
    [even]: _even,
    [mixed]: _mixed,
    [checked]: _checked,
    [pressed]: _pressed,
    [groupHover]: _groupHover,
    '&:before': _before,
    '&:after': _after,
    '&:focus-within': _focusWithin,
    '&::placeholder': _placeholder,
  };
  let rest = {
    ...props,
  };

  const isCssProp = useCallback(
    (prop: string) => allPossibleProps.find(cssProp => cssProp === prop),
    []
  );

  const propKeys = Object.keys(props);

  propKeys.forEach(prop => {
    if (isCssProp(prop)) {
      _css[prop] = props[prop];
      delete rest[prop];
    }
  });

  const styles = (theme: Theme) => {
    const _styles = css(_css)(theme) || {};
    const pseudoStyles = css(_pseudo)(theme) || {};
    const cssPropStyles = css(_cssProp)(theme) || {};
    const sxPropStyles = css(_sxProp)(theme) || {};
    const result = { ..._styles, ...pseudoStyles, ...cssPropStyles, ...sxPropStyles };
    return result;
  };
  return [styles, rest];
};
