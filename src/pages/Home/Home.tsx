import React from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../../hooks';

const Home: React.FunctionComponent<{}> = ({ children }) => {
  useLayout('Overview');
  return (
    <div style={{ padding: 24, background: '#fff', minHeight: '90%' }}>
      Home page
      <br />
      <Link to="/project">Go to project page (for debug)</Link>
    </div>
  );
};

export default Home;
