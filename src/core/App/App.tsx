import { Layout } from '@/components/Layout';
import { CycleProvider } from '@/contexts/CycleContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { TestCaseProvider } from '@/contexts/TestCaseContext';
import { Project } from '@/pages';
import React from 'react';
import './App.scss';

const App = () => {
  return (
    <ProjectProvider>
      <CycleProvider>
        <TestCaseProvider>
          <Layout>
            <Project />
          </Layout>
        </TestCaseProvider>
      </CycleProvider>
    </ProjectProvider>
  );
};

export default App;
