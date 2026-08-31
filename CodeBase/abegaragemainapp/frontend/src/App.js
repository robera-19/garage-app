import React from 'react';
import { Routes, Route } from 'react-router';
// Import the page components
import Home from './markup/pages/Home';
import Login from './markup/pages/Login';
import AddEmployee from './markup/pages/admin/AddEmployee';
import Unauthorized from './markup/pages/Unauthorized';
import Orders from './markup/pages/admin/Orders';
import Customers from './markup/pages/admin/Customers';
import Employees from './markup/pages/admin/Employees';
import About from './markup/pages/About';

// Import the css files
import './assets/template_assets/css/bootstrap.css';
import './assets/template_assets/css/style.css';
import './assets/template_assets/css/responsive.css';
import './assets/template_assets/css/color.css';

// Import the custom css file
import './assets/styles/custom.css';

import Header from './markup/components/Header/Header';
import Footer from './markup/components/Footer/Footer';

// Import the PrivateAuthRoute component
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* // Add the Orders Route  */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Customers Route  */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={<Employees />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        {/* 
          Customers (/admin/customers) - managers and admins
          Orders (/admin/orders) - Can be accessed by all employees
          Add employee (/admin/add-employee) - admins only 
            - Admin: 3 
            - Manager: 2 
            - Employee: 1 
        */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
