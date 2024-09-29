import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

Buttons.propTypes = {
  shuffleArray: PropTypes.func.isRequired, // shuffleArray is a required function
  cuisines: PropTypes.arrayOf(PropTypes.string).isRequired, // cuisines is a required array of strings
  cuisineA: PropTypes.string.isRequired, // cuisineA is a required string
  setCuisineA: PropTypes.func.isRequired, // setCuisineA is a required function
  cuisineB: PropTypes.string.isRequired, // cuisineB is a required string
  setCuisineB: PropTypes.func.isRequired, // setCuisineB is a required function
  removeTarget: PropTypes.func.isRequired, // removeTarget is a required function
  setGameOver: PropTypes.func.isRequired, // setGameOver is a required function
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
      `https://www.google.com/maps/search/?api=1&query=${cuisine}&location=${userLocation.latitude},${userLocation.longitude}&radius=10000`
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
    <div className="display block">
      <div className="text-center">Round: {buttonSet}/13</div>
      <div className="flex items-center gap-5 p-10">
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
