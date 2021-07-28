import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box } from '../Box';
import { Row } from '../Row';
import { Text } from '../Text';
import { useMainNav } from './MainNavContext';
import { Tooltip } from '../Tooltip';

const IconBox = styled(Box)`
  height: 1rem;
`;

// TODO: make sure to use the Link component associated with the router we want to use
const MainNavLinkWrapper = styled(RouterLink)`
  text-decoration: none;
  display: block;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

  ${Text} {
    color: ${({ theme }) => theme.colors.neutral600};
  }

  svg path {
    fill: ${({ theme }) => theme.colors.neutral500};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral100};

    ${Text} {
      color: ${({ theme }) => theme.colors.neutral700};
    }

    svg path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary100};

    svg path {
      fill: ${({ theme }) => theme.colors.primary600};
    }

    ${Text} {
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: 500;
    }
  }
`;

const MainNavRow = styled(Row)`
  padding: ${({ theme }) => `${theme.spaces[2]} ${theme.spaces[3]}`};
`;

export const NavLink = ({ children, icon, ...props }) => {
  const condensed = useMainNav();

  if (condensed) {
    return (
      <li>
        <Tooltip position="right" label={children}>
          <MainNavLinkWrapper {...props}>
            <MainNavRow as="span">
              <IconBox aria-hidden paddingRight={0} as="span">
                {icon}
              </IconBox>
            </MainNavRow>
          </MainNavLinkWrapper>
        </Tooltip>
      </li>
    );
  }

  return (
    <li>
      <MainNavLinkWrapper {...props}>
        <MainNavRow as="span">
          <IconBox aria-hidden paddingRight={3} as="span">
            {icon}
          </IconBox>

          <Text>{children}</Text>
        </MainNavRow>
      </MainNavLinkWrapper>
    </li>
  );
};

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};