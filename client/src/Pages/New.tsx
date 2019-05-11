import React from 'react';

import Uploader from '../Components/Uploader';

const New: React.FC = () => (
  <>
    <div style={{marginBottom: '4rem'}}>
      <h1 style={{margin: 0}}>New Render</h1>
      <h6 style={{margin: 0}}>Let's create a new render!</h6>
    </div>
    <Uploader />
  </>
);

export default New;
