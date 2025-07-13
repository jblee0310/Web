// In src/components/Header.jsx

import './Header.css'; 
import CountUpTimer from './CountUp';
import { Link } from 'react-router-dom';


function Header() {
  const anniversaryDate = "2025-04-06T23:30:00"; // <--- IMPORTANT: CHANGE THIS DATE!

  return (
    <header className="main-header">
      {/* --- Left-Side Group --- */}
      <Link to="/">주연❤️종빈</Link>
      {/* <a href=".">FILLER</a> */}
      <span className="nav-separator">|</span>


      {/* Give 'x' and 'y' a common class for styling */}
      <Link to="/n줄평" className="nav-button">종빈이의 n줄평</Link>
      <Link to="/coupon" className="nav-button">쿠폰받기</Link>
      
      {/* --- Right-Side Item --- */}
      {/* Give 'z' the common class AND a special class for positioning */}
      <Link to="/tmi" className="nav-button">TMI 방출하기</Link>
      <div className="timer-container">
        <CountUpTimer startDate={anniversaryDate} />
      </div>
    </header>
  );
}

export default Header;