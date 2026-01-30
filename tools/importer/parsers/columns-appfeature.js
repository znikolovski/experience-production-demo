/**
 * Columns App Feature Parser
 * Parses app promotion sections into EDS columns-appfeature block
 */

export default function parse(element, { document }) {
  const cells = [];

  // Create left column (text content)
  const leftCell = document.createElement('div');

  // Get heading
  const heading = element.querySelector('h2, h3, .title, .heading');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    leftCell.appendChild(h2);
  }

  // Get description
  const description = element.querySelector('.description, .cmp-text p, .intro-text');
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    leftCell.appendChild(p);
  }

  // Get feature list
  const featureList = element.querySelectorAll('.feature-list li, ul li, .features li');
  if (featureList.length > 0) {
    const ul = document.createElement('ul');
    featureList.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.textContent.trim();
      ul.appendChild(li);
    });
    leftCell.appendChild(ul);
  }

  // Get CTA buttons (app store links)
  const ctaButtons = element.querySelectorAll('a.cmp-button, a[href*="app.apple"], a[href*="play.google"], .app-buttons a');
  if (ctaButtons.length > 0) {
    const buttonContainer = document.createElement('p');
    ctaButtons.forEach((btn, index) => {
      const strong = document.createElement('strong');
      const link = document.createElement('a');
      link.href = btn.href;
      link.textContent = btn.textContent.trim() || (btn.href.includes('apple') ? 'App Store' : 'Google Play');
      strong.appendChild(link);
      buttonContainer.appendChild(strong);
      if (index < ctaButtons.length - 1) {
        buttonContainer.appendChild(document.createTextNode(' '));
      }
    });
    leftCell.appendChild(buttonContainer);
  }

  // Create right column (phone mockup image)
  const rightCell = document.createElement('div');
  const phoneImage = element.querySelector('.phone-mockup img, .app-image img, picture img, img[alt*="phone"], img[alt*="app"]');
  if (phoneImage) {
    const img = document.createElement('img');
    img.src = phoneImage.src;
    img.alt = phoneImage.alt || 'App screenshot';
    rightCell.appendChild(img);
  }

  // Only add if we have content
  if (leftCell.hasChildNodes() || rightCell.hasChildNodes()) {
    cells.push([leftCell, rightCell]);
  }

  // Create the block
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns-Appfeature',
    cells: cells
  });

  element.replaceWith(block);
}
