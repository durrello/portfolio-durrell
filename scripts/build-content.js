#!/usr/bin/env node

/**
 * Build script for generating posts and portfolio manifests
 * This runs before deployment to generate posts.json and portfolio.json
 * from the posts/ and portfolio/ directories
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Ensure gray-matter is available, otherwise use fallback parser
function parseFrontmatter(content) {
  try {
    return matter(content);
  } catch (e) {
    // Fallback parser for markdown with YAML frontmatter
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { data: {}, content };
    
    const data = {};
    const yamlContent = match[1];
    yamlContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        let value = valueParts.join(':').trim();
        // Handle lists
        if (value.startsWith('[')) {
          value = JSON.parse(value);
        }
        data[key] = value;
      }
    });
    
    return { data, content: match[2] };
  }
}

function generatePostsManifest() {
  console.log('Generating posts manifest...');
  const postsDir = path.join(__dirname, '../posts');
  
  if (!fs.existsSync(postsDir)) {
    fs.writeFileSync(path.join(__dirname, '../posts.json'), '[]');
    console.log('No posts directory found, created empty posts.json');
    return;
  }

  const posts = [];
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      const { data, content: markdownContent } = parseFrontmatter(content);
      
      const slug = file.replace('.md', '');
      
      posts.push({
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        author: data.author || 'Durrell Gemuh',
        publishDate: data.publishDate || new Date().toISOString().split('T')[0],
        category: data.category || '',
        tags: data.tags || [],
        featuredImage: data.featuredImage || null,
        content: markdownContent.trim(),
        _file: file
      });
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });

  // Sort by publish date (newest first)
  posts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  fs.writeFileSync(
    path.join(__dirname, '../posts.json'),
    JSON.stringify(posts, null, 2)
  );
  
  console.log(`Generated posts.json with ${posts.length} posts`);
}

function generatePortfolioManifest() {
  console.log('Generating portfolio manifest...');
  const portfolioDir = path.join(__dirname, '../portfolio');
  
  if (!fs.existsSync(portfolioDir)) {
    fs.writeFileSync(path.join(__dirname, '../portfolio.json'), '[]');
    console.log('No portfolio directory found, created empty portfolio.json');
    return;
  }

  const projects = [];
  const files = fs.readdirSync(portfolioDir).filter(f => f.endsWith('.json'));

  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(portfolioDir, file), 'utf-8');
      const data = JSON.parse(content);
      projects.push(data);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });

  fs.writeFileSync(
    path.join(__dirname, '../portfolio.json'),
    JSON.stringify(projects, null, 2)
  );
  
  console.log(`Generated portfolio.json with ${projects.length} projects`);
}

// Run generation
try {
  generatePostsManifest();
  generatePortfolioManifest();
  console.log('✓ Build complete!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
