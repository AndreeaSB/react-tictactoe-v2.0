/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios"
import { useState } from "react"
import Cookies from "universal-cookie"

function Login({setIsAuth}) {

  const URL = 'http://localhost:3000'
    const cookies = new Cookies()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
      axios.post(`${URL}/login`, { username, password}). then((res) => {
        
        const {token, firstName, lastName, username, userId} = res.data
            cookies.set('token', token)
            cookies.set('firstName', firstName)
            cookies.set('lastName', lastName)
            cookies.set('username', username)
            cookies.set('userId', userId)
            setIsAuth(true)
      })

    }

  return (
    <div className='login'>
        <label>Login</label>

        <input placeholder='Username' onChange={(event) =>{
            setUsername( event.target.value)
        }} />

        <input placeholder='Password' onChange={(event) =>{
            setPassword( event.target.value)
        }} />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login