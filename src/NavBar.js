import React from "react";
import { Link } from "react-router-dom";

function NavBar(){
    return(
        <React.Fragment>
            <ul>
                <li>
                    <Link to="/">Main</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/Main">Main</Link>
                </li>
                <li>
                    <Link to="/Otp">Otp</Link>
                </li>
                <li>
                    <Link to="/Register">Register</Link>
                </li>
                <li>
                    <Link to="/Security">Security</Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default NavBar;
