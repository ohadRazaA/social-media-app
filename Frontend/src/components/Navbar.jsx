import React from 'react'
import profilePic from '../assets/profile Pic.jpeg'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.removeItem('user-id');
        navigate('/login');
    }
    return (
        <div className='max-w-full flex justify-between shadow-lg items-center bg-white px-10'>
            <div className='navbar bg-base-100'>
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h8m-8 6h16' />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
                            <li>Home</li>
                            <li>Messaging</li>
                            <li>Notifications</li>
                        </ul>
                    </div>
                    <div></div>
                    <div className='flex'>
                        <a className='btn btn-ghost text-xl'>daisyUI</a>
                        <label className='hidden input input-bordered sm:flex items-center gap-2'>
                            <input type='text' className='grow' placeholder='Search' />
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 16 16'
                                fill='currentColor'
                                className='h-4 w-4 opacity-70'>
                                <path
                                    fillRule='evenodd'
                                    d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                                    clipRule='evenodd' />
                            </svg>
                        </label>
                    </div>

                </div>
                <div className='navbar-end hidden lg:flex py-3 px-5'>
                    <ul className='menu menu-horizontal px-1 flex items-center gap-6'>
                        <Link to={'/'} className='cursor-pointer'>Home</Link>
                        <li className='cursor-pointer'>Messaging</li>
                        <li className='cursor-pointer'>Notifications</li>
                        <div className='dropdown dropdown-end'>
                            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                                <div className='w-10 rounded-full'>
                                    <img
                                        alt='Tailwind CSS Navbar component'
                                        src={profilePic} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
                                <li>
                                    <Link to={'/profile'} className='justify-between'>
                                        Profile
                                        <span className='badge'>New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={onLogout}><a>Logout</a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
            <div className='block lg:hidden mx-2'>
                <button onClick={onLogout} className='btn btn-primary'>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
