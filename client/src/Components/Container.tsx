import posed from 'react-pose';
import styled from 'styled-components';

const Container = styled(posed.div({
  enter: {
    opacity: 1,
    delay: 100,
    transition: {
      opacity: { ease: 'easeOut', duration: 100 },
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 100
    }
  }
}))`
  padding: 2.5rem;
  width: 100%;
  max-width: 75rem;
`;

export default Container;
