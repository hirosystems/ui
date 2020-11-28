import React from 'react';

import { Grid, GridProps } from './grid';

export const Circle: React.FC<GridProps> = ({ size = '48px', borderRadius = size, ...rest }) => (
  <Grid placeItems="center" size={size} borderRadius={borderRadius} {...rest} />
);
