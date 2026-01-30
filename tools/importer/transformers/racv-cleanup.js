/**
 * RACV Site Cleanup Transformer
 * Removes RACV-specific elements that should not be imported
 */

export default function transform(hookName, element, payload) {
  const { document } = payload;

  if (hookName === 'beforeTransform') {
    // Remove header and navigation
    const header = document.querySelector('header.header');
    if (header) header.remove();

    // Remove footer
    const footer = document.querySelector('footer');
    if (footer) footer.remove();

    // Remove GDPR banner
    const gdpr = document.querySelector('.gdpr');
    if (gdpr) gdpr.remove();

    // Remove skip to content links
    const skipLinks = document.querySelectorAll('.u-skip-to-content');
    skipLinks.forEach(link => link.remove());

    // Remove success banners
    const successBanners = document.querySelectorAll('.successbanner, .sucessbannerhide');
    successBanners.forEach(banner => banner.remove());

    // Remove breadcrumbs (handled by nav)
    const breadcrumbs = document.querySelectorAll('.breadcrumb');
    breadcrumbs.forEach(bc => bc.remove());

    // Remove fixed subheaders
    const fixedHeaders = document.querySelectorAll('.fixedsubhead');
    fixedHeaders.forEach(fh => fh.remove());

    // Remove empty separators
    const separators = document.querySelectorAll('.separator .cmp-separator');
    separators.forEach(sep => {
      const parent = sep.closest('.separator');
      if (parent) parent.remove();
    });

    // Remove login buttons (handled by site header)
    const loginBtns = document.querySelectorAll('.loginBtn');
    loginBtns.forEach(btn => btn.remove());

    // Remove search components
    const searchComponents = document.querySelectorAll('.cmp-search');
    searchComponents.forEach(search => search.remove());

    // Convert base64 SVG images to placeholder or remove decorative icons
    const base64Images = document.querySelectorAll('img[src^="data:image/svg+xml;base64"]');
    base64Images.forEach(img => {
      // Keep icon images that are part of content, remove decorative ones
      const parent = img.closest('.c-icon, .cmp-button__icon');
      if (parent && !img.closest('.cmp-list-item')) {
        img.remove();
      }
    });
  }

  if (hookName === 'afterTransform') {
    // Clean up empty containers
    const emptyContainers = document.querySelectorAll('.cmp-container:empty, .aem-Grid:empty');
    emptyContainers.forEach(container => container.remove());

    // Remove AEM Grid wrapper classes
    const grids = document.querySelectorAll('[class*="aem-Grid"]');
    grids.forEach(grid => {
      grid.className = grid.className
        .replace(/aem-Grid[^\s]*/g, '')
        .replace(/aem-GridColumn[^\s]*/g, '')
        .trim();
    });
  }
}
