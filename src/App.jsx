import { useState } from 'react';
import './App.css';

const array = [
  'Japanese',
  'French',
  'Korean',
  'Italian',
  'Chinese',
  'Malay',
  'Southern/Northern Indian',
  'Thai',
  'Turkish',
  'Indonesian',
  'Spanish',
  'Mexican',
  'Vietnamese',
  'Greek',
];

function App() {
  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const cuisines = shuffleArray(array);

  const [cuisineA, setCuisineA] = useState(cuisines[0]);
  const [cuisineB, setCuisineB] = useState(
    cuisines[Math.floor(Math.random() * (cuisines.length - 1)) + 1]
  );
  const [userLocation, setUserLocation] = useState(null);
  const [gameOver, setGameOver] = useState(false);

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

  function removeTarget(e) {
    const target = cuisines.findIndex(
      (elem) => elem === e.target.dataset.remove
    );
    cuisines.splice(target, 1);
  }

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

  function handleClick(e) {
    removeTarget(e);
    checkGameOver();
  }

  return (
    <>
      {gameOver ? (
        <div>
          <div>
            <h1>Winning Cuisine: {cuisineA}</h1>
          </div>
          <p>Refresh page to restart</p>
        </div>
      ) : (
        <div className="flex">
          <div className="max-w-[600px] border-r border-black">
            <h1 className="text-2xl font-bold">What To Eat?</h1>
            <p className="py-5">
              This app helps you figure out what to eat. Perfect for those
              needing a meal, but don't know what they want.
            </p>
            <h2 className="text-xl font-bold">How it works:</h2>
            <p className="py-5">
              Simply pick the cuisine that you prefer over the other. The app
              harnesses the power of elimination, filtering out undesirable
              options until a winning cuisine is determined. A list of nearby
              eateries will be generated based on the winning option.
            </p>
          </div>
          <div className="flex items-center gap-5 p-10">
            <button
              data-remove={cuisineB}
              onClick={(e) => handleClick(e)}
              className="h-[100px] w-[200px] rounded-l-full border-orange-600 bg-orange-400 p-1 transition duration-300 ease-in-out hover:-translate-y-4 hover:scale-110 hover:border-2 hover:bg-orange-500"
            >
              {cuisineA}
            </button>
            <p>or..</p>
            <button
              data-remove={cuisineA}
              onClick={(e) => handleClick(e)}
              className="h-[100px] w-[200px] rounded-r-full border-orange-600 bg-orange-400 p-1 transition duration-300 ease-in-out hover:-translate-y-4 hover:scale-110 hover:border-2 hover:bg-orange-500"
            >
              {cuisineB}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
