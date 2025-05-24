import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import Search from './Search';

const App: React.FC = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPosts([]);
    fetch(`/api/posts?page=${page}&perPage=${perPage}&category=${selectedCategory}&search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data?.meta?.total) {
          setTotalPages(Math.ceil(data.meta.total / perPage));
        }
        if(data?.allCategories) {
          setAllCategories(data.allCategories);
        }
        return data.error ? setError(data.error) : setPosts(data.posts);
      })
      .finally(() => setLoading(false));
  }, [perPage, page, selectedCategory, searchTerm]);


  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    setPage(1);
  }

  const handleInputChange = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
    setPage(1);
  }

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setPage(1);
  }

  return (
    <>
      <CategoryFilter allCategories={allCategories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

      <Search searchTerm={searchTerm} searchInput={searchInput} onInputChange={handleInputChange} onSearch={handleSearch} onClearSearch={handleClearSearch} />

      {loading ? 'Loading...' : null}
      {error ? <div className="error">{error}</div> : null}
      <div className="posts">
        {posts.map((p) => (
          <div key={p.id} className="post">
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
          </div>
        ))}
      </div>

      <Pagination totalPages={totalPages} page={page} perPage={perPage} onPerPageChange={handlePerPageChange} onPageChange={handlePageChange} />
    </>
  );
};

export default App;
