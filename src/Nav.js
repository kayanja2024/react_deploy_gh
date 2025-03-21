import { Link } from 'react-router-dom'
import React from 'react'

const Nav = ({ search, setSearch }) => {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='search'>search Posts</label>
          <input
              id='search' 
              type="text"
              placeholder='search Posts'
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
          />
        </form>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/post">Post</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav