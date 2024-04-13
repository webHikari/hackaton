import styles from './Register.module.css'
import {Link} from 'react-router-dom'
import URL from '../../config/URL'
import { useState } from 'react';


export default function Register({setAuth}) {
  const [inputs, setInputs] = useState({
    password: '',
    username: '',
  });

  const { password, username } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
        const body = { username, password };

        const response = await fetch(
            URL() + 'auth/register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        );
        const parseRes = await response.json();
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
    } catch (err) {
        console.error(err.message);
    }
};

  return (
    <form className={styles.RegisterForm} onSubmit={onSubmitForm}>
      <h1>Register form</h1>
      <input 
        type="text" 
        placeholder="Username" 
        name="username"
        id="username"
        value={username}
        onChange={onChange}
      />
      <input 
        type="password" 
        placeholder="Password" 
        name="password"
        id="password"
        value={password}
        onChange={onChange}
      /> 
      <p>Already registered? <Link to="/login">Sign in</Link></p>
      <button type="submit">Submit</button>
    </form>
  );
}
