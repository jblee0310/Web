// In src/pages/LettersGridPage.jsx

import { useState } from 'react';
import Header from '../components/Header';
import { lettersData } from '../nletter'; // Import your letters
import './NGridPage.css';

// --- This is the "helper" component for a single letter box ---
function LetterBox({ letter, isOpen, onClick }) {
  return (
    <div className={`letter-box ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="letter-title-container">
        {/* The title from the container can be simpler now, or use letter.title */}
        <h3>{letter.title}</h3> 
        <div className="arrow-icon">{isOpen ? '−' : '+'}</div>
      </div>
      
      <div className="letter-expandable-content">
        <div className="letter-body">
          {/* --- THIS IS THE KEY CHANGE --- */}
          {/* We now render each part of the letter */}
          {/* <h4 className="letter-full-title">{letter.title}</h4> */}
          <p className="letter-main-body">{letter.body}</p>
          <p className="letter-final-thought">{letter.finalThought}</p>
        </div>
      </div>
    </div>
  );
}


// --- This is the main page component ---
function LettersGridPage() {
  // This state variable will hold the ID of the currently open letter, or null if none are open.
  const [openLetterId, setOpenLetterId] = useState(null);

  // This function is called when a letter box is clicked
  const handleLetterClick = (id) => {
    // If the clicked letter is already open, close it. Otherwise, open it.
    setOpenLetterId(openLetterId === id ? null : id);
  };

  return (
    <>
      <Header />
      <div className="letters-page-container">
        <h1 className="page-title">n줄평 모음집</h1>
        <a target = "_" href ="https://m.blog.naver.com/ooeonoo" className="page-subtitle">ooeonoo's Blog</a>
        
        {/* This is the grid that will hold all 17 letter boxes */}
        <div className="letters-grid">
          {lettersData.map((letter) => (
            <LetterBox
              key={letter.id}
              letter={letter}
              isOpen={openLetterId === letter.id} // Pass true if this letter is the open one
              onClick={() => handleLetterClick(letter.id)} // Pass the click handler function
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default LettersGridPage;