const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');
const core = require('../dist/core.js');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map(match => match[1]);
const data = new Map();

// ブラウザを開かずに、DOM構造と描画コードの実行を検証する。
const { window } = parseHTML(html);
const document = window.document;
function contextFor(canvas) {
  return new Proxy({ canvas, globalAlpha: 1, getTransform: () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }),
    measureText: text => ({ width: String(text).length * 22 }),
    createLinearGradient: () => ({ addColorStop() {} }), createRadialGradient: () => ({ addColorStop() {} }),
    createConicGradient: () => ({ addColorStop() {} }),
    getImageData: (x,y,w,h) => ({ data: new Uint8ClampedArray(w*h*4), width:w, height:h }),
  }, { get: (target, property) => property in target ? target[property] : () => {}, set: (target, property, value) => { target[property] = value; return true; } });
}
const element = window.HTMLElement.prototype;
Object.defineProperty(element, 'clientWidth', { get() { return this.tagName === 'CANVAS' ? 320 : 320; } });
Object.defineProperty(element, 'clientHeight', { get() { return 200; } });
element.getBoundingClientRect = () => ({ width:320, height:200, left:0, top:0 });
element.animate = function (frames, options) {
  assert(frames.length > 0, '空のキーフレーム');
  let previous = -1;
  for (const frame of frames) {
    if (frame.offset != null) { assert(frame.offset >= previous && frame.offset >= 0 && frame.offset <= 1, '不正なキーフレーム位置'); previous = frame.offset; }
    assert(!JSON.stringify(frame).match(/NaN|Infinity/), '無効なアニメーション値');
  }
  assert(options.duration > 0, 'デモの長さが不正');
  return { currentTime:0, playbackRate:1, playState:'running', pause(){this.playState='paused';}, play(){this.playState='running';}, cancel(){this.playState='idle';} };
};
window.HTMLCanvasElement.prototype.getContext = function () { return this._context ||= contextFor(this); };
element.showModal = function () { this.open = true; };
element.close = function () { this.open = false; };
element.focus = () => {};
const sandbox = {
  window, document, console, Intl, URL, Blob, URLSearchParams,
  localStorage: { getItem: key => data.get(key) || null, setItem: (key, value) => data.set(key,value) },
  location: { hash:'', protocol:'https:' }, navigator: { onLine:true },
  matchMedia: () => ({ matches:false, addEventListener(){} }),
  ResizeObserver: class { observe(){} unobserve(){} },
  IntersectionObserver: class { observe(){} unobserve(){} disconnect(){} },
  Path2D: class { constructor() { return new Proxy(this,{get:()=>()=>{}}); } },
  CSS: { supports:()=>true }, devicePixelRatio:1,
  performance: { now:()=>1000 }, requestAnimationFrame:()=>1, cancelAnimationFrame(){},
  setTimeout:()=>1, clearTimeout(){},
};
window.matchMedia=sandbox.matchMedia; window.localStorage=sandbox.localStorage;
window.scrollTo=()=>{}; window.devicePixelRatio=1;
const context = vm.createContext(sandbox);
for (const file of scripts) {
  if (file === 'app.js') continue;
  const source = fs.readFileSync(path.join(root,'dist',file),'utf8');
  new vm.Script(source, { filename:file }).runInContext(context);
}
assert.equal(window.MOTION_LIBRARY.length, 782);
assert.equal(new Set(window.MOTION_LIBRARY.map(item=>item.id)).size,782);
let canvasCount=0, domCount=0;
for (const item of window.MOTION_LIBRARY) {
  assert(item.title && item.titleEn && item.duration > 0, `データ不備: ${item.id}`);
  assert(window.MOTION_CATEGORIES.some(cat=>cat.id===item.category), `カテゴリー不備: ${item.id}`);
  const holder=document.createElement('div'); holder.innerHTML=window.QuizRenderer.markup(item); document.body.append(holder);
  const stage=holder.firstElementChild;
  const engine=window.QuizRenderer.engine(item);
  const demo=engine?.get(item.demoId || item.id);
  if (demo) {
    canvasCount++;
    const canvas=stage.querySelector('canvas');
    for (const progress of [.01,.25,.55,.85,.99]) engine.draw(canvas,demo,demo.dur*progress,{accent:item.accent});
  } else {
    domCount++;
    window.QuizRenderer.fit(stage);
    const clips=window.QuizRenderer.animate(stage,item,1,true);
    assert(clips.length>0, `アニメーションなし: ${item.id}`);
    clips.forEach(clip=>clip.cancel());
  }
  holder.remove();
}
console.log(`782項目のデータ・デモ実行を確認 (${canvasCount} canvas / ${domCount} DOM)。canvasはモックで5時点のコード実行のみ。`);

const samples=[{id:'a',title:'A'},{id:'b',title:'B'},{id:'c',title:'C'},{id:'d',title:'D'}];
assert.equal(core.makeSession(samples,10).groups.flat().length,4);
assert.equal(core.makeSession([...samples,{id:'e',title:'A'}],10).groups.flat().length,4);
assert.deepEqual(core.assign({a:'a',b:'b'},'b','a'),{b:'a'});
assert(core.grade(['a','b'],{a:'a',b:'b'}).every(result=>result.correct));
let recorded=core.record({items:{},days:{}},[{id:'a',correct:false}],'2026-10-12');
assert.equal(recorded.items.a.weak,true);
recorded=core.record(recorded,[{id:'a',correct:true}],'2026-10-12');
assert.equal(recorded.items.a.weak,true);
recorded=core.record(recorded,[{id:'a',correct:true}],'2026-10-12');
assert.equal(recorded.items.a.weak,false);
assert.equal(recorded.days['2026-10-12'],3);

new vm.Script(fs.readFileSync(path.join(root,'dist/app.js'),'utf8'), { filename:'app.js' }).runInContext(context);
function click(selector) { const button=document.querySelector(selector); assert(button,`ボタン不在: ${selector}`); button.dispatchEvent(new window.Event('click',{bubbles:true})); }
function saved() { return JSON.parse(data.get('motion-match-v1')); }
click('[data-length="1"]'); click('[data-action="start"]');
const ids=saved().session.groups[0];
assert.equal(ids.length,3);
for (const id of ids) { click(`[data-select="${id}"]`); click(`[data-name="${id}"]`); }
click('[data-action="grade"]');
assert.equal(saved().session.results.filter(result=>result.correct).length,3);
assert.equal(Object.values(saved().stats.items).reduce((sum,item)=>sum+item.attempts,0),3);
click('[data-action="leave"]'); click('[data-action="resume"]');
assert.equal(document.querySelector('[data-action="grade"]'),null,'採点済み問題が再採点可能');
click('[data-action="next"]');
assert(document.getElementById('app').textContent.includes('今日の一歩'));
click('[data-action="start"]');
const wrongIds=saved().session.groups[0];
for (let i=0;i<wrongIds.length;i++) { click(`[data-select="${wrongIds[i]}"]`); click(`[data-name="${wrongIds[(i+1)%wrongIds.length]}"]`); }
click('[data-action="grade"]');
assert(wrongIds.every(id=>saved().stats.items[id].weak));
click('[data-action="next"]'); click('[data-action="retry"]');
assert(saved().session.groups.flat().every(id=>wrongIds.includes(id)));
const before=saved().session;
click('[data-action="leave"]'); click('[data-action="resume"]');
assert.deepEqual(saved().session,before);
click(`[data-preview="${saved().session.groups[0][0]}"]`);
assert.equal(document.getElementById('preview').open,true);
click('#close-preview');
assert.equal(document.getElementById('preview').open,false);
console.log('抽選・名前の重複防止・採点・二重採点防止・復習・中断再開・拡大DOM処理を確認。');

const sw=fs.readFileSync(path.join(root,'dist/sw.js'),'utf8');
const assets=JSON.parse(sw.match(/const ASSETS = (\[[\s\S]*?\]);/)[1]);
for (const asset of assets) if (asset!=='./') assert(fs.existsSync(path.join(root,'dist',asset)),`キャッシュ資産なし: ${asset}`);
for (const file of scripts) assert(assets.includes('./'+file),`オフライン対象外: ${file}`);
for (const match of html.matchAll(/<link[^>]*href="([^"]+)"/g)) assert(assets.includes('./'+match[1]),`オフライン対象外: ${match[1]}`);
for (const file of ['sw.js', ...scripts]) new vm.Script(fs.readFileSync(path.join(root,'dist',file),'utf8'),{filename:file});
console.log(`オフライン資産${assets.length}件の存在・全スクリプトの構文を確認。`);

// PagesのプロジェクトURL直下で、すべての相対パスが公開ファイルへ解決する。
const pagesHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const pagesUrl = new URL('https://takashihamada.github.io/motion-match/');
const pagesWorker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const pagesAssets = JSON.parse(pagesWorker.match(/const ASSETS = (\[[\s\S]*?\]);/)[1]);
const cachedUrls = new Set(pagesAssets.map(asset => new URL(asset, pagesUrl).href));
assert(pagesHtml.includes('id="app"') && !pagesHtml.includes('http-equiv="refresh"'), 'ルートにクイズの入口が必要');
for (const match of pagesHtml.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^https?:/.test(match[1])) continue;
  const url = new URL(match[1], pagesUrl);
  assert.equal(url.origin, pagesUrl.origin);
  assert(url.pathname.startsWith(pagesUrl.pathname), `公開パスの外: ${url}`);
  const file = url.pathname.slice(pagesUrl.pathname.length);
  assert(fs.existsSync(path.join(root, file)), `公開ファイルなし: ${file}`);
  assert(cachedUrls.has(url.href), `公開時のオフライン対象外: ${file}`);
}
for (const asset of pagesAssets) if (asset !== './') assert(fs.existsSync(path.join(root, asset)), `Pagesキャッシュ資産なし: ${asset}`);
const pagesManifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
assert.equal(new URL(pagesManifest.start_url, pagesUrl).href, pagesUrl.href);
assert.equal(new URL(pagesManifest.scope, pagesUrl).href, pagesUrl.href);
assert(fs.existsSync(path.join(root, pagesManifest.icons[0].src)));
assert(fs.existsSync(path.join(root, '.nojekyll')));
new vm.Script(pagesWorker, { filename: 'sw.js' });
console.log('Pagesルートの入口・全依存パス・オフライン対象・ホーム画面起動URLを確認。');
