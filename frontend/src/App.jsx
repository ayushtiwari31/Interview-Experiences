import React, { useState, useEffect } from 'react';
import { RouterProvider,createBrowserRouter,Navigate } from 'react-router-dom'

import SubmissionForm from './components/Submission/Submission.jsx'
import SignupPage from './components/Signup/Signup.jsx'
import { LoginPage } from './components/Login/Login.jsx'
import HomePage from './components/Home/Home.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Layout from './components/Layout/Layout.jsx';
import ViewPage from './components/View/View.jsx';



const router = createBrowserRouter([
  {
    path: "/", // Parent route
    element: <Layout />, // Shared layout
    children: [
      {
        path: "", 
        element: <HomePage />, 
      },
      {
        path: "signup", 
        element: <SignupPage />, 
      },
      {
        path: "login", 
        element: <LoginPage />, 
      },
      {
        path: "view", 
        element: <ViewPage/>, 
      },
      {
        path: "submit", 
        element: <SubmissionForm />, 
      },
      
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
