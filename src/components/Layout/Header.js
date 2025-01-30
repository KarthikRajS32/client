// import { Button } from 'antd'
// import React , {useState,useEffect} from 'react'
// import { Link ,useNavigate} from 'react-router-dom'
// import { message } from 'antd'

// const Header = () => {
//   const [loginUser,setLoginUser] = useState('');
//   const navigate = useNavigate();
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))
//     if(user){
//       setLoginUser(user)
//     }
//   },[]);

//   const logoutHandler = () => {
//     localStorage.removeItem('user');
//     message.success('Logout Successfully');
//     navigate('/login')
//   }

//   return (
//     <>
//    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//   <div className="container-fluid">
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon" />
//     </button>
//     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//       <Link className="navbar-brand" to="/">Expense Management</Link>
//       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//         <li className="nav-item"><p className="nav-link active">{loginUser && loginUser.name}</p></li>
//         <li className="nav-item">
//           <button className="btn btn-primary" onClick={ logoutHandler } > Logout </button>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>

//     </>
//   )
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { message } from 'antd';

const Header = () => {
  const [user, setUser] = useState(null); // Store logged-in user details
  const [isProfileVisible, setIsProfileVisible] = useState(false); // Toggle profile visibility
  const navigate = useNavigate();
  
  // Fetch user data on component mount
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success('Logout Successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* Navbar links for Expense, Budget, and Finance */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/homepage">
                Expense
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/budget">
                Budget
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/finance">
                Finance
              </Link>
            </li>
          </ul>

          {/* Profile Icon fixed on the right */}
          <div className="profile-icon icon position-relative ms-auto">
            <UserOutlined
              style={{ fontSize: '24px', cursor: 'pointer' }}
              onClick={() => setIsProfileVisible(!isProfileVisible)}
            />
            {isProfileVisible && user && (
              <div className="profile-dropdown">
                <div className="username">
                  <strong>Username:</strong> {user.username}
                </div>
                <div className="email">
                  <strong>Email:</strong> {user.email}
                </div>
                <Link to="/profile">
                  <button className="btn btn-secondary mt-2">Edit</button>
                </Link>
                <button className="btn btn-danger mt-2" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
