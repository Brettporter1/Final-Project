import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import UserContext from '../../utils/UserContext';


const DropMenu = props => {
  const { user, setUser } = useContext(UserContext);
  const [rePath, setRePath] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setUser({...user,
      username: '',
      email: '',
      id: '',
      photo: '',});
      props.setOpen(false)
  };
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <nav className='drop-menu'>
      <ul>
        <li>
          <img className='profile-img' src={user.photo} />
          <h3 className='drop-name'>{user.username}</h3>
        </li>
        <li>
          <NavLink to='/profile' onClick={props.onClick}>
            Update Profile
          </NavLink>
        </li>
        <li>
          <NavLink to='/uid/favorites' onClick={props.onClick}>
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' onClick={() => {props.handleMenu(); handleLogout();}}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DropMenu;
