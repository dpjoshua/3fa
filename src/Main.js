import React from "react";
import { Link } from "react-router-dom";

function Main(props){
    return(
        <div>
            <h1>Welcome</h1>
            <ul>
                <p>
                    <Link to="/Login">Login</Link>
                </p>
                <p>
                    <Link to="/Register">Register</Link>
                </p>
            </ul>
        </div>
    )   
}

export default Main;
