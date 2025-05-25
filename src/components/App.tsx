import { useEffect, useState } from 'react';
import styled from 'styled-components';

import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import Search from './Search';
import PostCard from './PostCard';

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

  const resetPosts = () => {
    setLoading(true);
    setError(null);
    setPosts([]);
  };

  const fetchPosts = async (params: {
    page: number;
    perPage: number;
    selectedCategory: string;
    searchTerm: string;
  }) => {
    fetch(
      `/api/posts?page=${page}&perPage=${perPage}&category=${selectedCategory}&search=${searchTerm}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.meta?.total && perPage > 0) {
          setTotalPages(Math.ceil(data.meta.total / perPage));
        }
        if (data?.allCategories) {
          setAllCategories(data.allCategories);
        }
        return data.error ? setError(data.error) : setPosts(data.posts);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    resetPosts();
    fetchPosts({ page, perPage, selectedCategory, searchTerm });
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
  };

  const handleInputChange = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setPage(1);
  };

  return (
    <>
      <h1>Posts</h1>
      <CategoryFilter
        allCategories={allCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <Search
        searchTerm={searchTerm}
        searchInput={searchInput}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        onClearSearch={handleClearSearch}
        disabledSubmit={loading}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {
        <PostsGrid>
          {loading
            ? Array.from({ length: perPage }).map((_, i) => <SkeletonCard key={i} />)
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </PostsGrid>
      }
      <Pagination
        totalPages={totalPages}
        page={page}
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
        onPageChange={handlePageChange}
      />
    </>
  );
};

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 2rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
`;

const ErrorMessage = styled.div`
  background-color: var(--light-red);
  color: var(--text-red);
  border: 1px solid var(--text-white);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  margin: 1rem auto;
  max-width: 600px;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
`;

export default App;
