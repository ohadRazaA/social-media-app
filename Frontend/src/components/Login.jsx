import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setIsLoggedin, fetchUser, url } = useContext(AuthContext);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('user-id');
        if (userId) {
            setIsLoggedin(true);
            navigate('/');
            return;
        }
        setIsLoggedin(false);
        navigate('/login');

    }, []);
    const onLogin = async () => {
        if (email && password) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${url}users/auth-users/`, { email, userPassword: password });
                setIsLoggedin(true);
                localStorage.setItem('user-id', response.data.userId);
                fetchUser(response.data.userId);
                setIsLoggedin(false);
                navigate('/');
            } catch (err) {
                setError(err.response.data.message);
            }
        } else {
            alert('please fill all inputs');
        }
    }
    return (
        <div>
            {
                isLoading ?
                    <div className='h-screen w-screen flex items-center justify-center'>
                        <Loader />
                    </div>
                    : (

                        <div className='flex justify-center h-screen items-center bg-gray-100'>
                            <div className='p-5 border-2 border-black border-solid w-96 rounded-lg bg-white'>
                                <h1 className='font-bold text-2xl text-center p-3 pb-5'>Login Form</h1>
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
                                <div className='flex items-center justify-between'>
                                    <button onClick={onLogin} className='border-2 m-2 border-black rounded-lg btn'>Login</button>
                                    <p className='text-center text-sm mr-2'>Don't have an account? <Link to={'/signup'} className='text-blue-700'>Sign up</Link></p>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Login
