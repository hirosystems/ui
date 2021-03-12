const _typography = {
    letterSpacings: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
    lineHeights: {
        normal: 'normal',
        none: '1',
        shorter: '1.333',
        short: '1.4',
        base: '1.5',
        tall: '1.625',
        taller: '2',
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
    fonts: {
        heading:
            '"Open Sauce", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        body:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    },
    fontSizes: [
        '12px',
        '14px',
        '16px',
        '20px',
        '24px',
        '28px',
        '32px',
        '36px',
        '48px',
        '64px',
        '96px',
        '128px',
    ],
};

const displayLarge = {
    fontWeight: _typography.fontWeights.semibold,
    fontSize: _typography.fontSizes[4],
    lineHeight: _typography.lineHeights.shorter, // 1.333
    letterSpacing: '-0.02em',
};
const displaySmall = {
    fontWeight: _typography.fontWeights.medium,
    fontSize: _typography.fontSizes[3],
    lineHeight: _typography.lineHeights.short, // 1.4
    letterSpacing: '-0.02em',
};
const bodyLarge = {
    fontWeight: _typography.fontWeights.normal,
    fontSize: _typography.fontSizes[2],
    lineHeight: _typography.lineHeights.base, // 1.5 (24)
    letterSpacing: '-0.01em',
};
const bodyLargeMedium = {
    ...bodyLarge,
    fontWeight: _typography.fontWeights.medium,
};
const bodySmall = {
    fontWeight: _typography.fontWeights.normal,
    fontSize: _typography.fontSizes[1],
    lineHeight: _typography.lineHeights.short, // 1.4 (19.6)
    letterSpacing: '-0.01em',
};
const bodySmallMedium = {
    ...bodySmall,
    fontWeight: _typography.fontWeights.medium,
};
const caption = {
    fontSize: _typography.fontSizes[0],
    lineHeight: _typography.lineHeights.shorter, // 1.333 (16)
    letterSpacing: '0.00em',
};
const captionMedium = {
    ...bodySmall,
    fontWeight: _typography.fontWeights.medium,
};

export const textStyles = {
    display: {
        large: displayLarge,
        small: displaySmall,
    },
    body: {
        large: {
            ...bodyLarge,
            medium: bodyLargeMedium,
        },
        small: {
            ...bodySmall,
            medium: bodySmallMedium,
        },
    },
    caption: {
        ...caption,
        medium: captionMedium,
    },
} as const;

export const typography = {
    ..._typography,
    textStyles,
};
