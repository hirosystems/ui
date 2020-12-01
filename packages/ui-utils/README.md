# Stacks UI utilities

## Table of contents

- [Accounts](#accounts)
- [Colors](#colors)
- [Errors](#errors)
- [Numbers](#numbers)
- [Strings](#strings)
- [Transactions](#transactions)
- [Units](#units)
- [Validation](#validation)

## Accounts

### hasAssetBalance

This is a helper to determine if a principal has any asset balances -- fungible or non-fungible.

Takes a [balances response object](https://blockstack.github.io/stacks-blockchain-api/#operation/get_account_balance).

```js
const data = {
  stx: {
    balance: '1000000',
    total_sent: '0',
    total_received: '1000000',
  },
  fungible_tokens: {},
  non_fungible_tokens: {},
};

if (hasAssetBalance(data)) {
  // do something
}
```

## Colors

### generateHash

This takes a string and generates a number has to use with `%`.

```ts
const hash = generateHash('some string');
// get a number between 0-360
const hue = hash % 360;
```

### hashValue

This function generates a hash from a string, and then gets a value from an array. An example usage would be to have an array of colors you'd like to pick from.

```ts
const colors = ['red', 'blue', 'green'];
const string = 'Hiro Protaganist';
const colorFromString = hashValue<('red' | 'blue' | 'green')[]>(string, colors);
// will be one of the colors
```

### stringToHslColor

This takes a string, saturation value, and lightness value to output a color in HSL.

```ts
const string = 'Hiro Protaganist';
const color = stringToHslColor(string, 60, 55);
// an hsl color
```

### moduloRange

This is a helper function to select a number from a range.

```ts
const restrictedHue = moduloRange(hash, [40, 60], true);
// will return a number between 40 and 60, including 60 as an option
```

## Errors

### getTxErrorMessage

Will return a human readable error message for the status of a transaction.

```ts
// tx.tx_status === "abort_by_post_condition"
const error = getTxErrorMessage(tx);
// This transaction would have succeeded, but was rolled back by a supplied post-condition.

// tx.tx_status === "abort_by_response"
const error = getTxErrorMessage(tx);
// This transaction did not succeed because the transaction was aborted during its execution.
```

## Strings

### capitalize

This will convert the first letter of a string to upper case.

```ts
const string = 'hello stx';

console.log(capitalize(string));
// -> Hello stx
```

### with0x

This will prefix a string with `0x`, unless it contains a `.`.

```ts
const hex = `33cc9a437e704e790958f7bb66492f5ad3a863ab3bcbef47138069725549a353`;
const contract = 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market';
const id = 'muneeb.id';

const query = with0x(contract);
// ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market

const query = with0x(id);
// muneeb.id

const query = with0x(hex);
// 0x33cc9a437e704e790958f7bb66492f5ad3a863ab3bcbef47138069725549a353
```

### truncateHex

This will truncate a hex, keeping the 0x out of the offset amount.

```ts
const hex = `0x33cc9a437e704e790958f7bb66492f5ad3a863ab3bcbef47138069725549a353`;

const shortened = truncateHex(hex, 4);
// 0x33cc...a353
```

### truncateMiddle

This will truncate any string in the middle, given an offset amount.

```ts
const hex = `0x33cc9a437e704e790958f7bb66492f5ad3a863ab3bcbef47138069725549a353`;

const shortened = truncateHex(hex, 4);
// 0x33cc...a353

const contract = 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market';

const shortenedContract = truncateHex(contract, 4);
// ST12...KDRV.market
```

### withSTX

This will wrap any value with a suffix ` STX`.

```ts
const value = '1,000.00';

console.log(withSTX(value));
// 1,000.00 STX
```

### addSepBetweenStrings

This will combine an array of strings with a divider character.

```ts
const string = addSepBetweenStrings(['Pending', 'Contract deploy', '5 min ago'], '|');

// Pending | Contract deploy | 5 min ago
```

## Transactions

### getContractName

This will parse a string and return the contract name.

```ts
const contract =
  'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market' ||
  'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market::asset-name';

const name = getContractName(contract);

// market
```

### getAssetName

This will parse a fully qualified asset name string and pull out the name of the asset.

```ts
const contract = 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market::asset-name';

const asset = getAssetName(contract);

// asset-name
```

### getAssetStringParts

This will parse a fully qualified asset name string and return the various parts: `address`, `contractName`, `assetName`.

```ts
const contract = 'ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV.market::asset-name';

const { address, contractName, assetName } = getAssetStringParts(contract);

// ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV
// market
// asset-name
```

### hasMemo

Helper function to determine if a transaction has a memo.

```ts
if (hasMemo(tx)) {
  // do something
}
```

### getRecipientAddress

Returns the recipient address from a token transfer transaction.

```ts
const recipient = getRecipientAddress(tx);
// ST12EY99GS4YKP0CP2CFW6SEPWQ2CGVRWK5GHKDRV
```

### getFunctionName

Returns the function name from a contract call transaction.

```ts
const functionName = getFunctionName(tx); // a contract-call tx
// set-value
```

### isPendingTx

Check if transaction is pending.

```ts
if (isPendingTx(tx)) {
  // do something
}
```

### getTxTitle

Returns a pretty title for a transaction.

```ts
switch (transaction.tx_type) {
  case 'smart_contract':
  // returns contract-name -> key-value-contract
  case 'contract_call':
  // returns function-name -> set-value
  case 'token_transfer':
  // returns human readable stx amount -> 1,000.00 STX
  case 'coinbase':
  // returns -> Block #256 coinbase;
  default:
  // returns truncated tx_id -> 0x33cc...a353
}
```

### getTxTypeName

Returns a pretty name for transaction type.

```ts
const txTypeNamesMap = {
  [TransactionType.SMART_CONTRACT]: 'Contract deploy',
  [TransactionType.CONTRACT_CALL]: 'Function call',
  [TransactionType.TOKEN_TRANSFER]: 'Token transfer',
  [TransactionType.COINBASE]: 'Coinbase',
  [TransactionType.POISON_MICROBLOCK]: 'Poison-microblock',
} as const;
```

### getMemoString

Returns the memo as a human readable string.

```ts
const memo = getMemoString(tx);
// example: Faucet
```

## Units

### microStxToStx

Converts uSTX to STX.

### toHumanReadableStx

Converts uSTX to STX with suffix and number formatting.

### stxToMicroStx

Converts STX to uSTX.

## Validation

### validateHex

Checks validity of a hash string via regex.

### validateStacksAddress

Checks validity of a Stacks address.

### validateContractId

Checks validity of a contract_id (`[principal].[contract_name]`).
