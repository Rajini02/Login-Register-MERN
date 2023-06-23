import React from "react"
import "./homepage.css"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
    const navigate = useNavigate();

    function handleClick(){
        navigate("/")
    }

    return(
        <div className="homepage">
            <h1>Homepage</h1>
            <div className="button" onClick={handleClick}>
                Logout
            </div>
        </div>
    )
}

export default Homepage