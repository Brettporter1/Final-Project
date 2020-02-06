import React from 'react'
import {useSpring, animated} from 'react-spring'
const LoginForm = (props) => {
    const transition = useSpring({to: {opacity: 1, transform: 'translateY(0px)'}, from: {opacity: 0, transform: 'translateY(100px)'}});
    return (
        
            props.intent === 'register' ? (
                <animated.form style={transition} action="#" className='login-form'>
                    <input type="text" placeholder="USERNAME"/>
                    <input type="text" placeholder="EMAIL"/>
                    <input type="password" placeholder="PASSWORD"/>
                    <input type="password" placeholder="CONFIRM PASSWORD"/>
                    <button className=" btn big outline">Sign Up</button>
                </animated.form>
            ) : (
                <animated.form style={transition} action="#" className='login-form'>
                    <input type="text" placeholder="EMAIL"/>
                    <input type="password" placeholder="PASSWORD"/>
                    <button className=" btn big outline">Sign In</button>
                </animated.form>
            )
        
        

    )
}

export default LoginForm;