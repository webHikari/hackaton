import styles from './Login.module.css'
import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import URL from '../../config/URL'

export default function Login({setAuth}) {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })

  const {username, password} = inputs

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
        const body = { username, password };

        const response = await fetch(URL() + 'auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const parseRes = await response.json();
        localStorage.setItem('token', parseRes.token);
        setAuth(true)
    } catch (err) {
        console.error(err.message);
    }
};

  return (
    <form className={styles.LoginForm} onSubmit={onSubmitForm}>
      <h1>Login form</h1>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        name="username"
        id="username"
        onChange={(e) => onChange(e)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        name="password"
        id="password"
        onChange={(e) => onChange(e)}
      />
      <p>No account? <Link to="/register">Register now</Link></p>
      <button type="submit">Submit</button>
    </form>
  );
}
