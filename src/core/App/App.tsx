import Layout from '@/components/Layout/Layout';
import { CycleProvider } from '@/contexts/CycleContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { Project } from '@/pages';
import React from 'react';
import './App.scss';

const App = () => {
  return (
    <ProjectProvider>
      <CycleProvider>
        <Layout>
          <Project />
        </Layout>
      </CycleProvider>
    </ProjectProvider>
  );
};

export default App;
