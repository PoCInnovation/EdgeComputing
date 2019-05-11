import React from 'react';
import { connect } from 'socket.io-client';

interface ConnectedIndicatorProps {
  id: string;
};

interface ConnectedIndicatorState {
  numberOfConnected: number;
  onDisconnect: Function;
};

export class ConnectedIndicator extends React.Component<ConnectedIndicatorProps, ConnectedIndicatorState> {
  state = {
    numberOfConnected: 0,
    onDisconnect: () => undefined
  };

  async connectHandler({ count }: { count: number }) {
    this.setState({ numberOfConnected: count });
  }

  async connectedCountHandler({ count }: { count: number }) {
    this.setState({ numberOfConnected: count });
  }

  componentWillMount() {
    const io = connect('/worker', {
      query: {
        id: this.props.id
      }
    });

    io.on('connectedCount', (data: any) => this.connectedCountHandler(data));
    this.setState({
      onDisconnect: () => io.disconnect()
    });
  }

  componentWillUnmount() {
    this.state.onDisconnect();
  }

  render() {
    return (
      <h6>Connected: {this.state.numberOfConnected}</h6>
    )
  }
};