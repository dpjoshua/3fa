import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './Home.js'
import Login from "./Login.js";
import fire from './config/fire';
import NavBar from './NavBar';
import Main from './Main';
import Register from './Register';
import Security from './Security';
import Otp from './Otp';
import Recaptcha from "react-recaptcha";
import Recap from "./Recap.js";
import Dummy from "./Dummy.js";
import ForgotPassword from "./ForgotPassword.js";


class App extends Component {
 /* constructor(props) {
    super(props);

    this.state = {
      user: null,
    }

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
  }
  */

  render() {
    return (
      <div>
        <Routes>
          <Route element={<NavBar />} />
          <Route exact path="/" element={<Main />} />
          <Route exact path='/Otp' element={<Otp/>}/>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Security" element={<Security />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Recap" element={<Recap />} />

          <Route exact path="/Dummy" element={<Dummy />} />
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} />






        </Routes>
      </div>
    );
  }
}

export default App;
