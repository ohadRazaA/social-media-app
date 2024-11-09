import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import coverPic from '../assets/cover pic.jpg'
import postPic from '../assets/post pic.jpg'
import profilePic from '../assets/profile Pic.jpeg'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Post from './Post'

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
      <div className=' w-4/5 mx-auto mt-10'>
        <div className='flex flex-wrap'>
          <div className='flex-none w-64 rounded-lg'>
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

          <div className='flex-1 mx-14'>
            <Post />
          </div>


          <div className='flex-none w-64 hidden lg:block mb-10'>
            <div className='bg-white rounded-lg p-2'>
              <p className='mb-3'>Add to your feed</p>
              <div>
                <div className='flex my-2'>
                  <img className='w-14 h-14 rounded-full' src={profilePic} alt='' />
                  <div className='mx-1'>
                    <h1 className='text-sm font-medium'>Ohad Raza</h1>
                    <p className='text-xs'>MERN Stack Developer | Web Developer | React Js</p>
                    <button className='border-2 border-neutral-300 rounded-full p-1 my-1'>+ Follow</button>
                  </div>
                </div>
                <div className='flex my-2'>
                  <img className='w-14 h-14 rounded-full' src={profilePic} alt='' />
                  <div className='mx-1'>
                    <h1 className='text-sm font-medium'>Ohad Raza</h1>
                    <p className='text-xs'>MERN Stack Developer | Web Developer | React Js</p>
                    <button className='border-2 border-neutral-300 rounded-full p-1 my-1'>+ Follow</button>
                  </div>
                </div>
                <div className='flex my-2'>
                  <img className='w-14 h-14 rounded-full' src={profilePic} alt='' />
                  <div className='mx-1'>
                    <h1 className='text-sm font-medium'>Ohad Raza</h1>
                    <p className='text-xs'>MERN Stack Developer | Web Developer | React Js</p>
                    <button className='border-2 border-neutral-300 rounded-full p-1 my-1'>+ Follow</button>
                  </div>
                </div>
              </div>
              <p>View all recommendations --</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home
