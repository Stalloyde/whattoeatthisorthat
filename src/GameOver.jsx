import './App.css';

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
