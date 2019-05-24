import React from 'react';
import { connect } from 'socket.io-client';

import { ConnectionType } from '../../edge-computing/connections';
import { ConnectedCountType, WorkDoneType } from '../../edge-computing/events';

interface ConnectedIndicatorProps {
  id: string;
  update: Function;
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
    const io = connect(ConnectionType.CLIENT, {
      query: {
        id: this.props.id
      }
    });

    io.on(ConnectedCountType, (data: any) => this.connectedCountHandler(data));
    this.setState({
      onDisconnect: () => io.disconnect()
    });

    io.on(WorkDoneType, () => this.props.update());
  }

  componentWillUnmount() {
    this.state.onDisconnect();
  }

  render() {
    return (
      <h6>Connected: {this.state.numberOfConnected}</h6>
    );
  }
};
