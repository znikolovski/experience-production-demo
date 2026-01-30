/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product block
 *
 * Source: https://www.securbankdemo.com/
 * Base Block: cards
 *
 * Block Structure:
 * - Each row: [image | heading + description + CTA]
 *
 * Source HTML Pattern:
 * <div class="cards">
 *   <ul>
 *     <li>
 *       <div class="cards-card-image"><picture><img></picture></div>
 *       <div class="cards-card-body">
 *         <h3>Title</h3>
 *         <p>Description</p>
 *         <p class="button-container"><a>CTA</a></p>
 *       </div>
 *     </li>
 *   </ul>
 * </div>
 *
 * Generated: 2026-01-28
 */
export default function parse(element, { document }) {
  // Find all card items
  // VALIDATED: Found <ul><li> structure in captured DOM
  const cardItems = element.querySelectorAll('ul > li') ||
                    element.querySelectorAll('.cards-card') ||
                    element.querySelectorAll(':scope > div > div');

  const cells = [];

  cardItems.forEach(card => {
    // Extract image
    // VALIDATED: Found .cards-card-image with picture>img in captured DOM
    const imgElement = card.querySelector('.cards-card-image img') ||
                       card.querySelector('picture img') ||
                       card.querySelector('img');

    // Extract heading
    // VALIDATED: Found h3 in .cards-card-body in captured DOM
    const heading = card.querySelector('.cards-card-body h3') ||
                    card.querySelector('h3') ||
                    card.querySelector('h2, h4');

    // Extract description
    // VALIDATED: Found p (not .button-container) in .cards-card-body
    const description = card.querySelector('.cards-card-body p:not(.button-container)') ||
                        card.querySelector('p:not(.button-container)');

    // Extract CTA link
    // VALIDATED: Found a.button in .button-container in captured DOM
    const ctaLink = card.querySelector('.button-container a') ||
                    card.querySelector('a.button') ||
                    card.querySelector('a');

    // Build row: [image | content]
    const imageCell = [];
    const contentCell = [];

    if (imgElement) {
      const img = document.createElement('img');
      img.src = imgElement.src;
      img.alt = imgElement.alt || '';
      imageCell.push(img);
    }

    if (heading) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent;
      contentCell.push(strong);
    }

    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent;
      contentCell.push(p);
    }

    if (ctaLink) {
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent;
      contentCell.push(a);
    }

    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Product', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
