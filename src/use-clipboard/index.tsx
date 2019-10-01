import { useState } from "react";

interface IClipboard<T> {
  value?: T;
  onCopy?: () => void;
  hasCopied?: boolean;
}

/**
 *
 * @param {any} value - The content to add to clipboard
 */
const copyToClipboard = value => {
  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();

  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

function useClipboard<T>(value: T): IClipboard<T> {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = () => {
    copyToClipboard(value);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1500);
  };

  return { value, onCopy, hasCopied };
};

export default useClipboard;
