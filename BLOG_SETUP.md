# Blog & Portfolio Setup Guide

## Overview

Your portfolio now has a fully integrated **Decap CMS** for managing blog posts and portfolio projects, all while maintaining static hosting on Cloudflare Pages.

### What's New

- **Admin Panel** - Access at `/admin` to create/edit/publish content
- **Blog Posts** - Markdown-based blog articles in the `posts/` directory
- **Portfolio Projects** - JSON-based project showcase in the `portfolio/` directory
- **Git-Based Workflows** - All changes tracked in Git with automatic deployments
- **Zero Backend** - Everything works with static files and Cloudflare Pages

## Quick Start

### 1. **Accessing the Admin Panel**

Navigate to: `https://yourdomain.com/admin`

The first time you visit, you'll need to authenticate. For Cloudflare Pages, we use Git OAuth authentication via GitHub.

### 2. **Creating a Blog Post**

In the admin panel:
1. Click **Blog Posts** → **New Blog Post**
2. Fill in:
   - **Title** - Post title
   - **Description** - Short excerpt for blog listings
   - **Author** - Author name (defaults to "Durrell Gemuh")
   - **Publish Date** - When to publish
   - **Category** - One of: DevOps, Cloud, Kubernetes, CI/CD, AWS, GCP, Terraform, Linux, Docker, Security
   - **Tags** - Multiple tags for organization
   - **Featured Image** - Optional cover image
   - **Body** - Full post content (Markdown supported)

3. Click **Save** → Automatic Git commit
4. Site redeploys automatically via Cloudflare Pages

### 3. **Creating a Portfolio Project**

In the admin panel:
1. Click **Portfolio Projects** → **New Project**
2. Fill in:
   - **Title** - Project name
   - **Description** - Project overview
   - **Image** - Project thumbnail
   - **Technologies** - List of tech used
   - **Link** - GitHub or live demo link
   - **Features** - Key features list
   - **Status** - Completed, In Progress, or Planned

3. Click **Save** → Automatic Git commit

### 4. **Managing Site Settings**

In the admin panel:
1. Click **Site Settings** → **General Settings**
2. Edit:
   - Site title, description, author info
   - Social media links (Twitter, GitHub, LinkedIn, Instagram)

### 5. **Building Locally**

To test locally and generate manifests:

```bash
# Install dependencies
npm install

# Generate posts.json and portfolio.json
npm run build

# Watch for changes during development
npm run build:watch
```

## File Structure

```
portfolio-durrell/
├── admin/
│   ├── index.html           # Admin panel interface
│   └── config.yml           # CMS configuration
├── posts/
│   ├── example-post.md      # Sample blog post
│   └── ...                  # More posts (auto-generated)
├── portfolio/
│   ├── example-project.json # Sample portfolio item
│   └── ...                  # More projects
├── js/
│   ├── blog-loader.js       # Blog content loader
│   ├── portfolio-loader.js  # Portfolio loader
│   └── ...
├── posts.json               # Generated blog manifest
├── portfolio.json           # Generated portfolio manifest
├── _config.json             # Site configuration
├── _redirects               # Cloudflare redirect rules
├── page-blog.html           # Blog listing page
├── page-blog-detail.html    # Blog post detail page
└── ...
```

## Using Blog Content in Your Pages

### Display Latest Blog Posts

Add this to `page-blog.html`:

```html
<div id="blog-posts"></div>

<script src="js/blog-loader.js"></script>
<script>
  // Wait for BlogLoader to initialize
  setTimeout(() => {
    const featured = BlogLoader.getFeaturedPosts(12);
    document.getElementById('blog-posts').innerHTML = 
      BlogLoader.renderPostsList(featured, { showExcerpt: true });
  }, 100);
</script>
```

### Display Blog Post Detail

In `page-blog-detail.html`:

```html
<div id="post-container"></div>

<script src="js/blog-loader.js"></script>
<script>
  // Get slug from URL or parameter
  const slug = new URLSearchParams(window.location.search).get('post');
  
  setTimeout(() => {
    const post = BlogLoader.getPost(slug);
    if (post) {
      document.getElementById('post-container').innerHTML = 
        BlogLoader.renderPost(post);
    }
  }, 100);
</script>
```

### Display Portfolio Projects

In `page-portfolio.html`:

```html
<div id="portfolio-projects"></div>

<script src="js/portfolio-loader.js"></script>
<script>
  setTimeout(() => {
    const projects = PortfolioLoader.getFeaturedProjects(6);
    document.getElementById('portfolio-projects').innerHTML = 
      PortfolioLoader.renderProjectsGrid(projects);
  }, 100);
</script>
```

## GitHub Actions Automation

A workflow file (`.github/workflows/build-content.yml`) automatically:

1. **Triggers** when you push changes to `posts/` or `portfolio/` directories
2. **Runs** the build script to generate `posts.json` and `portfolio.json`
3. **Commits** these manifests back to your repo
4. **Deploys** to Cloudflare Pages automatically

**No manual build step needed!**

## Decap CMS Features

### Media Library
- Upload images directly in the admin panel
- Images stored in `/images/uploads/`
- Automatic git tracking

### Drafts & Scheduling
- Save posts as drafts before publishing
- Schedule posts for future publication

### Collections
- **Blog Posts** - Markdown format with frontmatter
- **Portfolio Projects** - JSON format
- **Site Settings** - Global configuration

## Cloudflare Pages Deployment

Your site automatically:
1. Builds and deploys when you push to `main` branch
2. Supports Decap CMS authentication via GitHub OAuth
3. Serves all static files (HTML, CSS, JS, JSON)
4. Routes admin panel to `/admin`

## Popular Blog Post Categories

Start your posts in these DevOps categories:
- **DevOps** - DevOps practices and workflows
- **Cloud** - Cloud architecture planning
- **Kubernetes** - Container orchestration
- **CI/CD** - Pipeline automation
- **AWS** - Amazon Web Services
- **GCP** - Google Cloud Platform
- **Terraform** - Infrastructure as Code
- **Linux** - System administration
- **Docker** - Container fundamentals
- **Security** - Cloud and infrastructure security

## Next Steps

1. **Connect GitHub OAuth** to Decap CMS for authentication
   - Navigate to `/admin`
   - Click "Login with GitHub"
   
2. **Add Your First Blog Post**
   - Use the admin panel to create content
   - Publish and watch Cloudflare Pages deploy
   
3. **Update Your Pages**
   - Integrate `blog-loader.js` and `portfolio-loader.js` into your HTML pages
   - Use the provided render functions to display content

4. **Customize Styling**
   - Add CSS for `.blog-post`, `.portfolio-item`, etc. in `css/style.min.css`
   - Classes are automatically applied by the loaders

## Troubleshooting

### Posts not appearing?
- Run `npm run build` locally to generate `posts.json`
- Check that posts are in `/posts/` directory with `.md` extension
- Verify markdown frontmatter syntax

### Portfolio projects not loading?
- Ensure JSON files are in `/portfolio/` directory
- Validate JSON syntax in each project file
- Check browser console for errors in `portfolio-loader.js`

### Admin panel not loading?
- Clear browser cache
- Verify smooth deploymen to Cloudflare Pages
- Check that `/admin` route is accessible

### GitHub Actions failing?
- Confirm `gray-matter` is in `package.json`
- Check that build script path is correct
- Review workflow logs in GitHub Actions tab

---

**Enjoy your new blog and portfolio management system!** 🚀
