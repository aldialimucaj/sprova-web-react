import { updateTestCase } from '@/api/testcase.api';
import CardList from '@/components/CardList';
import Level from '@/components/Level';
import { TestCase } from '@/models/TestCase';
import { TestStep } from '@/models/TestStep';
import { findById, findChildren, resolveInheritance } from '@/utils';
import { Alert, Button, Col, Divider, Input, Row, Switch, Tag } from 'antd';
import React, { Fragment, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';
import { Link } from 'react-router-dom';

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
    <Row gutter={24}>
      <Col span={16}>
        <Level style={{ marginBottom: 8 }}>
          <h3>Test Steps</h3>
          {parent && (
            <Fragment>
              <span style={{ marginRight: 8 }}>Show inherited</span>
              <Switch
                checked={showInherited}
                onChange={() => setShowInherited(!showInherited)}
              />
            </Fragment>
          )}
        </Level>
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
        <CardList
          small={true}
          data={testCase.steps}
          renderItem={(testStep: TestStep, index: number) => (
            <Level>
              <div>
                <strong style={{ marginRight: 8 }}>{index + 1}.</strong>
                <strong>{testStep.action}</strong>
                <div>{testStep.expected}</div>
              </div>
              <a className="sprova-teststep-edit">Edit</a>
            </Level>
          )}
        />
      </Col>
      <Col span={8}>
        <Level style={{ marginBottom: 8 }}>
          <h3>Description</h3>
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
        </Level>
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
        <Divider />

        {parent && (
          <Fragment>
            <h3>Inherits from</h3>
            <p>
              <Link
                to={`/projects/${match.params.pid}/testcases/${parent._id}`}
              >
                {parent.title}
              </Link>
            </p>
            <Divider />
          </Fragment>
        )}

        <CardList
          zebra={true}
          small={true}
          title={<div>Children ({children.length})</div>}
          data={children}
          renderItem={(tc: TestCase) => <div>{tc.title}</div>}
          onItemClick={(tc: TestCase) =>
            history.push(`/projects/${match.params.pid}/testcases/${tc._id}`)
          }
        />
      </Col>
    </Row>
  );
};

export default withRouter(OverviewTab);
