import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MainCard from './MainCard.jsx';
import EmailList from './EmailList.jsx';
import '../styles/global.css';
import '../styles/header.css';

const Sidebar = () => {
  const location = useLocation();
  const isCreate = location.pathname === '/' || location.pathname === '/create';
  const isList = location.pathname === '/list';

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">✈</span>
        <span className="logo-text">MailPilot</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/create" className={`nav-link${isCreate ? ' active' : ''}`}>
          <span className="nav-icon">✉</span>
          Create
        </Link>
        <Link to="/list" className={`nav-link${isList ? ' active' : ''}`}>
          <span className="nav-icon">☰</span>
          Email List
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/signup" className="auth-link">Sign Up</Link>
      </div>
    </aside>
  );
};

const App = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainCard />} />
          <Route path="/create" element={<MainCard />} />
          <Route path="/list" element={<EmailList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
