# Decap CMS + Cloudflare Pages Authentication Setup

## Overview

To enable the admin panel (`/admin`) to save changes back to your Git repository, you need to configure GitHub OAuth authentication with Decap CMS.

## Prerequisites

- GitHub account and repository
- Repository must be public or you must have admin access
- Cloudflare Pages connected to your GitHub repo

## Step 1: Create GitHub OAuth Application

1. Go to [GitHub Settings → Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the form:
   - **Application name**: `Durrell Portfolio CMS`
   - **Homepage URL**: `https://durrellgemuh.com`
   - **Authorization callback URL**: `https://durrellgemuh.com/admin` (for production)
     - For local dev: `http://localhost:8000/admin`
4. Click **Register Application**
5. You'll see:
   - **Client ID** - Copy this
   - **Client Secret** - Click to generate and copy this

## Step 2: Configure Decap CMS

Update `admin/config.yml`:

```yaml
backend:
  name: github
  repo: your-github-username/portfolio-durrell
  branch: main
  auth_endpoint: /api/auth
  base_url: https://durrellgemuh.com
  auth_type: github
  app_id: YOUR_CLIENT_ID_HERE
  max_file_size: 500000
```

Replace:
- `your-github-username` with your actual GitHub username
- `YOUR_CLIENT_ID_HERE` with the Client ID from GitHub OAuth app

## Step 3: Deploy Netlify Lambda Functions (Alternative: Use Decap Proxy Server)

Decap CMS needs a backend service to handle OAuth. You have two options:

### Option A: Use Decap Live (Easiest)

Decap offers a managed backend service:

1. Go to [app.decapcms.org](https://app.decapcms.org)
2. Click **Login** → **GitHub**
3. Authorize and connect your repository
4. Update `admin/config.yml` backend to:

```yaml
backend:
  name: github
  repo: your-github-username/portfolio-durrell
  branch: main
```

### Option B: Deploy Functions to Cloudflare Workers

Create a Cloudflare Worker for OAuth handling:

1. Create `functions/auth.js` in your repository:

```javascript
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method === 'POST') {
    const body = await request.json();
    
    // Exchange code for token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: context.env.GITHUB_CLIENT_ID,
        client_secret: context.env.GITHUB_CLIENT_SECRET,
        code: body.code,
        redirect_uri: `${new URL(request.url).origin}/admin`,
      }),
    });

    return new Response(response.body, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Not Found', { status: 404 });
}
```

2. Add to `wrangler.toml`:

```toml
[env.production]
vars = { GITHUB_CLIENT_ID = "your-client-id" }
secrets = ["GITHUB_CLIENT_SECRET"]
```

3. Deploy:
```bash
wrangler secret put GITHUB_CLIENT_SECRET
wrangler deploy --env production
```

### Option C: Use a Third-Party Service

Services like **Auth0**, **Firebase Auth**, or **Gitpod** can also handle OAuth for Decap CMS.

## Step 4: Test the Admin Panel

1. Navigate to `https://durrellgemuh.com/admin`
2. Click **Login with GitHub**
3. Authorize the OAuth application
4. You should now see the CMS dashboard

## Step 5: Create a Test Blog Post

1. Click **Blog Posts** → **New Blog Post**
2. Fill in sample content
3. Click **Save**
4. Check your GitHub repository - a new commit should appear
5. Wait for Cloudflare Pages to redeploy

## Troubleshooting

### "Failed to load config" error
- Verify `admin/config.yml` syntax is valid YAML
- Check that `repo` matches your GitHub repository path
- Ensure `branch` name matches your default branch

### "Redirect URI mismatch" error
- Verify the OAuth app callback URL matches your site
- Add both `https://durrellgemuh.com/admin` and local dev URLs if needed
- For local: Add `http://localhost:8000/admin` to GitHub OAuth app settings

### Can't save posts
- Verify GitHub OAuth app is properly configured
- Ensure your repository is connected to Cloudflare Pages
- Check that the account has write permissions to the repo
- Review browser console for specific error messages

### Posts saved but not appearing
- Run `npm run build` locally to regenerate manifests
- Verify GitHub Actions workflow ran successfully
- Check that `posts.json` was updated in your repository
- Clear browser cache and rebuild site

## Environment Variables for Cloudflare Pages

If using Cloudflare Workers for auth, add to your Pages project settings:

1. Go to Cloudflare Dashboard → Pages → Your Project
2. **Settings** → **Environment Variables**
3. Add:
   - `GITHUB_CLIENT_ID` = Your Client ID
   - `GITHUB_CLIENT_SECRET` = Your Client Secret (production only)

## Security Best Practices

1. **Never commit secrets** - Store Client Secret in Cloudflare secrets, not in code
2. **Restrict repository access** - Only authorized users should edit content
3. **Use protected branches** - Require reviews before merging Decap commits
4. **Monitor deployments** - Set up alerts for unexpected changes
5. **Backup content** - Keep Git history for version control

## Next Steps

After authentication is set up:

1. ✅ Test creating a blog post via admin panel
2. ✅ Verify Cloudflare Pages redeploys automatically
3. ✅ Update your HTML pages to display the content
4. ✅ Customize CSS for blog post styling
5. ✅ Share admin link with team members

---

**Questions?** Refer to [Decap CMS Docs](https://decapcms.org/docs/) or [GitHub OAuth Docs](https://docs.github.com/en/developers/apps/building-oauth-apps/)
