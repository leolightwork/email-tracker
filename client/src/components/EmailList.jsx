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
        const res = await fetch('/getemails');
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
      await fetch('/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: [selectedEmails] }),
      });
      // setEmailData((prev) => {
      //   prev.filter((email) => !selectedEmails.includes(email.id));
      // });
      const res = await fetch('/getemails');
      const data = await res.json();
      console.log(data);
      setEmailData(data);

      setSelectedEmails([])

    } catch {
      console.log('Error deleting emails');
    }
  };
  return (
    <>
      <div className="body-wrapper">
        <ToggleBar setView={setView} view={view} />

        <div className="form-wrapper">
          <div className="banner-create">
            {data.length === 0 ? (<></>) : (<h3>Active Email List</h3>)}
            
          </div>
          <div className="main-form">
            {data.length === 0 ? (
              <p className="no-active-email"> No Active Emails</p>
            ) : (
              data.map((email) => (
                <div className="list-container">
                  <div className="email-row" key={email.id}>
                    <ul>
                      <li>
                        <div className="list-container">
                          <input
                            type="checkbox"
                            checked={selectedEmails.includes(email.id)}
                            onChange={() => toggleSelect(email.id)}
                          />
                          <div className="email-recipients">
                            {email.recipients}
                          </div>
                          <div className="email-course">{email.class}</div>
                          <div className="email-date">Next reminder date: {email.date}</div>
                          <div className="email-date">Recurs Every: {email.repeat} days</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
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
