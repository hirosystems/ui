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

```json
{
  "stx": {
    "balance": "1000000",
    "total_sent": "0",
    "total_received": "1000000"
  },
  "fungible_tokens": {},
  "non_fungible_tokens": {}
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

### with0x

This will prefix a string with `0x`, unless it contains a `.`.

### truncateHex

This will truncate a hex, keeping the 0x out of the offset amount.

### truncateMiddle

This will truncate any string in the middle, given an offset amount.

### withSTX

This will wrap any value with a suffix ` STX`.

### addSepBetweenStrings

This will combine an array of strings with a divider character.

## Transactions

### getContractName

This will parse a string and return the contract name.

### getAssetName

This will parse a fully qualified asset name string and pull out the name of the asset.

### getAssetStringParts

This will parse a fully qualified asset name string and return the various parts: `address`, `contractName`, `assetName`.

### hasMemo

Helper function to determine if a transaction has a memo.

### getRecipientAddress

Returns the recipient address from a token transfer transaction.

### getFunctionName

Returns the function name from a contract call transaction.

### isPendingTx

Check if transaction is pending.

### getTxTitle

Returns a pretty title for a transaction.

### getTxTypeName

Returns a pretty name for transaction type.

### getMemoString

Returns the memo as a human readable string.

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
