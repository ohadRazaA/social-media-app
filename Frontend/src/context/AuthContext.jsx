import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();


function AuthProvider({ children }) {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const url = 'http://localhost:5000/';

    useEffect(() => {
        const userId = localStorage.getItem('user-id');
        if (userId) {
            setIsLoggedin(true);
            fetchUser(userId);
            return;
        }
        setIsLoggedin(false);
        navigate('/signup');
    }, []);

    const fetchUser = async (userId) => {
        const response = await axios.get(`${url}users/${userId}`);
        setUser(response.data);
    }
    return (
        <AuthContext.Provider value={{
            isLoggedin,
            setIsLoggedin,
            fetchUser,
            user,
            setUser,
            url
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
