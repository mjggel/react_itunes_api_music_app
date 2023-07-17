import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { SiMusicbrainz } from 'react-icons/si';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name || !email || !username || !password) {
      setIsUsernameValid(false);
      setIsPasswordValid(false);
      setIsEmailValid(false);
      setIsNameValid(false);
      setErrorMessage('All fields are required.');
      return;
    }

    localStorage.setItem(
      'users',
      JSON.stringify([{ name, email, username, password }])
    );
    navigate('/home');
  };

  const handleNameInput = ({ target }) => {
    const isValid = target.value.length > 2;
    setName(target.value);
    setIsNameValid(isValid);

    if (!target.value) {
      setNameErrorMessage('Name is required.');
    } else if (!isValid) {
      setNameErrorMessage('Invalid name.');
    }
  };

  const handleUsernameInput = ({ target }) => {
    const usernameRegex = /^[a-zA-Z0-9_]{1,15}$/;
    const isValid = usernameRegex.test(target.value);
    const usernameValue = `@${target.value}`;
    setUsername(usernameValue);
    setIsUsernameValid(isValid);

    if (!target.value) {
      setUsernameErrorMessage('Username is required.');
    } else if (!isValid) {
      setUsernameErrorMessage('Invalid username.');
    }
  };

  const handleEmailInput = ({ target }) => {
    const isValid = validate(target.value);
    setEmail(target.value);
    setIsEmailValid(isValid);

    if (!target.value) {
      setEmailErrorMessage('Email is required.');
    } else if (!isValid) {
      setEmailErrorMessage('Invalid email.');
    }
  };

  const handlePasswordInput = ({ target }) => {
    const isValid = target.value.length >= 6;
    setPassword(target.value);
    setIsPasswordValid(isValid);

    if (!target.value) {
      setPasswordErrorMessage('Both password is required.');
    } else if (!isValid) {
      setPasswordErrorMessage('Invalid password.');
    }
  };

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
          <small className='text-muted'>Register</small>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FloatingLabel
          controlId='floatingNameInput'
          label='name'
          className='mb-3'
        >
          <Form.Control
            type='text'
            placeholder='John Doe'
            isInvalid={!isNameValid}
            onChange={handleNameInput}
            onBlur={() => {
              if (!name) {
                setIsNameValid(true);
                setNameErrorMessage('');
              }
            }}
          />
          <Form.Control.Feedback type='invalid'>
            {nameErrorMessage}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
          controlId='floatingUsernameInput'
          label='@username'
          className='mb-3'
        >
          <Form.Control
            type='text'
            placeholder='@johndoe'
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

        <FloatingLabel
          controlId='floatingEmailInput'
          label='email address'
          className='mb-3'
        >
          <Form.Control
            type='text'
            placeholder='email@example.com'
            isInvalid={!isEmailValid}
            onChange={handleEmailInput}
            onBlur={() => {
              if (!email) {
                setIsEmailValid(true);
                setEmailErrorMessage('');
              }
            }}
          />
          <Form.Control.Feedback type='invalid'>
            {emailErrorMessage}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId='floatingPassword' label='Password'>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
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
        <Button onClick={handleLogin}>Register</Button>
      </Modal.Footer>
    </Modal>
  );
}
