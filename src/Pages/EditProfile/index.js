import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
//import classes from './EditProfileForm.module.scss';
import './EditProfile.css';
import jwt from 'jsonwebtoken';


function EditProfile() {
const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

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

//   useEffect(() => {
//     (
//       async () => {
//         try {
//           const { data } = await axios.get('/api/users/me');
//           setUser(data);
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     )();
//   }, []);



  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/");
        } else {
    
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/me`, user,
      {
        headers : {
            accesstoken : localStorage.getItem("token"),

    }
}
      );
      toast.success('Profile updated successfully');
      setUser(res.data);
    } 
  };

  return (
    <div style={{marginLeft:"550px",marginTop:"100px"}}>
      <Link className="backBtn" to="/home">
        <BsArrowLeftShort />
        Home
      </Link>
      <div>
        <h1>Edit Profile</h1>
        <form className="editForm" onSubmit={updateProfile}>
          <label htmlFor="name">
            Full Name:
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={user.name}
              onChange={updateUserInfo}
            />
          </label>
          <label htmlFor="email">
            email:
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              value={user.email}
              onChange={updateUserInfo}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;