import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Signup() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsLoggedin, fetchUser, url } = useContext(AuthContext);
  const [error, setError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user-id');
    if (userId) {
      setIsLoggedin(true);
      navigate('/');
    } else {
      setIsLoggedin(false);
      navigate('/signup');
    }
  }, []);

  const addUserHandler = async () => {
    if (firstName && lastName && email && password) {
      const user = { firstName, lastName, email, userPassword: password };
      try {
        const response = await axios.post(`${url}users/`, user);
        response.data !== 'user exist'
          ? (() => {
            setIsLoggedin(true);
            localStorage.setItem('user-id', response.data.userId);
            const userId = localStorage.getItem('user-id');
            fetchUser(userId)
            navigate('/');
          })()
          : (() => { alert(response.data) })()
      } catch (err) {
        setError(err.response.data);
      }
    } else {
      alert('please fill all inputs');
    }
  }

  return (
    <div className='flex justify-center h-screen items-center bg-gray-100'>
      <div className='p-5 border-2 border-black h-max border-solid w-96 rounded-lg bg-white'>
        <h1 className='font-bold text-2xl text-center p-2 pb-4'>Signup Form</h1>
        <label className='input input-bordered flex items-center gap-2 m-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'>
            <path
              d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input type='text' className='grow' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label className='input input-bordered flex items-center gap-2 m-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'>
            <path
              d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
          </svg>
          <input type='text' className='grow' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label className='input input-bordered flex items-center gap-2 m-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'>
            <path
              d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
            <path
              d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
          </svg>
          <input type='text' className='grow' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className='input input-bordered flex items-center gap-2 m-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70'>
            <path
              fillRule='evenodd'
              d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
              clipRule='evenodd' />
          </svg>
          <input type='password' className='grow' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className='mx-2 text-red-700'>{error}</p>}
        <div className="flex items-center justify-between">
          <button onClick={addUserHandler} className='border-2 m-2 border-black rounded-lg btn'>Signup</button>
          <p className='text-center text-sm mr-2'>Account already exist? <Link to={'/login'} className='text-blue-700'>Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
