import { updateTestCase } from '@/api/testcase.api';
import Card, { CardBody, CardHeader } from '@/components/Card';
import Input from '@/components/Input';
import { Label } from '@/components/Label';
import Level from '@/components/Level';
import List from '@/components/List';
import Table, { TableColumn, TableRow } from '@/components/Table';
import TextArea from '@/components/TextArea';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { findById, findChildren } from '@/utils';
import { Alert, Col, Row, Spin, Switch, Typography } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

const Text = Typography.Text;

interface Params {
  pid: string;
  tid: string;
}

interface Props extends RouteComponentProps<Params> {
  testCase: TestCase;
  testCases: TestCase[];
}

const OverviewTab: React.FunctionComponent<Props> = ({
  history,
  match,
  testCase,
  testCases,
}) => {
  const {
    value: description,
    setValue: setDescription,
    handleChange: handleDescriptionChange,
  } = useFormTextArea(testCase.description);
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');

  const [showInherited, setShowInherited] = useState(false);

  const [parent, setParent] = useState<TestCase | null>(null);
  const [children, setChildren] = useState<TestCase[]>([]);

  const handleUpdateDescription = async () => {
    if (description === testCase.description) {
      setIsDescriptionEditable(false);
      return;
    }

    setIsDescriptionLoading(true);

    try {
      const ok = await updateTestCase({ ...testCase, description });
      if (!ok) {
        throw new Error('Response not ok');
      }
      testCase.description = description;
      setIsDescriptionEditable(false);
    } catch (error) {
      setDescriptionError(error);
      setTimeout(() => setDescriptionError(''), 3000);
    } finally {
      setIsDescriptionLoading(false);
    }
  };

  const handleSelectTestCase = (_testCase: TestCase) => {
    setDescription(_testCase.description);
    history.push(`/projects/${match.params.pid}/testcases/${_testCase._id}`);
  };

  const descriptionActions = isDescriptionEditable ? (
    <span>
      <a onClick={handleUpdateDescription} style={{ marginRight: 8 }}>
        Save
      </a>
      <a
        onClick={() => {
          setIsDescriptionEditable(false);
          setDescription(testCase.description);
        }}
      >
        Cancel
      </a>
    </span>
  ) : (
    <a onClick={() => setIsDescriptionEditable(true)}>Edit</a>
  );

  useEffect(() => {
    const _parent = findById(testCases, testCase.parentId);
    setParent(_parent || null);
  }, [testCases, testCase.parentId, match.params.tid]);

  useEffect(() => {
    const _children = findChildren(testCases, match.params.tid);
    if (_children) {
      setChildren(_children);
    }
  }, [testCases, match.params.tid]);

  return (
    <Fragment>
      <Row gutter={24}>
        <Col span={6}>
          <Card style={{ marginBottom: 24 }}>
            <CardHeader>
              <Level>
                <h4>General Information</h4>
              </Level>
            </CardHeader>
            <CardBody>
              {descriptionError && (
                <Alert
                  style={{ marginBottom: 16 }}
                  message={descriptionError}
                  type="error"
                />
              )}

              <Label text="Test Case ID" style={{ marginBottom: 16 }}>
                <Text copyable={true} ellipsis={false}>
                  {(testCase && testCase._id) || 'Test Case ID'}
                </Text>
              </Label>

              <Label text="Created At" style={{ marginBottom: 16 }}>
                {(testCase && new Date(testCase.createdAt).toDateString()) ||
                  'Date'}
              </Label>

              <Spin spinning={isDescriptionLoading}>
                <TextArea
                  disabled={!isDescriptionEditable}
                  empty="No Description"
                  extra={descriptionActions}
                  label="Description"
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                  value={description}
                />
              </Spin>
            </CardBody>
          </Card>

          {parent ? (
            <Card style={{ marginBottom: 24 }}>
              <CardHeader>
                <h4>Inherits From</h4>
              </CardHeader>
              <CardBody padded={false}>
                <List
                  data={[parent]}
                  onItemClick={handleSelectTestCase}
                  renderItem={(_testCase: TestCase, index: number) =>
                    _testCase.title
                  }
                  small={true}
                  zebra={true}
                />
              </CardBody>
            </Card>
          ) : null}

          <Card style={{ marginBottom: 24 }}>
            <CardHeader>
              <Level>
                <h4>Children</h4>
              </Level>
            </CardHeader>
            <CardBody padded={false}>
              <List
                data={children}
                onItemClick={handleSelectTestCase}
                renderItem={(_testCase: TestCase, index: number) =>
                  _testCase.title
                }
                small={true}
                zebra={true}
              />
            </CardBody>
          </Card>
        </Col>
        <Col span={18}>
          <Card>
            <CardHeader>
              <Level>
                <h3>Test Steps</h3>
                <div>
                  {parent && (
                    <Fragment>
                      <span style={{ marginRight: 8 }}>Show inherited</span>
                      <Switch
                        checked={showInherited}
                        onChange={() => setShowInherited(!showInherited)}
                      />
                    </Fragment>
                  )}
                </div>
              </Level>
            </CardHeader>
            <CardBody padded={false}>
              <Table
                columnTitles={['#', 'Action', 'Expected']}
                data={[...testCase.steps]}
                renderRow={(testStep: TestStep, index: number) => (
                  <TableRow key={index}>
                    <TableColumn>{index + 1}</TableColumn>
                    <TableColumn key={1}>{testStep.action}</TableColumn>
                    <TableColumn>{testStep.expected}</TableColumn>
                    <TableColumn>
                      <a className="sprova-teststep-edit">Edit</a>
                    </TableColumn>
                  </TableRow>
                )}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(OverviewTab);
