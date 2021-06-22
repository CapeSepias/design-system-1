import React from 'react';
import PropTypes, { bool } from 'prop-types';
import styled from 'styled-components';
import { Tooltip } from '../Tooltip';
import { BaseButton } from '../BaseButton';

const IconButtonWrapper = styled(BaseButton)`
  border: ${({ borderLess }) => (borderLess ? 'none' : undefined)};
  svg {
    > g,
    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral400};
      }
    }
  }
`;

export const IconButton = React.forwardRef(({ children, title, description, ...props }, ref) => {
  return (
    <Tooltip label={title}>
      <IconButtonWrapper {...props} ref={ref}>
        {children}
      </IconButtonWrapper>
    </Tooltip>
  );
});

IconButton.displayName = 'IconButton';

IconButton.defaultProps = {
  title: undefined,
  borderLess: false,
};
IconButton.propTypes = {
  borderLess: bool,
  children: PropTypes.element.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
};
