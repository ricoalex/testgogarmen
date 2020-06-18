import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';
// import Alert from "../layout/Alert";


const Register = ({ setAlert, register, isAuthenticated }) => {
  const [ formData, setFormData ] = useState({
    username: '',
    pasword: '',
    role: ''
  });

  const { username,password,role } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    register({ username,password,role })
  }

  if(isAuthenticated){
    return <Redirect to='/dashboard' />
  }

 return (
  <Fragment>
      {/* <section className="container">
        {/* <Alert />
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              value={name} 
              onChange={e => onChange(e)} 
               
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email" 
              value={email} 
              onChange={e => onChange(e)} 
            />
            <small className="form-text">This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small>
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              value={password} 
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              name="password2" 
              value={password2} 
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section> */}
      <div>
      <div className="top-bar">
        <h1>
          Register Cinema XIX
        </h1>
      </div>
      <div className="l-wrap">
        <div className="l-sidebar-article"></div>
        <div className="l-main-article">
            <form method="POST" onSubmit={e => onSubmit(e)}>
              <input type="hidden" name="_token" value="DW0JUfuP9BITbJ3Q1RJZKAnqOrwziBBJ5Q8Fc2P5" />          
              <div className="group">
                <input id="username" type="text" name="username" value={username} 
              onChange={e => onChange(e)} required />
                <label for="username">Username</label>
                <div className="bar"></div>
              </div>


              <div className="group">
                <input id="password" type="password" name="password" value={password} 
              onChange={e => onChange(e)} required />
                <label for="password">Password</label>
                <div className="bar"></div>
              </div>

              <div className="group">
                
              <span>Role</span>
                <select id="role" name="role" value={role} 
              onChange={e => onChange(e)} required>
                  <option value=''>--- SELECT YOUR ROLE ---</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>


              <div>
                <Link to='/' className='button'>
                  Back To Login
                </Link>
                <button type='submit' className="button">
                Register
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  </Fragment>
 )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, { setAlert, register })(Register);