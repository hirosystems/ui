import React, { useRef } from 'react';
import { Box } from '../box';
import { Flex, FlexProps } from '../flex';
import { useHotkeys } from 'react-hotkeys-hook';
import useOnClickOutside from 'use-onclickoutside';
import { color } from '../color-modes';
import {
  ForwardRefExoticComponentWithAs,
  forwardRefWithAs,
  MemoExoticComponentWithAs,
} from '@stacks/ui-core';
import { useMergeRefs } from '../hooks/use-merge-refs';

const ModalUnderlay: React.FC<{ isOpen?: boolean; noAnimation?: boolean }> = React.memo(
  ({ isOpen, noAnimation }) => (
    <Box
      position="fixed"
      size="100%"
      left={0}
      right={0}
      top={0}
      bottom={0}
      bg={`rgba(0,0,0,${isOpen ? '0.48' : '0'})`}
      transition={noAnimation ? 'unset' : 'all 0.15s'}
      zIndex={99999}
      style={{
        userSelect: isOpen ? 'unset' : 'none',
        pointerEvents: isOpen ? 'unset' : 'none',
        willChange: 'background',
      }}
    />
  )
);

const ModalWrapper: React.FC<{ isOpen?: boolean } & FlexProps> = React.memo(
  ({ isOpen, ...rest }) => (
    <Flex
      zIndex={999999}
      position="fixed"
      bottom={[0, 'unset']}
      width="100%"
      top={0}
      left={0}
      height="100%"
      maxHeight={['100vh', 'unset']}
      alignItems="center"
      justifyContent={['flex-end', 'center']}
      flexDirection="column"
      opacity={isOpen ? 1 : 0}
      style={{
        userSelect: isOpen ? 'unset' : 'none',
        pointerEvents: isOpen ? 'unset' : 'none',
      }}
      {...rest}
    />
  )
);

const ModalCard: ForwardRefExoticComponentWithAs<
  { isOpen?: boolean; noAnimation?: boolean } & FlexProps,
  'dialog'
> = forwardRefWithAs<{ isOpen?: boolean; noAnimation?: boolean } & FlexProps, 'dialog'>(
  ({ noAnimation, isOpen, ...rest }, ref) => (
    <Flex
      border="1px solid"
      borderColor={color('border')}
      flexDirection="column"
      position="relative"
      bg={color('bg-2')}
      mx="auto"
      minWidth={['100%', '396px']}
      maxWidth={['100%', '396px']}
      maxHeight={['100%', 'calc(100% - 48px)']}
      borderRadius={['unset', '6px']}
      boxShadow="high"
      transform={noAnimation ? 'translateY(0px)' : isOpen ? 'translateY(0px)' : 'translateY(15px)'}
      transition={noAnimation ? 'unset' : 'all 0.2s ease-in-out'}
      style={{
        willChange: 'transform',
      }}
      ref={ref}
      {...rest}
    />
  )
);
export interface ModalProps extends FlexProps {
  isOpen: boolean;
  noAnimation?: boolean;
  handleClose: () => void;
}

export const ControlledModal: MemoExoticComponentWithAs<ModalProps, 'dialog'> = React.memo(
  forwardRefWithAs<ModalProps, 'dialog'>((props, ref) => {
    const _ref = useRef(null);
    const combinedRef = useMergeRefs(ref, _ref);
    const { children, isOpen = false, handleClose, noAnimation = false, ...rest } = props;
    const onCloseHandler = isOpen ? handleClose : () => null;

    useOnClickOutside(_ref, onCloseHandler);
    useHotkeys('esc', onCloseHandler, [onCloseHandler]);

    return (
      <>
        <ModalUnderlay isOpen={isOpen} noAnimation={noAnimation} />
        <ModalWrapper isOpen={isOpen}>
          <ModalCard isOpen={isOpen} noAnimation={noAnimation} ref={combinedRef} {...rest}>
            {children}
          </ModalCard>
        </ModalWrapper>
      </>
    );
  })
);
