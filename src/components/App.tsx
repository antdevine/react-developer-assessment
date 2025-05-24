import { useEffect, useState } from 'react';

const App: React.FC = () => {

  const [post, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPosts([]);
    fetch('/api/posts?page=1&perPage=10&category=Digital Marketing&search=dictumst')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data?.meta?.total) {
          setTotalPages(data.meta.total);
        }
        return data.error ? setError(data.error) : setPosts(data.posts);
      })
      .finally(() => setLoading(false));
  }, [perPage, page]);

  const handleAmountPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
  };

  const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(prev => prev - 1);
  };

  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(prev => prev + 1);
  };


  return (
    <>
      {loading ? 'Loading...' : null}
      {error ? <div className="error">{error}</div> : null}
      <div className="posts">
        {post.map((p) => (
          <div key={p.id} className="post">
            <h2>{p.title}</h2>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
      <form className="pagination">
        <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <label htmlFor='amountPerPage'>Amount per page</label>
        <select 
        name='amountPerPage' 
        id='amountPerPage'
        value={perPage}
        onChange={handleAmountPerPage}
        >
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </form>
    </>
  );
};

export default App;
