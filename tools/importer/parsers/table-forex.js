/* eslint-disable */
/* global WebImporter */

/**
 * Parser for table-forex block
 *
 * Source: https://www.securbankdemo.com/
 * Base Block: table
 *
 * Block Structure:
 * - Each row: [flag image | currency name | currency code | rate]
 *
 * Source HTML Pattern:
 * <div class="forex">
 *   <h2 class="sectionHeading">Exchange Rates for the Pound Sterling</h2>
 *   <table>
 *     <tr>
 *       <td><img src="flag.png" alt="..."></td>
 *       <td>Australian Dollar</td>
 *       <td>AUD</td>
 *       <td>1.938</td>
 *     </tr>
 *   </table>
 * </div>
 *
 * Generated: 2026-01-28
 */
export default function parse(element, { document }) {
  // Find all table rows
  // VALIDATED: Found <table><tr> structure in captured DOM
  const tableRows = element.querySelectorAll('table tr') ||
                    element.querySelectorAll('tr');

  const cells = [];

  tableRows.forEach(row => {
    const tableCells = row.querySelectorAll('td');

    if (tableCells.length >= 4) {
      // Extract flag image from first cell
      // VALIDATED: Found img in first td in captured DOM
      const flagImg = tableCells[0].querySelector('img');

      // Extract currency name from second cell
      const currencyName = tableCells[1].textContent?.trim();

      // Extract currency code from third cell
      const currencyCode = tableCells[2].textContent?.trim();

      // Extract rate from fourth cell
      const rate = tableCells[3].textContent?.trim();

      // Build row cells
      const rowCells = [];

      // Flag image cell
      if (flagImg) {
        const img = document.createElement('img');
        img.src = flagImg.src;
        img.alt = flagImg.alt || '';
        rowCells.push(img);
      } else {
        rowCells.push('');
      }

      // Currency name cell
      rowCells.push(currencyName || '');

      // Currency code cell
      rowCells.push(currencyCode || '');

      // Rate cell
      rowCells.push(rate || '');

      cells.push(rowCells);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Table-Forex (no-header)', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
