interface SearchProps {
    searchTerm: string;
    searchInput: string;
    onInputChange: (value: string) => void;
    onSearch: (term: string) => void;
    onClearSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, searchInput, onInputChange, onSearch, onClearSearch }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e.target.value);
      };
    
      const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSearch(searchInput.trim());
      }
    
      const handleClearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClearSearch();
      }

    return(
        <>
            <form className="search">
                <input type="text" placeholder="Search posts..." onChange={handleInputChange} value={searchInput}/>
                <button type="submit" onClick={handleSearch}>Search</button>
                <button type="button" onClick={handleClearSearch} disabled={!searchTerm}>Clear Search</button>
            </form>
        </>
    );
}

export default Search;