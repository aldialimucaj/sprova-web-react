import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Spin,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useState } from 'react';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { authenticate, isAuthenticated } from '../../api/auth.api';
import logo from '../../images/sprova.svg';
import './Login.scss';

interface Props extends RouteComponentProps, FormComponentProps {}

const Login: React.FunctionComponent<Props> = ({ form, history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { username, password } = getFieldsValue();

    setIsLoading(true);

    try {
      await authenticate(username, password);
      setIsLoading(false);
      history.push('/projects');
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const hasErrors = (fieldsError: any): boolean => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  return !isAuthenticated() ? (
    <Row className="login-page" type="flex" justify="center">
      <Col span={6} style={{ textAlign: 'center' }}>
        <Card className="login-card">
          <img src={logo} width="64px" style={{ margin: 36 }} />
          <h3 style={{ marginBottom: 24 }}>Sign in to Sprova</h3>
          <Spin spinning={isLoading}>
            {error ? (
              <Alert
                className="form-item"
                type="error"
                message={error}
                closable={true}
                onClose={() => setError('')}
              />
            ) : null}
            <Form
              hideRequiredMark={true}
              layout="vertical"
              onSubmit={handleSubmit}
            >
              <Form.Item label="Username" colon={false}>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Username cannot be empty',
                    },
                  ],
                })(
                  <Input type="text" name="username" placeholder="Username" />
                )}
              </Form.Item>
              <Form.Item label="Password" colon={false}>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Password cannot be empty',
                    },
                  ],
                })(
                  <Input.Password
                    action="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  block={true}
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Spin>
          <Divider>or</Divider>
          <Link to="/signup">Request new account</Link>
        </Card>
      </Col>
    </Row>
  ) : (
    <Redirect to="/projects" />
  );
};

export default withRouter(Form.create({})(Login));
