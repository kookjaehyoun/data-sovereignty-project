import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

function SubmitReport() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    case_id: '',
    reporter_name: '',
    reporter_email: '',
    description: '',
    evidence: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post('/reports', formData);
      setMessage('제보가 성공적으로 제출되었습니다.');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('제보 제출에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-report">
      <h1>새 제보 제출</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>사례ID (선택)</label>
          <input
            type="text"
            name="case_id"
            value={formData.case_id}
            onChange={handleChange}
            placeholder="기존 사례에 추가할 경우"
          />
        </div>
        <div className="form-group">
          <label>이름 (선택)</label>
          <input
            type="text"
            name="reporter_name"
            value={formData.reporter_name}
            onChange={handleChange}
            placeholder="이름을 입력하세요 (익명 가능)"
          />
        </div>
        <div className="form-group">
          <label>이메일 (선택)</label>
          <input
            type="email"
            name="reporter_email"
            value={formData.reporter_email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label>제보 내용 *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="데이터 침해 내용을 자세히 설명해주세요"
            required
          />
        </div>
        <div className="form-group">
          <label>증거 (선택)</label>
          <textarea
            name="evidence"
            value={formData.evidence}
            onChange={handleChange}
            placeholder="증거자료나 추가 정보를 입력하세요"
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? '제출 중...' : '제보 제출'}
        </button>
      </form>
    </div>
  );
}

export default SubmitReport;
