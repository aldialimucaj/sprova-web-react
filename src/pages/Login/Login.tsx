import { Alert, Button, Col, Input, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import authApi from '../../api/auth.api';
import logo from '../../images/sprova.png';
import './Login.scss';

const Login: React.FunctionComponent<{}> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authApi.isAuthenticated()
  );
  const [error, setError] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'username': {
        setUsername(value);
        break;
      }
      case 'password': {
        setPassword(value);
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
      .authenticate(username, password)
      .then(
        (): void => {
          setIsLoading(false);
          setIsAuthenticated(true);
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
    <Redirect to="" />
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
            placeholder="Username"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Input
            className="form-item"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Button
            className="form-item"
            block={true}
            type="primary"
            disabled={!(username && password)}
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
