import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div>
      <div className="top-bar">
        <h1>
          Cinema XIX
        </h1>
      </div>
      <div className="l-wrap">
        <div className="l-sidebar-article"></div>
        <div className="l-main-article">
            <form method="POST" action="http://localhost:8000/login">
              <input type="hidden" name="_token" value="DW0JUfuP9BITbJ3Q1RJZKAnqOrwziBBJ5Q8Fc2P5" />          
              <div className="group">
                <input id="username" type="text" name="username" required />
                <label for="username">Username</label>
                <div className="bar"></div>
              </div>


              <div className="group">
                <input id="password" type="password" name="password" required />
                <label for="password">Password</label>
                <div className="bar"></div>
              </div>


              <div>
                <button type="submit">
                  Login
                </button>
                <Link to="/register" className="button">
                  Register
                </Link>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}
