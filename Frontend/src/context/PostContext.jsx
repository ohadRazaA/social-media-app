import React, { createContext, useState } from 'react'

export const PostContext = createContext();

function PostProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);
  const [yourPosts, setYourPosts] = useState([]);

  return (
    <PostContext.Provider value={{
      allPosts,
      setAllPosts,
      yourPosts,
      setYourPosts
    }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider
