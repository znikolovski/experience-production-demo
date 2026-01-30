/**
 * Metadata block - renders page metadata as hidden content
 * This block is typically invisible and used for SEO/document properties
 */
export default function decorate(block) {
  // Metadata block content is typically hidden
  // It's used to store page-level metadata that's processed by scripts
  block.style.display = 'none';
}
