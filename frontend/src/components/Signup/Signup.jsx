import React, { useState } from 'react';
import { API_ENDPOINT } from '../../../Constant.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        
        try {
            const response = await axios.post(`${API_ENDPOINT}/api/users/signup`, formData);
            if(response)
            {
                setFormData({fullName: '',email: '', password: ''})
                navigate("/login");
            }
           
        } catch (error) {
            setFormData({fullName: '',email: '', password: ''})
            alert("Error signing up. Please try again.");
            
            console.error('Error signing up:', error);
        }
           
       
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', maxWidth: '800px', margin: 'auto', textAlign: 'center' 
            , boxShadow:"-10px 10px 40px rgba(0,0,0,0.8)",paddingRight:"50px"
        }}>
            <h1 style={{ color: '#4CAF50' }}>Signup</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '10px', textAlign: 'left', color: '#555' }}>
                    Full Name:
                    <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
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
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
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
                        value={formData.password} 
                        onChange={handleChange} 
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
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
