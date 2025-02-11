import React from 'react'
import { NavLink } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='error_page'>
      <h2>Error page</h2>
      <NavLink to="/">Home page</NavLink>
    </div>
  )
}

export default ErrorPage
