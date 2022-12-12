import axios from 'axios';
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import TaskItem from '../TaskItem';
import  './TaskList.css';
import jwt from 'jsonwebtoken';
import {useNavigate} from "react-router-dom";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();

  // const getTasks = async () => {
  //   try {
  //     const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/tasks/myTask`);
  //     setTaskList(
  //       data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    async function getTasks() {
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/");
        } else {
            //const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/me` ,
            const {data}= await axios.get(`${process.env.REACT_APP_BASE_URL}/tasks/myTask`,
            
        {
            headers : {
                accesstoken : localStorage.getItem("token"),

        }
    });
        // console.log(response.data);
        setTaskList(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        )

        }
        
    }
    getTasks();
    }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/");
        } 
        else 
        {
                    //const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/me` ,
                    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/tasks/`, { 
                      title: newTask

                    },                {
                      headers : {
                          accesstoken : localStorage.getItem("token"),
  
                  }
                  })
                  //toast.success('New task added'),
                    

                    // console.log(response.data);
                    
                  setIsAddingNew(false);
                  setNewTask('');
                  setTaskList([{ ...data }, ...taskList]);

        }
        
    }
    
    // if (newTask.length <= 0) {
    //   toast.error('Task is empty');
    //   return;
    
      
    // }
  //   try {
      
  //     const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/tasks/`, { 
  //       title: newTask,
  //     });
  //     toast.success('New task added');
  //     setIsAddingNew(false);
  //     setNewTask('');
  //     setTaskList([{ ...data }, ...taskList]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const deleteTask = async (id) => {
    const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/");
        } else {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`,
      {
        headers : {
            accesstoken : localStorage.getItem("token"),

    }
});
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
    } 
  };

  return (
    <div>
      <div className='topBar'>
        <button
          type="button"
          className='addNew'
          onClick={addNewButtonClick}
        >
          Add New
        </button>
      </div>
      {isAddingNew && (
        <form className='addNewForm' onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
          />
          <button type="submit">Add</button>
        </form>
      )}
      {taskList.length > 0 ? (
        <table className='taskList_table'>
          <tbody>
            {taskList.map((task) => (
              <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
            ))}
          </tbody>
        </table>
      ) : (
        'No Task Found. Create a new task'
      )}
    </div>
  );
}

export default TaskList;
