import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

Buttons.propTypes = {
  shuffleArray: PropTypes.func.isRequired,
  cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  cuisineA: PropTypes.string.isRequired,
  setCuisineA: PropTypes.func.isRequired,
  cuisineB: PropTypes.string.isRequired,
  setCuisineB: PropTypes.func.isRequired,
  removeTarget: PropTypes.func.isRequired,
  setGameOver: PropTypes.func.isRequired,
};

function Buttons({
  shuffleArray,
  cuisines,
  cuisineA,
  setCuisineA,
  cuisineB,
  setCuisineB,
  removeTarget,
  setGameOver,
}) {
  const [userLocation, setUserLocation] = useState(null);
  const [toFlyIn, setToFlyIn] = useState(false);
  const [buttonSet, setButtonSet] = useState(1);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  getUserLocation();

  function redirectGoogleMaps(cuisine) {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${cuisine}&location=${userLocation.latitude},${userLocation.longitude}&radius=30000`
    );
  }

  function checkGameOver() {
    if (cuisines.length > 1) {
      shuffleArray(cuisines);
      setCuisineA(cuisines[0]);
      setCuisineB(
        cuisines[Math.floor(Math.random() * (cuisines.length - 1) + 1)]
      );
    } else {
      setCuisineA(cuisines[0]);
      setGameOver(true);
      redirectGoogleMaps(cuisines[0]);
    }
  }

  function resetAnimations() {
    setTimeout(() => {
      setToFlyIn(false);
    }, 250); // Reset animations after 500ms (adjust based on animation duration)
  }

  function handleClick(e) {
    const target = e.target.dataset.remove;
    removeTarget(target);
    checkGameOver();
    setToFlyIn(true);
    setButtonSet(buttonSet + 1);
    resetAnimations();
  }

  return (
    <div className="display block p-5 align-middle">
      <div className="text-center">Round: {buttonSet}/13</div>
      <div className="flex items-center justify-center gap-5 p-5">
        <button
          data-remove={cuisineB}
          onClick={(e) => handleClick(e)}
          className={`${buttonSet % 2 ? 'btn-secondary' : 'btn-primary'} rounded-l-full ${toFlyIn ? 'animate-flyindown' : ''}`}
        >
          {cuisineA}
        </button>
        <p>or..</p>
        <button
          data-remove={cuisineA}
          onClick={(e) => handleClick(e)}
          className={`${buttonSet % 2 ? 'btn-secondary' : 'btn-primary'} rounded-r-full ${toFlyIn ? 'animate-flyindown' : ''}`}
        >
          {cuisineB}
        </button>
      </div>
    </div>
  );
}

export default Buttons;
