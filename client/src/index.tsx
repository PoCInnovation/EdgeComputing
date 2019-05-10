import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { GlobalStyle, Theme } from './Configs/Theme';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({ uri: '/graphql' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={Theme}>
      <>
        <App />
        <GlobalStyle />
      </>
    </ThemeProvider>
  </ApolloProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
