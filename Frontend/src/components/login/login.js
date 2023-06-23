import React from "react"
import { useState } from "react"
import "./login.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import App from "/Users/PRANAV/Desktop/react/proj2/proj2/src/App.js"


const Login = ({ setLoginUser }) => {
///navigate between pages
    const navigate = useNavigate();

    function handleClick (){
        navigate("/register")
    }
///////use state
    const [ user, setUser] = useState({
        email:"",
        password: "",
    })
////// make sure input is recorded
    const handleChange = e =>{
        const { name,value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
//////connection to backend
    const login = () => {
            axios.post(process.env.REACT_APP_LOGIN_URI, user)
            .then( res => {
                alert(res.data.message)
                setLoginUser(res.data.user)

///check if user detail is being sent back, if it is, it exists in database
                if(res.data.user){
                navigate("/homepage")}
            })
    }

    return(
        <div className="login">
            {console.log("User",user)}
            <h1>Login</h1>
            <input type="text" name = "email" value = {user.email} placeholder="Enter your E-mail" onChange={ handleChange }></input>
            <input type="password" name = "password" value = {user.password} placeholder="Enter your Password" onChange={ handleChange }></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={handleClick}>Register</div>
        </div>
    )
}

export default Login