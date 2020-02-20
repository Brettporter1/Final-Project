import React from 'react';

const UserContext = React.createContext({
  username: '',
  email: '',
  photo: '',
  id: ''
});

export default UserContext;
