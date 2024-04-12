import styles from './Login.module.css'
import {Link} from 'react-router-dom'

export default function Login() {
  return (
    <form className={styles.LoginForm}>
      <h1>Login form</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <p>No account? <Link to="/register">Register now</Link></p>
      <button type="submit">Submit</button>
    </form>
  );
}
