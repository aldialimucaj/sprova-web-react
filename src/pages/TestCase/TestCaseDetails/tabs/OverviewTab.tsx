import { updateTestCase } from '@/api/testcase.api';
import Card, { CardBody, CardHeader } from '@/components/Card';
import Level from '@/components/Level';
import List from '@/components/List';
import Table from '@/components/Table';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { findById, findChildren, resolveInheritance } from '@/utils';
import { Alert, Button, Col, Input, Row, Switch, Tag } from 'antd';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

const TextArea = Input.TextArea;

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
        <Col span={12}>
          <Card style={{ marginBottom: 24 }}>
            <CardHeader>
              <Level>
                <h3>Description</h3>
                <div>
                  {isDescriptionEditable ? (
                    <a
                      onClick={() => {
                        setIsDescriptionEditable(false);
                        setDescription(testCase.description);
                      }}
                    >
                      Cancel
                    </a>
                  ) : (
                    <a onClick={() => setIsDescriptionEditable(true)}>Edit</a>
                  )}
                </div>
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
              {isDescriptionEditable ? (
                <div>
                  <TextArea
                    autosize={true}
                    placeholder="Description"
                    style={{ marginBottom: 16 }}
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDescription(event.target.value)
                    }
                  />
                  <Button
                    loading={descriptionLoading}
                    type="primary"
                    onClick={updateDescription}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <p>{testCase.description || 'No Description.'}</p>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ marginBottom: 24 }}>
            <CardHeader>
              <h3>Children</h3>
            </CardHeader>
            <CardBody padded={false}>
              <Table
                columnTitles={['Title']}
                data={children}
                renderRow={(tc: TestCase) => [<td key={0}>{tc.title}</td>]}
                onRowClick={(tc: TestCase) =>
                  history.push(
                    `/projects/${match.params.pid}/testcases/${tc._id}`
                  )
                }
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {parent && showInherited ? (
        <List
          style={{ marginBottom: 16 }}
          small={true}
          data={resolveInheritance(parent, testCases, true)}
          renderItem={([testStep, mappedParent]: [TestStep, TestCase]) => (
            <Level>
              <div>
                <strong>{testStep.action}</strong>
                <div>{testStep.expected}</div>
              </div>
              <Tag style={{ pointerEvents: 'none', margin: 0 }}>
                {mappedParent.title}
              </Tag>
            </Level>
          )}
        />
      ) : null}
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
            renderRow={(testStep: TestStep, index: number) => [
              <td key={0}>{index + 1}</td>,
              <td key={1}>{testStep.action}</td>,
              <td key={2}>{testStep.expected}</td>,
              <td key={3}>
                <a className="sprova-teststep-edit">Edit</a>
              </td>,
            ]}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default withRouter(OverviewTab);
