// In src/pages/DiscoveryPage.jsx

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ResultsDisplay from '../components/ResultsDisplay';
import { discoveryItems, myChoices } from '../discoveryData';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './DiscoveryPage.css';

function DiscoveryPage() {
  const [herChoices, setHerChoices] = useState(null);
  const [votedItems, setVotedItems] = useState(new Set());
  const [mode, setMode] = useState('loading');

  // --- DATABASE & HANDLER FUNCTIONS (These are all correct and remain the same) ---
  useEffect(() => {
    const docRef = doc(db, "preferences", "girlfriendChoices");
    const fetchHerChoices = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && Object.keys(docSnap.data()).length >= discoveryItems.length) {
        setHerChoices(docSnap.data());
        setMode('results');
      } else {
        setHerChoices(docSnap.data() || {});
        setMode('discovering');
      }
    };
    fetchHerChoices();
  }, []);

  const saveHerChoices = async (finalChoices) => {
    const docRef = doc(db, "preferences", "girlfriendChoices");
    await setDoc(docRef, finalChoices, { merge: true });
  };
  
  const handleChoice = (item, choice) => {
    const newChoices = { ...herChoices, [item]: choice };
    setHerChoices(newChoices);
    setVotedItems(new Set(votedItems).add(item));
    if (Object.keys(newChoices).length >= discoveryItems.length) {
      saveHerChoices(newChoices);
      setMode('results');
    }
  };
  
  const handleModifyChoice = (item, choice) => {
    const newChoices = { ...herChoices, [item]: choice };
    setHerChoices(newChoices);
    saveHerChoices(newChoices);
  };
  
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all choices? This cannot be undone.")) {
      const docRef = doc(db, "preferences", "girlfriendChoices");
      setDoc(docRef, {});
      setHerChoices({});
      setVotedItems(new Set());
      setMode('discovering');
    }
  };


  // --- RENDER LOGIC (This is where the major change is) ---

  // Loading state remains the same
  if (mode === 'loading') {
    return <div className="loading-screen">Loading Preferences...</div>;
  }
  
  // Discovering state remains the same
  if (mode === 'discovering') {
    // ... (Your existing JSX for the discovery grid is fine here)
    const itemsToDiscover = discoveryItems.filter(item => !herChoices.hasOwnProperty(item));
    if (itemsToDiscover.length === 0 && Object.keys(herChoices).length > 0) {
        setMode('results');
        return null;
    }
    return (
      <>
        <Header />
        <div className="discovery-page-container">
          <div className="discovery-header">
            <h1>What Are Your Preferences?</h1>
            <p>Choose Like (✓) or Dislike (✗) for each item. Your choices will be saved automatically.</p>
          </div>
          <div className="discovery-grid">
            {itemsToDiscover.map(item => (
              <div key={item} className={`discovery-item ${votedItems.has(item) ? 'voted' : ''}`}>
                <span className="item-text">{item}</span>
                <div className="button-group">
                  <button className="like-btn" onClick={() => handleChoice(item, true)}>✓</button>
                  <button className="dislike-btn" onClick={() => handleChoice(item, false)}>✗</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // --- THIS IS THE NEW, CORRECTED RENDER LOGIC FOR RESULTS & MODIFY ---
  if (mode === 'results' || mode === 'modify') {
    return (
      // We use a Fragment <>...</> to return multiple top-level elements
      <>
        {/* The main page content */}
        <div className="preferences-page-container">
          <Header />
          <ResultsDisplay 
            myChoices={myChoices} 
            herChoices={herChoices} 
            // The button's only job now is to set the mode to 'modify'
            onModifyClick={() => setMode('modify')}
          />
        </div>

        {/* 
          The Modify Overlay is now a SIBLING to the main container.
          This lets it float over the entire page without being constrained.
        */}
        {mode === 'modify' && (
          <div className="modify-overlay">
            <section className="modify-section">
              <div className="modify-header">
                <h2>Modify Her Choices</h2>
                {/* The close button now sets the mode back to 'results' */}
                <button className="close-modify-btn" onClick={() => setMode('results')}>
                  ×
                </button>
              </div>
              <div className="modify-grid">
                {discoveryItems.map(item => (
                  <div key={item} className="modify-item">
                    <span>{item}</span>
                    <div className="modify-buttons">
                      <button onClick={() => handleModifyChoice(item, true)} className={herChoices[item] === true ? 'active' : ''}>Like</button>
                      <button onClick={() => handleModifyChoice(item, false)} className={herChoices[item] === false ? 'active' : ''}>Dislike</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleReset} className="reset-btn">Reset All Choices</button>
            </section>
          </div>
        )}
      </>
    );
  }
}

export default DiscoveryPage;