import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { SiMusicbrainz } from 'react-icons/si';
import { useLocation, useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { IoHome, IoHomeOutline } from 'react-icons/io5';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const currentUser = user;
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='/home'>
            <h3 className='display-3'>
              <SiMusicbrainz /> Itunes Music
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle />
          {location.pathname !== '/profile' && (
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
                    }}
                    onClick={() => navigate('/profile')}
                  />
                ) : (
                  <FaUserCircle
                    size={30}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                    }}
                    onClick={() => navigate('/profile')}
                  />
                )}

                <Navbar.Text style={{ fontSize: '14px' }}>
                  <span style={{ color: 'white' }}>{currentUser.name}</span>
                  <br />
                  <span>{currentUser.username}</span>
                </Navbar.Text>
              </a>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      <Nav
        justify
        variant='tabs'
        activeKey={location.pathname}
        onSelect={(e) => navigate(e)}
        fill
      >
        <Nav.Item>
          <Nav.Link eventKey='/home' id='home-nav-link'>
            {location.pathname === '/home' ? <IoHome /> : <IoHomeOutline />}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='/favorites' id='favorites-nav-link'>
            {location.pathname === '/favorites' ? (
              <AiFillHeart />
            ) : (
              <AiOutlineHeart />
            )}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
