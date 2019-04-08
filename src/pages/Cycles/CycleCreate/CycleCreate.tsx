import { FormButton, FormInput, FormTextArea } from '@/components/form';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFormInput } from '@/hooks/useFormInput';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import PageContent from '@/layout/PageContent';
import { Breadcrumb, Card, Col, Form, Row } from 'antd';
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
  const [{ project, testCases }] = useContext(ProjectContext);

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
                <Breadcrumb.Item>{project!.title}</Breadcrumb.Item>
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
        <Row>
          <Col {...formContentLayout}>
            <Form layout="vertical">
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
              {/* Add TestCase Select component here */}
              <FormButton
                type="primary"
                loading={isLoading}
                disabled={!cycleTitle}
              >
                Create Cycle
              </FormButton>
            </Form>
          </Col>
        </Row>
      </Card>
    </PageContent>
  );
};

export default withRouter(CycleCreate);
