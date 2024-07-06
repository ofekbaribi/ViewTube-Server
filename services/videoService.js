// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import tokenVerification from '../tokenAuth/tokenVerification';
import { useVideos } from './VideosContext'; // Import VideosContext

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { deleteVideoByUser } = useVideos(); // Use deleteVideoByUser function from VideosContext

  const setUser = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setCurrentUser(null);
  };

  const getProfilePicture = async (username) => {
    try {
      const response = await axios.get(`http://localhost:12345/api/users/picture/${username}`);
      if (response.status === 200) {
        return response.data.profilePicture;
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      return null;
    }
  };

  const deleteUser = async (username) => {
    try {
      const response = await axios.delete(`http://localhost:12345/api/users/${username}`);
      if (response.status === 200) {
        logout();
        deleteVideoByUser(currentUser.id); 
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  };

  const getUserData = async (username) => {
    try {
      const response = await axios.get(`http://localhost:12345/api/users/${username}`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const userData = await tokenVerification(token);
      if (userData) {
        setCurrentUser(userData);
      } else {
        logout();
      }
    }
  };

  const verifyTokenBeforeVideoUpload = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      return await tokenVerification(token);
    }
  };

  const updateUserData = async (username, firstName, lastName) => {
    try {
      const response = await axios.put(`http://localhost:12345/api/users/${username}`, { firstName, lastName });
      if (response.status === 200) {
        setCurrentUser(response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  };

  const updateUserPassword = async (username, currentPassword, newPassword) => {
    try {
      const response = await axios.post('http://localhost:12345/api/users/password', {
        username,
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        setCurrentUser(response.data.user);
        localStorage.setItem('jwtToken', response.data.token);
        console.log(response.data.token);
        console.log(response.data.user);
      }
      return response.status;
    } catch (error) {
      console.error('Error updating user password:', error);
      return null;
    }
  };

  useEffect(() => {
    verifyToken();

    // Set up an interval to verify the token every 5 minutes
    const interval = setInterval(verifyToken, 300000);

    // Clean up the timeout and interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setUser,
        logout,
        getProfilePicture,
        verifyTokenBeforeVideoUpload,
        getUserData,
        updateUserData,
        updateUserPassword,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
