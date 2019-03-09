import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import LayoutContext, {
  LayoutContextValue,
  LayoutType,
} from './contexts/LayoutContext';
import ProjectLayout from './layout';
import { CreateProject, Home, Project } from './pages';

const App = () => {
  const [layoutType, setLayoutType] = useState('Base' as LayoutType);

  const layoutContext: LayoutContextValue = {
    setLayout: setLayoutType,
    type: layoutType,
  };

  return (
    <LayoutContext.Provider value={layoutContext}>
      <ProjectLayout>
        <Route path="/projects" exact={true} component={Home} />
        <Route path="/projects/:id" component={Project} />
        <Route path="/new" component={CreateProject} />
      </ProjectLayout>
    </LayoutContext.Provider>
  );
};

export default App;
