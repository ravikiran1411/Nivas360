import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DataContext } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [currentState, setCurrentState] = useState("Login")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const { backendUrl, setToken } = useContext(DataContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register",{name,email,password})
        if (response.data.success) {
          localStorage.setItem("token", response.data.token)
          setToken(response.data.token)
          toast.success("Account Created Successfully")
          navigate("/")
        } 
        else {
          toast.error(response.data.message)
        }
      }

      else {
        const response = await axios.post(backendUrl + "/api/user/login",{email,password})
        if (response.data.success) {
          localStorage.setItem("token", response.data.token)
          setToken(response.data.token)
          toast.success("Login Successful")
          navigate("/")
        } 
        else {
          toast.error(response.data.message)
        }
      }
    } 
    catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/")
    }
  }, [navigate])

  return (
    <form onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' >

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-semibold'>{currentState}</p>
      </div>

      {currentState === "Sign Up" && (
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" required
          className='w-full px-3 py-2 border border-gray-800'placeholder="Username" />
      )}

      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"
        className='w-full px-3 py-2 border border-gray-800' placeholder="Email" required />

      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password"
        className='w-full px-3 py-2 border border-gray-800' placeholder="Password" required />

      <div className='w-full flex justify-between text-sm'>
        <p className="cursor-pointer text-blue-600" onClick={() => navigate("/forgot-password")} >
          Forgot Password?
        </p>

        {currentState === "Login" ? (
          <p className='cursor-pointer text-blue-600' onClick={() => setCurrentState("Sign Up")} >
            Create account
          </p>

        ) : (

          <p className='cursor-pointer text-blue-600' onClick={() => setCurrentState("Login")} >
            Already have account?
          </p>

        )}

      </div>

      <button type="submit" className='bg-black text-white cursor-pointer font-light px-8 py-2 mt-4'>
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>

    </form>
  )
}

export default Login;