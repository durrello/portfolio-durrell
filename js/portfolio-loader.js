/**
 * Portfolio Loader - Loads and displays portfolio projects
 * Works with Decap CMS for content management
 */

const PortfolioLoader = {
  projects: [],

  /**
   * Initialize the portfolio loader
   */
  async init() {
    console.log('Initializing Portfolio Loader...');
    await this.loadProjects();
  },

  /**
   * Load all projects from the portfolio directory
   */
  async loadProjects() {
    try {
      const response = await fetch('/portfolio.json');
      if (!response.ok) {
        console.warn('Could not load portfolio manifest');
        return [];
      }
      this.projects = await response.json();
      console.log(`Loaded ${this.projects.length} projects`);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  },

  /**
   * Get all projects
   */
  getAllProjects() {
    return this.projects;
  },

  /**
   * Get projects by status
   */
  getProjectsByStatus(status) {
    return this.projects.filter(project => project.status === status);
  },

  /**
   * Get projects by technology
   */
  getProjectsByTech(tech) {
    return this.projects.filter(project =>
      project.technologies && project.technologies.includes(tech)
    );
  },

  /**
   * Get featured projects
   */
  getFeaturedProjects(count = 6) {
    return this.getAllProjects().slice(0, count);
  },

  /**
   * Render portfolio project HTML
   */
  renderProject(project) {
    if (!project) return '';

    return `
      <div class="portfolio-item" data-slug="${project.title.toLowerCase().replace(/\s+/g, '-')}">
        <div class="portfolio-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="portfolio-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          ${project.technologies && project.technologies.length > 0 ? `
            <div class="technologies">
              ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
          ` : ''}
          ${project.features && project.features.length > 0 ? `
            <ul class="features">
              ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          ` : ''}
          ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">View Project</a>` : ''}
        </div>
      </div>
    `;
  },

  /**
   * Render portfolio projects grid
   */
  renderProjectsGrid(projects, options = {}) {
    const limit = options.limit || projects.length;
    
    return `
      <div class="portfolio-grid">
        ${projects.slice(0, limit).map(project => this.renderProject(project)).join('')}
      </div>
    `;
  }
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PortfolioLoader.init());
} else {
  PortfolioLoader.init();
}
