import { authenticate, signup } from '@/api/auth.api';
import Card, { CardBody } from '@/components/Card';
import Input from '@/components/Input';
import { CURRENT_PROJECT_ID } from '@/contexts/ProjectContext';
import { UserContext } from '@/contexts/UserContext';
import { useFormInput } from '@/hooks/useFormInput';
import logo from '@/images/sprova.svg';
import { Alert, Button, Col, Divider, Form, Row, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './Signup.scss';

interface Props extends RouteComponentProps, FormComponentProps {}

const Signup: React.FunctionComponent<Props> = ({ form, history }) => {
  const { user, onLogin } = useContext(UserContext);

  const { value: username, handleChange: handleUsernameChange } = useFormInput(
    ''
  );
  const { value: email, handleChange: handleEmailChange } = useFormInput('');
  const { value: password, handleChange: handlePasswordChange } = useFormInput(
    ''
  );
  const {
    value: passwordRepeat,
    handleChange: handlePasswordRepeatChange,
  } = useFormInput('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    setError('');
    setIsLoading(true);
    setSuccess('');

    try {
      const ok = await signup(username, password);
      setIsLoading(false);
      setSuccess('Signup request sent');
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const isFormValid = () =>
    username &&
    email &&
    password &&
    passwordRepeat &&
    password === passwordRepeat;

  useEffect(() => {
    if (user) {
      const currentProjectId = localStorage.getItem(CURRENT_PROJECT_ID);
      history.push(
        `/projects${currentProjectId ? `/${currentProjectId}` : ''}`
      );
    }
  }, [user]);

  return (
    <Fragment>
      <Helmet>
        <title>Sprova | Sign Up</title>
      </Helmet>
      <Row className="login-page" type="flex" justify="center">
        <Col span={6} style={{ textAlign: 'center' }}>
          <Card>
            <CardBody>
              <img src={logo} width="64px" style={{ margin: 36 }} />
              <h3 style={{ marginBottom: 24 }}>Sign up for Sprova</h3>
              <Spin spinning={isLoading}>
                {success ? (
                  <Alert
                    closable={true}
                    message={success}
                    onClose={() => setSuccess('')}
                    style={{ marginBottom: 24 }}
                    type="success"
                  />
                ) : null}
                {error ? (
                  <Alert
                    closable={true}
                    message={error}
                    onClose={() => setError('')}
                    style={{ marginBottom: 24 }}
                    type="error"
                  />
                ) : null}
                <Input
                  onChange={handleUsernameChange}
                  onEnter={handleSubmit}
                  placeholder="Username"
                  style={{ marginBottom: 24 }}
                  value={username}
                />
                <Input
                  onChange={handleEmailChange}
                  onEnter={handleSubmit}
                  placeholder="Email"
                  style={{ marginBottom: 24 }}
                  type="email"
                  value={email}
                />
                <Input
                  onChange={handlePasswordChange}
                  onEnter={handleSubmit}
                  placeholder="Password"
                  style={{ marginBottom: 24 }}
                  type="password"
                  value={password}
                />
                <Input
                  onChange={handlePasswordRepeatChange}
                  onEnter={handleSubmit}
                  placeholder="Repeat Password"
                  style={{ marginBottom: 24 }}
                  type="password"
                  value={passwordRepeat}
                />
                <Button
                  block={true}
                  disabled={!isFormValid()}
                  id="loginButton"
                  onClick={handleSubmit}
                  style={{ marginBottom: 16 }}
                  type="primary"
                >
                  Login
                </Button>
              </Spin>
              <Divider>or</Divider>
              <Link to="/login">Sign in with existing account</Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default withRouter(Form.create({})(Signup));
