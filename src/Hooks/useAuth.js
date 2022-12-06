import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useAuth ()  {
  const [auth, setAuth] = useState();

  const verifyAuth = async () => {
    console.log(process.env.REACT_APP_BASE_URL);
    try {
      
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/is_logged_in`)
      return res.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    (
      async () => {
        const data = await verifyAuth();
        setAuth(data);
      }
    )();
  }, []);

  return { auth };
};

// const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/employees`);