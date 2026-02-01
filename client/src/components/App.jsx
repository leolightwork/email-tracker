import { Routes, Route, Link } from 'react-router-dom';
import MainCard from './MainCard.jsx';
import EmailList from './EmailList.jsx';
// import Signup from '../pages/Signup.jsx';
// import Login from '../pages/Login.jsx';
import '../styles/header.css';

const App = () => {
  return (
    <>
      <div className="nav-wrapper">
        <h1>Email Submission Interface</h1>
        <nav>
          <div className="auth-nav">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      </div>

      <Routes>
        {/* <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route> */}
        <Route path="/" element={<MainCard />} />
        <Route path="/create" element={<MainCard />}></Route>
        <Route path="/list" element={<EmailList />}></Route>
      </Routes>
    </>
  );
};

export default App;
