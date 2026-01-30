/**
 * Cards Quicklinks Parser
 * Parses icon-based quick action links into EDS cards-quicklinks block
 */

export default function parse(element, { document }) {
  const cells = [];

  // Find all list items with icons
  const listItems = element.querySelectorAll('.cmp-list-item');

  listItems.forEach(item => {
    const link = item.querySelector('a');
    if (!link) return;

    // Get icon image
    const icon = item.querySelector('.c-icon img, i img');

    // Get link text
    const text = link.querySelector('span') || link;
    const linkText = text.textContent.trim();

    // Create row: [icon] | [link text]
    const iconCell = document.createElement('div');
    if (icon && icon.src) {
      const img = document.createElement('img');
      img.src = icon.src;
      img.alt = linkText;
      iconCell.appendChild(img);
    }

    const textCell = document.createElement('div');
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = linkText;
    p.appendChild(a);
    textCell.appendChild(p);

    cells.push([iconCell, textCell]);
  });

  // Create the block
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Quicklinks',
    cells: cells
  });

  element.replaceWith(block);
}
