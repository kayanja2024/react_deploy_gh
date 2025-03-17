import Post from './Post'
import React from 'react'

const Feed = ({ posts }) => {
  return (
    <div>
        { posts.map(post => (
            <Post key={post.id} post={post} />
        ))}
    </div>
  )
}

export default Feed