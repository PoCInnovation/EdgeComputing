import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';

interface data {
  name: string;
  isFinished: boolean;
  date: string;
  url: string;
};

const fakeData: data[] = [
  { name: 'A simple scene', isFinished: true, date: 'Yesterday', url: 'https://cdn.discordapp.com/attachments/553271868115910656/573185929611575326/random.png'},
  { name: 'Big scene', isFinished: false, date: '1 hour ago', url: 'https://cdn.discordapp.com/attachments/561254039170449408/572822214752337930/boule-flou.png'},
  { name: 'Big scene', isFinished: false, date: '3 minutes ago', url: 'https://cdn.discordapp.com/attachments/561254039170449408/572806809580994560/clement_demission_yann.png'},
  { name: 'Big scene', isFinished: false, date: '3 March 2017', url: 'https://cdn.discordapp.com/attachments/561254039170449408/572794697769025536/glass.png'}
];

interface RendersProps {
  renders: data[]
};

interface StyledBoxProps {
  isFinished: boolean;
};

const StyledBox = styled(Box)<StyledBoxProps>`
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

const StyledGrid = styled(Flex)`
  @media (min-width: ${props => props.theme.devices.mobile}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    flex-direction: row;
    grid-column-gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.devices.mobile}) {
    flex-direction: column;

    > * {
      height: 14.5rem;
      width: 18rem;
    }
  }
`;

const Renders: React.FC<RendersProps> = ({ renders }) => (
  <>
    <div style={{marginBottom: '10rem'}}>
      <h1 style={{margin: 0}}>Renders</h1>
    </div>
    <StyledGrid flexWrap='wrap' justifyContent='space-between' height='100%'>
      {renders.map((render, i) => (
        <StyledBox isFinished={render.isFinished} key={i} mb='2rem'>
          <img alt={render.name} src={render.url} style={{width: '100%', height: '10rem', objectFit: 'cover'}} />
          <Box p='1rem' mx='0' style={{textAlign: 'start'}}>
            <h5 style={{color: 'white'}}>{ render.name }</h5>
            <h6 style={{fontWeight: 'normal'}}>{render.date}</h6>
          </Box>
        </StyledBox>
      ))}
    </StyledGrid>
  </>
);

Renders.defaultProps = {
  renders: fakeData
};

export default Renders;
