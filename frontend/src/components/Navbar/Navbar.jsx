import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext.jsx";

const Navbar = () => {

  const { user, logout, isLoggedIn } = useUser();

  const navigate = useNavigate();

  

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
      marginBottom:'100px'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', }}>Interview Experiences</div>
      <div>
        {!isLoggedIn() ? (
          <>
            <button
              style={{
                padding: '10px 15px',
                marginRight: '10px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() =>navigate("/signup") }
            >
              Signup
            </button>
            <button
              style={{
                padding: '10px 15px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={() =>navigate("/login") }
            >
              Login
            </button>
          </>
        ) : (
          <>
          <span style={{marginRight:'100px',color:"green",fontSize:"larger",fontWeight:"bold"}}
          onClick={() =>navigate("/") }>Welcome, {user && user.user.fullName}!</span>
          <button
              style={{
                padding: '10px 15px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight:'20px'
              }}
              onClick={() =>navigate("/submit") }
            >
              Submit Your Experience
            </button>
           
            <button
              style={{
                padding: '10px 15px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                marginRight:'20px',
                cursor: 'pointer'
              }}
              onClick={() =>navigate("/view") }
            >
              View Your Submissions
            </button>

            <button
              style={{
                padding: '10px 15px',
                marginRight: '10px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
