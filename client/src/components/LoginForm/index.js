import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring'
import axios from 'axios'

const handleLogin = () => {
    
}


const LoginForm = (props) => {

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('/api/register', {
            username: info.username,
            email: info.email,
            password: info.password,
            confirmPassword: info.confirmPassword,
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    
    }
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            // username: info.username,
            email: info.email,
            password: info.password,
            // confirmPassword: info.confirmPassword,
        })
        .then(res => {
            console.log(res);
            localStorage.setItem('jwt', res.data.token);
        })
        .catch(err => console.log(err));
    
    }

    const [info, setInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const transition = useSpring({to: {opacity: 1, transform: 'translateY(0px)'}, from: {opacity: 0, transform: 'translateY(100px)'}});
    return (
        
            props.intent === 'register' ? (
                <animated.form style={transition} action="#" className='login-form' onSubmit={(e) => handleRegister(e)}>
                    <input type="text" onChange={(e) => setInfo({...info, username: e.target.value })} placeholder="USERNAME" required/>
                    <input type="text" onChange={(e) => setInfo({...info, email: e.target.value })} placeholder="EMAIL" required/>
                    <input type="password" onChange={(e) => setInfo({...info, password: e.target.value })} placeholder="PASSWORD" required/>
                    <input type="password" onChange={(e) => setInfo({...info, confirmPassword: e.target.value })} placeholder="CONFIRM PASSWORD" required/>
                    <button type="submit" className=" btn big outline">Sign Up</button>
                </animated.form>
            ) : (
                <animated.form style={transition} action="#" className='login-form' onSubmit={(e) => handleLogin(e)}>
                    <input type="text" onChange={(e) => setInfo({...info, email: e.target.value })} placeholder="EMAIL" required/>
                    <input type="password" onChange={(e) => setInfo({...info, password: e.target.value })} placeholder="PASSWORD" required/>
                    <button type="submit" className=" btn big outline">Sign In</button>
                </animated.form>
            )
        
        

    )
}

export default LoginForm;