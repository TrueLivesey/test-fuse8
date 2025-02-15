import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, totalCount }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Автоматический фокус на поле ввода при загрузке
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Дебаунсинг запроса
  const debouncedSearch = useCallback(
    (query) => {
      if (query.length > 3) {
        onSearch(query);
      } else {
        onSearch('');
      }
    },
    [onSearch],
  );

  // Дебаунсинг запроса с задержкой 300ms
  const debouncedSearchWithDelay = useMemo(() => debounce(debouncedSearch, 300), [debouncedSearch]);

  // Обработка изменения значения в поле ввода
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearchWithDelay(value);
  };

  return (
    <div className='search-bar'>
      <input
        ref={inputRef}
        type='text'
        value={query}
        onChange={handleChange}
        placeholder='Search characters...'
        className='search-bar__input'
      />
      <p className='search-bar__total-count'>Found characters: {totalCount}</p>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default SearchBar;
