const motions = window.MOTION_LIBRARY || [];
const categories = window.MOTION_CATEGORIES || [];

const I18N = {
  ja: {
    textMotionHeading: "テキストモーション", textGuides: "テキストの手法ガイド", textGuidesDescription: "文字の分け方・読みやすさ・アクセシビリティ・日本語・ツール別の作り方。",
    tryText: "試す文字", tryTextPlaceholder: "入力するとテキストモーションのデモがこの文字で動きます（「/」で区切ると複数）", dialogTextPlaceholder: "ここに入力して試す（「/」で区切ると複数）", clear: "クリア",
    fontSans: "ゴシック", fontSerif: "明朝", fontMono: "等幅", guideBack: "← ガイド一覧", guideRelated: "このガイドに関係する項目", guideSources: "参考資料", guideSections: "目次",
    researchReports: "調査レポート", researchNote: "テキストモーションの項目とガイドの土台にした調査メモです（日本語のみ）。", openReport: "レポートを開く", closeReport: "閉じる",
    valuesHeading: "数値・キーワード", sourcesLabel: "出典",
    downloadDemo: "再現用HTMLを保存",
    segmentEasingNote: "外側は一定速度。各区間に加速・減速を付けています（実装コードに記載）",
    authoredEasingNote: "名前は動きの性格を示します。中間ポーズの時刻はレシピどおりで、各区間に加速・減速を付けています",
    copyEasingLabel: "CSSのイージング値をコピー",
    onionSkin: "オニオンスキン", onionSkinLabel: "一定間隔のコマを重ねて、動きの間隔（スペーシング）を表示",
    prevMotion: "前のモーション", nextMotion: "次のモーション", homeLabel: "モーションリファレンス ホーム", languageLabel: "表示言語", mainMenuLabel: "メインメニュー", filterPanelLabel: "絞り込み", dialogNavLabel: "モーション送り", curveGraphLabel: "イージングカーブ", codeTabsLabel: "実装方式",
    dialogShortcuts: "← → 前後のモーション　Space 再生・停止　, . コマ送り　O オニオンスキン",
    filterToggle: "絞り込み・再生設定", randomMotion: "おまかせ", randomMotionLabel: "表示中の一覧からランダムに1つ開く",
    semanticNote: "専用デモでは題材を固定しています。図形・UI・テキストは同じシーンを表示し、効果比較では静止状態と並べて確認できます。",
    home: "ホーム", all: "すべて", favorites: "お気に入り", categories: "カテゴリー",
    featuredTitle: "基本の動き", featuredDescription: "制作で使う頻度が高い、動きの基本形です。", livePreview: "LIVE PREVIEW",
    preview: "表示例", shapePreview: "図形", uiPreview: "UI", textPreview: "テキスト", comparePreview: "効果比較",
    autoLoop: "自動ループ中", pausedLoop: "一覧を一時停止中", soloLoop: "選択した動きだけ再生", reducedMotion: "端末の設定により動きを停止中",
    playAll: "すべて再生", pauseAll: "一時停止", soloPlayback: "選択のみ",
    noEffect: "静止状態", withEffect: "モーションあり",
    feeling: "感触", usage: "用途", speed: "速さ", allMotions: "すべてのモーション",
    sort: "並び順", recommended: "おすすめ順", shortest: "短い順", titleSort: "名前順",
    emptyTitle: "該当するモーションがありません", emptyDescription: "検索語や絞り込みを変更してください。", reset: "絞り込みをリセット",
    operator: "運営", footerPurpose: "映像・UI・アニメーション制作で動きを設計するための、オリジナルデモによる個人学習用リファレンスです。",
    duration: "動きの長さ", easing: "イージング", easingCurve: "時間進行の目安", curveNote: "外側の時間進行を示す模式図です。物体の実測速度ではなく、各区間の加速・減速は実装コードで確認できます。", focus: "見るポイント", caution: "使うときの注意", tips: "再現のコツ", recipe: "再現ポイント", webRecipe: "Web実装のポイント",
    saveFavorite: "お気に入りに保存", savedFavorite: "お気に入り済み", copyLink: "リンクをコピー",
    homeTitle: "モーションリファレンス", homeDescription: "動きの名前・速さ・イージングから、つくりたい感触を探す。",
    allTitle: "すべてのモーション", allDescription: `${motions.length}種類の動きを、用途・感触・イージングから比較する。`,
    favoriteTitle: "お気に入り", favoriteDescription: "保存した動きをまとめて比較する。",
    categorySuffix: "の動きを比較する。", searchPlaceholder: "動き・用途・感触を検索  /",
    allFilter: "すべて", copied: "コピーしました", favoriteAdded: "お気に入りに保存しました", favoriteRemoved: "お気に入りから外しました",
    noFavorites: "お気に入りはまだありません", noFavoritesDescription: "カードの星を押すと、ここに保存できます。", operatorName: "たかゆ / TakayuStudio", pageTitle: "モーションリファレンス | 動き・イージング辞典",
    openDetailSuffix: "の詳細を見る", favoriteSaveLabel: "お気に入りに保存", favoriteRemoveLabel: "お気に入りから外す", replayLabel: "最初から再生",
    menuOpenLabel: "メニューを開く", menuCloseLabel: "メニューを閉じる", closeLabel: "閉じる", pauseLabel: "一時停止", playLabel: "再生",
    previousFrameLabel: "1フレーム戻る", nextFrameLabel: "1フレーム進む", loopLabel: "ループ", timelineLabel: "再生位置", copyRecipeLabel: "レシピをコピー",
    standardGridLabel: "標準表示", compactGridLabel: "小さく表示", previewGroupLabel: "表示例", speedGroupLabel: "再生速度", densityGroupLabel: "グリッドサイズ",
    playbackModeGroupLabel: "一覧の再生方法", tryInteraction: "操作して試す", stopInteraction: "自動再生に戻す",
    interactionScroll: "ホイールまたは上下ドラッグで進行を操作", interactionPointer: "ポインタ移動・クリックで反応を操作", interactionDrag: "左右または上下へドラッグして操作", interactionClick: "クリックして状態を切り替え",
    implementationGuide: "実装の目安", trigger: "きっかけ", reducedAlternative: "動きを減らす場合", implementationCode: "実装コード", copyCode: "コードをコピー", codeNote: "seek(t) はこのデモそのもの（時間 t だけで 1 コマが決まる関数）です。CSS・WAAPI・GSAP は主なカーブを使った雛形で、HTML保存ではそのまま動く再現例を取得できます。",
    comparisonLab: "比較・調整ラボ", comparisonDescription: "Aを基準に、Bの動きと値を変えて差を確認できます。", replayComparison: "比較を再生", amplitude: "振幅", stagger: "遅延", inputBadge: "入力", costBadge: "負荷", techBadge: "技術",
    loadMore: "さらに表示", sourceBadge: "出典", hapticBadge: "触感"
  },
  en: {
    textMotionHeading: "Text motion", textGuides: "Text technique guides", textGuidesDescription: "Splitting, readability, accessibility, Japanese typography and tool-by-tool methods.",
    tryText: "Try text", tryTextPlaceholder: "Type to drive the text-motion demos with your text (use “/” for several)", dialogTextPlaceholder: "Type here to try (use “/” for several)", clear: "Clear",
    fontSans: "Sans", fontSerif: "Serif", fontMono: "Mono", guideBack: "← All guides", guideRelated: "Related items", guideSources: "References", guideSections: "Contents",
    researchReports: "Research reports", researchNote: "Working notes behind the text-motion items and guides (Japanese only).", openReport: "Open report", closeReport: "Close",
    valuesHeading: "Values & keywords", sourcesLabel: "Sources",
    downloadDemo: "Save standalone HTML",
    segmentEasingNote: "Linear outer clock; each segment carries its own acceleration (see the code)",
    authoredEasingNote: "The name describes the character. Intermediate poses land at the recipe times, with easing per segment",
    copyEasingLabel: "Copy the CSS easing value",
    onionSkin: "Onion skin", onionSkinLabel: "Overlay evenly timed frames to reveal spacing",
    prevMotion: "Previous motion", nextMotion: "Next motion", homeLabel: "Motion Reference home", languageLabel: "Display language", mainMenuLabel: "Main menu", filterPanelLabel: "Filters", dialogNavLabel: "Motion navigation", curveGraphLabel: "Easing curve", codeTabsLabel: "Implementation",
    dialogShortcuts: "← → Previous/next  ·  Space Play/pause  ·  , . Step frames  ·  O Onion skin",
    filterToggle: "Filters & playback", randomMotion: "Surprise me", randomMotionLabel: "Open a random motion from the current list",
    semanticNote: "Dedicated studies preserve their subject across Shape, UI, and Text. Compare places a static state beside the animated scene.",
    home: "Home", all: "All", favorites: "Favorites", categories: "Categories",
    featuredTitle: "Motion Essentials", featuredDescription: "Frequently used foundations for motion design.", livePreview: "LIVE PREVIEW",
    preview: "Example", shapePreview: "Shape", uiPreview: "UI", textPreview: "Text", comparePreview: "Compare",
    autoLoop: "Auto-looping", pausedLoop: "Gallery paused", soloLoop: "Playing selected motion only", reducedMotion: "Motion paused by your device setting",
    playAll: "Play all", pauseAll: "Pause", soloPlayback: "Selected only",
    noEffect: "Static state", withEffect: "Animated",
    feeling: "Feeling", usage: "Use", speed: "Speed", allMotions: "All Motions",
    sort: "Sort", recommended: "Recommended", shortest: "Shortest", titleSort: "Name",
    emptyTitle: "No motions found", emptyDescription: "Try changing the search or filters.", reset: "Reset filters",
    operator: "Operator", footerPurpose: "An original motion-demo reference for planning video, UI, and animation movement.",
    duration: "Motion length", easing: "Easing", easingCurve: "Timeline guide", curveNote: "A schematic of the outer timeline, not measured object velocity. See the implementation code for per-segment acceleration and easing.", focus: "What to watch", caution: "Use with care", tips: "Recreation tips", recipe: "Recreation notes", webRecipe: "Web implementation notes",
    saveFavorite: "Save favorite", savedFavorite: "Saved", copyLink: "Copy link",
    homeTitle: "Motion Reference", homeDescription: "Find the right feel by movement, speed, and easing.",
    allTitle: "All Motions", allDescription: `Compare ${motions.length} movements by use, feeling, and easing.`,
    favoriteTitle: "Favorites", favoriteDescription: "Compare the movements you saved.",
    categorySuffix: " movements.", searchPlaceholder: "Search movement, use, or feeling  /",
    allFilter: "All", copied: "Copied", favoriteAdded: "Saved to favorites", favoriteRemoved: "Removed from favorites",
    noFavorites: "No favorites yet", noFavoritesDescription: "Use the star on a card to save it here.", operatorName: "Takayu / TakayuStudio", pageTitle: "Motion Reference | Movement & Easing Dictionary",
    openDetailSuffix: " details", favoriteSaveLabel: "Save favorite", favoriteRemoveLabel: "Remove favorite", replayLabel: "Restart motion",
    menuOpenLabel: "Open menu", menuCloseLabel: "Close menu", closeLabel: "Close", pauseLabel: "Pause", playLabel: "Play",
    previousFrameLabel: "Previous frame", nextFrameLabel: "Next frame", loopLabel: "Loop", timelineLabel: "Playback position", copyRecipeLabel: "Copy recipe",
    standardGridLabel: "Standard grid", compactGridLabel: "Compact grid", previewGroupLabel: "Preview example", speedGroupLabel: "Playback speed", densityGroupLabel: "Grid size",
    playbackModeGroupLabel: "Gallery playback", tryInteraction: "Try interaction", stopInteraction: "Return to auto play",
    interactionScroll: "Use the wheel or vertical drag to scrub progress", interactionPointer: "Move or click the pointer to drive the response", interactionDrag: "Drag horizontally or vertically to drive the motion", interactionClick: "Click to toggle the state",
    implementationGuide: "Implementation guide", trigger: "Trigger", reducedAlternative: "Reduced-motion alternative", implementationCode: "Implementation code", copyCode: "Copy code", codeNote: "seek(t) is this exact demo: a function of time t that draws one frame. CSS, WAAPI and GSAP are templates using its main curve; Save HTML gives a runnable copy.",
    comparisonLab: "Comparison and tuning lab", comparisonDescription: "Keep A as the baseline and change B's motion and values.", replayComparison: "Replay comparison", amplitude: "Amplitude", stagger: "Stagger", inputBadge: "Input", costBadge: "Cost", techBadge: "Tech",
    loadMore: "Show more", sourceBadge: "Source", hapticBadge: "Haptic"
  }
};

const FEELINGS = [
  { id: "all", ja: "すべて", en: "All" },
  { id: "なめらか", ja: "なめらか", en: "Smooth" },
  { id: "きびきび", ja: "きびきび", en: "Crisp" },
  { id: "やわらかい", ja: "やわらかい", en: "Soft" },
  { id: "重い", ja: "重い", en: "Heavy" },
  { id: "弾む", ja: "弾む", en: "Bouncy" }
];

const USAGES = [
  { id: "all", ja: "すべて", en: "All" },
  { id: "UI", ja: "UI", en: "UI" },
  { id: "テキスト", ja: "テキスト", en: "Text" },
  { id: "ロゴ", ja: "ロゴ", en: "Logo" },
  { id: "キャラクター", ja: "キャラクター", en: "Character" },
  { id: "3D", ja: "3D", en: "3D" }
];

const PREVIEW_MODES = [
  { id: "shape", key: "shapePreview" },
  { id: "ui", key: "uiPreview" },
  { id: "text", key: "textPreview" },
  { id: "compare", key: "comparePreview" }
];

const WEB_CATEGORIES = new Set(["web-scroll", "web-interaction", "web-layout", "web-feedback", "form-state", "gesture", "svg-path"]);

const ACCENTS = { purple: "#7257ff", cyan: "#22bdd6", coral: "#ff725e", yellow: "#f2c84b" };
const state = {
  language: localStorage.getItem("motion-reference-language") || "ja",
  view: "home",
  category: "all",
  feeling: "all",
  usage: "all",
  previewMode: localStorage.getItem("motion-reference-preview") || "shape",
  query: "",
  speed: Number(localStorage.getItem("motion-reference-speed")) || 1,
  density: localStorage.getItem("motion-reference-density") || "standard",
  sort: "recommended",
  playbackMode: localStorage.getItem("motion-reference-playback") || "loop",
  visibleLimit: 120,
  favorites: new Set(JSON.parse(localStorage.getItem("motion-reference-favorites") || "[]"))
};

// テキストモーションの「試す文字」・書体・見本の言語・開いている手法ガイド
const textState = {
  text: (() => { try { return localStorage.getItem("motion-reference-text") || ""; } catch { return ""; } })(),
  font: (() => { try { return localStorage.getItem("motion-reference-text-font") || "sans"; } catch { return "sans"; } })(),
  sampleLang: "",
  guide: null
};
function syncTextEngine() {
  window.TEXTMOTION?.setOptions({ text: textState.text, font: textState.font, lang: textState.text ? state.language : (textState.sampleLang || state.language) });
}
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const cardAnimations = new Map();
let cardObserver = null;
let selectedMotion = null;
let dialogAnimations = [];
let dialogPlaying = true;
let dialogLoop = true;
let dialogSpeed = 1;
let timelineFrame = 0;
let toastTimer = 0;
let activeCodeTab = "seek";
let interactionMode = false;
let interactionCleanup = null;
let comparisonAnimations = [];
let semanticInstance = 0;
const AUTHORED_LINEAR_OPT_OUT = new Set(["neonFlicker", "glitchIn"]);
const POINTER_PATHS = {
  hoverLift: [{ transform: "translate(58px,40px)", opacity: 0 }, { transform: "translate(58px,40px)", opacity: 1, offset: .06 }, { transform: "translate(0,0)", offset: .19 }, { transform: "translate(0,0)", offset: .69 }, { transform: "translate(58px,40px)", opacity: 1, offset: .8 }, { transform: "translate(58px,40px)", opacity: 1, offset: .94 }, { transform: "translate(58px,40px)", opacity: 0 }],
  magneticButton: [{ transform: "translate(54px,49px)", opacity: 0 }, { transform: "translate(54px,49px)", opacity: 1, offset: .06 }, { transform: "translate(8px,-26px)", offset: .27 }, { transform: "translate(-102px,19px)", offset: .52 }, { transform: "translate(54px,49px)", opacity: 1, offset: .66 }, { transform: "translate(54px,49px)", opacity: 1, offset: .92 }, { transform: "translate(54px,49px)", opacity: 0 }],
  pointerTilt: [{ transform: "translate(-58px,-18px)", opacity: 0 }, { transform: "translate(-58px,-18px)", opacity: 1, offset: .06 }, { transform: "translate(-58px,-18px)", offset: .1 }, { transform: "translate(0,-45px)", offset: .32 }, { transform: "translate(0,-45px)", offset: .44 }, { transform: "translate(-114px,11px)", offset: .66 }, { transform: "translate(-114px,11px)", offset: .78 }, { transform: "translate(-58px,-18px)", opacity: 1, offset: .92 }, { transform: "translate(-58px,-18px)", opacity: 0 }],
  cardSpotlight: [{ transform: "translate(-113px,-40px)" }, { transform: "translate(-3px,4px)" }, { transform: "translate(-113px,-40px)" }],
  buttonFillHover: [{ transform: "translate(0,30px)", opacity: 0 }, { transform: "translate(0,30px)", opacity: 1, offset: .05 }, { transform: "translate(-50px,0)", offset: .2 }, { transform: "translate(-50px,0)" }]
};
const EXTRA_PATHS = {
  sidebarBackdrop: () => [{ opacity: 0 }, { opacity: 0, offset: .12 }, { opacity: .62, offset: .78 }, { opacity: .62 }],
  dialogBackdrop: () => [{ opacity: 0 }, { opacity: .65, offset: .45 }, { opacity: .65 }],
  sheetBackdrop: () => [{ opacity: 0 }, { opacity: .5, offset: .62 }, { opacity: .45 }],
  paletteRow: row => [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 0, transform: "translateY(6px)", offset: .3 + row * .07 }, { opacity: 1, transform: "translateY(0)", offset: .55 + row * .07 }, { opacity: 1, transform: "translateY(0)" }],
  dropdownOption: row => [{ opacity: 0, transform: "translateY(-3px)" }, { opacity: 0, transform: "translateY(-3px)", offset: .62 + row * .05 }, { opacity: 1, transform: "translateY(0)", offset: .8 + row * .05 }, { opacity: 1, transform: "translateY(0)" }],
  switchTrack: () => [{ backgroundColor: "#3a4458" }, { backgroundColor: "#3a4458", offset: .3 }, { backgroundColor: "#4b66a8", offset: .45 }, { backgroundColor: "#4b66a8" }],
  fieldBorder: () => [{ borderColor: "#596579" }, { borderColor: "#ff725e" }],
  pinchFinger: finger => {
    const direction = finger ? 1 : -1;
    return [{ transform: "translate(0,-50%)" }, { transform: `translate(${direction * 45}px,-50%)`, offset: .72 }, { transform: `translate(${direction * 34.5}px,-50%)` }];
  }
};
const REAL_TIME_PATTERNS = new Set(["spring"]);
const SPRING_LINEAR_SUPPORTED = typeof CSS !== "undefined" && CSS.supports?.("animation-timing-function", "linear(0, 1)");
const SPRING_CHAIN = { mass: 1, stiffness: 80, damping: 10, travel: 175, lead: .1, settleHold: 1.7, cycle: 1.8, links: 4, sampleEvery: .025 };
let springChainCache = null;
// Pixel-authored base demos render on a fixed 320x180 canvas that is scaled to
// the stage, so cards, the detail view, and the comparison lab share one composition.
const LEGACY_CANVAS = { width: 320, height: 180, maxScale: 2.4 };
// Every demo is authored at card size (px offsets inside % layouts), so all of
// them render on the same canvas and scale as one picture.
function usesLegacyCanvas(item) {
  return Boolean(item) && !atlasDemo(item);
}
// MOTION ATLAS 方式（時間 t の関数で描くキャンバス）のデモ
function atlasDemo(item) {
  if (!item) return null;
  return engineOf(item)?.get(item.demoId || item.id) || null;
}
// 描画エンジン：テキストモーションの項目は TEXTMOTION（文字の道具つき）、それ以外は ATLAS
function engineOf(item) {
  return item?.engine === "text" ? window.TEXTMOTION : window.ATLAS;
}
function isTextItem(item) {
  return item?.engine === "text";
}

const observedLegacyStages = new Set();
const legacyStageObserver = "ResizeObserver" in window ? new ResizeObserver(entries => entries.forEach(entry => fitLegacyCanvas(entry.target))) : null;
let onionSkin = false;
let onionAnimations = [];
const compactFilterQuery = matchMedia("(max-width: 680px)");

init();

function init() {
  onionSkin = readStoredFlag("motion-reference-onion");
  setFilterPanelCollapsed(compactFilterQuery.matches);
  renderNavigation();
  renderFilters();
  bindEvents();
  applyLanguage();
  render();
  openFromHash();
}

function bindEvents() {
  document.addEventListener("click", event => {
    const languageButton = event.target.closest("[data-language]");
    if (languageButton) {
      state.language = languageButton.dataset.language;
      localStorage.setItem("motion-reference-language", state.language);
      applyLanguage();
      renderNavigation();
      renderFilters();
      render();
      if (selectedMotion) {
        populateDialog(selectedMotion);
        renderOnionSkin();
        startDialogAnimation(0);
      }
      return;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      textState.guide = null;
      state.view = viewButton.dataset.view;
      state.category = "all";
      state.query = "";
      state.visibleLimit = 120;
      $("#searchInput").value = "";
      closeSidebar();
      render();
      return;
    }

    const guideButton = event.target.closest("[data-text-guide]");
    if (guideButton) {
      event.preventDefault();
      if ($("#detailDialog").open) closeDialog();
      state.view = "textGuides";
      textState.guide = guideButton.dataset.textGuide || null;
      history.replaceState(null, "", textState.guide ? `#guide=${textState.guide}` : location.pathname + location.search);
      render();
      window.scrollTo({ top: 0 });
      return;
    }
    const guideItem = event.target.closest("[data-guide-item]");
    if (guideItem) { event.preventDefault(); openDialog(guideItem.dataset.guideItem); return; }
    const fontButton = event.target.closest("[data-text-font]");
    if (fontButton) {
      textState.font = fontButton.dataset.textFont;
      try { localStorage.setItem("motion-reference-text-font", textState.font); } catch {}
      syncTextEngine(); updateTextControls();
      return;
    }
    const sampleButton = event.target.closest("[data-text-sample]");
    if (sampleButton) { textState.sampleLang = sampleButton.dataset.textSample; syncTextEngine(); updateTextControls(); return; }

    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      state.view = "category";
      state.category = categoryButton.dataset.category;
      state.query = "";
      state.visibleLimit = 120;
      $("#searchInput").value = "";
      closeSidebar();
      render();
      return;
    }

    const feelingButton = event.target.closest("[data-feeling]");
    if (feelingButton) {
      state.feeling = feelingButton.dataset.feeling;
      state.visibleLimit = 120;
      renderFilters();
      render();
      return;
    }

    const usageButton = event.target.closest("[data-usage]");
    if (usageButton) {
      state.usage = usageButton.dataset.usage;
      state.visibleLimit = 120;
      renderFilters();
      render();
      return;
    }

    const speedButton = event.target.closest("[data-speed]");
    if (speedButton) {
      state.speed = Number(speedButton.dataset.speed);
      localStorage.setItem("motion-reference-speed", String(state.speed));
      renderFilters();
      replayVisibleStages();
      return;
    }

    const playbackModeButton = event.target.closest("[data-playback-mode]");
    if (playbackModeButton) {
      state.playbackMode = playbackModeButton.dataset.playbackMode;
      localStorage.setItem("motion-reference-playback", state.playbackMode);
      renderFilters();
      replayVisibleStages();
      return;
    }

    const codeTab = event.target.closest("[data-code-tab]");
    if (codeTab) {
      activeCodeTab = codeTab.dataset.codeTab;
      renderImplementationCode();
      return;
    }

    const previewButton = event.target.closest("[data-preview-mode]");
    if (previewButton) {
      state.previewMode = previewButton.dataset.previewMode;
      localStorage.setItem("motion-reference-preview", state.previewMode);
      if ($("#detailDialog").open && selectedMotion && previewButton.closest(".dialog-modebar")) {
        stopInteractiveMode();
        renderPreviewControls();
        render();
        $("#dialogStage").innerHTML = stageMarkup(selectedMotion, true);
        observeLegacyCanvases($("#dialogStage"));
        renderOnionSkin();
        startDialogAnimation(0);
        playComparison();
      } else {
        renderFilters();
        render();
      }
      return;
    }

    const densityButton = event.target.closest("[data-density]");
    if (densityButton) {
      state.density = densityButton.dataset.density;
      localStorage.setItem("motion-reference-density", state.density);
      render();
      return;
    }

    const replayButton = event.target.closest("[data-replay]");
    if (replayButton) {
      event.stopPropagation();
      playCardMotion(replayButton.dataset.replay);
      return;
    }

    const favoriteButton = event.target.closest("[data-favorite-id]");
    if (favoriteButton) {
      event.stopPropagation();
      toggleFavorite(favoriteButton.dataset.favoriteId);
      return;
    }

    const card = event.target.closest("[data-motion-id]");
    if (card && !event.target.closest("button")) openDialog(card.dataset.motionId);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && $("#detailDialog").open) {
      event.preventDefault();
      closeDialog();
      return;
    }
    if ($("#detailDialog").open) {
      handleDialogKey(event);
      return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      $("#searchInput").focus();
    }
    if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
      event.preventDefault();
      $("#searchInput").focus();
    }
    const card = event.target.closest("[data-motion-id]");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openDialog(card.dataset.motionId);
    }
  });

  $("#searchInput").addEventListener("input", event => {
    state.query = event.target.value.trim().toLowerCase();
    state.visibleLimit = 120;
    render();
  });
  $("#sortSelect").addEventListener("change", event => {
    state.sort = event.target.value;
    state.visibleLimit = 120;
    render();
  });
  $("#loadMoreButton").addEventListener("click", () => {
    state.visibleLimit += 120;
    render();
  });
  $("#resetButton").addEventListener("click", resetFilters);
  $("#menuButton").addEventListener("click", toggleSidebar);
  $("#sidebarScrim").addEventListener("click", closeSidebar);
  $("#dialogClose").addEventListener("click", closeDialog);
  $("#detailDialog").addEventListener("click", event => {
    if (event.target === $("#detailDialog")) closeDialog();
  });
  $("#detailDialog").addEventListener("cancel", event => {
    event.preventDefault();
    closeDialog();
  });
  $("#restartButton").addEventListener("click", restartDialog);
  $("#playPauseButton").addEventListener("click", toggleDialogPlayback);
  $("#previousFrame").addEventListener("click", () => stepDialog(-1));
  $("#nextFrame").addEventListener("click", () => stepDialog(1));
  $("#timeline").addEventListener("input", event => seekDialog(Number(event.target.value) / 1000));
  $("#dialogSpeed").addEventListener("click", event => {
    const speedButton = event.target.closest("[data-dialog-speed]");
    if (speedButton) {
      dialogSpeed = Number(speedButton.dataset.dialogSpeed);
      updateDialogSpeedButtons();
      dialogAnimations.forEach(animation => { animation.playbackRate = dialogSpeed; });
      return;
    }
    const loopButton = event.target.closest("[data-loop]");
    if (loopButton) {
      dialogLoop = !dialogLoop;
      loopButton.classList.toggle("active", dialogLoop);
      loopButton.setAttribute("aria-pressed", String(dialogLoop));
      startDialogAnimation(currentDialogProgress());
    }
  });
  $("#favoriteButton").addEventListener("click", () => selectedMotion && toggleFavorite(selectedMotion.id));
  $("#copyLinkButton").addEventListener("click", copyCurrentLink);
  $("#copyEasing").addEventListener("click", () => selectedMotion && copyText(cssEasing(selectedMotion.easing)));
  $("#copyRecipe").addEventListener("click", () => selectedMotion && copyText(state.language === "en" ? selectedMotion.recipeEn || selectedMotion.recipe : selectedMotion.recipe));
  $("#copyCode").addEventListener("click", () => selectedMotion && copyText(implementationSnippets(selectedMotion)[activeCodeTab]));
  $("#downloadDemo").addEventListener("click", () => selectedMotion && window.MotionExport.download(selectedMotion));
  $("#interactionModeButton").addEventListener("click", toggleInteractiveMode);
  $("#onionSkinButton").addEventListener("click", toggleOnionSkin);
  $("#prevMotion").addEventListener("click", () => navigateDialog(-1));
  $("#nextMotion").addEventListener("click", () => navigateDialog(1));
  $("#randomButton").addEventListener("click", openRandomMotion);
  $("#filterToggle").addEventListener("click", () => setFilterPanelCollapsed(!$("#filterPanel").classList.contains("is-collapsed")));
  compactFilterQuery.addEventListener("change", event => setFilterPanelCollapsed(event.matches));
  $("#comparisonMotion").addEventListener("change", playComparison);
  $("#replayComparison").addEventListener("click", playComparison);
  ["#tuneDuration", "#tuneAmplitude", "#tuneStagger"].forEach(selector => {
    $(selector).addEventListener("input", () => {
      updateTuningReadouts();
      playComparison();
    });
  });
  $("#tuneEasing").addEventListener("change", playComparison);
  window.addEventListener("hashchange", openFromHash);
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
    render();
    renderFilters();
    if (selectedMotion) { startDialogAnimation(); playComparison(); }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cardAnimations.forEach(animations => animations.forEach(animation => animation.pause()));
      dialogAnimations.forEach(animation => animation.pause());
      comparisonAnimations.forEach(animation => animation.pause());
      cancelAnimationFrame(timelineFrame);
    } else {
      replayVisibleStages();
      if (selectedMotion && dialogPlaying) startDialogAnimation(currentDialogProgress());
      if (selectedMotion) playComparison();
    }
  });
}

