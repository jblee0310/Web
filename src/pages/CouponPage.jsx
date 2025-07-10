// In src/pages/CouponPage.jsx

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { couponsData } from '../couponsData';
import './CouponPage.css';

// --- This is the new, simpler "helper" component for a single coupon ---
function Coupon({ data, isRedeemed, onRedeem }) {
  return (
    // The main container. We add an 'is-redeemed' class when active.
    // This class will change the styles of the button and the overall look.
    <div className={`coupon-container ${isRedeemed ? 'is-redeemed' : ''}`}>
      <div className="coupon-header" style={{ borderTopColor: data.accentColor }}>
        <h3>{data.title}</h3>
      </div>
      <div className="coupon-body">
        <p>{data.description}</p>
      </div>
      <div className="coupon-footer">
        {/* 
          We use a conditional render here.
          If it's redeemed, show a "Redeemed" span.
          If not, show the "Redeem" button.
        */}
        {isRedeemed ? (
          <span className="redeemed-text">✓ 사용완료</span>
        ) : (
          <button className="redeem-btn" onClick={onRedeem}>쿠폰 받기</button>
        )}
      </div>
    </div>
  );
}


// --- The main page component logic is unchanged ---
function CouponPage() {
  const [redeemedState, setRedeemedState] = useState({});

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('redeemedCoupons'));
    if (savedState) {
      setRedeemedState(savedState);
    }
  }, []);

  const handleRedeem = (couponId) => {
    // Only allow redeeming if it's not already redeemed
    if (!redeemedState[couponId]) {
      const newState = {
        ...redeemedState,
        [couponId]: true,
      };
      setRedeemedState(newState);
      localStorage.setItem('redeemedCoupons', JSON.stringify(newState));
    }
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to reset all redeemed coupons?")) {
      setRedeemedState({});
      localStorage.removeItem('redeemedCoupons');
    }
  };

  return (
    <>
      <Header />
      <div className="coupon-page-container">
        <h1 className="page-title">언제나 쓸 쑤 있는 쿠폰!</h1>
        <h3 className="page-subtitle">필요할때 사용하세요</h3>
        <p className="page-subsubtitle">*만료일: 12/31/2025* </p>
        
        <div className="coupons-grid">
          {couponsData.map((coupon) => (
            <Coupon
              key={coupon.id}
              data={coupon}
              isRedeemed={redeemedState[coupon.id] || false}
              onRedeem={() => handleRedeem(coupon.id)}
            />
          ))}
        </div>

        {/* <div className="reset-button-container">
          <button className="reset-all-btn" onClick={handleResetAll}>
            Reset All Coupons
          </button>
        </div> */}
      </div>
    </>
  );
}

export default CouponPage;