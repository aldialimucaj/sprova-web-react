import { postTestCase } from '@/api/testcase.api';
import Card, { CardBody, CardFooter, CardHeader } from '@/components/Card';
import Input from '@/components/Input';
import { PageContent, PageHeader } from '@/components/Layout';
import Level from '@/components/Level';
import Table from '@/components/Table';
import TextArea from '@/components/TextArea';
import { CycleContext } from '@/contexts/CycleContext';
import { ProjectContext } from '@/contexts/ProjectContext';
import { TestCaseContext } from '@/contexts/TestCaseContext';
import { useFormInput } from '@/hooks/useFormInput';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { Breadcrumb, Button, notification, Select, Switch } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './TestCaseCreate.scss';
import TestStepInput from './TestStepInput';

const Option = Select.Option;

interface Params {
  pid: string;
}

const TestCaseCreate: React.FunctionComponent<RouteComponentProps<Params>> = ({
  history,
  match,
}) => {
  const { currentProject } = useContext(ProjectContext);
  const { currentCycle } = useContext(CycleContext);
  const { testCases, onAddTestCase } = useContext(TestCaseContext);

  const {
    value: testCaseTitle,
    handleChange: handleTestCaseTitleChange,
  } = useFormInput('');
  const {
    value: description,
    handleChange: handleDescriptionChange,
  } = useFormTextArea('');

  const [parent, setParent] = useState<TestCase | null>(null);
  const [testSteps, setTestSteps] = useState<TestStep[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInherited, setShowInherited] = useState<boolean>(false);

  const handleParentSelect = (parentIdString: string) => {
    const parentId = parentIdString;
    const parentNew = testCases.find((testCase) => testCase._id === parentId);
    setParent(parentNew || null);
  };

  const handleSubmit = async () => {
    const testCaseNew: Partial<TestCase> = {
      title: testCaseTitle,
      description,
      projectId: currentProject!._id,
      cycleId: currentCycle!._id,
      steps: testSteps,
    };

    if (parent) {
      testCaseNew.parentId = parent._id;
    }

    setIsLoading(true);

    try {
      const testCase = await postTestCase(testCaseNew);
      setIsLoading(false);
      onAddTestCase(testCase);
      notification.success({
        placement: 'bottomRight',
        message: `${testCase.title} created`,
        description: `Test case created with ID ${testCase._id}`,
      });
      history.push(`/projects/${match.params.pid}/testcases`);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to create test case',
        description: error,
      });
    }
  };

  return (
    <Fragment>
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <Link to={`/projects/${match.params.pid}`}>
              <Breadcrumb.Item>{currentProject!.title}</Breadcrumb.Item>
            </Link>
            <Link to={`/projects/${match.params.pid}/testcases`}>
              <Breadcrumb.Item>Test Cases</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item>New</Breadcrumb.Item>
          </Breadcrumb>
        }
        title="Create Test Case"
      />
      <PageContent>
        <Card style={{ marginBottom: 24 }}>
          <CardHeader>
            <h4>General Information</h4>
          </CardHeader>
          <CardBody darker={true}>
            <Input
              label="Title"
              onChange={handleTestCaseTitleChange}
              placeholder="Test Case"
              required={true}
              style={{ marginBottom: 24 }}
              value={testCaseTitle}
            />
            <TextArea
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Description"
            />
          </CardBody>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <CardHeader>
            <h4 style={{ marginBottom: 16 }}>Test Steps</h4>
            <Level>
              <div>
                <span style={{ marginRight: 16 }}>Inherit from</span>
                <Select
                  allowClear={true}
                  showSearch={true}
                  placeholder="None"
                  optionFilterProp="children"
                  value={(parent && parent._id) || undefined}
                  onChange={handleParentSelect}
                  style={{ width: 200 }}
                >
                  {testCases.map((testCase, index) => (
                    <Option key={index} value={testCase._id}>
                      {testCase.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div>
                <span style={{ marginRight: 8 }}>Show inherited steps</span>
                <Switch
                  disabled={!parent}
                  checked={showInherited}
                  onChange={() => setShowInherited(!showInherited)}
                />
              </div>
            </Level>
          </CardHeader>
          <CardBody padded={false}>
            <Table
              columnTitles={['#', 'Action', 'Expected']}
              data={[...testSteps]}
              renderRow={(testStep: TestStep, index: number) => [
                <td key={0}>{index + 1}</td>,
                <td key={1}>{testStep.action}</td>,
                <td key={2}>{testStep.expected}</td>,
                <td key={3}>
                  <a className="sprova-teststep-edit">Remove</a>
                </td>,
              ]}
            />
          </CardBody>
          <CardFooter darker={true}>
            <TestStepInput testSteps={testSteps} setTestSteps={setTestSteps} />
          </CardFooter>
        </Card>

        <Button
          type="primary"
          loading={isLoading}
          disabled={!testCaseTitle || testSteps.length === 0}
          onClick={handleSubmit}
        >
          Create Test Case
        </Button>
      </PageContent>
    </Fragment>
  );
};

export default withRouter(TestCaseCreate);
