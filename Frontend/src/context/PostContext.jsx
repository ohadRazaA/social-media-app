import React, { createContext, useState } from 'react'

export const PostContext = createContext();

function PostProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);

  return (
    <PostContext.Provider value={{
      allPosts,
      setAllPosts
    }}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider
