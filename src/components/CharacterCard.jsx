import PropTypes from 'prop-types';

const CharacterCard = ({ character }) => {
  const formattedDate = new Intl.DateTimeFormat('ru-RU').format(new Date(character.created));
  const getColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return '#267504';
      case 'dead':
        return '#820A0A';
      default:
        return '#515151';
    }
  };

  return (
    <li className='character-item'>
      <a href={character.url} target='_blank' rel='noopener noreferrer' className='character-item__link'>
        <div className='character-item__content'>
          <h2 className='character-item__title'>
            {character.name} — {character.species}
          </h2>
          <div className='character-item__info'>
            <p className='character-item__status'>
              Status: <span style={{ color: getColor(character.status), fontWeight: 600 }}>{character.status}</span>
            </p>
            <p className='character-item__created'>Created: {formattedDate}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
};

export default CharacterCard;
