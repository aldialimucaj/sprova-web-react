import { updateTestCase } from '@/api/testcase.api';
import Card, { CardBody, CardHeader } from '@/components/Card';
import Input from '@/components/Input';
import Level from '@/components/Level';
import Table, { TableColumn, TableRow } from '@/components/Table';
import TextArea from '@/components/TextArea';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { findById, findChildren, resolveInheritance } from '@/utils';
import { Alert, Button, Col, Row, Switch, Tag, Spin } from 'antd';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

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
  const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');
  const [description, setDescription] = useState(testCase.description);

  const [showInherited, setShowInherited] = useState(false);

  const parent = findById(testCases, testCase.parentId);

  const children = findChildren(testCases, match.params.tid);

  const updateDescription = async () => {
    if (description === testCase.description) {
      setIsDescriptionEditable(false);
      return;
    }

    setDescriptionLoading(true);

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
      setDescriptionLoading(false);
    }
  };

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
              <Spin spinning={descriptionLoading}>
                <TextArea
                  disabled={!isDescriptionEditable}
                  extra={
                    isDescriptionEditable ? (
                      <span>
                        <a
                          onClick={updateDescription}
                          style={{ marginRight: 8 }}
                        >
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
                    )
                  }
                  label="Description"
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Description"
                  style={{ marginBottom: 16 }}
                  value={description}
                />
              </Spin>
            </CardBody>
          </Card>

          {testCase!.parentId ? (
            <Card style={{ marginBottom: 24 }}>
              <CardHeader>
                <h4>Inherits From</h4>
              </CardHeader>
              <CardBody padded={false}>
                <Table
                  columnTitles={['Title']}
                  data={children}
                  renderRow={(tc: TestCase, index: number) => (
                    <TableRow
                      key={index}
                      onClick={() =>
                        history.push(
                          `/projects/${match.params.pid}/testcases/${tc._id}`
                        )
                      }
                    >
                      <TableColumn key={0}>{tc.title}</TableColumn>
                    </TableRow>
                  )}
                />
              </CardBody>
            </Card>
          ) : null}

          <Card style={{ marginBottom: 24 }}>
            <CardHeader>
              <Level>
                <h4>Children</h4>
                <span>
                  <Input
                    onChange={() => {}}
                    placeholder="Filter"
                    style={{ width: 250 }}
                    value=""
                  />
                  {/* {query && (
                    <a onClick={resetQuery} style={{ marginLeft: 16 }}>
                      Reset
                    </a>
                  )} */}
                </span>
              </Level>
            </CardHeader>
            <CardBody padded={false}>
              <Table
                columnTitles={['Title']}
                data={children}
                renderRow={(tc: TestCase, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() =>
                      history.push(
                        `/projects/${match.params.pid}/testcases/${tc._id}`
                      )
                    }
                  >
                    <TableColumn key={0}>{tc.title}</TableColumn>
                  </TableRow>
                )}
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
