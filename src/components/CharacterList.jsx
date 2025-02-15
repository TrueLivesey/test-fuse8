import CharacterCard from './CharacterCard';
import PropTypes from 'prop-types';

const CharacterList = ({ characters }) => {
  return (
    <div className='character-list'>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CharacterList;
