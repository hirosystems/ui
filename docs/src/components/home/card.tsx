import React from 'react';
import { Grid, Box, Flex, space, color, transition, FlexProps } from '@stacks/ui';
import NextLink from 'next/link';
import { useTouchable } from '@common/hooks/use-touchable';

interface CardProps extends FlexProps {
  href?: string;
  dark?: boolean;
}
const LinkComponent = ({ href }: { href: string }) =>
  href ? (
    <NextLink href={href} passHref>
      <Box zIndex={99} position="absolute" size="100%" as="a" display="block" />
    </NextLink>
  ) : null;

export const Card: React.FC<CardProps> = ({ children, onClick, dark = false, href, ...rest }) => {
  const { bind, hover, active } = useTouchable({
    behavior: 'link',
  });
  return (
    <Flex
      width="100%"
      cursor={(hover || active) && 'pointer'}
      position="relative"
      {...bind}
      {...rest}
    >
      {href && <LinkComponent href={href} />}
      <Grid
        width="100%"
        px={space('base-loose')}
        py={space('extra-loose')}
        borderRadius="12px"
        border={`1px solid ${dark ? 'rgb(39, 41, 46)' : color('border')}`}
        transform={active ? 'translateY(-10px)' : hover ? 'translateY(-15px)' : 'none'}
        boxShadow={(hover && 'high') || (active && 'mid')}
        transition={transition}
        style={{
          placeItems: 'center',
          willChange: 'transform, box-shadow',
          userSelect: 'none',
        }}
      >
        {(children as any)({ hover, active })}
      </Grid>
    </Flex>
  );
};
