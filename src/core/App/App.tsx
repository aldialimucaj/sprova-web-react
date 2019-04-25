import { CycleProvider } from '@/contexts/CycleContext';
import { ProjectContext, ProjectProvider } from '@/contexts/ProjectContext';
import { UserProvider } from '@/contexts/UserContext';
import { Project, ProjectCreate } from '@/pages';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

const App = () => {
  return (
    <UserProvider>
      <ProjectProvider>
        <CycleProvider>
          <Switch>
            <Route path="/projects/new" component={ProjectCreate} />
            <Route path="" component={Project} />
          </Switch>
        </CycleProvider>
      </ProjectProvider>
    </UserProvider>
  );
};

export default App;
