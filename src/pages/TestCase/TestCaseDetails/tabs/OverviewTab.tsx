import { updateTestCase } from '@/api/testcase.api';
import CardList from '@/components/CardList';
import Level from '@/components/Level';
import { TestCase } from '@/models/TestCase';
import { findChildren } from '@/utils';
import { Alert, Button, Col, Divider, Input, Row } from 'antd';
import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './OverviewTab.scss';

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
      <Col span={16}>Overview</Col>
      <Col span={8}>
        <Level
          style={{ marginBottom: 8 }}
          left={<h3>Description</h3>}
          right={
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
            )
          }
        />
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
