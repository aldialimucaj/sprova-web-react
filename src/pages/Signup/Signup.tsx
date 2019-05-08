import { authenticate, isAuthenticated } from '@/api/auth.api';
import logo from '@/images/sprova.svg';
import { hasFieldErrors } from '@/utils';
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
import React, { Fragment, useState } from 'react';
import Helmet from 'react-helmet';
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import './Signup.scss';

interface Props extends RouteComponentProps, FormComponentProps {}

const Signup: React.FunctionComponent<Props> = ({ form, history }) => {
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

  return !isAuthenticated() ? (
    <Fragment>
      <Helmet>
        <title>Sprova | Sign Up</title>
      </Helmet>
      <Row className="login-page" type="flex" justify="center">
        <Col span={6} style={{ textAlign: 'center' }}>
          <Card className="login-card">
            <img src={logo} width="64px" style={{ margin: 36 }} />
            <h3 style={{ marginBottom: 24 }}>Sign up for Sprova</h3>
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
              <Form layout="vertical" onSubmit={handleSubmit}>
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
                <Form.Item label="Email" colon={false}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Email cannot be empty',
                      },
                    ],
                  })(
                    <Input
                      type="text"
                      name="username"
                      placeholder="hello@sprova.com"
                    />
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
                <Form.Item label="Repeat Password" colon={false}>
                  {getFieldDecorator('passwordRepeat', {
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
                    disabled={hasFieldErrors(getFieldsError())}
                  >
                    Request account
                  </Button>
                </Form.Item>
              </Form>
            </Spin>
            <Divider>or</Divider>
            <Link to="/login">Sign in with existing account</Link>
          </Card>
        </Col>
      </Row>
    </Fragment>
  ) : (
    <Redirect to="/projects" />
  );
};

export default withRouter(Form.create({})(Signup));
