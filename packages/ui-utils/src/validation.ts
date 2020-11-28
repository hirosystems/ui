import { with0x } from './strings';
import { c32addressDecode } from 'c32check';

/**
 * validateHex
 *
 * @param {string} hex - the hex sha hash to validate
 */
export const validateHex = (hex: string): boolean => {
  const value = with0x(hex);
  const regex = /0x[A-Fa-f0-9]{64}/;
  const matches = regex.exec(value);

  return matches?.[0] === hex;
};

/**
 * validateStacksAddress
 *
 * @param {String} stacksAddress - the Stacks address to validate
 */
export const validateStacksAddress = (stacksAddress: string): boolean => {
  try {
    c32addressDecode(stacksAddress);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * validateContractId
 *
 * @param {string} contract_id - the fully realized contract name to validate, ex: [principal].[contract-name]
 */
export const validateContractId = (contract_id: string): boolean => {
  if (!contract_id.includes('.')) return false;

  const stxAddress = contract_id.split('.')[0];
  const contractName = contract_id.split('.')[1];
  const nameRegex = /[a-zA-Z]([a-zA-Z0-9]|[-_!?+<>=/*])*$|^[-+=/*]$|^[<>]=?$/;
  try {
    const validStacksAddress = validateStacksAddress(stxAddress);
    const validName = nameRegex.exec(contractName);
    return !!(validName && validStacksAddress);
  } catch (e) {
    return false;
  }
};
