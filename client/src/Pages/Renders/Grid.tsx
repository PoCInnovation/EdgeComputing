import { Flex } from 'rebass';
import styled from 'styled-components';

export const StyledGrid = styled(Flex)`
  @media (max-width: ${props => props.theme.devices.mobile}) {
    flex-direction: column;

    > * {
      height: 14.5rem;
      width: 18rem;
    }
  }

  @media (min-width: ${props => props.theme.devices.mobile}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-direction: row;
    grid-column-gap: 1.5rem;
  }

  @media (min-width: ${props => props.theme.devices.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
