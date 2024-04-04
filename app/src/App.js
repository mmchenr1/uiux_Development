import './App.css';
import DiscoveryPanel from './components/DiscoveryPanel';
import FavoritesPanel from './components/FavoritesPanel'
import { useState } from 'react';

function App() {
  const [favorites, setFavorites] = useState([])
  const [numFavorites, setNumFavorites] = useState(0)

  return (
    <div className="App">
      <h1 id="pageheader">Molly's Music Aggregator</h1>
      <div id="contents">
        <DiscoveryPanel 
          favorites={favorites}
          setFavorites={setFavorites}
          numFavorites={numFavorites}
          setNumFavorites={setNumFavorites}>
        </DiscoveryPanel>

        <FavoritesPanel
          favorites={favorites}
          setFavorites={setFavorites}
          numFavorites={numFavorites}
          setNumFavorites={setNumFavorites}>
        </FavoritesPanel>
      </div>
    </div>
  );
}

export default App;
