/**
 * Columns Textblock Parser
 * Parses multi-column text sections into EDS columns-textblock block
 */

export default function parse(element, { document }) {
  const cells = [];
  const row = [];

  // Find column containers - try multiple patterns
  let columns = element.querySelectorAll('.column, .col, [class*="col-"], .text-column');

  // If no explicit columns, look for direct children that could be columns
  if (columns.length === 0) {
    columns = element.children;
  }

  Array.from(columns).forEach(col => {
    // Skip empty elements or separators
    if (!col.textContent.trim() || col.classList.contains('separator')) {
      return;
    }

    const cell = document.createElement('div');

    // Get heading
    const heading = col.querySelector('h2, h3, h4, .title, .heading');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.textContent = heading.textContent.trim();
      cell.appendChild(h3);
    }

    // Get paragraphs/description
    const paragraphs = col.querySelectorAll('p, .description, .text');
    paragraphs.forEach(p => {
      // Skip if it's actually a heading or link container
      if (p.querySelector('a') && p.textContent.trim() === p.querySelector('a').textContent.trim()) {
        return;
      }
      const para = document.createElement('p');
      para.textContent = p.textContent.trim();
      if (para.textContent) {
        cell.appendChild(para);
      }
    });

    // Get CTA link
    const ctaLink = col.querySelector('a:not(.cmp-button__icon), a.cmp-button, .link a');
    if (ctaLink) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = ctaLink.href;
      a.textContent = ctaLink.textContent.trim();
      p.appendChild(a);
      cell.appendChild(p);
    }

    // Only add cell if it has content
    if (cell.hasChildNodes()) {
      row.push(cell);
    }
  });

  // Add the row if we have columns
  if (row.length > 0) {
    cells.push(row);
  }

  // Create the block
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns-Textblock',
    cells: cells
  });

  element.replaceWith(block);
}
