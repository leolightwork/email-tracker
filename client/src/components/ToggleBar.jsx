import '../styles/main-card.css';

const ToggleBar = ({ setView, view }) => {
  return (
    <>
      <div className="card-header">
        <button
          onClick={() => setView('create')}
          className={view === 'create' ? 'active-tab' : ''}
        >
          Create
        </button>
        
        <button
          onClick={() => setView('list')}
          className={view === 'list' ? 'active-tab' : ''}
        >
          Email List
        </button>
      </div>
    </>
  );
};

export default ToggleBar;
