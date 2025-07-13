import { discoveryItems } from '../DiscoveryData';
import './ResultsDisplay.css';
import Header from '../components/Header.jsx';


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
        <Header />
        <h1 className="preference-title">TMI 결과</h1>
        {/* This button's only job is to call the function passed from the parent */}
        <button className="modify-btn" onClick={onModifyClick}>
          변경하기
        </button>
      </div>
      
      <section className="preference-section">
        <div className="columns-container">
          <div className="preference-column"><h3>종빈</h3><ul>{likes.mine.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div className="preference-column shared"><h3>공통</h3><ul>{likes.shared.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div className="preference-column"><h3>주연</h3><ul>{likes.hers.map(i => <li key={i}>{i}</li>)}</ul></div>
        </div>
      </section>

    </div>
  );
}

export default ResultsDisplay;