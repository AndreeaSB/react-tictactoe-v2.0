import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function SignUp() {

    const URL = 'http://localhost:3000'
    const cookies = new Cookies()
    
    const [user, setUser] = useState(null)

    const signUp = () => {
        console.log('client signup fct')
        
        axios.post(`${URL}/signup`, user).then( (res) => {
            console.log(res.data)
            const {token, userId, firstName, lastName, username, hashPassword} = res.data
            cookies.set('token', token)
            cookies.set('firstName', firstName)
            cookies.set('userId', userId)
            cookies.set('lastName', lastName)
            cookies.set('username', username)
            cookies.set('hashPassword', hashPassword)
        })
    }

  return (
    <div className='signUp'>
        <label>Sign Up</label>
        <input placeholder='First name' onChange={(event) =>{
            setUser( {...user, firstName: event.target.value})
        }} />

        <input placeholder='Last name' onChange={(event) =>{
            setUser( {...user, lastName: event.target.value})
        }} />

        <input placeholder='Username' onChange={(event) =>{
            setUser( {...user, username: event.target.value})
        }} />

        <input placeholder='Password' type='password' onChange={(event) =>{
            setUser( {...user, password: event.target.value})
        }} />
        <button onClick={() => signUp()}>Sign Up</button>
    </div>
  )
}

export default SignUp