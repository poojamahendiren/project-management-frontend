import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../Pages/Navbar';
import TaskList from '../Pages/TaskList';
//import TaskItem from '../Pages/TaskItem';
import "./Home.css";
import img from "../Assets/home.png";


export default function Home() {
  return (
    <>
    <div style={{float:"left"}}>
    <img src={img} alt="" style={{width: "400px",height: "400px",paddingTop:"150px",paddingLeft:"20px"}}/>
    </div>
    <div className="container"  >
      <Navbar />
      <TaskList />
    </div>
    </>
  )
}
