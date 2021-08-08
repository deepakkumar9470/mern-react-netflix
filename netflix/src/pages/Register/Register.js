import React, { useState,useRef } from 'react'
import './Register.scss'


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailRef = useRef()
    const passRef = useRef()

    const handleStart = () => {
           setEmail(emailRef.current.value)
     };

    const handleFinish = () => {
        setPassword(passRef.current.value)
    };

    return (
        <div className='register'>
               <div className="top">
                   <div className="wrapper">
                    <img 
                    className='logo'
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
                    alt="registerlogo" />

                    <button className='loginButton'>Sign in</button>
                   </div>
               
               </div>

            <div className="container">
                <h1>Unlimited movies, series, TV shows and more..</h1>
                <h2>Watch anywhere, cancel subscription anytime</h2>
                <p>Ready to watch? Enter your email to create or restart your
                    membership
                </p>
                {
                    !email ? (
                        <div className="input">
                            <input type="email" name="email" ref={emailRef}/>
                            <button className='registerButton' onClick={handleStart}>Get started</button>
                       </div>
                    ) : (
                        <form className="input">
                            <input type="password" name="password" ref={passRef}/>
                            <button className='registerButton' onClick={handleFinish}>Start</button>
                       </form>
                    )
                }
                

            </div>

            
        </div>
    )
}

export default Register





