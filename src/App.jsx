import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList';
import Footer from './components/Footer';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = async (query) => {
    if (!query) {
      setCharacters([]);
      setTotalCount(0);
      return;
    }

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`);
      const data = response.data;

      setCharacters(data.results);
      setTotalCount(response.data.results.length);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('No characters found');
        setCharacters([]);
        setTotalCount(0);
      } else {
        console.error('Error fetching characters', error);
      }
    }
  };

  return (
    <div className='app'>
      <main className='main'>
        <div className='container'>
          <SearchBar onSearch={handleSearch} totalCount={totalCount} />
          <CharacterList characters={characters} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
