import { color } from '../color-modes';

const defaultStyle = {
  height: '48px',
  border: '1px solid',
  borderBottomColor: color('border'),
  borderLeftColor: color('border'),
  borderRightColor: color('border'),
  borderTopColor: color('border'),
  borderColor: color('border'),
  bg: color('bg'),
  _hover: {
    borderBottomColor: color('border'),
    borderLeftColor: color('border'),
    borderRightColor: color('border'),
    borderTopColor: color('border'),
    borderColor: color('border'),
  },
  _disabled: {
    bg: color('bg-4'),
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  _focus: {
    borderBottomColor: 'rgba(170, 179, 255, 0.4)',
    borderLeftColor: 'rgba(170, 179, 255, 0.4)',
    borderRightColor: 'rgba(170, 179, 255, 0.4)',
    borderTopColor: 'rgba(170, 179, 255, 0.4)',
    borderColor: 'rgba(170, 179, 255, 0.4)',
    boxShadow: '0 0 0 1px rgba(170, 179, 255, 0.75)',
  },
  _invalid: {
    borderBottomColor: color('feedback-alert'),
    borderLeftColor: color('feedback-alert'),
    borderRightColor: color('feedback-alert'),
    borderTopColor: color('feedback-alert'),
    borderColor: color('feedback-alert'),
  },
};

const baseProps = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  transition: 'all 0.2s',
  outline: 'none',
  borderRadius: '6px',
  p: '14px 16px',
};

interface InputStyle {
  [key: string]: any;
}
interface InputStyles {
  default: InputStyle;
  [key: string]: InputStyle;
}

export const inputSizes: InputStyles = {
  default: {
    fontSize: 'body.small',
    height: '48px',
    lineHeight: 'base',
  },
};

const useInputStyle = (props: any) => {
  return {
    width: props.isFullWidth ? '100%' : undefined,
    ...baseProps,
    ...defaultStyle,
  };
};

export default useInputStyle;
