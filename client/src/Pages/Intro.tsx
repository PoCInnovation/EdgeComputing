import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Components/Button';

const Intro: React.FC = () => (
  <>
    <div style={{marginBottom: '6rem'}}>
      <h1 style={{margin: 0}}>Edge Computing</h1>
      <h3>The next generation rendering engine.</h3>
    </div>
    <Link to='/new' style={{color: 'inherit', textDecoration: 'none'}}>
      <Button>Let's start!</Button>
    </Link>
  </>
);

export default Intro;
