import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { BiSearch } from 'react-icons/bi';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { IoHome, IoHomeOutline } from 'react-icons/io5';
import { RiAlbumLine, RiAlbumFill } from 'react-icons/ri';
import { IoAlbums, IoAlbumsOutline } from 'react-icons/io5';
import Container from 'react-bootstrap/Container';

export default function HomePage() {
  const [tab, setTab] = useState('albums');
  const [search, setSearch] = useState('');
  const [showTabs, setShowTabs] = useState(false);

  const handleSearchInput = ({ target }) => {
    setSearch(target.event);
  };

  const handleSearchButon = (e) => {
    e.preventDefault();
    setShowTabs(true);
    console.log('ok');
  };

  return (
    <div className='position-relative'>
      <Container className='position-relative py-2 px-4'>
        <FloatingLabel
          controlId='floatinSearchInput'
          label={`Searching in ${tab}`}
        >
          <Form.Control
            type='text'
            className='shadow p-3 mb-5 bg-body-tertiary rounded'
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
              zIndex: '1',
              borderColor: 'transparent',
              boxShadow: 'none',
            }}
            onClick={handleSearchButon}
          >
            <BiSearch />
          </Button>
        </FloatingLabel>
      </Container>
      <hr />
      <Tabs
        id='controlled-homepage-tab'
        activeKey={tab}
        onSelect={(e) => setTab(e)}
        className='mb-3'
        fill
      >
        <Tab
          eventKey='all'
          title={tab === 'all' ? <IoHome /> : <IoHomeOutline />}
        >
          {showTabs ? (
            <h1>PLACEHOLDER</h1>
          ) : (
            <h1 className='h1'>Your search result will appear here</h1>
          )}
        </Tab>
        <Tab
          eventKey='albums'
          title={tab === 'albums' ? <IoAlbums /> : <IoAlbumsOutline />}
        >
          {showTabs ? (
            <h1>PLACEHOLDER</h1>
          ) : (
            <h1 className='h1'>Your search result will appear here</h1>
          )}
        </Tab>
        <Tab
          eventKey='songs'
          title={tab === 'songs' ? <RiAlbumFill /> : <RiAlbumLine />}
        >
          {showTabs ? (
            <h1>PLACEHOLDER</h1>
          ) : (
            <h1 className='h1'>Your search result will appear here</h1>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
