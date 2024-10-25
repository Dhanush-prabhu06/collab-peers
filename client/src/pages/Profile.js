import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/user/fetch', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
//console.log(userData);
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      await axios.delete('http://localhost:8000/api/user/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Account deleted successfully');
      // Redirect or perform additional actions after delete
    } catch (err) {
      console.log('Error:', err);
    }
  };


  return (
    <>
        <div>
            <div>Name:{userData.name}</div>
            <div>Email:{userData.email}</div>
            <div>College name:{userData.collegename}</div>
            <div>course name:{userData.course}</div>
            <div>Year:{userData.year}</div>
        </div>
    </>
  );
};

export default Profile;
