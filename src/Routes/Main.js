import React, { useState} from 'react';
import Layout from '../components/Layout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import login from "../Assets/login.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

export default function Main() {

const navigate = useNavigate();
const [formData, setFormData] = useState({
    email:"",
    password:""
});
const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/register/signin`,{...formData});  
    console.log(response);
    toast.success('SignedIn successfully');
    if(response.data){
        localStorage.setItem("token",response.data);
        navigate("/home");
        //toast.success('SignedIn successfully');
    }
  };

  const [user,setUser] = useState( {
    name: "",
    email: "",
    password: ""
  });
  const register = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/register/signup`, {...user});
      console.log(res);
      toast.success('Registered successfully');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };





  return (
    
         
            <div style={{paddingTop:"100px",paddingLeft:"30px",width:"100%"}}>
              <form onSubmit={handleSubmit}>
              <div style={{border:"2px solid black",borderRadius: "12px",width:"25%",margin:"0 auto",paddingLeft:"40px",paddingBottom:"20px",float:"left",marginTop:"60px"}}>
                <h2 >Signin</h2>
                <h4>Email:</h4>
                <TextField id="outlined-basic" label="Email" variant="outlined" type="email" name="email"  onChange = {(e)=> setFormData({...formData,email:e.target.value})}/>
                <h4>Password:</h4>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" name="password"  onChange = {(e)=> setFormData({...formData,password:e.target.value})}/><br/><br/>
                <Button variant="outlined" type="submit">Login</Button>
              </div>
              </form>

              <div style={{float:"left",paddingLeft:"40px"}}>
              <img src={login} alt="" style={{width: "500px",height: "500px"}}/>
              </div>
              
              
              <div style={{border:"2px solid black",borderRadius: "12px",width:"25%",margin:"0 auto",paddingBottom:"20px",float:"left",marginLeft:"30px",paddingLeft:"50px"}}>
                <form onSubmit={register}>
              <h2 >Signup</h2>
               <h4>Name:</h4>
              <TextField id="outlined-basic" label="Name" variant="outlined" type="text" value={user.name} onChange = {(e)=> setUser({...user,name:e.target.value})} />
                <h4>Email:</h4>
                <TextField id="outlined-basic" label="Email" variant="outlined" type = "email" value={user.email} onChange = {(e)=> setUser({...user,email:e.target.value})} />
                <h4>Password:</h4>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={user.password} onChange = {(e)=> setUser({...user,password:e.target.value})}/><br/><br/>
                <Button variant="outlined" type="submit">Register</Button>
                </form>
              </div>


              
              

              
            </div>

                  

                    
        
    
  )
}
