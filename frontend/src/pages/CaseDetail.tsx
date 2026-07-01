import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/api';

interface Case {
  id: number;
  title: string;
  description: string;
  category: string;
  reported_by: string;
  reported_date: string;
  status: string;
}

function CaseDetail() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await apiClient.get(`/cases/${id}`);
        setCaseData(response.data);
      } catch (error) {
        console.error('Failed to fetch case');
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!caseData) return <div>사례를 찾을 수 없습니다.</div>;

  return (
    <div className="case-detail">
      <h1>{caseData.title}</h1>
      <div className="case-meta">
        <p><strong>카테고리:</strong> {caseData.category}</p>
        <p><strong>제보자:</strong> {caseData.reported_by}</p>
        <p><strong>제보일:</strong> {new Date(caseData.reported_date).toLocaleDateString('ko-KR')}</p>
        <p><strong>상태:</strong> {caseData.status}</p>
      </div>
      <div className="case-description">
        <h2>상세 내용</h2>
        <p>{caseData.description}</p>
      </div>
    </div>
  );
}

export default CaseDetail;
