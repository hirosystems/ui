import { withSTX } from './strings';

const MICROSTACKS_IN_STACKS = 1000000 as const;
export function microStxToStx(microStx: string | number): number | string {
  return Number(Number(microStx) / Math.pow(10, 6));
}
export function toHumanReadableStx(microStx: string | number): string {
  return withSTX(
    microStxToStx(microStx).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })
  );
}
export function stxToMicroStx(amountInStacks: string | number) {
  return amountInStacks ? Math.floor(Number(amountInStacks) * MICROSTACKS_IN_STACKS) : 0;
}
