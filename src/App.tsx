import React from 'react';
import './App.css';
import Wikipedia from "./components/Wikipedia";

function App() {
  return (
      <div className="game">
          <Wikipedia
              lang="ja"
              title="ウィキペディア"
          />
      </div>
  );
}

export default App;
