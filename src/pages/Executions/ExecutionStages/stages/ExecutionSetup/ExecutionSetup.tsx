import { FormSelect } from '@/components/form';
import PageHeader from '@/components/PageHeader';
import { parseQuery } from '@/utils';
import { Col, Form, Row, Select } from 'antd';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
        title="Execution Setup"
        url={`/projects/${match.params.pid}/executions`}
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
