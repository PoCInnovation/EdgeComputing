import React from 'react';
import { ThemeProps } from 'styled-components';

import Config from '../../Components/Config';
import { ThemeInterface } from '../../Configs/Theme';
import { ConnectedIndicator } from './ConnectedIndicator';
import { QueryInterface } from './Query';

export interface RenderProps {
  id: string;
};

export const RenderQuery: React.FC<RenderProps & QueryInterface & ThemeProps<ThemeInterface>> = ({ id, scene, theme }) => (
  <div style={{marginTop: '4rem'}}>
    <div style={{marginBottom: '4rem'}}>
      <h1 style={{margin: 0}}>{ scene.name }</h1>
      <h4 style={{margin: '.2rem'}}>({scene.width} x {scene.height})</h4>
    </div>
    <Config id={Number(id)} />
    <ConnectedIndicator id={id} />
    <canvas
      width={scene.width}
      height={scene.height}
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        maxWidth: '1280px',
        maxHeight: '720px',
        backgroundColor: theme.colors.thirdary
      }}
    />
  </div>
);
