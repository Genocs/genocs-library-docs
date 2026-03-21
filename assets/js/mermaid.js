import mermaid from 'mermaid';

var config = {
  theme: 'default',
  fontFamily: '"Nunito", -apple-system, blinkmacsystemfont, "Segoe UI", roboto, "Helvetica Neue", arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
};

document.addEventListener('DOMContentLoaded', async () => {
  mermaid.initialize({ ...config, startOnLoad: false });
  await mermaid.run({ querySelector: '.language-mermaid', suppressErrors: true });
});
