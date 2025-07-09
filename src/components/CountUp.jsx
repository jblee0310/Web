// In src/components/CountUpTimer.jsx

import { useState, useEffect } from 'react';
import './CountUp.css';

// The component receives the anniversary date as a "prop"
function CountUpTimer({ startDate }) {
  
  // A function to calculate the time elapsed
  const calculateTimeElapsed = () => {
    // The '+' converts the date objects to numbers (milliseconds)
    const difference = +new Date() - +new Date(startDate);
    let timeElapsed = {};

    if (difference > 0) {
      timeElapsed = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24))+1,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeElapsed;
  };

  // Set up state to hold the calculated time
  const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());

  // Set up an effect to run a timer that updates the state every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000); // Update every second

    // Cleanup function to clear the timer when the component is unmounted
    return () => clearInterval(timer);
  }, [startDate]); // Rerun effect if the start date ever changes

  return (
    <div className="countup-timer">
      {timeElapsed.days !== undefined ? (
        <>
          <div className="time-block">
            <span className="time-value">{timeElapsed.days}</span>
            <span className="time-label">days</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeElapsed.hours}</span>
            <span className="time-label">hours</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeElapsed.minutes}</span>
            <span className="time-label">min</span>
          </div>
          <div className="time-block">
            <span className="time-value">{timeElapsed.seconds}</span>
            <span className="time-label">sec</span>
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default CountUpTimer;