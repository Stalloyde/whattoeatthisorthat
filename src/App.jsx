import { useState } from 'react';
import './App.css';

const array = [
  'Japanese',
  'French',
  'Korean',
  'Italian',
  'Chinese',
  'Malay',
  'Indian',
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
    cuisines[Math.floor(Math.random() * (cuisines.length - 1)) + 1],
  );
  const [endGame, setEndGame] = useState(false);

  function removeTarget(e) {
    const target = cuisines.findIndex(
      (elem) => elem === e.target.dataset.remove,
    );
    cuisines.splice(target, 1);
  }

  function checkGameOver() {
    if (cuisines.length > 1) {
      shuffleArray(cuisines);
      setCuisineA(cuisines[0]);
      setCuisineB(
        cuisines[Math.floor(Math.random() * (cuisines.length - 1) + 1)],
      );
    } else {
      setCuisineA(cuisines[0]);
      setEndGame(true);
    }
  }

  function handleClick(e) {
    removeTarget(e);
    checkGameOver();
  }

  return (
    <>
      {endGame ? (
        <button>{cuisineA}</button>
      ) : (
        <>
          <div className='description'>
            <h1>What to eat?</h1>
            <p>
              This app helps you figure out what to eat. Perfect for those
              needing a meal, but don't know what they want.
            </p>
            <h2>How it works:</h2>
            <p>
              Simply pick the cuisine that you prefer over the other. The app
              harnesses the power of elimination, filtering out undesirable
              options until a winning cuisine is determined. A list of nearby
              eateries will be generated based on the winning option.
            </p>
          </div>
          <div className='container'>
            <button data-remove={cuisineB} onClick={(e) => handleClick(e)}>
              {cuisineA}
            </button>
            <p>or..</p>
            <button data-remove={cuisineA} onClick={(e) => handleClick(e)}>
              {cuisineB}
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
