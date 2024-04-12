import styles from './Register.module.css'
import {Link} from 'react-router-dom'

export default function Register() {
  return (
    <form className={styles.RegisterForm}>
      <h1>Register form</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" /> 
      <p>Already registered? <Link to="/login">Sign in</Link></p>
      <button type="submit">Submit</button>
    </form>
  );
}
