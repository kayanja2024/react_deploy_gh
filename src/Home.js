import Feed from './Feed';
import React from 'react'

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main className='Home'>
        {/* {posts.length ? (
          <Feed posts={posts} />
        ) : (
            <p style={{marginTop: '2rem'}}>
              No posts to display.

            </p>
        )} */}
        {isLoading && <p className='statusMsg'>Loading posts...</p>}
        {fetchError && <p className='statusMsg' style={{color: 'red'}}>{fetchError}</p>}
        {!isLoading && !fetchError && (posts.length ? <Feed 
        posts={posts} /> : <p className='statusMsg'>No Post To Display </p>)}
    </main>
  )
}

export default Home