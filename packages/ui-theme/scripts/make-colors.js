const data = require('../src/figma.json');
// @ts-ignore
const tinycolor = require('tinycolor2');
const fs = require('fs');
const path = require('path');

const transformColors = palette => {
  const keys = Object.keys(palette);

  const final = {};

  keys.sort().forEach(key => {
    const entry = palette[key];
    const items = Object.keys(entry);
    items.forEach(itemKey => {
      const { value } = entry[itemKey];
      final[`color-${key}-${itemKey}`] = tinycolor(value).toHslString();
    });
  });

  return final;
};

function figmaTokenToColorToken(figmaToken) {
  return figmaToken.replace('colors', 'color').replace('$', '').replace(/\./g, '-');
}

const transformThemes = theme => {
  const categories = Object.keys(theme);

  const final = {};

  categories.forEach(category => {
    const entry = theme[category];
    const items = Object.keys(entry);
    items.sort().forEach(itemKey => {
      const { value } = entry[itemKey];
      final[`${itemKey}`] = figmaTokenToColorToken(value);
    });
  });

  const alphabetical = {};
  Object.keys(final)
    .sort()
    .forEach(key => {
      alphabetical[key] = final[key];
    });
  return alphabetical;
};

function checkKeys(light, dark) {
  const lightKeys = Object.keys(light);
  const darkKeys = Object.keys(dark);
  const isSame = lightKeys.length === darkKeys.length;
  const lightIsGreater = lightKeys.length > darkKeys.length;
  const getKeysInOther = () => {
    if (!isSame) {
      if (lightIsGreater) {
        return lightKeys.filter(key => {
          return !darkKeys.find(_key => _key === key);
        });
      } else {
        return darkKeys.filter(key => lightKeys.find(_key => key !== key));
      }
    }
  };
  if (lightKeys.length !== darkKeys.length)
    throw Error(
      `Theme key lengths do not match! Light: ${Object.keys(light).length}, Dark: ${
        Object.keys(dark).length
      }, missing keys: ${JSON.stringify(getKeysInOther())}`
    );
}

async function run() {
  const { light: _light, dark: _dark, ...palette } = data.record.values.options.colors;

  const light = transformThemes(_light);
  const dark = transformThemes(_dark);

  // checkKeys(light, dark); TODO: this should prevent the job from running

  const fileContents = `export const foundation = ${JSON.stringify(
    transformColors(palette)
  )} as const;
export const light = ${JSON.stringify(light)} as const;
export const dark = ${JSON.stringify(dark)} as const;`;

  fs.writeFileSync(path.resolve('./src', './system/colors.ts'), fileContents);
}

run()
  .then(() => {
    process.exit();
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
