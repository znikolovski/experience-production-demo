/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for SecurBank Demo website cleanup
 * Purpose: Remove site chrome and non-content elements
 * Applies to: www.securbankdemo.com (all templates)
 * Generated: 2026-01-28
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - cleaned.html analysis
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header/navigation (auto-populated in EDS)
    // EXTRACTED: Found <header class="header-wrapper"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.header-wrapper',
      'header'
    ]);

    // Remove footer (auto-populated in EDS)
    // EXTRACTED: Found <footer class="footer-wrapper"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.footer-wrapper',
      'footer'
    ]);

    // Remove nav elements
    // EXTRACTED: Found <nav id="nav"> and navigation hamburger in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#nav',
      '.nav-wrapper',
      '.nav-hamburger'
    ]);

    // Remove login form interactivity (handled by custom block)
    // EXTRACTED: Found login form with id="log-in" in captured DOM
    // Keep the visual structure but remove form functionality
    const loginForm = element.querySelector('.login-form');
    if (loginForm) {
      // Convert form to div to preserve layout without functionality
      const formDiv = element.ownerDocument.createElement('div');
      formDiv.className = 'login-placeholder';
      formDiv.innerHTML = loginForm.innerHTML;
      loginForm.replaceWith(formDiv);
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Clean up tracking and data attributes
    // EXTRACTED: Multiple elements with data-* attributes in captured DOM
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      // Remove Adobe Experience Platform attributes
      el.removeAttribute('data-aue-resource');
      el.removeAttribute('data-aue-type');
      el.removeAttribute('data-aue-prop');
      el.removeAttribute('data-aue-label');
      el.removeAttribute('data-aue-filter');
    });

    // Remove remaining non-content elements
    // Standard HTML elements - safe to use
    WebImporter.DOMUtils.remove(element, [
      'script',
      'noscript',
      'link[rel="stylesheet"]',
      'link[rel="preload"]',
      'meta'
    ]);
  }
}
