/**
 * Hero Insurance Parser
 * Parses RACV homepage hero banner into EDS hero-insurance block
 */

export default function parse(element, { document }) {
  const cells = [];

  // Get hero content
  const contentSection = element.querySelector('.cmp-homepage-banner-content');
  const imageSection = element.querySelector('.cmp-homepage-banner-image');

  // Row 1: Background image (if exists)
  if (imageSection) {
    const img = imageSection.querySelector('img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      cells.push([imgEl]);
    }
  }

  // Row 2: Content (heading, subheading, CTA)
  if (contentSection) {
    const contentCell = document.createElement('div');

    // Get heading
    const heading = contentSection.querySelector('h1, .title');
    if (heading) {
      const h1 = document.createElement('h1');
      h1.textContent = heading.textContent.trim();
      contentCell.appendChild(h1);
    }

    // Get subheading/description
    const description = contentSection.querySelector('.cmp-text p');
    if (description) {
      const p = document.createElement('p');
      p.textContent = description.textContent.trim();
      contentCell.appendChild(p);
    }

    // Get CTA button
    const ctaButton = contentSection.querySelector('.banner-button a, a.cmp-button');
    if (ctaButton) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      const link = document.createElement('a');
      link.href = ctaButton.href;
      link.textContent = ctaButton.textContent.trim();
      strong.appendChild(link);
      p.appendChild(strong);
      contentCell.appendChild(p);
    }

    cells.push([contentCell]);
  }

  // Create the block
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Hero-Insurance',
    cells: cells
  });

  element.replaceWith(block);
}
