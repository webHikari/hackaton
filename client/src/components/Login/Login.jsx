import styles from './Login.module.css'

export default function Login() {
  return (
    <form className={styles.LoginForm}>
      <h1>Login form</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  );
}
