(() => {
  'use strict';
  const app = document.getElementById('app');
  const library = window.MOTION_LIBRARY;
  const categories = window.MOTION_CATEGORIES;
  const byId = new Map(library.map(item => [item.id, item]));
  const core = window.QuizCore;
  const renderer = window.QuizRenderer;
  const key = 'motion-match-v1';
  const basicCategories = new Set(['entrance', 'move', 'scale', 'rotate', 'reaction', 'attention']);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  let storageAvailable = true;
  function read() { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { storageAvailable = false; return {}; } }
  const saved = read();
  let stats = saved.stats?.items ? saved.stats : { items: {}, days: {} };
  let session = saved.session?.groups?.every(group => group.length && group.every(id => byId.has(id))) ? saved.session : null;
  let preferences = { category: 'basic', mode: 'all', rounds: 5, ...saved.preferences };
  let selected = null;
  let clips = [];
  let previewClips = [];
  let speed = 1;
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let allowMotion = false;
  let view = 'home';
  let query = '';
  let libraryCategory = 'all';
  let libraryLimit = 12;
  let cacheReady = false;
  let cacheError = false;
  const today = () => { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; };
  function persist() {
    try { localStorage.setItem(key, JSON.stringify({ stats, session, preferences })); }
    catch { storageAvailable = false; }
  }
  const weakIds = () => Object.keys(stats.items).filter(id => stats.items[id].weak && byId.has(id));
  const accuracy = () => {
    const entries = Object.values(stats.items);
    const count = entries.reduce((sum, item) => sum + item.attempts, 0);
    return count ? `${Math.round(entries.reduce((sum, item) => sum + item.correct, 0) / count * 100)}%` : '—';
  };
  function categoryOptions(value, includeBasic = true) {
    return `${includeBasic ? `<option value="basic" ${value === 'basic' ? 'selected' : ''}>基本の動きから</option>` : ''}<option value="all" ${value === 'all' ? 'selected' : ''}>すべてのカテゴリー · ${library.length}種類</option>${categories.map(cat => `<option value="${escape(cat.id)}" ${cat.id === value ? 'selected' : ''}>${escape(cat.label)} · ${library.filter(item => item.category === cat.id).length}種類</option>`).join('')}`;
  }
  function pool() {
    return library.filter(item => (preferences.category === 'all' || (preferences.category === 'basic' ? basicCategories.has(item.category) : item.category === preferences.category)) && (preferences.mode !== 'weak' || stats.items[item.id]?.weak));
  }
  function stop() { clips.forEach(clip => clip.cancel()); clips = []; }
  // デモに書かれた項目名・イージング名はクイズ中のみ伏せる。
  function maskAnswer(canvas, items) {
    const context = canvas?.getContext('2d');
    if (!context) return;
    const normalize = text => String(text).toLowerCase().replace(/[\s\-_/・（）()]/g, '');
    const labels = [...new Set(items.flatMap(item => [item.title, item.titleEn, item.easing]).filter(Boolean).map(normalize))];
    const original = {};
    for (const method of ['fillText', 'strokeText']) {
      original[method] = context[method].bind(context);
      context[method] = function (text, ...args) {
        const candidate = normalize(text);
        if (labels.some(label => candidate === label || (label.length >= 4 && candidate.includes(label)))) return;
        return original[method](text, ...args);
      };
    }
  }
  function animateStages() {
    app.querySelectorAll('[data-stage-id]').forEach(stage => {
      const item = byId.get(stage.dataset.stageId);
      if (view === 'quiz' && !session.graded) maskAnswer(stage.querySelector('canvas'), currentIds().map(id => byId.get(id)));
      try {
        renderer.fit(stage);
        const animations = renderer.animate(stage, item, speed, allowMotion);
        if (paused || document.hidden) animations.forEach(clip => clip.pause());
        clips.push(...animations);
      } catch (error) {
        console.error('デモの描画エラー', item.id, error);
        stage.replaceChildren(Object.assign(document.createElement('p'), { className: 'error-note', textContent: 'このデモを再生できません。元サイトで確認してください。' }));
      }
    });
  }
  function storageNote() { return storageAvailable ? '' : '<p class="storage-warning">端末に記録を保存できません。ブラウザの保存設定や空き容量を確認してください。</p>'; }
  function render() {
    stop();
    document.querySelectorAll('[data-tab]').forEach(tab => {
      const active = tab.dataset.tab === (view === 'quiz' || view === 'result' ? 'home' : view);
      tab.classList.toggle('active', active);
      active ? tab.setAttribute('aria-current', 'page') : tab.removeAttribute('aria-current');
    });
    if (view === 'quiz' && session) renderQuiz();
    else if (view === 'result' && session) renderResult();
    else if (view === 'library') renderLibrary();
    else if (view === 'progress') renderProgress();
    else renderHome();
    animateStages();
  }
  function renderHome() {
    const count = new Set(pool().map(item => item.title)).size;
    app.innerHTML = `<p class="eyebrow">A LITTLE MOTION, EVERY DAY</p><h1 class="hero-title">その動きに、<br><em>名前をつけよう。</em></h1><p class="intro">動きを見て、名前をタップ。<br>いつもの移動時間を、モーションの勉強時間に。</p><div class="hero-art" aria-hidden="true"><div class="art-grid"></div><span class="tiny-badge">${library.length} MOTIONS</span><span class="shape art-one"></span><span class="shape art-two"></span><span class="shape art-three"></span><span class="art-caption">WATCH. MATCH. REMEMBER.</span></div><div class="section-label">今日はどの動きを覚える？<span>カテゴリー</span></div><label class="select-wrap"><span class="sr-only">出題カテゴリー</span><select id="category">${categoryOptions(preferences.category)}</select></label><div class="mode-buttons" aria-label="出題モード"><button data-mode="all" class="${preferences.mode === 'all' ? 'active' : ''}" aria-pressed="${preferences.mode === 'all'}">すべてから</button><button data-mode="weak" class="${preferences.mode === 'weak' ? 'active' : ''}" aria-pressed="${preferences.mode === 'weak'}">苦手を復習 · ${weakIds().length}</button></div><div class="section-label">ひと駅ぶん、ひとセット。<span>1問につき3つの組み合わせ</span></div><div class="length-buttons" aria-label="問題数">${[1, 5, 10].map(n => `<button data-length="${n}" class="${n === preferences.rounds ? 'active' : ''}" aria-pressed="${n === preferences.rounds}">${n}問${n === 5 ? ' · おすすめ' : ''}</button>`).join('')}</div><button class="primary" data-action="start" ${count ? '' : 'disabled'}>クイズをはじめる<span class="arrow">↗</span></button>${session && session.round < session.groups.length ? '<button class="secondary resume" data-action="resume">前の続きから再開 →</button>' : ''}<p class="hint">${count ? `${count}種類から出題 · 時間制限なし · 音は出ません` : 'この範囲に苦手な項目はありません。カテゴリーを変えてみましょう。'}</p><div class="mini-stats"><div><strong>${stats.days[today()] || 0}</strong><span>今日の回答</span></div><div><strong>${accuracy()}</strong><span>累計正答率</span></div><div><strong>${weakIds().length}</strong><span>復習したい動き</span></div></div>${storageNote()}`;
  }
  const currentIds = () => session.groups[session.round];
  const playbackMarkup = () => `<div class="play-controls" aria-label="デモ再生設定"><button data-action="pause">${paused ? '▶ 再生' : 'Ⅱ 一時停止'}</button><button data-action="replay">↻ 最初から</button><button data-action="speed" class="${speed !== 1 ? 'active' : ''}">${speed}× 速度</button></div>`;
  function renderQuiz() {
    const ids = currentIds();
    if (!ids) { view = 'result'; renderResult(); return; }
    if (!selected || !ids.includes(selected)) selected = ids.find(id => !session.assignments[id]) || ids[0];
    const results = session.graded ? core.grade(ids, session.assignments) : null;
    app.innerHTML = `<div class="quiz-top"><button data-action="leave">← 中断して保存</button><span class="quiz-counter">${session.round + 1} / ${session.groups.length} 問</span></div><div class="progress-bar"><span style="width:${session.round / session.groups.length * 100}%"></span></div><h1 class="question-heading">動きと名前を組み合わせよう。</h1><p class="instruction">${session.graded ? '正解と見るポイントを確認して、次の問題へ。' : '① 動きをタップ → ② 下から名前を選ぶ'}</p>${playbackMarkup()}<div class="motion-board">${ids.map((id, index) => {
      const item = byId.get(id);
      const chosen = byId.get(session.assignments[id]);
      const correct = chosen?.id === id;
      return `<article class="motion-row ${!session.graded && selected === id ? 'selected' : ''} ${session.graded ? correct ? 'correct' : 'wrong' : ''}"><button class="motion-select" data-select="${id}" aria-label="動き ${'ABC'[index]} を選ぶ" aria-pressed="${selected === id}" ${session.graded ? 'disabled' : ''}>${renderer.markup(item)}<span class="letter">${'ABC'[index]}</span></button><div class="motion-info"><div class="assigned"><small>${session.graded ? correct ? '✓ 正解' : '✕ 正解はこちら' : selected === id ? '● 選択中' : '組み合わせる名前'}</small>${escape(session.graded ? item.title : chosen?.title || '名前を選んでください')}${session.graded && !correct && chosen ? `<small>あなたの回答：${escape(chosen.title)}</small>` : ''}</div><button class="enlarge" data-preview="${id}">⤢ 大きく見る</button></div></article>`;
    }).join('')}</div>${!session.graded ? `<p class="bank-label">NAMES / 名前を選ぶ</p><div class="name-bank">${session.names[session.round].map(id => {
      const item = byId.get(id); const owner = ids.find(motionId => session.assignments[motionId] === id);
      return `<button class="name-choice ${owner ? 'used' : ''}" data-name="${id}">${escape(item.title)}<span>${escape(item.titleEn)}${owner ? ` · ${'ABC'[ids.indexOf(owner)]} に選択済み` : ''}</span></button>`;
    }).join('')}</div><button class="primary" data-action="grade" ${ids.every(id => session.assignments[id]) ? '' : 'disabled'}>答え合わせ <span class="arrow">→</span></button>` : `<div role="status" class="feedback ${results.every(r => r.correct) ? '' : 'wrong'}">${results.every(r => r.correct) ? 'すべて正解！' : `${results.filter(r => r.correct).length} / ${ids.length} 個正解。`} ${results.every(r => r.correct) ? '動きと名前がつながりました。' : '間違えた動きは復習に追加しました。'}</div><div class="explanations">${ids.map((id, i) => { const item = byId.get(id); return `<details><summary>${'ABC'[i]} · ${escape(item.title)}<br><span class="english">${escape(item.titleEn)}</span></summary><p>${escape(item.description)}</p><p><strong>見るポイント</strong><br>${escape(item.focus || item.description)}</p><a href="https://motion-reference.takayustudio.jp/#motion=${encodeURIComponent(id)}" target="_blank" rel="noopener noreferrer">元サイトで確認 ↗</a></details>`; }).join('')}</div><button class="primary" data-action="next">${session.round + 1 === session.groups.length ? '結果を見る' : '次の問題へ'} <span class="arrow">→</span></button>`}${storageNote()}`;
    // 採点後もデモのコントラストを保つ。
    if (session.graded) app.querySelectorAll('.motion-select').forEach(button => { button.disabled = false; button.removeAttribute('data-select'); });
  }
  function renderResult() {
    const total = session.results.length;
    const correct = session.results.filter(item => item.correct).length;
    const wrong = session.results.filter(item => !item.correct);
    app.innerHTML = `<p class="eyebrow">NICE LITTLE STUDY SESSION</p><div class="score-display"><div class="score-circle"><strong>${correct}<span style="font-size:19px"> / ${total}</span></strong><span>正解した組み合わせ</span></div><h1 class="question-heading">今日の一歩、できました。</h1><p class="intro">${wrong.length ? '間違えた動きは、もう一度見ると覚えやすくなります。' : 'すべて正解。次は別の動きにも挑戦してみましょう。'}</p></div><div class="result-actions">${wrong.length ? '<button class="primary" data-action="retry">間違えた動きでもう一度 ↗</button>' : ''}<button class="${wrong.length ? 'secondary' : 'primary'}" data-action="start">同じ範囲で次のセット →</button><button class="secondary" data-action="home">カテゴリーを選び直す</button></div>${wrong.length ? `<div class="explanations" style="margin-top:25px"><h2>もう一度見たい動き</h2>${wrong.map(result => { const item = byId.get(result.id); return `<details><summary>${escape(item.title)}</summary><p>${escape(item.description)}</p><button class="secondary" data-preview="${item.id}">動きを見る</button></details>`; }).join('')}</div>` : ''}`;
  }
  function renderLibrary() {
    const list = library.filter(item => (libraryCategory === 'all' || item.category === libraryCategory) && `${item.title} ${item.titleEn} ${item.description}`.toLowerCase().includes(query.toLowerCase()));
    app.innerHTML = `<p class="eyebrow">MOTION NOTEBOOK</p><h1 class="question-heading">名前を知る。動きを見る。</h1><p class="instruction">クイズの前に、気になる動きを見ておこう。</p><label><span class="sr-only">名前を検索</span><input id="search" type="search" placeholder="名前・英語名で検索" value="${escape(query)}"></label><label><span class="sr-only">図鑑のカテゴリー</span><select id="library-category" style="margin-top:10px">${categoryOptions(libraryCategory, false)}</select></label><p class="bank-label">${list.length} MOTIONS${list.length ? ` · ${Math.min(libraryLimit, list.length)} 件表示` : ''}</p><div class="library-list">${list.slice(0, libraryLimit).map(item => `<article class="library-card">${renderer.markup(item)}<div class="library-body"><h3>${escape(item.title)}</h3><div class="english">${escape(item.titleEn)}</div><p>${escape(item.description)}</p><div class="library-controls"><span>${escape(categories.find(cat => cat.id === item.category)?.label)}${stats.items[item.id]?.weak ? ' · 要復習' : ''}</span><button class="secondary" data-preview="${item.id}">詳しく見る ↗</button></div></div></article>`).join('')}</div>${!list.length ? '<div class="empty">該当する動きはありません。<br>検索語やカテゴリーを変えてみてください。</div>' : list.length > libraryLimit ? '<button class="secondary primary library-footer" data-action="more">さらに12件表示</button>' : ''}`;
  }
  function renderProgress() {
    const attempted = Object.keys(stats.items).length;
    const mastered = Object.values(stats.items).filter(item => item.streak >= 2).length;
    const weak = weakIds();
    app.innerHTML = `<p class="eyebrow">SMALL STEPS, REAL PROGRESS</p><h1 class="question-heading">少しずつ、覚えていこう。</h1><div class="progress-overview"><strong>${attempted}<span style="font-size:17px"> / ${library.length}</span></strong><span>出会った動き</span></div><div class="metric-grid"><div class="metric"><strong>${accuracy()}</strong><span>累計正答率</span></div><div class="metric"><strong>${mastered}</strong><span>2回連続で正解</span></div><div class="metric"><strong>${Object.keys(stats.days).length}</strong><span>学習した日数</span></div><div class="metric"><strong>${stats.days[today()] || 0}</strong><span>今日回答した組み合わせ</span></div></div><h2>復習したい動き <span class="english">${weak.length}種類</span></h2>${weak.length ? `<button class="primary" data-action="weak-all">苦手をまとめて復習 →</button>${weak.slice(0, 30).map(id => `<div class="weak-row"><button class="enlarge" data-preview="${id}">${escape(byId.get(id).title)} ↗</button><span>${stats.items[id].correct} / ${stats.items[id].attempts} 正解</span></div>`).join('')}` : '<div class="empty">復習したい動きは、まだありません。<br>間違えた項目がここに集まります。</div>'}<p class="privacy-note">記録はこのブラウザだけに保存されます。端末を変えたり、ブラウザのデータを消すと引き継がれません。苦手な動きは2回連続で正解すると復習リストから外れます。</p><button class="secondary" data-action="export">学習記録を保存 ↓</button><p class="privacy-note">スマホではブラウザのメニューから「ホーム画面に追加」すると開きやすくなります。画面右上が「オフライン準備完了」になったら、通信がない場所でも使えます。</p>${storageNote()}`;
  }
  function start(customPool) {
    const items = customPool || pool();
    if (!items.length) return;
    session = core.makeSession(items, preferences.rounds);
    session.category = preferences.category; session.mode = preferences.mode;
    selected = null; persist(); view = 'quiz'; render(); window.scrollTo(0, 0);
  }
  function closePreview() { previewClips.forEach(clip => clip.cancel()); previewClips = []; document.getElementById('preview').close(); }
  function preview(id) {
    const item = byId.get(id);
    const hide = view === 'quiz' && !session.graded;
    const dialog = document.getElementById('preview');
    document.getElementById('preview-content').innerHTML = `<h2>${hide ? `動き ${'ABC'[currentIds().indexOf(id)]}` : escape(item.title)}</h2>${renderer.markup(item)}${hide ? '' : `<p>${escape(item.description)}</p><p><strong>見るポイント</strong><br>${escape(item.focus || item.description)}</p>`}${playbackMarkup()}`;
    dialog.showModal();
    const stage = dialog.querySelector('[data-stage-id]');
    if (hide) maskAnswer(stage.querySelector('canvas'), currentIds().map(motionId => byId.get(motionId)));
    renderer.fit(stage); previewClips = renderer.animate(stage, item, speed, allowMotion);
    if (paused) previewClips.forEach(clip => clip.pause());
  }
  document.getElementById('close-preview').addEventListener('click', closePreview);
  document.getElementById('preview').addEventListener('cancel', event => { event.preventDefault(); closePreview(); });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.preview) { preview(button.dataset.preview); return; }
    if (button.dataset.select && view === 'quiz' && !session.graded) { selected = button.dataset.select; render(); return; }
    if (button.dataset.name && view === 'quiz' && !session.graded) {
      session.assignments = core.assign(session.assignments, selected, button.dataset.name);
      selected = currentIds().find(id => !session.assignments[id]) || selected; persist(); render(); return;
    }
    if (button.dataset.mode) { preferences.mode = button.dataset.mode; persist(); render(); return; }
    if (button.dataset.length) { preferences.rounds = Number(button.dataset.length); persist(); render(); return; }
    switch (button.dataset.action) {
      case 'start': start(); break;
      case 'resume': view = 'quiz'; render(); break;
      case 'home': case 'leave': persist(); view = 'home'; render(); window.scrollTo(0, 0); break;
      case 'grade': {
        if (session.graded || !currentIds().every(id => session.assignments[id])) break;
        const results = core.grade(currentIds(), session.assignments);
        stats = core.record(stats, results, today()); session.results.push(...results); session.graded = true;
        persist(); render(); break;
      }
      case 'next': session.round++; session.assignments = {}; session.graded = false; selected = null; persist(); view = session.round >= session.groups.length ? 'result' : 'quiz'; render(); window.scrollTo(0, 0); break;
      case 'retry': start(session.results.filter(result => !result.correct).map(result => byId.get(result.id))); break;
      case 'weak-all': preferences.category = 'all'; preferences.mode = 'weak'; start(); break;
      case 'more': libraryLimit += 12; render(); break;
      case 'pause': {
        paused = !paused; if (!paused) allowMotion = true;
        [...clips, ...previewClips].forEach(clip => paused ? clip.pause() : clip.play());
        document.querySelectorAll('[data-action="pause"]').forEach(control => control.textContent = paused ? '▶ 再生' : 'Ⅱ 一時停止'); break;
      }
      case 'speed': speed = speed === 1 ? .5 : speed === .5 ? .25 : 1; [...clips, ...previewClips].forEach(clip => clip.playbackRate = speed); document.querySelectorAll('[data-action="speed"]').forEach(control => { control.textContent = `${speed}× 速度`; control.classList.toggle('active', speed !== 1); }); break;
      case 'replay': [...clips, ...previewClips].forEach(clip => clip.currentTime = 0); break;
      case 'export': {
        const url = URL.createObjectURL(new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), stats }, null, 2)], { type: 'application/json' }));
        const link = document.createElement('a'); link.href = url; link.download = `motion-match-${today()}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); break;
      }
    }
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'category') { preferences.category = event.target.value; persist(); render(); }
    if (event.target.id === 'library-category') { libraryCategory = event.target.value; libraryLimit = 12; render(); }
  });
  let searchTimer;
  document.addEventListener('input', event => {
    if (event.target.id !== 'search') return;
    const input = event.target; query = input.value; const position = input.selectionStart;
    clearTimeout(searchTimer); searchTimer = setTimeout(() => { libraryLimit = 12; render(); const next = document.getElementById('search'); next.focus(); try { next.setSelectionRange(position, position); } catch {} }, 240);
  });
  window.addEventListener('hashchange', () => {
    closePreview(); view = ['library', 'progress'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home'; render(); window.scrollTo(0, 0);
  });
  document.addEventListener('visibilitychange', () => {
    [...clips, ...previewClips].forEach(clip => document.hidden || paused ? clip.pause() : clip.play()); persist();
  });
  window.addEventListener('resize', () => document.querySelectorAll('[data-stage-id]').forEach(renderer.fit));
  function connection() {
    document.getElementById('connection').textContent = cacheReady ? (navigator.onLine ? 'オフライン準備完了' : 'オフラインで学習中') : cacheError ? '保存未完了 · 通信が必要' : 'オフライン用に保存中';
  }
  ['online', 'offline'].forEach(event => window.addEventListener(event, connection));
  async function prepareOffline() {
    if (!('serviceWorker' in navigator) || location.protocol === 'file:') { cacheError = true; connection(); return; }
    try {
      navigator.serviceWorker.addEventListener('message', event => { if (event.data?.type === 'CACHE_READY') { cacheReady = true; connection(); } });
      const registration = await navigator.serviceWorker.register('./sw.js');
      await navigator.serviceWorker.ready;
      if (registration.active) registration.active.postMessage({ type: 'CHECK_CACHE' });
      connection();
    } catch (error) { console.error('オフライン保存エラー', error); cacheError = true; connection(); }
  }
  view = ['library', 'progress'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
  render(); prepareOffline();
})();
