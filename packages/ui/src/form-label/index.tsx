import React from 'react';
import { Box } from '../box';
import { Text } from '../text';
import { FormLabelProps } from './types';
import { forwardRefWithAs } from '@stacks/ui-core';

export * from './types';

/* eslint react/no-children-prop: 0 */
export const RequiredIndicator = (props: any) => (
  <Box as="span" ml={1} color="red" aria-hidden="true" children="*" {...props} />
);

export const FormLabel: React.FC<FormLabelProps> = forwardRefWithAs<FormLabelProps, 'label'>(
  ({ children, isDisabled, isRequired, as = 'label', ...props }, ref) => {
    return (
      <Text
        ref={ref}
        mb="extra-tight"
        opacity={isDisabled ? 0.4 : 1}
        textAlign="left"
        verticalAlign="middle"
        display="inline-block"
        textStyle="body.small.medium"
        {...props}
      >
        {children}
        {isRequired && <RequiredIndicator />}
      </Text>
    );
  }
);
