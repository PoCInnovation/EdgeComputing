import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from './Components/Container';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

import Intro from './Pages/Intro';
import NotFound from './Pages/NotFound';

const StyledApp = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  position: relative;
  overflow: hidden;
`;

const App: React.FC = () => {
  return (
    <StyledApp>
      <Router>
        <NavBar />
        <Container>
          <Switch>
            <Route path='/' exact component={Intro} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </StyledApp>
  );
};

export default App;
