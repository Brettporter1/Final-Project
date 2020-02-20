import React from 'react';
import { NavLink } from 'react-router-dom';

const dropMenu = () => {
  return (
    <nav className='drop-menu'>
      <ul>
        <li>
          <NavLink to='/uid/profile'>Update Profile</NavLink>
        </li>
        <li>
          <NavLink to='/uid/favorites'>Favorites</NavLink>
        </li>
        <li>
          <NavLink to='/uid/comments'>Recent Comments</NavLink>
        </li>
        <li>
          <NavLink to='/login'>Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default dropMenu;
