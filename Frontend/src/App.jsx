import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import PostProvider from './context/PostContext'
import UserProfile from './components/UserProfile'
import Profile from './components/Profile'
import UserPost from './components/UserPost'

function App() {
  return (
    <div>
      <PostProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/user-posts' element={<UserPost />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </PostProvider>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

