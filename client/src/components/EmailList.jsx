import '../styles/email-list.css';
import ToggleBar from './ToggleBar';
import '../styles/main-card.css';
import { useEffect, useState } from 'react';

const EmailList = ({ setView }) => {
  const [data, setEmailData] = useState([]);
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch('/getemails');
        const data = await res.json();
        console.log(data);
        setEmailData(data);
      } catch (err) {
        console.log('Failed to fetch data...');
      }
    };
    fetchEmails();
  }, []);
 

  return (
    <>
      <div className="body-wrapper">
        <ToggleBar setView={setView} />

        <div className="form-wrapper">
          <div className="banner-create">
            <h3>Active Email List</h3>
          </div>
          <div className="main-form">
            {data.length === 0 ? (
              <p> No Active Emails</p>
            ) : (
              data.map((email) => (
                <div className="email-row" key={email.id}></div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailList;
