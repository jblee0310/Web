// In src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage.jsx';
import LetterPage from './pages/LetterPage.jsx';
import NGridPage from './pages/NGridPage.jsx'; 
import DiscoveryPage from './pages/DiscoveryPage.jsx';
import CouponPage from './pages/CouponPage.jsx';


// Import other pages like StoryPage here later

function App() {
  return (
      <BrowserRouter basename="/Web/">

      <Routes>
        {/* 
          This route says: When the user is at the base URL "/",
          render the <HomePage /> component.
        */}
        <Route path="/" element={<HomePage />} />

        {/* 
          This route says: When the user goes to "/letter",
          render the <LetterPage /> component.
        */}
        <Route path="/letter" element={<LetterPage />} />

        {/* You can add more routes here for other pages */}
        {/* { <Route path="/" element={<StoryPage />} /> } */}
        <Route path="/n줄평" element={<NGridPage />} /> {/* <-- ADD ROUTE */}
        <Route path="/tmi" element={<DiscoveryPage />} />
        <Route path="/timeline" element={<HomePage />} />
        <Route path="/coupon" element={<CouponPage />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;