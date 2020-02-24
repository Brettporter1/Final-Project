import React, { useEffect, useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../utils/UserContext';
import DropMenu from '../DropMenu';
import Backdrop from '../BackDrop';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(state => !state);
    if (!openMenu) {
      gsap.to('#start', 0.4, { morphSVG: '#end' });
    } else {
      gsap.to('#start', 0.4, { morphSVG: '#start' });
    }
  };

  useEffect(() => {
    user.checkUser();
  }, []);

  return (
    <Fragment>
      {openMenu ? <Backdrop onClick={() => handleMenu()} /> : null}
      {openMenu && <DropMenu onClick={() => handleMenu()} />}
      <header>
        <button className='menu-btn' onClick={() => handleMenu()}>
          <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            viewBox='0 0 24 24'
          >
            <g>
              <polygon
                id='end'
                className='st0'
                points='18.6,6.8 17.1,5.3 12,10.5 6.8,5.3 5.3,6.8 10.5,11.9 5.3,17.1 6.8,18.6 12,13.4 17.1,18.6 18.6,17.1 13.4,11.9'
              />
            </g>
            <g>
              <path
                id='start'
                className='st0'
                d='M3.2,11h13v2.2h-13V11z M3.2,5.5h17.4v2.2H3.2V5.5z M3.2,18.6h7.9v-2.2H3.2V18.6z'
              />
            </g>
          </svg>
        </button>
        <Link to={'/'}>
          <h1>PODCHAT</h1>
        </Link>
        {user.id !== '' ? (
          <Link className='user-btn'>{user.username}</Link>
        ) : (
          <Link to={'/login'} className='sign-in-btn'>
            Sign In
          </Link>
        )}
      </header>
    </Fragment>
  );
};

export default Header;
