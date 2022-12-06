import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//import  './auth.css';

function Login() {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
     const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        email,
        password,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    login
    </>
    // <div className='register'>
    //   <h1 className='title'>Login</h1>
    //   <form className='authForm' onSubmit={login}>
    //     <label htmlFor="email">
    //       email:
    //       <input name="email" type="email" placeholder="email" required />
    //     </label>
    //     <br />
    //     <label htmlFor="password">
    //       password:
    //       <input
    //         name="password"
    //         type="password"
    //         placeholder="password"
    //         required
    //       />
    //     </label>
    //     <br />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
}

export default Login;