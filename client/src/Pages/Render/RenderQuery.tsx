import React from 'react';
import { ThemeProps } from 'styled-components';

import Config from '../../Components/Config';
import { ThemeInterface } from '../../Configs/Theme';
import { ConnectedIndicator } from './ConnectedIndicator';
import { QueryInterface } from './Query';

export interface RenderProps {
  id: string;
};

export class RenderQuery extends React.Component<RenderProps & QueryInterface & ThemeProps<ThemeInterface>> {
  state = {
    count: 0
  };

  update() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    const {scene, id, theme} = this.props;

    return (
    <div style={{marginTop: '4rem'}}>
      <div style={{marginBottom: '4rem'}}>
        <h1 style={{margin: 0}}>{ scene.name }</h1>
        <h4 style={{margin: '.2rem'}}>({scene.width} x {scene.height})</h4>
      </div>
      <Config id={Number(id)} />
      <ConnectedIndicator id={id} update={() => this.update()} />
      <img
        src={`/files/${scene.image}?count=${this.state.count}`}
        width={1280}
        height={720}
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
          maxWidth: '100%',
          maxHeight: '100%',
          backgroundColor: theme.colors.thirdary
        }}
      />
    </div>
    );
  }
};
