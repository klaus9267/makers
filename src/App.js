// src/App.js
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from './component/LoginForm';
import SignupForm from './component/SignupForm';
import AuthContainer from './component/AuthContainer';
import Header from './component/Header';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
    }
  }, []);

  const handleLogin = user => {
    setIsLoggedIn(true);
    setUsername(user);
    localStorage.setItem('user', user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
      <div className="container">
        {!isLoggedIn ? (
          <AuthContainer onLogin={handleLogin} />
        ) : (
          <div className="mt-5 text-center">
            <h2>로그인 성공!</h2>
            <p className="lead">환영합니다, {username}님</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
