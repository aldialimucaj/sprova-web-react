import { updateTestCase } from '@/api/testcase.api';
import CardList from '@/components/CardList';
import Level from '@/components/Level';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { findById, findChildren, resolveInheritance } from '@/utils';
import { Alert, Button, Col, Divider, Input, Row, Switch, Tag } from 'antd';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import CardTable from '@/components/CardTable';
import Card from '@/components/Card';

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
          <Card
            style={{ marginBottom: 24 }}
            title="Description"
            actions={[
              isDescriptionEditable ? (
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
              ),
            ]}
          >
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
          </Card>
        </Col>
        <Col span={12}>
          <CardTable
            columnTitles={['Title']}
            data={children}
            style={{ marginBottom: 24 }}
            title="Children"
            renderRow={(tc: TestCase) => [<td key={0}>{tc.title}</td>]}
            onRowClick={(tc: TestCase) =>
              history.push(`/projects/${match.params.pid}/testcases/${tc._id}`)
            }
          />
        </Col>
      </Row>

      {parent && showInherited ? (
        <CardList
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
      <CardTable
        actions={[
          parent && (
            <Fragment>
              <span style={{ marginRight: 8 }}>Show inherited</span>
              <Switch
                checked={showInherited}
                onChange={() => setShowInherited(!showInherited)}
              />
            </Fragment>
          ),
        ]}
        title="Test Steps"
        columnTitles={['#', 'Action', 'Expected']}
        data={testCase.steps}
        renderRow={(testStep: TestStep, index: number) => [
          <td key={0}>{index + 1}</td>,
          <td key={1}>{testStep.action}</td>,
          <td key={2}>{testStep.expected}</td>,
          <td key={3}>
            <a className="sprova-teststep-edit">Edit</a>
          </td>,
        ]}
        style={{ marginBottom: 24 }}
      />
    </Fragment>
  );
};

export default withRouter(OverviewTab);