function renderNavigation() {
  const language = state.language;
  $("#allCount").textContent = motions.length;
  $("#favoriteCount").textContent = state.favorites.size;
  const text = I18N[language];
  let lastGroup = null;
  $("#categoryNav").innerHTML = categories.map(category => {
    const count = motions.filter(item => item.category === category.id).length;
    const group = category.group || "";
    const heading = group !== lastGroup && group === "text" ? `<p class="side-heading side-subheading">${text.textMotionHeading}</p><button class="side-link${state.view === "textGuides" ? " active" : ""}" data-view="textGuides">${categoryIcon("guide")}<span>${text.textGuides}</span><b>${(window.TEXT_GUIDES || []).length}</b></button>` : "";
    lastGroup = group;
    return `${heading}<button class="side-link${state.view === "category" && state.category === category.id ? " active" : ""}" data-category="${category.id}">
      ${categoryIcon(category.icon)}
      <span>${language === "en" ? category.labelEn : category.label}</span><b>${count}</b>
    </button>`;
  }).join("");
}

function renderFilters() {
  renderPreviewControls();
  $("#feelingFilters").innerHTML = FEELINGS.map(item => `<button class="chip${state.feeling === item.id ? " active" : ""}" data-feeling="${item.id}">${state.language === "en" ? item.en : item.ja}</button>`).join("");
  $("#usageFilters").innerHTML = USAGES.map(item => `<button class="chip${state.usage === item.id ? " active" : ""}" data-usage="${item.id}">${state.language === "en" ? item.en : item.ja}</button>`).join("");
  $$("[data-speed]").forEach(button => button.classList.toggle("active", Number(button.dataset.speed) === state.speed));
  $$("[data-playback-mode]").forEach(button => {
    const active = button.dataset.playbackMode === state.playbackMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  updateLoopStatus();
}

function renderPreviewControls() {
  const text = I18N[state.language];
  const buttons = PREVIEW_MODES.map(mode => `<button class="${state.previewMode === mode.id ? "active" : ""}" data-preview-mode="${mode.id}" aria-pressed="${state.previewMode === mode.id}">${text[mode.key]}</button>`).join("");
  if ($("#previewControl")) $("#previewControl").innerHTML = buttons;
  if ($("#dialogPreviewControl")) $("#dialogPreviewControl").innerHTML = buttons;
}

function render() {
  destroyCardAnimations();
  updateViewHeader();
  renderNavigation();
  updateActiveNavigation();
  const guidesView = state.view === "textGuides";
  $("#textGuidesView").hidden = !guidesView;
  $$("main > section:not(#textGuidesView), main > .load-more-wrap").forEach(el => el.classList.toggle("is-guides-hidden", guidesView));
  if (guidesView) { renderTextGuides(); return; }
  updateTextControls();

  const filtered = filteredMotions();
  const featured = motions.filter(item => item.featured).slice(0, 4);
  const showFeatured = state.view === "home" && !state.query && state.feeling === "all" && state.usage === "all";
  $("#featuredSection").hidden = !showFeatured;
  if (showFeatured) $("#featuredGrid").innerHTML = featured.map(motionCard).join("");

  $("#resultCount").textContent = filtered.length;
  $("#resultTitle").textContent = resultTitle();
  $("#motionGrid").classList.toggle("compact", state.density === "compact");
  const visible = filtered.slice(0, state.visibleLimit);
  $("#motionGrid").innerHTML = visible.map(motionCard).join("");
  $("#motionGrid").hidden = filtered.length === 0;
  $("#emptyState").hidden = filtered.length !== 0;
  const remaining = Math.max(0, filtered.length - visible.length);
  $("#loadMoreWrap").hidden = remaining === 0;
  $("#loadMoreButton span").textContent = I18N[state.language].loadMore;
  $("#loadMoreCount").textContent = remaining ? `+${Math.min(120, remaining)} / ${remaining}` : "";

  if (filtered.length === 0 && state.view === "favorites") {
    $("#emptyState h2").textContent = I18N[state.language].noFavorites;
    $("#emptyState p").textContent = I18N[state.language].noFavoritesDescription;
  } else {
    $("#emptyState h2").textContent = I18N[state.language].emptyTitle;
    $("#emptyState p").textContent = I18N[state.language].emptyDescription;
  }

  $$("[data-density]").forEach(button => {
    const active = button.dataset.density === state.density;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  observeLegacyCanvases();
  updateFilterToggle();
  bindRenderedCardPlayback();
}

function bindRenderedCardPlayback() {
  $$(".motion-card").forEach(card => {
    let lastReplay = 0;
    const replay = () => {
      if (state.playbackMode !== "loop") return;
      const now = performance.now();
      if (now - lastReplay < 90) return;
      lastReplay = now;
      const stage = card.querySelector(".motion-stage[data-stage-id]");
      const item = motions.find(entry => entry.id === stage?.dataset.stageId);
      if (stage && item) playStage(stage, item, true);
    };
    card.addEventListener("mouseenter", replay);
    card.addEventListener("mouseover", event => {
      if (!card.contains(event.relatedTarget)) replay();
    });
    card.addEventListener("focusin", replay);
  });

  const stages = $$(".motion-card .motion-stage[data-stage-id]");
  if (!("IntersectionObserver" in window)) {
    if (state.playbackMode === "loop") stages.forEach(stage => playStage(stage, motions.find(item => item.id === stage.dataset.stageId), true));
    return;
  }
  cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const stage = entry.target;
      if (entry.isIntersecting) {
        if (state.playbackMode === "loop" && !selectedMotion && !document.hidden) playStage(stage, motions.find(item => item.id === stage.dataset.stageId), true);
        else if (!cardAnimations.has(stage)) {
          const item = motions.find(item => item.id === stage.dataset.stageId);
          const still = buildAnimations(stage, item, false, 1, 1);
          still.forEach(animation => animation.pause());
          cardAnimations.set(stage, still);
        }
      } else {
        stopStage(stage);
      }
    });
  }, { rootMargin: "100px 0px" });
  stages.forEach(stage => cardObserver.observe(stage));
}

function filteredMotions() {
  let result = motions.filter(item => {
    if (state.view === "favorites" && !state.favorites.has(item.id)) return false;
    if (state.view === "category" && item.category !== state.category) return false;
    if (state.feeling !== "all" && !item.feelings.includes(state.feeling)) return false;
    if (state.usage !== "all" && !item.usages.includes(state.usage)) return false;
    if (state.query) {
      const category = categories.find(entry => entry.id === item.category);
      const haystack = [
        item.title, item.titleEn, item.description, item.descriptionEn, item.easing,
        item.focus, item.focusEn, item.caution, item.cautionEn, item.recipe,
        item.trigger, item.triggerEn, item.cost, item.costEn, item.reduced, item.reducedEn,
        ...item.tech, ...item.inputs, ...item.inputsEn, ...item.tips, ...item.tipsEn, ...item.feelings, ...item.usages, category?.label, category?.labelEn
      ].join(" ").toLowerCase();
      if (!haystack.includes(state.query)) return false;
    }
    return true;
  });
  if (state.sort === "shortest") result.sort((a, b) => a.duration - b.duration);
  if (state.sort === "title") result.sort((a, b) => localTitle(a).localeCompare(localTitle(b), state.language));
  return result;
}

function motionCard(item) {
  const category = categories.find(entry => entry.id === item.category);
  const favorite = state.favorites.has(item.id);
  const text = I18N[state.language];
  return `<article class="motion-card" style="--motion-accent:${ACCENTS[item.accent]}" data-motion-id="${item.id}" tabindex="0" aria-label="${escapeHTML(localTitle(item) + text.openDetailSuffix)}">
    <div class="motion-card-button">
      ${stageMarkup(item)}
      <div class="card-body">
        <div>
          <h3>${escapeHTML(localTitle(item))}</h3>
          <div class="card-meta">
            <span>${categoryIcon(category.icon)}${escapeHTML(state.language === "en" ? category.labelEn : category.label)}</span>
            <span>${clockIcon()}${item.motionDuration || item.duration}ms</span>
            <span class="easing-meta">${escapeHTML(item.easing)}</span>
          </div>
          <p class="card-focus">${escapeHTML(state.language === "en" ? item.focusEn : item.focus)}</p>
        </div>
        <button class="favorite-card${favorite ? " active" : ""}" data-favorite-id="${item.id}" aria-label="${favorite ? text.favoriteRemoveLabel : text.favoriteSaveLabel}">${starIcon()}</button>
      </div>
    </div>
  </article>`;
}

function fitLegacyCanvas(stage) {
  const canvas = stage.querySelector(":scope > .legacy-canvas");
  if (!canvas || !stage.clientWidth || !stage.clientHeight) return;
  const scale = Math.min(stage.clientWidth / LEGACY_CANVAS.width, stage.clientHeight / LEGACY_CANVAS.height, LEGACY_CANVAS.maxScale);
  canvas.style.setProperty("--canvas-scale", String(Math.round(scale * 1000) / 1000));
}
function observeLegacyCanvases(root = document) {
  observedLegacyStages.forEach(stage => {
    if (stage.isConnected) return;
    legacyStageObserver?.unobserve(stage);
    observedLegacyStages.delete(stage);
  });
  root.querySelectorAll(".motion-stage.is-legacy").forEach(stage => {
    fitLegacyCanvas(stage);
    if (legacyStageObserver && !observedLegacyStages.has(stage)) {
      legacyStageObserver.observe(stage);
      observedLegacyStages.add(stage);
    }
  });
}

function stageMarkup(item, dialog = false) {
  const text = I18N[state.language];
  if (atlasDemo(item)) {
    return `<div class="motion-stage is-atlas" data-stage-id="${item.id}" style="--motion-accent:${ACCENTS[item.accent]}">
    <canvas class="atlas-canvas" aria-hidden="true"></canvas>
    ${dialog ? "" : `<button class="replay-button" data-replay="${item.id}" aria-label="${text.replayLabel}" title="${text.replayLabel}">${replayIcon()}</button>`}
  </div>`;
  }
  const legacy = usesLegacyCanvas(item);
  return `<div class="motion-stage${legacy ? " is-legacy" : ""}" data-stage-id="${item.id}" style="--motion-accent:${ACCENTS[item.accent]}">
    <div class="stage-art${legacy ? " legacy-canvas" : ""}" data-preview="${state.previewMode}">${stageArt(item, state.previewMode)}</div>
    ${dialog ? "" : `<button class="replay-button" data-replay="${item.id}" aria-label="${text.replayLabel}" title="${text.replayLabel}">${replayIcon()}</button>`}
  </div>`;
}

