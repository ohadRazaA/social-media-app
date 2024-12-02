import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import profilePic from '../assets/profile-pic.png'

function RecommendUser() {
    const { setIsLoggedin, url, user, fetchUser, setFriendProfile } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();

    const userRecommendations = async (userId) => {
        const response = await axios.get(`${url}users/${userId}`);
        setRecommendations(response.data.recommendedUser);
    }
    useEffect(() => {
        const userId = localStorage.getItem('user-id');
        if (userId) {
            setIsLoggedin(true);
            userRecommendations(userId);
            navigate('/profile');
        } else {
            setIsLoggedin(false);
            navigate('/login');
        }
    }, []);

    const addFriendHandler = async (friendId) => {
        const userId = localStorage.getItem('user-id');
        try {
            const response = await axios.patch(`${url}users/add-friend`, { friendId, userId });
            console.log(response);
            fetchUser(userId);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='bg-white rounded-lg p-2'>
            <p className='mb-3'>Add to your feed</p>
            <div>
                {
                    recommendations?.map((u, i) => {
                        return (
                            <div key={i} className='flex gap-3 my-2'>
                                <Link className='w-20' onClick={() => setFriendProfile(u)} to={'/profile'}>
                                    <img className='w-14 h-14 rounded-full cursor-pointer' src={profilePic} alt='' />
                                </Link>
                                <div className='mx-1'>
                                    <Link onClick={() => setFriendProfile(u)} to={'/profile'}>
                                        <h1 className='text-sm font-medium cursor-pointer'>{`${u.firstName} ${u.lastName}`}</h1>
                                    </Link>
                                    <p className='text-xs'>MERN Stack Developer | Web Developer | React Js</p>
                                    <button onClick={() => addFriendHandler(u._id)} className='border-2 border-neutral-300 rounded-full p-1 my-1'>{user?.friends?.includes(u._id) ? "- un-friend" : "+ Add Friend"}</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            <p>View all recommendations --</p>
        </div>
    )
}

export default RecommendUser
