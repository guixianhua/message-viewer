# Repository Guidelines

## Project Structure
This project is a single-file web app. All HTML, CSS, and JavaScript live in `message-viewer.html` at the repository root. There is no build step, no bundler, and no package manager — open the file in a browser and it runs.

Third-party libraries (`marked`, `highlight.js`, `github-markdown-css`) are loaded from CDN via `<script>` and `<link>` tags in the document head.

## Running
- Open `message-viewer.html` directly in any modern browser (double-click, or `open message-viewer.html` on macOS).
- No install, no server, no dependencies to fetch locally.

## Coding Style
- Keep everything in `message-viewer.html`. Do not split into separate `.css` / `.js` files unless the user explicitly asks.
- 2-space indentation for HTML, CSS, and JS. Keep semicolons in JavaScript.
- `camelCase` for JS identifiers; `kebab-case` for HTML IDs and CSS classes.
- Prefer small, focused edits to the existing structure over reorganizing the file.

## Testing
There is no automated test suite. After any change, manually verify in a browser:
- Paste/render ChatML, JSON, and Markdown inputs.
- Light/dark theme toggle.
- In-page search (Cmd/Ctrl+F triggers the custom search bar).
- External links open in a new tab.

## Commit & Pull Request Guidelines
Use short, imperative commit messages (`feat: improve markdown preview`, `fix: preserve search focus`). PRs should summarize user-visible changes, list the manual verification steps performed, and include a screenshot or short clip for UI changes.