function semanticMarkup(demo) {
  const prefix = `demo-${++semanticInstance}-`;
  const ids = [...demo.html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  let html = demo.html;
  for (const id of ids) {
    html = html.replaceAll(`id="${id}"`, `id="${prefix}${id}"`)
      .replaceAll(`url(#${id})`, `url(#${prefix}${id})`)
      .replaceAll(`href="#${id}"`, `href="#${prefix}${id}"`);
  }
  return `<div class="semantic-demo">${html}</div>`;
}

function stageArt(item, mode = "shape") {
  const demo = window.MotionRuntime?.definitions[item.pattern];
  if (demo) {
    if (mode !== "compare") return semanticMarkup(demo);
    const text = I18N[state.language];
    return `<div class="compare-pane baseline-pane"><span class="compare-label">${text.noEffect}</span>${semanticMarkup(demo)}</div><div class="compare-pane effect-pane"><span class="compare-label">${text.withEffect}</span>${semanticMarkup(demo)}</div>`;
  }
  const textPatterns = ["staggerText", "tracking", "lineMask", "wordSwap", "emphasis", "textWave", "blurText", "splitText", "typewriterText", "lineByLine", "scrambleText"];
  const squarePatterns = ["maskWipe", "snapIn", "splitReveal", "collapse", "linearMove", "smoothMove", "heavyStop", "flip", "tumble", "counterRotate", "diagonalWipe", "foldIn", "shrinkFade", "centerPunch", "widthReveal", "depthPullback", "coinSpin", "gyroscope", "rotateReveal", "settleDrop", "dragResistance", "followThrough", "colorPulse", "iconNod", "spotlightFocus", "errorShake", "auroraGlow", "radialFlash", "lensFlareSweep", "holographicSheen"];
  const pathPatterns = ["zigzagTravel"];
  const showTarget = ["overshoot", "magnet", "spring", "snapBack", "momentumDrift", "waypointHop"].includes(item.pattern);
  const overlays = stageOverlays(item);

  if (item.catalogFamily) throw new Error(`Missing semantic demo: ${item.pattern}`);
  if (["lightSweep", "scanLine", "lensFlareSweep", "holographicSheen"].includes(item.pattern)) return premiumLightArt(item, mode);
  if (item.pattern === "glitchIn") return premiumGlitchArt(mode);
  if (item.category === "collection") return collectionArt(item, mode);
  if (item.pattern === "chromaticSplit" && mode !== "compare") return chromaticSplitArt(mode);
  if (WEB_CATEGORIES.has(item.category)) return webStageArt(item, mode);

  if (mode === "ui") return `${contextArt("ui", item)}${overlays}`;
  if (mode === "text") return `${textPatterns.includes(item.pattern) ? textMotionArt(item, true) : contextArt("text")}${overlays}`;
  if (mode === "compare") return compareArt(item);

  if (textPatterns.includes(item.pattern)) {
    return `${textMotionArt(item)}${overlays}`;
  }

  if (item.pattern === "trailExit") {
    return `${[0, 1, 2, 3].map(index => `<span class="stage-object stage-trail${index ? " is-afterimage" : ""}" style="--object:${index}"></span>`).join("")}${overlays}`;
  }
  if (item.pattern === "counterRotate") {
    return `<span class="stage-orbit-ring"></span><span class="stage-object counter-outer"></span><span class="stage-object counter-inner"></span><span class="stage-core"></span>${overlays}`;
  }
  if (item.pattern === "orbit") return `<span class="stage-orbit-ring"></span><span class="stage-object"></span><span class="stage-core"></span>${overlays}`;
  if (item.pattern === "staggerFollow" || item.pattern === "spring") {
    return `${[0, 1, 2, 3].map(index => `<span class="stage-object${item.pattern === "spring" ? " spring-link" : ""}" style="--object:${index}${item.pattern === "spring" ? `;z-index:${8 - index}` : ""}"></span>`).join("")}${pathPatterns.includes(item.pattern) ? pathSvg(item.pattern) : ""}${showTarget ? '<span class="stage-target is-rest"></span>' : ""}${overlays}`;
  }
  if (item.pattern === "breathing" || item.pattern === "elasticScale" || item.pattern === "squash") return `<span class="stage-object is-square"></span><span class="stage-ghost is-rest-guide"></span>${overlays}`;
  const specialObjects = specialEffectObjects(item);
  if (specialObjects) return `${specialObjects}${overlays}`;
  const extraClass = item.pattern === "flip" ? " stage-flip-card" : "";
  if (item.pattern === "highlightSweep") return `<span class="stage-object has-inner-sweep"><span class="stage-light-sweep is-inner"></span></span>`;
  return `${pathPatterns.includes(item.pattern) ? pathSvg(item.pattern) : ""}<span class="stage-object${squarePatterns.includes(item.pattern) ? " is-square" : ""}${extraClass}">${item.pattern === "flip" ? (state.language === "en" ? '<i>F</i><b>B</b>' : '<i>表</i><b>裏</b>') : ""}</span>${showTarget ? `<span class="stage-target${item.pattern === "snapBack" ? "" : " is-rest"}"></span>` : ""}${overlays}`;
}


function premiumLightArt(item, mode) {
  const text = I18N[state.language];
  const object = (className, index, content = "") => `<span class="stage-object web-motion-object premium-light-object ${className}" style="--index:${index}">${content}</span>`;
  const label = mode === "text" ? "MOTION" : mode === "ui" ? "INTERFACE" : "LUMEN";
  let content = "";
  if (item.pattern === "lightSweep") {
    content = `<div class="premium-light-scene sweep-scene"><span class="premium-light-grid"></span>${object("premium-light-surface", 0, `<b>${label}</b><i>SPECULAR SURFACE</i>${object("premium-sweep-band", 1)}${object("premium-sweep-bloom", 2)}`)}${object("premium-sweep-edge", 3)}</div>`;
  } else if (item.pattern === "scanLine") {
    content = `<div class="premium-light-scene scan-scene"><span class="premium-scan-frame"><b>OBJECT SCAN</b><i>98.4%</i></span>${object("premium-scan-subject", 0, '<b>DATA</b><i></i><i></i>')}${object("premium-scan-beam", 1)}${[0, 1, 2].map(index => object("premium-scan-node", index + 2)).join("")}<span class="premium-scan-coordinates">X 024&nbsp;&nbsp;Y 168&nbsp;&nbsp;Z 042</span></div>`;
  } else if (item.pattern === "lensFlareSweep") {
    content = `<div class="premium-light-scene flare-scene">${object("premium-flare-surface", 0, `<b>${label}</b>`)}${object("premium-flare-core", 1)}${object("premium-flare-streak", 2)}${[0, 1, 2].map(index => object("premium-flare-ghost", index + 3)).join("")}<span class="premium-flare-axis"></span></div>`;
  } else {
    content = `<div class="premium-light-scene holo-scene"><span class="premium-holo-stars"></span>${object("premium-holo-card", 0, `<b>${label}</b><i>AUTHENTIC / 001</i><em></em>${object("premium-holo-spectrum", 1)}${object("premium-holo-caustic", 2)}`)}</div>`;
  }
  if (mode !== "compare") return content;
  return `<div class="compare-pane baseline-pane"><span class="compare-label">${text.noEffect}</span><div class="premium-static-card">${label}</div></div><div class="compare-pane effect-pane"><span class="compare-label">${text.withEffect}</span>${content}</div>`;
}

function premiumGlitchArt(mode) {
  const text = I18N[state.language];
  const object = (className, index, content = "") => `<span class="stage-object web-motion-object premium-glitch-object ${className}" style="--index:${index}">${content}</span>`;
  const label = mode === "text" ? "SIGNAL" : mode === "ui" ? "SYSTEM UI" : "SIGNAL 404";
  const card = content => `<b>${content}</b><i>SYNCING DATA STREAM</i><em></em>`;
  const content = `<div class="premium-glitch-scene"><span class="premium-glitch-grid"></span>${object("premium-glitch-card main", 0, card(label))}${object("premium-glitch-card cyan", 1, card(label))}${object("premium-glitch-card red", 2, card(label))}${[0, 1, 2, 3].map(index => object("premium-glitch-slice", index + 3)).join("")}<span class="premium-glitch-code">0101&nbsp;1100&nbsp;ERROR&nbsp;0010</span></div>`;
  if (mode !== "compare") return content;
  return `<div class="compare-pane baseline-pane"><span class="compare-label">${text.noEffect}</span><div class="premium-static-card">${label}</div></div><div class="compare-pane effect-pane"><span class="compare-label">${text.withEffect}</span>${content}</div>`;
}

function chromaticSplitArt(mode = "shape") {
  const layers = ["is-cyan", "is-red", "is-main"];
  if (mode === "ui") {
    return layers.map(name => `<div class="stage-object context-ui chroma-layer ${name}">
      <span class="context-ui-icon"></span>
      <span class="context-ui-copy"><i></i><i></i></span>
      <span class="context-ui-action"></span>
    </div>`).join("");
  }
  if (mode === "text") {
    return layers.map(name => `<span class="stage-object is-text context-text chroma-layer ${name}">MOTION</span>`).join("");
  }
  return layers.map(name => `<span class="stage-object is-square chroma-layer ${name}"></span>`).join("");
}

function webStageArt(item, mode = "shape") {
  if (mode === "compare") return compareArt(item);
  const object = (className, index = 0, content = "") => `<span class="stage-object web-motion-object ${className}" style="--index:${index}">${content}</span>`;
  const frame = content => `<div class="web-demo-shell mode-${mode}"><span class="web-browser-chrome"><i></i><i></i><i></i></span><div class="web-demo-viewport">${content}</div></div>`;
  const lines = '<span class="web-static-lines"><i></i><i></i><i></i></span>';
  switch (item.pattern) {
    case "scrollReveal":
      return frame(`${lines}${[0, 1, 2].map(index => object("web-feed-card", index)).join("")}<span class="web-scrollbar"></span>`);
    case "parallaxLayers":
      return frame(`${[0, 1, 2].map(index => object(`web-parallax-layer layer-${index}`, index)).join("")}<span class="web-depth-grid"></span>`);
    case "stickyPin":
      return frame(`${[0, 1, 2].map(index => object("web-scroll-copy", index)).join("")}${object("web-sticky-subject", 3)}<span class="web-scrollbar"></span>`);
    case "scrollProgress":
      return frame(`<span class="web-progress-track">${object("web-progress-fill")}</span>${lines}<span class="web-page-block"></span>`);
    case "horizontalScrub":
      return frame(`<span class="web-horizontal-track">${[0, 1, 2].map(index => object("web-horizontal-card", index)).join("")}</span><span class="web-scroll-cue">↔</span>`);
    case "sectionSnap":
      return frame(`${[0, 1, 2].map(index => object("web-snap-panel", index, `0${index + 1}`)).join("")}<span class="web-snap-dots"></span>${object("web-snap-active", 3)}`);
    case "textScrollScrub":
      return frame(`<span class="web-scroll-heading">${[..."SCROLL"].map((letter, index) => object("web-scroll-letter", index, letter)).join("")}</span>${lines}`);
    case "scrollDepthZoom":
      return frame(`${object("web-depth-card", 0, '<i></i><b></b>')}<span class="web-depth-rays"></span>`);
    case "hoverLift":
      return frame(`${object("web-hover-card", 0, '<i></i><b></b><em>OPEN</em>')}<span data-pointer="${item.pattern}" class="web-pointer">↖</span>`);
    case "magneticButton":
      return frame(`<span class="web-magnetic-zone"></span>${object("web-magnetic-button", 0, "EXPLORE")}<span data-pointer="${item.pattern}" class="web-pointer moving">↖</span>`);
    case "pointerTilt":
      return frame(`${object("web-tilt-card", 0, '<i></i><b>TILT</b>')}<span data-pointer="${item.pattern}" class="web-pointer">↖</span>`);
    case "cursorFollow":
      return frame(`${[0, 1, 2, 3].map(index => object("web-cursor-dot", index)).join("")}<span class="web-cursor-path"></span>`);
    case "dragInertia":
      return frame(`<span class="web-drag-rail"></span>${object("web-drag-chip", 0, "DRAG")}<span class="web-drag-bounds"></span>`);
    case "clickRipple":
      return frame(`<span class="web-ripple-button">CLICK</span>${[0, 1, 2].map(index => object(index ? "web-click-ring" : "web-click-core", index)).join("")}`);
    case "toggleMorph":
      return frame(`<span class="web-toggle-track">OFF${object("web-toggle-knob", 0)}</span><span class="web-toggle-label">Setting</span>`);
    case "accordionOpen":
      return frame(`<span class="web-accordion-head">DETAIL <b>＋</b></span>${object("web-accordion-body", 0, '<i></i><i></i><i></i>')}${object("web-accordion-next", 1, "NEXT <b>＋</b>")}`);
    case "sharedElement":
      return frame(`<span class="web-shared-slot start"></span><span class="web-shared-slot end"></span>${object("web-shared-element", 0)}<span class="web-route-arrow">→</span>`);
    case "viewCrossfade":
      return frame(`${object("web-view-panel old", 0, '<b>OLD</b>')}${object("web-view-panel next", 1, '<b>NEW</b>')}`);
    case "flipReorder":
      return frame(`${[0, 1, 2, 3].map(index => object(`web-flip-tile tile-${index}`, index, String(index + 1))).join("")}<span class="web-sort-icon">↕</span>`);
    case "modalMorph":
      return frame(`<span class="web-modal-backdrop"></span>${object("web-modal-surface", 0, '<i></i><b></b>')}`);
    case "tabIndicator":
      return frame(`<span class="web-tabs"><b>HOME</b><b>WORK</b><b>ABOUT</b>${object("web-tab-indicator", 0)}</span>${lines}`);
    case "filterReflow":
      return frame(`${[0, 1, 2, 3, 4, 5].map(index => object(`web-filter-tile tile-${index}`, index)).join("")}<span class="web-filter-icon">⌁</span>`);
    case "routeSlide":
      return frame(`${object("web-route-panel old", 0, "LIST")}${object("web-route-panel next", 1, "DETAIL")}`);
    case "pageWipe":
      return frame(`${object("web-page-old", 0, "PAGE A")}${object("web-page-new", 1, "PAGE B")}${object("web-page-wipe", 2)}`);
    case "skeletonShimmer":
      return frame(`<span class="web-skeleton"><i></i><b></b><b></b>${object("web-shimmer-band", 0)}</span>`);
    case "spinnerArc":
      return frame(`${object("web-spinner", 0)}<span class="web-loading-label">LOADING</span>`);
    case "progressFill":
      return frame(`<span class="web-data-label">UPLOADING <b>68%</b></span><span class="web-data-track">${object("web-data-fill", 0)}</span>`);
    case "circularProgress":
      return frame(`${object("web-circular-progress", 0, '<b>75</b>')}<span class="web-data-caption">COMPLETE</span>`);
    case "loadingDots":
      return frame(`<span class="web-loading-dots">${[0, 1, 2].map(index => object("web-loading-dot", index)).join("")}</span><span class="web-loading-label dots">PLEASE WAIT</span>`);
    case "countUp":
      return frame(`<span class="web-count-window">${[0, 1, 2, 3].map((index) => object("web-count-value", index, ["00", "24", "68", "100"][index])).join("")}</span><span class="web-count-unit">%</span>`);
    case "chartDraw":
      return frame(`<svg class="web-chart-grid" viewBox="0 0 160 70"><path d="M8 58H152M8 36H152M8 14H152"/></svg>${object("web-chart-line", 0, '<svg viewBox="0 0 160 70"><path pathLength="1" d="M8 57 C32 55 35 29 58 36 S92 52 111 20 S137 27 152 10"/></svg>')}`);
    case "toastStack":
      return frame(`${[0, 1, 2].map(index => object("web-toast", index, `<i></i><b>${["Saved", "Updated", "Published"][index]}</b>`)).join("")}`);
    case "pinnedStorySteps":
      return frame(`${[0, 1, 2].map(index => object("web-story-step", index, `<b>0${index + 1}</b><i></i>`)).join("")}${object("web-story-subject", 3, "STORY")}<span class="web-scrollbar"></span>`);
    case "scrollMarquee":
      return frame(`<span class="web-marquee-track">${[0, 1, 2, 3].map(index => object("web-marquee-word", index, index % 2 ? "MOTION" : "SCROLL")).join("")}</span><span class="web-scroll-cue">SCROLL ↕</span>`);
    case "imageClipScrub":
      return frame(`${object("web-clip-image", 0, '<i></i><b>REVEAL</b>')}<span class="web-clip-frame"></span>`);
    case "velocitySkew":
      return frame(`${[0, 1, 2].map(index => object("web-velocity-card", index, `<i></i><b>0${index + 1}</b>`)).join("")}<span class="web-scroll-cue">VELOCITY</span>`);
    case "buttonFillHover":
      return frame(`<span class="web-fill-button">EXPLORE${object("web-button-fill", 0)}</span><span data-pointer="${item.pattern}" class="web-pointer moving">↖</span>`);
    case "iconMorph":
      return frame(`<span class="web-icon-box">${[0, 1, 2].map(index => object("web-icon-stroke", index)).join("")}</span><span class="web-toggle-label">MENU / CLOSE</span>`);
    case "cardSpotlight":
      return frame(`${object("web-spotlight-card", 0, '<i></i><b></b>')}${object("web-card-light", 1)}<span data-pointer="${item.pattern}" class="web-pointer">↖</span>`);
    case "dragSnap":
      return frame(`<span class="web-snap-slot start"></span><span class="web-snap-slot end"></span>${object("web-snap-chip", 0, "DRAG")}<span class="web-route-arrow">→</span>`);
    case "sidebarReveal":
      return frame(`<span class="web-layout-backdrop" data-extra="sidebarBackdrop"></span>${object("web-sidebar-panel", 0, '<b>MENU</b><i></i><i></i><i></i>')}<span class="web-page-block"></span>`);
    case "commandPaletteOpen":
      return frame(`${object("web-command-palette", 0, `<b>⌘ SEARCH</b>${[0, 1, 2].map(row => `<i data-extra="paletteRow" data-index="${row}"></i>`).join("")}`)}<span class="web-layout-backdrop"></span>`);
    case "dropdownOrigin":
      return frame(`<span class="web-dropdown-trigger">FILTER⌄</span>${object("web-dropdown-menu", 0, ["ALL", "NEW", "SAVED"].map((label, row) => `<i data-extra="dropdownOption" data-index="${row}">${label}</i>`).join(""))}`);
    case "detailExpand":
      return frame(`<span class="web-detail-slot"></span>${object("web-detail-card", 0, '<i></i><b>DETAIL</b>')}<span class="web-route-arrow">→</span>`);
    case "successCheck":
      return frame(`${object("web-success-ring", 0)}${object("web-success-check", 1, "✓")}<span class="web-loading-label">COMPLETE</span>`);
    case "barChartStagger":
      return frame(`<span class="web-bar-axis"></span>${[0, 1, 2, 3, 4].map(index => object("web-data-bar", index)).join("")}<span class="web-scroll-cue">DATA</span>`);
    case "donutSegments":
      return frame(`${[0, 1, 2, 3].map(index => object("web-donut-segment", index)).join("")}<span class="web-donut-total">100</span><span class="web-data-caption">TOTAL</span>`);
    case "optimisticUpdate":
      return frame(`${object("web-update-row", 0, '<i></i><b>Publish change</b>')}${object("web-update-status", 1, "✓")}<span class="web-loading-dots compact">${[0, 1, 2].map(index => object("web-loading-dot", index + 2)).join("")}</span>`);
    case "floatingLabel":
      return frame(`<span class="advanced-field"><b>Email</b><i>name@example.com</i></span>${object("advanced-floating-label", 0, "EMAIL")}`);
    case "checkboxStroke":
      return frame(`${object("advanced-checkbox", 0, "✓")}<span class="advanced-state-copy">Remember this setting</span>`);
    case "switchStateSpring":
      return frame(`<span class="advanced-switch" data-extra="switchTrack">${object("advanced-switch-knob", 0)}</span><span class="advanced-state-copy">Notifications</span>`);
    case "inlineValidation":
      return frame(`<span class="advanced-field invalid" data-extra="fieldBorder"><b>Username</b><i>takayu</i></span>${object("advanced-validation", 0, "Use 8 or more characters")}`);
    case "submitSuccess":
      return frame(`${object("advanced-submit", 0, "SEND")}${object("advanced-submit-check", 1, "✓")}`);
    case "uploadProgressState":
      return frame(`<span class="advanced-upload"><b>motion-demo.mp4</b><i></i></span>${object("advanced-upload-fill", 0)}${object("advanced-upload-check", 1, "✓")}`);
    case "passwordStrength":
      return frame(`<span class="advanced-strength">${[0, 1, 2, 3].map(index => object("advanced-strength-segment", index)).join("")}</span><span class="advanced-state-copy">STRONG</span>`);
    case "skeletonResolve":
      return frame(`${object("advanced-skeleton", 0, '<i></i><i></i>')}${object("advanced-content-resolve", 1, '<b>Motion System</b><i>Ready to explore</i>')}`);
    case "swipeDismiss":
      return frame(`<span class="advanced-dismiss-zone">DELETE</span>${object("advanced-gesture-card", 0, "Swipe to dismiss")}`);
    case "swipeActions":
      return frame(`<span class="advanced-actions"><i>MORE</i><b>DELETE</b></span>${object("advanced-gesture-row", 0, "Project item")}`);
    case "longPressProgress":
      return frame(`${object("advanced-hold-ring", 0)}${object("advanced-hold-core", 1, "HOLD")}`);
    case "pullToRefresh":
      return frame(`${object("advanced-refresh", 0, "↻")}${[0, 1, 2].map(index => object("advanced-pull-row", index + 1)).join("")}`);
    case "dragPickup":
      return frame(`<span class="advanced-drop-zone"></span>${object("advanced-pickup", 0, "DRAG")}`);
    case "reorderDrag":
      return frame(`${[0, 1, 2, 3].map(index => object("advanced-reorder-row", index, `0${index + 1}`)).join("")}`);
    case "bottomSheetDrag":
      return frame(`<span class="advanced-sheet-backdrop" data-extra="sheetBackdrop"></span>${object("advanced-bottom-sheet", 0, '<i></i><b>OPTIONS</b><em></em><em></em>')}`);
    case "pinchZoom":
      return frame(`${object("advanced-zoom-card", 0, "ZOOM")}<span class="advanced-touch-point first" data-extra="pinchFinger" data-index="0"></span><span class="advanced-touch-point second" data-extra="pinchFinger" data-index="1"></span>`);
    case "svgStrokeDraw":
      return frame(`${object("advanced-svg-line", 0, '<svg viewBox="0 0 180 80"><path pathLength="1" d="M12 58 C34 10 66 72 92 28 S138 10 168 50"/></svg>')}`);
    case "svgPathMorph":
      return frame(`${object("advanced-svg-shape", 0, '<svg viewBox="0 0 100 100"><path d="M50 7 92 34 76 88 24 88 8 34Z"/></svg>')}`);
    case "svgTrimPath":
      return frame(`${object("advanced-svg-trim", 0, '<svg viewBox="0 0 180 80"><path pathLength="1" d="M10 58 Q46 4 88 46 T170 26"/></svg>')}`);
    case "svgMotionPath":
      return frame(`<svg class="advanced-svg-guide" viewBox="0 0 180 80"><path d="M10 56 Q48 5 90 48 T170 24"/></svg>${object("advanced-path-dot", 0)}`);
    case "svgMaskReveal":
      return frame(`${object("advanced-svg-mask", 0, '<b>MOTION</b>')}`);
    case "svgGradientFlow":
      return frame(`${object("advanced-svg-gradient", 0, '<svg viewBox="0 0 180 80"><path d="M10 56 Q48 5 90 48 T170 24"/></svg>')}`);
    case "svgGooeyMerge":
      return frame(`${object("advanced-goo", 0)}${object("advanced-goo", 1)}`);
    case "svgSignature":
      return frame(`${object("advanced-signature", 0, '<svg viewBox="0 0 180 80"><path pathLength="1" d="M8 55 C28 8 48 8 36 54 S58 34 68 48 82 22 92 49 112 26 126 49 148 34 172 46"/></svg>')}`);
    case "popoverTransition":
      return frame(`<span class="advanced-trigger">OPTIONS</span>${object("advanced-popover", 0, '<i>Profile</i><i>Settings</i><i>Sign out</i>')}`);
    case "dialogTopLayer":
      return frame(`<span class="advanced-layer-backdrop" data-extra="dialogBackdrop"></span>${object("advanced-dialog", 0, '<b>CONFIRM</b><i></i><em>CONTINUE</em>')}`);
    case "viewTransitionCircle":
      return frame(`${object("advanced-view-circle", 0)}<span class="advanced-view-copy">NEW VIEW</span>`);
    case "discreteExit":
      return frame(`${object("advanced-discrete-card", 0, "CLOSE ME")}`);
    case "autoHeightExpand":
      return frame(`<span class="advanced-accordion-title">DETAILS ＋</span>${object("advanced-auto-height", 0, '<i></i><i></i><i></i>')}`);
    case "pageTransitionStack":
      return frame(`${object("advanced-page old", 0, "PAGE 01")}${object("advanced-page next", 1, "PAGE 02")}`);
    default:
      return frame(object("web-hover-card"));
  }
}

function collectionArt(item, mode) {
  const isList = item.pattern.startsWith("list");
  const count = isList ? 4 : 9;
  const objects = (baseline = false) => Array.from({ length: count }, (_, index) => {
    const row = isList ? index : Math.floor(index / 3);
    const col = isList ? 0 : index % 3;
    return `<span class="stage-object collection-item ${isList ? "is-list-item" : "is-grid-item"}" data-row="${row}" data-col="${col}" style="--index:${index};--row:${row};--col:${col}"${baseline ? ' data-baseline="true"' : ""}></span>`;
  }).join("");
  if (mode !== "compare") return `<div class="collection-canvas ${isList ? "is-list" : "is-grid"}">${objects()}</div>`;
  const text = I18N[state.language];
  return `<div class="compare-pane baseline-pane">
      <span class="compare-label">${text.noEffect}</span>
      <div class="compare-canvas collection-canvas ${isList ? "is-list" : "is-grid"}">${objects(true)}</div>
    </div>
    <div class="compare-pane effect-pane">
      <span class="compare-label">${text.withEffect}</span>
      <div class="compare-canvas collection-canvas ${isList ? "is-list" : "is-grid"}">${objects()}</div>
    </div>`;
}

function specialEffectObjects(item) {
  if (item.pattern === "chromaticSplit") {
    return chromaticSplitArt("shape");
  }
  if (item.pattern === "lightTrail") {
    return Array.from({ length: 4 }, (_, index) => `<span class="stage-object light-trail-object${index ? " is-afterimage" : ""}" style="--object:${index}"></span>`).join("");
  }
  if (["pixelDissolve", "mosaicFlip"].includes(item.pattern)) {
    return Array.from({ length: 16 }, (_, index) => `<span class="stage-object pixel-cell" style="--index:${index};--row:${Math.floor(index / 4)};--col:${index % 4}"></span>`).join("");
  }
  if (item.pattern === "sliceReveal") {
    return Array.from({ length: 4 }, (_, index) => `<span class="stage-object slice-piece" style="--index:${index}"></span>`).join("");
  }
  if (["particleBurst", "glitchIn", "blurZoom", "noiseReveal", "rippleReveal", "bloomReveal", "liquidMorph", "inkReveal", "displacementWave"].includes(item.pattern)) {
    return `<span class="stage-object is-square effect-core"></span>`;
  }
  return "";
}

function textMotionArt(item, contextual = false) {
  const multi = ["staggerText", "textWave", "splitText", "scrambleText"].includes(item.pattern);
  const guide = contextual ? '<span class="context-guide"></span>' : '<svg class="stage-path" viewBox="0 0 300 120"><path d="M22 94H278"/></svg>';
  if (item.pattern === "wordSwap") {
    return `<span class="stage-object is-text word-swap-old">PLAY</span><span class="stage-object is-text word-swap-new">PAUSE</span>${guide}`;
  }
  if (item.pattern === "lineByLine") {
    return `${["MOTION", "DESIGN", "SYSTEM"].map((line, index) => `<span class="stage-object is-text text-line" style="--letter:${index}">${line}</span>`).join("")}${guide}`;
  }
  const word = item.pattern === "emphasis" ? "MOVE" : "MOTION";
  // Emphasis is read against the rest of the phrase, which stays still.
  const lead = item.pattern === "emphasis" && !contextual ? '<span class="emphasis-lead">MAKE IT</span>' : "";
  // Letters flow in a centered word so proportional glyphs keep natural spacing.
  const letters = multi
    ? `<span class="stage-word${contextual ? " is-contextual" : ""}">${[...word].map((letter, index) => `<span class="stage-object is-text is-letter" style="--letter:${index}">${letter}</span>`).join("")}</span>`
    : `<span class="stage-object is-text${contextual ? " context-text" : ""}${item.pattern === "typewriterText" ? " is-typewriter" : ""}">${word}</span>`;
  return `${lead}${item.pattern === "lineMask" ? `<span class="text-mask-window">${letters}</span>` : letters}${guide}`;
}

function stageOverlays(item) {
  if (item.pattern === "maskWipe") return '<span class="stage-mask"></span>';
  if (item.pattern === "splitReveal") return '<span class="stage-split left"></span><span class="stage-split right"></span>';
  if (item.pattern === "pulse") return '<span class="stage-pulse-ring"></span>';
  if (item.pattern === "badgePop") return '<span class="stage-badge">1</span>';
  if (["focusHalo", "spotlightFocus"].includes(item.pattern)) return '<span class="stage-focus-ring"></span>';
  if (["highlightSweep", "lightSweep", "lensFlareSweep", "holographicSheen"].includes(item.pattern)) return '<span class="stage-light-sweep"></span>';
  if (item.pattern === "borderChase") return '<span class="stage-border-chase"></span>';
  if (["glowPulse", "auroraGlow"].includes(item.pattern)) return '<span class="stage-glow-ring"></span>';
  if (item.pattern === "energyCharge") return '<span class="stage-energy-ring outer"></span><span class="stage-energy-ring inner"></span>';
  if (item.pattern === "scanLine") return '<span class="stage-scan-line"></span>';
  if (["rippleReveal", "radialFlash"].includes(item.pattern)) return '<span class="stage-ripple-ring first"></span><span class="stage-ripple-ring second"></span>';
  if (item.pattern === "particleBurst") return Array.from({ length: 8 }, (_, index) => `<span class="stage-particle" style="--particle:${index}"></span>`).join("");
  if (["noiseReveal", "inkReveal"].includes(item.pattern)) return '<span class="stage-noise"></span>';
  return "";
}

function contextArt(mode, item) {
  if (mode === "text") {
    return `<span class="stage-object is-text context-text">MOTION</span><span class="context-guide"></span>`;
  }
  const card = (extraClass = "") => `<div class="stage-object context-ui${extraClass}">
    <span class="context-ui-icon"></span>
    <span class="context-ui-copy"><i></i><i></i></span>
    <span class="context-ui-action"></span>
  </div>`;
  if (item?.pattern === "wordSwap") return `${card(" ui-swap-old")}${card(" ui-swap-new")}<span class="context-guide"></span>`;
  return `${card()}<span class="context-guide"></span>`;
}

function compareArt(item) {
  const text = I18N[state.language];
  const specialObjects = specialEffectObjects(item);
  const effectObject = specialObjects || (item.pattern === "wordSwap"
    ? '<div class="stage-object compare-ui ui-swap-old"><i></i><span></span></div><div class="stage-object compare-ui ui-swap-new"><i></i><span></span></div>'
    : '<div class="stage-object compare-ui"><i></i><span></span></div>');
  return `<div class="compare-pane baseline-pane">
      <span class="compare-label">${text.noEffect}</span>
      <div class="compare-canvas"><div class="stage-object compare-ui"><i></i><span></span></div></div>
    </div>
    <div class="compare-pane effect-pane">
      <span class="compare-label">${text.withEffect}</span>
      <div class="compare-canvas">${effectObject}</div>${stageOverlays(item)}
    </div>`;
}

function pathSvg(pattern) {
  const path = pattern === "zigzagTravel"
    ? "M42.5 60 L105.4 32.5 L170.6 83.5 L242.6 60"
    : pattern === "waypointHop"
      ? "M22 82 Q68 18 112 82 Q168 24 216 82 L278 82"
      : pattern === "bounce"
    ? "M22 92 Q65 12 105 92 Q138 38 170 92 Q195 58 220 92 Q240 74 260 92"
    : pattern === "orbit"
      ? "M70 60a80 38 0 1 0 160 0a80 38 0 1 0-160 0"
      : pattern === "arcMove" || pattern === "pathFollow"
        ? "M22 92 Q150 -8 278 92"
        : "M22 82 C90 82 120 30 188 52 S235 82 278 82";
  return `<svg class="stage-path" viewBox="0 0 300 120" preserveAspectRatio="none"><path d="${path}"/></svg>`;
}

function playStage(stage, item, loop = false, force = false) {
  if (!stage || !item) return [];
  if (!force && (state.playbackMode === "paused" || (loop && state.playbackMode !== "loop"))) return [];
  const previous = cardAnimations.get(stage);
  previous?.forEach(animation => animation.cancel());
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const reducedAnimations = buildAnimations(stage, item, false, 1, 1);
    reducedAnimations.forEach(animation => animation.pause());
    cardAnimations.set(stage, reducedAnimations);
    return reducedAnimations;
  }
  const animations = buildAnimations(stage, item, loop, state.speed);
  const timingBar = cardTimingAnimation(stage, item, loop);
  if (timingBar) animations.push(timingBar);
  cardAnimations.set(stage, animations);
  const card = stage.closest(".motion-card");
  if (card) {
    card.classList.toggle("is-looping", loop);
    if (loop) return animations;
    const token = `${performance.now()}-${Math.random()}`;
    stage.dataset.playToken = token;
    card.classList.add("is-playing");
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (stage.dataset.playToken === token) card.classList.remove("is-playing");
    });
  }
  return animations;
}

function stopStage(stage) {
  const animations = cardAnimations.get(stage);
  animations?.forEach(animation => animation.cancel());
  cardAnimations.delete(stage);
  stage.closest(".motion-card")?.classList.remove("is-looping", "is-playing");
}

function buildAnimations(stage, item, loop, speed, progress = 0, overrides = {}) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const atlas = atlasDemo(item);
  if (atlas) {
    const canvas = stage?.querySelector(".atlas-canvas");
    if (!canvas) return [];
    const timeScale = overrides.duration ? overrides.duration / (atlas.dur * 1000) : 1;
    const total = atlas.dur * 1000 * timeScale;
    const still = reduced || (!loop && progress >= 1);
    const engine = engineOf(item);
    const clip = new engine.Clip(canvas, atlas, {
      accent: item.accent, loop: loop && !reduced, rate: speed, timeScale,
      onion: Boolean(stage.closest("#dialogStage")) && onionSkin,
      paused: still,
      startMs: still ? engine.stillTime(atlas) * 1000 * timeScale : Math.min(total - .001, total * progress)
    });
    return [clip];
  }
  const duration = overrides.duration || item.duration;
  const demo = window.MotionRuntime?.definitions[item.pattern];
  const records = window.MotionRuntime?.records(stage, item, overrides);
  if (records) {
    return records.map(({target, keyframes, easing, baseline}) => {
      const animation = target.animate(tuneKeyframes(keyframes, overrides.amplitude || 1), {
        duration, easing: overrides.easing ? cssEasing(overrides.easing) : cssEasing(easing),
        iterations: loop && !reduced && !baseline ? Infinity : 1, fill: "both"
      });
      animation.playbackRate = speed;
      if (reduced || baseline) { animation.pause(); animation.currentTime = duration * (demo.reducedProgress ?? 1); }
      else if (progress) { animation.currentTime = Math.min(duration - .001, duration * progress); }
      return animation;
    });
  }
  const objects = [...stage.querySelectorAll(".stage-object")];
  const extras = [...stage.querySelectorAll(".web-pointer[data-pointer], [data-extra], .stage-mask, .stage-split, .stage-pulse-ring, .stage-badge, .stage-focus-ring, .stage-light-sweep, .stage-border-chase, .stage-glow-ring, .stage-energy-ring, .stage-scan-line, .stage-ripple-ring, .stage-particle, .stage-noise")];
  const options = {
    duration: overrides.duration || item.duration,
    easing: overrides.easing ? cssEasing(overrides.easing) : REAL_TIME_PATTERNS.has(item.pattern) ? "linear" : cssEasing(item.easing),
    iterations: loop && !reduced ? Infinity : 1,
    fill: "both"
  };
  const animations = [];

  objects.forEach((object, index) => {
    const baseline = Boolean(object.closest(".baseline-pane"));
    const effectObjects = object.closest(".effect-pane")?.querySelectorAll(".stage-object");
    const localObjects = effectObjects ? [...effectObjects] : objects;
    const localIndex = baseline ? 0 : localObjects.indexOf(object);
    const sourceKeyframes = baseline
      ? baselineKeyframes(item.category)
      : object.classList.contains("premium-light-object")
        ? premiumLightKeyframes(item.pattern, object, localIndex)
        : object.classList.contains("premium-glitch-object")
          ? premiumGlitchKeyframes(object, localIndex)
          : motionKeyframes(item.pattern, localIndex, localObjects.length);
    const keyframes = tuneKeyframes(fitKeyframesToStage(sourceKeyframes, stage, object), overrides.amplitude || 1);
    const delay = baseline ? 0 : overrides.stagger === undefined ? multiDelay(item.pattern, localIndex) : localIndex * overrides.stagger;
    const keyed = !baseline && authoredTimeline(keyframes, item, overrides);
    const baked = baseline || keyed ? null : bakeDelayedEasing(keyframes, duration, delay, options.easing);
    const compiled = window.MotionRuntime.compile(keyframes, duration, delay);
    const animation = object.animate(baked || (keyed ? shapeAuthored(compiled, item) : compiled), {
      ...options,
      iterations: baseline ? 1 : options.iterations,
      easing: baseline ? "cubic-bezier(.22,1,.36,1)" : baked || keyed ? "linear" : options.easing,
      delay: 0
    });
    animation.playbackRate = speed;
    if (progress) animation.currentTime = loop && !reduced ? Math.min(duration - .001, duration * progress) : duration * progress;
    if (reduced || baseline) { animation.pause(); animation.currentTime = duration * window.MotionRuntime.representative(item); }
    animations.push(animation);
  });

  extras.forEach((extra, index) => {
    const keyframes = extraKeyframes(extra, index);
    const keyed = authoredTimeline(keyframes, item, overrides);
    const baked = keyed ? null : bakeDelayedEasing(keyframes, duration, extraDelay(extra, index), options.easing);
    const compiled = window.MotionRuntime.compile(keyframes, duration, extraDelay(extra, index));
    const animation = extra.animate(baked || (keyed ? shapeAuthored(compiled, item) : compiled), {
      ...options,
      easing: baked || keyed ? "linear" : options.easing,
      delay: 0
    });
    animation.playbackRate = speed;
    if (progress) animation.currentTime = loop && !reduced ? Math.min(duration - .001, duration * progress) : duration * progress;
    if (reduced) { animation.pause(); animation.currentTime = duration * window.MotionRuntime.representative(item); }
    animations.push(animation);
  });
  return animations;
}

// A delay is encoded as a hold at the start of each layer's keyframes so every
// layer shares one loop. Under a non-linear outer easing that hold is consumed
// by the steep start of the curve and staggers collapse (a 165ms lag played in
// about 40ms). Delayed layers therefore run on a linear clock with the curve
// placed on their moving segment, so each starts after its real delay.
function bakeDelayedEasing(keyframes, duration, delay, easing) {
  // Two-pose layers only (longer sequences already run on a linear clock): the
  // outer curve moves onto the moving segment, which starts after the real delay.
  if (!delay || !keyframes || keyframes.length !== 2 || !easing || easing === "linear") return null;
  const start = Math.max(0, Math.min(.8, delay / duration));
  const [from, to] = keyframes.map(({ offset, easing: _, ...frame }) => frame);
  return [{ ...from, offset: 0 }, { ...from, offset: start, easing }, { ...to, offset: 1 }];
}

