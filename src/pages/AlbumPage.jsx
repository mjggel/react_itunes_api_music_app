import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import {
  getAlbumFunction,
  getSongsFunction,
} from '../service/GetAlbum&SongsFunction';
import Button from 'react-bootstrap/Button';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Loading from '../components/Loading';

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState([]);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleButtonClick = (song) => {
    let updatedFavorites;
    if (favorites.some((e) => e.trackId === song.trackId)) {
      updatedFavorites = user.favorites.filter(
        (e) => e.trackId !== song.trackId
      );
    } else {
      updatedFavorites = [...user.favorites, song];
    }
    setFavorites(updatedFavorites);
    user.favorites = updatedFavorites;
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    getAlbumFunction(id).then((allSongs) => setAlbum(allSongs));
    getSongsFunction(id).then((allSongs) => setAlbumSongs(allSongs));
    setLoading(false);
  }, []);

  return (
    <Container className='py-5'>
      {loading && <Loading />}
      <Row>
        <Col>
          {album &&
            album.length > 0 &&
            album.map((album) => (
              <Card
                className='shadow bg-body-tertiary rounded p-6'
                style={{ borderColor: 'transparent', width: '50%' }}
                key={id}
              >
                <Card.Img
                  variant='top'
                  src={album.artworkUrl100}
                  style={{ objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{album.collectionName}</Card.Title>
                  <Card.Text>{album.artistName}</Card.Text>
                  <Card.Text>{album.primaryGenreName}</Card.Text>
                </Card.Body>
              </Card>
            ))}
        </Col>
        <Col className='overflow-auto' style={{ maxHeight: '55vh' }}>
          {albumSongs &&
            albumSongs.length > 0 &&
            albumSongs.slice(1).map((song) => (
              <Container key={song.trackId} className='my-3'>
                <Row className='align-items-center'>
                  <Col>
                    <strong>{song.trackName}</strong>
                  </Col>
                  <Col className='text-center'>
                    <audio
                      src={song.previewUrl}
                      controls
                      className='shadow bg-body-tertiary rounded audio-player'
                    />
                  </Col>
                  <Col className='text-center'>
                    <Button
                      variant='outline-secondary'
                      onClick={() => handleButtonClick(song)}
                      style={{
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                      }}
                    >
                      {user.favorites &&
                      user.favorites.some((e) => e.trackId === song.trackId) ? (
                        <AiFillHeart style={{ color: 'red' }} />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </Button>
                  </Col>
                </Row>
                <hr />
              </Container>
            ))}
        </Col>
      </Row>
    </Container>
  );
}
