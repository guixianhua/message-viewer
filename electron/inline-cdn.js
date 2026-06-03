// Build step: read ../message-viewer.html (which references CDN <script>/<link>
// tags), inline the assets shipped in ./vendor, and write the offline-capable
// HTML to ../build/message-viewer.html. Electron loads that built file.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'message-viewer.html');
const outDir = path.join(root, 'build');
const out = path.join(outDir, 'message-viewer.html');
const vendor = path.join(__dirname, 'vendor');

const read = name => fs.readFileSync(path.join(vendor, name), 'utf8');
// Defensive: prevent embedded "</script>" / "</style>" from closing our wrapper tags.
const safeJs = s => s.replace(/<\/script>/gi, '<\\/script>');
const safeCss = s => s.replace(/<\/style>/gi, '<\\/style>');

const inlineScript = (name) => `<script>\n${safeJs(read(name))}\n</script>`;
const inlineStyle = (name, id, disabled) =>
  `<style id="${id}"${disabled ? ' disabled' : ''}>\n${safeCss(read(name))}\n</style>`;

let html = fs.readFileSync(src, 'utf8');

const replacements = [
  [/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/marked\/marked\.min\.js"><\/script>/, inlineScript('marked.min.js')],
  [/<script src="https:\/\/cdn\.jsdelivr\.net\/gh\/highlightjs\/cdn-release@11\/build\/highlight\.min\.js"><\/script>/, inlineScript('highlight.min.js')],
  [/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/gh\/highlightjs\/cdn-release@11\/build\/styles\/github\.min\.css" id="hljs-light">/, inlineStyle('github.min.css', 'hljs-light', false)],
  [/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/gh\/highlightjs\/cdn-release@11\/build\/styles\/github-dark\.min\.css" id="hljs-dark" disabled>/, inlineStyle('github-dark.min.css', 'hljs-dark', true)],
  [/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/npm\/github-markdown-css@5\/github-markdown-dark\.css" id="md-dark" disabled>/, inlineStyle('github-markdown-dark.css', 'md-dark', true)],
  [/<link rel="stylesheet" href="https:\/\/cdn\.jsdelivr\.net\/npm\/github-markdown-css@5\/github-markdown-light\.css" id="md-light">/, inlineStyle('github-markdown-light.css', 'md-light', false)],
];

for (const [re, rep] of replacements) {
  if (!re.test(html)) {
    console.error('Pattern not found:', re);
    process.exit(1);
  }
  html = html.replace(re, () => rep);
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, html);
console.log(`Wrote offline HTML: ${out} (${(html.length / 1024).toFixed(1)} KB)`);
