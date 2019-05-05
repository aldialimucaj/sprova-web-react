import { authenticate, isAuthenticated } from '@/api/auth.api';
import Card, { CardBody } from '@/components/Card';
import { UserContext } from '@/contexts/UserContext';
import logo from '@/images/sprova.svg';
import { hasFieldErrors } from '@/utils';
import { Alert, Button, Col, Divider, Form, Input, Row, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { useContext, useState } from 'react';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import './Login.scss';

const Login: React.FunctionComponent<FormComponentProps> = ({ form }) => {
  const { user, onLogin } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { getFieldDecorator, getFieldsError, getFieldsValue } = form;

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { username, password } = getFieldsValue();

    setIsLoading(true);

    try {
      const _user = await authenticate(username, password);
      setIsLoading(false);
      onLogin(_user);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return user ? (
    <Redirect to="/projects" />
  ) : (
    <Row className="login-page" type="flex" justify="center">
      <Col span={6} style={{ textAlign: 'center' }}>
        <Card>
          <CardBody>
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
                      action="click"
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    id="loginButton"
                    block={true}
                    type="primary"
                    htmlType="submit"
                    disabled={hasFieldErrors(getFieldsError())}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
            <Divider>or</Divider>
            <Link to="/signup">Request new account</Link>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Form.create({})(Login);
