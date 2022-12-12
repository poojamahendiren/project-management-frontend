import './App.css';
import {Toaster} from 'react-hot-toast';
import {Routes,Route} from 'react-router-dom';
import Home from './Routes/Home';
import EditProfile from './Pages/EditProfile';
//import Auth from './Routes/Auth';
//import PrivateRoutes from './components/PrivateRoutes';
import Main from './Routes/Main';

function App() {
  return (
    <>
    <Toaster
     position="top-right"
     toastOptions={{
       style: {
         fontSize: '1.8rem',
       },
     }}
    />
    <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
