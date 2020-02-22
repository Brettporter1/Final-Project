import React from 'react';

const UserContext = React.createContext({
  username: '',
  email: '',
  photo: '',
  id: '',
  favorites: []
});

export default UserContext;
