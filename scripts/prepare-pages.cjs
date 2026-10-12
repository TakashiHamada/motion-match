// GitHub Pagesの公開元が main /（ルート）でもクイズを直接開けるようにする。
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
const html = source.replace(/\b(src|href)="(?!https?:|#)([^"]+)"/g, (match, attribute, value) => {
  // マニフェストは公開URL直下のスコープでホーム画面から起動する。
  return `${attribute}="${value === 'manifest.webmanifest' ? value : 'dist/' + value}"`;
});
const originalWorker = fs.readFileSync(path.join(root, 'dist/sw.js'), 'utf8');
const originalAssets = JSON.parse(originalWorker.match(/const ASSETS = (\[[\s\S]*?\]);/)[1]);
const assets = originalAssets.map(asset => ['./', './index.html', './manifest.webmanifest'].includes(asset)
  ? asset : './dist/' + asset.slice(2));
const digest = crypto.createHash('sha256');
for (const asset of originalAssets) if (asset !== './') digest.update(fs.readFileSync(path.join(root, 'dist', asset)));
digest.update(originalWorker).update(html);
const version = digest.digest('hex').slice(0, 12);
const worker = originalWorker
  .replace(/const CACHE = '[^']+';/, `const CACHE = 'motion-match-pages-${version}';`)
  .replace(/const ASSETS = \[[\s\S]*?\];/, `const ASSETS = ${JSON.stringify(assets, null, 2)};`);
const outputs = {
  'index.html': html,
  'manifest.webmanifest': fs.readFileSync(path.join(root, 'dist/manifest.webmanifest'), 'utf8').replace('"src":"icon.svg"', '"src":"dist/icon.svg"'),
  'sw.js': worker,
  '.nojekyll': '',
};
for (const [filename, content] of Object.entries(outputs)) {
  const destination = path.join(root, filename);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8') !== content) {
      throw new Error(`公開ファイルを更新してください: npm run prepare-pages (${filename})`);
    }
  } else fs.writeFileSync(destination, content);
}
console.log(process.argv.includes('--check') ? 'GitHub Pages公開ファイルの同期を確認。' : 'GitHub Pages公開ファイルを作成。');
