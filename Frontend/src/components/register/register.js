import { useState } from "react"
import React from "react"
import "./register.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Register = () => {

///navigate between pages
const navigate = useNavigate();

function handleClick (){
    navigate("/")
}
///////use state
    const [ user, setUser] = useState({
        name: "",
        email:"",
        password: "",
        reEnterPassword: "",
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
    const register = () => {
        const  { name,email,password, reEnterPassword } = user
        if ( name && email && password &&(password === reEnterPassword)) {
            axios.post(process.env.REACT_APP_BACKEND_URI, user)
            .then( res => alert(res.data.message))
        } else {
            alert("Inavlid")
        }
    }

    return(
        <div className="register">
            {console.log("User",user)}
            <h1>Register</h1>
            <input type="text" name = "name" value = {user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name = "email" value = {user.email} placeholder="Your E-mail" onChange={ handleChange }></input>
            <input type="password" name = "password" value = {user.password} placeholder="Enter your Password" onChange={ handleChange }></input>
            <input type="password" name = "reEnterPassword" value = {user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register}>Register</div>
            <div>or</div>
            <div className="button" onClick={handleClick}>Login</div>
        </div>
    )
}

export default Register