// Spring Follow: a leader on a real damped spring (mass 1, stiffness 80,
// damping 10) and followers attached to the layer ahead of them. Positions are
// integrated, then sampled on the loop's linear clock.
function springChainTrack() {
  if (springChainCache) return springChainCache;
  const { mass, stiffness, damping, travel, lead, cycle, links, sampleEvery } = SPRING_CHAIN;
  const dt = 1 / 1200;
  const position = Array(links).fill(0);
  const velocity = Array(links).fill(0);
  const samples = Array.from({ length: links }, () => []);
  let nextSample = 0;
  for (let step = 0; step * dt <= cycle + 1e-9; step++) {
    const time = step * dt;
    if (time + 1e-9 >= nextSample) {
      position.forEach((value, index) => samples[index].push(value));
      nextSample += sampleEvery;
    }
    if (time < lead) continue;
    const next = position.slice();
    for (let index = 0; index < links; index++) {
      const target = index ? position[index - 1] : travel;
      // Followers are stiffer, over-damped links so the chain reads as one body
      // and each later link reacts slightly less than the one ahead of it.
      const k = index ? stiffness * 5 : stiffness;
      const c = index ? damping * Math.sqrt(5) * 1.6 : damping;
      velocity[index] += ((k * (target - position[index]) - c * velocity[index]) / mass) * dt;
      next[index] = position[index] + velocity[index] * dt;
    }
    position.splice(0, links, ...next);
  }
  springChainCache = samples;
  return samples;
}

function springChainFrames(index, count = 1) {
  const { cycle, settleHold, sampleEvery } = SPRING_CHAIN;
  const track = springChainTrack()[Math.min(index, SPRING_CHAIN.links - 1)];
  const scale = count > 1 ? [1, .86, .74, .64][index] ?? .6 : 1;
  const alpha = count > 1 ? [1, .72, .5, .34][index] ?? .3 : 1;
  const fadeIn = .04;
  const fadeOut = settleHold / cycle;
  return track.map((x, sample) => {
    const offset = Math.min(1, sample * sampleEvery / cycle);
    const opacity = offset < fadeIn ? alpha * offset / fadeIn : offset > fadeOut ? alpha * Math.max(0, (1 - offset) / (1 - fadeOut)) : alpha;
    return { offset, transform: `translate(${Math.round(x * 10) / 10}px,-50%) scale(${scale})`, opacity: Math.round(opacity * 1000) / 1000 };
  }).filter((frame, sample, list) => sample === 0 || frame.offset > list[sample - 1].offset);
}

// CSS linear() rendition of the leader's spring response, for copying.
function springLinearEasing() {
  const track = springChainTrack()[0];
  const { lead, sampleEvery, travel } = SPRING_CHAIN;
  const first = Math.round(lead / sampleEvery);
  const points = track.slice(first, first + Math.round(1.2 / sampleEvery) + 1).map(x => Math.round(x / travel * 1000) / 1000);
  points[points.length - 1] = 1;
  return `linear(${points.join(", ")})`;
}

// Keyframe sequences with intermediate poses (overshoot, rebound, anticipation)
// were authored in real time: each offset × duration is the time stated in the
// recipe. Running them under an outer back/elastic/bounce curve as well moved every
// pose (a 374ms peak landed at ~105ms) and added an unplanned second reaction.
// They now play on a linear clock with per-segment easing between the poses.
function authoredTimeline(keyframes, item, overrides = {}) {
  if (overrides.easing || !keyframes || keyframes.length < 3) return false;
  return !REAL_TIME_PATTERNS.has(item.pattern);
}
function usesAuthoredPoses(item) {
  if (REAL_TIME_PATTERNS.has(item.pattern)) return false;
  try { return motionKeyframes(item.pattern, 0, 1).length > 2; } catch { return false; }
}
function shapeAuthored(frames, item) {
  return AUTHORED_LINEAR_OPT_OUT.has(item.pattern) ? frames : window.MotionRuntime.shapeSegments(frames);
}

function tuneKeyframes(keyframes, amplitude) {
  if (!keyframes || amplitude === 1) return keyframes;
  return keyframes.map(frame => {
    if (!frame.transform) return frame;
    const transform = frame.transform
      .replace(/(-?\d+(?:\.\d+)?)px/g, (_, value) => `${Math.round(Number(value) * amplitude * 10) / 10}px`)
      .replace(/(-?\d+(?:\.\d+)?)deg/g, (_, value) => `${Math.round(Number(value) * amplitude * 10) / 10}deg`);
    return { ...frame, transform };
  });
}


function premiumLightKeyframes(pattern, object, index) {
  if (pattern === "lightSweep") {
    if (object.classList.contains("premium-light-surface")) return [{ transform: "translate(-50%,-50%) perspective(500px) rotateX(3deg) rotateY(-5deg)", filter: "brightness(.82)" }, { transform: "translate(-50%,-50%) perspective(500px) rotateX(-2deg) rotateY(5deg)", filter: "brightness(1.08)", offset: .52 }, { transform: "translate(-50%,-50%) perspective(500px) rotateX(3deg) rotateY(-5deg)", filter: "brightness(.86)" }];
    if (object.classList.contains("premium-sweep-band")) return [{ transform: "translateX(-210%) skewX(-18deg)", opacity: 0 }, { opacity: .92, offset: .38 }, { transform: "translateX(300%) skewX(-18deg)", opacity: 0 }];
    if (object.classList.contains("premium-sweep-bloom")) return [{ transform: "translateX(-170%) scaleX(.55)", opacity: 0 }, { opacity: .78, offset: .5 }, { transform: "translateX(230%) scaleX(.7)", opacity: 0 }];
    return [{ transform: "translateX(-130%)", opacity: 0 }, { transform: "translateX(20%)", opacity: 1, offset: .48 }, { transform: "translateX(165%)", opacity: 0 }];
  }
  if (pattern === "scanLine") {
    if (object.classList.contains("premium-scan-subject")) return [{ transform: "translate(-50%,-50%) scale(.98)", filter: "brightness(.7) saturate(.7)" }, { transform: "translate(-50%,-50%) scale(1)", filter: "brightness(1.25) saturate(1.2)", offset: .55 }, { transform: "translate(-50%,-50%) scale(.98)", filter: "brightness(.8) saturate(.85)" }];
    if (object.classList.contains("premium-scan-beam")) return [{ transform: "translateY(-34px)", opacity: 0 }, { opacity: 1, offset: .08 }, { transform: "translateY(112px)", opacity: 1, offset: .88 }, { transform: "translateY(122px)", opacity: 0 }];
    return [{ transform: `translate(${index % 2 ? 12 : -12}px,${index * 5 - 12}px) scale(.4)`, opacity: .2 }, { transform: `translate(${index % 2 ? -5 : 5}px,${index * 5 - 12}px) scale(1.2)`, opacity: 1, offset: .48 }, { transform: `translate(0,${index * 5 - 12}px) scale(.72)`, opacity: .45 }];
  }
  if (pattern === "lensFlareSweep") {
    if (object.classList.contains("premium-flare-surface")) return [{ transform: "translate(-50%,-50%) perspective(420px) rotateY(-7deg)", filter: "brightness(.72)" }, { transform: "translate(-50%,-50%) perspective(420px) rotateY(5deg)", filter: "brightness(1.18)", offset: .52 }, { transform: "translate(-50%,-50%) perspective(420px) rotateY(-4deg)", filter: "brightness(.82)" }];
    if (object.classList.contains("premium-flare-core")) return [{ transform: "translate(-155px,-50%) scale(.45)", opacity: 0 }, { transform: "translate(0,-50%) scale(1.45)", opacity: 1, offset: .5 }, { transform: "translate(155px,-50%) scale(.5)", opacity: 0 }];
    if (object.classList.contains("premium-flare-streak")) return [{ transform: "translate(-50%,-50%) scaleX(.15)", opacity: 0 }, { transform: "translate(-50%,-50%) scaleX(1.2)", opacity: .95, offset: .5 }, { transform: "translate(-50%,-50%) scaleX(.2)", opacity: 0 }];
    const direction = index % 2 ? -1 : 1;
    return [{ transform: `translate(${direction * -105}px,-50%) scale(.25)`, opacity: 0 }, { transform: `translate(${direction * 18}px,-50%) scale(${.55 + index * .08})`, opacity: .58, offset: .5 }, { transform: `translate(${direction * 108}px,-50%) scale(.2)`, opacity: 0 }];
  }
  if (object.classList.contains("premium-holo-card")) return [{ transform: "translate(-50%,-50%) perspective(520px) rotateX(7deg) rotateY(-12deg)", filter: "brightness(.82) saturate(.8)" }, { transform: "translate(-50%,-50%) perspective(520px) rotateX(-4deg) rotateY(13deg)", filter: "brightness(1.16) saturate(1.25)", offset: .52 }, { transform: "translate(-50%,-50%) perspective(520px) rotateX(7deg) rotateY(-12deg)", filter: "brightness(.86) saturate(.9)" }];
  if (object.classList.contains("premium-holo-spectrum")) return [{ transform: "translateX(-150%) rotate(-18deg)", opacity: .1, filter: "hue-rotate(0deg)" }, { opacity: .85, filter: "hue-rotate(90deg)", offset: .5 }, { transform: "translateX(200%) rotate(-18deg)", opacity: .08, filter: "hue-rotate(180deg)" }];
  return [{ transform: "translate(-90px,-40px) scale(.5)", opacity: .1 }, { transform: "translate(30px,22px) scale(1.35)", opacity: .72, offset: .5 }, { transform: "translate(95px,-28px) scale(.45)", opacity: .1 }];
}

function premiumGlitchKeyframes(object, index) {
  if (object.classList.contains("main")) return [
    { transform: "translate(-50%,-50%) skewX(-7deg) scaleX(.92)", opacity: 0, filter: "contrast(1.8) brightness(1.4)", clipPath: "inset(10% 0 68% 0)" },
    { transform: "translate(calc(-50% + 15px),-50%) skewX(5deg)", opacity: .72, clipPath: "inset(58% 0 8% 0)", offset: .16 },
    { transform: "translate(calc(-50% - 10px),-50%) skewX(-3deg)", opacity: 1, clipPath: "inset(27% 0 34% 0)", offset: .34 },
    { transform: "translate(calc(-50% + 4px),-50%)", clipPath: "inset(0)", filter: "contrast(1.2) brightness(1.1)", offset: .58 },
    { transform: "translate(-50%,-50%)", opacity: 1, clipPath: "inset(0)", filter: "none" }
  ];
  if (object.classList.contains("cyan") || object.classList.contains("red")) {
    const direction = object.classList.contains("cyan") ? -1 : 1;
    return [{ transform: `translate(calc(-50% + ${direction * 22}px),-50%)`, opacity: .46 }, { transform: `translate(calc(-50% + ${direction * 13}px),-50%)`, opacity: .34, offset: .38 }, { transform: "translate(-50%,-50%)", opacity: 0, offset: .72 }, { transform: "translate(-50%,-50%)", opacity: 0 }];
  }
  const direction = index % 2 ? 1 : -1;
  return [{ transform: `translateX(${direction * 48}px)`, opacity: 0 }, { transform: `translateX(${direction * -28}px)`, opacity: .9, offset: .18 + index * .025 }, { transform: `translateX(${direction * 12}px)`, opacity: .6, offset: .42 }, { transform: "translateX(0)", opacity: 0, offset: .7 }, { opacity: 0 }];
}

// Pointer paths for the hover and pointer demos. Offsets move the arrow tip from
// its resting spot; the timings match the keyframes of the element it drives.

// Supporting layers named with data-extra (backdrops, fingers, staggered rows).

