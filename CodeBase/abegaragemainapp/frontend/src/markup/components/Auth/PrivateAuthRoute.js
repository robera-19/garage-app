import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import getAuth from '../../../util/auth.header';

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      if (response.employee_token) {
        // If in here, that means the user is logged in
        // console.log(response);
        // console.log("Set logged in to true");
        setIsLogged(true);
        if (
          roles &&
          roles.length > 0 &&
          roles.includes(response.employee_role)
        ) {
          // If in here, that means the user is logged and has  authorization to access the route
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [roles]);
  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};  

export default PrivateAuthRoute;
