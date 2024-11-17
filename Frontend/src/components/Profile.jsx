import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import coverPic from '../assets/cover pic.jpg'
import profilePic from '../assets/Profile pic.jpeg'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RecommendUser from './RecommendUser';

function Profile() {
    const { setIsLoggedin, url, friendProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('user-id');
        if (userId) {
            setIsLoggedin(true);
            navigate('/profile');
        } else {
            setIsLoggedin(false);
            navigate('/login');
        }
    }, []);


    return (
        <div className='bg-stone-200 max-w-full'>
            <Navbar />
            <div className='flex mt-10 w-4/5 mx-auto gap-10'>
                <div className='w-3/4'>
                    <div className='w-full bg-white my-2 rounded-lg'>
                        <div className='relative'>
                            <img className='rounded-lg h-80 w-full' src={coverPic} alt="" />
                            <img className='absolute top-60 left-12 w-28 h-28 rounded-full' src={profilePic} alt="" />
                        </div>
                        <div className='flex justify-between p-2 mt-4'>
                            <div>
                                <h1 className='font-bold text-2xl'>{`${friendProfile.firstName} ${friendProfile.lastName}`}</h1>
                                <p>MERN Stack Developer | Web Developer | React Js</p>
                                <p>Karāchi, Sindh, Pakistan</p>
                                <p>9 Connections</p>
                            </div>
                            <div className='text-end'>
                                <p>Government National College Karachi</p>
                            </div>
                        </div>
                    </div>
                    <div className='rounded-lg bg-white p-2 my-4'>
                        <div className='flex justify-between m-2'>
                            <p className='font-bold text-xl'>Educations</p>
                        </div>
                        <div className='flex gap-4 mt-6 mb-2'>
                            <img className='w-14 h-14 rounded-full' src={profilePic} alt="" />
                            <div>
                                <p>Aga Khan School</p>
                                <p>Matric</p>
                                <p>jul 22 - jul 24</p>
                            </div>
                        </div>
                        <div className='flex gap-4 mt-6 mb-2'>
                            <img className='w-14 h-14 rounded-full' src={profilePic} alt="" />
                            <div>
                                <p>Aga Khan School</p>
                                <p>Matric</p>
                                <p>jul 22 - jul 24</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-64 hidden lg:block my-2'>
                    <RecommendUser />
                </div>

            </div>
        </div>
    )
}

export default Profile
