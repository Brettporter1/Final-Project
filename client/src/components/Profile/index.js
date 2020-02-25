import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../utils/UserContext';
import Axios from 'axios';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const handleUpload = async e => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();
    formData.append('file', user.photo);
    formData.append('upload_preset', 'ed5b8zfa');
    const response = await Axios.post('/api/image-upload', formData);
    console.log(`this is formData: ${response}`);
  };
  return (
    <form
      id='profile-form'
      onSubmit={e => handleUpload(e)}
      enctype='multipart/form-data'
    >
      <input
        type='text'
        placeholder='username'
        onSubmit={e => setUser({ ...user, username: e.target.value })}
      />
      <input
        type='file'
        id='image-upload'
        accept='png, jpeg'
        name='file'
        onChange={e => setUser({ ...user, photo: e.target.files[0] })}
      />
      <button className='btn big' type='submit'>
        Submit
      </button>
    </form>
  );
}

export default Profile;
