import { postCycle } from '@/api/cycle.api';
import Card, { CardBody } from '@/components/Card';
import { FormButton, FormInput, FormTextArea } from '@/components/form';
import { PageContent, PageHeader } from '@/components/Layout';
import Level from '@/components/Level';
import Modal from '@/components/Modal';
import { CycleContext } from '@/contexts/CycleContext';
import { ProjectContext } from '@/contexts/ProjectContext';
import { useFormInput } from '@/hooks/useFormInput';
import { useFormTextArea } from '@/hooks/useFormTextArea';
import { Cycle } from '@/models/Cycle';
import {
  Button,
  Col,
  Divider,
  Form,
  Icon,
  notification,
  Row,
  Spin,
  Tag,
} from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Params {
  pid: string;
}

const ProjectDetails: React.FunctionComponent<RouteComponentProps<Params>> = ({
  match,
  history,
}) => {
  const { currentProject } = useContext(ProjectContext);
  const { cycles, isCyclesLoading } = useContext(CycleContext);

  const { value: cycleTitle, setValue: setCycleTitle } = useFormInput('');
  const {
    value: cycleDescription,
    setValue: setCycleDescription,
  } = useFormTextArea('');
  const [isCycleModalOpen, setIsCycleModalOpen] = useState(false);
  const [isCycleSubmitLoading, setIsCycleSubmitLoading] = useState(false);

  const handleCycleSubmit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const cycleNew: Partial<Cycle> = {
      title: cycleTitle,
      description: cycleDescription,
      projectId: currentProject!._id,
    };

    setIsCycleSubmitLoading(true);

    try {
      const cycle = await postCycle(cycleNew);
      cycles!.push(cycle);
      setIsCycleModalOpen(false);
      notification.success({
        placement: 'bottomRight',
        message: `${cycleTitle} created`,
        description: `Cycle created with ID ${cycle._id}`,
      });
    } catch (error) {
      notification.error({
        placement: 'bottomRight',
        message: 'Failed to create cycle',
        description: error,
      });
    } finally {
      setIsCycleSubmitLoading(false);
    }
  };

  return currentProject ? (
    <Fragment>
      <PageHeader title={currentProject!.title} subTitle="Overview" />
      <PageContent>
        <Level align="bottom">
          <div>
            <h3 style={{ display: 'inline-block', marginRight: 8 }}>Cycles</h3>
            <Icon style={{ cursor: 'pointer' }} type="info-circle" />
          </div>
          <Button onClick={() => setIsCycleModalOpen(true)} type="primary">
            New
          </Button>
        </Level>
        <Divider />
        {!isCyclesLoading && cycles ? (
          <Row gutter={24} style={{ marginBottom: 24 }}>
            {cycles.map((cycle: Cycle) => (
              <Col span={8} key={cycle._id} style={{ marginBottom: 24 }}>
                <Card
                  status="success"
                  onClick={() =>
                    history.push(
                      `/projects/${match.params.pid}/cycles/${cycle._id}`
                    )
                  }
                >
                  <CardBody>
                    <h3>{cycle.title}</h3>
                    <p style={{ marginTop: 8, marginBottom: 16 }}>
                      {cycle.description || 'No description.'}
                    </p>
                    <Tag>Released</Tag>
                    <Tag>Dev</Tag>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Spin />
        )}

        <Modal
          title="Create New Cycle"
          open={isCycleModalOpen}
          onClose={() => setIsCycleModalOpen(false)}
        >
          <Form layout="vertical" onSubmit={handleCycleSubmit}>
            <FormInput
              label="Title"
              value={cycleTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setCycleTitle(event.currentTarget.value)
              }
              placeholder="Cycle"
              required={true}
            />
            <FormTextArea
              value={cycleDescription}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCycleDescription(event.currentTarget.value)
              }
              label="Description"
              placeholder="Description"
              minLength={3}
            />
            <FormButton
              style={{ marginBottom: 0, paddingBottom: 0 }}
              type="primary"
              loading={isCycleSubmitLoading}
              disabled={!cycleTitle}
            >
              Create Cycle
            </FormButton>
          </Form>
        </Modal>
      </PageContent>
    </Fragment>
  ) : null;
};

export default withRouter(ProjectDetails);
