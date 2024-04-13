import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import URL from './config/URL.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const isAuth = async () => {
    try {
      const response = await fetch(
        URL() + 'auth/is-verify',
        {
          method: 'GET',
          headers: {token: localStorage.token},
        }
      );
      const parseRes = await response.json()
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {isAuth()});

  return (
    <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth} />) : (<Navigate to="/dashboard" />)} />
          <Route path="/dashboard" element={!isAuthenticated ? (<Navigate to="/login" />) : (<Dashboard setAuth={setAuth} />)} />
          <Route path="/register"  element={!isAuthenticated ? (<Register setAuth={setAuth} />) : (<Navigate to="/dashboard" />)}/>
          <Route exact path="/" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  )
}

export default App
