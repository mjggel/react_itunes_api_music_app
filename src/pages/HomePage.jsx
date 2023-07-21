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

export default function HomePage() {
  const [tab, setTab] = useState('albums');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [showTabs, setShowTabs] = useState(false);

  const handleSearchInput = ({ target }) => {
    setSearch(target.value);
  };

  const handleSearchButon = async (e) => {
    e.preventDefault();
    setShowTabs(true);
    const albumsResult = await searchAlbumFunction(search);
    console.log('albumsResult', albumsResult);
    const songsResult = await searchSongFunction(search);
    console.log('songsResult', songsResult);
    setSearchResult({ albumsResult, songsResult });
  };
  console.log('searchResult', searchResult);
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
            placeholder='search...'
            onChange={handleSearchInput}
            autoFocus={true}
          />
          <Button
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
          {showTabs ? (
            searchResult.albumsResult &&
            searchResult.albumsResult.length > 0 ? (
              <Row md={5} className='g-5 px-3 py-5'>
                {searchResult.albumsResult.map((album, i) => (
                  <Col key={i}>
                    <Card>
                      <Card.Img
                        variant='top'
                        src={album.artworkUrl100}
                        style={{ objectFit: 'cover' }}
                      />
                      <Card.Body>
                        <Card.Title>{album.collectionName}</Card.Title>
                        <Card.Text>{album.artistName}</Card.Text>
                        <Card.Text>{album.primaryGenreName}</Card.Text>
                        <Card.Text>{album.collectionType}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <h2 className='h2'>No result Found</h2>
            )
          ) : (
            <h1 className='h1'>Your search result will appear here</h1>
          )}
        </Tab>

        <Tab
          eventKey='songs'
          title={tab === 'songs' ? <RiAlbumFill /> : <RiAlbumLine />}
        >
          {showTabs ? (
            searchResult.songsResult && searchResult.songsResult.length > 0 ? (
              <Row md={3} className='g-5 px-3 py-5'>
                {searchResult.songsResult.map((song, i) => (
                  <Col key={i}>
                    <Card>
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
              <h2 className='h2'>No result Found</h2>
            )
          ) : (
            <h1 className='h1'>Your search result will appear here</h1>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
