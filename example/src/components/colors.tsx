import React, { useEffect, useState } from 'react';
import FIGMA from '../common/figma.json';
import {
  Box,
  Grid,
  Stack,
  Text,
  color as _color,
  StackProps,
  Circle,
  Flex,
  Button,
  useColorMode,
} from '@stacks/ui';
// @ts-ignore
import tinycolor from 'tinycolor2';

import { useAtom, atom } from 'jotai';

const dataAtom = atom<null | {
  light: any;
  dark: any;
  palette: any;
  color_pallete: Record<string, string>;
}>(null);
const loadingAtom = atom<boolean>(false);
const theme: typeof FIGMA['values']['options'] = FIGMA.values.options;
const colors: typeof theme['colors'] = theme.colors;

const { light, dark, ...rest } = colors;

type Palette = Omit<typeof colors, 'light' | 'dark'>;
// const palette: Palette = rest;

type Themes = Pick<typeof colors, 'light' | 'dark'>;
const themes: Themes = { light, dark };

let DATA: any = null;

const ColorItem: React.FC<any> = ({ itemKey, parentKey, entry }) => {
  const { value } = entry[itemKey];
  const int = parseInt(itemKey);

  return (
    <Stack
      justifyContent="space-between"
      p="base-loose"
      bg={value}
      color={itemKey === 'black' || int >= 400 ? 'white' : 'unset'}
      isInline
    >
      <Box>
        color-{parentKey}-{itemKey}
      </Box>
      <Box textTransform="uppercase">{value}</Box>
    </Stack>
  );
};

const ColorList: React.FC<any> = ({ itemKey, parentKey, entry }) => {
  return <ColorItem itemKey={itemKey} parentKey={parentKey} entry={entry} />;
};

const ColorGroup: React.FC<any> = ({ parentKey }) => {
  const data = useData();
  if (!data) return null;
  const { palette } = data;
  const entry = (palette as any)[parentKey as any];
  const items = Object.keys(entry);
  return (
    <Stack border={`1px solid ${_color('border')}`}>
      {items.sort().map(itemKey => {
        return <ColorList key={itemKey} itemKey={itemKey} parentKey={parentKey} entry={entry} />;
      })}
    </Stack>
  );
};

async function fetchJson() {
  const res = await fetch('https://api.jsonbin.io/v3/b/608023f5027da70c476dcd52/latest', {
    headers: {
      'X-Master-Key': '$2b$10$KqRnsk1hFnOI4O1NprBYZ.dTHACp8onua.k.IJz5DM/up9LblaTmK',
    },
  });
  const data: {
    record: typeof FIGMA;
  } = await res.json();
  const { light, dark, ...palette } = data.record.values.options.colors;
  return {
    light,
    dark,
    palette,
    color_pallete: getPalette(palette),
  };
}

const getPalette = (palette: any) => {
  const keys: any[] = Object.keys(palette);

  const final: any = {};

  keys.forEach(key => {
    const entry = (palette as any)[key as any];
    const items = Object.keys(entry);
    items.forEach(itemKey => {
      const { value } = entry[itemKey];
      final[`color-${key}-${itemKey}`] = tinycolor(value).toHslString();
    });
  });

  return final;
};

function useData(): null | {
  light: any;
  dark: any;
  palette: any;
  color_pallete: Record<string, string>;
} {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [data, setData] = useAtom<
    null | {
      light: any;
      dark: any;
      palette: any;
      color_pallete: Record<string, string>;
    },
    null | {
      light: any;
      dark: any;
      palette: any;
      color_pallete: Record<string, string>;
    }
  >(dataAtom);

  useEffect(() => {
    if (!data && !loading) {
      setLoading(true);
      fetchJson().then(data => {
        setData(data);
        DATA = data;
        setLoading(false);
      });
    }
  }, [data]);

  return data;
}

const Palette = (props: StackProps) => {
  const data = useData();

  if (!data) return null;

  const keys: any = Object.keys(data.palette);

  return (
    <Stack spacing="extra-loose" {...props}>
      <Grid gap="extra-loose" gridTemplateColumns="repeat(3, 1fr)">
        <ColorGroup parentKey={'base'} />
      </Grid>
      <Grid gap="extra-loose" gridTemplateColumns="repeat(3, 1fr)">
        {keys
          .filter((k: string) => k !== 'base')
          .map((parentKey: string) => {
            return <ColorGroup key={parentKey} parentKey={parentKey} />;
          })}
      </Grid>
    </Stack>
  );
};

const views = [
  {
    slug: 'palette',
    label: 'Palette',
  },
  {
    slug: 'light',
    label: 'Light theme',
  },
  {
    slug: 'dark',
    label: 'Dark theme',
  },
];

function figmaTokenToColorToken(figmaToken: string) {
  return figmaToken.replace('colors', 'color').replace('$', '').replace(/\./g, '-');
}

const Theme = ({ theme: _theme }: { theme: 'light' | 'dark' }) => {
  const data = useData();
  if (data === null) return null;
  const { palette, color_pallete, ...themes } = data;
  const theme = themes[_theme];

  const keys = Object.keys(theme);

  return (
    <Grid
      maxWidth="600px"
      mx={'auto'}
      width="100%"
      gap="extra-loose"
      gridTemplateColumns="repeat(1, 1fr)"
    >
      {keys.map(key => {
        // @ts-ignore
        const entry = theme[key] as any;
        const _keys = Object.keys(entry);
        return (
          <Stack spacing="base">
            <Box>{key}</Box>
            <Stack p="extra-loose" bg={_color('bg-4')} spacing="base">
              {_keys.sort().map(_key => {
                const { value } = entry[_key];
                const token = figmaTokenToColorToken(value);
                const color = color_pallete[token];
                if (!color) console.error(_key, value, token, color);
                return (
                  <Flex alignItems="center" justifyContent="space-between">
                    <Stack
                      border="1px solid"
                      borderColor={_color('border')}
                      borderRadius="28px"
                      p="tight"
                      pr="base-loose"
                      bg={_color('bg')}
                      alignItems="center"
                      isInline
                    >
                      <Circle
                        size="24px"
                        border={`1px solid ${_color('border')}`}
                        bg={color || token}
                      />
                      <Box color={_color('text-title')}>color-{_key}</Box>
                    </Stack>
                    <Box color={_color('text-caption')}>{token}</Box>
                  </Flex>
                );
              })}
            </Stack>
          </Stack>
        );
      })}
    </Grid>
  );
};
export const ColorsPage: React.FC = () => {
  const [inView, setInView] = useState(views[0].slug);
  const data = useData();
  const { colorMode, toggleColorMode } = useColorMode();

  if (!data) return <>Loading...</>;
  return (
    <Stack spacing="extra-loose" p="extra-loose">
      <Flex pb="extra-loose" justifyContent="space-between">
        <Stack isInline spacing="extra-loose">
          {views.map((view, index) => {
            return (
              <Text
                color={_color('text-title')}
                opacity={inView === view.slug ? 1 : 0.35}
                _hover={inView !== view.slug ? { opacity: 0.8 } : {}}
                fontSize={8}
                onClick={() => setInView(view.slug)}
                key={`${view}-${index}`}
              >
                {view.label}
              </Text>
            );
          })}
        </Stack>
        <Stack isInline>
          <Button onClick={() => toggleColorMode()}>Toggle color mode</Button>
        </Stack>
      </Flex>
      {inView === 'palette' ? <Palette /> : <Theme theme={inView as any} />}
    </Stack>
  );
};
