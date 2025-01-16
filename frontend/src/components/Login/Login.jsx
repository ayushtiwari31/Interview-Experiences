import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../../../Constant.js';
import { useUser } from "../../UserContext.jsx";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const { login } = useUser();
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        // console.log('Login Data:', loginData);
        try {
            
          const response = await axios.post(`${API_ENDPOINT}/api/users/login`, loginData);
            
          const { accessToken, refreshToken, user } = response.data.data; 
          login({
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user
          })
       
          setLoginData({ email: '', password: '' });
          navigate("/")

          } catch (error) {
            
            alert("Email or Password is incorrect");
            console.error('Error logging in:', error);
          } 
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center'
            ,boxShadow:"-10px 10px 40px rgba(0,0,0,0.8)",paddingRight:'50px',borderRadius:'20px'
         }}>
            <h1 style={{ color: '#4CAF50' }}>Login</h1>
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '10px', textAlign: 'left', color: '#555' }}>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={loginData.email} 
                        onChange={handleLoginChange} 
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            margin: '5px 0 15px', 
                            border: '1px solid #ddd', 
                            borderRadius: '5px' 
                        }} 
                        required 
                    />
                </label>
                <label style={{ marginBottom: '10px', textAlign: 'left', color: '#555' }}>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={loginData.password} 
                        onChange={handleLoginChange} 
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            margin: '5px 0 15px', 
                            border: '1px solid #ddd', 
                            borderRadius: '5px' 
                        }} 
                        required 
                    />
                </label>
                <button 
                    type="submit" 
                    style={{ 
                        padding: '10px', 
                        backgroundColor: '#4CAF50', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export {  LoginPage };
