import { authenticate } from '@/api/auth.api';
import Card, { CardBody } from '@/components/Card';
import Input from '@/components/Input';
import { CURRENT_PROJECT_ID } from '@/contexts/ProjectContext';
import { UserContext } from '@/contexts/UserContext';
import { useFormInput } from '@/hooks/useFormInput';
import logo from '@/images/sprova.svg';
import { Alert, Button, Col, Divider, Row, Spin } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './Login.scss';

const Login: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { user, onLogin } = useContext(UserContext);

  const { value: username, handleChange: handleUsernameChange } = useFormInput(
    ''
  );
  const { value: password, handleChange: handlePasswordChange } = useFormInput(
    ''
  );
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);

    try {
      const _user = await authenticate(username, password);
      onLogin(_user);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    const currentProjectId = localStorage.getItem(CURRENT_PROJECT_ID);
    history.push(`/projects${currentProjectId ? `/${currentProjectId}` : ''}`);
  }

  const isFormValid = () =>
    username && username.length > 0 && password && password.length > 0;

  return (
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
              <Input
                onChange={handleUsernameChange}
                onEnter={handleSubmit}
                placeholder="Username"
                style={{ marginBottom: 24 }}
                value={username}
              />
              <Input
                onChange={handlePasswordChange}
                onEnter={handleSubmit}
                placeholder="Password"
                style={{ marginBottom: 24 }}
                value={password}
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
            <Link to="/signup">Request new account</Link>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
