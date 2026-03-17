/**
 * Blog Loader - Loads posts from posts.json and renders markdown as HTML
 */

// Lightweight markdown → HTML renderer (no external dependencies)
function renderMarkdown(md) {
  if (!md) return '';
  let html = md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`)
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<oli>$1</oli>');

  html = html.replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`);
  html = html.replace(/(<oli>.*<\/oli>\n?)+/g, match =>
    `<ol>${match.replace(/<\/?oli>/g, m => m.replace('oli','li'))}</ol>`);

  const blocks = html.split(/\n{2,}/);
  html = blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^<(h[1-6]|ul|ol|pre|blockquote|hr)/.test(block)) return block;
    return '<p>' + block.replace(/\n/g, '<br>') + '</p>';
  }).join('\n');

  return html;
}

const BlogLoader = {
  posts: [],

  async init() {
    await this.loadPosts();
  },

  async loadPosts() {
    try {
      const response = await fetch('/posts.json');
      if (!response.ok) { console.warn('Could not load posts.json'); return; }
      this.posts = await response.json();
      console.log('BlogLoader: loaded ' + this.posts.length + ' posts');
    } catch (error) {
      console.error('BlogLoader error:', error);
    }
  },

  getAllPosts() {
    return [...this.posts].sort((a, b) =>
      new Date(b.publishDate) - new Date(a.publishDate));
  },

  getPostsByCategory(category) {
    return this.getAllPosts().filter(p => p.category === category);
  },

  getPostsByTag(tag) {
    return this.getAllPosts().filter(p => p.tags && p.tags.includes(tag));
  },

  getFeaturedPosts(count) {
    count = count || 3;
    return this.getAllPosts().slice(0, count);
  },

  getPost(slug) {
    return this.posts.find(p => p.slug === slug);
  },

  formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US',
      { year: 'numeric', month: 'long', day: 'numeric' });
  },

  renderPost(post) {
    if (!post) return '';
    const contentHtml = renderMarkdown(post.content || '');
    return '<article class="blog-post" data-slug="' + post.slug + '">' +
      '<header>' +
      (post.featuredImage ? '<img src="' + post.featuredImage + '" alt="' + post.title + '" class="featured-image">' : '') +
      '<h1>' + post.title + '</h1>' +
      '<div class="post-meta">' +
      '<span class="author">' + (post.author || 'Durrell Gemuh') + '</span>' +
      '<span class="date">' + this.formatDate(post.publishDate) + '</span>' +
      (post.category ? '<span class="category">' + post.category + '</span>' : '') +
      '</div></header>' +
      '<div class="post-content">' + contentHtml + '</div>' +
      (post.tags && post.tags.length > 0 ?
        '<footer class="post-tags">' +
        post.tags.map(function(t){ return '<span class="tag">' + t + '</span>'; }).join('') +
        '</footer>' : '') +
      '</article>';
  },

  renderPostsList(posts, options) {
    options = options || {};
    var limit = options.limit || posts.length;
    var showExcerpt = options.showExcerpt !== false;
    var self = this;
    if (!posts.length) return '<p style="text-align:center;padding:3rem;color:#6c757d;">No posts yet. Check back soon!</p>';
    return '<div class="blog-posts-list">' +
      posts.slice(0, limit).map(function(post) {
        return '<article class="blog-post-summary">' +
          (post.featuredImage ? '<div class="post-image"><img src="' + post.featuredImage + '" alt="' + post.title + '"></div>' : '') +
          '<div class="post-body">' +
          '<h3><a href="page-blog-detail.html?post=' + post.slug + '">' + post.title + '</a></h3>' +
          '<div class="post-meta">' +
          '<span class="date">' + self.formatDate(post.publishDate) + '</span>' +
          (post.category ? '<span class="category">' + post.category + '</span>' : '') +
          '</div>' +
          (showExcerpt && post.description ? '<p>' + post.description + '</p>' : '') +
          '<a href="page-blog-detail.html?post=' + post.slug + '" class="read-more">Read More &rarr;</a>' +
          '</div></article>';
      }).join('') +
      '</div>';
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function(){ BlogLoader.init(); });
} else {
  BlogLoader.init();
}
