import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color .2s ease-out;

  :hover {
    color: ${props => props.theme.colors.secondary};
  }

  &.active {
    border-bottom: 2px solid ${props => props.theme.colors.secondary + 'f0'};
  }
`;

StyledNavLink.defaultProps = {
  activeClassName: 'active',
  exact: true
};

export default StyledNavLink;
