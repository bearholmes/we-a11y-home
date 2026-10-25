import { readFile, writeFile } from 'node:fs/promises';
import { render } from '../dist-ssr/prerender.js';

const template = await readFile('dist/index.html', 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) throw new Error('Prerender root placeholder is missing');
await writeFile('dist/index.html', template.replace(placeholder, () => `<div id="root">${render()}</div>`));
console.log('Prerendered homepage content into dist/index.html');
