import { FormSelect } from '@/components/form';
import PageHeader from '@/components/PageHeader';
import { ProjectContext } from '@/contexts/ProjectContext';
import { parseQuery } from '@/utils';
import { Breadcrumb, Col, Form, Row, Select, Button, Icon } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import ExecutionSetupCycle from './ExecutionSetupCycle';
import ExecutionSetupTestcase from './ExecutionSetupTestcase';
import ExecutionSetupTestset from './ExecutionSetupTestset';
import './index.scss';

const Option = Select.Option;

interface Params {
  pid: string;
}

const ExecutionSetup: React.FunctionComponent<RouteComponentProps<Params>> = ({
  location,
  match,
}) => {
  const { type: executionType } = parseQuery(location);

  const [{ project }] = useContext(ProjectContext);

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
              <Breadcrumb.Item>{project!.title}</Breadcrumb.Item>
            </Link>
            <Link to={`/projects/${match.params.pid}/executions`}>
              <Breadcrumb.Item>Executions</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>Setup</Breadcrumb.Item>
          </Breadcrumb>
        }
        title="Start New Execution"
      />
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
    </Fragment>
  );
};

export default withRouter(ExecutionSetup);
