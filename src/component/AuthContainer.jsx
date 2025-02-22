// src/component/AuthContainer.jsx
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthContainer = ({ onLogin }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">{isLoginForm ? <LoginForm onSubmit={onLogin} onToggleForm={toggleForm} /> : <SignupForm onToggleForm={toggleForm} />}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
