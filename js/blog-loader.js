/**
 * Blog Loader - Loads and displays blog posts from markdown files
 * Works with Decap CMS for content management
 */

const BlogLoader = {
  posts: [],
  ready: false,
  readyCallbacks: [],

  /**
   * Initialize the blog loader
   */
  async init() {
    console.log('Initializing Blog Loader...');
    await this.loadPosts();
    this.ready = true;
    this.readyCallbacks.forEach(cb => {
      try {
        cb();
      } catch (e) {
        console.error('BlogLoader callback error:', e);
      }
    });
  },

  /**
   * Run code when the loader is ready
   */
  onReady(callback) {
    if (this.ready) {
      callback();
      return;
    }
    this.readyCallbacks.push(callback);
  },

  /**
   * Load all posts from the posts directory
   */
  async loadPosts() {
    try {
      // Fetch the posts listing
      const response = await fetch('/posts.json');
      if (!response.ok) {
        console.warn('Could not load posts manifest');
        return [];
      }
      this.posts = await response.json();
      console.log(`Loaded ${this.posts.length} posts`);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  },

  /**
   * Get all posts
   */
  getAllPosts() {
    return this.posts.sort((a, b) => 
      new Date(b.publishDate) - new Date(a.publishDate)
    );
  },

  /**
   * Get posts by category
   */
  getPostsByCategory(category) {
    return this.posts.filter(post => post.category === category)
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  },

  /**
   * Get posts by tag
   */
  getPostsByTag(tag) {
    return this.posts.filter(post => 
      post.tags && post.tags.includes(tag)
    ).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  },

  /**
   * Get featured posts (initial count)
   */
  getFeaturedPosts(count = 3) {
    return this.getAllPosts().slice(0, count);
  },

  /**
   * Get single post by slug
   */
  getPost(slug) {
    return this.posts.find(post => post.slug === slug);
  },

  /**
   * Format date for display
   */
  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  },

  /**
   * Render blog post HTML
   */
  renderPost(post) {
    if (!post) return '';
    
    return `
      <article class="blog-post" data-slug="${post.slug}">
        <header>
          ${post.featuredImage ? `<img src="${post.featuredImage}" alt="${post.title}" class="featured-image">` : ''}
          <h1>${post.title}</h1>
          <div class="post-meta">
            <span class="author">${post.author}</span>
            <span class="date">${this.formatDate(post.publishDate)}</span>
            ${post.category ? `<span class="category">${post.category}</span>` : ''}
          </div>
        </header>
        <div class="post-content">
          ${post.content || ''}
        </div>
        ${post.tags && post.tags.length > 0 ? `
          <footer class="post-tags">
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </footer>
        ` : ''}
      </article>
    `;
  },

  /**
   * Render blog posts list
   */
  renderPostsList(posts, options = {}) {
    const limit = options.limit || posts.length;
    const showExcerpt = options.showExcerpt !== false;

    return `
      <div class="blog-posts-list">
        ${posts.slice(0, limit).map(post => `
          <article class="blog-post-summary">
            ${post.featuredImage ? `
              <div class="post-image">
                <img src="${post.featuredImage}" alt="${post.title}">
              </div>
            ` : ''}
            <div class="post-body">
              <h3><a href="/blog/${post.slug}.html">${post.title}</a></h3>
              <div class="post-meta">
                <span class="date">${this.formatDate(post.publishDate)}</span>
                ${post.category ? `<span class="category"><a href="/blog/category/${post.category.toLowerCase()}">${post.category}</a></span>` : ''}
              </div>
              ${showExcerpt && post.description ? `<p>${post.description}</p>` : ''}
              <a href="/blog/${post.slug}.html" class="read-more">Read More</a>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BlogLoader.init());
} else {
  BlogLoader.init();
}
