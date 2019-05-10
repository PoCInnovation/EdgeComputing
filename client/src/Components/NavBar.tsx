import React from 'react';
import styled from 'styled-components';

import NavLink from './NavLink';

const StyledNavBar = styled.header`
  background-color: ${props => props.theme.colors.main + 'f0'};
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 2;
  padding: .5rem;
  margin: 0;

  > * {
    font-size: 1.5rem;
    margin: 1rem;
  }
`;

const NavBar: React.FC = () => (
  <StyledNavBar>
    <NavLink to='/'>intro</NavLink>
    <NavLink to='/renders' exact >renders</NavLink>
    <NavLink to='/new' exact>new</NavLink>
  </StyledNavBar>
);

export default NavBar;
