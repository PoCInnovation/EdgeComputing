import { Flex } from 'rebass';
import styled from 'styled-components';

export const StyledGrid = styled(Flex)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  grid-gap: 1.5rem;
  padding: 2rem;
`;
