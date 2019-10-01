import React, {
  forwardRef,
  Children,
  cloneElement,
  isValidElement
} from "react";
import Flex from "../flex";
import Box from "../box";

const Stack = forwardRef(
  (
    {
      isInline,
      children,
      align,
      justify,
      spacing = 2,
      shouldWrapChildren,
      ...rest
    },
    ref
  ) => {
    return (
      <Flex
        align={align}
        justify={justify}
        flexDir={isInline ? "row" : "column"}
        ref={ref}
        {...rest}
      >
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return;
          let isLastChild = children.length === index + 1;
          let spacingProps = isInline
            ? { mr: isLastChild ? null : spacing }
            : { mb: isLastChild ? null : spacing };

          if (shouldWrapChildren) {
            return (
              <Box d="inline-block" {...spacingProps}>
                {child}
              </Box>
            );
          }
          return cloneElement(child, spacingProps);
        })}
      </Flex>
    );
  }
);

export default Stack;
