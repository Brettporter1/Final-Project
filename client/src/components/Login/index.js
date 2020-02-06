import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring'
import LoginForm from '../LoginForm'

const Login = () => {
    const [state, setState] = useState({
        intent: 'start'
    })
    const transition = useSpring({to: {opacity: 1, transform: 'translateY(0px)'}, from: {opacity: 0, transform: 'translateY(100px)'}});
    return (
        <div className="login-component">
            <div className="logo">
              {/* Maybe put a catchy marketing line here
                (already have the logo in the header)
              */}
            </div>
                { 
                    state.intent === 'start' ? (
                        <animated.div style={transition} className="actions-initial">
                            <button onClick={ () => setState({...state, intent: 'login'}) } className="btn big outline log-in">Log in</button>
                            <button onClick={ () => setState({...state, intent: 'register'}) } className="btn big fill-gray register">Sign Up</button>
                        </animated.div>
                    ) : (
                        <LoginForm intent={state.intent}/>
                    )
                }
            
           

        </div>

    )
}

export default Login;