import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';

export default function FavoritesPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [favorites, setFavorites] = useState(user.favorites);

  const handleDeleteButton = (song) => {
    let updatedFavorites = favorites.filter((e) => e.trackId !== song.trackId);
    localStorage.setItem(
      'user',
      JSON.stringify({
        ...user,
        favorites: updatedFavorites,
      })
    );
    setFavorites(updatedFavorites);
  };

  return (
    <Container className='py-5'>
      <Row>
        {favorites && favorites.length > 0 ? (
          favorites.map((song) => (
            <Col key={song.trackId} xs={12} md={6} lg={4} xl={3}>
              <Card className='shadow bg-body-tertiary rounded p-6'>
                <Card.Img
                  variant='top'
                  src={song.artworkUrl100}
                  style={{ objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{song.trackName}</Card.Title>
                  <Card.Text>{song.artistName}</Card.Text>
                  <Card.Text>{song.primaryGenreName}</Card.Text>
                  <audio
                    src={song.previewUrl}
                    controls
                    style={{
                      width: '100%',
                    }}
                  />
                  <Button
                    variant='outline-secondary'
                    onClick={() => handleDeleteButton(song)}
                    style={{
                      borderColor: 'transparent',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <AiFillHeart size={24} style={{ color: 'red' }} />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h2 className='h2'>You have no favorites yet</h2>
        )}
      </Row>
    </Container>
  );
}
