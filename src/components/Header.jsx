import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { SiMusicbrainz } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const currentUser = user;
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='/home'>
            <h3 className='display-3'>
              Itunes Music <SiMusicbrainz /> <br />
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <a
              href='/profile'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {currentUser.userpicture ? (
                <Image
                  src={currentUser.userpicture}
                  roundedCircle
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    display: 'flex',
                    marginBottom: '5px',
                  }}
                  onClick={() => navigate('/profile')}
                />
              ) : (
                <FaUserCircle
                  size={30}
                  style={{ marginBottom: '5px' }}
                  onClick={() => navigate('/profile')}
                />
              )}
              <Navbar.Text style={{ fontSize: '14px' }}>
                {currentUser.username}
              </Navbar.Text>
            </a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
