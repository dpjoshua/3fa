import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import fire from './config/fire';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const user = fire.auth().currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Navigate to="/Login" />
        )
      }
    />
  );
};

export default PrivateRoute;
