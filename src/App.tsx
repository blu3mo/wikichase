import React from 'react';
import './App.css';
import WikipediaPage from "./components/WikipediaPage";

function App() {
  return (
      <div className="game">
          <WikipediaPage
              lang="ja"
              title="ウィキペディア"
          />
      </div>
  );
}

export default App;
