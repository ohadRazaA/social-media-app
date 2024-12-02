import React, { useContext, useState } from 'react'
import profilePic from '../assets/profile-pic.png'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { allUser } = useContext(AuthContext);
  const onLogout = () => {
    localStorage.removeItem('user-id');
    navigate('/login');
  }

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query);
    const filtered = allUser.filter(item => item.firstName.toLowerCase().startsWith(query.toLowerCase()));

    // const filtered = allUser.filter(item => item.firstName.toLowerCase().includes(query.toLowerCase())).sort((a, b) => {
    //   const startsWithQuery = (word) =>
    //     word.firstName.toLowerCase().startsWith(query.toLowerCase());
    //   if (startsWithQuery(a) && !startsWithQuery(b)) return -1;
    //   if (!startsWithQuery(a) && startsWithQuery(b)) return 1;
    //   return 0; // Preserve original order for non-prioritized matches
    // });
    setFilteredItems(filtered);
  };

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
            <a className='btn btn-ghost text-xl'>Social</a>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-500 w-64"
              />
              {/* <FaSearch /> */}
              <FontAwesomeIcon className="absolute right-3 top-3 text-stone-500" icon={faMagnifyingGlass} />
              {searchQuery && (
                <div className="absolute bg-white text-black mt-2 rounded shadow-lg w-full max-w-xs z-10 overflow-y-auto max-h-48">
                  {filteredItems.length ? (
                    filteredItems.map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {item.firstName}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
        <div className='navbar-end hidden lg:flex py-3 px-5'>
          <ul className='menu menu-horizontal px-1 flex items-center gap-6'>
            <Link to={'/'} className='cursor-pointer'>Home</Link>
            <li className='cursor-pointer'>Messaging</li>
            <li className='cursor-pointer'>Notifications</li>
            <Link to={'/user-posts'} className='cursor-pointer'>Your posts</Link>
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
                  <Link to={'/user-profile'} className='justify-between'>
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
        <button onClick={onLogout} className='btn'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
