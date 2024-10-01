import './App.css';

function Description() {
  return (
    <div className="max-w-[600px] border-black p-5 md:border-r">
      <h1 className="header1">What To Eat?</h1>
      <p className="py-2">
        This app helps you figure out what to eat. Perfect for those needing a
        meal, but don't know what they want.
      </p>
      <h2 className="text-xl font-bold">How it works:</h2>
      <p className="py-2">
        Simply pick the cuisine that you prefer over the other. The app
        eliminates undesirable options until a winning cuisine is determined.
        The app redirects to Google Maps and displays relevant eateries near
        your location.
      </p>
    </div>
  );
}

export default Description;
