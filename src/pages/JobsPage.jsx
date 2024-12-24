import JobListings from "../components/JobListings"
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AccessDenied from '../components/AccessDenied';

const JobsPage = () => {
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    isLoggedIn ? 
    (<JobListings />) 
    : 
    (<AccessDenied message="Log in to view job postings" />)
  )
}

export default JobsPage;