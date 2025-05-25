import styled from 'styled-components';
import Button from './Button';

interface SearchProps {
  searchTerm: string;
  searchInput: string;
  onInputChange: (value: string) => void;
  onSearch: (term: string) => void;
  onClearSearch: () => void;
  disabledSubmit?: boolean;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  searchInput,
  onInputChange,
  onSearch,
  onClearSearch,
  disabledSubmit = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(searchInput.trim());
  };

  const handleClearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClearSearch();
  };

  return (
    <SearchForm>
      <SearchInput
        type="text"
        placeholder="Search posts..."
        onChange={handleInputChange}
        value={searchInput}
      />
      <Button type="submit" variant="primary" onClick={handleSearch} disabled={disabledSubmit}>
        Search
      </Button>

      <Button type="button" variant="secondary" onClick={handleClearSearch} disabled={!searchTerm}>
        Clear
      </Button>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid var(--text-light-gray);
  width: 260px;
  background-color: var(--text-white);
  color: var(--text-gray);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
  }
`;

export default Search;
