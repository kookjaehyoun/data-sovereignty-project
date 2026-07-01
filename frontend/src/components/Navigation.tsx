import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">데이터 주권</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">사례</Link>
          </li>
          <li className="nav-item">
            <Link to="/submit" className="nav-link">제보</Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/login" className="nav-link">관리자</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
