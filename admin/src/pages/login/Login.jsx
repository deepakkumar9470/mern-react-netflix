import React,{useState,useContext} from 'react'
import './login.css'
import {AuthContext} from '../../context/authContext/AuthContext';
import {login} from '../../context/authContext/apiCalls';

const Login = () => {

    const [email, setEmail] = useState(" ")
    const [password, setPassword] = useState(" ")
    const {isFetching, dispatch} = useContext(AuthContext)

    const handleLogin = (e) =>{
        e.preventDefault()
        login({email, password}, dispatch)
        
        setEmail(' ')
        setPassword('')
    
    };

    return (
        <div className="login">
            <form action="" className="loginForm">
                <h2>Log in</h2>
                <input className="loginInput" 
                type="text" name="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}/>

                <input className="loginInput" 
                type="password" 
                name="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}/>

                <button className="loginButton"
                onClick={handleLogin}
                disabled = {isFetching}>
                    Login
                </button>

            </form>
        </div>
    )
}

export default Login


// /api/login
// /api/register