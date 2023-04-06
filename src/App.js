import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './Home.js'
import NavBar from './NavBar';
import Main from './Main';
import Register from './Register';
import Security from './Security';
import Otp from './Otp';
import Recap from "./Recap.js";
import Dummy from "./Dummy.js";
import ForgotPassword from "./ForgotPassword.js";
import ChangePassword from "./ChangePassword.js"

import { RecoilRoot } from 'recoil'
import LoginWrapper from "./loginWrapper.js";


class App extends Component {

  render() {
    return (
      <RecoilRoot>
        <div>
          <Routes>
            <Route element={<NavBar />} />
            <Route exact path="/" element={<Main />} />
            <Route exact path='/Otp' element={<Otp />} />
            <Route exact path="/Login" element={<LoginWrapper />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Security" element={<Security />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/Recap" element={<Recap />} />
            <Route exact path="/Dummy" element={<Dummy />} />
            <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
            <Route exact path="/ChangePassword" element={<ChangePassword />} />


          </Routes>
        </div>
      </RecoilRoot>
    );
  }
}

export default App;