function extraKeyframes(extra, index) {
  if (extra.dataset.extra && EXTRA_PATHS[extra.dataset.extra]) return EXTRA_PATHS[extra.dataset.extra](Number(extra.dataset.index || 0));
  if (extra.classList.contains("web-pointer")) return POINTER_PATHS[extra.dataset.pointer] || [{ opacity: 1 }, { opacity: 1 }];
  if (extra.classList.contains("stage-mask")) return [{ transform: "translateX(0%)" }, { transform: "translateX(115%)" }];
  if (extra.classList.contains("stage-pulse-ring")) return [{ transform: "translate(-50%,-50%) scale(.5)", opacity: .8 }, { transform: "translate(-50%,-50%) scale(2.4)", opacity: 0 }];
  if (extra.classList.contains("stage-split")) return extra.classList.contains("left")
    ? [{ transform: "translateX(0)" }, { transform: "translateX(-105%)" }]
    : [{ transform: "translateX(0)" }, { transform: "translateX(105%)" }];
  if (extra.classList.contains("stage-badge")) return [{ transform: "scale(0) rotate(-18deg)", opacity: 0 }, { transform: "scale(1.18) rotate(4deg)", opacity: 1, offset: .7 }, { transform: "scale(1) rotate(0)", opacity: 1 }];
  if (extra.classList.contains("stage-focus-ring")) return [{ transform: "translate(-50%,-50%) scale(.72)", opacity: .75 }, { transform: "translate(-50%,-50%) scale(1.9)", opacity: 0 }];
  if (extra.classList.contains("stage-light-sweep")) return [{ transform: "translateX(-160%) skewX(-18deg)", opacity: 0 }, { opacity: .82, offset: .45 }, { transform: "translateX(280%) skewX(-18deg)", opacity: 0 }];
  if (extra.classList.contains("stage-border-chase")) return [{ transform: "translate(-50%,-50%) rotate(0deg)" }, { transform: "translate(-50%,-50%) rotate(360deg)" }];
  if (extra.classList.contains("stage-glow-ring")) return [{ transform: "translate(-50%,-50%) scale(.9)", opacity: .28, filter: "blur(5px)" }, { transform: "translate(-50%,-50%) scale(1.35)", opacity: .9, filter: "blur(10px)", offset: .5 }, { transform: "translate(-50%,-50%) scale(.9)", opacity: .28, filter: "blur(5px)" }];
  if (extra.classList.contains("stage-energy-ring")) {
    const direction = extra.classList.contains("outer") ? 1 : -1;
    return [{ transform: `translate(-50%,-50%) scale(1.65) rotate(0deg)`, opacity: .2 }, { transform: `translate(-50%,-50%) scale(.82) rotate(${direction * 540}deg)`, opacity: 1 }];
  }
  if (extra.classList.contains("stage-scan-line")) return [{ transform: "translateY(-20px)", opacity: 0 }, { opacity: 1, offset: .12 }, { transform: "translateY(120px)", opacity: 0 }];
  if (extra.classList.contains("stage-ripple-ring")) return [{ transform: "translate(-50%,-50%) scale(.2)", opacity: .8 }, { transform: "translate(-50%,-50%) scale(2.25)", opacity: 0 }];
  if (extra.classList.contains("stage-particle")) {
    const angle = index * Math.PI / 4;
    const x = Math.round(Math.cos(angle) * 58);
    const y = Math.round(Math.sin(angle) * 46);
    return [{ transform: "translate(-50%,-50%) scale(.3)", opacity: 1 }, { transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(1)`, opacity: .85, offset: .62 }, { transform: `translate(calc(-50% + ${x * 1.12}px),calc(-50% + ${y * 1.12}px)) scale(.2)`, opacity: 0 }];
  }
  if (extra.classList.contains("stage-noise")) return [{ opacity: .88, filter: "blur(3px)" }, { opacity: 0, filter: "blur(0)" }];
  return [{ opacity: 0 }, { opacity: 1 }];
}

function extraDelay(extra) {
  if (extra.dataset?.extra) return 0;
  if (extra.classList.contains("second")) return 110;
  if (extra.classList.contains("stage-particle")) return 70;
  return 0;
}

function fitKeyframesToStage(keyframes, stage, object) {
  if (object.classList.contains("web-motion-object")) return keyframes;
  const startRatio = object.classList.contains("context-ui") || object.classList.contains("compare-ui") || object.classList.contains("context-text") ? .1 : .15;
  const canvas = object.closest(".legacy-canvas");
  const width = canvas ? LEGACY_CANVAS.width : stage.clientWidth;
  const availableTravel = width - object.offsetWidth - width * startRatio - 8;
  const scale = Math.max(.28, Math.min(1, availableTravel / 195));
  if (scale === 1) return keyframes;
  return keyframes.map(frame => {
    if (!frame.transform) return frame;
    return {
      ...frame,
      transform: frame.transform.replace(/translate\((-?\d+(?:\.\d+)?)px/g, (_, value) => `translate(${Math.round(Number(value) * scale)}px`)
    };
  });
}

function baselineKeyframes(category) {
  const frames = {
    entrance: [{ transform: "translate(-18px,-50%)", opacity: 0 }, { transform: "translate(150px,-50%)", opacity: 1 }],
    move: [{ transform: "translate(0,-50%)" }, { transform: "translate(175px,-50%)" }],
    scale: [{ transform: "translate(82px,-50%) scale(.15)", opacity: .2 }, { transform: "translate(82px,-50%) scale(1)", opacity: 1 }],
    rotate: [{ transform: "translate(82px,-50%) rotate(0)" }, { transform: "translate(82px,-50%) rotate(180deg)" }],
    reaction: [{ transform: "translate(0,-50%)" }, { transform: "translate(175px,-50%)" }],
    text: [{ transform: "translate(40px,20%)", opacity: 0 }, { transform: "translate(40px,-50%)", opacity: 1 }],
    collection: [{ opacity: 0 }, { opacity: 1 }],
    attention: [{ transform: "translate(82px,-50%)", opacity: .35 }, { transform: "translate(82px,-50%)", opacity: 1 }],
    light: [{ transform: "translate(82px,-50%)", opacity: .45, filter: "brightness(.75)" }, { transform: "translate(82px,-50%)", opacity: 1, filter: "brightness(1)" }],
    effect: [{ transform: "translate(82px,4%)", opacity: 0 }, { transform: "translate(82px,-50%)", opacity: 1 }],
    "web-scroll": [{ transform: "translate(40px,12%)", opacity: 0 }, { transform: "translate(40px,-50%)", opacity: 1 }],
    "web-interaction": [{ transform: "translate(82px,-50%) scale(.9)", opacity: .5 }, { transform: "translate(82px,-50%) scale(1)", opacity: 1 }],
    "web-layout": [{ transform: "translate(70px,-50%)", opacity: .3 }, { transform: "translate(82px,-50%)", opacity: 1 }],
    "web-feedback": [{ transform: "translate(82px,-50%)", opacity: .3 }, { transform: "translate(82px,-50%)", opacity: 1 }]
  };
  return frames[category] || frames.move;
}

function motionKeyframes(pattern, index = 0, count = 1) {
  const webFrames = webMotionKeyframes(pattern, index, count);
  if (webFrames) return webFrames;
  if (pattern.startsWith("list") || pattern.startsWith("grid")) {
    return collectionKeyframes(pattern, index);
  }
  const delayOffset = index * 7;
  const common = {
    fadeSlide: [{ transform: "translate(82px,18%)", opacity: 0 }, { transform: "translate(82px,-50%)", opacity: 1 }],
    maskWipe: [{ transform: "translate(82px,-50%)", opacity: 1 }, { transform: "translate(82px,-50%)", opacity: 1 }],
    iris: [{ transform: "translate(80px,-50%)", clipPath: "circle(0% at 50% 50%)", opacity: .35 }, { transform: "translate(80px,-50%)", clipPath: "circle(75% at 50% 50%)", opacity: 1 }],
    softRise: [{ transform: "translate(75px,15%)", opacity: 0, filter: "blur(8px)" }, { transform: "translate(75px,-50%)", opacity: 1, filter: "blur(0)" }],
    snapIn: [{ transform: "translate(112px,-50%)", opacity: 0 }, { transform: "translate(155px,-50%)", opacity: 1 }],
    splitReveal: [{ transform: "translate(94px,-50%) scale(.75)", opacity: .2 }, { transform: "translate(94px,-50%) scale(1)", opacity: 1 }],
    trailExit: [{ transform: `translate(${15 - index * 8}px,-50%)`, opacity: index ? .34 - index * .06 : 1 }, { transform: `translate(${190 - index * 12}px,-50%)`, opacity: 0 }],
    collapse: [{ transform: "translate(80px,-50%) scaleY(1)", transformOrigin: "50% 100%", opacity: 1 }, { transform: "translate(80px,-50%) scaleY(.05)", transformOrigin: "50% 100%", opacity: 0 }],
    linearMove: [{ transform: "translate(0,-50%)" }, { transform: "translate(180px,-50%)" }],
    smoothMove: [{ transform: "translate(0,-50%)" }, { transform: "translate(180px,-50%)" }],
    arcMove: [{ transform: "translate(0,25px)" }, { transform: "translate(90px,-45px)", offset: .5 }, { transform: "translate(180px,25px)" }],
    anticipation: [{ transform: "translate(45px,-50%)" }, { transform: "translate(20px,-50%)", offset: .18 }, { transform: "translate(180px,-50%)" }],
    heavyStop: [{ transform: "translate(0,-50%) scale(1)", easing: "cubic-bezier(.4,0,.9,.6)" }, { transform: "translate(160px,-50%) scale(1)", offset: .58, easing: "cubic-bezier(.3,.6,.6,1)" }, { transform: "translate(182px,-50%) scaleX(.82) scaleY(1.18)", offset: .68, easing: "cubic-bezier(.45,.05,.2,1)" }, { transform: "translate(168px,-50%) rotate(-3deg) scale(1.04)", offset: .8, easing: "cubic-bezier(.45,.05,.2,1)" }, { transform: "translate(178px,-50%) rotate(1deg) scale(1)", offset: .9, easing: "cubic-bezier(.45,.05,.2,1)" }, { transform: "translate(175px,-50%) rotate(0deg) scale(1)" }],
    pathFollow: [{ transform: "translate(0,25px) rotate(-28deg)" }, { transform: "translate(90px,-45px) rotate(0)", offset: .5 }, { transform: "translate(180px,25px) rotate(28deg)" }],
    staggerFollow: [{ transform: `translate(${index * -7}px,-50%)`, opacity: .35 + index * .18 }, { transform: `translate(${165 - index * 10}px,-50%)`, opacity: 1 }],
    magnet: [{ transform: "translate(0,-50%)" }, { transform: "translate(36px,-50%)", offset: .42 }, { transform: "translate(192px,-50%)", offset: .78 }, { transform: "translate(175px,-50%)" }],
    popScale: [{ transform: "translate(82px,-50%) scale(.05)", opacity: 0 }, { transform: "translate(82px,-50%) scale(1.16)", opacity: 1, offset: .72 }, { transform: "translate(82px,-50%) scale(1)", opacity: 1 }],
    pulse: [{ transform: "translate(82px,-50%) scale(.9)" }, { transform: "translate(82px,-50%) scale(1.08)", offset: .45 }, { transform: "translate(82px,-50%) scale(1)" }],
    breathing: [{ transform: "translate(82px,-50%) scale(.94)" }, { transform: "translate(82px,-50%) scale(1.06)" }, { transform: "translate(82px,-50%) scale(.94)" }],
    elasticScale: [{ transform: "translate(82px,-50%) scale(.1)" }, { transform: "translate(82px,-50%) scale(1.2)", offset: .45 }, { transform: "translate(82px,-50%) scale(.92)", offset: .68 }, { transform: "translate(82px,-50%) scale(1.06)", offset: .84 }, { transform: "translate(82px,-50%) scale(1)" }],
    axisStretch: [{ transform: "translate(10px,-50%) scale(1)" }, { transform: "translate(95px,-50%) scaleX(1.7) scaleY(.65)", offset: .5 }, { transform: "translate(175px,-50%) scale(1)" }],
    depthZoom: [{ transform: "translate(82px,-50%) scale(.15)", opacity: .2, filter: "blur(6px)" }, { transform: "translate(82px,-50%) scale(1.35)", opacity: 1, filter: "blur(0)" }],
    softShrink: [{ transform: "translate(82px,-50%) scale(1)", opacity: 1 }, { transform: "translate(82px,-50%) scale(.2)", opacity: 0 }],
    squash: [{ transform: "translate(82px,-140%) scale(1)", easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(82px,-50%) scale(1)", offset: .6, easing: "cubic-bezier(.2,.8,.3,1)" }, { transform: "translate(82px,calc(-50% + 8px)) scaleX(1.55) scaleY(.55)", offset: .65, easing: "cubic-bezier(.3,0,.2,1)" }, { transform: "translate(82px,-50%) scale(1)" }],
    simpleRotate: [{ transform: "translate(82px,-50%) rotate(0)" }, { transform: "translate(82px,-50%) rotate(180deg)" }],
    spinStop: [{ transform: "translate(82px,-50%) rotate(0)" }, { transform: "translate(82px,-50%) rotate(720deg)" }],
    wobble: [{ transform: "translate(82px,-50%) rotate(-28deg)", transformOrigin: "50% -42px" }, { transform: "translate(82px,-50%) rotate(18deg)", offset: .4 }, { transform: "translate(82px,-50%) rotate(-8deg)", offset: .67 }, { transform: "translate(82px,-50%) rotate(0)" }],
    flip: [{ transform: "translate(82px,-50%) perspective(200px) rotateY(0)" }, { transform: "translate(82px,-50%) perspective(200px) rotateY(180deg)" }],
    tilt: [{ transform: "translate(82px,-50%) rotate(0)" }, { transform: "translate(82px,-50%) rotate(18deg)", offset: .55 }, { transform: "translate(82px,-50%) rotate(0)" }],
    tumble: [{ transform: "translate(0,-50%) rotate(-180deg)" }, { transform: "translate(175px,-50%) rotate(-24deg)", offset: .82 }, { transform: "translate(175px,-50%) rotate(0)" }],
    overshoot: [{ transform: "translate(0,-50%)" }, { transform: "translate(195px,-50%)", offset: .72 }, { transform: "translate(175px,-50%)" }],
    bounce: [{ transform: "translate(75px,-180%)", easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(75px,-50%)", offset: .38, easing: "cubic-bezier(.25,.46,.45,.94)" }, { transform: "translate(75px,-105%)", offset: .56, easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(75px,-50%)", offset: .7, easing: "cubic-bezier(.25,.46,.45,.94)" }, { transform: "translate(75px,-74%)", offset: .82, easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(75px,-50%)" }],
    spring: springChainFrames(index, count),
    rubber: [{ transform: "translate(45px,-50%) scaleX(1)" }, { transform: "translate(150px,-50%) scaleX(1.8)", offset: .42 }, { transform: "translate(82px,-50%) scaleX(.72)", offset: .64 }, { transform: "translate(95px,-50%) scaleX(1.14)", offset: .82 }, { transform: "translate(82px,-50%) scaleX(1)" }],
    recoil: [{ transform: "translate(42px,-50%)" }, { transform: "translate(178px,-50%)", offset: .5 }, { transform: "translate(148px,-50%)", offset: .72 }, { transform: "translate(160px,-50%)" }],
    doubleBounce: [{ transform: "translate(75px,-150%)", easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(75px,-50%)", offset: .35, easing: "cubic-bezier(.25,.46,.45,.94)" }, { transform: "translate(75px,-105%)", offset: .52, easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(75px,-50%)", offset: .7, easing: "cubic-bezier(.25,.46,.45,.94)" }, { transform: "translate(75px,-75%)", offset: .83, easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(75px,-50%)" }],
    snapBack: [{ transform: "translate(180px,-50%) scaleX(1.5)" }, { transform: "translate(65px,-50%) scaleX(.8)", offset: .65 }, { transform: "translate(82px,-50%) scaleX(1)" }],
    shake: [{ transform: "translate(82px,-50%)" }, { transform: "translate(105px,-50%)", offset: .25 }, { transform: "translate(62px,-50%)", offset: .42 }, { transform: "translate(98px,-50%)", offset: .58 }, { transform: "translate(72px,-50%)", offset: .72 }, { transform: "translate(88px,-50%)", offset: .84 }, { transform: "translate(82px,-50%)" }],
    tracking: [{ transform: "translate(40px,-50%)", letterSpacing: "-.06em", opacity: .25 }, { transform: "translate(40px,-50%)", letterSpacing: ".22em", opacity: 1 }],
    lineMask: [{ transform: "translate(40px,85%)" }, { transform: "translate(40px,-50%)" }],
    wordSwap: index === 0
      ? [{ transform: "translate(40px,-50%)", opacity: 1 }, { transform: "translate(40px,-140%)", opacity: 0 }]
      : [{ transform: "translate(40px,45%)", opacity: 0 }, { transform: "translate(40px,-50%)", opacity: 1 }],
    emphasis: [{ transform: "translate(55px,-50%) scale(.65)" }, { transform: "translate(55px,-50%) scale(1.25)", offset: .65 }, { transform: "translate(55px,-50%) scale(1)" }],
    blurText: [{ transform: "translate(40px,-50%)", filter: "blur(10px)", opacity: .2 }, { transform: "translate(40px,-50%)", filter: "blur(0)", opacity: 1 }],
    nudge: [{ transform: "translate(82px,-50%)" }, { transform: "translate(91px,-50%)", offset: .34 }, { transform: "translate(79px,-50%)", offset: .64 }, { transform: "translate(82px,-50%)" }],
    attentionBounce: [{ transform: "translate(82px,-50%) scale(1)", easing: "cubic-bezier(.25,.46,.45,.94)" }, { transform: "translate(82px,calc(-50% - 16px)) scale(1)", offset: .42, easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(82px,calc(-50% + 1.5px)) scaleX(1.04) scaleY(.92)", offset: .7, easing: "cubic-bezier(.22,1,.36,1)" }, { transform: "translate(82px,-50%) scale(1)" }],
    badgePop: [{ transform: "translate(82px,-50%) scale(.98)" }, { transform: "translate(82px,-50%) scale(1.03)", offset: .7 }, { transform: "translate(82px,-50%) scale(1)" }],
    focusHalo: [{ transform: "translate(82px,-50%) scale(.98)" }, { transform: "translate(82px,-50%) scale(1.04)", offset: .42 }, { transform: "translate(82px,-50%) scale(1)" }],
    highlightSweep: [{ transform: "translate(82px,-50%)" }, { transform: "translate(82px,-50%)" }],
    borderChase: [{ transform: "translate(82px,-50%)" }, { transform: "translate(82px,-50%)" }],
    pressFeedback: [{ transform: "translate(82px,-50%) scale(1)", boxShadow: "0 6px 18px rgba(114,87,255,.28)" }, { transform: "translate(82px,-50%) scale(.94)", boxShadow: "0 1.5px 4.5px rgba(114,87,255,.07)", offset: .3 }, { transform: "translate(82px,-50%) scale(1)", boxShadow: "0 6px 18px rgba(114,87,255,.28)" }],
    jellyEmphasis: [{ transform: "translate(82px,-50%) scale(1)" }, { transform: "translate(82px,-50%) scaleX(1.25) scaleY(.78)", offset: .34 }, { transform: "translate(82px,-50%) scaleX(.88) scaleY(1.12)", offset: .58 }, { transform: "translate(82px,-50%) scaleX(1.06) scaleY(.96)", offset: .78 }, { transform: "translate(82px,-50%) scale(1)" }],
    glowPulse: [{ transform: "translate(82px,-50%) scale(.98)", filter: "brightness(.92)", boxShadow: "0 0 8px var(--motion-accent)" }, { transform: "translate(82px,-50%) scale(1.03)", filter: "brightness(1.22)", boxShadow: "0 0 26px var(--motion-accent)", offset: .5 }, { transform: "translate(82px,-50%) scale(.98)", filter: "brightness(.92)", boxShadow: "0 0 8px var(--motion-accent)" }],
    neonFlicker: [{ transform: "translate(82px,-50%)", opacity: .2, filter: "brightness(.7)" }, { opacity: 1, filter: "brightness(1.5)", offset: .09 }, { opacity: .32, offset: .14 }, { opacity: 1, offset: .22 }, { opacity: .52, offset: .31 }, { transform: "translate(82px,-50%)", opacity: 1, filter: "brightness(1.25)" }],
    lightSweep: [{ transform: "translate(82px,-50%)", filter: "brightness(.86)" }, { transform: "translate(82px,-50%)", filter: "brightness(1.18)", offset: .5 }, { transform: "translate(82px,-50%)", filter: "brightness(.9)" }],
    bloomReveal: [{ transform: "translate(82px,-50%) scale(.82)", opacity: .9, filter: "blur(10px) brightness(2.4)", boxShadow: "0 0 38px rgba(255,255,255,.95)" }, { transform: "translate(82px,-50%) scale(1.06)", opacity: 1, filter: "blur(2px) brightness(1.4)", boxShadow: "0 0 8px rgba(255,255,255,.6)", offset: .7 }, { transform: "translate(82px,-50%) scale(1)", opacity: 1, filter: "blur(0) brightness(1)", boxShadow: "0 6px 18px rgba(114,87,255,.28)" }],
    rimGlow: [{ transform: "translate(82px,-50%)", boxShadow: "0 0 0 2px color-mix(in srgb, var(--motion-accent) 70%, transparent), 0 0 10px color-mix(in srgb, var(--motion-accent) 55%, transparent)" }, { transform: "translate(82px,-50%)", boxShadow: "0 0 0 4px #fff, 0 0 22px var(--motion-accent)", offset: .5 }, { transform: "translate(82px,-50%)", boxShadow: "0 0 0 2px color-mix(in srgb, var(--motion-accent) 70%, transparent), 0 0 10px color-mix(in srgb, var(--motion-accent) 55%, transparent)" }],
    energyCharge: [{ transform: "translate(82px,-50%) scale(.72)", filter: "brightness(.7)", opacity: .65 }, { transform: "translate(82px,-50%) scale(1.14)", filter: "brightness(1.7)", opacity: 1 }],
    lightTrail: [{ transform: `translate(${10 - index * 9}px,-50%) scale(${1 - index * .1})`, opacity: [1, .45, .3, .18][index] ?? .15, filter: `blur(${index * 1.5}px)` }, { transform: `translate(${185 - index * 11}px,-50%) scale(${1 - index * .1})`, opacity: [1, .45, .3, .18][index] ?? .15, filter: `blur(${index * 1.5}px)`, offset: .72 }, { transform: `translate(185px,-50%) scale(${1 - index * .1})`, opacity: index ? 0 : 1, filter: `blur(${index * 1.5}px)` }],
    scanLine: [{ transform: "translate(82px,-50%)", opacity: .7 }, { transform: "translate(82px,-50%)", opacity: 1 }],
    blurZoom: [{ transform: "translate(82px,-50%) scale(.65)", opacity: 0, filter: "blur(14px)" }, { transform: "translate(82px,-50%) scale(1)", opacity: 1, filter: "blur(0)" }],
    glitchIn: [{ transform: "translate(68px,-50%) skewX(-5deg)", opacity: .25, clipPath: "inset(8% 0 64% 0)" }, { transform: "translate(96px,-50%) skewX(4deg)", opacity: .75, clipPath: "inset(56% 0 10% 0)", offset: .24 }, { transform: "translate(74px,-50%) skewX(-2deg)", clipPath: "inset(26% 0 38% 0)", offset: .45 }, { transform: "translate(84px,-50%)", clipPath: "inset(0)", offset: .68 }, { transform: "translate(82px,-50%)", opacity: 1, clipPath: "inset(0)" }],
    particleBurst: [{ transform: "translate(82px,-50%) scale(.72)", opacity: .5 }, { transform: "translate(82px,-50%) scale(1.14)", opacity: 1, offset: .42 }, { transform: "translate(82px,-50%) scale(1)" }],
    rippleReveal: [{ transform: "translate(82px,-50%) scale(.72)", opacity: 0 }, { transform: "translate(82px,-50%) scale(1.04)", opacity: 1, offset: .68 }, { transform: "translate(82px,-50%) scale(1)", opacity: 1 }],
    noiseReveal: [{ transform: "translate(82px,-50%) scale(.96)", opacity: .2, filter: "blur(8px)" }, { transform: "translate(82px,-50%) scale(1)", opacity: 1, filter: "blur(0)" }],
    diagonalWipe: [{ transform: "translate(82px,-50%)", clipPath: "polygon(0 100%,0 100%,0 100%,0 100%)", opacity: .35 }, { transform: "translate(82px,-50%)", clipPath: "polygon(0 0,145% 0,100% 100%,-45% 100%)", opacity: 1 }],
    foldIn: [{ transform: "translate(82px,-50%) perspective(420px) rotateX(-82deg)", transformOrigin: "50% 0", opacity: .25 }, { transform: "translate(82px,-50%) perspective(420px) rotateX(7deg)", transformOrigin: "50% 0", opacity: 1, offset: .82 }, { transform: "translate(82px,-50%) perspective(420px) rotateX(0)", transformOrigin: "50% 0", opacity: 1 }],
    shrinkFade: [{ transform: "translate(82px,-50%) scale(1)", opacity: 1, filter: "blur(0)" }, { transform: "translate(82px,-50%) scale(.22)", opacity: 0, filter: "blur(3px)" }],
    zigzagTravel: [{ transform: "translate(0,-50%)" }, { transform: "translate(55px,calc(-50% - 28px))", offset: .28 }, { transform: "translate(112px,calc(-50% + 24px))", offset: .62 }, { transform: "translate(175px,-50%)" }],
    momentumDrift: [{ transform: "translate(0,-50%)" }, { transform: "translate(168px,-50%)", offset: .68 }, { transform: "translate(184px,-50%)", offset: .84 }, { transform: "translate(175px,-50%)" }],
    waypointHop: [{ transform: "translate(0px,-50%) scale(1)", easing: "cubic-bezier(.2,.6,.5,1)" }, { transform: "translate(29.0px,calc(-50% - 24px)) scale(1)", offset: 0.15, easing: "cubic-bezier(.5,0,.8,.4)" }, { transform: "translate(58px,calc(-50% + 1.5px)) scaleX(1.08) scaleY(.92)", offset: 0.3, easing: "cubic-bezier(.2,.8,.3,1)" }, { transform: "translate(58px,-50%) scale(1)", offset: 0.36, easing: "cubic-bezier(.2,.6,.5,1)" }, { transform: "translate(87.0px,calc(-50% - 24px)) scale(1)", offset: 0.47, easing: "cubic-bezier(.5,0,.8,.4)" }, { transform: "translate(116px,calc(-50% + 1.5px)) scaleX(1.08) scaleY(.92)", offset: 0.62, easing: "cubic-bezier(.2,.8,.3,1)" }, { transform: "translate(116px,-50%) scale(1)", offset: 0.68, easing: "cubic-bezier(.2,.6,.5,1)" }, { transform: "translate(145.5px,calc(-50% - 24px)) scale(1)", offset: 0.79, easing: "cubic-bezier(.5,0,.8,.4)" }, { transform: "translate(175px,calc(-50% + 1.5px)) scaleX(1.08) scaleY(.92)", offset: 0.94, easing: "cubic-bezier(.2,.8,.3,1)" }, { transform: "translate(175px,-50%) scale(1)" }],
    centerPunch: [{ transform: "translate(82px,-50%) scale(.18)", opacity: .2 }, { transform: "translate(82px,-50%) scale(1.32)", opacity: 1, offset: .62 }, { transform: "translate(82px,-50%) scale(1)", opacity: 1 }],
    widthReveal: [{ transform: "translate(82px,-50%) scaleX(.04)", transformOrigin: "0 50%", opacity: .45 }, { transform: "translate(82px,-50%) scaleX(1.08)", transformOrigin: "0 50%", opacity: 1, offset: .78 }, { transform: "translate(82px,-50%) scaleX(1)", transformOrigin: "0 50%", opacity: 1 }],
    depthPullback: [{ transform: "translate(82px,-50%) scale(2.2)", opacity: .25, filter: "blur(8px) brightness(1.35)" }, { transform: "translate(82px,-50%) scale(1)", opacity: 1, filter: "blur(0) brightness(1)" }],
    coinSpin: [{ transform: "translate(82px,-50%) perspective(320px) rotateY(0)" }, { transform: "translate(82px,-50%) perspective(320px) rotateY(720deg)", offset: .72 }, { transform: "translate(82px,-50%) perspective(320px) rotateY(900deg)" }],
    gyroscope: [{ transform: "translate(82px,-50%) perspective(360px) rotateX(0) rotateY(0)" }, { transform: "translate(82px,-50%) perspective(360px) rotateX(55deg) rotateY(150deg)", offset: .44 }, { transform: "translate(82px,-50%) perspective(360px) rotateX(-30deg) rotateY(280deg)", offset: .76 }, { transform: "translate(82px,-50%) perspective(360px) rotateX(0) rotateY(360deg)" }],
    rotateReveal: [{ transform: "translate(82px,-50%) perspective(360px) rotateY(-88deg)", transformOrigin: "0 50%", opacity: .2 }, { transform: "translate(82px,-50%) perspective(360px) rotateY(5deg)", transformOrigin: "0 50%", opacity: 1, offset: .84 }, { transform: "translate(82px,-50%) perspective(360px) rotateY(0)", transformOrigin: "0 50%", opacity: 1 }],
    settleDrop: [{ transform: "translate(82px,-150%) scale(1)", easing: "cubic-bezier(.55,.085,.68,.53)" }, { transform: "translate(82px,-50%) scale(1)", offset: .44, easing: "cubic-bezier(.2,.8,.3,1)" }, { transform: "translate(82px,calc(-50% + 7px)) scaleX(1.45) scaleY(.62)", offset: .5, easing: "cubic-bezier(.16,1,.3,1)" }, { transform: "translate(82px,-50%) scale(1)" }],
    dragResistance: [{ transform: "translate(0,-50%) scaleX(1)" }, { transform: "translate(92px,-50%) scaleX(1.35)", transformOrigin: "100% 50%", offset: .5 }, { transform: "translate(-12px,-50%) scaleX(.88)", transformOrigin: "0 50%", offset: .8 }, { transform: "translate(0,-50%) scaleX(1)", transformOrigin: "50% 50%" }],
    followThrough: [{ transform: "translate(0,-50%) rotate(0) scaleX(1)" }, { transform: "translate(170px,-50%) rotate(18deg) scaleX(1.18)", offset: .58 }, { transform: "translate(170px,-50%) rotate(-6deg) scaleX(.96)", offset: .78 }, { transform: "translate(170px,-50%) rotate(0) scaleX(1)" }],
    typewriterText: [{ transform: "translate(40px,-50%)", clipPath: "inset(0 100% 0 0)", opacity: 1 }, { transform: "translate(40px,-50%)", clipPath: "inset(0 0 0 0)", opacity: 1 }],
    lineByLine: [{ transform: `translate(40px,calc(-115% + ${index * 32}px))`, opacity: 0, filter: "blur(4px)" }, { transform: `translate(40px,calc(-115% + ${index * 32}px))`, opacity: 1, filter: "blur(0)" }],
    scrambleText: [{ transform: `translate(${((index % 3) - 1) * 18}px,${(index % 2 ? 1 : -1) * 22}px) rotate(${(index - 2.5) * 7}deg)`, opacity: .15, filter: "blur(5px)" }, { transform: "translate(0px,0px) rotate(0deg)", opacity: 1, filter: "blur(0)" }],
    colorPulse: [{ transform: "translate(82px,-50%)", filter: "saturate(.85) brightness(.9)" }, { transform: "translate(82px,-50%)", filter: "saturate(1.45) brightness(1.35)", offset: .5 }, { transform: "translate(82px,-50%)", filter: "saturate(.85) brightness(.9)" }],
    iconNod: [{ transform: "translate(82px,-50%) rotate(0)", transformOrigin: "50% 12%" }, { transform: "translate(82px,-50%) rotate(16deg)", transformOrigin: "50% 12%", offset: .45 }, { transform: "translate(82px,-50%) rotate(-5deg)", transformOrigin: "50% 12%", offset: .72 }, { transform: "translate(82px,-50%) rotate(0)", transformOrigin: "50% 12%" }],
    spotlightFocus: [{ transform: "translate(82px,-50%) scale(.96)", filter: "brightness(.72)", opacity: .62 }, { transform: "translate(82px,-50%) scale(1.06)", filter: "brightness(1.35)", opacity: 1, offset: .62 }, { transform: "translate(82px,-50%) scale(1)", filter: "brightness(1.08)", opacity: 1 }],
    errorShake: [{ transform: "translate(82px,-50%)" }, { transform: "translate(70px,-50%)", offset: .18 }, { transform: "translate(92px,-50%)", offset: .36 }, { transform: "translate(76px,-50%)", offset: .54 }, { transform: "translate(86px,-50%)", offset: .72 }, { transform: "translate(82px,-50%)", boxShadow: "0 0 0 3px rgba(255,94,114,.55)" }],
    auroraGlow: [{ transform: "translate(82px,-50%) scale(.97)", filter: "hue-rotate(0deg) brightness(.92)", boxShadow: "-18px -8px 28px #6d5cff,18px 8px 28px #00d9ff" }, { transform: "translate(82px,-50%) scale(1.04)", filter: "hue-rotate(70deg) brightness(1.22)", boxShadow: "18px -10px 32px #6d5cff,-18px 10px 32px #00d9ff", offset: .5 }, { transform: "translate(82px,-50%) scale(.97)", filter: "hue-rotate(0deg) brightness(.92)", boxShadow: "-18px -8px 28px #6d5cff,18px 8px 28px #00d9ff" }],
    radialFlash: [{ transform: "translate(82px,-50%) scale(.82)", filter: "brightness(1)" }, { transform: "translate(82px,-50%) scale(1.18)", filter: "brightness(2.2)", offset: .28 }, { transform: "translate(82px,-50%) scale(1)", filter: "brightness(1)" }],
    lensFlareSweep: [{ transform: "translate(18px,-50%) scale(.86)", filter: "brightness(.82)", boxShadow: "0 0 6px transparent" }, { transform: "translate(102px,-50%) scale(1.08)", filter: "brightness(1.8)", boxShadow: "0 0 22px #fff,0 0 42px var(--motion-accent)", offset: .5 }, { transform: "translate(185px,-50%) scale(.86)", filter: "brightness(.82)", boxShadow: "0 0 6px transparent" }],
    holographicSheen: [{ transform: "translate(82px,-50%) perspective(320px) rotateY(-8deg)", filter: "hue-rotate(0deg) brightness(.9)" }, { transform: "translate(82px,-50%) perspective(320px) rotateY(8deg)", filter: "hue-rotate(55deg) brightness(1.35)", offset: .5 }, { transform: "translate(82px,-50%) perspective(320px) rotateY(-8deg)", filter: "hue-rotate(0deg) brightness(.9)" }],
    liquidMorph: [{ transform: "translate(82px,-50%) scale(1)", borderRadius: "50%" }, { transform: "translate(82px,-50%) scaleX(1.18) scaleY(.88)", borderRadius: "62% 38% 55% 45% / 45% 58% 42% 55%", offset: .34 }, { transform: "translate(82px,-50%) scaleX(.9) scaleY(1.14)", borderRadius: "34% 66% 42% 58% / 61% 35% 65% 39%", offset: .68 }, { transform: "translate(82px,-50%) scale(1)", borderRadius: "50%" }],
    inkReveal: [{ transform: "translate(82px,-50%) scale(.82)", clipPath: "circle(0% at 28% 72%)", filter: "blur(5px)", opacity: .25 }, { transform: "translate(82px,-50%) scale(1.05)", clipPath: "circle(46% at 58% 42%)", filter: "blur(2px)", opacity: 1, offset: .72 }, { transform: "translate(82px,-50%) scale(1)", clipPath: "circle(76% at 50% 50%)", filter: "blur(0)", opacity: 1 }],
    mosaicFlip: [{ transform: "perspective(240px) rotateY(-90deg) scale(.82)", opacity: .15 }, { transform: "perspective(240px) rotateY(12deg) scale(1.04)", opacity: 1, offset: .78 }, { transform: "perspective(240px) rotateY(0) scale(1)", opacity: 1 }],
    displacementWave: [{ transform: "translate(82px,-50%) skewX(0) scaleX(1)", clipPath: "inset(0)" }, { transform: "translate(82px,-50%) skewX(12deg) scaleX(1.18)", clipPath: "inset(0 12% 0 0)", offset: .32 }, { transform: "translate(82px,-50%) skewX(-8deg) scaleX(.9)", clipPath: "inset(0 0 0 12%)", offset: .64 }, { transform: "translate(82px,-50%) skewX(0) scaleX(1)", clipPath: "inset(0)" }]
  };
  if (pattern === "orbit") {
    const angles = [0, 90, 180, 270, 360];
    return angles.map((angle, frame) => {
      const rad = angle * Math.PI / 180;
      return { transform: `translate(${90 + Math.cos(rad) * 70}px,calc(-50% + ${Math.sin(rad) * 30}px))`, offset: frame / 4 };
    });
  }
  if (pattern === "counterRotate") {
    const direction = index === 0 ? 1 : -1;
    return [{ transform: "translate(82px,-50%) rotate(0)" }, { transform: `translate(82px,-50%) rotate(${direction * 360}deg)` }];
  }
  if (pattern === "staggerText" || pattern === "textWave" || pattern === "splitText") {
    // Offsets are relative to each letter's place in the flowing word.
    if (pattern === "textWave") return [{ transform: "translateY(0)" }, { transform: "translateY(-58%)", offset: .5 }, { transform: "translateY(0)" }];
    if (pattern === "splitText") return [{ transform: `translate(${Math.round((index - (count - 1) / 2) * 14)}px,${index % 2 ? "72%" : "-72%"}) rotate(${(index - 2) * 12}deg)`, opacity: 0 }, { transform: "translate(0px,0) rotate(0deg)", opacity: 1 }];
    return [{ transform: "translateY(72%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }];
  }
  if (pattern === "chromaticSplit") {
    if (index === 0) return [
      { transform: "translate(48px,-50%)", opacity: 1 },
      { transform: "translate(52px,-50%)", opacity: 1, offset: .42 },
      { transform: "translate(70px,-50%)", opacity: .95, offset: .68 },
      { transform: "translate(82px,-50%)", opacity: 0, offset: .9 },
      { transform: "translate(82px,-50%)", opacity: 0 }
    ];
    if (index === 1) return [
      { transform: "translate(116px,-50%)", opacity: 1 },
      { transform: "translate(112px,-50%)", opacity: 1, offset: .42 },
      { transform: "translate(94px,-50%)", opacity: .95, offset: .68 },
      { transform: "translate(82px,-50%)", opacity: 0, offset: .9 },
      { transform: "translate(82px,-50%)", opacity: 0 }
    ];
    return [
      { transform: "translate(82px,-50%) scale(.82)", opacity: .35, filter: "blur(2px)" },
      { transform: "translate(86px,-50%) scale(1.08)", opacity: 1, filter: "blur(0)", offset: .2 },
      { transform: "translate(79px,-50%) scale(.98)", opacity: 1, offset: .38 },
      { transform: "translate(83px,-50%) scale(1.02)", opacity: 1, offset: .56 },
      { transform: "translate(82px,-50%) scale(1)", opacity: 1 }
    ];
  }
  if (pattern === "pixelDissolve") return [{ transform: "scale(0) rotate(-16deg)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }];
  if (pattern === "sliceReveal") {
    const direction = index % 2 ? 1 : -1;
    return [{ transform: `translateX(${direction * 44}px)`, opacity: 0 }, { transform: "translateX(0)", opacity: 1 }];
  }
  if (!common[pattern]) throw new Error(`Unsupported motion pattern: ${pattern}`);
  return common[pattern];
}

function webMotionKeyframes(pattern, index = 0) {
  const frames = {
    scrollReveal: [{ transform: "translateY(28px) scale(.96)", opacity: 0 }, { transform: "translateY(0) scale(1)", opacity: 1 }],
    parallaxLayers: [{ transform: `translateY(${18 - index * 7}px)` }, { transform: `translateY(${-22 + index * 8}px)` }],
    stickyPin: index === 3
      ? [{ transform: "translate(-50%,-50%) scale(.96)" }, { transform: "translate(-50%,-50%) scale(1.04)", offset: .5 }, { transform: "translate(-50%,-50%) scale(.96)" }]
      : [{ transform: "translateY(62px)", opacity: 0 }, { transform: "translateY(-4px)", opacity: 1, offset: .35 }, { transform: "translateY(-72px)", opacity: 0 }],
    scrollProgress: [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
    horizontalScrub: [{ transform: "translateX(94px)" }, { transform: "translateX(-118px)" }],
    sectionSnap: index === 3 ? [{ transform: "translateY(0)" }, { transform: "translateY(9px)" }] : [{ transform: `translateY(${index * 84 + 12}px)`, opacity: index ? .25 : 1 }, { transform: `translateY(${(index - 1) * 84}px)`, opacity: index === 1 ? 1 : .25 }],
    textScrollScrub: [{ transform: "translateY(8px)", opacity: .18, filter: "blur(5px)" }, { transform: "translateY(8px)", opacity: .18, filter: "blur(5px)", offset: index * .1 }, { transform: "translateY(0)", opacity: 1, filter: "blur(0px)", offset: index * .1 + .35 }, { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" }],
    scrollDepthZoom: [{ transform: "translate(-50%,-50%) scale(.78)", opacity: .45, filter: "brightness(.7)" }, { transform: "translate(-50%,-50%) scale(1)", opacity: 1, filter: "brightness(1)" }],
    hoverLift: [{ transform: "translate(-50%,-50%) scale(1)", boxShadow: "0 8px 18px rgba(0,0,0,.28)" }, { transform: "translate(-50%,-50%) scale(1)", boxShadow: "0 8px 18px rgba(0,0,0,.28)", offset: .2 }, { transform: "translate(-50%,calc(-50% - 7px)) scale(1.02)", boxShadow: "0 20px 34px rgba(0,0,0,.46)", offset: .31 }, { transform: "translate(-50%,calc(-50% - 7px)) scale(1.02)", boxShadow: "0 20px 34px rgba(0,0,0,.46)", offset: .7 }, { transform: "translate(-50%,-50%) scale(1)", boxShadow: "0 8px 18px rgba(0,0,0,.28)", offset: .81 }, { transform: "translate(-50%,-50%) scale(1)", boxShadow: "0 8px 18px rgba(0,0,0,.28)" }],
    magneticButton: [{ transform: "translate(-50%,-50%)" }, { transform: "translate(-50%,-50%)", offset: .1 }, { transform: "translate(calc(-50% + 10px),calc(-50% - 5px))", offset: .27 }, { transform: "translate(calc(-50% - 9px),calc(-50% + 3px))", offset: .52 }, { transform: "translate(calc(-50% - 9px),calc(-50% + 3px))", offset: .62 }, { transform: "translate(calc(-50% + 2px),calc(-50% - 1px))", offset: .76 }, { transform: "translate(-50%,-50%)", offset: .86 }, { transform: "translate(-50%,-50%)" }],
    pointerTilt: [{ transform: "translate(-50%,-50%) perspective(420px) rotateX(0deg) rotateY(0deg)" }, { transform: "translate(-50%,-50%) perspective(420px) rotateX(0deg) rotateY(0deg)", offset: .1 }, { transform: "translate(-50%,-50%) perspective(420px) rotateX(-6deg) rotateY(-6deg)", offset: .32 }, { transform: "translate(-50%,-50%) perspective(420px) rotateX(-6deg) rotateY(-6deg)", offset: .44 }, { transform: "translate(-50%,-50%) perspective(420px) rotateX(6deg) rotateY(6deg)", offset: .66 }, { transform: "translate(-50%,-50%) perspective(420px) rotateX(6deg) rotateY(6deg)", offset: .78 }, { transform: "translate(-50%,-50%) perspective(420px) rotateX(0deg) rotateY(0deg)", offset: .92 }, { transform: "translate(-50%,-50%) perspective(420px) rotateX(0deg) rotateY(0deg)" }],
    cursorFollow: [{ transform: "translate(-46px,25px) scale(.65)", opacity: .35 }, { transform: "translate(52px,-28px) scale(1)", opacity: 1, offset: .5 }, { transform: "translate(94px,22px) scale(.72)", opacity: .5 }],
    dragInertia: [{ transform: "translate(-78px,-50%)" }, { transform: "translate(52px,-50%)" }],
    clickRipple: index === 0
      ? [{ transform: "translate(-50%,-50%) scale(.8)", opacity: .5 }, { transform: "translate(-50%,-50%) scale(1.1)", opacity: 1, offset: .28 }, { transform: "translate(-50%,-50%) scale(1)", opacity: 1 }]
      : [{ transform: "translate(-50%,-50%) scale(.1)", opacity: .72 }, { transform: "translate(-50%,-50%) scale(3.1)", opacity: 0 }],
    toggleMorph: [{ transform: "translate(0,-50%) scale(1)", background: "#6f7786" }, { transform: "translate(28px,-50%) scale(.84)", background: "#22bdd6", offset: .55 }, { transform: "translate(28px,-50%) scale(1)", background: "#22bdd6", offset: .72 }, { transform: "translate(0,-50%) scale(1)", background: "#6f7786" }],
    accordionOpen: index === 1 ? [{ transform: "translateY(-38px)" }, { transform: "translateY(-38px)", offset: .08 }, { transform: "translateY(0)", offset: .47 }, { transform: "translateY(0)", offset: .86 }, { transform: "translateY(-38px)" }] : [{ transform: "scaleY(.04)", transformOrigin: "50% 0", opacity: 0 }, { transform: "scaleY(.04)", transformOrigin: "50% 0", opacity: 0, offset: .08 }, { transform: "scaleY(1)", transformOrigin: "50% 0", opacity: 1, offset: .47 }, { transform: "scaleY(1)", transformOrigin: "50% 0", opacity: 1, offset: .86 }, { transform: "scaleY(.04)", transformOrigin: "50% 0", opacity: 0 }],
    sharedElement: [{ transform: "translate(-88px,20px) scale(.55)", borderRadius: "12px" }, { transform: "translate(54px,-17px) scale(1.45)", borderRadius: "5px", offset: .76 }, { transform: "translate(54px,-17px) scale(1.45)", borderRadius: "5px" }],
    viewCrossfade: index === 0
      ? [{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: "translateX(-8px)" }]
      : [{ opacity: 0, transform: "translateX(8px)" }, { opacity: 1, transform: "translateX(0)" }],
    flipReorder: [{ transform: "translate(0,0)" }, { transform: `translate(${index % 2 ? -70 : 70}px,${index < 2 ? 48 : -48}px)` }, { transform: "translate(0,0)" }],
    modalMorph: [{ transform: "translate(-50%,-50%) scale(.36)", borderRadius: "18px", opacity: .75 }, { transform: "translate(-50%,-50%) scale(1)", borderRadius: "8px", opacity: 1, offset: .72 }, { transform: "translate(-50%,-50%) scale(1)", borderRadius: "8px", opacity: 1 }],
    tabIndicator: [{ transform: "translateX(10px) scaleX(.7)" }, { transform: "translateX(46px) scaleX(2.1)", offset: .46 }, { transform: "translateX(82.5px) scaleX(.73)" }],
    filterReflow: index === 1 || index === 4
      ? [{ transform: "scale(1)", opacity: 1 }, { transform: "scale(.2)", opacity: 0, offset: .35 }, { transform: "scale(.2)", opacity: 0 }]
      : [{ transform: "translate(0,0)" }, { transform: `translate(${index > 1 ? -28 : 0}px,${index > 3 ? -34 : 0}px)`, offset: .62 }, { transform: "translate(0,0)" }],
    routeSlide: index === 0 ? [{ transform: "translateX(0)", opacity: 1 }, { transform: "translateX(-18%)", opacity: .4 }] : [{ transform: "translateX(100%)", opacity: 1 }, { transform: "translateX(0)", opacity: 1 }],
    pageWipe: index === 0
      ? [{ opacity: 1 }, { opacity: 1, offset: .49 }, { opacity: 0, offset: .5 }, { opacity: 0 }]
      : index === 1
        ? [{ opacity: 0 }, { opacity: 0, offset: .49 }, { opacity: 1, offset: .5 }, { opacity: 1 }]
        : [{ transform: "scaleX(0)", transformOrigin: "0 50%" }, { transform: "scaleX(1)", transformOrigin: "0 50%", offset: .48 }, { transform: "scaleX(1)", transformOrigin: "100% 50%", offset: .56 }, { transform: "scaleX(0)", transformOrigin: "100% 50%" }],
    skeletonShimmer: [{ transform: "translateX(-160%) skewX(-18deg)", opacity: 0 }, { opacity: .75, offset: .45 }, { transform: "translateX(250%) skewX(-18deg)", opacity: 0 }],
    spinnerArc: [{ transform: "translate(-50%,-50%) rotate(0)" }, { transform: "translate(-50%,-50%) rotate(360deg)" }],
    progressFill: [{ transform: "scaleX(.08)" }, { transform: "scaleX(.68)", offset: .72 }, { transform: "scaleX(1)" }],
    circularProgress: [{ transform: "translate(-50%,-50%) rotate(-110deg) scale(.86)", opacity: .45 }, { transform: "translate(-50%,-50%) rotate(0) scale(1)", opacity: 1 }],
    loadingDots: [{ transform: "translateY(0)", opacity: .35 }, { transform: "translateY(-10px)", opacity: 1, offset: .5 }, { transform: "translateY(0)", opacity: .35 }],
    countUp: [{ transform: "translateY(28px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1, offset: .36 }, { transform: "translateY(0)", opacity: 1, offset: .58 }, { transform: "translateY(-28px)", opacity: 0 }],
    chartDraw: [{ strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1 }],
    toastStack: [{ transform: "translateY(34px) scale(.96)", opacity: 0 }, { transform: `translateY(${-index * 38}px) scale(1)`, opacity: 1, offset: .55 }, { transform: `translateY(${-index * 38}px) scale(1)`, opacity: 1 }],
    pinnedStorySteps: index === 3 ? [{ transform: "translate(-50%,-50%) scale(.94)" }, { transform: "translate(-50%,-50%) scale(1.05)", offset: .5 }, { transform: "translate(-50%,-50%) scale(.94)" }] : index === 2 ? [{ transform: "translateY(34px)", opacity: 0 }, { transform: "translateY(34px)", opacity: 0, offset: .62 }, { transform: "translateY(0)", opacity: 1, offset: .74 }, { transform: "translateY(0)", opacity: 1 }] : [{ transform: "translateY(34px)", opacity: 0 }, { transform: "translateY(34px)", opacity: 0, offset: .04 + index * .3 }, { transform: "translateY(0)", opacity: 1, offset: .16 + index * .3 }, { transform: "translateY(0)", opacity: 1, offset: .3 + index * .3 }, { transform: "translateY(-34px)", opacity: 0, offset: .38 + index * .3 }, { transform: "translateY(-34px)", opacity: 0 }],
    scrollMarquee: [{ transform: "translateX(70px)" }, { transform: "translateX(-170px)" }],
    imageClipScrub: [{ clipPath: "inset(12% 42% round 18px)", transform: "scale(1.16)" }, { clipPath: "inset(0 round 5px)", transform: "scale(1)" }],
    velocitySkew: [{ transform: `translateY(${index * 36 - 28}px) skewY(0deg)` }, { transform: `translateY(${index * 36 - 28}px) skewY(-9deg) translateX(12px)`, offset: .35 }, { transform: `translateY(${index * 36 - 28}px) skewY(7deg) translateX(-7px)`, offset: .62 }, { transform: `translateY(${index * 36 - 28}px) skewY(0deg)` }],
    buttonFillHover: [{ transform: "translate(-50%,-50%) scale(.05)", opacity: 0 }, { transform: "translate(-50%,-50%) scale(.05)", opacity: .9, offset: .2 }, { transform: "translate(-50%,-50%) scale(4.6)", opacity: 1, offset: .72 }, { transform: "translate(-50%,-50%) scale(4.6)", opacity: 1 }],
    iconMorph: index === 1
      ? [{ transform: "translate(-50%,-50%) scaleX(1)", opacity: 1 }, { transform: "translate(-50%,-50%) scaleX(0)", opacity: 0 }]
      : [{ transform: `translate(-50%,calc(-50% + ${(index - 1) * 8}px)) rotate(0)` }, { transform: `translate(-50%,-50%) rotate(${index === 0 ? 45 : -45}deg)` }],
    cardSpotlight: index === 0 ? [{ transform: "translate(-50%,-50%) scale(1)" }, { transform: "translate(-50%,-50%) scale(1.025)", offset: .5 }, { transform: "translate(-50%,-50%) scale(1)" }] : [{ transform: "translate(-55px,-22px)", opacity: .28 }, { transform: "translate(55px,22px)", opacity: .72 }, { transform: "translate(-55px,-22px)", opacity: .28 }],
    dragSnap: [{ transform: "translate(-72px,30px) rotate(-8deg)" }, { transform: "translate(58px,-25px) rotate(5deg)", offset: .68 }, { transform: "translate(51px,-20px) rotate(0)" }],
    sidebarReveal: [{ transform: "translateX(-105%)", opacity: .65 }, { transform: "translateX(0)", opacity: 1 }],
    commandPaletteOpen: [{ transform: "translate(-50%,-18px) scale(.94,.35)", opacity: 0 }, { transform: "translate(-50%,0) scale(1)", opacity: 1 }],
    dropdownOrigin: [{ transform: "scaleY(.06)", transformOrigin: "50% 0", opacity: 0 }, { transform: "scaleY(1.04)", transformOrigin: "50% 0", opacity: 1, offset: .76 }, { transform: "scaleY(1)", transformOrigin: "50% 0", opacity: 1 }],
    detailExpand: [{ transform: "translate(-66px,28px) scale(.48)", borderRadius: "8px" }, { transform: "translate(8px,-4px) scale(1.34)", borderRadius: "15px", offset: .78 }, { transform: "translate(8px,-4px) scale(1.28)", borderRadius: "15px" }],
    successCheck: index === 0
      ? [{ transform: "translate(-50%,-50%) rotate(-90deg) scale(.72)", opacity: .2 }, { transform: "translate(-50%,-50%) rotate(0) scale(1)", opacity: 1 }]
      : [{ transform: "translate(-50%,-50%) scale(.15) rotate(-16deg)", opacity: 0 }, { transform: "translate(-50%,-50%) scale(1.18) rotate(2deg)", opacity: 1, offset: .74 }, { transform: "translate(-50%,-50%) scale(1) rotate(0)", opacity: 1 }],
    barChartStagger: [{ transform: "scaleY(.04)", transformOrigin: "50% 100%", opacity: .35 }, { transform: "scaleY(1)", transformOrigin: "50% 100%", opacity: 1 }],
    donutSegments: [{ transform: `translate(-50%,-50%) rotate(${index * 90 - 90}deg) scale(.35)`, opacity: 0 }, { transform: `translate(-50%,-50%) rotate(${index * 90}deg) scale(1)`, opacity: 1 }],
    optimisticUpdate: index === 0
      ? [{ transform: "translateY(0)", background: "#303b50" }, { transform: "translateY(0)", background: "#24463f" }]
      : index === 1
        ? [{ transform: "translate(-50%,-50%) scale(.2)", opacity: 0 }, { opacity: 0, offset: .58 }, { transform: "translate(-50%,-50%) scale(1)", opacity: 1 }]
        : [{ transform: "translateY(0)", opacity: .2 }, { transform: "translateY(-6px)", opacity: 1, offset: .5 }, { transform: "translateY(0)", opacity: .2 }],
    floatingLabel: [{ transform: "translateY(14px) scale(1)", opacity: .62 }, { transform: "translateY(-8px) scale(.78)", opacity: 1 }],
    checkboxStroke: [{ transform: "translate(-50%,-50%) scale(.62) rotate(-12deg)", opacity: 0 }, { transform: "translate(-50%,-50%) scale(1.18) rotate(2deg)", opacity: 1, offset: .72 }, { transform: "translate(-50%,-50%) scale(1) rotate(0)", opacity: 1 }],
    switchStateSpring: [{ transform: "translate(0,-50%) scale(1)" }, { transform: "translate(29px,-50%) scale(.72,1.08)", offset: .58 }, { transform: "translate(25px,-50%) scale(1.08,.94)", offset: .78 }, { transform: "translate(27px,-50%) scale(1)" }],
    inlineValidation: [{ transform: "scaleY(.04) translateY(-8px)", transformOrigin: "50% 0", opacity: 0 }, { transform: "scaleY(1) translateY(0)", transformOrigin: "50% 0", opacity: 1 }],
    submitSuccess: index === 0
      ? [{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 }, { transform: "translate(-50%,-50%) scale(.96)", opacity: .12, offset: .62 }, { transform: "translate(-50%,-50%) scale(1)", opacity: 0 }]
      : [{ transform: "translate(-50%,-50%) scale(.2) rotate(-18deg)", opacity: 0 }, { opacity: 0, offset: .48 }, { transform: "translate(-50%,-50%) scale(1.2) rotate(3deg)", opacity: 1, offset: .78 }, { transform: "translate(-50%,-50%) scale(1) rotate(0)", opacity: 1 }],
    uploadProgressState: index === 0
      ? [{ transform: "scaleX(.04)" }, { transform: "scaleX(1)" }]
      : [{ transform: "translate(-50%,-50%) scale(.25)", opacity: 0 }, { opacity: 0, offset: .72 }, { transform: "translate(-50%,-50%) scale(1)", opacity: 1 }],
    passwordStrength: [{ transform: "scaleX(.18)", transformOrigin: "0 50%", opacity: .18 }, { transform: "scaleX(1)", transformOrigin: "0 50%", opacity: 1 }],
    skeletonResolve: index === 0
      ? [{ opacity: 1, transform: "translate(-50%,-50%)" }, { opacity: 0, transform: "translate(-50%,calc(-50% - 4px))" }]
      : [{ opacity: 0, transform: "translate(-50%,calc(-50% + 6px))" }, { opacity: 1, transform: "translate(-50%,-50%)" }],
    swipeDismiss: [{ transform: "translate(-50%,-50%) rotate(0)", opacity: 1 }, { transform: "translate(-50%,-50%) rotate(0)", opacity: 1, offset: .1 }, { transform: "translate(calc(-50% + 60px),-50%) rotate(4deg)", opacity: .85, offset: .55, easing: "cubic-bezier(.55,0,1,.45)" }, { transform: "translate(190px,-50%) rotate(10deg)", opacity: 0, offset: .82 }, { transform: "translate(190px,-50%) rotate(10deg)", opacity: 0 }],
    swipeActions: [{ transform: "translate(-50%,-50%)" }, { transform: "translate(calc(-50% - 82px),-50%)", offset: .62 }, { transform: "translate(calc(-50% - 72px),-50%)" }],
    longPressProgress: index === 0
      ? [{ transform: "translate(-50%,-50%) rotate(-90deg) scale(.72)", opacity: .28 }, { transform: "translate(-50%,-50%) rotate(270deg) scale(1)", opacity: 1 }]
      : [{ transform: "translate(-50%,-50%) scale(1)" }, { transform: "translate(-50%,-50%) scale(.88)", offset: .6 }, { transform: "translate(-50%,-50%) scale(1)" }],
    pullToRefresh: index === 0 ? [{ transform: "translate(-50%,-70px) rotate(0)", opacity: 0 }, { transform: "translate(-50%,-20px) rotate(220deg)", opacity: 1, offset: .5 }, { transform: "translate(-50%,-20px) rotate(360deg)", opacity: 1, offset: .62 }, { transform: "translate(-50%,-20px) rotate(720deg)", opacity: 1, offset: .86 }, { transform: "translate(-50%,-70px) rotate(760deg)", opacity: 0 }] : [{ transform: `translateY(${index * 22 - 14}px)` }, { transform: `translateY(${index * 22 + 4}px)`, offset: .5 }, { transform: `translateY(${index * 22 + 4}px)`, offset: .86 }, { transform: `translateY(${index * 22 - 14}px)` }],
    dragPickup: [{ transform: "translate(-58px,-30px) scale(1)", boxShadow: "0 8px 16px rgba(0,0,0,.22)" }, { transform: "translate(48px,20px) scale(1.08)", boxShadow: "0 26px 38px rgba(0,0,0,.48)", offset: .72 }, { transform: "translate(45px,17px) scale(1)", boxShadow: "0 8px 16px rgba(0,0,0,.22)" }],
    reorderDrag: index === 1
      ? [{ transform: "translateY(0) scale(1)" }, { transform: "translateY(72px) scale(1.04)", offset: .52 }, { transform: "translateY(36px) scale(1.02)" }]
      : [{ transform: "translateY(0)" }, { transform: `translateY(${index > 1 ? -34 : 0}px)` }, { transform: "translateY(0)" }],
    bottomSheetDrag: [{ transform: "translate(-50%,88%)" }, { transform: "translate(-50%,18%)", offset: .62 }, { transform: "translate(-50%,24%)" }],
    pinchZoom: [{ transform: "translate(-50%,-50%) scale(.72) rotate(-3deg)" }, { transform: "translate(-50%,-50%) scale(1.32) rotate(2deg)", offset: .72 }, { transform: "translate(-50%,-50%) scale(1.18) rotate(0)" }],
    svgStrokeDraw: [{ strokeDashoffset: 1, opacity: .3 }, { strokeDashoffset: 0, opacity: 1 }],
    svgPathMorph: [{ transform: "translate(-50%,-50%) scale(.72) rotate(0)", borderRadius: "50%" }, { transform: "translate(-50%,-50%) scale(1.12,.82) rotate(36deg)", borderRadius: "18%", offset: .5 }, { transform: "translate(-50%,-50%) scale(1) rotate(72deg)", borderRadius: "42%" }],
    svgTrimPath: [{ strokeDashoffset: 1, opacity: .35 }, { strokeDashoffset: -.5, opacity: 1 }],
    svgMotionPath: [{ transform: "translate(-82px,23px) rotate(-18deg)" }, { transform: "translate(-10px,-24px) rotate(28deg)", offset: .45 }, { transform: "translate(78px,-8px) rotate(-12deg)" }],
    svgMaskReveal: [{ transform: "translate(-50%,-50%) scale(.08)", clipPath: "circle(0%)", opacity: .2 }, { transform: "translate(-50%,-50%) scale(1)", clipPath: "circle(72%)", opacity: 1 }],
    svgGradientFlow: [{ transform: "translateX(-42px)", filter: "hue-rotate(0deg)" }, { transform: "translateX(42px)", filter: "hue-rotate(75deg)" }],
    svgGooeyMerge: [{ transform: `translate(${index ? 42 : -42}px,-50%) scale(.82)` }, { transform: "translate(0,-50%) scale(1.15)", offset: .62 }, { transform: `translate(${index ? 8 : -8}px,-50%) scale(1)` }],
    svgSignature: [{ strokeDashoffset: 1, opacity: .3 }, { strokeDashoffset: 0, opacity: 1 }],
    popoverTransition: [{ transform: "scale(.9) translateY(-8px)", transformOrigin: "88% 0", opacity: 0 }, { transform: "scale(1) translateY(0)", transformOrigin: "88% 0", opacity: 1, offset: .38 }, { transform: "scale(1) translateY(0)", transformOrigin: "88% 0", opacity: 1, offset: .72 }, { transform: "scale(.9) translateY(-8px)", transformOrigin: "88% 0", opacity: 0, offset: .96 }, { transform: "scale(.9) translateY(-8px)", transformOrigin: "88% 0", opacity: 0 }],
    dialogTopLayer: [{ transform: "translate(-50%,calc(-50% + 18px)) scale(.94)", opacity: 0 }, { transform: "translate(-50%,-50%) scale(1)", opacity: 1 }],
    viewTransitionCircle: [{ transform: "translate(-50%,-50%) scale(.02)", opacity: .5 }, { transform: "translate(-50%,-50%) scale(7.4)", opacity: 1 }],
    discreteExit: [{ transform: "translate(-50%,-50%) scale(1)", opacity: 1, display: "block" }, { transform: "translate(-50%,calc(-50% - 14px)) scale(.92)", opacity: 0, display: "block", offset: .9 }, { transform: "translate(-50%,calc(-50% - 14px)) scale(.92)", opacity: 0, display: "none" }],
    autoHeightExpand: [{ transform: "scaleY(.02)", transformOrigin: "50% 0", opacity: 0 }, { transform: "scaleY(1)", transformOrigin: "50% 0", opacity: 1 }],
    pageTransitionStack: index === 0
      ? [{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 }, { transform: "translate(-50%,calc(-50% - 10px)) scale(.92)", opacity: .45 }]
      : [{ transform: "translate(-50%,120%) scale(1)", opacity: .7 }, { transform: "translate(-50%,-50%) scale(1)", opacity: 1 }]
  };
  return frames[pattern] || null;
}

function collectionKeyframes(pattern, index) {
  const row = pattern.startsWith("list") ? index : Math.floor(index / 3);
  const col = pattern.startsWith("list") ? 0 : index % 3;
  if (pattern === "listStagger") return [{ transform: "translateX(-28px)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }];
  if (pattern === "listCascade") return [{ transform: "translateY(-20px) scale(.96)", opacity: 0 }, { transform: "translateY(3px) scale(1.01)", opacity: 1, offset: .72 }, { transform: "translateY(0) scale(1)", opacity: 1 }];
  if (pattern === "listAlternate") return [{ transform: `translateX(${index % 2 ? 30 : -30}px)`, opacity: 0 }, { transform: "translateX(0)", opacity: 1 }];
  if (pattern === "listExpand") return [{ transform: "scaleY(.08)", transformOrigin: "50% 0", opacity: 0 }, { transform: "scaleY(1.06)", transformOrigin: "50% 0", opacity: 1, offset: .76 }, { transform: "scaleY(1)", transformOrigin: "50% 0", opacity: 1 }];
  if (pattern === "gridWave") return [{ transform: "translateY(18px) scale(.78)", opacity: 0 }, { transform: "translateY(-3px) scale(1.04)", opacity: 1, offset: .75 }, { transform: "translateY(0) scale(1)", opacity: 1 }];
  if (pattern === "gridCenter") {
    const x = (1 - col) * 22;
    const y = (1 - row) * 20;
    return [{ transform: `translate(${x}px,${y}px) scale(.28)`, opacity: 0 }, { transform: "translate(0,0) scale(1)", opacity: 1 }];
  }
  if (pattern === "gridRowSweep") return [{ transform: "translateX(-34px)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }];
  if (pattern === "listSlideStack") return [{ transform: "translateY(48px) scale(.97)", opacity: 0 }, { transform: "translateY(-3px) scale(1.01)", opacity: 1, offset: .76 }, { transform: "translateY(0) scale(1)", opacity: 1 }];
  if (pattern === "listTrimCollapse") {
    if (index === 1) return [{ transform: "scaleY(1)", transformOrigin: "50% 0", opacity: 1 }, { transform: "scaleY(.04)", transformOrigin: "50% 0", opacity: 0 }];
    if (index > 1) return [{ transform: "translateY(0)" }, { transform: "translateY(-22px)", offset: .58 }, { transform: "translateY(0)" }];
    return [{ transform: "translateY(0)" }, { transform: "translateY(0)" }];
  }
  if (pattern === "gridSpiral") return [{ transform: "scale(.35) rotate(-24deg)", opacity: 0 }, { transform: "scale(1.06) rotate(3deg)", opacity: 1, offset: .78 }, { transform: "scale(1) rotate(0)", opacity: 1 }];
  if (pattern === "gridDiagonal") return [{ transform: "translate(-18px,18px) scale(.8)", opacity: 0 }, { transform: "translate(0,0) scale(1)", opacity: 1 }];
  const x = ((index * 17) % 47) - 23;
  const y = ((index * 29) % 41) - 20;
  const rotation = (index % 2 ? 1 : -1) * (8 + index);
  return [{ transform: `translate(${x}px,${y}px) rotate(${rotation}deg) scale(.72)`, opacity: .2 }, { transform: "translate(0,0) rotate(0) scale(1)", opacity: 1 }];
}

function multiDelay(pattern, index) {
  if (pattern === "staggerFollow") return index * 55;
  if (["staggerText", "textWave", "splitText"].includes(pattern)) return index * 38;
  if (pattern === "trailExit") return index * 32;
  if (pattern === "listStagger") return index * 70;
  if (pattern === "listCascade") return index * 60;
  if (pattern === "listAlternate") return index * 55;
  if (pattern === "listExpand") return index * 65;
  if (pattern === "gridWave") return (Math.floor(index / 3) + index % 3) * 55;
  if (pattern === "gridCenter") return Math.max(Math.abs(1 - Math.floor(index / 3)), Math.abs(1 - index % 3)) * 70;
  if (pattern === "gridRowSweep") return Math.floor(index / 3) * 90 + index % 3 * 20;
  if (pattern === "gridShuffle") return index * 35;
  if (pattern === "listSlideStack") return index * 82;
  if (pattern === "listTrimCollapse") return index > 1 ? 180 : 0;
  if (pattern === "gridSpiral") return [0, 1, 2, 7, 8, 3, 6, 5, 4][index] * 62;
  if (pattern === "gridDiagonal") return (Math.floor(index / 3) + index % 3) * 78;
  if (pattern === "pixelDissolve") return ((index * 7) % 16) * 28;
  if (pattern === "sliceReveal") return index * 36;
  if (pattern === "lightTrail") return index * 18;
  if (pattern === "scrollReveal") return index * 70;
  if (["cursorFollow", "loadingDots"].includes(pattern)) return index * 90;
  if (pattern === "clickRipple") return Math.max(0, index - 1) * 110;
  if (pattern === "countUp") return index * 170;
  if (pattern === "toastStack") return index * 120;
  if (pattern === "lineByLine") return index * 115;
  if (pattern === "scrambleText") return index * 42;
  if (pattern === "velocitySkew") return index * 55;
  if (pattern === "iconMorph") return index * 18;
  if (pattern === "barChartStagger") return index * 75;
  if (pattern === "donutSegments") return index * 95;
  if (pattern === "optimisticUpdate") return index === 1 ? 260 : Math.max(0, index - 2) * 80;
  if (pattern === "passwordStrength") return index * 85;
  if (pattern === "reorderDrag") return index * 28;
  return 0;
}

function cssEasing(easing) {
  if (/^(linear|ease|ease-in|ease-out|ease-in-out)$/.test(easing) || /^(steps|cubic-bezier|linear)\(/.test(easing)) return easing;
  const map = {
    linear: "linear",
    easeOutCubic: "cubic-bezier(.33,1,.68,1)",
    easeOutQuint: "cubic-bezier(.22,1,.36,1)",
    easeInCubic: "cubic-bezier(.32,0,.67,0)",
    easeInOutCubic: "cubic-bezier(.65,0,.35,1)",
    easeOutQuart: "cubic-bezier(.25,1,.5,1)",
    easeInQuart: "cubic-bezier(.5,0,.75,0)",
    easeInOutQuint: "cubic-bezier(.83,0,.17,1)",
    easeOutSine: "cubic-bezier(.61,1,.88,1)",
    easeInOutSine: "cubic-bezier(.37,0,.63,1)",
    easeOutExpo: "cubic-bezier(.16,1,.3,1)",
    easeOutBack: "cubic-bezier(.34,1.56,.64,1)",
    easeInBack: "cubic-bezier(.36,0,.66,-.56)",
    easeInOutBack: "cubic-bezier(.68,-.6,.32,1.6)",
    easeOutBounce: "cubic-bezier(.34,1.35,.64,1)",
    easeOutElastic: "cubic-bezier(.2,1.55,.45,1)",
    "spring(1, 80, 10)": SPRING_LINEAR_SUPPORTED ? springLinearEasing() : "cubic-bezier(.2,1.5,.45,1)"
  };
  return map[easing] || "cubic-bezier(.22,1,.36,1)";
}

function openDialog(id) {
  const item = motions.find(entry => entry.id === id);
  if (!item) return;
  selectedMotion = item;
  cardAnimations.forEach(animations => animations.forEach(animation => animation.pause()));
  populateDialog(item);
  $("#detailDialog").showModal();
  // Space then toggles playback and the arrow keys browse neighbouring motions.
  $("#playPauseButton").focus({ preventScroll: true });
  history.replaceState(null, "", `#motion=${item.id}`);
  renderOnionSkin();
  startDialogAnimation(0);
  playComparison();
}

// Browse the current result list without leaving the detail view.
function dialogNavigationList() {
  const list = filteredMotions();
  return selectedMotion && list.some(entry => entry.id === selectedMotion.id) ? list : motions;
}

function navigateDialog(direction) {
  if (!selectedMotion) return;
  const list = dialogNavigationList();
  const index = list.findIndex(entry => entry.id === selectedMotion.id);
  const next = list[(index + direction + list.length) % list.length];
  if (next && next.id !== selectedMotion.id) switchDialogMotion(next.id);
}

function switchDialogMotion(id) {
  const item = motions.find(entry => entry.id === id);
  if (!item || !$("#detailDialog").open) return;
  cancelDialogAnimation();
  comparisonAnimations.forEach(animation => animation.cancel());
  comparisonAnimations = [];
  selectedMotion = item;
  populateDialog(item);
  history.replaceState(null, "", `#motion=${item.id}`);
  renderOnionSkin();
  startDialogAnimation(0);
  $(".dialog-info").scrollTop = 0;
}

function updateDialogPosition() {
  if (!selectedMotion) return;
  const list = dialogNavigationList();
  const index = list.findIndex(entry => entry.id === selectedMotion.id);
  $("#dialogPosition").textContent = `${index + 1} / ${list.length}`;
  const single = list.length < 2;
  $("#prevMotion").disabled = single;
  $("#nextMotion").disabled = single;
}

function handleDialogKey(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const target = event.target;
  const tag = target?.tagName;
  if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || target?.isContentEditable) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    navigateDialog(event.key === "ArrowLeft" ? -1 : 1);
  } else if (event.key === "," || event.key === ".") {
    event.preventDefault();
    stepDialog(event.key === "," ? -1 : 1);
  } else if (event.key === "o" || event.key === "O") {
    event.preventDefault();
    toggleOnionSkin();
  } else if (event.key === " " && tag !== "BUTTON" && tag !== "A") {
    event.preventDefault();
    toggleDialogPlayback();
  }
}

// Onion skin: evenly timed, frozen copies of the scene reveal spacing (the
// distance travelled between equal time steps), the core read of an easing.
function onionFrameCount(duration) {
  return Math.max(8, Math.min(16, Math.round(duration / 60)));
}
function renderOnionSkin() {
  onionAnimations.forEach(animation => animation.cancel());
  onionAnimations = [];
  const host = $("#dialogStage");
  host.querySelectorAll(".onion-layer").forEach(layer => layer.remove());
  host.classList.toggle("has-onion", onionSkin);
  const button = $("#onionSkinButton");
  button.classList.toggle("active", onionSkin);
  button.setAttribute("aria-pressed", String(onionSkin));
  if (atlasDemo(selectedMotion)) {
    dialogAnimations.forEach(clip => { clip.onion = onionSkin; clip._render?.(); });
    return;
  }
  if (!onionSkin || !selectedMotion) return;
  const frames = onionFrameCount(selectedMotion.duration);
  for (let index = 0; index < frames; index++) {
    const layer = document.createElement("div");
    layer.className = "onion-layer";
    layer.setAttribute("aria-hidden", "true");
    layer.style.setProperty("--onion-strength", String(Math.round((.16 + .44 * (index / (frames - 1))) * 100) / 100));
    layer.innerHTML = stageMarkup(selectedMotion, true);
    host.append(layer);
    const stage = layer.querySelector(".motion-stage");
    observeLegacyCanvases(layer);
    const progress = index / (frames - 1) * .98;
    const frozen = buildAnimations(stage, selectedMotion, false, 1);
    frozen.forEach(animation => {
      animation.pause();
      if (!animation.effect.target.closest(".baseline-pane")) animation.currentTime = selectedMotion.duration * progress;
    });
    onionAnimations.push(...frozen);
  }
}

function toggleOnionSkin() {
  onionSkin = !onionSkin;
  try { localStorage.setItem("motion-reference-onion", onionSkin ? "1" : "0"); } catch {}
  renderOnionSkin();
  showToast(`${I18N[state.language].onionSkin}: ${onionSkin ? "ON" : "OFF"}`);
}

function readStoredFlag(key) {
  try { return localStorage.getItem(key) === "1"; } catch { return false; }
}

function openRandomMotion() {
  const list = filteredMotions();
  const pool = list.length ? list : motions;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  if (pick) openDialog(pick.id);
}

function setFilterPanelCollapsed(collapsed) {
  $("#filterPanel").classList.toggle("is-collapsed", collapsed);
  $("#filterToggle").setAttribute("aria-expanded", String(!collapsed));
}

function updateFilterToggle() {
  const changed = [state.feeling !== "all", state.usage !== "all", state.speed !== 1, state.playbackMode !== "loop"].filter(Boolean).length;
  $("#filterToggleCount").hidden = changed === 0;
  $("#filterToggleCount").textContent = String(changed);
}

// A thin playhead under each card shows where the loop is within its cycle.
function cardTimingAnimation(stage, item, loop) {
  if (!stage.closest(".motion-card")) return null;
  let bar = stage.querySelector(":scope > .stage-timing");
  if (!bar) {
    bar = document.createElement("span");
    bar.className = "stage-timing";
    bar.setAttribute("aria-hidden", "true");
    stage.append(bar);
  }
  const animation = bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
    duration: item.duration, iterations: loop ? Infinity : 1, easing: "linear", fill: "both"
  });
  animation.playbackRate = state.speed;
  return animation;
}

