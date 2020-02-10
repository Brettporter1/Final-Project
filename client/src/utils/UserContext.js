import React from 'react'

const UserContext = React.createContext({
    username: '',
    email: '',
    id: ''
});

export default UserContext;