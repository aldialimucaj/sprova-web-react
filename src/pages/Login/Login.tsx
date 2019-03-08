import { Alert, Button, Col, Input, Row, Spin } from 'antd';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import authApi, { DecodedToken } from '../../api/auth.api';
import UserContext from '../../contexts/UserContext';
import logo from '../../images/sprova.svg';
import './Login.scss';

const Login: React.FunctionComponent<{}> = () => {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userContext = useContext(UserContext);
  const {
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUsername,
  } = userContext;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'username': {
        setUsernameValue(value);
        break;
      }
      case 'password': {
        setPasswordValue(value);
        break;
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      login();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    setIsLoading(true);
    authApi
      .authenticate(usernameValue, passwordValue)
      .then(
        (decoded: DecodedToken): void => {
          const { username: usernameNew } = decoded;
          setIsLoading(false);
          setIsAuthenticated(true);
          setUsername(usernameNew);
        }
      )
      .catch(
        (err: string): void => {
          setIsLoading(false);
          setError(err);
        }
      );
  };

  return isAuthenticated ? (
    <Redirect to="/projects" />
  ) : (
    <Row className="login-page" type="flex" justify="center">
      <Col span={6} style={{ textAlign: 'center' }}>
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
            className="form-item"
            type="text"
            name="username"
            value={usernameValue}
            placeholder="Username"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Input
            className="form-item"
            type="password"
            name="password"
            value={passwordValue}
            placeholder="Password"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Button
            className="form-item"
            block={true}
            type="primary"
            disabled={!(usernameValue && passwordValue)}
            onClick={handleSubmit}
          >
            Log in
          </Button>
        </Spin>
      </Col>
    </Row>
  );
};

export default Login;