function populateDialog(item) {
  stopInteractiveMode(false);
  const language = state.language;
  const category = categories.find(entry => entry.id === item.category);
  renderPreviewControls();
  $("#dialogStage").innerHTML = stageMarkup(item, true);
  observeLegacyCanvases($("#dialogStage"));
  const atlas = atlasDemo(item);
  $("#dialogPreviewControl").hidden = Boolean(atlas);
  $$(".tuning-extra").forEach(label => { label.hidden = Boolean(atlas); });
  // 実装コードのタブ：テキストモーションは項目ごとの作り方（CSS・GSAP・AE など）
  const CODE_LABELS = { seek: "seek(t)", html: "HTML", css: "CSS", waapi: "WAAPI", gsap: "GSAP", motion: "Motion", remotion: "Remotion", svg: "SVG", canvas: "Canvas", react: "React", ae: "After Effects" };
  const tabKeys = !atlas ? ["html", "css", "waapi", "gsap", "react"]
    : isTextItem(item) ? ["seek", ...["css", "waapi", "gsap", "motion", "remotion", "svg", "canvas"].filter(key => item.recipes?.[key]), ...(item.recipes?.ae ? ["ae"] : [])]
    : ["seek", "html", "css", "waapi", "gsap", "react"];
  if (!tabKeys.includes(activeCodeTab)) activeCodeTab = tabKeys[0];
  $("#codeTabs").innerHTML = tabKeys.map(key => `<button data-code-tab="${key}" role="tab" aria-selected="false">${CODE_LABELS[key]}</button>`).join("");
  $(".tips-section").hidden = !(item.tips || []).length;
  $("#dialogTextField").hidden = !isTextItem(item);
  $(".recipe-section").hidden = isTextItem(item);
  renderAtlasValues(item, atlas);
  $("#semanticNote").hidden = Boolean(atlasDemo(item)) || !window.MotionRuntime.definitions[item.pattern];
  $("#semanticNote").textContent = I18N[language].semanticNote;
  $("#dialogCategory").textContent = language === "en" ? category.labelEn : category.label;
  $("#dialogTitle").textContent = localTitle(item);
  $("#dialogDescription").textContent = language === "en" ? item.descriptionEn : item.description;
  $("#dialogFocus").textContent = language === "en" ? item.focusEn : item.focus;
  $("#dialogCaution").textContent = language === "en" ? item.cautionEn : item.caution;
  $("#dialogDuration").textContent = `${item.motionDuration || item.duration}ms`;
  $("#dialogEasing").textContent = item.easing;
  const cssValue = atlas ? atlasCssEasing(atlas, item) : cssEasing(item.easing);
  const perSegment = !atlas && (Boolean(window.MotionRuntime.definitions[item.pattern]) || usesAuthoredPoses(item));
  $("#copyEasing").hidden = perSegment || cssValue === "linear";
  $("#copyEasing").textContent = cssValue;
  $("#easingNote").hidden = !perSegment;
  $("#easingNote").textContent = I18N[language][window.MotionRuntime.definitions[item.pattern] ? "segmentEasingNote" : "authoredEasingNote"];
  $("#dialogUsage").textContent = item.usages.map(value => localUsage(value)).join(state.language === "en" ? ", " : "・");
  $("#dialogFeeling").textContent = item.feelings.map(value => localFeeling(value)).join(state.language === "en" ? ", " : "・");
  $("#dialogTrigger").textContent = language === "en" ? item.triggerEn : item.trigger;
  $("#dialogReduced").textContent = language === "en" ? item.reducedEn : item.reduced;
  const inputs = language === "en" ? item.inputsEn : item.inputs;
  $("#implementationBadges").innerHTML = [
    ...item.tech.map(value => `<span class="tech-badge">${escapeHTML(value)}</span>`),
    `<span class="cost-badge">${escapeHTML(language === "en" ? item.costEn : item.cost)}</span>`,
    ...inputs.map(value => `<span class="input-badge">${escapeHTML(value)}</span>`),
    ...(item.sourceLabel ? [`<span class="source-badge">${escapeHTML(language === "en" ? item.sourceLabelEn : item.sourceLabel)}</span>`] : []),
    ...(item.hapticCue ? [`<span class="haptic-badge">${escapeHTML(language === "en" ? item.hapticCueEn : item.hapticCue)}</span>`] : [])
  ].join("");
  $("#curveLabel").textContent = `(${item.easing})`;
  $("#dialogTips").innerHTML = (language === "en" ? item.tipsEn : item.tips).map(tip => `<li>${escapeHTML(tip)}</li>`).join("");
  $("#dialogRecipe").textContent = language === "en" ? item.recipeEn || item.recipe : item.recipe;
  $(".recipe-section h3").dataset.i18n = WEB_CATEGORIES.has(item.category) || item.catalogFamily ? "webRecipe" : "recipe";
  $("#interactionToolbar").hidden = !(WEB_CATEGORIES.has(item.category) || item.catalogFamily);
  $("#interactionHint").textContent = interactionHint(item);
  $("#durationLabel").textContent = `${item.duration}ms`;
  updateFavoriteUI();
  updateDialogPosition();
  if (atlas) drawAtlasCurve(atlas, item); else drawCurve(item.curve);
  renderImplementationCode();
  renderComparisonLab(item);
  applyLanguage();
}

