"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserDetails(token);
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('https://api.realworld.io/api/user', {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setUser(response.data.user);
    } catch (err) {
      console.error('Failed to fetch user details', err);
    }
  };

  return { isAuthenticated, user };
};

export default useAuth;
