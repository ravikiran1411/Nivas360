import { useState } from 'react'
import axios from 'axios'
import {backendUrl} from '../App';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Login = ({setAdminToken})=>{

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    localStorage.removeItem("adminToken");

    try {
      const response = await axios.post(backendUrl + '/api/admin/login',{email,password});

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        setAdminToken(response.data.token);
        navigate('/');
      } 
      else {
        toast.error(response.data.message);
      }
    } 
    catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg px-8 py-8 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Nivas360 Admin</h1>

        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <p className="text-sm font-medium mb-1">Email</p>
            <input className='w-full px-3 py-2 border rounded outline-none' value={email}  type="email" required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <p className="text-sm font-medium mb-1">Password</p>
            <input className='w-full px-3 py-2 border rounded outline-none' value={password} type="password" required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className='w-full bg-black text-white py-2 rounded mt-2'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
