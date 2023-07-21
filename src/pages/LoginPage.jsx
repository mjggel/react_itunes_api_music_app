import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { SiMusicbrainz } from 'react-icons/si';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!password || !username) {
      setIsUsernameValid(false);
      setIsPasswordValid(false);
      setErrorMessage('Both password and username are required.');
      setUsername('');
      setPassword('');
      return;
    }

    if (user.username !== username || user.password !== password) {
      setIsUsernameValid(false);
      setIsPasswordValid(false);
      setErrorMessage('Username or password are incorrect.');
      setUsername('');
      setPassword('');
      return;
    }

    setUsername('');
    setPassword('');
    navigate('/home');
  };

  const handleUsernameInput = ({ target }) => {
    const usernameRegex = /^@[a-zA-Z0-9_.]{1,15}$/;
    const isValid = usernameRegex.test(target.value);
    const usernameValue = target.value;
    setUsername(usernameValue);
    setIsUsernameValid(isValid);
    if (!isValid) {
      setUsernameErrorMessage('Invalid username.');
      return;
    }
  };

  const handlePasswordInput = ({ target }) => {
    const isValid = target.value.length >= 6;
    setPassword(target.value);
    setIsPasswordValid(isValid);

    if (!isValid) {
      setPasswordErrorMessage('Invalid password.');
      return;
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/register');
      return;
    }
  }, []);

  return (
    <Modal
      show={true}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter' className='text-center'>
          <h3 className='display-3'>
            Itunes Music <SiMusicbrainz /> <br />
          </h3>
          <small className='text-muted'>Login</small>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FloatingLabel
          controlId='floatingInput'
          label='@username'
          className='mb-3'
          autoFocus
        >
          <Form.Control
            type='text'
            value={username}
            isInvalid={!isUsernameValid}
            onChange={handleUsernameInput}
            onBlur={() => {
              if (!username) {
                setIsUsernameValid(true);
                setUsernameErrorMessage('');
              }
            }}
          />
          <Form.Control.Feedback type='invalid'>
            {usernameErrorMessage}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId='floatingPassword' label='Password'>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={password}
            placeholder='Password'
            isInvalid={!isPasswordValid}
            onChange={handlePasswordInput}
            onBlur={() => {
              if (!password) {
                setIsPasswordValid(true);
                setPasswordErrorMessage('');
              }
            }}
          />
          <Button
            variant='outline-secondary'
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              zIndex: '1',
              borderColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
          </Button>

          <Form.Control.Feedback type='invalid'>
            {passwordErrorMessage}
          </Form.Control.Feedback>
        </FloatingLabel>
        {errorMessage.length > 0 && !isUsernameValid && !isPasswordValid ? (
          <span className='text-danger'>
            {errorMessage} {'\u{1F440}'}
          </span>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate('/register')}>Register</Button>
        <Button onClick={handleLogin}>Log in</Button>
      </Modal.Footer>
    </Modal>
  );
}
