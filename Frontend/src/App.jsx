import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import PostProvider from './context/PostContext'

function App() {
  return (
    <div>
      <PostProvider>
        <Routes>
          <Route path='/' element={<Home />} />
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
