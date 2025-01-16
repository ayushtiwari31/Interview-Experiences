import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_ENDPOINT } from '../../../Constant.js';
import { useUser } from "../../UserContext.jsx";

import { useNavigate } from "react-router-dom";

const ViewPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [editData, setEditData] = useState(null); // To hold the data being edited
    const [showEditModal, setShowEditModal] = useState(false);
    const itemsPerPage = 3;
    const { user, isLoggedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {  
        const fetchData = async () => {
            const response = await axios.get(`${API_ENDPOINT}/api/users/user_submissions`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`, 
                }
            });
            console.log(response.data.data)
            setData(response.data.data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            await axios.delete(`${API_ENDPOINT}/api/users/user_submissions/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                }
            });
            setData(data.filter(item => item._id !== id));
        }
    };

    const handleEdit = (item) => {
        setEditData(item);
        setShowEditModal(true); 
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log(editData);
        await axios.post(`${API_ENDPOINT}/api/users/user_submissions/${editData._id}`, editData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`,
            }
        });
        const response = await axios.get(`${API_ENDPOINT}/api/users/user_submissions`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            }
        });
        setData(response.data.data) 
        setShowEditModal(false); 
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        {
          isLoggedIn()?
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>My Interview Experiences</h1>
            <div>
                {currentItems.map((item, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            border: '1px solid #ddd', 
                            borderRadius: '8px', 
                            marginBottom: '20px', 
                            padding: '15px', 
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
                        }}
                    >
                        <h2 style={{ margin: '0', color: '#333' }}>{item.name}</h2>
                        <p style={{ margin: '5px 0', color: '#555' }}><strong>Country:</strong> {item.country}</p>
                        <p style={{ margin: '5px 0', color: '#555' }}><strong>Company:</strong> {item.company}</p>
                        <div>
                            <strong>Questions:</strong>
                            <ul style={{ paddingLeft: '20px', color: '#777' }}>
                                {item.questions.map((question, qIndex) => (
                                    <li key={qIndex}>{question}</li>
                                ))}
                            </ul>
                        </div>
                        <button 
                            onClick={() => handleEdit(item)} 
                            style={{
                                marginRight: '10px', 
                                padding: '5px 10px', 
                                backgroundColor: '#FFD700', 
                                color: '#000', 
                                border: 'none', 
                                borderRadius: '5px', 
                                cursor: 'pointer'
                            }}
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(item._id)} 
                            style={{
                                padding: '5px 10px', 
                                backgroundColor: '#FF4500', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '5px', 
                                cursor: 'pointer'
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {[...Array(totalPages).keys()].map((page) => (
                    <button 
                        key={page} 
                        onClick={() => handlePageChange(page + 1)}
                        style={{ 
                            margin: '0 5px', 
                            padding: '10px 15px', 
                            backgroundColor: currentPage === page + 1 ? '#4CAF50' : '#f1f1f1', 
                            color: currentPage === page + 1 ? '#fff' : '#333', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                        }}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
            {showEditModal && (
    <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    }}>
        <h2>Edit Item</h2>
        <form onSubmit={handleEditSubmit}>
            <label>Name:</label>
            <input 
                type="text" 
                value={editData.name} 
                onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
            />
            <label>Country:</label>
            <input 
                type="text" 
                value={editData.country} 
                onChange={(e) => setEditData({ ...editData, country: e.target.value })} 
            />
            <label>Company:</label>
            <input 
                type="text" 
                value={editData.company} 
                onChange={(e) => setEditData({ ...editData, company: e.target.value })} 
            />
            <label>Questions:</label>
            {editData.questions.map((question, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => {
                            const newQuestions = [...editData.questions];
                            newQuestions[index] = e.target.value;
                            setEditData({ ...editData, questions: newQuestions });
                        }}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                        }}
                    />
                </div>
            ))}
            <button 
                type="button"
                onClick={() => setEditData({ ...editData, questions: [...editData.questions, ""] })}
                style={{
                    marginBottom: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Add Question
            </button>
            <button 
                type="submit" 
                style={{
                    padding: '5px 10px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Save
            </button>
            <button 
                onClick={() => setShowEditModal(false)} 
                style={{
                    marginLeft: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#FF4500',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Cancel
            </button>
        </form>
    </div>
)}


        </div>:(()=>navigate("/"))()
        }
        </>
    );
};

export default ViewPage;
