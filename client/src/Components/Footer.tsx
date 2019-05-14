import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.thirdary};
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
  text-align: start;
  padding: .2rem;
  user-select: none;

  @media (min-width: ${props => props.theme.devices.desktop}) {
    font-size: 1.6rem;
  }

  @media (max-width: ${props => props.theme.devices.desktop}) {
    text-align: center;
    #mentions {
      display: none;
    }
  }

  > * {
    display: inline-block;
    margin: 1rem;
  }
`;

const Footer: React.FC = () => (
  <StyledFooter>
    <h6>Antoine Ordonez</h6>
    <h6>Victor Neuret</h6>
    <h6>Yann Saison</h6>
    <h6 id='mentions' style={{float: 'right'}}>POC</h6>
  </StyledFooter>
);

export default Footer;
