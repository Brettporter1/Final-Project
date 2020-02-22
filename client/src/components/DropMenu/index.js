import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../utils/UserContext';

const DropMenu = props => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  };
  useEffect(() => {
    console.log(user, props.openMenu);
  }, []);
  return (
    <nav className='drop-menu'>
      <ul>
        <li>
          <img src={user.photo} />
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
          <NavLink to='/login' onClick={() => handleLogout()}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default DropMenu;
