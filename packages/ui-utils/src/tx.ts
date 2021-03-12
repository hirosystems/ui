import type { MempoolTransaction, Transaction } from '@blockstack/stacks-blockchain-api-types';
import { truncateMiddle } from './strings';
import { toHumanReadableStx } from './units';

/**
 * getContractName
 *
 * Gets the contract name of a string: contract_id or fully qualified asset name.
 *
 * @param value - the source string: [principal].[contract-name] or [principal].[contract-name]::[asset-name]
 */
export const getContractName = (value: string): string => {
  if (value.includes('.')) {
    const parts = value?.split('.');
    if (value.includes('::')) {
      return parts[1].split('::')[0];
    }
    return parts[1];
  }
  console.warn('getContractName: does not contain a period, does not appear to be a contract_id.', {
    value,
  });
  return value;
};

/**
 * getAssetName
 *
 * Gets the asset name from a string.
 *
 * @param fullyQualifiedName - the fully qualified name of the asset: [principal].[contract-name]::[asset-name]
 */
export const getAssetName = (fullyQualifiedName: string): string => {
  if (!fullyQualifiedName.includes('::')) {
    console.warn(
      'getAssetName: does not contain "::", does not appear to be a fully qualified name of an asset.',
      {
        fullyQualifiedName,
      }
    );
    return fullyQualifiedName;
  }
  return fullyQualifiedName.split('::')[1];
};

/**
 * getAssetStringParts
 *
 * Gets the parts that make up a fully qualified name of an asset
 *
 * @param fullyQualifiedName - the fully qualified name of the asset: [principal].[contract-name]::[asset-name]
 */
export const getAssetStringParts = (
  fullyQualifiedName: string
): {
  address: string;
  contractName: string;
  assetName: string;
} => {
  if (!fullyQualifiedName.includes('.') || !fullyQualifiedName.includes('::')) {
    console.warn(
      'getAssetStringParts: does not contain a period or "::", does not appear to be a fully qualified name of an asset.',
      {
        fullyQualifiedName,
      }
    );
    return {
      address: fullyQualifiedName,
      contractName: fullyQualifiedName,
      assetName: fullyQualifiedName,
    };
  }

  const address = fullyQualifiedName.split('.')[0];
  const contractName = getContractName(fullyQualifiedName);
  const assetName = getAssetName(fullyQualifiedName);

  return {
    address,
    contractName,
    assetName,
  };
};

const TransactionType = {
  SMART_CONTRACT: 'smart_contract' as Transaction['tx_type'],
  CONTRACT_CALL: 'contract_call' as Transaction['tx_type'],
  TOKEN_TRANSFER: 'token_transfer' as Transaction['tx_type'],
  COINBASE: 'coinbase' as Transaction['tx_type'],
  POISON_MICROBLOCK: 'poison_microblock' as Transaction['tx_type'],
} as const;

export function hasMemo(tx: Transaction): boolean {
  if (tx.tx_type !== 'token_transfer') return false;
  return !!tx.token_transfer.memo;
}

export function getRecipientAddress(tx: Transaction): string | null {
  if (tx.tx_type !== 'token_transfer') return null;
  return tx.token_transfer.recipient_address;
}

export function getFunctionName(tx: Transaction): string | null {
  if (tx.tx_type !== 'contract_call') return null;
  return tx.contract_call.function_name;
}

export function isPendingTx(tx: MempoolTransaction): boolean {
  return tx.tx_status === 'pending';
}

export const getTxTitle = (transaction: Transaction) => {
  switch (transaction.tx_type) {
    case 'smart_contract':
      return getContractName(transaction?.smart_contract?.contract_id);
    case 'contract_call':
      return getFunctionName(transaction);
    case 'token_transfer':
      return toHumanReadableStx(transaction.token_transfer.amount);
    case 'coinbase':
      return `Block #${transaction.block_height} coinbase`;
    default:
      return truncateMiddle(transaction.tx_id, 10);
  }
};

export const txTypeNamesMap = {
  [TransactionType.SMART_CONTRACT]: 'Contract deploy',
  [TransactionType.CONTRACT_CALL]: 'Function call',
  [TransactionType.TOKEN_TRANSFER]: 'Token transfer',
  [TransactionType.COINBASE]: 'Coinbase',
  [TransactionType.POISON_MICROBLOCK]: 'Poison-microblock',
} as const;

export function getTxTypeName(tx: Transaction) {
  return txTypeNamesMap[tx.tx_type];
}

export const getMemoString = (string: string): string | null =>
  string
    ? Buffer.from(string.replace('0x', '').replace(/^(0{2})+|(0{2})+$/g, ''), 'hex').toString(
        'utf8'
      )
    : null;
