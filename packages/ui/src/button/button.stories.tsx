import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button } from './index';
import type { ButtonProps } from './types';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = args => {
  return <Button {...args} height="40px" width="120px" />;
};

// Modes
export const Primary = Template.bind({});
Primary.args = {
  mode: 'primary',
  children: 'Primary',
  variant: 'solid',
};

export const Secondary = Template.bind({});
Secondary.args = {
  mode: 'secondary',
  children: 'Secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  mode: 'tertiary',
  children: 'Tertiary',
};
