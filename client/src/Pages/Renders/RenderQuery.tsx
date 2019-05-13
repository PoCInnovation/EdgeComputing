import { SceneInterface } from '@edge-computing/interfaces';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'rebass';

import { StyledBox } from './Box';
import { StyledGrid } from './Grid';

interface RenderSceneProps {
  scenes: SceneInterface[];
};

export const RenderQuery: React.FC<RenderSceneProps> = ({ scenes }) => (
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
