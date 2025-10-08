import { useState } from 'react';
import './App.css';
import aotImage from './img_1.png';
import saikiImage from './img_2.png';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [mediaType, setMediaType] = useState('');

  const searchAnime = async () => {
    if (!query) {
      alert('Enter search term.');
      return;
    }
    setLoading(true);
    setResults(null);

    let apiUrl = `https://api.jikan.moe/v4/anime?q=${query}&sfw`;

    if (mediaType) {
      apiUrl += `&type=${mediaType}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResults(data.data[0]);
    } catch (error) {
      console.error("Failed to fetch anime:", error);
      alert("Failed to fetch search results. Please try again!");
    }
    setLoading(false);
  };

  const randomSearch = async () => {
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch('https://api.jikan.moe/v4/random/anime');
      const data = await response.json();
      setResults(data.data);
    } catch (error) {
      console.error("Failed to fetch random anime:", error);
      alert("Failed to fetch random anime. Please try again!");
    }
    setLoading(false);
  };
  
  return (
    <div className="app-wrapper"> 
      <header>
        <h1>Anime & Movie Search</h1>
      </header>

      <div className="img_one">
        <img src={aotImage} alt="aot image" />
      </div>

      <div className="container">
        <div className="search-bar">
          <input 
            type="text" 
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Attack on Titan"
          />
          <button type="button" onClick={searchAnime}>Search</button>
        </div>

        <div className="search-random">
          <button type="button" onClick={randomSearch}>Random Search</button>
          <img src="https://anime-dandadan.com/_assets/images/char/detail/turbo-granny_pc.png" alt="cat" className="sliding-image" />
        </div>

        <div className="info-display">
          {loading && <div className="content">Please wait a moment...</div>}
          {results && (
            <>
              <div className="img-display">
                <img src={results.images.jpg.large_image_url} alt={results.title} />
              </div>
              <div className="content">
                <h2>{results.title} ({results.year})</h2>
                <p><strong>Score: </strong> {results.score} ★</p> 
                <p><strong>Episodes: </strong> {results.episodes}</p>
                <p>{results.synopsis}</p>
              </div>
            </>
          )}
        </div>

        <div className="filters">
          <div className="filters-title">Filters</div>
          <div className="media">
            <label htmlFor="media-input">Media</label><br />
            <select id="media-input" value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
              <option value="">Any</option>
              <option value="tv">TV</option>
              <option value="movie">Movie</option>
            </select>
          </div>
          <div className="genre">Genre<br />
            Exclude: NSFW
          </div>
          <div className="apply">
            <button onClick={searchAnime}>Apply Filters</button><br />
          </div>
        </div>
      </div>

      <div className="img_two">
        <img src={saikiImage} alt="saiki k image" />
      </div>

      <footer className="footer">
        <p>
          <a href="https://github.com/LMU-CMSI2021-F25/generic-api-backed-chiikawa#">Github Repo</a><br />
          <a href="https://jikan.moe/">Jikan API</a>
        </p>
      </footer>
    </div>
  );
}

export default App;