import gql from 'graphql-tag';
import moment from 'moment';
import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';

import Scene from '../Interfaces/Scene';

const GET_SCENES = gql`
  {
    scenes {
      id
      name
      createdAt
      isFinished
    }
  }
`;

interface QueryInterface {
  scenes: Scene[];
};

interface RenderSceneProps {
  scenes: Scene[];
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

const RenderScenes: React.FC<RenderSceneProps> = ({ scenes }) => (
  <>
    <div style={{marginBottom: '10rem', marginTop: '6rem'}}>
      <h1 style={{margin: 0}}>Renders</h1>
    </div>
    <StyledGrid flexWrap='wrap' justifyContent='space-between' height='100%'>
      {scenes.sort((a, b) => b.id - a.id).map((scene, i) => (
        <Link to={`/render/${scene.id}`} style={{color: 'inherit', textDecoration: 'none'}}>
          <StyledBox isFinished={scene.isFinished} key={i} mb='2rem'>
            {/* <img alt={scene.name} src={scene.url} style={{width: '100%', height: '10rem', objectFit: 'cover'}} /> */}
            <Box p='1rem' mx='0' style={{textAlign: 'start', minHeight: '12rem', minWidth: '20rem'}}>
              <h5 style={{color: 'white'}}>{ scene.name }</h5>
              <h6 style={{fontWeight: 'normal'}}>{moment.duration(moment(scene.createdAt).minutes() - 60, 'minutes').humanize(true)}</h6>
            </Box>
          </StyledBox>
        </Link>
      ))}
    </StyledGrid>
  </>
);

const Renders: React.FC = () => (
  <Query query={GET_SCENES}>
    {({ loading, error, data }: QueryResult<QueryInterface>) => {
      if (loading) return "Loading...";
      if (error || data === undefined) return `Error! ${error !== undefined ? error.message : null}`

      return <RenderScenes scenes={data.scenes} />;
    }}
  </Query>
);

export default Renders;
