import './App.css';
import PropTypes from 'prop-types';

GameOver.propTypes = {
  cuisineA: PropTypes.string.isRequired,
};

function GameOver({ cuisineA }) {
  return (
    <>
      <div>
        <div>
          <h1 className="header1">Winning Cuisine: {cuisineA}</h1>
        </div>
        <p>Refresh page to restart</p>
      </div>
    </>
  );
}

export default GameOver;
