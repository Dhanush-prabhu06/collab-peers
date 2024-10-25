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

        const response = await axios.get('http://localhost:8000/api/user/profile', {
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
            <div>Name: </div>
            <div>Email:</div>
            <div>College name:</div>
            <a href=""><div>update</div></a>
            <div onClick={handleDelete}>delete</div>
        </div>
    </>
  );
};

export default Profile;
