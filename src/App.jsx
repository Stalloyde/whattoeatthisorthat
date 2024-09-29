import { useState } from 'react';
import './App.css';
import Buttons from './Buttons';
import Description from './Description';
import GameOver from './GameOver';

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
  const [gameOver, setGameOver] = useState(false);

  function removeTarget(target) {
    const targetIndex = cuisines.findIndex((elem) => elem === target);
    cuisines.splice(targetIndex, 1);
  }
  return (
    <>
      {gameOver ? (
        <GameOver cuisineA={cuisineA} />
      ) : (
        <div className="flex">
          <Description />
          <Buttons
            shuffleArray={shuffleArray}
            cuisines={cuisines}
            cuisineA={cuisineA}
            setCuisineA={setCuisineA}
            cuisineB={cuisineB}
            setCuisineB={setCuisineB}
            removeTarget={removeTarget}
            setGameOver={setGameOver}
          />
        </div>
      )}
    </>
  );
}

export default App;
