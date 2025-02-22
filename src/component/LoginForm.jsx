// src/component/LoginForm.jsx
import { useState } from 'react';

const LoginForm = ({ onSubmit, onToggleForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === formData.username && u.password === formData.password);

    if (user) {
      onSubmit(formData.username);
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">로그인</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">아이디</label>
              <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">비밀번호</label>
              <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              로그인
            </button>
            <p className="text-center mb-0">
              계정이 없으신가요?{' '}
              <button type="button" className="btn btn-link p-0" onClick={onToggleForm}>
                회원가입
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
