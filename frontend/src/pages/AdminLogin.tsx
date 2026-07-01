import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/admin/login', credentials);
      localStorage.setItem('admin_token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('사용자명 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-form">
        <h1>관리자 로그인</h1>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>사용자명</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
