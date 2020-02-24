import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../utils/UserContext';
import Axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const handleUpload = e => {
    e.preventDefault();
    console.log(e);
    const formdata = new FormData();
    formdata.append('file', user.photo);
    Axios.post('/api/image-upload', formdata, {
      headers: {
        'content-type': 'multi-part/formdata'
      }
    });
  };
  return (
    <form id='profile-form' onSubmit={e => handleUpload(e)}>
      <input
        type='text'
        placeholder='username'
        onSubmit={e => setUser({ ...user, username: e.target.value })}
      />
      <input
        type='file'
        id='image-upload'
        accept='png, jpeg'
        onChange={e => setUser({ ...user, photo: e.target.files[0] })}
      />
      <button className='btn big' type='submit'>
        Submit
      </button>
    </form>
  );
}

export default Profile;
