import { FormSelect } from '@/components/form';
import { PageContent, PageHeader } from '@/components/Layout';
import { ProjectContext } from '@/contexts/ProjectContext';
import { parseQuery } from '@/utils';
import { Breadcrumb, Card, Col, Form, Row, Select } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './ExecutionSetup.scss';
import ExecutionSetupCycle from './ExecutionSetupCycle';
import ExecutionSetupTestcase from './ExecutionSetupTestcase';
import ExecutionSetupTestset from './ExecutionSetupTestset';

const Option = Select.Option;

interface Params {
  pid: string;
}

const ExecutionSetup: React.FunctionComponent<RouteComponentProps<Params>> = ({
  location,
  match,
}) => {
  const { type: executionType } = parseQuery(location);

  const { currentProject } = useContext(ProjectContext);

  const validateType = (_type: string): string | undefined => {
    return (
      ((_type === 'testcases' || _type === 'cycle' || _type === 'testset') &&
        _type) ||
      undefined
    );
  };

  const [type, setType] = useState(
    validateType(executionType as string) || 'testcases'
  );

  let form;

  switch (type) {
    case 'testcases': {
      form = <ExecutionSetupTestcase />;
      break;
    }
    case 'testset': {
      form = <ExecutionSetupTestset />;
      break;
    }
    case 'cycle': {
      form = <ExecutionSetupCycle />;
      break;
    }
  }

  return (
    <Fragment>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Link to={`/projects/${match.params.pid}`}>
              <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
            </Link>
            <Link to={`/projects/${match.params.pid}/executions`}>
              <Breadcrumb.Item>Executions</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Setup</Breadcrumb.Item>
          </Breadcrumb>
        }
        title="Start New Execution"
      />
      <PageContent>
        <Card>
          <Row>
            <Col span={12}>
              <Form layout="vertical">
                <FormSelect
                  className="narrow-select"
                  label="Type"
                  value={type}
                  onChange={setType}
                >
                  <Option value="testcases">Test Cases</Option>
                  <Option value="testset">Test Set</Option>
                  <Option value="cycle">Cycle</Option>
                </FormSelect>
                {form}
              </Form>
            </Col>
          </Row>
        </Card>
      </PageContent>
    </Fragment>
  );
};

export default withRouter(ExecutionSetup);
