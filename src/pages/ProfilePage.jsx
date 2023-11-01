import React, { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import { FaRegUserCircle } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { validate } from 'email-validator';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';

export default function ProfilePage() {
  const [userpicture, setUserpicture] = useState('');
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
  const [editProfile, setEditProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const fileInputRef = useRef();

  const handleSaveButton = (e) => {
    e.preventDefault();

    if (!isNameValid || !isEmailValid || !isUsernameValid || !isPasswordValid) {
      setErrorMessage('Invalid fields. \u{1F440}');
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      return;
    }

    localStorage.setItem(
      'user',
      JSON.stringify({
        ...user,
        userpicture: userpicture ? userpicture : user.userpicture,
        name: name ? name : user.name,
        email: email ? email : user.email,
        username: username ? username : user.username,
        password: password ? password : user.password,
      })
    );
    setEditProfile(false);
  };

  const handleUserpictureInput = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => {
      setUserpicture(reader.result);
    };
  };

  const handleNameInput = ({ target }) => {
    const isValid = target.value.length > 2;
    setName(target.value);
    setIsNameValid(isValid);

    if (!target.value) {
      setNameErrorMessage('Name is required.');
      return;
    }
    if (!isValid) {
      setNameErrorMessage('Invalid name.');
      return;
    }
  };

  const handleUsernameInput = ({ target }) => {
    const usernameRegex = /^@[a-zA-Z0-9_.]{1,15}$/;
    const isValid = usernameRegex.test(target.value);
    const usernameValue = target.value;
    setUsername(usernameValue);
    setIsUsernameValid(isValid);

    if (!target.value) {
      setUsernameErrorMessage('Username is required.');
      return;
    }
    if (!isValid) {
      setUsernameErrorMessage('Invalid username.');
      return;
    }
  };

  const handleEmailInput = ({ target }) => {
    const isValid = validate(target.value);
    setEmail(target.value);
    setIsEmailValid(isValid);

    if (!target.value) {
      setEmailErrorMessage('Email is required.');
      return;
    }
    if (!isValid) {
      setEmailErrorMessage('Invalid email.');
      return;
    }
  };

  const handlePasswordInput = ({ target }) => {
    const isValid = target.value.length >= 6;
    setPassword(target.value);
    setIsPasswordValid(isValid);

    if (!target.value) {
      setPasswordErrorMessage('Password is required.');
      return;
    }
    if (!isValid) {
      setPasswordErrorMessage('Password must be at least 6 characters');
      return;
    }
  };

  return (
    <Container
      className='py-5 modal show'
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title
            id='contained-modal-title-vcenter'
            className='text-center'
          >
            <small className='text-muted'>User Profile</small>
          </Modal.Title>
          {editProfile && <CloseButton onClick={() => setEditProfile(false)} />}
        </Modal.Header>

        <Modal.Body>
          <Form>
            {editProfile ? (
              <Container id='editableProfileInfo'>
                <InputGroup className='mb-3' id='editableUserPicture'>
                  <Form.Control
                    type='file'
                    ref={fileInputRef}
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={handleUserpictureInput}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      height: '150px',
                    }}
                  >
                    {!userpicture ? (
                      <FaRegUserCircle
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '130px',
                          cursor: 'pointer',
                        }}
                        onClick={() => fileInputRef.current.click()}
                      />
                    ) : (
                      <Image
                        src={userpicture}
                        roundedCircle
                        style={{
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                        onClick={() => fileInputRef.current.click()}
                      />
                    )}
                    {userpicture && (
                      <CloseButton onClick={() => setUserpicture('')} />
                    )}
                  </div>
                  <span
                    className='text-muted'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    {userpicture
                      ? 'choose another picture'
                      : 'choose a picture'}
                  </span>
                </InputGroup>
                <br />
                <FloatingLabel controlId='floatingNameInput' label='name'>
                  <Form.Control
                    type='text'
                    name='name'
                    value={name}
                    isInvalid={!isNameValid}
                    onChange={handleNameInput}
                    onBlur={() => {
                      if (!name) {
                        setIsNameValid(true);
                        setNameErrorMessage('');
                      }
                    }}
                    autoFocus={true}
                  />

                  <Form.Control.Feedback type='invalid'>
                    {nameErrorMessage}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <br />
                <FloatingLabel
                  controlId='floatingUsernameInput'
                  label='@username'
                >
                  <Form.Control
                    type='text'
                    name='name'
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
                <br />
                <FloatingLabel
                  controlId='floatingEmailInput'
                  label='email address'
                >
                  <Form.Control
                    type='email'
                    name='email'
                    value={email}
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
                <br />
                <FloatingLabel controlId='floatingPassword' label='Password'>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={password}
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
                      borderColor: 'transparent',
                    }}
                  >
                    {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
                  </Button>
                  <Form.Control.Feedback type='invalid'>
                    {passwordErrorMessage}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <br />
                <Button id='saveInfoButton' onClick={handleSaveButton}>
                  Save Changes
                </Button>
                <br />
                {errorMessage.length > 0 ||
                !isNameValid ||
                !isEmailValid ||
                !isUsernameValid ||
                !isPasswordValid ? (
                  <span className='text-danger'>{errorMessage}</span>
                ) : null}
              </Container>
            ) : (
              <Container id='nonEditableProfileInfo'>
                <InputGroup className='mb-3' id='nonEditableUserPicture'>
                  <Form.Control
                    type='file'
                    ref={fileInputRef}
                    accept='image/*'
                    style={{ display: 'none' }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      height: '150px',
                    }}
                  >
                    {!user.userpicture ? (
                      <FaRegUserCircle
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontSize: '130px',
                        }}
                      />
                    ) : (
                      <Image
                        src={user.userpicture}
                        roundedCircle
                        style={{
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                </InputGroup>

                <InputGroup className='mb-3' id='nonEditableUsername'>
                  <InputGroup.Text>@</InputGroup.Text>

                  <Form.Control
                    type='text'
                    name='username'
                    value={user.username}
                    disabled
                  />
                </InputGroup>

                <InputGroup className='mb-3' id='nonEditableName'>
                  <InputGroup.Text>
                    <AiOutlineUser />
                  </InputGroup.Text>

                  <Form.Control
                    type='text'
                    name='name'
                    value={user.name}
                    disabled
                  />
                </InputGroup>

                <InputGroup className='mb-3' id='nonEditableEmail'>
                  <InputGroup.Text>
                    <AiOutlineMail />
                  </InputGroup.Text>

                  <Form.Control
                    type='text'
                    name='email'
                    value={user.email}
                    disabled
                  />
                </InputGroup>
              </Container>
            )}
          </Form>
        </Modal.Body>

        {!editProfile && (
          <Modal.Footer>
            <Button
              variant='primary'
              onClick={() => setEditProfile(true)}
              id='editProfileButton'
            >
              Edit profile info
            </Button>
          </Modal.Footer>
        )}
      </Modal.Dialog>
    </Container>
  );
}
