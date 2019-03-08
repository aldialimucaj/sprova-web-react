import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import LayoutContext, {
  LayoutContextValue,
  LayoutType,
} from './contexts/LayoutContext';
import ProjectLayout from './layout';
import { Home, Project } from './pages';

const App = () => {
  const [layoutType, setLayoutType] = useState('Overview' as LayoutType);

  const layoutContext: LayoutContextValue = {
    setLayout: setLayoutType,
    type: layoutType,
  };

  return (
    <LayoutContext.Provider value={layoutContext}>
      <ProjectLayout>
        <Route path="" exact={true} component={Home} />
        <Route path="/project" component={Project} />
      </ProjectLayout>
    </LayoutContext.Provider>
  );
};

export default App;
