import '../styles/email-list.css';
import ToggleBar from './ToggleBar';
import '../styles/main-card.css';
import { useEffect, useState } from 'react';

const EmailList = ({ setView, view }) => {
  const [data, setEmailData] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const toggleSelect = (id) => {
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8080/getemails');
        const data = await res.json();
        console.log(data);
        setEmailData(data);
      } catch {
        console.log('Failed to fetch data...');
      }
    };
    fetchEmails();
  }, []);

  const deleteEmails = async () => {
    try {
      await fetch('http://127.0.0.1:8080/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedEmails }),
      });

      const res = await fetch('http://127.0.0.1:8080/getemails');
      const data = await res.json();
      console.log(data);
      setEmailData(data);

      setSelectedEmails([]);
    } catch {
      console.log('Error deleting emails');
    }
  };
  return (
    <>
      <div className="body-wrapper2">
        <ToggleBar setView={setView} view={view} />

        <div className="form-wrapper2">
          <div className="banner-create">
            {data.length === 0 ? <></> : <h3>Active Email List</h3>}
          </div>
          <div className="main-form2">
            {data.length === 0 ? (
              <p className="no-active-email"> No Active Emails</p>
            ) : (
              data.map((email) => (
                <div className="list-container" key={email.id}>
                  <div className="email-row">
                    <ul>
                      <li>
                        <div className="list-container1">
                          <div className="email-recipients wrap">
                            {email.recipients}
                          </div>
                          <div className="email-course wrap">{email.class}</div>
                          <div className="email-date wrap">
                            Next reminder date: {email.date}
                          </div>
                          <div className="email-date wrap">
                            Recurs Every: {email.repeat} days
                          </div>
                          <input
                            className="checkbox"
                            type="checkbox"
                            checked={selectedEmails.includes(email.id)}
                            onChange={() => toggleSelect(email.id)}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="delete-slot">
          {selectedEmails.length > 0 && (
            <button
              type="simpleQuery"
              className="delete-button"
              onClick={deleteEmails}
              disabled={selectedEmails.length === 0}
            >
              Delete selected {selectedEmails.length} emails
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailList;
