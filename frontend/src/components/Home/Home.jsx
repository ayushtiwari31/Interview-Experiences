import React, { useState, useEffect } from 'react';
import axios from "axios"
import { API_ENDPOINT } from '../../../Constant.js';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API_ENDPOINT}/api/users/all_submissions`);
            setData(response.data.data);
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Interview Experiences</h1>
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
                        <h2 style={{ margin: '0', color: 'orange' }}>{item.name}</h2>
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
        </div>
    );
};

export default HomePage;
