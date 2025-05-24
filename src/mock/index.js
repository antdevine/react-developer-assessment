import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', (_, request) => {
      const page = parseInt(request.queryParams.page) || 1;
      const perPage = parseInt(request.queryParams.perPage) || 10;
      const filterCategory = request.queryParams.category || '';
      const searchTerm = request.queryParams.search || '';
      const searchLower = searchTerm.toLowerCase();
    
      let filteredPosts = data.posts;
    
      if (filterCategory) {
        filteredPosts = filteredPosts.filter(post =>
          post.categories.some(cat => cat.name === filterCategory)
        );
      }

      if (searchTerm) {
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.summary.toLowerCase().includes(searchLower)
        );
      }
    
      const start = (page - 1) * perPage;
      const end = start + perPage;

      
      const paginatedPosts = filteredPosts.slice(start, end);
      
      let error = null;

      if( paginatedPosts.length === 0) {
        error = 'No posts found for the given page.';
      }

      return {
        posts: paginatedPosts,
        meta: {
          total: filteredPosts.length,
          page,
          perPage
        },
        error
      };
    });
    
    
  },
});
