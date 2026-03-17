# Quick Start Guide: Blog & Portfolio Admin Panel

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
# Navigate to your project directory
cd /Users/durrell/gitrepos/github/portfolio-durrell

# Install dependencies
npm install
```

### Step 2: Build Content Manifests

```bash
# Generate posts.json and portfolio.json from your content
npm run build
```

### Step 3: Test Locally (Optional)

```bash
# Watch for file changes and rebuild automatically
npm run build:watch

# In another terminal, serve your site locally
# You can use Python, Node, or any local server
python3 -m http.server 8000
```

Then visit: `http://localhost:8000`

### Step 4: Set Up GitHub OAuth Authentication

**Follow [AUTH_SETUP.md](AUTH_SETUP.md) to configure:**
1. Create GitHub OAuth Application
2. Update `admin/config.yml` with your credentials
3. Test admin panel at `/admin`

### Step 5: Update Your HTML Pages

Replace your old blog/portfolio pages with the new ones:

```bash
# Backup originals
cp page-blog.html page-blog-backup.html
cp page-blog-detail.html page-blog-detail-backup.html
cp page-portfolio.html page-portfolio-backup.html

# Use updated versions
mv page-blog-updated.html page-blog.html
mv page-blog-detail-updated.html page-blog-detail.html
mv page-portfolio-updated.html page-portfolio.html
```

### Step 6: Commit and Deploy

```bash
# Add all changes
git add .

# Commit
git commit -m "feat: add blog and portfolio CMS with Decap integration"

# Push to trigger Cloudflare Pages deployment
git push origin main
```

## ✨ Now You're Ready!

### Access Your Admin Panel
- **Production**: `https://durrellgemuh.com/admin`
- **Local**: `http://localhost:8000/admin`

### Create Your First Post

1. Go to `/admin`
2. Click **Blog Posts** → **New Blog Post**
3. Fill in:
   - Title: "My First Blog Post"
   - Description: "A brief summary"
   - Category: "DevOps"
   - Publish Date: Today
   - Body: Your content (supports Markdown!)
4. Click **Save**

### Create Your First Portfolio Project

1. Go to `/admin`
2. Click **Portfolio Projects** → **New Project**
3. Fill in details
4. Click **Save**

## 📁 What Got Added to Your Project

```
portfolio-durrell/
├── admin/
│   ├── index.html              # Admin panel
│   └── config.yml              # CMS configuration
├── posts/                      # Blog posts directory
├── portfolio/                  # Portfolio projects directory
├── js/
│   ├── blog-loader.js          # Blog loader script
│   └── portfolio-loader.js     # Portfolio loader script
├── scripts/
│   └── build-content.js        # Build script
├── .github/workflows/
│   └── build-content.yml       # Auto-build on push
├── page-blog-updated.html      # Blog listing page
├── page-blog-detail-updated.html  # Blog post page
├── page-portfolio-updated.html    # Portfolio page
├── posts.json                  # Auto-generated manifest
├── portfolio.json              # Auto-generated manifest
├── _config.json                # Site settings
├── _redirects                  # Cloudflare routing
├── BLOG_SETUP.md              # Full documentation
├── AUTH_SETUP.md              # Authentication guide
├── QUICK_START.md             # This file!
└── package.json               # Dependencies
```

## 📝 Content Structure

### Blog Posts (Markdown)
Located in `/posts/` with `.md` extension:
- Write in Markdown with YAML frontmatter
- Supports featured images
- Categories and tags for organization
- Auto-sorted by publish date

Example: [posts/example-post.md](posts/example-post.md)

### Portfolio Projects (JSON)
Located in `/portfolio/` with `.json` extension:
- Structured JSON format
- Link to GitHub/live demo
- Multiple technologies per project
- Feature list
- Project status tracking

Example: [portfolio/example-project.json](portfolio/example-project.json)

## 🔧 Common Tasks

### View All Posts
```javascript
BlogLoader.getAllPosts()
```

### Get Posts by Category
```javascript
BlogLoader.getPostsByCategory('Kubernetes')
```

### Get Posts by Tag
```javascript
BlogLoader.getPostsByTag('DevOps')
```

### Get Featured Posts
```javascript
BlogLoader.getFeaturedPosts(3) // Get 3 most recent
```

### View All Portfolio Projects
```javascript
PortfolioLoader.getAllProjects()
```

### Get Projects by Technology
```javascript
PortfolioLoader.getProjectsByTech('Kubernetes')
```

## 🌐 Deployment

### Cloudflare Pages (Automatic)

Each time you push to `main`:

1. **GitHub Actions runs** build-content workflow
2. **Manifests are generated** (posts.json, portfolio.json)
3. **Changes auto-commit** to your repo
4. **Cloudflare Pages deploys**

No manual steps needed! ✨

### Local Testing

```bash
# Test the admin panel locally
npm run build:watch

# Serve your site
python3 -m http.server 8000

# Visit http://localhost:8000/admin
```

## 🆘 Troubleshooting

### Posts not showing?
```bash
# Regenerate manifests
npm run build

# Check posts.json was created
cat posts.json
```

### Admin panel blank?
1. Clear browser cache
2. Check `/admin/config.yml` syntax
3. Verify repo path in config matches GitHub

### Build script failing?
```bash
# Install gray-matter dependency
npm install gray-matter

# Try building again
npm run build
```

## 📚 Learn More

- [Full Blog Setup Guide](BLOG_SETUP.md)
- [Authentication Setup](AUTH_SETUP.md)
- [Decap CMS Docs](https://decapcms.org/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

## 🎉 Next Steps

1. ✅ Create first blog post
2. ✅ Add portfolio projects
3. ✅ Customize site styling
4. ✅ Share admin link with team/collaborators
5. ✅ Monitor analytics and engagement

**Happy blogging!** 🚀
