import React from 'react';
import { Circle } from './circle';
import { GridProps } from './grid';
import { useGradients } from './hooks/use-gradient';

interface DynamicColorCircleProps extends GridProps {
  string: string;
}
export const DynamicColorCircle: React.FC<DynamicColorCircleProps> = ({
  string,
  children,
  ...rest
}) => {
  const { getGradient } = useGradients();
  const gradient = getGradient(string);

  return (
    <Circle
      textTransform="capitalize"
      flexShrink={0}
      backgroundImage={gradient}
      position="relative"
      fontWeight="500"
      {...rest}
    >
      {children}
    </Circle>
  );
};
