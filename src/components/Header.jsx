// In src/components/Header.jsx

import './Header.css'; 
import CountUpTimer from './CountUp';

function Header() {
  const anniversaryDate = "2025-04-06T23:30:00"; // <--- IMPORTANT: CHANGE THIS DATE!

  return (
    <header className="main-header">
      {/* --- Left-Side Group --- */}
      {/* <a href=".">주연❤️종빈</a> */}
      <a href=".">FILLER</a>
      <span className="nav-separator">|</span>


      {/* Give 'x' and 'y' a common class for styling */}
      <a href="/n줄평" className="nav-button">종빈이의 n줄평</a>
      <a href="/timeline" className="nav-button">Timeline</a>
      
      {/* --- Right-Side Item --- */}
      {/* Give 'z' the common class AND a special class for positioning */}
      <a href="/our-preference" className="nav-button">취향테스트</a>
      <div className="timer-container">
        <CountUpTimer startDate={anniversaryDate} />
      </div>
    </header>
  );
}

export default Header;