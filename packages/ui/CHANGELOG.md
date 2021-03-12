# @stacks/ui

## 7.8.0

### Minor Changes

- [#92](https://github.com/blockstack/ui/pull/92) [`b5ce509`](https://github.com/blockstack/ui/commit/b5ce509b2083c2cca2af2a4d9f86dc6ab2477631) Thanks [@aulneau](https://github.com/aulneau)! - Export BoxProps and ButtonProps.

## 7.7.0

### Minor Changes

- [`b768fb1`](https://github.com/blockstack/ui/commit/b768fb1fb6eba8a2b62249ffba4b7a26057de391) Thanks [@aulneau](https://github.com/aulneau)! - Fix: types output to /dist/type folder.

### Patch Changes

- Updated dependencies [[`b768fb1`](https://github.com/blockstack/ui/commit/b768fb1fb6eba8a2b62249ffba4b7a26057de391)]:
  - @stacks/ui-core@7.3.0
  - @stacks/ui-theme@7.5.0
  - @stacks/ui-utils@7.5.0

## 7.6.0

### Minor Changes

- [#89](https://github.com/blockstack/ui/pull/89) [`9b63293`](https://github.com/blockstack/ui/commit/9b632939351b59517d07c41eaba4dc66385dcaa2) Thanks [@aulneau](https://github.com/aulneau)! - Improved types output.

### Patch Changes

- Updated dependencies [[`9b63293`](https://github.com/blockstack/ui/commit/9b632939351b59517d07c41eaba4dc66385dcaa2)]:
  - @stacks/ui-core@7.2.0
  - @stacks/ui-theme@7.4.0
  - @stacks/ui-utils@7.4.0

## 7.5.0

### Minor Changes

- [#87](https://github.com/blockstack/ui/pull/87) [`c7ec28d`](https://github.com/blockstack/ui/commit/c7ec28d470854fb581e34e988460a41ea81f1667) Thanks [@aulneau](https://github.com/aulneau)! - Replaces the built in compiler tsdx from `rollup-plugin-typescript2` to use `rollup-plugin-esbuild`. esbuild is amazing.

### Patch Changes

- Updated dependencies [[`c7ec28d`](https://github.com/blockstack/ui/commit/c7ec28d470854fb581e34e988460a41ea81f1667)]:
  - @stacks/ui-core@7.1.0
  - @stacks/ui-theme@7.3.0
  - @stacks/ui-utils@7.3.0

## 7.4.0

### Minor Changes

- [#83](https://github.com/blockstack/ui/pull/83) [`38d6dd6`](https://github.com/blockstack/ui/commit/38d6dd6f585678e5055cf20821353c4aad45bc91) Thanks [@aulneau](https://github.com/aulneau)! - Fix peer deps and typings for ui-theme and ui-core.

### Patch Changes

- [#77](https://github.com/blockstack/ui/pull/77) [`cc3b64f`](https://github.com/blockstack/ui/commit/cc3b64fc654143a7b72bc5c38755a4c547df8792) Thanks [@aulneau](https://github.com/aulneau)! - This change improves the button component in a few ways: it fixes the sizes to match the figma, updates the hover states, variants, and refactors the component to be easier to understand.

- Updated dependencies [[`38d6dd6`](https://github.com/blockstack/ui/commit/38d6dd6f585678e5055cf20821353c4aad45bc91)]:
  - @stacks/ui-theme@7.2.0
  - @stacks/ui-utils@7.2.0

## 7.3.0

### Minor Changes

- a6118a9: Fix circular dep

## 7.2.0

### Minor Changes

- d6f8bcd: Adds controlled modal, updates colors throughout to work with color modes.
- d6f8bcd: Move color mode types to theme, moves color util to utils.

### Patch Changes

- Updated dependencies [d6f8bcd]
- Updated dependencies [d6f8bcd]
  - @stacks/ui-theme@7.1.0
  - @stacks/ui-utils@7.1.0

## 7.1.2

### Patch Changes

- b67156d: Updates types for ButtonGroup, uses bg color for Modal.

## 7.1.1

### Patch Changes

- f50e15d: hotfix: by default isFullWidth should be true

## 7.1.0

### Minor Changes

- 96c8359: This restores behavior of the Input component to default to full width.
- fd3525d: This updates the underlying package used for the toolip, switching from a custom tooltip to using [`@tippyjs/react`](https://github.com/atomiks/tippyjs-react).

## 7.0.0

### Minor Changes

- 9b1c64b: - Adds `IconButton` component.
- d3075c8: - Update colors per design changes
  - Include `ColorModes` by default in `ThemeProvider`
  - Fixes `ColorModeProvider` to use localstorage.
  - Exports utils for color modes.

### Patch Changes

- @stacks/ui-core@7.0.0
- @stacks/ui-theme@7.0.0
- @stacks/ui-utils@7.0.0

## 6.0.0

### Patch Changes

- Updated dependencies [105319e]
  - @stacks/ui-core@6.0.0
  - @stacks/ui-theme@6.0.0
  - @stacks/ui-utils@6.0.0

## 5.0.0

### Minor Changes

- 59953ff: Bump package versions

### Patch Changes

- @stacks/ui-core@5.0.0
- @stacks/ui-theme@5.0.0
- @stacks/ui-utils@5.0.0

## 4.0.1

### Patch Changes

- Bump version

## 4.0.0

### Minor Changes

- 69c7222: Adds stx.design branded components:

  - StxInline
    - Used inline text, such as for a ticker symbol.
  - StxNexus
    - The outlined shape from https://stx.design
  - StacksLogo
    - The Nexus and word mark for the Stacks ecosystem.

  Export `StackProps` interface.

### Patch Changes

- Updated dependencies [69c7222]
  - @stacks/ui-core@1.1.0

## 3.0.1

### Patch Changes

- Release of v3, adds DynamicColorCircle, Circle, useGradient, and fixes Stack.
- Updated dependencies [undefined]
- Updated dependencies [undefined]
  - @stacks/ui-theme@1.1.2
  - @stacks/ui-core@1.0.1
