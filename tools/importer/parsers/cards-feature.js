/**
 * Cards Feature Parser
 * Parses feature cards with images into EDS cards-feature block
 */

export default function parse(element, { document }) {
  const cells = [];

  // Find all card items - support multiple selectors
  const cards = element.querySelectorAll('.cmp-teaser-card, .article-card, .card-item, [class*="card"]');

  cards.forEach(card => {
    // Get card image
    const img = card.querySelector('img');

    // Get card heading
    const heading = card.querySelector('h2, h3, h4, .title, .heading');

    // Get card description
    const description = card.querySelector('p, .description, .text');

    // Get CTA link
    const ctaLink = card.querySelector('a.cmp-button, a[class*="cta"], .card-link a');

    // Create image cell
    const imageCell = document.createElement('div');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      imageCell.appendChild(imgEl);
    }

    // Create content cell
    const contentCell = document.createElement('div');

    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      contentCell.appendChild(h3);
    }

    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentCell.appendChild(p);
    }

    if (ctaLink) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim() || 'Learn more';
      p.appendChild(a);
      contentCell.appendChild(p);
    }

    // Only add row if we have meaningful content
    if (imageCell.hasChildNodes() || contentCell.hasChildNodes()) {
      cells.push([imageCell, contentCell]);
    }
  });

  // Create the block
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Feature',
    cells: cells
  });

  element.replaceWith(block);
}
