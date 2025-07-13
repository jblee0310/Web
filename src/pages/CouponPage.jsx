// In src/pages/CouponPage.jsx

import { useState, useEffect } from 'react';
import Header from '../components/Header';
// Import both sets of coupons
import { couponsData, reverseCouponsData } from '../couponsData'; 
import './CouponPage.css';

// The Coupon component is now smarter
function Coupon({ data, isRedeemed, onRedeem }) {
  // Determine button text and class based on the coupon type
  const isReverse = data.type === 'reverse';
  const buttonText = isReverse ? '미션 완료!' : '쿠폰 받기';

  return (
    // We add a 'reverse' class for special styling
    <div className={`coupon-container ${isRedeemed ? 'is-redeemed' : ''} ${isReverse ? 'reverse' : ''}`}>
      <div className="coupon-header" style={{ borderTopColor: data.accentColor }}>
        <h3>{data.title}</h3>
      </div>
      <div className="coupon-body">
        <p>{data.description}</p>
      </div>
      <div className="coupon-footer">
        {isRedeemed ? (
          <span className="redeemed-text">✓ 사용완료</span>
        ) : (
          <button className="redeem-btn" onClick={onRedeem}>{buttonText}</button>
        )}
      </div>
    </div>
  );
}

function CouponPage() {
  const [redeemedState, setRedeemedState] = useState({});
  // This new state controls the visibility of the reverse coupons
  const [showReverseCoupons, setShowReverseCoupons] = useState(false);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('redeemedCoupons'));
    if (savedState) {
      setRedeemedState(savedState);
    }
  }, []);

  const handleRedeem = (couponId) => {
    if (!redeemedState[couponId]) {
      const newState = { ...redeemedState, [couponId]: true };
      setRedeemedState(newState);
      localStorage.setItem('redeemedCoupons', JSON.stringify(newState));
    }
  };

  const handleResetAll = () => { /* ... unchanged ... */ };

  return (
    <>
      <Header />
      <div className="coupon-page-container">
        <h1 className="page-title">언제나 쓸 쑤 있는 쿠폰!</h1>
        <h3 className="page-subtitle">필요할때 사용하세요</h3>
        <p className="page-subsubtitle">*만료일: 12/31/2025*</p>
        
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

        {/* --- REVEAL BUTTON & REVERSE COUPON SECTION --- */}
        <div className="reveal-section">
          {/* This button will only show if the reverse coupons are hidden */}
          {!showReverseCoupons && (
            <button className="reveal-btn" onClick={() => setShowReverseCoupons(true)}>
              클릭하지 마시오
            </button>
          )}

          {/* This section will only render if the state is true */}
          {showReverseCoupons && (
            <div className="reverse-coupons-container">
              <h2 className="reverse-title">버튼 누른 벌칙!</h2>
              <h3 className="page-subtitle">종빈이가 쓸 수 있는 쿠폰!!! (오예~)</h3>
              <p className="page-subsubtitle">*만료일: 없음*</p>

              <div className="coupons-grid">
                {reverseCouponsData.map((coupon) => (
                  <Coupon
                    key={coupon.id}
                    data={coupon}
                    isRedeemed={redeemedState[coupon.id] || false}
                    onRedeem={() => handleRedeem(coupon.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CouponPage;