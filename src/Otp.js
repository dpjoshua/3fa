import React from 'react';
import fire from './config/fire';
import { Navigate  ,Link } from "react-router-dom";


class Otp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggedOut: false
        };
        // Bind 'this' to the login function
        this.logout = this.logout.bind(this);
    }

    logout(){
        fire.auth().signOut()
            .then(() => {
                console.log('Logged out successfully');
                this.setState({ isLoggedOut: true }); // set the state to true when the user is logged in

            })
            .catch((error) => {
                console.log('Error logging out:', error);
            });
    }

    render(){
        if (this.state.isLoggedOut) { // redirect the user to the private page if they are logged in
            return <Navigate  to="/Login" />;
        }
        return(
            <div>
                <h1>You are logged in..</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default Otp;
