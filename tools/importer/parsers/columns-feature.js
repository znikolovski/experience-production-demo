/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature block
 *
 * Source: https://www.securbankdemo.com/
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: [left column content | right column content]
 *
 * Source HTML Pattern:
 * <div class="feature">
 *   <div class="feature-content-wrapper">
 *     <div class="feature-content-media"><picture><img></picture></div>
 *     <div class="feature-content-container">
 *       <h3>We made it simple</h3>
 *       <p>Description</p>
 *     </div>
 *   </div>
 *   <div class="feature-callout-wrapper">
 *     <p class="feature-interest-rate"><strong>5.92%</strong><sup>APR</sup></p>
 *     <div>
 *       <h3>The best rate</h3>
 *       <p>is waiting</p>
 *       <p class="button-container"><a>Apply Now</a></p>
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-28
 */
export default function parse(element, { document }) {
  // Left column: Image + heading + description
  // VALIDATED: Found .feature-content-wrapper in captured DOM
  const leftWrapper = element.querySelector('.feature-content-wrapper');

  // Extract left column image
  const leftImage = leftWrapper?.querySelector('.feature-content-media img') ||
                    leftWrapper?.querySelector('picture img') ||
                    element.querySelector('.feature-content-media img');

  // Extract left column heading
  const leftHeading = leftWrapper?.querySelector('.feature-content-container h3') ||
                      leftWrapper?.querySelector('h3');

  // Extract left column description
  const leftDescription = leftWrapper?.querySelector('.feature-content-container p') ||
                          leftWrapper?.querySelector('p');

  // Right column: Rate callout + heading + subtext + CTA
  // VALIDATED: Found .feature-callout-wrapper in captured DOM
  const rightWrapper = element.querySelector('.feature-callout-wrapper');

  // Extract rate
  const rateElement = rightWrapper?.querySelector('.feature-interest-rate strong') ||
                      rightWrapper?.querySelector('strong');
  const rateLabel = rightWrapper?.querySelector('.feature-interest-rate sup') ||
                    rightWrapper?.querySelector('sup');

  // Extract right column heading
  const rightHeading = rightWrapper?.querySelector('h3');

  // Extract right column subtext
  const rightSubtext = rightWrapper?.querySelector('div > p:not(.button-container)');

  // Extract CTA
  const ctaLink = rightWrapper?.querySelector('.button-container a') ||
                  rightWrapper?.querySelector('a.button') ||
                  rightWrapper?.querySelector('a');

  // Build cells array
  const cells = [];

  // Build left column content
  const leftCell = [];
  if (leftImage) {
    const img = document.createElement('img');
    img.src = leftImage.src;
    img.alt = leftImage.alt || '';
    leftCell.push(img);
  }
  if (leftHeading) {
    const strong = document.createElement('strong');
    strong.textContent = leftHeading.textContent;
    leftCell.push(strong);
  }
  if (leftDescription) {
    const p = document.createElement('p');
    p.textContent = leftDescription.textContent;
    leftCell.push(p);
  }

  // Build right column content
  const rightCell = [];
  if (rateElement) {
    const rateText = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = rateElement.textContent;
    rateText.appendChild(strong);
    if (rateLabel) {
      rateText.appendChild(document.createTextNode(' ' + rateLabel.textContent));
    }
    rightCell.push(rateText);
  }
  if (rightHeading) {
    const strong = document.createElement('strong');
    strong.textContent = rightHeading.textContent;
    rightCell.push(strong);
  }
  if (rightSubtext) {
    const p = document.createElement('p');
    p.textContent = rightSubtext.textContent;
    rightCell.push(p);
  }
  if (ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.textContent = ctaLink.textContent;
    rightCell.push(a);
  }

  // Add row with both columns
  cells.push([leftCell, rightCell]);

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Feature', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
