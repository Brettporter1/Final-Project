import React, {useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import UserContext from '../../utils/UserContext';
import Axios from 'axios';


const Header = () => {
    const {user, setUser} = useContext(UserContext);
    
    useEffect(() => {
            Axios.get('/api/check-user', { 
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('jwt')}`
                }, 
            })
            .then((res) => {
                console.log(res);
                updateUser(res.data)
                
            })
            .catch((err) => console.log(err))

       
    }, []);
    const updateUser = (data) => {
        setUser({...user, 
            username: data.name,
            email: data.email,
            id: data.id,
        })
    }
    return (
        <header>
            <button className='menu-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M4 11h12v2H4zm0-5h16v2H4zm0 12h7.235v-2H4z" fill="#626262"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>
            </button>
            <Link to={'/'}>
                <h1>
                    PODCHAT
                </h1>
            </Link>
            { user ? (
                <Link className='user-btn'>
                    {user.username}
                </Link>
                ) : (
                    <Link to={'/login'} className='sign-in-btn'>
                        Sign In
                    </Link>
                )
                
            }

        </header>
    )
}

export default Header;