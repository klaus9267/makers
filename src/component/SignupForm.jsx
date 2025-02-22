// src/component/SignupForm.jsx
import { useState, useEffect } from 'react';

const SignupForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateEmail = email => {
    if (!email) {
      setErrors(prev => ({ ...prev, email: '이메일을 입력해주세요.' }));
      setIsValid(prev => ({ ...prev, email: false }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors(prev => ({ ...prev, email: '유효한 이메일 형식이 아닙니다.' }));
      setIsValid(prev => ({ ...prev, email: false }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
      setIsValid(prev => ({ ...prev, email: true }));
    }
  };

  const validatePassword = password => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
      setIsValid(prev => ({ ...prev, password: false }));
    } else if (password.length < 4) {
      setErrors(prev => ({ ...prev, password: '비밀번호는 4자 이상이어야 합니다.' }));
      setIsValid(prev => ({ ...prev, password: false }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
      setIsValid(prev => ({ ...prev, password: true }));
    }
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '비밀번호를 다시 입력해주세요.' }));
      setIsValid(prev => ({ ...prev, confirmPassword: false }));
    } else if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다.' }));
      setIsValid(prev => ({ ...prev, confirmPassword: false }));
    } else {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
      setIsValid(prev => ({ ...prev, confirmPassword: true }));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  useEffect(() => {
    if (touched.email) validateEmail(formData.email);
    if (touched.password) validatePassword(formData.password);
    if (formData.confirmPassword) validateConfirmPassword(formData.password, formData.confirmPassword);
  }, [formData, touched]);

  const handleSubmit = async e => {
    e.preventDefault();

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!formData.username.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('유효한 이메일을 입력해주세요.');
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.some(user => user.email === formData.email)) {
        alert('이미 사용중인 이메일입니다.');
        return;
      }

      if (users.some(user => user.username === formData.username)) {
        alert('이미 사용중인 아이디입니다.');
        return;
      }

      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      onToggleForm();
    } catch (error) {
      console.error('회원가입 처리 중 오류 발생:', error);
      alert('회원가입 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center mb-4">회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">아이디</label>
              <input type="text" name="username" className="form-control" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">이메일</label>
              <input type="email" name="email" className={`form-control ${touched.email ? (errors.email ? 'is-invalid' : isValid.email ? 'is-valid' : '') : ''}`} value={formData.email} onChange={handleChange} required />
              {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">비밀번호</label>
              <input type="password" name="password" className={`form-control ${touched.password ? (errors.password ? 'is-invalid' : isValid.password ? 'is-valid' : '') : ''}`} value={formData.password} onChange={handleChange} required />
              {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">비밀번호 확인</label>
              <input type="password" name="confirmPassword" className={`form-control ${formData.confirmPassword ? (errors.confirmPassword ? 'is-invalid' : isValid.confirmPassword ? 'is-valid' : '') : ''}`} value={formData.confirmPassword} onChange={handleChange} required />
              {formData.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              가입하기
            </button>

            <p className="text-center mb-0">
              이미 계정이 있으신가요?{' '}
              <button type="button" className="btn btn-link p-0" onClick={onToggleForm}>
                로그인
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