// MOTION ATLAS の「数値・キーワード」と出典
function renderAtlasValues(item, atlas) {
  const section = $("#atlasValues");
  if (!section) return;
  const values = !atlas ? [] : isTextItem(item)
    ? (state.language === "en" ? item.valuesEn || item.values : item.values) || []
    : (state.language === "en" ? atlas.vEn || item.valuesEn || atlas.v : atlas.v || item.values) || [];
  const sources = !atlas ? [] : isTextItem(item)
    ? (item.sources || []).map(url => [url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), url])
    : (atlas.s || []).map(key => window.ATLAS.sources[key]).filter(Boolean);
  section.hidden = !values.length && !sources.length;
  $("#valueChips").innerHTML = values.map(value => `<code>${escapeHTML(value)}</code>`).join("");
  $("#atlasSources").innerHTML = sources.length
    ? `<span>${I18N[state.language].sourcesLabel}</span>` + sources.map(([name, url]) => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener">${escapeHTML(name)}</a>`).join("")
    : "";
}

function atlasCurveFn(atlas) {
  const A = window.ATLAS;
  if (typeof atlas.curve === "function") return atlas.curve;
  if (atlas.spring) return x => A.spring(x * 1.6, ...atlas.spring);
  if (atlas.bez) return A.bez(...atlas.bez);
  if (typeof atlas.ease === "string" && A.E[atlas.ease]) return A.E[atlas.ease];
  return null;
}

function atlasCssEasing(atlas, item) {
  const fn = atlasCurveFn(atlas);
  const b = atlas.bez || fn?.b;
  if (b) return `cubic-bezier(${b.join(",")})`;
  if (atlas.spring) {
    const stats = window.ATLAS.springStats(...atlas.spring);
    const duration = Math.max(.2, stats.settle + .05);
    return `linear(${Array.from({ length: 21 }, (_, i) => +window.ATLAS.spring(i / 20 * duration, ...atlas.spring).toFixed(3)).join(", ")})`;
  }
  return cssEasing(item.easing);
}

function drawAtlasCurve(atlas, item) {
  const fn = atlasCurveFn(atlas);
  if (!fn) { drawCurve(item.curve); return; }
  const samples = Array.from({ length: 81 }, (_, i) => fn(i / 80));
  if (samples.some(v => !Number.isFinite(v))) { drawCurve(item.curve); return; }
  const lo = Math.min(0, ...samples), hi = Math.max(1, ...samples);
  const y = v => 118 - (v - lo) / (hi - lo) * 96;
  const d = samples.map((v, i) => `${i ? "L" : "M"}${(38 + i / 80 * 254).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  $("#curveGraph").innerHTML = `
    <line x1="38" y1="${y(0)}" x2="292" y2="${y(0)}" stroke="#cdd2dc" stroke-width="1"/>
    <line x1="38" y1="118" x2="38" y2="18" stroke="#cdd2dc" stroke-width="1"/>
    <line x1="38" y1="${y(1)}" x2="292" y2="${y(1)}" stroke="#d8dbe3" stroke-width="1" stroke-dasharray="4 4"/>
    <text x="26" y="${y(0) + 4}" fill="#8a909c" font-size="9">0</text><text x="26" y="${y(1) + 4}" fill="#8a909c" font-size="9">1</text>
    <text x="35" y="138" fill="#8a909c" font-size="9">0</text><text x="287" y="138" fill="#8a909c" font-size="9">1</text>
    ${Array.from({ length: 13 }, (_, i) => { const x = 38 + fn(i / 12) * 0 + i / 12 * 254; return `<line x1="${x.toFixed(1)}" y1="${y(fn(i / 12)).toFixed(1)}" x2="${x.toFixed(1)}" y2="${y(fn(i / 12)).toFixed(1)}" stroke="#7257ff" stroke-width="5" stroke-linecap="round" opacity=".35"/>`; }).join("")}
    <path id="curvePath" d="${d}" fill="none" stroke="#7257ff" stroke-width="3" stroke-linecap="round"/>
    <circle id="curvePlayhead" cx="38" cy="${y(0)}" r="5" fill="#fff" stroke="#7257ff" stroke-width="3"/>
  `;
  updateCurvePlayhead(0);
}

function interactionHint(item) {
  const text = I18N[state.language];
  if (item.category === "web-scroll") return text.interactionScroll;
  if (item.category === "gesture") return text.interactionDrag;
  if (item.category === "web-interaction") return text.interactionPointer;
  return text.interactionClick;
}

function implementationSnippets(item) {
  const atlas = atlasDemo(item);
  if (atlas && isTextItem(item)) {
    const r = item.recipes || {};
    return { ...r, seek: window.TEXTMOTION.seekSource(atlas), ae: (state.language === "en" ? r.aeEn : r.ae) || r.ae };
  }
  if (atlas) return window.ATLAS.snippets(item, atlas, localTitle(item), state.language, state.language === "en" ? item.descriptionEn : item.description, I18N[state.language].replayLabel);
  return window.MotionExport.snippets(item);
}

function renderImplementationCode() {
  if (!selectedMotion) return;
  const snippets = implementationSnippets(selectedMotion);
  if (snippets[activeCodeTab] == null) activeCodeTab = "seek";
  $("#implementationCode").textContent = snippets[activeCodeTab] || "";
  $(".code-preview")?.classList.toggle("is-steps", activeCodeTab === "ae");
  const note = $(".code-note");
  if (note) note.textContent = isTextItem(selectedMotion)
    ? (state.language === "en"
      ? (activeCodeTab === "seek" ? "seek(t) is this exact demo: a function of time t and the text o.text. The other tabs are working implementations for each tool." : activeCodeTab === "ae" ? "After Effects steps." : "A working implementation of this text motion. Split text keeps a readable copy for screen readers.")
      : (activeCodeTab === "seek" ? "seek(t) はこのデモそのもの（時間 t と文字 o.text だけで 1 コマが決まる関数）です。ほかのタブは各ツールでの作り方です。" : activeCodeTab === "ae" ? "After Effects の手順です。" : "このテキストモーションの実装例です。分割した文字は、読み上げ用の元の文字と分けています。"))
    : I18N[state.language].codeNote;
  $$("[data-code-tab]").forEach(button => {
    const active = button.dataset.codeTab === activeCodeTab;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function toggleInteractiveMode() {
  if (!selectedMotion || !(WEB_CATEGORIES.has(selectedMotion.category) || selectedMotion.catalogFamily)) return;
  if (interactionMode) {
    stopInteractiveMode();
    startDialogAnimation(0);
    return;
  }
  interactionMode = true;
  cancelDialogAnimation();
  const button = $("#interactionModeButton");
  button.classList.add("active");
  button.setAttribute("aria-pressed", "true");
  button.textContent = I18N[state.language].stopInteraction;
  const stage = $("#dialogStage .motion-stage");
  stage.classList.add("is-interactive");
  dialogAnimations = buildAnimations(stage, selectedMotion, false, 1, 0);
  dialogAnimations.forEach(animation => animation.pause());
  let progress = 0;
  let startX = 0;
  let startY = 0;
  let startProgress = 0;
  let dragging = false;
  const setProgress = value => {
    progress = Math.max(0, Math.min(1, value));
    dialogAnimations.forEach(animation => { if (!animation.effect.target.closest(".baseline-pane")) animation.currentTime = selectedMotion.duration * progress; });
    updateTimelineReadout(selectedMotion.duration * progress);
  };
  const onWheel = event => {
    event.preventDefault();
    setProgress(progress + event.deltaY / 520);
  };
  const onPointerDown = event => {
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startProgress = progress;
    stage.setPointerCapture?.(event.pointerId);
  };
  const onPointerMove = event => {
    if (dragging) {
      const delta = selectedMotion.category === "web-scroll" || ["bottomSheetDrag", "pullToRefresh", "reorderDrag"].includes(selectedMotion.pattern)
        ? event.clientY - startY
        : event.clientX - startX;
      setProgress(startProgress + delta / 220);
    } else if (selectedMotion.category === "web-interaction") {
      const rect = stage.getBoundingClientRect();
      setProgress((event.clientX - rect.left) / rect.width);
    }
  };
  const onPointerUp = event => {
    dragging = false;
    stage.releasePointerCapture?.(event.pointerId);
  };
  const onClick = () => {
    if (["web-scroll", "gesture", "web-interaction"].includes(selectedMotion.category)) return;
    setProgress(progress > .5 ? 0 : 1);
  };
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", onPointerUp);
  stage.addEventListener("pointercancel", onPointerUp);
  stage.addEventListener("click", onClick);
  interactionCleanup = () => {
    stage.removeEventListener("wheel", onWheel);
    stage.removeEventListener("pointerdown", onPointerDown);
    stage.removeEventListener("pointermove", onPointerMove);
    stage.removeEventListener("pointerup", onPointerUp);
    stage.removeEventListener("pointercancel", onPointerUp);
    stage.removeEventListener("click", onClick);
    stage.classList.remove("is-interactive");
  };
  setProgress(0);
}

function stopInteractiveMode(cancelAnimations = true) {
  interactionCleanup?.();
  interactionCleanup = null;
  interactionMode = false;
  const button = $("#interactionModeButton");
  if (button) {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
    button.textContent = I18N[state.language].tryInteraction;
  }
  if (cancelAnimations) cancelDialogAnimation();
}

function renderComparisonLab(item) {
  const related = motions.filter(entry => entry.category === item.category);
  $("#comparisonMotion").innerHTML = related.map(entry => `<option value="${entry.id}"${entry.id === item.id ? " selected" : ""}>${escapeHTML(localTitle(entry))}</option>`).join("");
  $("#tuneDuration").max = String(Math.max(8000, item.duration * 2));
  $("#tuneDuration").value = String(Math.max(200, item.duration));
  $("#tuneAmplitude").value = "100";
  $("#tuneStagger").value = "0";
  const easeOption = [...$("#tuneEasing").options].find(option => option.value === item.easing);
  $("#tuneEasing").value = easeOption ? item.easing : "easeOutCubic";
  updateTuningReadouts();
  playComparison();
}

function updateTuningReadouts() {
  $("#tuneDurationValue").textContent = `${$("#tuneDuration").value}ms`;
  $("#tuneAmplitudeValue").textContent = `${$("#tuneAmplitude").value}%`;
  $("#tuneStaggerValue").textContent = `${$("#tuneStagger").value}ms`;
}

function playComparison() {
  if (!selectedMotion) return;
  comparisonAnimations.forEach(animation => animation.cancel());
  comparisonAnimations = [];
  const comparison = motions.find(item => item.id === $("#comparisonMotion").value) || selectedMotion;
  $("#comparisonStageA").innerHTML = stageMarkup(selectedMotion, true);
  $("#comparisonStageB").innerHTML = stageMarkup(comparison, true);
  observeLegacyCanvases($(".comparison-stages"));
  const stageA = $("#comparisonStageA .motion-stage");
  const stageB = $("#comparisonStageB .motion-stage");
  comparisonAnimations.push(...buildAnimations(stageA, selectedMotion, true, 1));
  comparisonAnimations.push(...buildAnimations(stageB, comparison, true, 1, 0, {
    duration: Number($("#tuneDuration").value),
    amplitude: Number($("#tuneAmplitude").value) / 100,
    stagger: Number($("#tuneStagger").value),
    easing: $("#tuneEasing").value
  }));
}

function startDialogAnimation(progress = 0) {
  cancelDialogAnimation();
  if (!selectedMotion) return;
  const stage = $("#dialogStage .motion-stage");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  dialogAnimations = buildAnimations(stage, selectedMotion, reduced ? false : dialogLoop, dialogSpeed, reduced ? 1 : progress);
  dialogPlaying = !reduced;
  if (reduced) dialogAnimations.forEach(animation => animation.pause());
  $("#playPauseButton").classList.toggle("is-paused", reduced);
  $("#playPauseButton").setAttribute("aria-label", I18N[state.language][reduced ? "playLabel" : "pauseLabel"]);
  if (reduced) updateTimelineReadout(selectedMotion.duration);
  updateTimelineLoop();
}

function cancelDialogAnimation() {
  cancelAnimationFrame(timelineFrame);
  dialogAnimations.forEach(animation => animation.cancel());
  dialogAnimations = [];
}

function restartDialog() {
  startDialogAnimation(0);
  $("#timeline").value = "0";
}

function toggleDialogPlayback() {
  if (!dialogAnimations.length) return;
  dialogPlaying = !dialogPlaying;
  dialogAnimations.forEach(animation => {
    if (animation.effect.target.closest(".baseline-pane")) return;
    dialogPlaying ? animation.play() : animation.pause();
  });
  $("#playPauseButton").classList.toggle("is-paused", !dialogPlaying);
  $("#playPauseButton").setAttribute("aria-label", I18N[state.language][dialogPlaying ? "pauseLabel" : "playLabel"]);
  if (dialogPlaying) updateTimelineLoop();
}

function stepDialog(direction) {
  if (!selectedMotion || !dialogAnimations.length) return;
  dialogPlaying = false;
  dialogAnimations.forEach(animation => animation.pause());
  $("#playPauseButton").classList.add("is-paused");
  $("#playPauseButton").setAttribute("aria-label", I18N[state.language].playLabel);
  const time = Math.max(0, Math.min(selectedMotion.duration, currentDialogTime() + direction * (1000 / 30)));
  dialogAnimations.forEach(animation => {
    if (!animation.effect.target.closest(".baseline-pane")) animation.currentTime = dialogLoop ? Math.min(selectedMotion.duration - .001, time) : time;
  });
  updateTimelineReadout(time);
}

function seekDialog(progress) {
  if (!selectedMotion || !dialogAnimations.length) return;
  dialogPlaying = false;
  dialogAnimations.forEach(animation => {
    animation.pause();
    if (animation.effect.target.closest(".baseline-pane")) return;
    animation.currentTime = dialogLoop ? Math.min(selectedMotion.duration - .001, selectedMotion.duration * progress) : selectedMotion.duration * progress;
  });
  $("#playPauseButton").classList.add("is-paused");
  $("#playPauseButton").setAttribute("aria-label", I18N[state.language].playLabel);
  updateTimelineReadout(selectedMotion.duration * progress);
}

function currentDialogTime() {
  if (!dialogAnimations.length || !selectedMotion) return 0;
  const active = dialogAnimations.find(animation => !animation.effect.target.closest(".baseline-pane")) || dialogAnimations[0];
  const raw = Number(active.currentTime) || 0;
  return dialogLoop ? raw % selectedMotion.duration : Math.min(raw, selectedMotion.duration);
}

function currentDialogProgress() {
  return selectedMotion ? currentDialogTime() / selectedMotion.duration : 0;
}

function updateTimelineLoop() {
  cancelAnimationFrame(timelineFrame);
  const tick = () => {
    if (!$("#detailDialog").open || !selectedMotion || !dialogAnimations.length) return;
    updateTimelineReadout(currentDialogTime());
    if (dialogPlaying) timelineFrame = requestAnimationFrame(tick);
  };
  timelineFrame = requestAnimationFrame(tick);
}

function updateTimelineReadout(time) {
  const safeTime = Math.round(Math.max(0, Math.min(selectedMotion.duration, time)));
  $("#timeline").value = String(Math.round((safeTime / selectedMotion.duration) * 1000));
  $("#timeReadout").textContent = `${safeTime}ms / ${selectedMotion.duration}ms`;
  updateCurvePlayhead(safeTime / selectedMotion.duration);
}

function closeDialog() {
  if (!$("#detailDialog").open) return;
  stopInteractiveMode();
  cancelDialogAnimation();
  comparisonAnimations.forEach(animation => animation.cancel());
  comparisonAnimations = [];
  onionAnimations.forEach(animation => animation.cancel());
  onionAnimations = [];
  $$("#dialogStage .onion-layer").forEach(layer => layer.remove());
  $("#detailDialog").close();
  selectedMotion = null;
  replayVisibleStages();
  history.replaceState(null, "", location.pathname + location.search);
}

function openFromHash() {
  const params = new URLSearchParams(location.hash.replace(/^#/, ""));
  if (params.get("guide") && (window.TEXT_GUIDES || []).some(g => g.id === params.get("guide"))) { state.view = "textGuides"; textState.guide = params.get("guide"); render(); return; }
  let id = params.get("motion");
  if (id && window.MOTION_ALIASES?.[id]) id = window.MOTION_ALIASES[id];
  if (id && motions.some(item => item.id === id) && !$("#detailDialog").open) openDialog(id);
}

function drawCurve(type) {
  const paths = {
    linear: "M38 118 L292 22",
    in: "M38 118 C120 118 188 112 292 22",
    out: "M38 118 C92 28 150 22 292 22",
    inOut: "M38 118 C112 118 115 22 292 22",
    outBack: "M38 118 C92 28 134 0 190 13 C236 24 250 22 292 22",
    inBack: "M38 118 C62 126 86 134 110 117 C162 81 213 42 292 22",
    inOutBack: "M38 118 C74 127 95 128 121 100 C176 42 214 7 292 22",
    elastic: "M38 118 C78 28 108 4 137 20 C160 34 175 2 197 18 C218 32 234 12 250 22 C269 28 278 19 292 22",
    spring: "M38 118 C82 22 120 1 157 21 C188 38 210 8 235 22 C254 30 270 17 292 22",
    bounce: "M38 118 C86 15 117 18 143 114 C161 53 183 52 201 114 C216 75 231 74 244 114 C256 91 271 91 292 22",
    standard: "M38 118 C94 110 130 42 292 22"
  };
  $("#curveGraph").innerHTML = `
    <line x1="38" y1="118" x2="292" y2="118" stroke="#cdd2dc" stroke-width="1"/>
    <line x1="38" y1="118" x2="38" y2="18" stroke="#cdd2dc" stroke-width="1"/>
    <line x1="38" y1="22" x2="292" y2="22" stroke="#d8dbe3" stroke-width="1" stroke-dasharray="4 4"/>
    <text x="26" y="122" fill="#8a909c" font-size="9">0</text><text x="24" y="26" fill="#8a909c" font-size="9">1</text>
    <text x="35" y="138" fill="#8a909c" font-size="9">0</text><text x="287" y="138" fill="#8a909c" font-size="9">1</text>
    <path id="curvePath" d="${paths[type] || paths.standard}" fill="none" stroke="#7257ff" stroke-width="3" stroke-linecap="round"/>
    <circle id="curvePlayhead" cx="38" cy="118" r="5" fill="#fff" stroke="#7257ff" stroke-width="3"/>
  `;
  updateCurvePlayhead(0);
}

function updateCurvePlayhead(progress) {
  const path = $("#curvePath");
  const playhead = $("#curvePlayhead");
  if (!path || !playhead || typeof path.getTotalLength !== "function") return;
  const length = path.getTotalLength();
  const point = path.getPointAtLength(Math.max(0, Math.min(1, progress)) * length);
  playhead.setAttribute("cx", String(point.x));
  playhead.setAttribute("cy", String(point.y));
}

function toggleFavorite(id) {
  const added = !state.favorites.has(id);
  if (added) state.favorites.add(id);
  else state.favorites.delete(id);
  localStorage.setItem("motion-reference-favorites", JSON.stringify([...state.favorites]));
  renderNavigation();
  if (selectedMotion?.id === id) updateFavoriteUI();
  $all(`[data-favorite-id="${CSS.escape(id)}"]`).forEach(button => {
    button.classList.toggle("active", added);
    button.setAttribute("aria-label", added ? I18N[state.language].favoriteRemoveLabel : I18N[state.language].favoriteSaveLabel);
  });
  if (state.view === "favorites" && !selectedMotion) render();
  showToast(added ? I18N[state.language].favoriteAdded : I18N[state.language].favoriteRemoved);
}

function updateFavoriteUI() {
  if (!selectedMotion) return;
  const active = state.favorites.has(selectedMotion.id);
  $("#favoriteButton").classList.toggle("active", active);
  $("#favoriteButton span").textContent = active ? I18N[state.language].savedFavorite : I18N[state.language].saveFavorite;
}

function updateDialogSpeedButtons() {
  $$("[data-dialog-speed]").forEach(button => button.classList.toggle("active", Number(button.dataset.dialogSpeed) === dialogSpeed));
}

function copyCurrentLink() {
  if (!selectedMotion) return;
  copyText(`${location.origin}${location.pathname}#motion=${selectedMotion.id}`);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  showToast(I18N[state.language].copied);
}

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  toastTimer = window.setTimeout(() => $("#toast").classList.remove("show"), 1700);
}

