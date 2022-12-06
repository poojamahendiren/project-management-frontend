import './App.css';
import {Toaster} from 'react-hot-toast';
import {Routes,Route} from 'react-router-dom';
import Home from './Routes/Home';
import EditProfile from './Routes/EditProfile';
import Auth from './Routes/Auth';
import PrivateRoutes from './components/PrivateRoutes';

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
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
