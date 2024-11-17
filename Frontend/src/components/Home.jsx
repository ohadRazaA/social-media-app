import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import coverPic from '../assets/cover pic.jpg'
import profilePic from '../assets/profile Pic.jpeg'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Post from './Post'
import RecommendUser from './RecommendUser'

function Home() {
  const { setIsLoggedin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user-id');
    if (userId) {
      setIsLoggedin(true);
      navigate('/');
    } else {
      setIsLoggedin(false);
      navigate('/login');
    }
  }, []);

  return (
    <div className='bg-stone-200 max-w-full'>
      <Navbar />
      <div className='w-11/12 mx-auto mt-10'>
        <div className='flex flex-wrap justify-evenly'>
          <div className='hidden lg:block lg:w-64 rounded-lg'>
            <div className='bg-white rounded-lg border-2'>
              <div className='relative'>
                <img className='border-2 rounded-lg w-full h-20' src={coverPic} alt='' />
                <img className='absolute left-24 top-10 w-14 h-14 rounded-full' src={profilePic} alt='' />
              </div>
              <div className='p-2'>
                <h1 className='mt-4 font-bold text-lg text-center'>{`${user.firstName} ${user.lastName}`}</h1>
                <p className='text-center'>MERN Stack Developer | Web Developer | React Js</p>
                <hr className='my-2' />
                <div className='flex justify-between'>
                  <div>
                    <p className='text-sm text-neutral-400 font-medium'>Connections</p>
                    <p>Grow your network</p>
                  </div>
                  <p className='text-sm'>9</p>
                </div>
                <hr className='my-2' />
                <div className='flex justify-between'>
                  <p className='text-sm text-neutral-400 font-medium'>Invitations</p>
                  <p className='text-sm'>9</p>
                </div>
              </div>
            </div>
          </div>

          <div className='w-120'>
            <Post />
          </div>


          <div className='w-64 hidden xl:block'>
            <RecommendUser />
          </div>


        </div>
      </div>
    </div>
  )
}

export default Home
