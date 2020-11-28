import type { AddressBalanceResponse } from '@blockstack/stacks-blockchain-api-types';

export const hasAssetBalance = (balances?: AddressBalanceResponse) => {
  if (!balances) return 0;
  let totalFt = 0;
  let totalNft = 0;
  if (balances?.fungible_tokens) {
    totalFt =
      (balances.fungible_tokens && Object.keys(balances?.fungible_tokens || {}).length) || 0;
  }
  if (balances.non_fungible_tokens) {
    totalNft = Object.keys(balances?.non_fungible_tokens || {}).length;
  }

  return totalFt + totalNft > 0;
};
