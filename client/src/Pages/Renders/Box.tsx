import { Box } from 'rebass';
import styled from 'styled-components';

interface StyledBoxProps {
  isFinished: boolean;
};

export const StyledBox = styled(Box)<StyledBoxProps>`
  background-color: ${props => props.theme.colors.thirdary};
  box-shadow: ${props => props.theme.shadows.small};
  transition: box-shadow .2s ease-out;
  border-bottom: 3px solid;
  border-color: ${props => props.isFinished ? props.theme.colors.green : props.theme.colors.red};

  :hover {
    box-shadow: ${props => props.theme.shadows.large};
  }

  > div > * {
    margin: 0;
  }
`;
