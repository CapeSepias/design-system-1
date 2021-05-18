import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { Portal } from '../Portal';
import { useTooltipHandlers } from './hooks/useTooltipHandlers';
import { useTooltipLayout } from './hooks/useTooltipLayout';
import { useId } from '../helpers/useId';
import { VisuallyHidden } from '../VisuallyHidden';

const TooltipWrapper = styled(Box)`
  position: absolute;
  display: ${({ visible }) => (visible ? 'revert' : 'none')};
`;

export const Tooltip = ({ children, label, description, delay, position, ...props }) => {
  const tooltipId = useId('tooltip');
  const descriptionId = useId('description');
  const { visible, ...tooltipHandlers } = useTooltipHandlers(delay);
  const { tooltipWrapperRef, toggleSourceRef } = useTooltipLayout(visible, position);

  const childrenClone = React.cloneElement(children, {
    ref: toggleSourceRef,
    tabIndex: 0,
    'aria-labelledby': label ? tooltipId : undefined,
    'aria-describedby': description ? tooltipId : undefined,
    ...tooltipHandlers,
  });

  return (
    <>
      <Portal>
        <TooltipWrapper
          id={tooltipId}
          background="neutral900"
          hasRadius
          padding={2}
          role="tooltip"
          ref={tooltipWrapperRef}
          visible={visible}
          {...props}
        >
          {visible && <VisuallyHidden id={descriptionId}>{description}</VisuallyHidden>}
          <Text small={true} highlighted={true} textColor="neutral0">
            {label || description}
          </Text>
        </TooltipWrapper>
      </Portal>

      {childrenClone}
    </>
  );
};

Tooltip.defaultProps = {
  delay: 500,
  position: 'top',
  label: undefined,
  description: undefined,
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  description: PropTypes.string,
  label: PropTypes.string,
  position: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
};