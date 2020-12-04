import * as React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

export type TooltipProps = TippyProps & { label: TippyProps['content'] };

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  'aria-label': ariaLabel = label,
  ...rest
}: any) => {
  return (
    <Tippy
      content={label}
      aria-label={ariaLabel}
      trigger="mouseenter"
      hideOnClick={undefined}
      {...rest}
    />
  );
};
