import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { getProject } from "../../api/project.api";
import { useLayout } from '../../hooks';
import { RouteComponentProps } from 'react-router-dom';
import { Project } from "../../models/Project";

const ProjectDetails: React.FunctionComponent<{} & RouteComponentProps<{}>> = ({ match }: { match: any }) => {
  useLayout('Project');

  const [project, setProject] = useState<Project>({} as Project);
  const fetchData = async () => {
    try {
      const data = await getProject(match.params.id);
      setProject(data);
    } catch (e) {
      // TODO: take care of no data error
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, background: '#fff', minHeight: '90%' }}>
        {project.title}
        <br></br>
        {project.description}
      </div>
    </React.Fragment>
  );
};

export default ProjectDetails;
