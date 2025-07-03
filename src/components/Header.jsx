// In src/components/Header.jsx

import './Header.css'; 

function Header() {
  return (
    <header className="main-header">
      {/* --- Left-Side Group --- */}
      {/* <a href=".">주연❤️종빈</a> */}
      <a href=".">FILLER</a>
      <span className="nav-separator">|</span>

      {/* Give 'x' and 'y' a common class for styling */}
      <a href="/n줄평" className="nav-button">종빈이의 n줄평</a>
      <a href="#timeline" className="nav-button">Timeline</a>
      
      {/* --- Right-Side Item --- */}
      {/* Give 'z' the common class AND a special class for positioning */}
      <a href="/our-preference" className="nav-button nav-item-right">취향테스트</a>
    </header>
  );
}

export default Header;