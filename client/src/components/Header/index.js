import React from 'react'

const Header = () => {
    return (
        <header>
            <button className='menu-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
            </button>
            <h1>
                PODCHAT
            </h1>
            <button className='sign-in-btn'>
                Sign In
            </button>

        </header>
    )
}

export default Header;