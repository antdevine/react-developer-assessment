import { useEffect, useState } from 'react';

const App: React.FC = () => {

  const [post, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPosts([]);
    fetch('/api/posts?page=1&perPage=10&category=Digital Marketing&search=dictumst')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.error ? setError(data.error) : setPosts(data.posts);
      })
      .finally(() => setLoading(false));
  }, []);


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
    </>
  );
};

export default App;
