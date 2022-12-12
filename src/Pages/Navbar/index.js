import axios from 'axios';
import jwt from 'jsonwebtoken';
import {useNavigate,Link} from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import toast from 'react-hot-toast';
//import { Link } from '@mui/material';
import "./Navbar.css";
import EditProfile from "../EditProfile";
//import {HashLink as Link} from "react-router-hash-link"
export default function Navbar() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  //const { verifyAuth } = useContext(AuthContext);

  // const getUser = async () => {
  //   try {
  //     const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/me`);
  //     setUser(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  useEffect(() => {
    async function getUser() {
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/");
        } else {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/me` ,
        {
            headers : {
                accesstoken : localStorage.getItem("token"),

        }
    });
        console.log(response.data);
        setUser(response.data);

        }
        
    }
    getUser();
    }, []);
    const logout = async () => {
      await localStorage.removeItem("token");
      toast.success('LoggedOut successfully');
      navigate('/')
    }

  if (!user) return null;
  return (
    <header>
    <div style={{display:"flex"}}>
      <AccountCircleIcon className='userIcon'/>
      <div>
        <h2 style={{fontSize: "3rem"}}>{user.name}</h2>
        <p style={{fontSize: "1.8rem"}}>{user.email}</p>
        <Link to ="/editprofile" className='editBtn'>Edit</Link>
      </div>
    </div>
    <nav>
    <button type="button" className='logout' onClick={logout}>
      logout
    </button>
    </nav>
    </header>
  )
}
