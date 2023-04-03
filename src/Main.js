import React from "react";
import { Link } from "react-router-dom";

function Main(props){
    return(
        <div>
            <h1>Welcome</h1>
            <ul>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/Register">Register</Link>
                </li>
            </ul>
        </div>
    )   
}

export default Main;
