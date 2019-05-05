import Card from '@/components/Card';
import { FormButton, FormInput, FormTextArea } from '@/components/form';
import { PageContent, PageHeader } from '@/components/Layout';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFormInput } from '@/hooks/useFormInput';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { Breadcrumb, Col, Form, Row } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Params {
  pid: string;
}

const formContentLayout = {
  xs: { span: 24 },
  md: { span: 18 },
  lg: { span: 16 },
  xl: { span: 14 },
};

const CycleCreate: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
}) => {
  const { currentProject } = useContext(ProjectContext);

  const {
    value: cycleTitle,
    handleChange: handleCycleTitleChange,
  } = useFormInput('');
  const {
    value: description,
    handleChange: handleDescriptionChange,
  } = useFormTextArea('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PageContent
      header={
        <PageHeader
          breadcrumb={
            <Breadcrumb>
              <Link to={`/projects/${match.params.pid}`}>
                <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
              </Link>
              <Link to={`/projects/${match.params.pid}/testcases`}>
                <Breadcrumb.Item>Cycles</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item>New</Breadcrumb.Item>
            </Breadcrumb>
          }
          title="Create Cycle"
        />
      }
    >
      <Card>
        <Form layout="vertical">
          <Row>
            <Col {...formContentLayout}>
              <FormInput
                label="Title"
                value={cycleTitle}
                onChange={handleCycleTitleChange}
                placeholder="Cycle"
                required={true}
              />
              <FormTextArea
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Description"
                minLength={3}
              />
            </Col>
          </Row>
          <FormButton type="primary" loading={isLoading} disabled={!cycleTitle}>
            Create Cycle
          </FormButton>
        </Form>
      </Card>
    </PageContent>
  );
};

export default withRouter(CycleCreate);
