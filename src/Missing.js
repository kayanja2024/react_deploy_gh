import { Link } from 'react-router-dom'
import React from 'react'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Post Not Found </h2>
      <p>Well that's disappointing. </p>
      <p>
        <Link to="/">Visit our Home Page</Link>
      </p>
    </main>
  )
}

export default Missing