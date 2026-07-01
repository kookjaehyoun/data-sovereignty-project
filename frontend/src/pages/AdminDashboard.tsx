import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

interface Report {
  id: number;
  case_id: number;
  reporter_name: string;
  description: string;
  status: string;
  created_at: string;
}

interface Stats {
  total_cases: number;
  total_reports: number;
  pending_reports: number;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const reportsResponse = await apiClient.get('/admin/reports', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const statsResponse = await apiClient.get('/admin/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setReports(reportsResponse.data);
        setStats(statsResponse.data);
      } catch (error) {
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/');
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await apiClient.put(`/admin/reports/${id}`, { status: newStatus }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (error) {
      console.error('Failed to update status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말로 이 제보를 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      await apiClient.delete(`/admin/reports/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setReports(reports.filter(r => r.id !== id));
    } catch (error) {
      console.error('Failed to delete report');
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>관리자 대시보드</h1>
        <button onClick={handleLogout} className="btn btn-secondary">로그아웃</button>
      </div>

      {stats && (
        <div className="stats-section">
          <div className="stat-card">
            <h3>전체 사례</h3>
            <p className="stat-number">{stats.total_cases}</p>
          </div>
          <div className="stat-card">
            <h3>전체 제보</h3>
            <p className="stat-number">{stats.total_reports}</p>
          </div>
          <div className="stat-card">
            <h3>대기 중인 제보</h3>
            <p className="stat-number">{stats.pending_reports}</p>
          </div>
        </div>
      )}

      <div className="reports-section">
        <h2>모든 제보</h2>
        <table className="reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>제보자</th>
              <th>내용</th>
              <th>상태</th>
              <th>날짜</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.reporter_name || '익명'}</td>
                <td>{report.description.substring(0, 50)}...</td>
                <td>
                  <select
                    value={report.status}
                    onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  >
                    <option value="pending">대기</option>
                    <option value="reviewing">검토 중</option>
                    <option value="approved">승인</option>
                    <option value="rejected">거부</option>
                  </select>
                </td>
                <td>{new Date(report.created_at).toLocaleDateString('ko-KR')}</td>
                <td>
                  <button onClick={() => handleDelete(report.id)} className="btn btn-danger">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
