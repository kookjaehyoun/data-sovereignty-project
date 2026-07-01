import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

interface Case {
  id: number;
  title: string;
  description: string;
  category: string;
  reported_date: string;
  status: string;
}

function CaseList() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await apiClient.get('/cases');
        setCases(response.data);
      } catch (err) {
        setError('사례를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="case-list">
      <h1>데이터 주권 침해 사례</h1>
      <Link to="/submit" className="btn btn-primary">새 제보 제출</Link>
      <div className="cases">
        {cases.map((c) => (
          <div key={c.id} className="case-card">
            <h3>{c.title}</h3>
            <p>{c.description.substring(0, 100)}...</p>
            <p><strong>카테고리:</strong> {c.category}</p>
            <p><strong>상태:</strong> <span className={`status ${c.status}`}>{c.status}</span></p>
            <Link to={`/case/${c.id}`} className="btn btn-secondary">자세히 보기</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseList;
