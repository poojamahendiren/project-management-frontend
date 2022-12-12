import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import './TaskItem.css';
import jwt from 'jsonwebtoken';
import {useNavigate} from "react-router-dom";


function TaskItem({task, deleteTask}) {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

//   const handleCheckboxClick = async () => {
//     try {
//       setIsLoading(true);
//       await axios.put(`${process.env.REACT_APP_BASE_URL}/tasks/${task._id}`, {
//         completed: !isCompleted,
//       },
//       {
//         headers : {
//             accesstoken : localStorage.getItem("token"),

//     }
// }
//       );
//       setIsCompleted(!isCompleted);
//       toast.success('Task updated successfully');
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };


  const checkBox =async() => {

        //e.preventDefault();
        try{

        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/");
        } 
        else{
            setIsLoading(true);
             await axios.put(`${process.env.REACT_APP_BASE_URL}/tasks/${task._id}`, {
                completed: !isCompleted,
              },
        {
            headers : {
                accesstoken : localStorage.getItem("token"),

        }
    });
        //console.log(response.data);
        setIsCompleted(!isCompleted);
        toast.success('Task updated successfully');

         //handleCheckboxClick();
            
}
   
}
catch(err){
    console.log(err);
     } finally {
      setIsLoading(false);
    }
}
  return (
    <tr className='task_item'>
        <td className='task_name'>
        <div className='checkbox' onChange={checkBox} role="checkbox" aria-checked>
          <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>
        <p>{task.title}</p>
        </td>
        <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td>{moment(task.createdAt).format('MMM Do YY')}</td>
      <td>
        <button
          type="button"
          className='deleteBtn'
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default TaskItem;








//checkbox click
// const handleCheckboxClick = async () => {
//     try {
//       setIsLoading(true);
//       await axios.put(`${process.env.REACT_APP_BASE_URL}/tasks/${task._id}`, {
//         completed: !isCompleted,
//       });
//       setIsCompleted(!isCompleted);
//       toast.success('Task updated successfully');
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };