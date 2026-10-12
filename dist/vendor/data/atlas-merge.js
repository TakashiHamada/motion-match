/* MOTION ATLAS の項目を一覧へ加え、既存項目を MOTION ATLAS 方式のキャンバスデモに結びつける。
   atlas-bundle.js（window.ATLAS）・data/atlas-items.js・motion-runtime.js のあとに読み込む。 */
(() => {
  const library = window.MOTION_LIBRARY || [];
  const categories = window.MOTION_CATEGORIES || [];
  // 既存項目のうち、MOTION ATLAS の図鑑に同じ動きがあるもの（そのデモで描く）
  const SAME_AS_ATLAS = {
    "typewriter": "ty-typewriter",
    "scramble-resolve": "ty-scramble",
    "word-swap": "ty-swap",
    "tracking-open": "ty-tracking",
    "blur-resolve": "ty-blurin",
    "type-mask": "ty-mask",
    "stagger-letters": "ty-cascade",
    "skeleton-shimmer": "ui-skeleton",
    "spinner-arc": "ld-spinner",
    "circular-progress": "ld-ring",
    "loading-dots": "ld-dots",
    "count-up": "ty-countup",
    "chart-draw": "dv-line",
    "bar-chart-stagger": "dv-bars",
    "donut-segments": "dv-donut",
    "progress-fill": "ui-progress",
    "hover-lift": "ui-hover",
    "click-ripple": "ui-ripple",
    "accordion-open": "ui-accordion",
    "pointer-tilt": "3d-tilt",
    "drag-snap": "ui-drag",
    "flip-reorder": "ui-reorder",
    "command-palette-open": "ui-cmdk",
    "shared-element": "tr-shared",
    "swipe-dismiss": "ui-swipe",
    "pull-to-refresh": "sc-ptr",
    "pinch-zoom": "sc-pinch",
    "svg-stroke-draw": "sh-draw",
    "svg-path-morph": "sh-morph",
    "svg-trim-path": "sh-trim",
    "svg-motion-path": "sh-follow",
    "checkbox-stroke": "ui-checkbox",
    "scroll-progress": "sc-progress",
    "parallax-layers": "sc-parallax",
    "sticky-pin": "sc-pin",
    "text-scroll-scrub": "sc-wordreveal",
    "flip-card": "3d-flipcard",
    "orbit": "lp-orbit",
    "wobble": "lp-pendulum",
    "badge-pop": "ui-badge",
    "catalog-ui-control-heart-like": "ui-like",
    "particle-burst": "pt-burst",
    "chromatic-split": "lk-chroma",
    "glow-pulse": "lk-glow",
    "catalog-game-impact-fx-hit-stop": "t-hitstop",
    "breathing": "lp-breath"
  };
  library.forEach(item => { if (SAME_AS_ATLAS[item.id]) item.demoId = SAME_AS_ATLAS[item.id]; });

  // カテゴリ：基礎（原則・イージング・スプリング・タイミング）を先頭に、映像系を基本カテゴリの後ろに
  const extra = window.MOTION_ATLAS_CATEGORIES || [];
  const byId = id => extra.find(category => category.id === id);
  const head = ['principles', 'easing', 'spring', 'timing'].map(byId).filter(Boolean);
  const afterEffect = ['transitions', 'camera'].map(byId).filter(Boolean);
  const tail = extra.filter(category => !head.includes(category) && !afterEffect.includes(category));
  const effectIndex = categories.findIndex(category => category.id === 'effect');
  categories.splice(effectIndex + 1, 0, ...afterEffect);
  categories.unshift(...head);
  categories.push(...tail);

  library.push(...(window.MOTION_ATLAS_ITEMS || []));

  // デモが宣言しているカーブ名（E のキー → 表示名）
  const EASE_NAMES = { linear: 'linear', inQuad: 'easeInQuad', outQuad: 'easeOutQuad', inOutQuad: 'easeInOutQuad', inCubic: 'easeInCubic', outCubic: 'easeOutCubic', inOutCubic: 'easeInOutCubic', outQuart: 'easeOutQuart', outQuint: 'easeOutQuint', inSine: 'easeInSine', outSine: 'easeOutSine', sine: 'easeInOutSine', outCirc: 'easeOutCirc', smooth: 'smoothstep', outExpo: 'easeOutExpo', inExpo: 'easeInExpo', inOut: 'easeInOutCubic', house: 'cubic-bezier(.83,0,.17,1)', whip: 'cubic-bezier(.9,0,.1,1)', glide: 'cubic-bezier(.4,0,.2,1)', outBack: 'easeOutBack', inBack: 'easeInBack', inOutBack: 'easeInOutBack', quint: 'easeOutQuint', md3: 'Material 3 standard', md3Emph: 'Material 3 emphasized', md3Acc: 'Material 3 accelerate', apple: 'ease', elastic: 'easeOutElastic', bounce: 'easeOutBounce' };
  const easingName = demo => {
    if (demo.spring) return `spring(${demo.spring.map(v => +(+v).toFixed(2)).join(', ')})`;
    if (demo.bez) return `cubic-bezier(${demo.bez.join(',')})`;
    if (typeof demo.ease === 'string') return EASE_NAMES[demo.ease] || demo.ease;
    return null;
  };

  // ループの長さ（デモの周期）と、動きそのものの長さを分けて持つ
  library.forEach(item => {
    const demo = window.ATLAS && window.ATLAS.get(item.demoId || item.id);
    if (!demo || item.motionDuration) return;
    item.motionDuration = item.duration;
    item.duration = Math.round(demo.dur * 1000);
    if (demo.ref && (item.catalogFamily || !item.easing || item.easing === 'linear')) { const name = easingName(demo); if (name) item.easing = name; }
    item.reduced = item.reduced || '動きを止め、内容が読める代表のコマを表示します。';
  });
})();
