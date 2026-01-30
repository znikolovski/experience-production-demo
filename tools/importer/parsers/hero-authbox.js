/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-authbox block
 *
 * Source: https://www.securbankdemo.com/
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Background image
 * - Row 2: Heading and subheading content
 *
 * Source HTML Pattern:
 * <div class="hero authbox">
 *   <div class="hero-body">
 *     <div><h1>Heading</h1><h2>Subheading</h2></div>
 *     <div class="login">...</div>
 *   </div>
 *   <picture><img src="..." alt="..."></picture>
 * </div>
 *
 * Generated: 2026-01-28
 */
export default function parse(element, { document }) {
  // Extract background image
  // VALIDATED: Found <picture><img> as direct child in captured DOM
  const bgImage = element.querySelector('picture img') ||
                  element.querySelector('img');

  // Extract heading
  // VALIDATED: Found <h1 id="sail-into-financial-independence"> in captured DOM
  const heading = element.querySelector('h1') ||
                  element.querySelector('h2') ||
                  element.querySelector('[class*="heading"]');

  // Extract subheading
  // VALIDATED: Found <h2 id="its-easy-with-us"> in captured DOM
  const subheading = element.querySelector('h2:not(:first-of-type)') ||
                     element.querySelector('.hero-body h2') ||
                     element.querySelector('[class*="subtitle"]');

  // Build cells array matching block structure
  const cells = [];

  // Row 1: Background image (if present)
  if (bgImage) {
    const imgElement = document.createElement('img');
    imgElement.src = bgImage.src;
    imgElement.alt = bgImage.alt || '';
    cells.push([imgElement]);
  }

  // Row 2: Content (heading + subheading)
  const contentCell = [];
  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent;
    contentCell.push(h1);
  }
  if (subheading) {
    const h2 = document.createElement('h2');
    h2.textContent = subheading.textContent;
    contentCell.push(h2);
  }

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Authbox', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
