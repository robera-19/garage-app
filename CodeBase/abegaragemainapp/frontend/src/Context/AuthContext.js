import React, { useState, useEffect, useContext } from 'react';
// import auth header
import employeeAuthHeader from '../util/auth.header';

// Create the AuthContext
const AuthContext = React.createContext();

// Export the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee };

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInEmployee = employeeAuthHeader();
    // console.log(loggedInEmployee);
    loggedInEmployee.then((response) => {
      // console.log(response);
      if (response.employee_token) {
        setIsLogged(true);
        // 3 is the employee_role for admin
        if (response.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(response);
      }
    });
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
