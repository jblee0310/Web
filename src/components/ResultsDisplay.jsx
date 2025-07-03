import { discoveryItems } from '../discoveryData';
import './ResultsDisplay.css';

// The component now only needs a simple onClick handler prop
function ResultsDisplay({ myChoices, herChoices, onModifyClick }) {
  
  const likes = { mine: [], shared: [], hers: [] };
  const dislikes = { mine: [], shared: [], hers: [] };

  if (herChoices) {
    discoveryItems.forEach(item => {
      const myVote = myChoices[item];
      const herVote = herChoices[item];
      if (myVote === true && herVote === true) likes.shared.push(item);
      else if (myVote === true) likes.mine.push(item);
      else if (herVote === true) likes.hers.push(item);
      if (myVote === false && herVote === false) dislikes.shared.push(item);
      else if (myVote === false) dislikes.mine.push(item);
      else if (herVote === false) dislikes.hers.push(item);
    });
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h1 className="preference-title">Our Preferences</h1>
        {/* This button's only job is to call the function passed from the parent */}
        <button className="modify-btn" onClick={onModifyClick}>
          Modify
        </button>
      </div>
      
      <section className="preference-section">
        <h2>Things We Love ❤️</h2>
        <div className="columns-container">
          <div className="preference-column"><h3>You</h3><ul>{likes.mine.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div className="preference-column shared"><h3>Us</h3><ul>{likes.shared.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div className="preference-column"><h3>Her</h3><ul>{likes.hers.map(i => <li key={i}>{i}</li>)}</ul></div>
        </div>
      </section>

      {/* DISLIKES SECTION */}
      <section className="preference-section">
        <h2>Things We Don't 💔</h2>
        <div className="columns-container">
          <div className="preference-column"><h3>You</h3><ul>{dislikes.mine.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div className="preference-column shared"><h3>Us</h3><ul>{dislikes.shared.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div className="preference-column"><h3>Her</h3><ul>{dislikes.hers.map(i => <li key={i}>{i}</li>)}</ul></div>
        </div>
      </section>
    </div>
  );
}

export default ResultsDisplay;