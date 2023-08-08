import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { BiSearch } from 'react-icons/bi';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { RiAlbumLine, RiAlbumFill } from 'react-icons/ri';
import { IoAlbums, IoAlbumsOutline } from 'react-icons/io5';
import Container from 'react-bootstrap/Container';
import searchAlbumFunction from '../service/SearchAlbumFunction';
import searchSongFunction from '../service/SearchSongFunction';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function HomePage() {
  const [tab, setTab] = useState('albums');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [showTabs, setShowTabs] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchInput = ({ target }) => {
    setSearch(target.value);
  };

  const handleSearchButon = async (e) => {
    e.preventDefault();
    setShowTabs(true);
    setLoading(true);
    const albumsResult = await searchAlbumFunction(search);
    const songsResult = await searchSongFunction(search);
    setLoading(false);
    setSearchResult({ albumsResult, songsResult });
  };
  return (
    <div>
      <Container className='position-relative py-5 px-4'>
        <FloatingLabel
          controlId='floatinSearchInput'
          label={`Searching in ${tab}`}
        >
          <Form.Control
            type='text'
            className='shadow bg-body-tertiary rounded'
            value={search}
            onChange={handleSearchInput}
            autoFocus={true}
          />
          <Button
            id='searchButton'
            variant='outline-secondary'
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              borderColor: 'transparent',
            }}
            onClick={handleSearchButon}
          >
            <BiSearch />
          </Button>
        </FloatingLabel>
      </Container>
      <Tabs
        id='controlled-homepage-tab'
        activeKey={tab}
        onSelect={(e) => setTab(e)}
        className='mb-3'
        fill
      >
        <Tab
          eventKey='albums'
          title={tab === 'albums' ? <IoAlbums /> : <IoAlbumsOutline />}
        >
          <Container>
            {loading && <Loading />}
            {showTabs ? (
              searchResult.albumsResult &&
              searchResult.albumsResult.length > 0 ? (
                <Row xs={2} md={5} className='g-5 px-3 py-5'>
                  {searchResult.albumsResult.map((album) => (
                    <Col key={album.collectionId}>
                      <Link to={`/album/${album.collectionId}`}>
                        <Card
                          className='shadow bg-body-tertiary rounded'
                          style={{ height: '100%' }}
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
                      </Link>
                    </Col>
                  ))}
                </Row>
              ) : (
                <h2 className='h2'>Result not found</h2>
              )
            ) : (
              <h1 className='h1'>Your search result will appear here</h1>
            )}
          </Container>
        </Tab>

        <Tab
          eventKey='songs'
          title={tab === 'songs' ? <RiAlbumFill /> : <RiAlbumLine />}
        >
          <Container>
            {loading && <Loading />}
            {showTabs ? (
              searchResult.songsResult &&
              searchResult.songsResult.length > 0 ? (
                <Row md={3} className='g-4 px-3 py-5'>
                  {searchResult.songsResult.map((song) => (
                    <Col key={song.trackId}>
                      <Card className='shadow bg-body-tertiary rounded'>
                        <Card.Body>
                          <Card.Title>{song.trackName}</Card.Title>
                          <Card.Text>{song.artistName}</Card.Text>
                          <Card.Text>{song.primaryGenreName}</Card.Text>
                          <Card.Text>{song.kind}</Card.Text>
                          <Card.Text>{`From: ${song.collectionName} Album`}</Card.Text>
                          <audio
                            src={song.previewUrl}
                            controls
                            style={{
                              width: '100%',
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <h2 className='h2'>Result not found</h2>
              )
            ) : (
              <h1 className='h1'>Your search result will appear here</h1>
            )}
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
}
