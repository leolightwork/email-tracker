import '../styles/main-card.css';
import { Link, useLocation } from 'react-router-dom';

const ToggleBar = () => {
  const location = useLocation();
  const isCreate = location.pathname ==='/' || location.pathname.endsWith('/create') 
  return (
    <>
      <div className="card-header app-nav">
        
        <Link
          to="/create"
          className={isCreate ? 'active-tab' : ''}
        >
          Create
        </Link>
        <Link
          to="/list"
          className={location.pathname.endsWith('/list') ? 'active-tab' : ''}
        >
          Email List
        </Link>
      
      </div>
    </>
  );
};

export default ToggleBar;
