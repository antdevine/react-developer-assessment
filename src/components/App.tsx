import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';

const App: React.FC = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPosts([]);
    fetch(`/api/posts?page=${page}&perPage=${perPage}&category=${selectedCategory}&search=dictumst`)
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
  }, [perPage, page, selectedCategory]);


  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
  }

  return (
    <>
      <CategoryFilter allCategories={allCategories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

      {loading ? 'Loading...' : null}
      {error ? <div className="error">{error}</div> : null}
      <div className="posts">
        {posts.map((p) => (
          <div key={p.id} className="post">
            <h2>{p.title}</h2>
            <p>{p.content}</p>
          </div>
        ))}
      </div>

      <Pagination totalPages={totalPages} page={page} perPage={perPage} onPerPageChange={handlePerPageChange} onPageChange={handlePageChange} />
    </>
  );
};

export default App;