function resetFilters() {
  state.feeling = "all";
  state.usage = "all";
  state.query = "";
  state.view = "home";
  state.category = "all";
  state.visibleLimit = 120;
  $("#searchInput").value = "";
  renderFilters();
  render();
}

function applyLanguage() {
  const text = I18N[state.language];
  document.documentElement.lang = state.language;
  window.ATLAS?.setLanguage(state.language);
  window.TEXTMOTION?.setLanguage(state.language);
  window.TEXTMOTION?.setOptions({ lang: textState.text ? state.language : (textState.sampleLang || state.language) });
  document.title = text.pageTitle;
  $$("[data-language]").forEach(button => button.classList.toggle("active", button.dataset.language === state.language));
  $$("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (text[key]) element.textContent = text[key];
  });
  $("#searchInput").placeholder = text.searchPlaceholder;
  $$("[data-i18n-title]").forEach(element => { if (text[element.dataset.i18nTitle]) element.title = text[element.dataset.i18nTitle]; });
  $$("[data-i18n-aria]").forEach(element => { if (text[element.dataset.i18nAria]) element.setAttribute("aria-label", text[element.dataset.i18nAria]); });
  $("#menuButton").setAttribute("aria-label", $("#sidebar").classList.contains("open") ? text.menuCloseLabel : text.menuOpenLabel);
  $("#sidebarScrim").setAttribute("aria-label", text.menuCloseLabel);
  $("#dialogClose").setAttribute("aria-label", text.closeLabel);
  $("#restartButton").setAttribute("aria-label", text.replayLabel);
  $("#previousFrame").setAttribute("aria-label", text.previousFrameLabel);
  $("#nextFrame").setAttribute("aria-label", text.nextFrameLabel);
  $("#playPauseButton").setAttribute("aria-label", text[dialogPlaying ? "pauseLabel" : "playLabel"]);
  $("[data-loop]").setAttribute("aria-label", text.loopLabel);
  $("#timeline").setAttribute("aria-label", text.timelineLabel);
  $("#copyRecipe").setAttribute("aria-label", text.copyRecipeLabel);
  $("#previewControl").setAttribute("aria-label", text.previewGroupLabel);
  $("#dialogPreviewControl").setAttribute("aria-label", text.previewGroupLabel);
  $("#speedControl").setAttribute("aria-label", text.speedGroupLabel);
  $("#playbackModeControl").setAttribute("aria-label", text.playbackModeGroupLabel);
  $(".density-switch").setAttribute("aria-label", text.densityGroupLabel);
  if (selectedMotion) {
    $("#interactionHint").textContent = interactionHint(selectedMotion);
    $("#interactionModeButton").textContent = text[interactionMode ? "stopInteraction" : "tryInteraction"];
  }
  const densityButtons = $$("[data-density]");
  densityButtons[0]?.setAttribute("title", text.standardGridLabel);
  densityButtons[0]?.setAttribute("aria-label", text.standardGridLabel);
  densityButtons[1]?.setAttribute("title", text.compactGridLabel);
  densityButtons[1]?.setAttribute("aria-label", text.compactGridLabel);
  updateLoopStatus();
  updateViewHeader();
}

function updateLoopStatus() {
  const element = $("#loopStatus");
  if (!element) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const key = reduced ? "reducedMotion" : state.playbackMode === "paused" ? "pausedLoop" : state.playbackMode === "solo" ? "soloLoop" : "autoLoop";
  element.textContent = I18N[state.language][key];
  element.classList.toggle("is-reduced", reduced || state.playbackMode === "paused");
}

function updateViewHeader() {
  const text = I18N[state.language];
  const category = categories.find(item => item.id === state.category);
  if (state.view === "textGuides") {
    $("#viewTitle").textContent = text.textGuides;
    $("#viewDescription").textContent = text.textGuidesDescription;
  } else if (state.view === "favorites") {
    $("#viewTitle").textContent = text.favoriteTitle;
    $("#viewDescription").textContent = text.favoriteDescription;
  } else if (state.view === "category" && category) {
    const label = state.language === "en" ? category.labelEn : category.label;
    $("#viewTitle").textContent = label;
    $("#viewDescription").textContent = category.description
      ? (state.language === "en" ? category.descriptionEn : category.description)
      : state.language === "en" ? `Compare ${label.toLowerCase()}${text.categorySuffix}` : `${label}${text.categorySuffix}`;
  } else if (state.view === "all") {
    $("#viewTitle").textContent = text.allTitle;
    $("#viewDescription").textContent = text.allDescription;
  } else {
    $("#viewTitle").textContent = text.homeTitle;
    $("#viewDescription").textContent = text.homeDescription;
  }
}

function updateActiveNavigation() {
  $$("[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === state.view));
  $$("[data-category]").forEach(button => button.classList.toggle("active", state.view === "category" && button.dataset.category === state.category));
}

function resultTitle() {
  const text = I18N[state.language];
  if (state.view === "favorites") return text.favoriteTitle;
  if (state.view === "category") {
    const category = categories.find(item => item.id === state.category);
    return state.language === "en" ? category?.labelEn : category?.label;
  }
  return text.allMotions;
}

function localTitle(item) { return state.language === "en" ? item.titleEn : item.title; }
function localFeeling(value) { return FEELINGS.find(item => item.id === value)?.[state.language] || value; }
function localUsage(value) { return USAGES.find(item => item.id === value)?.[state.language] || value; }

function playCardMotion(id) {
  const item = motions.find(entry => entry.id === id);
  const stages = $$(`.motion-card .motion-stage[data-stage-id="${CSS.escape(id)}"]`);
  if (state.playbackMode === "solo") cardAnimations.forEach(animations => animations.forEach(animation => animation.pause()));
  const loop = state.playbackMode !== "paused";
  stages.forEach(stage => playStage(stage, item, loop, true));
}

function replayVisibleStages() {
  if (state.playbackMode !== "loop" || selectedMotion || document.hidden) {
    cardAnimations.forEach(animations => animations.forEach(animation => animation.pause()));
    return;
  }
  $$(".motion-card .motion-stage[data-stage-id]").forEach(stage => {
    const rect = stage.getBoundingClientRect();
    if (rect.bottom < -100 || rect.top > innerHeight + 100) return;
    const item = motions.find(entry => entry.id === stage.dataset.stageId);
    playStage(stage, item, true);
  });
}

function destroyCardAnimations() {
  cardObserver?.disconnect();
  cardObserver = null;
  cardAnimations.forEach(animations => animations.forEach(animation => animation.cancel()));
  cardAnimations.clear();
  $$(".motion-card").forEach(card => card.classList.remove("is-looping", "is-playing"));
}

function toggleSidebar() {
  const open = !$("#sidebar").classList.contains("open");
  $("#sidebar").classList.toggle("open", open);
  $("#sidebarScrim").classList.toggle("show", open);
  $("#menuButton").setAttribute("aria-expanded", String(open));
  $("#menuButton").setAttribute("aria-label", I18N[state.language][open ? "menuCloseLabel" : "menuOpenLabel"]);
}

function closeSidebar() {
  $("#sidebar").classList.remove("open");
  $("#sidebarScrim").classList.remove("show");
  $("#menuButton").setAttribute("aria-expanded", "false");
  $("#menuButton").setAttribute("aria-label", I18N[state.language].menuOpenLabel);
}

function categoryIcon(type) {
  const paths = {
    frame: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 2v4M16 18v4M2 8h4M18 16h4"/>',
    arrow: '<path d="M4 12h15M14 7l5 5-5 5"/>',
    expand: '<path d="M8 3H3v5M16 21h5v-5M3 8l6-6M21 16l-6 6"/>',
    rotate: '<path d="M19 8V3l-2 2a8 8 0 1 0 2.3 8"/>',
    wave: '<path d="M3 15c2-8 4-8 6 0s4 8 6 0 4-8 6 0"/>',
    text: '<path d="M5 5h14M12 5v14M8 19h8"/>',
    grid: '<rect x="3" y="4" width="7" height="6" rx="1"/><rect x="14" y="4" width="7" height="6" rx="1"/><rect x="3" y="14" width="7" height="6" rx="1"/><rect x="14" y="14" width="7" height="6" rx="1"/>',
    focus: '<circle cx="12" cy="12" r="3"/><path d="M9 3H4v5M15 3h5v5M9 21H4v-5M15 21h5v-5"/>',
    light: '<path d="M9 18h6M10 21h4M8.5 14.5A6 6 0 1 1 15.5 14.5L14 16H10z"/><path d="M12 1v2M3.5 4.5 5 6M20.5 4.5 19 6"/>',
    fx: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z"/>',
    scroll: '<path d="M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"/><path d="m9 9 3-3 3 3M9 15l3 3 3-3"/>',
    pointer: '<path d="m5 3 13 9-6 1-3 6z"/><path d="m13 13 5 5"/>',
    layout: '<rect x="3" y="4" width="8" height="7" rx="1"/><rect x="13" y="4" width="8" height="16" rx="1"/><rect x="3" y="13" width="8" height="7" rx="1"/>',
    data: '<path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/><path d="M2 19h21"/>',
    form: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5M8 16h3"/><path d="m15 16 1.5 1.5L20 14"/>',
    gesture: '<path d="M8 12V7a2 2 0 0 1 4 0v4-2a2 2 0 0 1 4 0v3-1a2 2 0 0 1 4 0v4c0 4-3 6-7 6h-1c-3 0-5-2-7-5l-2-3a2 2 0 0 1 3-2z"/>',
    path: '<path d="M4 17C7 5 17 5 20 17"/><circle cx="4" cy="17" r="2"/><circle cx="20" cy="17" r="2"/><path d="M8 9h8"/>',
    guide: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7M8 11h5"/>',
    "tx-reveal": '<path d="M4 18h16M7 14l5-8 5 8"/>', "tx-exit": '<path d="M4 6h16M7 10l5 8 5-8"/>', "tx-emphasis": '<path d="M5 19h14"/><path d="M8 15 12 4l4 11M9.5 11h5"/>',
    "tx-swap": '<path d="M4 8h13l-3-3M20 16H7l3 3"/>', "tx-typing": '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M8 14h8"/>',
    "tx-physics": '<circle cx="12" cy="7" r="3"/><path d="M5 20h14M12 10v6"/>', "tx-path": '<path d="M4 17C7 5 17 5 20 17"/><circle cx="4" cy="17" r="2"/><circle cx="20" cy="17" r="2"/>',
    "tx-mask": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 14h16"/>', "tx-color-light": '<path d="M9 18h6M10 21h4M8.5 14.5A6 6 0 1 1 15.5 14.5L14 16H10z"/>',
    "tx-blur": '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7" stroke-dasharray="2 3"/>', "tx-glitch": '<path d="M4 7h10M8 12h12M4 17h9"/>',
    "tx-depth": '<path d="M12 3 3 8l9 5 9-5zM3 16l9 5 9-5"/>', "tx-variable": '<path d="M5 19 9 5h2l4 14M6.5 14h7"/><path d="M18 5v14"/>',
    "tx-scroll": '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 7v4"/>', "tx-pointer": '<path d="m5 3 13 9-6 1-3 6z"/>',
    "tx-counter": '<path d="M4 6h4v12M14 6h5l-5 12M14 12h6"/>', "tx-caption": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h4M13 15h4"/>',
    "tx-layout": '<path d="M4 6h16M4 12h10M4 18h13"/>', "tx-loop": '<path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
    "tx-japanese": '<path d="M5 6h14M12 3v18M7 10c0 6 3 8 10 8"/>', "tx-title": '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 9h18M3 15h18M8 12h8"/>',
    "tx-broadcast": '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="m8 3 4 4 4-4M6 15h12"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[type] || paths.arrow}</svg>`;
}

function clockIcon() { return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'; }
function starIcon() { return '<svg viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/></svg>'; }
function replayIcon() { return '<svg viewBox="0 0 24 24"><path d="M4 4v6h6M5 9a8 8 0 1 1-1 5"/></svg>'; }

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function $all(selector) { return [...document.querySelectorAll(selector)]; }


// ---------- テキストモーション：試す文字・手法ガイド ----------
function updateTextControls() {
  const text = I18N[state.language];
  const showRow = state.view !== "category" || String(state.category).startsWith("tx-") || !state.category || state.category === "all";
  $("#tryTextRow").hidden = !showRow;
  $("#textClear").hidden = !textState.text;
  $$("[data-text-font]").forEach(button => button.classList.toggle("active", button.dataset.textFont === textState.font));
  const sample = textState.sampleLang || state.language;
  $$("[data-text-sample]").forEach(button => { button.classList.toggle("active", button.dataset.textSample === sample); button.disabled = Boolean(textState.text); });
  $("#textInput").placeholder = text.tryTextPlaceholder;
  $("#dialogTextInput").placeholder = text.dialogTextPlaceholder;
}
function setTryText(value) {
  textState.text = value;
  try { localStorage.setItem("motion-reference-text", value); } catch {}
  if ($("#textInput").value !== value) $("#textInput").value = value;
  if ($("#dialogTextInput").value !== value) $("#dialogTextInput").value = value;
  syncTextEngine();
  updateTextControls();
}
(() => {
  $("#textInput").value = textState.text;
  $("#dialogTextInput").value = textState.text;
  // 変換中は描き直さず、確定してから反映する
  const bind = input => {
    let composing = false;
    input.addEventListener("compositionstart", () => { composing = true; });
    input.addEventListener("compositionend", () => { composing = false; setTryText(input.value); });
    input.addEventListener("input", () => { if (!composing) setTryText(input.value); });
  };
  bind($("#textInput"));
  bind($("#dialogTextInput"));
  $("#textClear").addEventListener("click", () => setTryText(""));
  syncTextEngine();
  updateTextControls();
})();

function guideInline(value) { return escapeHTML(value).replace(/`([^`]+)`/g, "<code>$1</code>"); }
function guideBlock(block) {
  if (block.p != null) return `<p>${guideInline(block.p)}</p>`;
  if (block.list) return `<ul>${block.list.map(item => `<li>${guideInline(item)}</li>`).join("")}</ul>`;
  if (block.code != null) return `<pre class="guide-code" data-lang="${escapeHTML(block.lang || "")}"><code>${escapeHTML(block.code)}</code></pre>`;
  if (block.table) return `<div class="guide-table"><table><thead><tr>${block.table.head.map(cell => `<th>${guideInline(cell)}</th>`).join("")}</tr></thead><tbody>${block.table.rows.map(row => `<tr>${row.map(cell => `<td>${guideInline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  if (block.note != null) return `<p class="guide-note">${guideInline(block.note)}</p>`;
  return "";
}
function guideMarkdown(md) {
  const lines = md.split("\n"); let html = "", list = null, table = null, code = null;
  const inline = value => escapeHTML(value).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/(^|[\s(（])(https?:\/\/[^\s)）<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
  const flushList = () => { if (list) { html += `<${list.tag}>${list.items.map(item => `<li>${inline(item)}</li>`).join("")}</${list.tag}>`; list = null; } };
  const flushTable = () => { if (table) { const [head, , ...rows] = table; html += `<div class="guide-table"><table><thead><tr>${head.map(cell => `<th>${inline(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`; table = null; } };
  for (const line of lines) {
    if (code !== null) { if (/^```/.test(line)) { html += `<pre class="guide-code"><code>${escapeHTML(code)}</code></pre>`; code = null; } else code += line + "\n"; continue; }
    if (/^```/.test(line)) { flushList(); flushTable(); code = ""; continue; }
    if (/^\|/.test(line)) { flushList(); (table ||= []).push(line.replace(/^\||\|$/g, "").split("|").map(cell => cell.trim())); continue; } else flushTable();
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) { flushList(); const level = Math.min(4, heading[1].length + 1); html += `<h${level}>${inline(heading[2])}</h${level}>`; continue; }
    const item = /^\s*(?:[-*]|(\d+)\.)\s+(.*)$/.exec(line);
    if (item) { const tag = item[1] ? "ol" : "ul"; if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] }; } list.items.push(item[2]); continue; }
    if (!line.trim()) { flushList(); continue; }
    flushList(); html += `<p>${inline(line)}</p>`;
  }
  flushList(); flushTable();
  return html;
}
function renderTextGuides() {
  const text = I18N[state.language], en = state.language === "en";
  const guides = window.TEXT_GUIDES || [];
  const host = $("#textGuidesView");
  const guide = guides.find(entry => entry.id === textState.guide);
  if (!guide) {
    host.innerHTML = `<section class="doc-grid">${guides.map(entry => `<a class="guide-card" href="#guide=${entry.id}" data-text-guide="${entry.id}">
      <h2>${escapeHTML(en ? entry.titleEn : entry.title)}</h2><p>${escapeHTML(en ? entry.leadEn : entry.lead)}</p>
      <small>${entry.sections.length} ${en ? "sections" : "セクション"} · ${(entry.related || []).length} ${en ? "linked items" : "項目"}</small></a>`).join("")}</section>
      <section class="doc-section"><h2>${text.researchReports}</h2><p class="doc-lead">${text.researchNote}</p>
      ${(window.TEXT_RESEARCH || []).map(report => { const title = (report.markdown.match(/^#\s+(.+)$/m) || [, report.id])[1]; return `<div class="report-row"><strong>${escapeHTML(title)}</strong><button class="copy-text-button" data-report="${report.id}">${text.openReport}</button></div><article class="report-body" id="report-${report.id}" hidden>${guideMarkdown(report.markdown)}</article>`; }).join("")}</section>`;
    host.querySelectorAll("[data-report]").forEach(button => button.addEventListener("click", () => { const box = $(`#report-${button.dataset.report}`); box.hidden = !box.hidden; button.textContent = box.hidden ? text.openReport : text.closeReport; }));
    return;
  }
  const related = (guide.related || []).map(id => motions.find(item => item.id === `tx-${id}`)).filter(Boolean);
  host.innerHTML = `<article class="guide-article">
    <a class="guide-back" href="#" data-text-guide="">${text.guideBack}</a>
    <header class="guide-head"><div><h1>${escapeHTML(en ? guide.titleEn : guide.title)}</h1><p>${escapeHTML(en ? guide.leadEn : guide.lead)}</p></div></header>
    <div class="guide-layout">
      <nav class="guide-toc" aria-label="${text.guideSections}"><strong>${text.guideSections}</strong>${guide.sections.map((section, i) => `<a href="#" data-guide-section="${i}">${escapeHTML(en ? section.hEn : section.h)}</a>`).join("")}</nav>
      <div class="guide-body">
        ${guide.sections.map((section, i) => `<section class="guide-section" id="guide-sec-${i}"><h2>${escapeHTML(en ? section.hEn : section.h)}</h2>${(en ? section.bodyEn : section.body).map(guideBlock).join("")}</section>`).join("")}
        ${related.length ? `<section class="guide-section"><h2>${text.guideRelated}</h2><div class="motion-grid guide-related">${related.map(motionCard).join("")}</div></section>` : ""}
        ${(guide.sources || []).length ? `<section class="guide-section"><h2>${text.guideSources}</h2><ul class="guide-sources">${guide.sources.map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener">${escapeHTML(source.title)}</a></li>`).join("")}</ul></section>` : ""}
      </div>
    </div></article>`;
  host.querySelectorAll("[data-guide-section]").forEach(link => link.addEventListener("click", event => { event.preventDefault(); $(`#guide-sec-${link.dataset.guideSection}`)?.scrollIntoView({ behavior: "smooth" }); }));
  bindRenderedCardPlayback();
}
