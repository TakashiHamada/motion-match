const motion = (id, category, title, titleEn, pattern, duration, easing, feelings, usages, description, descriptionEn, options = {}) => ({
  id, category, title, titleEn, pattern, duration, easing, feelings, usages,
  description, descriptionEn,
  accent: options.accent || "purple",
  featured: Boolean(options.featured),
  focus: options.focus || "",
  focusEn: options.focusEn || "",
  caution: options.caution || "",
  cautionEn: options.cautionEn || "",
  tips: options.tips || [
    "主動作と余韻の時間差をはっきりつける",
    "移動量に合わせて反動の強さを調整する",
    "小さい画面では動きを少し控えめにする"
  ],
  tipsEn: options.tipsEn || [
    "Separate the main action and its settle in time",
    "Tune the reaction to match the travel distance",
    "Reduce the motion slightly on smaller screens"
  ],
  recipe: options.recipe || `0ms  0% / ${Math.round(duration * .72)}ms  100% / ${duration}ms  100%`,
  curve: options.curve || "standard",
  trigger: options.trigger || (category === "web-scroll" ? "スクロール" : category === "gesture" ? "タッチ・ドラッグ" : "時間・状態変化"),
  triggerEn: options.triggerEn || (category === "web-scroll" ? "Scroll" : category === "gesture" ? "Touch or drag" : "Time or state change"),
  tech: options.tech || ["CSS", "WAAPI"],
  cost: options.cost || "軽い",
  costEn: options.costEn || "Light",
  inputs: options.inputs || (category === "gesture" ? ["タッチ", "マウス"] : ["自動"]),
  inputsEn: options.inputsEn || (category === "gesture" ? ["Touch", "Pointer"] : ["Automatic"]),
  reduced: options.reduced || "移動を省き、最終状態をフェードで表示する",
  reducedEn: options.reducedEn || "Remove travel and reveal the final state with a fade",
  code: options.code || {}
});

const REFERENCE_TIPS = {
  entrance: {
    ja: ["出現方向と退場方向に意味を持たせる", "表示後の静止状態を最初に設計する", "読ませる要素では移動距離を短く保つ"],
    en: ["Give entrance and exit directions a purpose", "Design the final resting state first", "Keep travel short for content that must be read"]
  },
  move: {
    ja: ["始点と終点を先に固定して軌道を決める", "速度変化を距離と重さに合わせる", "移動中も対象を追えるコントラストを保つ"],
    en: ["Fix start and end points before shaping the path", "Match speed changes to distance and weight", "Keep enough contrast to track the moving subject"]
  },
  scale: {
    ja: ["拡縮の基準点を用途に合わせて決める", "輪郭が潰れない最小サイズを確認する", "周囲のレイアウトを動かさず変形する"],
    en: ["Choose the scale origin for the intended meaning", "Check the smallest size that preserves the silhouette", "Transform without reflowing nearby layout"]
  },
  rotate: {
    ja: ["回転軸とアンカーポイントを先に揃える", "停止角度を読みやすい向きへ固定する", "回転数は状態変化に必要な量へ抑える"],
    en: ["Align the rotation axis and anchor first", "Land on a readable final angle", "Use only as many turns as the state change needs"]
  },
  reaction: {
    ja: ["入力や衝撃の直後に反応を開始する", "反動の振幅を段階的に小さくする", "最後は基準位置へ正確に戻す"],
    en: ["Start the reaction immediately after the cause", "Reduce rebound amplitude step by step", "Return exactly to the resting position"]
  },
  text: {
    ja: ["読字順とアニメーション順を一致させる", "表示完了を待たず意味が推測できるようにする", "本文ではなく短い見出しから試す"],
    en: ["Match animation order to reading order", "Let meaning emerge before the animation fully ends", "Start with short headings rather than body copy"]
  },
  collection: {
    ja: ["並び順が伝わる遅延規則を先に決める", "各要素の移動量と停止位置を揃える", "全体の完了を1秒前後に収める"],
    en: ["Choose a delay rule that explains the order", "Keep travel and final alignment consistent", "Finish the whole collection around one second"]
  },
  attention: {
    ja: ["強調対象だけに動きを限定する", "反応後は必ず元の状態へ戻す", "同じ画面で連続使用しすぎない"],
    en: ["Limit motion to the intended target", "Always return to the resting state", "Avoid repeating emphasis across one screen"]
  },
  light: {
    ja: ["発光の中心を対象の輪郭に合わせる", "白飛びする前に強度を止める", "暗い背景と明るい背景の両方で確認する"],
    en: ["Align the glow center with the subject", "Stop intensity before highlights clip", "Check against both dark and light backgrounds"]
  },
  effect: {
    ja: ["効果中も対象の輪郭を見失わせない", "変形と透明度の終了を同じ瞬間に揃える", "短い切替だけに使って情報を待たせない"],
    en: ["Keep the subject silhouette recognizable", "Resolve distortion and opacity together", "Use on short transitions so content is not delayed"]
  },
  "web-scroll": {
    ja: ["スクロール量と進行率の対応を先に決める", "逆スクロールでも自然に戻るか確認する", "大きな移動には代替の縮小動作を用意する"],
    en: ["Map scroll distance to progress before styling", "Check that reverse scrolling also feels natural", "Provide a reduced alternative for large motion"]
  },
  "web-interaction": {
    ja: ["入力した要素の近くで反応を返す", "マウスとタッチの両方を想定する", "操作不能時間を作らない短さに収める"],
    en: ["Return feedback close to the input target", "Design for both pointer and touch input", "Keep feedback short enough to avoid blocking input"]
  },
  "web-layout": {
    ja: ["変更前後で同じ要素を追えるようにする", "位置と大きさの変化を同時に解決する", "フォーカスと読み上げ順はDOM側で保つ"],
    en: ["Keep the same element visually trackable", "Resolve position and size changes together", "Preserve focus and reading order in the DOM"]
  },
  "web-feedback": {
    ja: ["実際の状態と表示の進み方を一致させる", "待ち時間の長さに合う表現を選ぶ", "完了時は明確な静止状態へ切り替える"],
    en: ["Match displayed progress to the real state", "Choose feedback appropriate to the wait length", "Resolve into a clear completed state"]
  },
  "form-state": {
    ja: ["入力内容と表示状態を常に一致させる", "成功・警告・失敗を色だけで伝えない", "フォーカスと読み上げの順序を保つ"],
    en: ["Keep visual state synchronized with input state", "Do not communicate success or errors with color alone", "Preserve focus and reading order"]
  },
  gesture: {
    ja: ["操作中は指やポインタへ遅れず追従させる", "確定前に移動先や結果を予告する", "キーボードで使える代替操作を用意する"],
    en: ["Track the finger or pointer without lag during input", "Preview the destination or outcome before commit", "Provide an equivalent keyboard action"]
  },
  "svg-path": {
    ja: ["パス長と開始位置を揃えてから動かす", "線幅と端点形状を表示サイズに合わせる", "複雑なパスは点数と描画面積を抑える"],
    en: ["Align path length and start position before animation", "Match stroke width and caps to display size", "Limit point count and paint area on complex paths"]
  }
};

const referenceMotion = (id, category, title, titleEn, pattern, duration, easing, feelings, usages, description, descriptionEn, options = {}) => {
  const tips = REFERENCE_TIPS[category];
  return motion(id, category, title, titleEn, pattern, duration, easing, feelings, usages, description, descriptionEn, {
    ...options,
    tips: options.tips || tips.ja,
    tipsEn: options.tipsEn || tips.en
  });
};

window.MOTION_CATEGORIES = [
  { id: "entrance", label: "出現・退場", labelEn: "Entrance & Exit", icon: "frame" },
  { id: "move", label: "移動", labelEn: "Movement", icon: "arrow" },
  { id: "scale", label: "拡大・縮小", labelEn: "Scale", icon: "expand" },
  { id: "rotate", label: "回転", labelEn: "Rotation", icon: "rotate" },
  { id: "reaction", label: "弾み・反動", labelEn: "Bounce & Reaction", icon: "wave" },
  { id: "text", label: "テキスト", labelEn: "Typography", icon: "text" },
  { id: "collection", label: "リスト・グリッド", labelEn: "List & Grid", icon: "grid" },
  { id: "attention", label: "注目・強調", labelEn: "Attention & Emphasis", icon: "focus" },
  { id: "light", label: "発光・ライト", labelEn: "Light & Glow", icon: "light" },
  { id: "effect", label: "エフェクト・切替", labelEn: "Effects & Transitions", icon: "fx" },
  { id: "web-scroll", label: "Webスクロール", labelEn: "Web Scroll", icon: "scroll" },
  { id: "web-interaction", label: "Web操作・反応", labelEn: "Web Interaction", icon: "pointer" },
  { id: "web-layout", label: "レイアウト・遷移", labelEn: "Layout & Navigation", icon: "layout" },
  { id: "web-feedback", label: "読込・データ", labelEn: "Loading & Data", icon: "data" },
  { id: "form-state", label: "フォーム・状態", labelEn: "Forms & State", icon: "form" },
  { id: "gesture", label: "ジェスチャー", labelEn: "Gesture & Mobile", icon: "gesture" },
  { id: "svg-path", label: "SVG・パス", labelEn: "SVG & Path", icon: "path" }
];

window.MOTION_LIBRARY = [
  motion("fade-slide", "entrance", "フェード＋スライド", "Fade + Slide", "fadeSlide", 600, "easeOutCubic", ["なめらか"], ["UI", "テキスト"], "透明度と短い移動を組み合わせた、もっとも扱いやすい出現。", "A versatile entrance combining opacity with a short slide.", { featured: true, curve: "out", recipe: "0ms  0%・Y24 / 600ms  100%・Y0" }),
  motion("mask-wipe", "entrance", "マスクワイプ", "Mask Wipe", "maskWipe", 700, "easeInOutQuint", ["きびきび"], ["テキスト", "ロゴ"], "面で隠した要素を一方向へ切り開く、輪郭の強い出現。", "A crisp directional reveal using an animated mask.", { curve: "inOut", accent: "cyan", recipe: "0ms  Mask 0% / 700ms  Mask 100%" }),
  motion("iris-open", "entrance", "アイリスオープン", "Iris Open", "iris", 760, "easeOutQuart", ["なめらか"], ["ロゴ", "UI"], "中心から円形に表示領域を広げ、視線を一点に集める。", "A circular reveal that pulls attention toward the center.", { curve: "out", accent: "yellow" }),
  motion("soft-rise", "entrance", "ソフトライズ", "Soft Rise", "softRise", 900, "easeOutSine", ["やわらかい"], ["UI", "テキスト"], "ぼかしと上昇をゆっくり解き、穏やかに存在感をつくる。", "A gentle rise that resolves blur and opacity.", { curve: "out", accent: "cyan" }),
  motion("snap-in", "entrance", "スナップイン", "Snap In", "snapIn", 380, "easeOutExpo", ["きびきび"], ["UI", "ロゴ"], "短い距離を一気に詰め、操作の反応を明快に伝える。", "A fast, decisive entrance for responsive feedback.", { curve: "out", accent: "coral" }),
  motion("split-reveal", "entrance", "スプリットリビール", "Split Reveal", "splitReveal", 720, "easeInOutCubic", ["きびきび"], ["ロゴ", "テキスト"], "中央から左右へ分かれる面で、対称性のある出現をつくる。", "A symmetrical reveal that opens from the center.", { curve: "inOut" }),
  motion("trail-exit", "entrance", "残像アウト", "Trail Exit", "trailExit", 520, "easeInQuart", ["きびきび"], ["UI", "キャラクター"], "複数の残像を残しながら加速して画面外へ抜ける。", "An accelerating exit that leaves a short motion trail.", { curve: "in", accent: "cyan" }),
  motion("collapse-away", "entrance", "折りたたみ退場", "Collapse Away", "collapse", 560, "easeInBack", ["重い"], ["UI", "3D"], "高さと透明度を同時に畳み、要素をその場から消す。", "An exit that folds height and opacity into place.", { curve: "inBack", accent: "coral" }),

  motion("linear-travel", "move", "一定速移動", "Linear Travel", "linearMove", 800, "linear", ["きびきび"], ["UI", "3D"], "速度を変えずに直線移動し、機械的で正確な印象をつくる。", "Constant-speed travel for a precise mechanical feel.", { curve: "linear", accent: "cyan" }),
  motion("smooth-arrival", "move", "なめらかな到着", "Smooth Arrival", "smoothMove", 760, "easeInOutCubic", ["なめらか"], ["UI", "ロゴ"], "出発と停止の両端をゆるめ、自然に位置を移す。", "A balanced move with eased departure and arrival.", { curve: "inOut" }),
  motion("arc-travel", "move", "弧を描く移動", "Arc Travel", "arcMove", 800, "easeInOutSine", ["なめらか"], ["キャラクター", "3D"], "直線を避けて弧を通り、動きに生き物らしさを加える。", "An arcing path that adds an organic sense of motion.", { curve: "inOut", accent: "cyan" }),
  motion("anticipation-move", "move", "予備動作つき移動", "Anticipated Move", "anticipation", 820, "easeInOutBack", ["弾む"], ["キャラクター", "ロゴ"], "進行方向と逆へ一度引いてから、大きく踏み出す。", "Pulls backward before committing to the main move.", { curve: "inOutBack", accent: "coral" }),
  motion("heavy-stop", "move", "重い停止", "Heavy Stop", "heavyStop", 680, "easeOutQuart", ["重い"], ["3D", "キャラクター"], "移動の勢いを短い圧縮と揺れで受け止め、重量を伝える。", "A compressed settle that communicates mass.", { curve: "out", accent: "coral", recipe: "0ms  X0 / 500ms  X100・S96 / 680ms  X100・S100" }),
  motion("follow-path", "move", "パス追従", "Path Follow", "pathFollow", 1000, "easeInOutSine", ["なめらか"], ["ロゴ", "3D"], "曲線に沿って向きも変え、軌跡を見せる移動。", "Follows a curved path while orienting to its tangent.", { curve: "inOut", accent: "yellow" }),
  motion("stagger-follow", "move", "段差追従", "Stagger Follow", "staggerFollow", 900, "easeOutCubic", ["やわらかい"], ["UI", "キャラクター"], "複数要素を少しずつ遅らせ、流れと奥行きをつくる。", "Offsets multiple elements to create flow and depth.", { curve: "out" }),
  motion("magnetic-snap", "move", "マグネット吸着", "Magnetic Snap", "magnet", 620, "easeInOutCubic", ["きびきび", "弾む"], ["UI", "ロゴ"], "目標へ近づくほど移動量が増え、少し通り越して吸着位置へ戻る。", "Travel increases near the target, then settles after a small overshoot.", { curve: "inOut", accent: "cyan" }),

  motion("pop-scale", "scale", "ポップスケール", "Pop Scale", "popScale", 520, "easeOutBack", ["弾む"], ["UI", "ロゴ"], "ゼロ付近から少し大きくなり、基準サイズへ戻る定番の出現。", "The classic scale-up entrance with a slight overshoot.", { curve: "outBack", accent: "coral" }),
  motion("breathing", "scale", "呼吸する拡縮", "Breathing Scale", "breathing", 1200, "easeInOutSine", ["やわらかい"], ["UI", "キャラクター"], "小さな拡縮を往復させ、待機中の生命感をつくる。", "A subtle looping scale that adds idle life.", { curve: "inOut", accent: "cyan" }),
  motion("elastic-scale", "scale", "エラスティックスケール", "Elastic Scale", "elasticScale", 900, "easeOutElastic", ["弾む"], ["ロゴ", "キャラクター"], "複数回の収束する反動で、ゴムのような伸縮を表現する。", "A decaying elastic settle with multiple reactions.", { curve: "elastic" }),
  motion("axis-stretch", "scale", "軸方向ストレッチ", "Axis Stretch", "axisStretch", 700, "easeInOutBack", ["弾む"], ["キャラクター", "3D"], "進行方向へ伸び、直交方向へ縮むことで速度を強調する。", "Stretches along the travel axis to emphasize speed.", { curve: "inOutBack", accent: "yellow" }),
  motion("pulse-focus", "scale", "フォーカスパルス", "Focus Pulse", "pulse", 680, "easeOutCubic", ["きびきび"], ["UI", "ロゴ"], "輪郭が外へ広がりながら消え、注目箇所を一度だけ示す。", "An expanding ring that briefly highlights a target.", { curve: "out", accent: "cyan" }),
  motion("depth-zoom", "scale", "奥行きズーム", "Depth Zoom", "depthZoom", 740, "easeInOutQuint", ["重い"], ["3D", "ロゴ"], "遠近とぼかしを合わせ、画面奥から手前へ迫る。", "Combines perspective and blur for a depth-driven zoom.", { curve: "inOut", accent: "coral" }),
  motion("soft-shrink", "scale", "ソフトシュリンク", "Soft Shrink", "softShrink", 600, "easeInCubic", ["やわらかい"], ["UI", "テキスト"], "中心を保ったまま静かに縮小し、注意を奪わず退場する。", "A quiet centered exit that avoids stealing attention.", { curve: "in" }),
  motion("impact-squash", "scale", "インパクトスクワッシュ", "Impact Squash", "squash", 620, "easeOutBack", ["重い", "弾む"], ["キャラクター", "3D"], "接地時に縦を縮め横へ広げ、衝撃と柔らかさを伝える。", "Squashes on contact to communicate impact and softness.", { curve: "outBack", accent: "yellow" }),

  motion("simple-turn", "rotate", "シンプルターン", "Simple Turn", "simpleRotate", 700, "easeInOutCubic", ["なめらか"], ["ロゴ", "UI"], "一定の軸を中心に、加減速をつけて素直に回転する。", "A clean eased rotation around a fixed axis.", { curve: "inOut" }),
  motion("spin-stop", "rotate", "スピン停止", "Spin Stop", "spinStop", 850, "easeOutQuart", ["きびきび"], ["ロゴ", "3D"], "高速回転から角度を合わせて止め、切れのある印象をつくる。", "A fast spin that resolves precisely on its target angle.", { curve: "out", accent: "cyan" }),
  motion("wobble", "rotate", "振り子の揺れ", "Pendulum Wobble", "wobble", 1000, "easeOutElastic", ["やわらかい"], ["キャラクター", "UI"], "支点から左右へ揺れ、少しずつ静止へ収束する。", "A pivoted swing that gradually settles.", { curve: "elastic", accent: "yellow" }),
  motion("flip-card", "rotate", "カードフリップ", "Card Flip", "flip", 760, "easeInOutCubic", ["きびきび"], ["UI", "3D"], "Y軸回転で表裏を切り替え、状態変化を空間的に見せる。", "A Y-axis flip that makes a state change feel spatial.", { curve: "inOut", accent: "coral" }),
  motion("orbit", "rotate", "オービット", "Orbit", "orbit", 1100, "linear", ["なめらか"], ["ロゴ", "3D"], "中心の周りを一定距離で周回し、関係性を視覚化する。", "A constant-radius orbit that visualizes relationships.", { curve: "linear", accent: "cyan" }),
  motion("tilt-reaction", "rotate", "チルトリアクション", "Tilt Reaction", "tilt", 560, "easeOutBack", ["弾む"], ["UI", "キャラクター"], "入力方向へ短く傾き、操作に対する反応を返す。", "A quick directional tilt that acknowledges input.", { curve: "outBack" }),
  motion("tumble-in", "rotate", "タンブルイン", "Tumble In", "tumble", 820, "easeOutCubic", ["きびきび"], ["ロゴ", "テキスト"], "移動と回転をずらして組み合わせ、軽快に転がり込む。", "Offsets travel and rotation for a lively entrance.", { curve: "out", accent: "coral" }),
  motion("counter-rotate", "rotate", "カウンターローテーション", "Counter Rotation", "counterRotate", 1000, "easeInOutSine", ["なめらか"], ["ロゴ", "3D"], "親子要素を逆方向へ回し、中心を保ちながら複雑さを加える。", "Counter-rotates nested parts while preserving visual balance.", { curve: "inOut", accent: "yellow" }),

  motion("overshoot", "reaction", "オーバーシュート", "Overshoot", "overshoot", 600, "easeOutBack", ["きびきび", "弾む"], ["UI", "ロゴ", "テキスト"], "目標位置を少し通り越してから戻ることで、勢いと心地よい反動をつくる動き。", "Passes the target and returns to create energy and a satisfying reaction.", { featured: true, curve: "outBack", tips: ["移動量の5〜12%だけ通り越す", "戻りは本動作より短くする", "小さい要素ほど反動を控えめにする"], tipsEn: ["Overshoot by only 5–12% of the travel", "Make the return shorter than the main move", "Use less reaction on smaller elements"], recipe: "0ms  0% / 430ms  108% / 600ms  100%" }),
  motion("bounce-land", "reaction", "バウンス着地", "Bounce Landing", "bounce", 700, "easeOutBounce", ["弾む"], ["キャラクター", "3D"], "落下後に高さを減らしながら数回跳ね、軽い物体の着地を表す。", "A series of diminishing rebounds after landing.", { featured: true, curve: "bounce", accent: "yellow" }),
  motion("spring-follow", "reaction", "スプリング追従", "Spring Follow", "spring", 1800, "spring(1, 80, 10)", ["やわらかい", "弾む"], ["UI", "キャラクター"], "目標の後を遅れて追い、減衰する揺れでつながりを見せる。", "Follows a target with a delayed, damped reaction.", { featured: true, curve: "spring", accent: "cyan" }),
  motion("rubber-band", "reaction", "ラバーバンド", "Rubber Band", "rubber", 900, "easeOutElastic", ["弾む"], ["ロゴ", "キャラクター"], "引っ張られた方向へ伸び、複数回の反動で元の形へ戻る。", "Stretches toward a pull, then snaps back elastically.", { curve: "elastic", accent: "coral" }),
  motion("recoil", "reaction", "リコイル", "Recoil", "recoil", 520, "easeOutQuart", ["重い"], ["UI", "キャラクター"], "強い前進の直後に小さく後退し、力の反作用を見せる。", "A short backward kick after a strong forward action.", { curve: "out", accent: "coral" }),
  motion("double-bounce", "reaction", "ダブルバウンス", "Double Bounce", "doubleBounce", 820, "easeOutBounce", ["弾む"], ["UI", "ロゴ"], "大きな反動と小さな反動を2段階で見せ、完了感を強める。", "Two distinct rebounds that reinforce completion.", { curve: "bounce" }),
  motion("snap-back", "reaction", "スナップバック", "Snap Back", "snapBack", 560, "easeOutBack", ["きびきび", "弾む"], ["UI", "テキスト"], "引き延ばした要素を高速で基準位置へ戻し、緊張を解放する。", "Releases tension with a fast return to origin.", { curve: "outBack", accent: "cyan" }),
  motion("after-shake", "reaction", "余震", "After Shake", "shake", 720, "easeOutExpo", ["重い"], ["キャラクター", "3D"], "衝撃後に振幅を急速に減らす横揺れを加える。", "A rapidly decaying shake after impact.", { curve: "out", accent: "yellow" }),

  motion("stagger-letters", "text", "文字の順次出現", "Staggered Letters", "staggerText", 900, "easeOutCubic", ["なめらか"], ["テキスト"], "文字ごとに短い遅延をつけ、視線の流れに沿って読ませる。", "Reveals letters with a small delay to guide reading order.", { curve: "out", recipe: "Delay 35ms / Y16→0 / Opacity 0→100%" }),
  motion("tracking-open", "text", "字間を開く", "Tracking Open", "tracking", 760, "easeOutQuart", ["なめらか"], ["テキスト", "ロゴ"], "狭い字間から基準値へ広げ、上品な余白をつくる。", "Expands tight tracking into a composed wordmark.", { curve: "out", accent: "cyan" }),
  motion("type-mask", "text", "行マスクアップ", "Line Mask Up", "lineMask", 620, "easeOutCubic", ["きびきび"], ["テキスト", "UI"], "行単位のマスクから文字を押し上げ、情報を明快に提示する。", "Pushes a text line upward through a clipping mask.", { curve: "out" }),
  motion("word-swap", "text", "単語スワップ", "Word Swap", "wordSwap", 700, "easeInOutCubic", ["きびきび"], ["テキスト", "UI"], "旧単語と新単語を反対方向へ動かし、意味の切り替えを見せる。", "Moves old and new words in opposite directions.", { curve: "inOut", accent: "coral" }),
  motion("kinetic-emphasis", "text", "強調ワード", "Kinetic Emphasis", "emphasis", 580, "easeOutBack", ["弾む"], ["テキスト"], "一語だけを拡大・反動させ、文章内のアクセントをつくる。", "Scales one word with a reaction to add emphasis.", { curve: "outBack", accent: "yellow" }),
  motion("text-wave", "text", "文字ウェーブ", "Letter Wave", "textWave", 1000, "easeInOutSine", ["やわらかい"], ["テキスト", "ロゴ"], "文字を順番に上下させ、連続する波のリズムをつくる。", "Offsets letters vertically to create a traveling wave.", { curve: "inOut", accent: "cyan" }),
  motion("blur-resolve", "text", "ブラー解像", "Blur Resolve", "blurText", 820, "easeOutSine", ["やわらかい"], ["テキスト", "ロゴ"], "ぼけた文字を徐々に解像し、静かな登場感をつくる。", "Resolves blurred text into a calm, precise title.", { curve: "out" }),
  motion("split-type", "text", "文字分解・再構成", "Split & Assemble", "splitText", 940, "easeInOutBack", ["きびきび"], ["テキスト", "ロゴ"], "文字を異なる方向と角度から集め、構造を見せながら一語へ再構成する。", "Assembles letters from different directions and angles into a complete word.", { curve: "inOutBack", accent: "coral" }),

  referenceMotion("list-stagger", "collection", "リスト順次表示", "Staggered List", "listStagger", 760, "easeOutCubic", ["なめらか"], ["UI", "テキスト"], "項目を上から順に短い時間差で出し、読む順序を自然に示す。", "Reveals rows in order with short delays that clarify reading flow.", { focus: "各行が同じ距離を進み、上から下へ一定の時間差で整列していく。", focusEn: "Each row travels the same distance and settles with a consistent top-to-bottom delay.", caution: "行数が多いまま遅延を重ねると、最後の情報が見えるまで待たせてしまう。", cautionEn: "Long lists with accumulated delays make people wait for the final information.", recipe: "Rows 1–4: X-24→0・Opacity 0→100% / Delay 70ms / 760ms", curve: "out" }),
  referenceMotion("list-cascade", "collection", "カスケード表示", "Cascade List", "listCascade", 820, "easeOutQuart", ["やわらかい"], ["UI", "テキスト"], "上から落ち着くように項目を出し、まとまりのある一覧を作る。", "Drops rows gently into place to form a cohesive list.", { focus: "少し上から降りた行が、前の行を追うように順番に停止していく。", focusEn: "Rows descend from above and stop in sequence as if following the previous row.", caution: "落下量や反動が大きいと、一覧ではなく個別のバウンス表現に見える。", cautionEn: "Too much drop or rebound makes rows feel like separate bounces instead of one list.", recipe: "Rows 1–4: Y-20→Y+3→0・Opacity 0→100% / Delay 60ms / 820ms", curve: "out", accent: "cyan" }),
  referenceMotion("list-alternate", "collection", "左右交互イン", "Alternating List", "listAlternate", 780, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "奇数行と偶数行を左右から入れ、一覧に軽いリズムを加える。", "Alternates row entrances from left and right to add a light rhythm.", { focus: "左右の開始位置が交互に切り替わり、最後は一つの縦軸へ揃う。", focusEn: "Start sides alternate while every row resolves onto one shared vertical axis.", caution: "本文リストで移動量を広げすぎると、読む視線が左右へ振られすぎる。", cautionEn: "Large alternating travel makes reading eyes swing too far across body lists.", recipe: "Odd X-28 / Even X+28 → 0・Opacity 0→100% / Delay 55ms / 780ms", curve: "out", accent: "coral" }),
  referenceMotion("list-expand", "collection", "行の展開", "Row Expand", "listExpand", 720, "easeOutBack", ["弾む"], ["UI", "テキスト"], "細い線から行の高さを開き、追加された情報をその場に展開する。", "Expands rows from thin lines to reveal newly added information in place.", { focus: "各行の上端を基準に高さが開き、文字領域が順番に確保されていく。", focusEn: "Each row opens from its top edge, reserving content space in sequence.", caution: "実レイアウトのheightを動かすと周囲が再配置されるため、マスクかScale Yを使う。", cautionEn: "Animating layout height reflows neighbors, so use a mask or Y scale instead.", recipe: "Rows: Scale Y .08→1・Origin Top・Opacity 0→100% / Delay 65ms / 720ms", curve: "outBack", accent: "yellow" }),
  referenceMotion("grid-wave", "collection", "グリッドウェーブ", "Grid Wave", "gridWave", 900, "easeOutCubic", ["やわらかい"], ["UI", "3D"], "格子状の要素を斜め方向へ波のように順次立ち上げる。", "Raises grid items in a diagonal wave across the layout.", { focus: "左上から右下へ遅延が伝わり、グリッド全体に一つの波面が見える。", focusEn: "Delay travels from top-left to bottom-right, forming one readable wavefront.", caution: "セルごとの遅延差が大きいと、同じグループではなく別々の要素に見える。", cautionEn: "Large cell delays break the sense that the tiles belong to one group.", recipe: "3×3 Cells: Y+18→0・Scale .78→1 / Delay (Row+Col)×55ms / 900ms", curve: "out", accent: "cyan" }),
  referenceMotion("grid-center", "collection", "中央から展開", "Center-out Grid", "gridCenter", 860, "easeOutBack", ["弾む"], ["UI", "ロゴ"], "中央セルから外側へ広がる順番で、中心性のある配置を見せる。", "Reveals a grid from the center outward to emphasize its focal structure.", { focus: "中央が最初に決まり、距離の近いセルから外周へ同心状に揃っていく。", focusEn: "The center resolves first, followed by tiles in rings of increasing distance.", caution: "主役が中央にない画面で使うと、実際の情報優先度と演出が食い違う。", cautionEn: "On off-center layouts, the motion can contradict the real information priority.", recipe: "3×3 Cells: From Center Offset 22px・Scale .3→1 / Ring Delay 70ms / 860ms", curve: "outBack" }),
  referenceMotion("grid-row-sweep", "collection", "行スイープ", "Row Sweep Grid", "gridRowSweep", 800, "easeInOutCubic", ["きびきび"], ["UI", "3D"], "グリッドを行単位の帯として横へ流し、整然と表示する。", "Sweeps the grid in horizontal row bands for an orderly reveal.", { focus: "同じ行のセルがほぼ同時に入り、次の行へ明確にリズムが移る。", focusEn: "Cells in one row arrive together before the rhythm advances to the next row.", caution: "列方向の遅延を強くすると、行スイープのまとまりが失われる。", cautionEn: "Strong column delays weaken the intended row-by-row grouping.", recipe: "Rows: X-34→0・Opacity 0→100% / Row Delay 90ms・Col 20ms / 800ms", curve: "inOut", accent: "coral" }),
  referenceMotion("grid-shuffle", "collection", "シャッフル整列", "Shuffle to Grid", "gridShuffle", 980, "easeInOutBack", ["きびきび", "弾む"], ["UI", "3D"], "散らばった要素を回転させながら格子へ戻し、整理の完了を見せる。", "Returns scattered, rotated items into a grid to communicate organization.", { focus: "異なる開始位置のセルが、最後に同じ間隔と角度へ一斉に収束する。", focusEn: "Tiles start from varied positions but converge on equal spacing and zero rotation.", caution: "開始位置を遠くしすぎると対応関係が読めず、ただの飛び込みに見える。", cautionEn: "Overly distant starts obscure correspondence and read as unrelated fly-ins.", recipe: "Cells: Offset ±26・Rotation ±18°・Scale .72 → Grid / Delay 35ms / 980ms", curve: "inOutBack", accent: "yellow" }),

  referenceMotion("nudge", "attention", "ナッジ", "Nudge", "nudge", 520, "easeOutBack", ["きびきび"], ["UI", "テキスト"], "小さな横移動を一度だけ返し、操作できる対象を控えめに知らせる。", "Uses one small lateral prompt to hint that an element is actionable.", { focus: "対象が短く横へ動いて元の位置へ戻り、周辺レイアウトは動かない。", focusEn: "The target shifts briefly and returns while surrounding layout remains completely still.", caution: "周期的に繰り返すと通知やエラーに見えるため、必要な瞬間だけ再生する。", cautionEn: "Repeated nudges can resemble an alert or error, so trigger only when needed.", recipe: "0ms X0 / 180ms X+9 / 330ms X-3 / 520ms X0", curve: "outBack" }),
  referenceMotion("attention-bounce", "attention", "アテンションバウンス", "Attention Bounce", "attentionBounce", 620, "easeOutBounce", ["弾む"], ["UI", "キャラクター"], "小さく浮いて着地する一往復で、対象に視線を戻す。", "Uses one compact lift and landing to return attention to a target.", { focus: "上方向の一回だけの跳ねと短い着地反応で、位置を変えずに強調する。", focusEn: "One upward hop and short landing reaction emphasize without changing position.", caution: "複数回跳ねると待機アニメーションのようになり、操作誘導が弱くなる。", cautionEn: "Multiple hops feel like idle animation and weaken the action prompt.", recipe: "0ms Y0 / 260ms Y-16 / 430ms Y+2・ScaleY .92 / 620ms Rest", curve: "bounce", accent: "yellow" }),
  referenceMotion("badge-pop", "attention", "バッジポップ", "Badge Pop", "badgePop", 560, "easeOutBack", ["弾む"], ["UI", "テキスト"], "対象の隅に小さなバッジを弾ませ、新着や更新を示す。", "Pops a small corner badge to signal new or updated content.", { focus: "本体は静止したまま、隅のバッジだけが縮小状態から素早く現れる。", focusEn: "The base stays still while only the corner badge pops up from a tiny scale.", caution: "内容のない装飾として使うと、通知の意味とユーザーの期待を損なう。", cautionEn: "Decorative badges without meaning undermine notification expectations.", recipe: "Badge: Scale 0・Rotation -18° / 390ms Scale 118 / 560ms Scale 100", curve: "outBack", accent: "coral" }),
  referenceMotion("focus-halo", "attention", "フォーカスハロー", "Focus Halo", "focusHalo", 900, "easeOutCubic", ["なめらか"], ["UI", "ロゴ"], "対象の周囲へ柔らかな輪を広げ、位置を変えずに注目点を示す。", "Expands a soft ring around a target to mark focus without moving it.", { focus: "対象の輪郭から同心円が広がって薄れ、中心だけが安定して残る。", focusEn: "A concentric ring expands and fades while the target remains stable at its center.", caution: "背景とのコントラストが弱いと輪だけ消え、何を示す演出か分からなくなる。", cautionEn: "Low contrast can hide the ring and make the intended target unclear.", recipe: "Halo: Scale .75→1.9・Opacity 70→0% / Target Scale 1→1.04→1 / 900ms", curve: "out", accent: "cyan" }),
  referenceMotion("highlight-sweep", "attention", "ハイライトスイープ", "Highlight Sweep", "highlightSweep", 820, "easeInOutCubic", ["なめらか"], ["UI", "テキスト"], "細い明部を面の上へ通し、更新された箇所や重要部分を示す。", "Passes a narrow highlight across a surface to mark an updated or important area.", { focus: "斜めの明るい帯が対象の端から端まで一度だけ通過し、輪郭は動かない。", focusEn: "A diagonal light band crosses the target once while its silhouette remains fixed.", caution: "常時ループすると光沢表現に変わり、情報の強調としては意味が薄れる。", cautionEn: "Continuous looping reads as material shine rather than information emphasis.", recipe: "Highlight: X-130%→230%・SkewX -18°・Opacity 0→75→0% / 820ms", curve: "inOut", accent: "yellow" }),
  referenceMotion("border-chase", "attention", "ボーダーチェイス", "Border Chase", "borderChase", 1000, "linear", ["きびきび"], ["UI", "ロゴ"], "輪郭線の一部を走らせ、選択中の領域を継続的に示す。", "Runs a bright segment around an outline to indicate an active selection.", { focus: "短い発光区間が四辺を途切れず巡り、対象の境界だけを強調する。", focusEn: "A short luminous segment travels continuously around all four edges.", caution: "細かいカードが並ぶ画面で複数同時に使うと、視線が散り続ける。", cautionEn: "Multiple chasing borders across dense cards keep pulling attention in every direction.", recipe: "Border Dash 26%・Dash Offset 100→0 / Linear 1000ms Loop", curve: "linear", accent: "cyan" }),
  referenceMotion("press-feedback", "attention", "プレスフィードバック", "Press Feedback", "pressFeedback", 420, "easeOutCubic", ["きびきび"], ["UI"], "押下で少し沈み、離した瞬間に戻ることで操作の手応えを返す。", "Compresses on press and releases quickly to provide tactile visual feedback.", { focus: "中心を保った縮小と影の減少が同時に起き、短時間で基準状態へ戻る。", focusEn: "Centered compression and reduced shadow happen together, then return quickly.", caution: "縮小率が大きいとボタンが逃げて見え、連打時に不安定な印象になる。", cautionEn: "Excessive scale-down makes buttons seem to retreat and feel unstable on repeated taps.", recipe: "0ms Scale 100・Shadow 100 / 120ms Scale 94・Shadow 25 / 420ms Scale 100", curve: "out" }),
  referenceMotion("jelly-emphasis", "attention", "ゼリー強調", "Jelly Emphasis", "jellyEmphasis", 760, "easeOutElastic", ["やわらかい", "弾む"], ["ロゴ", "キャラクター"], "縦横の伸縮をずらして収束させ、柔らかい存在感を一度だけ作る。", "Offsets X and Y squash to create one soft, elastic moment of emphasis.", { focus: "横伸びと縦伸びが交互に弱まり、体積感を保ちながら元の形へ戻る。", focusEn: "Horizontal and vertical stretch alternate and decay while preserving a sense of volume.", caution: "テキストや実用ボタンへ強く使うと、輪郭が崩れて読み取りにくくなる。", cautionEn: "Strong jelly motion distorts text and practical controls enough to hurt readability.", recipe: "Scale 100 / 260ms X125 Y78 / 430ms X88 Y112 / 590ms X106 Y96 / 760ms 100", curve: "elastic", accent: "coral" }),

  referenceMotion("glow-pulse", "light", "グローパルス", "Glow Pulse", "glowPulse", 1100, "easeInOutSine", ["やわらかい"], ["UI", "ロゴ"], "発光の強弱をゆっくり往復させ、待機中の対象に静かな生命感を加える。", "Breathes glow intensity to give an idle element a calm sense of life.", { focus: "本体サイズをほぼ変えず、外側のぼけた光だけが滑らかに明滅する。", focusEn: "The core stays nearly unchanged while only the soft outer glow breathes smoothly.", caution: "明滅差が大きいと警告や点滅に見えるため、輝度差を控えめにする。", cautionEn: "Large brightness swings resemble alerts or flicker, so keep the range restrained.", recipe: "Glow Radius 8→24→8・Opacity 35→85→35% / 1100ms Loop", curve: "inOut", accent: "cyan" }),
  referenceMotion("neon-flicker", "light", "ネオン点滅", "Neon Flicker", "neonFlicker", 900, "linear", ["きびきび"], ["ロゴ", "テキスト"], "不規則な短い消灯を挟み、ネオンサインが通電するような質感を作る。", "Adds brief irregular outages to mimic a neon sign powering on.", { focus: "完全な周期ではなく短い暗転が偏って入り、最後は安定した発光へ落ち着く。", focusEn: "Uneven brief outages cluster before the light settles into a stable glow.", caution: "高速・高コントラストの点滅は不快感や光過敏への負担になるため避ける。", cautionEn: "Fast high-contrast flicker can be uncomfortable and unsafe for photosensitive viewers.", recipe: "Opacity 20/100/35/100/55/100% at 0/9/14/22/31/100% / 900ms", curve: "linear", accent: "coral" }),
  referenceMotion("light-sweep", "light", "ライトスイープ", "Light Sweep", "lightSweep", 950, "easeInOutCubic", ["なめらか"], ["ロゴ", "3D"], "広い光帯を面に横切らせ、素材の艶と立体的な曲面を感じさせる。", "Sweeps a broad light band across a surface to suggest gloss and curvature.", { focus: "光の幅と角度が一定のまま面を横断し、中央付近だけ輝度が高くなる。", focusEn: "A constant-width angled band crosses the surface and peaks near its center.", caution: "面の形状と無関係な方向へ光を流すと、光源や立体感が不自然になる。", cautionEn: "A sweep that ignores surface form makes lighting direction and volume feel false.", recipe: "Light Band X-150→250%・Blur 8・Blend Add / 950ms", curve: "inOut", accent: "yellow" }),
  referenceMotion("bloom-reveal", "light", "ブルーム出現", "Bloom Reveal", "bloomReveal", 780, "easeOutQuart", ["やわらかい"], ["ロゴ", "テキスト"], "強い光のにじみから輪郭を解像し、印象的に対象を出現させる。", "Resolves a bright bloom into a crisp silhouette for a dramatic reveal.", { focus: "開始時の白いにじみが縮まりながら、内部の色と輪郭が同時に戻る。", focusEn: "The initial white bloom contracts as color and edge definition return together.", caution: "白飛び時間が長いと内容が判別できず、単に表示が遅い印象になる。", cautionEn: "A long clipped-white phase hides content and simply feels like delayed rendering.", recipe: "0ms Exposure +2・Glow 38・Scale .82 / 540ms Glow 8 / 780ms Normal", curve: "out", accent: "cyan" }),
  referenceMotion("rim-glow", "light", "リムグロー", "Rim Glow", "rimGlow", 1000, "easeInOutSine", ["なめらか"], ["ロゴ", "3D"], "輪郭の外周だけを発光させ、背景から形を浮かび上がらせる。", "Lights only the outer rim to separate a silhouette from its background.", { focus: "内側の面は暗さを保ち、輪郭線の明るさだけが一周して強くなる。", focusEn: "The interior stays restrained while brightness grows specifically along the outer edge.", caution: "内側まで均一に光らせるとリムではなく単純な発光面になってしまう。", cautionEn: "Lighting the entire fill turns the effect into a generic glow instead of rim light.", recipe: "Stroke 2→4→2・Outer Glow 10→22→10 / 1000ms Loop", curve: "inOut", accent: "purple" }),
  referenceMotion("energy-charge", "light", "エネルギーチャージ", "Energy Charge", "energyCharge", 1200, "easeInCubic", ["重い"], ["UI", "キャラクター", "3D"], "回転する光輪を収束させながら輝度を上げ、発動前の蓄積を見せる。", "Tightens rotating light rings while brightness rises to show energy building.", { focus: "外側の光輪が回転しながら中心へ寄り、終端で中心光が最も強くなる。", focusEn: "Outer rings rotate inward and the central core reaches peak brightness at the end.", caution: "溜めの後に結果がないと操作不能に見えるため、完了アクションへ必ず接続する。", cautionEn: "Without a result after charging, the interface can appear stuck or unresponsive.", recipe: "Ring Rotation 0→540°・Scale 1.6→.8 / Core Glow 5→30 / 1200ms", curve: "in", accent: "yellow" }),
  referenceMotion("light-trail", "light", "光跡", "Light Trail", "lightTrail", 900, "easeOutCubic", ["なめらか"], ["ロゴ", "キャラクター", "3D"], "移動する光点の後ろへ減衰する残光を並べ、速度と軌跡を示す。", "Adds fading luminous echoes behind a moving point to show speed and path.", { focus: "先頭の光が最も明るく、後方ほど小さく薄い残光が時間差で追従する。", focusEn: "The leading light is brightest while smaller, dimmer echoes follow behind.", caution: "残像が長すぎると現在位置が曖昧になり、操作対象を見失いやすい。", cautionEn: "Long trails obscure the current position and make interactive targets hard to track.", recipe: "Head X0→185 / Trails Delay 18ms・Opacity 45/30/18%・Blur 1.5–4.5 / trails merge into the head at rest / 900ms", curve: "out", accent: "cyan" }),
  referenceMotion("scan-line", "light", "スキャンライン", "Scan Line", "scanLine", 1100, "linear", ["きびきび"], ["UI", "3D"], "細い発光線を面の上から下へ走らせ、解析や読み取り中の状態を示す。", "Moves a narrow luminous line downward to suggest analysis or scanning.", { focus: "水平線とその後方の淡い光が一定速で下がり、読み取り範囲を順番に示す。", focusEn: "A horizontal line and soft wake descend at constant speed through the scan area.", caution: "処理の進捗と無関係に使う場合は、完了率を示すバーと誤認させない。", cautionEn: "When not tied to progress, avoid making the scan look like a completion meter.", recipe: "Scan Y-10→110%・Glow 12・Linear / 1100ms Loop", curve: "linear", accent: "cyan" }),

  referenceMotion("blur-zoom", "effect", "ブラーズーム", "Blur Zoom", "blurZoom", 720, "easeOutQuart", ["なめらか"], ["ロゴ", "テキスト", "3D"], "縮小されたぼけから手前へ寄せながら解像し、奥行きのある切替を作る。", "Zooms forward from a blurred small state and resolves into focus.", { focus: "Scale・Blur・Opacityの三要素が同時に終わり、最後の輪郭だけが静止する。", focusEn: "Scale, blur, and opacity finish together so the final sharp silhouette feels stable.", caution: "大きなブラーと拡大を重ねると描画負荷が上がり、輪郭も濁りやすい。", cautionEn: "Large blur combined with scaling increases rendering cost and muddy edges.", recipe: "0ms Scale 65・Blur 14・Opacity 0 / 720ms Scale 100・Blur 0・Opacity 100%", curve: "out" }),
  referenceMotion("chromatic-split", "effect", "色収差分離", "Chromatic Split", "chromaticSplit", 900, "easeInOutCubic", ["きびきび"], ["ロゴ", "テキスト"], "赤とシアンの輪郭を大きく左右へ分け、短く保持してから中央へ収束させる。", "Separates red and cyan copies clearly, holds them briefly, then converges at center.", { focus: "赤とシアンが左右へ大きく分離した状態を一度見せ、白い本体へ段階的に重なって戻る。", focusEn: "Red and cyan copies hold visibly apart before converging in stages on the white core.", caution: "ずれ幅や保持時間をさらに増やすと、単なる色ズレや可読性不良に見える。", cautionEn: "Increasing offset or hold further can read as faulty registration and hurt legibility.", recipe: "RGB Copies X ±34→±30 Hold→±12→0・Opacity 100→0% / Main Shake ±4 / 900ms", curve: "inOut", accent: "coral" }),
  referenceMotion("glitch-in", "effect", "グリッチイン", "Glitch In", "glitchIn", 650, "linear", ["きびきび"], ["ロゴ", "テキスト", "UI"], "短い水平ずれと切片の乱れを挟み、デジタル信号が確定するように出現させる。", "Uses brief horizontal offsets and sliced distortion before a digital signal locks in.", { focus: "乱れは前半へ集中し、後半では位置・色・輪郭が完全に安定する。", focusEn: "Distortion is concentrated early, with position, color, and edges fully stable later.", caution: "長時間の細かな乱れは故障表示に見え、文字や操作部の理解を妨げる。", cautionEn: "Long fine-grained distortion resembles malfunction and blocks reading or control use.", recipe: "0–45% X ±14・Skew ±5°・Clip Slices / 65% X-2 / 100% Clean", curve: "linear", accent: "cyan" }),
  referenceMotion("pixel-dissolve", "effect", "ピクセルディゾルブ", "Pixel Dissolve", "pixelDissolve", 900, "easeOutCubic", ["きびきび"], ["ロゴ", "3D"], "小さなセルをばらついた順番で表示し、画素が形へ集まる過程を見せる。", "Reveals small cells in varied order so pixels assemble into a complete form.", { focus: "セルごとの出現差を保ちながら、終端では隙間のない一つの面へ揃う。", focusEn: "Cells appear at varied times but resolve into one gapless surface at the end.", caution: "セル数を増やしすぎるとDOMやレイヤー数が膨らみ、再生負荷が高くなる。", cautionEn: "Too many cells increase DOM or layer count and make playback expensive.", recipe: "4×4 Cells: Scale 0→1・Opacity 0→100% / Pattern Delay 28ms / 900ms", curve: "out", accent: "yellow" }),
  referenceMotion("particle-burst", "effect", "パーティクルバースト", "Particle Burst", "particleBurst", 820, "easeOutQuart", ["きびきび"], ["ロゴ", "キャラクター", "3D"], "中心から小さな粒を放射し、成功・衝撃・生成の瞬間を強調する。", "Emits small particles radially to accent success, impact, or creation.", { focus: "中心の反応直後に粒が全方向へ広がり、減速しながら透明になる。", focusEn: "Particles expand in every direction just after the core reacts, slowing as they fade.", caution: "粒の数と寿命を増やすと主役より目立つため、短く少量に抑える。", cautionEn: "Too many long-lived particles overpower the subject, so keep the burst brief and sparse.", recipe: "Core Scale 72→112→100 / 8 Particles Radius 0→54・Opacity 100→0% / 820ms", curve: "out", accent: "coral" }),
  referenceMotion("ripple-reveal", "effect", "リップル出現", "Ripple Reveal", "rippleReveal", 950, "easeOutCubic", ["やわらかい"], ["UI", "ロゴ"], "中心から広がる波紋に合わせて対象を表示し、接触点との関係を見せる。", "Reveals a target with expanding ripples that connect it to a touch point.", { focus: "最初の波紋に少し遅れて本体が現れ、二本目が余韻として外へ消える。", focusEn: "The target follows the first ripple, while a second ring fades outward as an echo.", caution: "波紋中心と入力位置が離れると、どこを操作した結果か分からなくなる。", cautionEn: "If the ripple origin differs from the input point, cause and effect become unclear.", recipe: "Ripple 1 Scale .2→2.2 / Ripple 2 Delay 110ms / Target Opacity 0→100% / 950ms", curve: "out", accent: "cyan" }),
  referenceMotion("slice-reveal", "effect", "スライスリビール", "Slice Reveal", "sliceReveal", 840, "easeInOutCubic", ["きびきび"], ["ロゴ", "テキスト"], "水平の切片を異なる方向から合わせ、分解された形を一枚へ再構成する。", "Brings horizontal slices from alternating directions and reconstructs one image.", { focus: "各スライスの横移動は異なるが、境界と停止フレームは最後に完全一致する。", focusEn: "Slices use different horizontal travel but align boundaries and finish on one frame.", caution: "細かく分割しすぎると元の形が判別できず、グリッチとの差も曖昧になる。", cautionEn: "Too many slices hide the source shape and make the effect indistinguishable from glitch.", recipe: "4 Slices: Odd X-42 / Even X+42・Opacity 0→100% / Delay 36ms / 840ms", curve: "inOut" }),
  referenceMotion("noise-reveal", "effect", "ノイズ解像", "Noise Resolve", "noiseReveal", 1000, "easeOutSine", ["やわらかい"], ["ロゴ", "テキスト", "3D"], "粒状のノイズを減らしながら対象の輪郭を解像し、静かな生成感を作る。", "Reduces granular noise as the subject resolves into a calm, clear silhouette.", { focus: "粒の密度とぼけが同時に減り、終端ではノイズ層が完全に消える。", focusEn: "Grain density and blur decrease together until the noise layer disappears completely.", caution: "高密度の動くノイズは圧縮でちらつきやすく、映像出力では破綻を確認する。", cautionEn: "Dense animated noise can shimmer under compression, so verify final encoded output.", recipe: "Noise Opacity 85→0%・Blur 8→0・Subject Opacity 20→100% / 1000ms", curve: "out", accent: "yellow" }),

  referenceMotion("scroll-reveal", "web-scroll", "スクロールリビール", "Scroll Reveal", "scrollReveal", 900, "easeOutCubic", ["なめらか"], ["UI", "テキスト"], "要素が表示領域へ入る進行に合わせ、複数のカードを順に見せる。", "Reveals cards as their view progress enters the viewport.", { focus: "スクロール方向に沿ってカードが下から入り、表示範囲の中央までに完全表示される。", focusEn: "Cards rise along the scroll direction and finish before reaching the viewport center.", caution: "要素が見えるたびに再生すると往復スクロールで落ち着かないため、再生条件を決める。", cautionEn: "Repeated replay on every re-entry can feel restless, so define whether it runs once or reverses.", recipe: "CSS: animation-timeline:view(); animation-range:entry 10% cover 35%", curve: "out", accent: "cyan" }),
  referenceMotion("parallax-layers", "web-scroll", "パララックスレイヤー", "Parallax Layers", "parallaxLayers", 1200, "linear", ["なめらか"], ["UI", "3D"], "前景・中景・背景を異なる距離で動かし、スクロールに奥行きを加える。", "Moves foreground, midground, and background at different rates to add depth.", { focus: "手前ほど移動量が大きく、奥ほど遅く動くことで一つの空間として見える。", focusEn: "Foreground travel is largest while distant layers move less, forming one coherent space.", caution: "大画面を長距離パンすると酔いやすいため、移動幅を抑えて縮小設定へ対応する。", cautionEn: "Large full-screen panning can trigger discomfort, so reduce travel and support reduced motion.", recipe: "WAAPI: layer travel Y 40/25/10px (front→back) mapped to ScrollTimeline progress", curve: "linear", accent: "purple" }),
  referenceMotion("sticky-pin", "web-scroll", "スティッキーピン", "Sticky Pin", "stickyPin", 1100, "linear", ["重い"], ["UI", "テキスト"], "主役を画面内に固定し、周辺情報だけを通過させて説明を段階化する。", "Pins the subject while surrounding content advances in stages.", { focus: "中央の主役は位置を保ち、背後のコンテンツだけが上へ流れて区間の進行を示す。", focusEn: "The central subject stays fixed while background content advances upward through the section.", caution: "固定区間が長いとスクロールが進まないように感じるため、開始と終了を明確にする。", cautionEn: "Long pin ranges can feel like scrolling is blocked, so make entry and release points clear.", recipe: "CSS sticky top:50%; section height:220vh / progress via scroll()", curve: "linear", accent: "coral" }),
  referenceMotion("scroll-progress", "web-scroll", "スクロール進捗", "Scroll Progress", "scrollProgress", 1000, "linear", ["きびきび"], ["UI"], "ページや記事の読了位置を、スクロール量に連動するバーで示す。", "Maps page scroll progress to a determinate reading bar.", { focus: "画面の移動とバーの伸びが一対一で対応し、戻る操作では同じ割合だけ縮む。", focusEn: "Bar length maps one-to-one with page movement and reverses by the same proportion.", caution: "動的に高さが変わるページでは進捗が跳ねるため、レイアウト変化後に範囲を更新する。", cautionEn: "Dynamic page height can make progress jump, so recalculate after layout changes.", recipe: "CSS: transform:scaleX(0→1); transform-origin:left; animation-timeline:scroll(root)", curve: "linear", accent: "cyan" }),
  referenceMotion("horizontal-scrub", "web-scroll", "横スクロールスクラブ", "Horizontal Scrub", "horizontalScrub", 1200, "linear", ["なめらか"], ["UI", "3D"], "縦スクロールの進行を横方向のカード列へ割り当て、連続して見せる。", "Maps vertical scroll progress onto a horizontal card track.", { focus: "カード列が一定速度で左へ進み、スクロールを戻すと正確に逆再生される。", focusEn: "The card track moves left at a constant rate and reverses exactly with scroll direction.", caution: "横移動だけでは操作方向が分かりにくいため、進捗や次項目の見切れを残す。", cautionEn: "Horizontal travel can obscure input direction, so retain progress cues or a visible next item.", recipe: "Track X:0→-(scrollWidth-clientWidth) / ScrollTimeline inline mapping", curve: "linear", accent: "yellow" }),
  referenceMotion("section-snap", "web-scroll", "セクションスナップ", "Section Snap", "sectionSnap", 850, "easeOutQuart", ["きびきび"], ["UI", "テキスト"], "セクション境界へ短く吸着し、ページを章単位で切り替える。", "Settles briefly onto section boundaries for chapter-like navigation.", { focus: "次の面が大部分見えた時点で境界へ収まり、停止後は画面全体が安定する。", focusEn: "Once the next panel dominates the viewport, it settles cleanly onto its boundary.", caution: "強制的なスナップは細かく読みたい操作を妨げるため、本文中心ページでは弱める。", cautionEn: "Aggressive snapping blocks fine reading control, so soften or avoid it on text-heavy pages.", recipe: "CSS: scroll-snap-type:y proximity; panels scroll-snap-align:start", curve: "out", accent: "coral" }),
  referenceMotion("text-scroll-scrub", "web-scroll", "文字スクロール解像", "Text Scroll Resolve", "textScrollScrub", 1000, "linear", ["なめらか"], ["テキスト"], "スクロール進行に合わせ、見出しの文字を順番に明瞭へ切り替える。", "Resolves heading letters progressively with scroll position.", { focus: "先頭から末尾へ明るさとぼけが解け、現在読んでいる位置が文字列上を進む。", focusEn: "Brightness and blur resolve from first to last letter, marking reading progress across the line.", caution: "本文へ適用すると読む速度を拘束するため、短い見出しや演出コピーに限定する。", cautionEn: "Applying this to body copy constrains reading speed, so reserve it for short display text.", recipe: "Letters: opacity .18→1・blur 5→0 over 35% each / start index×10% / ViewTimeline", curve: "linear", accent: "cyan" }),
  referenceMotion("scroll-depth-zoom", "web-scroll", "スクロール奥行きズーム", "Scroll Depth Zoom", "scrollDepthZoom", 1200, "easeInOutCubic", ["重い"], ["UI", "3D"], "スクロール量で面を奥から手前へ近づけ、セクションへの没入を作る。", "Uses scroll progress to bring a surface forward from depth.", { focus: "小さく暗い面が中央を保って拡大し、区間の終端で通常の表示サイズへ一致する。", focusEn: "A small dim surface grows around a fixed center and matches normal size at the section end.", caution: "全画面の大きなズームは前庭感覚へ負担があるため、縮小設定ではフェードへ置換する。", cautionEn: "Large viewport zooms can affect vestibular comfort, so replace them with fades under reduced motion.", recipe: "Scale .78→1・Brightness .7→1 / animation-timeline:view()", curve: "inOut", accent: "purple" }),

  referenceMotion("hover-lift", "web-interaction", "ホバーリフト", "Hover Lift", "hoverLift", 1600, "easeOutCubic", ["きびきび"], ["UI"], "カードを少し持ち上げ、クリックできる対象であることを示す。", "Lifts a card slightly to signal that it is interactive.", { focus: "Y移動・影・輪郭色が同時に変わり、ポインターが外れると同じ経路で戻る。", focusEn: "Y position, shadow, and border change together and reverse on pointer exit.", caution: "タッチ端末にはホバーがないため、押下時のフィードバックを別に用意する。", cautionEn: "Touch devices have no persistent hover, so provide separate pressed feedback.", recipe: "CSS transition: transform 180ms; hover translateY(-7px) scale(1.02)", curve: "out" }),
  referenceMotion("magnetic-button", "web-interaction", "マグネティックボタン", "Magnetic Button", "magneticButton", 1800, "easeOutCubic", ["やわらかい"], ["UI"], "ポインターへボタンが小さく引かれ、離れると基準位置へ戻る。", "Pulls a button subtly toward the pointer and returns it on leave.", { focus: "ボタン中心とポインターの差分に比例して移動し、最大距離で必ず制限される。", focusEn: "Button offset follows pointer distance proportionally and is clamped to a safe maximum.", caution: "追従量が大きいと押したい位置から逃げるため、半径と移動量を小さく制限する。", cautionEn: "Large attraction makes the target evade the click, so clamp radius and travel tightly.", recipe: "Pointer delta×0.18 clamped ±12px / leave spring back 420ms", curve: "out", accent: "cyan" }),
  referenceMotion("pointer-tilt", "web-interaction", "ポインターチルト", "Pointer Tilt", "pointerTilt", 1800, "easeOutCubic", ["なめらか"], ["UI", "3D"], "カード上のポインター位置からX・Y軸の傾きを計算し、立体感を返す。", "Maps pointer position over a card to X and Y rotation.", { focus: "四隅へ近づくほど傾きが増え、中央では回転がゼロに戻って面が正対する。", focusEn: "Tilt increases toward each corner and returns to zero when the pointer reaches center.", caution: "角度を強くすると文字が歪むため、実用UIでは3〜8度程度に抑える。", cautionEn: "Strong angles distort content, so keep practical UI tilt around three to eight degrees.", recipe: "rotateX map(y,-6→6deg); rotateY map(x,6→-6deg); perspective(500px)", curve: "out", accent: "purple" }),
  referenceMotion("cursor-follow", "web-interaction", "カーソル追従", "Cursor Follow", "cursorFollow", 850, "easeOutCubic", ["やわらかい"], ["UI", "3D"], "複数の点が時間差でポインターを追い、滑らかな軌跡を見せる。", "Uses delayed points to form a smooth trail behind the pointer.", { focus: "先頭が入力位置へ最短で追従し、後方ほど遅れと縮小が大きくなる。", focusEn: "The leader tracks input directly while later dots use more delay and smaller scale.", caution: "標準カーソルを完全に隠すと操作位置を失うため、代替カーソルの視認性を保証する。", cautionEn: "Hiding the system cursor can obscure position, so the replacement must remain clearly visible.", recipe: "Trail points lerp 0.32/0.22/0.14/0.09 toward pointer each frame", curve: "out", accent: "cyan" }),
  referenceMotion("drag-inertia", "web-interaction", "ドラッグ慣性", "Drag Inertia", "dragInertia", 1000, "easeOutQuart", ["重い"], ["UI", "3D"], "ドラッグを離した速度を引き継ぎ、抵抗を受けながら自然に停止する。", "Carries release velocity into a decelerating inertial glide.", { focus: "離した瞬間の進行方向と速度を保ち、境界を越えずに徐々に停止する。", focusEn: "Release direction and velocity continue, then decay without leaving the allowed bounds.", caution: "停止距離が予測できないと誤操作になるため、抵抗値と境界を明確に設定する。", cautionEn: "Unpredictable stopping distance causes errors, so define resistance and bounds explicitly.", recipe: "velocityX at pointerup → x+=v; v*=.88 per frame; clamp to bounds", curve: "out", accent: "coral" }),
  referenceMotion("click-ripple", "web-interaction", "クリックリップル", "Click Ripple", "clickRipple", 650, "easeOutCubic", ["きびきび"], ["UI"], "クリック位置から波紋を広げ、入力を受け取った場所を即座に示す。", "Expands a ripple from the click point to confirm the exact input location.", { focus: "波紋の中心が入力座標と一致し、ボタン外周を越えるまで広がって透明になる。", focusEn: "The ripple origin matches the input coordinates and fades after crossing the control edge.", caution: "結果が遅い処理では波紋だけで完了を示さず、別の進行表示へ引き継ぐ。", cautionEn: "For slow operations, a ripple confirms input only and must hand off to progress feedback.", recipe: "::after at pointer localXY; scale 0→3.2・opacity .7→0 / 650ms", curve: "out", accent: "cyan" }),
  referenceMotion("toggle-morph", "web-interaction", "トグルモーフ", "Toggle Morph", "toggleMorph", 480, "easeOutBack", ["弾む"], ["UI"], "ノブの移動と色・記号の変化を同期し、オンとオフを切り替える。", "Synchronizes knob travel, color, and icon changes between off and on.", { focus: "ノブが反対側へ移る中間で背景色が変わり、終端でチェック形状が確定する。", focusEn: "Background color changes mid-travel and the check state resolves at the end.", caution: "アニメーションだけで状態を伝えず、色・位置・ラベル・ARIA状態を一致させる。", cautionEn: "Do not rely on motion alone; keep color, position, label, and ARIA state aligned.", recipe: "Knob X0→28・Scale 1→.86→1 / track color swap at 45% / 480ms", curve: "outBack", accent: "yellow" }),
  referenceMotion("accordion-open", "web-interaction", "アコーディオン展開", "Accordion Open", "accordionOpen", 1600, "easeInOutCubic", ["なめらか"], ["UI", "テキスト"], "見出しの直下に内容領域を開き、同じ場所で詳細を読めるようにする。", "Opens content directly beneath its heading for in-place detail reading.", { focus: "内容のマスク高さと透明度が増え、下の項目は一つのまとまりとして押し下がる。", focusEn: "Content mask and opacity expand while lower items move down as one layout group.", caution: "固定heightでは内容量の変化に弱いため、実寸を測るかgridの行サイズを使う。", cautionEn: "Fixed height breaks with variable content, so measure it or animate a grid row track.", recipe: "CSS grid-template-rows:0fr→1fr; inner overflow:hidden / 620ms", curve: "inOut", accent: "purple" }),

  referenceMotion("shared-element", "web-layout", "共有要素トランジション", "Shared Element", "sharedElement", 850, "easeInOutCubic", ["なめらか"], ["UI", "3D"], "一覧の要素を詳細画面の主役へ連続的に拡大し、文脈を保つ。", "Carries an item from a list into the detail hero while preserving context.", { focus: "同じ色と形の要素が位置・大きさ・角丸を連続変化させ、別要素に切れない。", focusEn: "The same colored shape changes position, size, and radius without visually breaking identity.", caution: "遷移前後で同じ識別名を複数へ付けると対応が曖昧になるため一意に保つ。", cautionEn: "Duplicate transition names create ambiguous matches, so keep shared identities unique.", recipe: "View Transition: view-transition-name:hero-card; old/new snapshots 850ms", curve: "inOut", accent: "cyan" }),
  referenceMotion("view-crossfade", "web-layout", "ビュークロスフェード", "View Crossfade", "viewCrossfade", 520, "easeInOutCubic", ["やわらかい"], ["UI", "テキスト"], "古い画面と新しい画面を重ね、短い透明度変化で状態を切り替える。", "Overlaps old and new views and swaps them with a short crossfade.", { focus: "旧ビューが薄くなるのと新ビューが濃くなる時間が重なり、空白フレームを作らない。", focusEn: "Old and new opacity overlap so the transition never produces an empty frame.", caution: "両画面の情報密度が高いと交差中に読みにくいため、時間を短く保つ。", cautionEn: "Dense views become unreadable while overlapped, so keep the crossfade brief.", recipe: "::view-transition-old(root) opacity 1→0 / new(root) 0→1 / 520ms", curve: "inOut" }),
  referenceMotion("flip-reorder", "web-layout", "FLIP並べ替え", "FLIP Reorder", "flipReorder", 760, "easeInOutCubic", ["なめらか"], ["UI"], "並べ替え前後の位置差を反転適用し、カードが新しい場所へ移る過程を見せる。", "Animates cards into reordered positions using the FLIP technique.", { focus: "各カードが自分の旧位置から新位置へ移り、途中で要素同士の対応を失わない。", focusEn: "Every card travels from its own old position to its new one without losing identity.", caution: "DOM更新後に最終位置を測り、transformだけで差分を戻さないとレイアウトが二重に動く。", cautionEn: "Measure the final layout after DOM changes and animate only inverse transforms to avoid double movement.", recipe: "First rect → DOM reorder → Last rect → Invert translate(delta) → Play to 0", curve: "inOut", accent: "yellow" }),
  referenceMotion("modal-morph", "web-layout", "モーダルモーフ", "Modal Morph", "modalMorph", 700, "easeInOutCubic", ["なめらか"], ["UI"], "押したカードをダイアログの面へ拡大し、起点とのつながりを示す。", "Expands the selected card into a dialog surface to preserve its origin.", { focus: "小さなカードの角丸と位置が変化し、背景オーバーレイと同期して中央の面になる。", focusEn: "The small card changes position and radius into a centered surface as the overlay appears.", caution: "モーダル表示後は視覚効果とは別にフォーカスを内部へ移し、背景操作を無効化する。", cautionEn: "After opening, move focus into the dialog and disable background interaction independently of visuals.", recipe: "Card rect→Dialog rect FLIP; radius 12→18; backdrop opacity 0→65% / 700ms", curve: "inOut", accent: "coral" }),
  referenceMotion("tab-indicator", "web-layout", "タブインジケーター", "Tab Indicator", "tabIndicator", 520, "easeOutCubic", ["きびきび"], ["UI"], "選択線を現在タブから次のタブへ伸縮移動し、選択変更をつなげる。", "Moves and resizes the selection line between tabs as one continuous object.", { focus: "インジケーターが一度横へ伸び、移動先の文字幅に合わせて縮んで停止する。", focusEn: "The indicator stretches toward the next tab, then contracts to its label width.", caution: "選択状態は線だけに依存せず、文字色とARIA selectedも同時に更新する。", cautionEn: "Do not rely on the line alone; update text styling and ARIA selected together.", recipe: "Indicator centre HOME→WORK; scaleX .7→2.1→.73 (label widths) / 520ms", curve: "out", accent: "cyan" }),
  referenceMotion("filter-reflow", "web-layout", "フィルター再配置", "Filter Reflow", "filterReflow", 820, "easeInOutCubic", ["なめらか"], ["UI"], "絞り込みで残るカードを空いた場所へ移し、結果の関係を追いやすくする。", "Moves remaining cards into filtered gaps so result relationships stay trackable.", { focus: "消える項目が縮小した後、残る項目が旧位置から新しいグリッドへ滑らかに移る。", focusEn: "Removed items shrink first, then remaining cards travel from old positions into the new grid.", caution: "大量要素の全位置計測は負荷が高いため、表示範囲やバッチ単位に限定する。", cautionEn: "Measuring many elements is expensive, so limit FLIP work to visible items or batches.", recipe: "Capture visible rects → filter DOM → animate inverse XY and scale / 820ms", curve: "inOut", accent: "purple" }),
  referenceMotion("route-slide", "web-layout", "ルートスライド", "Route Slide", "routeSlide", 600, "easeInOutCubic", ["きびきび"], ["UI", "テキスト"], "進む画面と戻る画面を左右方向で切り替え、ナビゲーション階層を示す。", "Slides route views by direction to communicate forward and back hierarchy.", { focus: "進む場合は新画面が右から入り、戻る場合は逆方向へ同じ距離で再生される。", focusEn: "Forward navigation enters from the right and back navigation reverses the same path.", caution: "デスクトップの無関係なページ遷移まで横移動にすると、空間モデルが不自然になる。", cautionEn: "Using directional slides for unrelated desktop routes creates a false spatial model.", recipe: "Old X0→-18% opacity1→.4 / New X100%→0 / direction type / 600ms", curve: "inOut", accent: "cyan" }),
  referenceMotion("page-wipe", "web-layout", "ページワイプ", "Page Wipe", "pageWipe", 780, "easeInOutQuint", ["きびきび"], ["UI", "ロゴ"], "色面で旧画面を覆い、その背後で新画面へ切り替えてから面を抜く。", "Covers the old page with a color panel, swaps to the new page behind it, then pulls the panel away.", { focus: "カバーが全面を覆う瞬間に内容が切り替わり、旧画面と新画面が直接混ざらない。", focusEn: "Content swaps only when the cover fills the viewport, preventing old and new views from mixing.", caution: "カバー時間が長いと情報を隠し続けるため、全面状態は数フレームだけにする。", cautionEn: "A long full cover hides content, so keep the completely covered phase to only a few frames.", recipe: "Cover scaleX 0→1 / DOM swap at 50% / origin left→right / scaleX 1→0 / 780ms", curve: "inOut", accent: "coral" }),

  referenceMotion("skeleton-shimmer", "web-feedback", "スケルトンシマー", "Skeleton Shimmer", "skeletonShimmer", 1200, "linear", ["やわらかい"], ["UI", "テキスト"], "内容と近い骨格の上を光帯が流れ、読み込み中であることを示す。", "Moves a light band across a content-shaped skeleton while loading.", { focus: "固定された骨格の上だけを低コントラストの光帯が一定速で横切る。", focusEn: "A low-contrast light band crosses a stable content-shaped skeleton at constant speed.", caution: "実データと形が大きく違うと読み込み完了時のレイアウトシフトが目立つ。", cautionEn: "A skeleton unlike the real content makes layout shift obvious when data arrives.", recipe: "background-position -200%→200%; linear-gradient shimmer / 1200ms loop", curve: "linear" }),
  referenceMotion("spinner-arc", "web-feedback", "スピナーアーク", "Spinner Arc", "spinnerArc", 900, "linear", ["きびきび"], ["UI"], "欠けた円弧を一定速で回し、終了時刻が未確定の処理を示す。", "Rotates an open arc to represent work with an unknown completion time.", { focus: "円弧の長さを保ったまま中心軸で一定回転し、進捗率の数値は示さない。", focusEn: "The arc retains its length and rotates steadily without implying a numeric completion value.", caution: "完了率が分かる処理では不定スピナーより進捗バーや数値表示を優先する。", cautionEn: "When completion is measurable, prefer determinate progress over an indefinite spinner.", recipe: "border-top-color accent; rotate(0→360deg) linear 900ms infinite", curve: "linear", accent: "cyan" }),
  referenceMotion("progress-fill", "web-feedback", "進捗バー", "Progress Fill", "progressFill", 1300, "easeInOutCubic", ["なめらか"], ["UI"], "処理の完了率に合わせ、横バーを左から右へ伸ばす。", "Fills a horizontal bar from left to right according to real completion.", { focus: "バーの長さと数値が同じ進捗を示し、完了時に100%で静止する。", focusEn: "Bar length and numeric value agree, then settle at one hundred percent on completion.", caution: "実測値が戻る場合は視覚バーを逆行させず、再計算中であることを別に示す。", cautionEn: "If raw progress regresses, avoid jarring reverse motion and explain recalculation separately.", recipe: "transform scaleX(progress/100); transition 180ms linear; aria-valuenow sync", curve: "inOut", accent: "cyan" }),
  referenceMotion("circular-progress", "web-feedback", "円形進捗", "Circular Progress", "circularProgress", 1400, "easeInOutCubic", ["なめらか"], ["UI"], "円周の描画量を増やし、限られた面積で完了率を示す。", "Increases a circular stroke to show determinate progress in compact space.", { focus: "12時位置から円周が一方向へ伸び、中心の数値と同時に完了へ到達する。", focusEn: "The stroke grows from twelve o'clock and reaches completion with the center value.", caution: "小さい円では細かな差が読めないため、数値や状態ラベルを併記する。", cautionEn: "Small rings cannot communicate fine differences, so include a number or state label.", recipe: "SVG stroke-dashoffset circumference→0; rotate(-90deg); 1400ms", curve: "inOut", accent: "yellow" }),
  referenceMotion("loading-dots", "web-feedback", "ローディングドット", "Loading Dots", "loadingDots", 900, "easeInOutSine", ["やわらかい"], ["UI", "テキスト"], "3点を順番に上下・明滅させ、短い待機状態をコンパクトに示す。", "Moves three dots up and down and blinks them in turn to show a short wait compactly.", { focus: "同じ振幅の山が左から右へ移り、三点すべてが基準位置へ戻る瞬間がある。", focusEn: "One equal-amplitude wave travels left to right and all dots periodically return to rest.", caution: "長時間の処理では進み具合が分からないため、説明文や進捗表示へ切り替える。", cautionEn: "For long tasks, dots give no progress information, so switch to status text or determinate feedback.", recipe: "Dots Y0→-9→0・opacity .35→1→.35 / stagger 110ms / 900ms", curve: "inOut", accent: "purple" }),
  referenceMotion("count-up", "web-feedback", "カウントアップ", "Count Up", "countUp", 1000, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "数値を目標値まで増加させ、結果の更新や達成を強調する。", "Increments a value toward its target to emphasize an updated result.", { focus: "桁位置を固定したまま数値だけが上方向へ切り替わり、目標値で完全に停止する。", focusEn: "Digits change upward within fixed-width positions and stop completely at the target value.", caution: "重要な金額や計測値は最終値を即座に利用できるよう、アニメーション中も読み上げを配慮する。", cautionEn: "For critical amounts or metrics, expose the final value immediately and manage screen-reader announcements.", recipe: "requestAnimationFrame: value=easeOut(progress)×target; tabular-nums / 1000ms", curve: "out", accent: "cyan" }),
  referenceMotion("chart-draw", "web-feedback", "チャート描画", "Chart Draw", "chartDraw", 1200, "easeOutCubic", ["なめらか"], ["UI", "3D"], "折れ線を左から右へ描き、データの時間方向と変化を順に見せる。", "Draws a line chart left to right to reveal change over time.", { focus: "線端が時間軸に沿って進み、最後の点へ到着すると全体の形が読み取れる。", focusEn: "The line head advances along the time axis and resolves the complete shape at the final point.", caution: "描画順がデータの意味と無関係な場合は、比較を遅らせるだけなので即時表示を選ぶ。", cautionEn: "If reveal order has no data meaning, animation only delays comparison and should be skipped.", recipe: "SVG pathLength=1; stroke-dasharray:1; dashoffset 1→0 / 1200ms", curve: "out", accent: "cyan" }),
  referenceMotion("toast-stack", "web-feedback", "トーストスタック", "Toast Stack", "toastStack", 900, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "通知を端から順に積み、既存通知を押し上げながら追加を伝える。", "Adds notifications from an edge while shifting existing toasts as a stack.", { focus: "新しい通知が下から入り、前の通知は間隔を保って一段ずつ上へ移動する。", focusEn: "A new toast enters from below while existing messages move up by one consistent step.", caution: "通知が多い場合は無制限に積まず、件数をまとめて履歴へ移動できるようにする。", cautionEn: "Do not stack unlimited messages; collapse excess and provide a notification history.", recipe: "New toast Y+24→0 opacity0→1; existing Y0→-42 / stagger 55ms / 900ms", curve: "out", accent: "coral" })
];

const guide = (focus, focusEn, caution, cautionEn, tips, tipsEn, recipe) => ({
  focus, focusEn, caution, cautionEn,
  tips: tips.split("｜"),
  tipsEn: tipsEn.split("|"),
  recipe
});

const MOTION_GUIDES = {
  "fade-slide": guide(
    "透明度が上がるのと短い上昇が同時に終わり、静かに定位置へ収まる。",
    "Opacity and a short rise finish together, settling quietly into place.",
    "移動を大きくすると、自然な出現ではなく画面内を飛んでくる印象になる。",
    "Too much travel makes it feel like an object flying across the screen.",
    "移動量は12〜32pxから試す｜位置と不透明度の終了フレームを揃える｜停止側の速度をゆるやかにする",
    "Start with 12–32px of travel|End position and opacity on the same frame|Ease more strongly near the finish",
    "0ms  Y+24・Opacity 0% / 600ms  Y0・Opacity 100%"
  ),
  "mask-wipe": guide(
    "要素自体は動かず、隠している面の境界だけが一方向へ抜けていく。",
    "The content stays still while the covering edge travels in one direction.",
    "隠す面が背景色と合わないと、マスクではなく色板が動いて見える。",
    "If the cover does not match the background, it reads as a moving panel.",
    "背景と同色のカバーを重ねる｜境界線で進行方向を明確にする｜文字では行の流れに方向を合わせる",
    "Match the cover to the background|Use the leading edge to clarify direction|Align text reveals with reading flow",
    "0ms  Cover X 0% / 700ms  Cover X 115%"
  ),
  "iris-open": guide(
    "中心から円形の表示範囲が広がり、視線が最初の一点へ集まる。",
    "A circular reveal grows from the center and anchors attention there first.",
    "画面端まで大きく開く用途では、円が必要以上に拡大して急に感じやすい。",
    "Covering a wide rectangle can require an oversized circle that feels abrupt.",
    "注目点をマスク中心に置く｜円マスクは0%から外周を越えるまで広げる｜必要なら境界を1〜2pxぼかす",
    "Place the subject at the mask center|Expand from 0% beyond the outer corners|Add only 1–2px of feather if needed",
    "0ms  Circle Mask 0% / 760ms  Circle Mask 150%"
  ),
  "soft-rise": guide(
    "上昇中にぼけと透明感が解け、停止する頃には輪郭が完全に戻る。",
    "Blur and transparency resolve during the rise and finish at the settle.",
    "大きなブラーは文字を読みにくくし、ブラウザや端末の描画負荷も上げる。",
    "Heavy blur reduces text readability and increases rendering cost.",
    "Y移動は16〜28pxに抑える｜ブラーは4〜10pxから始める｜輪郭の解像を停止より少し早めてもよい",
    "Keep Y travel around 16–28px|Start blur around 4–10px|Blur may resolve just before the position settles",
    "0ms  Y+24・Blur 8・Opacity 0% / 900ms  Y0・Blur 0・Opacity 100%"
  ),
  "snap-in": guide(
    "ゴール直前の短い距離だけを高速で詰め、入力への即応感を出す。",
    "A short final gap closes quickly to create an immediate response.",
    "長距離を同じ速度で動かすと、スナップではなく単なる高速スライドになる。",
    "Using the same timing over a long distance turns it into a fast slide.",
    "移動量は要素幅の0.5〜1.5倍にする｜300〜450msを目安にする｜停止位置をピクセル単位で揃える",
    "Travel roughly 0.5–1.5 object widths|Aim for 300–450ms|Land on an exact pixel-aligned position",
    "0ms  X-43・Opacity 0% / 380ms  X0・Opacity 100%"
  ),
  "split-reveal": guide(
    "中央で接していた2枚のカバーが左右対称に開き、中心の要素が現れる。",
    "Two covers touching at center open symmetrically to reveal the subject.",
    "非対称なレイアウトに使うと、中央線だけが不自然に強調されやすい。",
    "On asymmetric layouts, the center seam can feel unnecessarily prominent.",
    "左右カバーの速度と距離を揃える｜中心線を見せる時間は短くする｜ロゴの中心と分割線を合わせる",
    "Match both cover speeds and distances|Keep the center seam brief|Align the split with the logo center",
    "0ms  Left/Right Cover 0 / 720ms  X -105% / +105%"
  ),
  "trail-exit": guide(
    "本体が先行し、薄い複製が少しずつ遅れて同じ方向へ抜ける。",
    "The main object leads while faint copies leave in the same direction with delay.",
    "残像の枚数や濃度が多いと、輪郭がにじみ速度よりノイズが目立つ。",
    "Too many or too-opaque trails create noise instead of speed.",
    "複製は2〜4枚に絞る｜間隔は2〜4フレームにする｜後ろの残像ほど小さく薄くする",
    "Use only 2–4 copies|Offset each by 2–4 frames|Make later trails smaller and fainter",
    "Main + 3 copies / Delay 32ms each / X 0→175・Opacity 100→0%"
  ),
  "collapse-away": guide(
    "下端を基準に高さが畳まれ、同時に透明になってその場から消える。",
    "Height folds toward the bottom anchor while opacity fades in place.",
    "基準点が中央のままだと上下から潰れ、収納先との関係が伝わりにくい。",
    "A centered anchor collapses from both sides and weakens spatial meaning.",
    "収納方向にアンカーポイントを置く｜Scale YとOpacityを同時に下げる｜終了直前に高さを完全な0へしない",
    "Place the anchor toward the storage direction|Reduce Scale Y and opacity together|Avoid a literal zero scale until the end",
    "0ms  Anchor Bottom・ScaleY 100・Opacity 100% / 560ms  ScaleY 5・Opacity 0%"
  ),
  "linear-travel": guide(
    "開始から終了まで速度が変わらず、等間隔で位置が進み続ける。",
    "Position advances at a constant rate with no acceleration or deceleration.",
    "人が直接操作したUIでは機械的に見え、停止時の衝撃も強く感じやすい。",
    "In directly manipulated UI it can feel mechanical and stop too abruptly.",
    "キーフレーム間をLinearにする｜ループする搬送や計測表現に使う｜停止が必要なら別動作で減速を足す",
    "Set interpolation to Linear|Use for conveyors, scans, or constant loops|Add a separate deceleration when it must stop",
    "0ms  X0 / 800ms  X+180  (Linear)"
  ),
  "smooth-arrival": guide(
    "出発と到着の両端で速度が落ち、中間だけが最も速くなる。",
    "Speed is low at both ends and reaches its maximum near the middle.",
    "短すぎる時間に強いイーズを入れると、中間だけが瞬間移動のように見える。",
    "Strong easing in too little time makes the middle feel like a jump.",
    "始点と終点のハンドルを対称から試す｜距離に応じて時間を伸ばす｜停止後の揺れは加えない",
    "Start with symmetric handles|Increase duration with travel distance|Do not add a settle unless the design calls for it",
    "0ms  X0 / 760ms  X+180  (Ease In-Out)"
  ),
  "arc-travel": guide(
    "中間で高さが最大になる弧を通り、直線より生き物らしい軌跡を描く。",
    "The path reaches its highest point at mid-motion, creating a more organic arc.",
    "小さなUI移動で弧を大きくすると、目的地への最短経路が分かりにくくなる。",
    "A large arc in compact UI obscures the shortest path to the target.",
    "始点・頂点・終点の3点でパスを作る｜頂点は時間の45〜55%に置く｜必要なら接線方向へ回転させる",
    "Build the path from start, apex, and end|Place the apex around 45–55%|Rotate toward the tangent when orientation matters",
    "0ms  X0/Y0 / 400ms  X90/Y-70 / 800ms  X180/Y0"
  ),
  "anticipation-move": guide(
    "本動作の前に進行方向と逆へ少し引き、次の大きな移動を予告する。",
    "A small move opposite the destination previews the larger action to follow.",
    "予備動作が大きい、または長いと、ユーザーは逆方向へ動いたと誤認する。",
    "A large or slow anticipation can be mistaken for movement in the wrong direction.",
    "逆移動は本動作の5〜15%にする｜全体時間の15〜25%以内で切り返す｜切り返しフレームで速度を止めすぎない",
    "Keep reverse travel to 5–15%|Reverse within 15–25% of total time|Do not fully stall at the change of direction",
    "0ms  X0 / 148ms  X-25 / 820ms  X+135"
  ),
  "heavy-stop": guide(
    "到着時に進行方向へ潰れ、その後の小さな戻りと揺れで重さを受け止める。",
    "The object compresses on arrival, then a small settle absorbs its weight.",
    "軽いアイコンに強い潰れや揺れを使うと、見た目の材質と動きが矛盾する。",
    "Strong compression on a light icon conflicts with its apparent material.",
    "接地直後だけScale Xを縮める｜揺れは2〜3回で急速に減衰させる｜移動の終点は動かさない",
    "Compress Scale X only on impact|Decay the shake within 2–3 beats|Keep the final position fixed during the settle",
    "0ms  X0 / 462ms  X182・Scale 82/118 / 680ms  X175・Scale 100/100"
  ),
  "follow-path": guide(
    "曲線上の位置だけでなく、進行方向の接線に合わせて向きも変化する。",
    "Both position and orientation follow the tangent of the curved path.",
    "パスの折れや接線の急変は、向きが瞬間的に跳ねる原因になる。",
    "Sharp path corners or tangent changes cause sudden orientation jumps.",
    "ベジェパスを滑らかにつなぐ｜Auto-Orientを有効にする｜終点の向きを先に決めてハンドルを調整する",
    "Use a smooth Bezier path|Enable Auto-Orient|Set the final orientation before tuning handles",
    "0ms  Path 0%・Rotate -28° / 500ms  50%・0° / 1000ms  100%・28°"
  ),
  "stagger-follow": guide(
    "同じ動きをする複数要素が一定間隔で遅れ、先頭から後方へ流れが生まれる。",
    "Repeated elements follow with fixed delays, creating flow from first to last.",
    "間隔が広すぎると一つのまとまりではなく、別々のイベントに見える。",
    "Too much delay makes the elements feel like separate events.",
    "遅延は30〜80msから試す｜移動距離とイーズは全要素で揃える｜最後の要素まで含めて総時間を確認する",
    "Start with 30–80ms delay|Keep distance and easing consistent|Judge duration through the final element",
    "4 layers / X0→165 / Delay 55ms each / 900ms"
  ),
  "magnetic-snap": guide(
    "序盤は小さく進み、目標付近で一気に距離を詰めて少し通り越して戻る。",
    "Travel is small at first, closes the gap all at once near the target, overshoots slightly, then settles back.",
    "目標が見えていない状態で急加速すると、吸着ではなく不規則なジャンプに見える。",
    "Without a visible target, the late acceleration reads as an arbitrary jump.",
    "吸着先を輪郭やガイドで示す｜目標付近で移動割合を大きくする｜通り越し量は距離の5〜10%にする",
    "Show the target with an outline or guide|Allocate more travel near the target|Limit overshoot to 5–10% of distance",
    "0ms  X0 / 260ms  X36 / 484ms  X192 / 620ms  X175"
  ),
  "pop-scale": guide(
    "小さい状態から基準サイズを少し越え、短い戻りで100%へ収束する。",
    "Scale rises from a small state slightly past its base size, then a short return settles it at 100%.",
    "オーバー量が大きいと子ども向け・ゲーム向けの印象が強くなりやすい。",
    "A large overshoot quickly creates a playful or game-like tone.",
    "開始は0〜20%にする｜最大値は105〜118%から選ぶ｜戻りを全体の20〜30%に収める",
    "Start around 0–20%|Choose a peak around 105–118%|Reserve 20–30% of time for the settle",
    "0ms  Scale 5・Opacity 0% / 374ms  Scale 116 / 520ms  Scale 100"
  ),
  "breathing": guide(
    "基準サイズの前後をゆっくり往復し、停止中の要素に小さな生命感を加える。",
    "Scale drifts slowly around the base size, adding subtle idle life.",
    "常設UIで大きく呼吸させると注意を奪い続け、操作対象と誤解される。",
    "Large breathing on persistent UI steals attention and suggests interactivity.",
    "振幅は94〜106%程度から始める｜拡大と縮小の時間を対称にする｜長時間表示ではさらに振幅を下げる",
    "Start around 94–106%|Use symmetric expand and contract timing|Reduce amplitude for long-running idle states",
    "0ms  Scale 94 / 600ms  Scale 106 / 1200ms  Scale 94  (Loop)"
  ),
  "elastic-scale": guide(
    "大きく越えた後、上下の反動幅を小さくしながら100%へ収束する。",
    "Alternating overshoots shrink progressively until scale settles at 100%.",
    "反動の幅や周期が一定だと、減衰せず振動し続けるように見える。",
    "Constant amplitude or spacing makes it look like endless vibration.",
    "反動ごとに振幅を半分程度へ減らす｜反動間隔も少し短くする｜最後の変化は2〜3%以内にする",
    "Reduce amplitude by roughly half each beat|Shorten the spacing slightly|Keep the final correction within 2–3%",
    "0ms  S10 / 405ms  S120 / 612ms  S92 / 756ms  S106 / 900ms  S100"
  ),
  "axis-stretch": guide(
    "移動方向へ長く、直交方向へ短く変形し、速度のピークを形で強調する。",
    "The form stretches along travel and compresses across it at peak speed.",
    "写真・文字・硬い製品など、変形しない素材に使うと材質感を壊す。",
    "Using it on photos, text, or rigid objects breaks their material quality.",
    "速度の最大点で最も伸ばす｜面積が大きく変わらない比率にする｜始点と終点では100%へ戻す",
    "Stretch most at peak velocity|Keep approximate area consistent|Return to 100% at both ends",
    "0ms  X10・S100/100 / 350ms  X95・S170/65 / 700ms  X175・S100/100"
  ),
  "pulse-focus": guide(
    "本体はほぼ固定され、外周リングだけが広がりながら薄くなって注目点を示す。",
    "The object stays nearly still while a ring expands and fades around it.",
    "短い間隔で繰り返すと通知や警告のように強く見え、集中を妨げる。",
    "Frequent repetition feels like an alert and becomes distracting.",
    "リングは本体より少し小さく開始する｜拡大と同時にOpacityを0へする｜通常UIでは1〜2回で止める",
    "Start the ring slightly smaller than the object|Fade to zero while expanding|Limit normal UI use to one or two pulses",
    "0ms  Ring S50・Opacity 80% / 680ms  Ring S240・Opacity 0%"
  ),
  "depth-zoom": guide(
    "小さくぼけた状態から手前へ大きくなり、奥行き方向の接近を感じさせる。",
    "A small blurred object grows toward the viewer, suggesting depth travel.",
    "大きな拡大や画面全体の連続ズームは、酔いや方向感覚の喪失につながる。",
    "Large or repeated full-screen zooms can cause discomfort and disorientation.",
    "ScaleとBlurを同じ終点で解消する｜中心点を注目対象に固定する｜画面全体では移動量を抑える",
    "Resolve scale and blur together|Keep the zoom centered on the subject|Reduce travel for full-screen use",
    "0ms  Scale 15・Blur 6・Opacity 20% / 740ms  Scale 135・Blur 0・Opacity 100%"
  ),
  "soft-shrink": guide(
    "中心位置を保ったまま小さく薄くなり、周囲の注意を奪わず退場する。",
    "The object shrinks and fades around a fixed center for a quiet exit.",
    "削除や重大な状態変化に使うと、変化が控えめすぎて見落とされる。",
    "For deletion or major state changes, it may be too subtle to notice.",
    "アンカーポイントを中央に置く｜ScaleとOpacityを同時に下げる｜Ease Inで後半を速くする",
    "Use a centered anchor|Reduce scale and opacity together|Use Ease In to accelerate the exit",
    "0ms  Scale 100・Opacity 100% / 600ms  Scale 20・Opacity 0%"
  ),
  "impact-squash": guide(
    "落下の接地フレームで縦に潰れ横へ広がり、すぐ元の形へ戻る。",
    "At contact, the object compresses vertically, widens, then restores its shape.",
    "接地前から潰す、または潰れた時間が長いと、衝撃ではなく変形に見える。",
    "Squashing before contact or holding it too long reads as deformation, not impact.",
    "接地位置を先に固定する｜縦縮小と横拡大で体積を保つ｜潰れは1〜3フレーム程度に集中させる",
    "Lock the contact point first|Balance vertical compression with horizontal stretch|Concentrate the squash into 1–3 frames",
    "0ms  Y-90・S100/100 / 403ms  Ground・S155/55 / 620ms  Ground・S100/100"
  ),
  "simple-turn": guide(
    "固定した軸を中心に、開始と終了でゆっくり、中間で速く180度回る。",
    "The object rotates 180° around a fixed axis, slow at both ends and fast midway.",
    "円や対称形では回転が見えないため、向きを示す形や模様が必要になる。",
    "Rotation is invisible on a plain circle or symmetric form without orientation cues.",
    "非対称な輪郭か目印を加える｜回転軸を固定する｜開始角と終了角を意味のある向きに揃える",
    "Use an asymmetric shape or marker|Keep the pivot fixed|Choose meaningful start and end angles",
    "0ms  Rotation 0° / 700ms  Rotation 180°  (Ease In-Out)"
  ),
  "spin-stop": guide(
    "高速回転から徐々に減速し、指定した角度へずれなく止まる。",
    "A fast spin decelerates and lands precisely on the intended angle.",
    "停止角が中途半端だと、ロゴやアイコンの向きが崩れて未完成に見える。",
    "An imprecise final angle leaves logos and icons looking unfinished.",
    "回転数を整数で決める｜終点の角度を先に固定する｜最後の20〜30%で減速を目立たせる",
    "Choose a whole number of turns|Lock the final angle first|Make deceleration visible in the final 20–30%",
    "0ms  Rotation 0° / 850ms  Rotation 720°  (Ease Out)"
  ),
  "wobble": guide(
    "上の支点から左右へ振れ、角度の振幅を小さくしながら垂直へ戻る。",
    "The object swings from an upper pivot and settles as angle amplitude decays.",
    "支点が中央だと振り子ではなく単なる回転に見え、重力感が失われる。",
    "A centered pivot reads as rotation rather than a gravity-driven pendulum.",
    "アンカーポイントを上部へ移す｜左右の角度を交互に小さくする｜下端の移動量で重さを調整する",
    "Move the anchor above the object|Alternate and reduce each angle|Tune weight through lower-edge travel",
    "0ms  -28° / 400ms  18° / 670ms  -8° / 1000ms  0°"
  ),
  "flip-card": guide(
    "Y軸の90度付近で表面が消え、その後に裏面が見えて状態が切り替わる。",
    "The front disappears near 90° on the Y axis, then the back completes the state change.",
    "90度付近で文字を読ませようとすると潰れて見え、表裏の情報も混ざりやすい。",
    "Text is unreadable edge-on, and front/back content can visually overlap.",
    "表裏にBackface Visibilityを設定する｜遠近感を弱く加える｜情報の切替は90度の瞬間に行う",
    "Hide each back face|Add modest perspective|Switch content at the 90° midpoint",
    "0ms  Y Rotation 0° / 380ms  90°・Content swap / 760ms  180°"
  ),
  "orbit": guide(
    "中心との距離を保ち、一定速度で楕円軌道を一周する。",
    "The object completes an ellipse at constant speed and radius around the center.",
    "周回を長時間続けると主役より動きが目立ち、前後関係も曖昧になりやすい。",
    "A continuous orbit can overpower the subject and blur front/back depth.",
    "中心点と半径を固定する｜Linearで周回速度を一定にする｜前後でサイズや明度を変えると奥行きが出る",
    "Keep center and radius fixed|Use Linear timing for constant orbit speed|Vary size or brightness for front/back depth",
    "0ms  Orbit 0° / 1100ms  Orbit 360°  (Linear Loop)"
  ),
  "tilt-reaction": guide(
    "入力方向へ短く傾き、すぐ基準角へ戻ることで操作を受け取ったことを示す。",
    "A brief directional tilt acknowledges input, then returns to neutral.",
    "入力と逆方向へ傾く、または戻りが遅いと、操作の因果関係が分かりにくい。",
    "Tilting opposite the input or settling slowly weakens cause and effect.",
    "押した方向と角度を一致させる｜最大角は8〜18度にする｜入力直後の100ms前後で反応を始める",
    "Match tilt direction to input|Use roughly 8–18°|Start the response within about 100ms",
    "0ms  Rotation 0° / 308ms  18° / 560ms  0°"
  ),
  "tumble-in": guide(
    "移動が先に終点へ近づき、回転が少し遅れて正しい向きへ収まる。",
    "Position nears its destination first, while rotation finishes slightly later.",
    "文字や説明要素を大きく回すと、移動中に読めず情報提示が遅れる。",
    "Large rotation on text delays readability during the entrance.",
    "移動と回転の終了を数フレームずらす｜回転数は形の複雑さに合わせる｜停止位置で角度だけを微調整する",
    "Offset position and rotation endings by a few frames|Match turn count to shape complexity|Correct only angle at the final position",
    "0ms  X0・Rotation -180° / 672ms  X175・-24° / 820ms  X175・0°"
  ),
  "counter-rotate": guide(
    "外側と内側が同じ中心で反対方向へ回り、全体の中心を保ったまま複雑さを出す。",
    "Outer and inner parts rotate oppositely around one center, preserving balance.",
    "速度や大きさが同じすぎると打ち消し合い、どちらが主動作か分からなくなる。",
    "Equal visual weight and speed can cancel out and hide the primary motion.",
    "親子のアンカーポイントを一致させる｜回転方向を反転する｜内側の明度かサイズを下げて主従を作る",
    "Align parent and child anchors|Reverse one rotation direction|Reduce inner size or contrast to establish hierarchy",
    "Outer 0→360° / Inner 0→-360° / 1000ms"
  ),
  "overshoot": guide(
    "目標位置を少し越えた後、短い戻りで正しい位置へ収束する。",
    "The object passes its target slightly, then returns in a shorter settle.",
    "通り越しが大きいと、操作精度が低い・制御できていない印象になる。",
    "Too much overshoot suggests poor control or inaccurate interaction.",
    "通り越しは移動量の5〜12%にする｜戻り時間は本動作より短くする｜小さい要素ほど反動を控える",
    "Overshoot by 5–12% of travel|Make the return shorter than the main move|Use less reaction on small elements",
    "0ms  X0 / 430ms  X108% / 600ms  X100%"
  ),
  "bounce-land": guide(
    "落下後の跳ね返りが回数ごとに低く短くなり、接地位置へ収束する。",
    "Each rebound becomes lower and shorter until the object settles on the ground.",
    "同じ高さで繰り返すと減衰がなく、着地ではなく永久に跳ねる物体に見える。",
    "Equal-height rebounds remove damping and feel like endless bouncing.",
    "接地フレームを固定する｜高さと間隔を同時に減らす｜通常は2〜3回の反動で終える",
    "Lock every contact frame|Reduce both height and spacing|Finish after two or three rebounds in most cases",
    "0ms  Y-130 / 266ms  Ground / 392ms  Y-55 / 490ms  Ground / 574ms  Y-24 / 700ms  Ground"
  ),
  "spring-follow": guide(
    "先頭を追う要素が時間差で目標を越え、反動幅を減らしながら同じ位置へ集まる。",
    "Followers pass the target in sequence and converge as their reaction decays.",
    "遅延と反動が大きすぎると、つながりではなく別々の物体に見える。",
    "Too much delay or overshoot breaks the sense of connected parts.",
    "遅延は質量差として設計する｜後続ほどわずかに反動を小さくする｜最後は全要素の位置を揃える",
    "Treat delay as a mass difference|Slightly reduce reaction for later followers|Align every final position",
    "4 layers / Leader spring m1 k80 c10 / Followers k×5, damped link / Peak 196→193→190→188 / Settle 1.4s / Loop 1800ms"
  ),
  "rubber-band": guide(
    "引かれた方向へ横に伸び、反対側へ縮んだ後、小さな反動で元の比率へ戻る。",
    "The form stretches toward the pull, compresses past neutral, then settles.",
    "横だけを大きく伸ばすと体積が増えて見え、ゴムより液体のようになる。",
    "Stretching only one axis makes volume grow and can feel liquid rather than elastic.",
    "伸びる軸と直交軸を逆比率で調整する｜反動ごとに振幅を減らす｜アンカーを引かれていない側へ寄せる",
    "Counter-scale the perpendicular axis|Reduce amplitude each beat|Anchor toward the unpulled side",
    "0ms  X45・SX100 / 378ms  X150・SX180 / 576ms  X82・SX72 / 900ms  X82・SX100"
  ),
  "recoil": guide(
    "強い前進の直後に短く後退し、少し戻して最終位置へ落ち着く。",
    "A strong forward move kicks back briefly, then settles near its final position.",
    "後退量が大きいと、反作用より操作の取り消しや失敗に見える。",
    "A large kickback reads as cancellation or failure instead of recoil.",
    "前進ピークを明確にする｜後退は前進量の10〜25%にする｜最後の戻りを最も短くする",
    "Make the forward peak clear|Limit kickback to 10–25% of travel|Make the final correction the shortest phase",
    "0ms  X42 / 260ms  X178 / 374ms  X148 / 520ms  X160"
  ),
  "double-bounce": guide(
    "大きい反動と小さい反動を2段階で見せ、2回目で完了位置へ収束する。",
    "One large and one small rebound lead into a clear completed state.",
    "反動回数が増えるほど完了が遅く見え、UIの応答性を損ないやすい。",
    "More rebounds delay perceived completion and hurt UI responsiveness.",
    "1回目と2回目の高さを明確に変える｜2回目の時間を短くする｜最後の接地位置を固定する",
    "Make the two rebound heights clearly different|Shorten the second rebound|Lock the final contact point",
    "0ms  Y-100 / 287ms  Ground / 426ms  Y-55 / 574ms  Ground / 681ms  Y-25 / 820ms  Ground"
  ),
  "snap-back": guide(
    "引き伸ばされた状態から高速で戻り、基準位置を少し越えて形も収束する。",
    "A stretched state snaps back quickly, passes neutral, and restores its form.",
    "引っ張られた原因が見えないと、突然逆方向へ飛ぶ不自然な動きになる。",
    "Without visible tension or drag, the reverse launch feels arbitrary.",
    "直前にドラッグや伸びを見せる｜戻り速度を引っ張りより速くする｜越えた後の修正を短くする",
    "Show the preceding drag or stretch|Return faster than the pull|Keep the post-neutral correction brief",
    "0ms  X180・SX150 / 364ms  X65・SX80 / 560ms  X82・SX100"
  ),
  "after-shake": guide(
    "衝撃直後の横揺れが左右交互に反転し、振幅を急速に小さくして止まる。",
    "A post-impact shake alternates left and right while amplitude decays quickly.",
    "画面全体や文字を強く揺らすと読みづらく、動きに敏感な人の負担にもなる。",
    "Strong shake on full screens or text hurts readability and motion comfort.",
    "最初の揺れを最大にする｜符号を交互にしながら距離を半減する｜重要UIでは揺れを小さく1回にする",
    "Make the first shake largest|Alternate direction while halving distance|Use one small shake for important UI",
    "0ms  X0 / 180ms  X+23 / 302ms  X-20 / 418ms  X+16 / 720ms  X0"
  ),
  "stagger-letters": guide(
    "文字が読む順番に少しずつ遅れて現れ、視線が単語の先頭から末尾へ流れる。",
    "Letters appear with small reading-order delays, guiding the eye across the word.",
    "長文や本文へ使うと表示完了が遅く、読者が待たされる。",
    "On long copy or body text, the reveal delays reading unnecessarily.",
    "遅延は20〜50msから試す｜各文字の移動量とOpacityを揃える｜単語全体の完了時間を1秒前後に収める",
    "Start with 20–50ms delay|Keep each letter's travel and opacity consistent|Finish the full word around one second",
    "Letters: Y+16→0・Opacity 0→100% / Delay 38ms / 900ms"
  ),
  "tracking-open": guide(
    "狭い字間から基準値へ広がり、文字列の輪郭と余白が徐々に整う。",
    "Tight tracking opens to its final value, gradually clarifying the word shape.",
    "日本語本文や小さい文字で字間を大きく変えると、単語として読みにくくなる。",
    "Large tracking changes reduce readability in Japanese body text or small type.",
    "見出し・ロゴの短い文字列に使う｜終了値を先に決める｜Opacityを少し併用して開始の詰まりを隠す",
    "Use on short headings or logos|Set the final tracking first|Add a slight opacity fade to soften the tight start",
    "0ms  Tracking -60・Opacity 25% / 760ms  Tracking 220・Opacity 100%"
  ),
  "type-mask": guide(
    "固定した行マスクの内側を文字が下から上へ通り、基準線で止まる。",
    "Text rises through a fixed line mask and stops on its baseline.",
    "マスクの高さが足りないと、濁点やディセンダーなど文字の一部が切れる。",
    "A short mask can clip accents, descenders, or Japanese marks.",
    "行高より少し大きいマスクを作る｜文字だけをY移動する｜複数行では行ごとにマスクを分ける",
    "Make the mask slightly taller than line height|Move only the text on Y|Use separate masks for multiple lines",
    "Line Mask fixed / 0ms  Text Y+LineHeight・Opacity 0% / 620ms  Y0・Opacity 100%"
  ),
  "word-swap": guide(
    "旧語が上へ抜けるのと同時に新語が下から入り、同じ基準線で置き換わる。",
    "The old word exits upward as the new one enters from below on the same baseline.",
    "語の幅や基準線が違うと、切替のたびに周辺レイアウトが跳ねる。",
    "Different word widths or baselines can shift the surrounding layout.",
    "表示枠の幅を固定する｜旧語と新語を反対方向へ同時に動かす｜交差中は両方のOpacityを調整する",
    "Use a fixed-width container|Move old and new words in opposite directions together|Cross-fade during the overlap",
    "Old: Y0→-Line・Opacity 100→0% / New: Y+Line→0・Opacity 0→100% / 700ms"
  ),
  "kinetic-emphasis": guide(
    "一語だけが一度大きくなって少し戻り、文章内の意味上のアクセントを作る。",
    "One word scales up once and settles, adding semantic emphasis within a phrase.",
    "Font Sizeを変えると行組みが動き、周囲の文字まで揺れて読みにくくなる。",
    "Animating font size reflows the line and disturbs surrounding text.",
    "文字レイヤーのScaleを使う｜アンカーを単語中央か基準線に置く｜強調は一文に1箇所程度にする",
    "Animate layer scale, not font size|Anchor at the word center or baseline|Limit emphasis to about one word per phrase",
    "0ms  Scale 65 / 377ms  Scale 125 / 580ms  Scale 100"
  ),
  "text-wave": guide(
    "隣り合う文字の上下動に時間差があり、山が文字列を横切っていく。",
    "Delayed vertical motion makes a wave crest travel across the word.",
    "大きな上下動を連続ループすると、文字が読めず装飾だけが残る。",
    "Large continuous waves make the text unreadable and purely decorative.",
    "文字ごとのY移動量を揃える｜遅延は波長として調整する｜読ませる文字では振幅を文字高の20%以下にする",
    "Keep Y amplitude consistent|Treat delay as the wave length control|Stay under roughly 20% of letter height for readable text",
    "Letters: Y0→-60%→0 / Delay 38ms / 1000ms Loop"
  ),
  "blur-resolve": guide(
    "輪郭のぼけと薄さが同時に減り、文字が静かに焦点へ入る。",
    "Blur and transparency resolve together as the title comes into focus.",
    "細い書体や小さい文字では途中が判読不能になり、表示の遅さだけを感じやすい。",
    "Thin or small type becomes unreadable and may simply feel slow.",
    "ブラーは4〜10pxから試す｜Opacityを併用してにじみを抑える｜短い見出しだけに使う",
    "Start around 4–10px blur|Use opacity to reduce muddy edges|Reserve it for short headings",
    "0ms  Blur 10・Opacity 20% / 820ms  Blur 0・Opacity 100%"
  ),
  "split-type": guide(
    "文字が異なる方向と角度から集まり、最後に一つの読みやすい単語へ揃う。",
    "Letters arrive from different directions and angles, then align as one word.",
    "開始位置を離しすぎると単語との関係が失われ、集合まで内容を推測できない。",
    "Starting too far apart removes word context until the final assembly.",
    "各文字の終点を先に揃える｜開始位置は文字幅1〜3個分に抑える｜到着順を読字順か中心順で設計する",
    "Align every final letter first|Limit start offsets to 1–3 letter widths|Choose reading-order or center-out arrival",
    "Letters: Offset ±44〜88・Rotation ±24°・Opacity 0% → Final baseline / Delay 38ms / 940ms"
  )
};

window.MOTION_LIBRARY = window.MOTION_LIBRARY.map(item => ({
  ...item,
  ...MOTION_GUIDES[item.id]
}));

const EXPANDED_MOTIONS = [
  referenceMotion("diagonal-wipe", "entrance", "斜めワイプ", "Diagonal Wipe", "diagonalWipe", 680, "easeInOutQuint", ["きびきび"], ["UI", "テキスト"], "斜めの境界で表示領域を横切り、進行方向を強く示す出現。", "A diagonal boundary crosses the subject for a strongly directional reveal.", { focus: "斜めの表示境界が左下から右上へ一定方向に抜け、最後に輪郭全体が同時に解放される。", focusEn: "The diagonal edge travels from lower left to upper right and releases the whole silhouette at the finish.", caution: "小さい本文に急な斜線を重ねると読み始めが遅れるため、見出しや面の切替に限定する。", cautionEn: "A steep diagonal delays reading on small copy, so reserve it for headings and surface transitions.", recipe: "clip-path polygon diagonal 0%→145% / 680ms", curve: "inOut", accent: "cyan" }),
  referenceMotion("fold-in", "entrance", "3D折り込み", "3D Fold In", "foldIn", 760, "easeOutCubic", ["なめらか"], ["UI", "3D"], "上辺を軸に面を起こし、奥行きのあるカード出現をつくる。", "Raises a surface around its top edge to create a spatial card entrance.", { focus: "上辺を固定したままX軸回転が解け、遠近のついた薄い面から正面のカードへ変わる。", focusEn: "The top edge stays fixed while perspective rotation resolves from a thin plane into a frontal card.", caution: "回転中の裏面や文字が反転して見えないよう、背面非表示と短い回転量を設定する。", cautionEn: "Hide the back face and keep the turn short so text never appears mirrored during the fold.", recipe: "perspective 420 / origin top / rotateX -82°→0° / 760ms", curve: "out", accent: "purple" }),
  referenceMotion("shrink-fade-exit", "entrance", "縮小フェード退場", "Shrink Fade Exit", "shrinkFade", 520, "easeInCubic", ["やわらかい"], ["UI", "ロゴ"], "中心へ小さく収束しながら薄れ、静かに要素を退場させる。", "Fades toward the center while shrinking for a quiet exit.", { focus: "位置を保ったままスケールと透明度が同時に下がり、終点で小さな点へ収束する。", focusEn: "Scale and opacity fall together without positional drift, converging into a small point at the end.", caution: "操作完了の通知まで消すと状態を見失うため、必要な結果表示は静止要素として残す。", cautionEn: "Do not remove essential completion feedback; leave critical result information visible after the exit.", recipe: "Scale 100→22 / Opacity 100→0 / Blur 0→3 / 520ms", curve: "in", accent: "coral" }),

  referenceMotion("zigzag-travel", "move", "ジグザグ移動", "Zigzag Travel", "zigzagTravel", 920, "easeInOutSine", ["きびきび"], ["キャラクター", "3D"], "左右の折れ点を通り、探索や回避を感じさせる移動。", "Passes alternating waypoints to suggest searching or avoidance.", { focus: "前進量は保ちながら上下方向だけが交互に反転し、二つの折れ点を連続して通過する。", focusEn: "Forward progress stays continuous while vertical direction alternates through two readable turns.", caution: "折れ幅が大きすぎると目的地より揺れが目立つため、進行距離より小さく設計する。", cautionEn: "Oversized turns overpower the destination, so keep lateral deviation smaller than forward travel.", recipe: "XY 0,0→55,-28→112,24→175,0 / 920ms", curve: "inOut", accent: "yellow" }),
  referenceMotion("momentum-drift", "move", "慣性ドリフト", "Momentum Drift", "momentumDrift", 880, "easeOutCubic", ["なめらか"], ["UI", "3D"], "高速移動後にわずかに流れ、摩擦で止まるような到着。", "Carries slightly past the main travel before friction-like settling.", { focus: "主移動の後に短い低速区間が続き、少し行き過ぎた位置から静かに最終点へ戻る。", focusEn: "A short slow phase follows the main travel, then eases back from a small overshoot into the final point.", caution: "ボタンや正確な選択位置では流れが誤操作に見えるため、装飾的な面やカードに使う。", cautionEn: "Drift can resemble input error on precise controls, so use it on decorative surfaces and cards.", recipe: "X0→168 at 68%→184 at 84%→175 / 880ms", curve: "out", accent: "cyan" }),
  referenceMotion("waypoint-hop", "move", "ウェイポイントホップ", "Waypoint Hop", "waypointHop", 860, "easeOutCubic", ["弾む"], ["キャラクター", "UI"], "複数の地点へ小さく跳び、順路や選択の進行を見せる。", "Hops between marked points to communicate route or selection progress.", { focus: "各地点の直前で高さが上がり、着地時に一度だけ小さく潰れて次の地点へ進む。", focusEn: "The subject rises before each point, lands with one small squash, then continues to the next marker.", caution: "地点が多いと完了まで待たせるため、主要な二〜三地点だけを見せて残りは省略する。", cautionEn: "Too many stops delay completion, so show only two or three meaningful waypoints.", recipe: "3 waypoints / Y 0→-24→0 per segment / ScaleY 92 at land / 860ms", curve: "out", accent: "coral" }),

  referenceMotion("center-punch", "scale", "センターパンチ", "Center Punch", "centerPunch", 480, "easeOutBack", ["きびきび", "弾む"], ["ロゴ", "UI"], "中心から一気に拡大して少し戻り、短い決定感を出す。", "Punches outward from the center and settles for a decisive beat.", { focus: "小さい開始形状から短時間で最大サイズへ達し、一度だけ基準サイズへ戻って完全に止まる。", focusEn: "The object reaches its maximum quickly from a tiny start, then settles to rest in one rebound.", caution: "大きな面を画面いっぱいまで拡大すると圧迫感が強いため、ロゴやアイコンへ限定する。", cautionEn: "Full-screen scaling feels aggressive, so limit this punch to logos, icons, and compact surfaces.", recipe: "Scale 18→132 at 62%→100 / 480ms", curve: "outBack", accent: "coral" }),
  referenceMotion("width-reveal", "scale", "横幅リビール", "Width Reveal", "widthReveal", 650, "easeOutQuart", ["きびきび"], ["UI", "テキスト"], "左端を固定して横幅を伸ばし、バーやラベルを組み立てる。", "Expands width from a fixed left edge to build a bar or label.", { focus: "左端の基準位置を動かさずScale Xだけが伸び、文字や面の横方向の構造が現れる。", focusEn: "The left edge stays anchored while horizontal scale reveals the structure of a label or surface.", caution: "文字そのものを横に潰すと判読しにくいため、背景面と文字を分けて後から表示する。", cautionEn: "Scaling glyphs horizontally harms readability; expand the surface first and reveal text separately.", recipe: "origin left / ScaleX 4→108 at 78%→100 / 650ms", curve: "out", accent: "cyan" }),
  referenceMotion("depth-pullback", "scale", "奥行きプルバック", "Depth Pullback", "depthPullback", 760, "easeInOutCubic", ["重い"], ["3D", "ロゴ"], "近すぎる面を後方へ引き、全体像が見える距離に収める。", "Pulls an oversized near surface backward until the whole subject is visible.", { focus: "2.2倍の近すぎる大きさから縮小しながらブラーと明るさが整い、最後に全輪郭が見える。", focusEn: "A surface at 2.2× recedes as focus and brightness resolve into a complete silhouette.", caution: "大きなズームは動きに敏感な人へ負担になるため、縮小版ではフェードへ置き換える。", cautionEn: "Large zoom motion can be uncomfortable, so replace it with a fade under reduced-motion preferences.", recipe: "Scale 220→100 / Blur 8→0 / Brightness 135→100 / 760ms", curve: "inOut", accent: "purple" }),

  referenceMotion("coin-spin", "rotate", "コインスピン", "Coin Spin", "coinSpin", 900, "easeOutQuart", ["きびきび"], ["ロゴ", "3D"], "Y軸で複数回回し、薄い側面から正面へ向きを合わせて止める。", "Spins around the Y axis and lands facing forward after showing a thin edge.", { focus: "正面と薄い側面が交互に切り替わり、最後の一回転だけ減速して正面へ揃う。", focusEn: "Front and thin edge alternate repeatedly, with the final turn decelerating into a frontal stop.", caution: "文字を載せた面では反転が読みにくいため、記号や単純なロゴに使用する。", cautionEn: "Mirrored text is difficult to read during the spin, so use simple symbols or logos.", recipe: "perspective 320 / rotateY 0→900° / final 180° eased / 900ms", curve: "out", accent: "yellow" }),
  referenceMotion("gyroscope", "rotate", "ジャイロ回転", "Gyroscope Rotation", "gyroscope", 1100, "easeInOutSine", ["なめらか"], ["3D", "ロゴ"], "X軸とY軸をずらして回し、浮遊する立体感をつくる。", "Offsets X and Y rotations to create a floating gyroscopic feel.", { focus: "二つの回転軸が異なるタイミングで最大角へ達し、中心位置を保ったまま立体的に巡る。", focusEn: "Two axes reach their maximum angles at different times while the object remains centered.", caution: "細かなUIへ複合回転を使うと形状を追えないため、大きな単体オブジェクトに絞る。", cautionEn: "Compound rotation is hard to track on small UI, so reserve it for one large isolated object.", recipe: "rotateX 0→55→0 / rotateY 0→180→360 / 1100ms", curve: "inOut", accent: "cyan" }),
  referenceMotion("rotate-reveal", "rotate", "回転リビール", "Rotate Reveal", "rotateReveal", 720, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "角から面を回し起こし、ドアのように内容を見せる出現。", "Swings a surface into view from one edge like a door opening toward the viewer.", { focus: "左辺を回転軸に固定し、細い側面から正面へ回る間に透明度が同時に上がる。", focusEn: "The left edge remains fixed as the thin side rotates forward and opacity rises in sync.", caution: "隣接カードを同時に回すと軸が多く見えるため、選択中の一枚だけに適用する。", cautionEn: "Rotating many adjacent cards creates competing axes, so apply it to one selected surface.", recipe: "origin left center / rotateY -88→0 / Opacity 20→100 / 720ms", curve: "out", accent: "coral" }),

  referenceMotion("settle-drop", "reaction", "沈み込み着地", "Settle Drop", "settleDrop", 760, "easeOutCubic", ["重い"], ["キャラクター", "3D"], "落下後に深く沈んでゆっくり戻り、重量のある着地を示す。", "Drops into a deep compression and slowly recovers to communicate weight.", { focus: "落下距離より着地後の沈み込みを短くし、横への広がりと遅い復元で重さを見せる。", focusEn: "Keep the post-landing compression shorter than the fall, and show weight through lateral spread and a slow recovery.", caution: "UIボタンへ強い沈み込みを使うと押下状態と混同するため、物体の着地表現に使う。", cautionEn: "Deep compression resembles a pressed control, so use it for object landings rather than buttons.", recipe: "Y -110→-46 / Scale 100→X145 Y62→100 / 760ms", curve: "out", accent: "yellow" }),
  referenceMotion("drag-resistance", "reaction", "ドラッグ抵抗", "Drag Resistance", "dragResistance", 820, "easeInOutBack", ["重い", "弾む"], ["UI", "キャラクター"], "引っ張る方向へ伸びながら遅れて追い、離すと基準位置へ戻る。", "Lags and stretches under drag, then returns to rest after release.", { focus: "ポインタ側の端が先行し、本体中心は遅れて移動してから短い反動で元位置へ戻る。", focusEn: "The grabbed edge leads while the body center lags, then returns with one short rebound after release.", caution: "実際のドラッグ位置と視覚位置を離しすぎると操作精度が落ちるため、遅れ量を制限する。", cautionEn: "Excess visual lag reduces drag accuracy, so cap the distance between pointer and displayed object.", recipe: "X0→92 with ScaleX 135 / release→X-12→0 / 820ms", curve: "inOutBack", accent: "coral" }),
  referenceMotion("follow-through", "reaction", "フォロースルー", "Follow Through", "followThrough", 860, "easeOutCubic", ["やわらかい"], ["キャラクター", "ロゴ"], "本体停止後も端部だけが遅れて進み、しなやかな余韻を残す。", "Lets the trailing edge continue after the body stops for a flexible settle.", { focus: "中心位置が先に止まり、回転と横伸びだけが一度行き過ぎてから基準形状へ戻る。", focusEn: "The center stops first while rotation and stretch overshoot once before returning to neutral.", caution: "硬い金属や機械へ大きく使うと材質感が崩れるため、柔らかいロゴやキャラクターに使う。", cautionEn: "Large follow-through makes rigid materials feel rubbery, so use it on flexible marks and characters.", recipe: "X0→170 at 58% / Rotate 0→18→-6→0 / ScaleX 118→100 / 860ms", curve: "out", accent: "purple" }),

  referenceMotion("typewriter", "text", "タイプライター", "Typewriter Reveal", "typewriterText", 1100, "linear", ["きびきび"], ["テキスト", "UI"], "文字を左から一字ずつ増やし、入力や生成の進行を見せる。", "Adds characters from left to right to communicate typing or generation.", { focus: "等間隔の文字ステップと末尾カーソルが同期し、最後の文字でカーソルだけが一度点滅する。", focusEn: "Discrete character steps stay synchronized with the end cursor, which blinks once after completion.", caution: "既に読める情報まで一字ずつ待たせないよう、短いラベルや会話の演出に限定する。", cautionEn: "Do not delay already available information; reserve the effect for short labels and conversational moments.", recipe: "clip width 0→100% in 6 steps / caret blink after 92% / 1100ms", curve: "linear", accent: "cyan" }),
  referenceMotion("line-by-line", "text", "行ごとのリビール", "Line-by-Line Reveal", "lineByLine", 980, "easeOutCubic", ["なめらか"], ["テキスト", "UI"], "複数行を上から順に短い遅延で見せ、読み順を案内する。", "Reveals multiple lines from top to bottom with a short reading-order delay.", { focus: "各行が同じ移動量で現れ、前の行を読める状態にしてから次の行が追いかける。", focusEn: "Every line uses equal travel, and the next begins only after the previous line becomes readable.", caution: "行数に比例して完了が遅くなるため、三行程度に絞り本文全体には適用しない。", cautionEn: "Completion time grows with line count, so keep it to about three lines and avoid full body copy.", recipe: "3 lines Y+14→0 / Opacity 0→100 / stagger 115ms / 980ms", curve: "out", accent: "purple" }),
  referenceMotion("scramble-resolve", "text", "スクランブル解像", "Scramble Resolve", "scrambleText", 1050, "easeOutCubic", ["きびきび"], ["テキスト", "ロゴ"], "乱れた文字位置と角度を収束させ、正しい単語へ組み直す。", "Resolves scattered glyph positions and angles into the correct word.", { focus: "文字ごとの小さな位置ずれと回転が異なる順番で消え、最後に字間まで一列へ揃う。", focusEn: "Small per-letter offsets and rotations resolve in different orders before tracking aligns as one word.", caution: "実際の文字をランダム記号へ置換すると読み上げが乱れるため、DOM文字は保持して視覚だけを変える。", cautionEn: "Replacing real text with random symbols disrupts assistive output, so preserve DOM text and alter visuals only.", recipe: "Letters XY ±26 / Rotate ±18° / Blur 5→0 / stagger 42ms / 1050ms", curve: "out", accent: "yellow" }),

  referenceMotion("list-slide-stack", "collection", "リスト積み重ね", "List Slide Stack", "listSlideStack", 900, "easeOutCubic", ["なめらか"], ["UI"], "各行が下から自分の位置へ順にスライドし、リスト全体を組み立てる。", "Each row slides up into its own slot in turn to assemble the list.", { focus: "上の行から順に、少し下から自分の位置へ滑り込み、揃った時点で等間隔の一覧になる。", focusEn: "Rows glide up into their own slots from the top down and settle into an evenly spaced list.", caution: "実際の並び順と登場順が逆転しないよう、追加位置と読み上げ順を同じに保つ。", cautionEn: "Keep insertion order aligned with reading order so visual stacking never contradicts the DOM.", recipe: "Rows Y+48→0 / previous rows Y+18→0 / stagger 82ms / 900ms", curve: "out", accent: "cyan" }),
  referenceMotion("list-trim-collapse", "collection", "リスト削除詰め", "List Trim Collapse", "listTrimCollapse", 780, "easeInOutCubic", ["なめらか"], ["UI"], "削除行を縮めて消し、下の行を空いた場所へ連続して詰める。", "Collapses a removed row and moves following items into the freed space.", { focus: "対象行の高さと透明度が先に下がり、その直後に後続行が同じ距離だけ上へ移る。", focusEn: "The removed row loses height and opacity first, then following rows shift upward by one equal step.", caution: "削除を取り消せる操作では、移動後も対象を復元できる通知とフォーカス位置を残す。", cautionEn: "For undoable deletion, preserve recovery feedback and a sensible focus position after reflow.", recipe: "Row 2 ScaleY 100→4 / Opacity→0; rows 3-4 Y0→-22 / 780ms", curve: "inOut", accent: "coral" }),
  referenceMotion("grid-spiral", "collection", "グリッド螺旋展開", "Grid Spiral", "gridSpiral", 1100, "easeOutCubic", ["なめらか"], ["UI", "3D"], "中央から外周へ螺旋順でカードを表示し、中心の主役を起点にする。", "Reveals cards in a center-out spiral, using the focal item as the origin.", { focus: "中央セルから隣接セルへ遅延が回り込み、全セルが同じスケールと透明度で最終位置へ収まる。", focusEn: "Delay travels from the center through neighboring cells while every tile shares the same final scale and opacity.", caution: "情報の優先順と螺旋順が異なる一覧では、見た目の順番が意味を誤解させるため使わない。", cautionEn: "Avoid spiral order when it conflicts with content priority because the sequence implies hierarchy.", recipe: "3x3 spiral delay 0,1,2,7,8,3,6,5,4 ×62ms / Scale 35→100", curve: "out", accent: "purple" }),
  referenceMotion("grid-diagonal", "collection", "グリッド斜めウェーブ", "Grid Diagonal Wave", "gridDiagonal", 940, "easeOutQuart", ["きびきび"], ["UI"], "左上から右下へ斜めの波としてセルを順次表示する。", "Reveals grid cells as a diagonal wave from upper left to lower right.", { focus: "行番号と列番号の合計で遅延が決まり、同じ斜線上のセルが同時に到着する。", focusEn: "Delay is derived from row plus column, so cells on each diagonal arrive together.", caution: "右から左の言語や逆方向の導線では、開始角を読み順に合わせて変更する。", cautionEn: "For right-to-left language or reverse flows, move the origin to match the reading direction.", recipe: "Delay=(row+col)×78ms / X-18 Y+18→0 / 940ms", curve: "out", accent: "yellow" }),

  referenceMotion("color-pulse", "attention", "カラーパルス", "Color Pulse", "colorPulse", 760, "easeInOutSine", ["やわらかい"], ["UI", "ロゴ"], "色相と明るさを一往復させ、形を動かさず状態変化を知らせる。", "Pulses hue and brightness once to signal change without moving the shape.", { focus: "大きさと位置を固定したままアクセント色が明るくなり、同じ経路で元の色へ戻る。", focusEn: "Position and size remain fixed while the accent brightens and returns along the same color path.", caution: "色だけでは意味が伝わらないため、選択・警告などの状態はラベルやアイコンも併用する。", cautionEn: "Color alone cannot carry state meaning, so pair selection or warning changes with text or an icon.", recipe: "Saturate 85→145→85 / Brightness 90→135→90 / 760ms", curve: "inOut", accent: "coral" }),
  referenceMotion("icon-nod", "attention", "アイコンうなずき", "Icon Nod", "iconNod", 620, "easeOutBack", ["弾む"], ["UI", "キャラクター"], "上端を支点に小さく前後へ傾け、確認や案内を返す。", "Pivots gently around the top edge like a confirming nod.", { focus: "下側だけが短く前へ振れ、反対方向の小さな戻りを一度入れて基準角へ止まる。", focusEn: "Only the lower edge swings forward, followed by one smaller reverse motion into neutral.", caution: "連続してうなずかせると催促に見えるため、入力後または初回案内の一度だけにする。", cautionEn: "Repeated nodding feels demanding, so play it once after input or on first-time guidance.", recipe: "origin 50% 12% / Rotate 0→16→-5→0 / 620ms", curve: "outBack", accent: "yellow" }),
  referenceMotion("spotlight-focus", "attention", "スポットライトフォーカス", "Spotlight Focus", "spotlightFocus", 900, "easeInOutCubic", ["なめらか"], ["UI", "ロゴ"], "周囲を暗くして対象だけを円形に照らし、視線を一点へ集める。", "Dims the surroundings while opening a circular spotlight over the target.", { focus: "暗いオーバーレイの穴が対象位置へ移動して少し広がり、対象自体は位置を変えず明るくなる。", focusEn: "A cutout in the dim layer moves onto the target and opens slightly while the subject stays still.", caution: "操作可能な周辺要素まで隠す場合は、モーダル状態と同様にフォーカス範囲も制御する。", cautionEn: "If surrounding controls are obscured, constrain keyboard focus as you would for a modal state.", recipe: "radial mask center 18%→48% / radius 12→28% / dim 0→68% / 900ms", curve: "inOut", accent: "cyan" }),
  referenceMotion("error-shake", "attention", "エラーシェイク", "Error Shake", "errorShake", 540, "easeOutExpo", ["きびきび"], ["UI", "テキスト"], "短い左右揺れと色変化で、入力エラーの位置を明確にする。", "Combines a short lateral shake and color change to locate an input error.", { focus: "最初の横揺れを最大にして振幅を急速に半減し、最後に赤系の輪郭だけを残して止まる。", focusEn: "The first lateral kick is largest, amplitude halves quickly, and a red outline remains after motion stops.", caution: "揺れだけでは原因が分からないため、具体的なエラーメッセージを同じ領域に表示する。", cautionEn: "Shake alone does not explain the problem, so show a specific error message in the same region.", recipe: "X0→-12→10→-6→4→0 / outline neutral→error / 540ms", curve: "out", accent: "coral" }),

  referenceMotion("aurora-glow", "light", "オーロラグロー", "Aurora Glow", "auroraGlow", 1500, "easeInOutSine", ["やわらかい"], ["ロゴ", "3D"], "複数色の柔らかな光をゆっくり巡らせ、奥行きのある発光をつくる。", "Circulates several soft colors to create a layered atmospheric glow.", { focus: "輪郭の外側で二色の光重心が反対方向へ動き、中心の形状は白飛びせず読み取れる。", focusEn: "Two color centers move in opposite directions outside the silhouette while the core remains readable.", caution: "長時間ループでは常に目を引くため、ヒーロー背景など装飾領域に限定し強度を下げる。", cautionEn: "A perpetual aurora keeps demanding attention, so limit it to decorative hero areas at low intensity.", recipe: "2 blurred glows orbit ±24px / hue 0→70° / 1500ms alternate", curve: "inOut", accent: "purple" }),
  referenceMotion("radial-flash", "light", "ラジアルフラッシュ", "Radial Flash", "radialFlash", 560, "easeOutExpo", ["きびきび"], ["ロゴ", "UI"], "中心から短い光を放射し、決定や獲得の瞬間を強調する。", "Emits a short radial flash from the center to emphasize completion or reward.", { focus: "中心の白い閃光が先に最大となり、外周リングが遅れて広がってすぐ透明になる。", focusEn: "A white core peaks first, followed by an expanding outer ring that fades immediately.", caution: "高輝度の点滅を繰り返さず、一回の完了演出として明るさと面積を制限する。", cautionEn: "Do not repeat high-luminance flashes; constrain brightness and area to one completion beat.", recipe: "Core brightness 100→220→100 / Ring scale 20→230 opacity 90→0 / 560ms", curve: "out", accent: "yellow" }),
  referenceMotion("lens-flare-sweep", "light", "レンズフレアスイープ", "Lens Flare Sweep", "lensFlareSweep", 1050, "easeInOutCubic", ["なめらか"], ["ロゴ", "3D"], "光源と複数の反射光を一直線に通し、金属的な輝きを見せる。", "Moves a source and several reflections along one axis for a polished metallic shine.", { focus: "強い主光点と小さな反射光が同じ軸上を異なる速度で横切り、輪郭上で最大輝度になる。", focusEn: "A bright source and smaller reflections cross the same axis at different speeds and peak on the silhouette.", caution: "実写的なフレアはUIの情報を覆いやすいため、ロゴや装飾面の短い通過だけに使う。", cautionEn: "Photographic flare can obscure interface content, so keep it to brief logo and decorative passes.", recipe: "Source X-155→155 / 3 ghosts at ~.7x (2 mirrored against the source) / screen blend / 1050ms", curve: "inOut", accent: "cyan" }),
  referenceMotion("holographic-sheen", "light", "ホログラムシーン", "Holographic Sheen", "holographicSheen", 1300, "easeInOutSine", ["なめらか"], ["UI", "3D"], "角度に合わせた虹色の反射帯を動かし、素材の偏光感を表現する。", "Moves an iridescent reflection band to suggest holographic material.", { focus: "細い虹色帯が面の傾きに沿って斜めに通り、通過後は元の色と明るさへ戻る。", focusEn: "A narrow rainbow band crosses along the surface angle and leaves the original color intact.", caution: "文字や価格の上へ強く重ねると色の意味が変わるため、背景面または縁だけに適用する。", cautionEn: "Strong iridescence can distort semantic colors over text or prices, so keep it to surfaces and edges.", recipe: "conic gradient position -120→220% / hue-rotate 0→55→0 / 1300ms", curve: "inOut", accent: "coral" }),

  referenceMotion("liquid-morph", "effect", "リキッドモーフ", "Liquid Morph", "liquidMorph", 1100, "easeInOutCubic", ["なめらか"], ["ロゴ", "3D"], "角丸比率を連続変化させ、液体の塊のように形を変える。", "Continuously changes corner ratios to make the form behave like a liquid blob.", { focus: "四隅の比率が別々に動きながら縦横スケールも少し変わり、最後に元の輪郭へ戻る。", focusEn: "Each corner ratio changes independently with subtle axis scaling before returning to the original silhouette.", caution: "ブランド形状を長く崩すと認識しづらいため、短い中間変形として輪郭を必ず復元する。", cautionEn: "Long deformation weakens brand recognition, so use it briefly and fully restore the silhouette.", recipe: "radius 50→62/38/55/45→34/66/42/58→50%; Scale XY ±12% / 1100ms", curve: "inOut", accent: "purple" }),
  referenceMotion("ink-reveal", "effect", "インクリビール", "Ink Reveal", "inkReveal", 980, "easeOutCubic", ["やわらかい"], ["ロゴ", "テキスト"], "にじむ円形マスクを複数広げ、インクが染みるように形を見せる。", "Expands overlapping soft masks to reveal the subject like spreading ink.", { focus: "異なる大きさの三つのにじみが少しずつ重なり、最後に輪郭の欠けがなく完全表示になる。", focusEn: "Three soft blooms overlap with small delays until the silhouette is completely revealed.", caution: "細い文字では境界のにじみが可読性を下げるため、太い見出しや面の出現に使う。", cautionEn: "Soft ink edges reduce legibility on thin type, so use bold headings and solid surfaces.", recipe: "3 radial masks radius 0→46% / centers offset / feather 6px / 980ms", curve: "out", accent: "cyan" }),
  referenceMotion("mosaic-flip", "effect", "モザイクフリップ", "Mosaic Flip", "mosaicFlip", 1150, "easeInOutCubic", ["きびきび"], ["UI", "3D"], "面を小さなタイルへ分け、順次裏返して新しい状態へ切り替える。", "Splits a surface into tiles and flips them in sequence into a new state.", { focus: "各タイルが斜め順にY軸回転し、90度の瞬間で色が切り替わって一枚の面へ揃う。", focusEn: "Tiles rotate on Y in diagonal order, swap color at ninety degrees, and align as one surface.", caution: "タイル数が多いとDOMと描画負荷が増えるため、プレビュー範囲と分割数を制限する。", cautionEn: "Many tiles increase DOM and rendering cost, so bound both preview area and subdivision count.", recipe: "4x4 tiles rotateY 0→180 / color swap at 50% / diagonal stagger 34ms / 1150ms", curve: "inOut", accent: "yellow" }),
  referenceMotion("displacement-wave", "effect", "ディスプレイス波", "Displacement Wave", "displacementWave", 1000, "easeInOutSine", ["なめらか"], ["3D", "ロゴ"], "横方向へ歪みの山を通し、表面を波が走るように変形する。", "Passes a distortion crest across the surface like a traveling wave.", { focus: "歪みの中心だけが横へ移動し、通過した領域は直ちに元の輪郭へ戻って残留変形を残さない。", focusEn: "Only the distortion crest travels horizontally, and each passed region immediately returns to neutral.", caution: "入力フォームや本文へ使うと位置が不安定に見えるため、装飾的な画像やロゴに限定する。", cautionEn: "Distortion makes forms and body text feel unstable, so reserve it for decorative imagery and logos.", recipe: "SkewX 0→12→-8→0 with moving clip bands / 1000ms", curve: "inOut", accent: "coral" }),

  referenceMotion("pinned-story-steps", "web-scroll", "ピン留めストーリー", "Pinned Story Steps", "pinnedStorySteps", 1400, "easeInOutCubic", ["なめらか"], ["UI", "テキスト"], "主役を固定したまま説明ステップを切り替え、関係を順番に見せる。", "Pins the focal visual while explanatory steps change around it.", { focus: "右側の主役は同じ位置を保ち、左側の三つの説明だけが上へ入れ替わって現在項目を示す。", focusEn: "The focal visual stays fixed on the right while only the three steps on the left move upward as they replace one another, marking the current step.", caution: "長いピン留めは通常スクロールを奪ったように感じるため、区間と終了地点を視覚的に示す。", cautionEn: "Long pinning can feel like stolen scrolling, so make both the section length and release point visible.", recipe: "position sticky subject / 3 view-timeline steps opacity+Y / 1400ms demo", curve: "inOut", accent: "purple" }),
  referenceMotion("scroll-marquee", "web-scroll", "スクロールマルキー", "Scroll Marquee", "scrollMarquee", 1250, "linear", ["きびきび"], ["テキスト", "UI"], "スクロール方向と速度に合わせて横長の文字列を流す。", "Moves a horizontal marquee according to scroll direction and velocity.", { focus: "横長の帯が一体のまま途切れず反対側へ流れ続ける。実装では逆スクロールで移動方向もすぐ反転させる。", focusEn: "The strip moves as one continuous band; in production, reverse it immediately when scrolling back.", caution: "本文や操作項目を流さず、読まなくても成立する短い装飾語に限定する。", cautionEn: "Do not move body copy or controls; use only short decorative words that need not be read.", recipe: "translateX tied to scrollY × -0.35 / wrap -50..0% / linear", curve: "linear", accent: "cyan" }),
  referenceMotion("image-clip-scrub", "web-scroll", "画像クリップスクラブ", "Image Clip Scrub", "imageClipScrub", 1200, "easeInOutCubic", ["なめらか"], ["UI", "3D"], "スクロール進行に合わせて画像の表示領域を開き、全景を見せる。", "Opens an image clipping window as scroll progress reveals the full scene.", { focus: "画像自体は固定し、左右のクリップ境界だけが均等に外へ広がって全景を解放する。", focusEn: "The image stays fixed while left and right clipping edges expand evenly to reveal the full scene.", caution: "重要情報をスクロール前に隠し切らず、代替テキストと縮小動作では最初から表示する。", cautionEn: "Do not fully hide critical content before scrolling; make it available from the start through alternative text and in reduced-motion mode.", recipe: "view timeline / clip-path inset 12% 42%→0 / border-radius 22→6 / scrub", curve: "inOut", accent: "yellow" }),
  referenceMotion("velocity-skew", "web-scroll", "スクロール速度スキュー", "Scroll Velocity Skew", "velocitySkew", 900, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "スクロール速度に応じて要素を一時的に傾け、移動の勢いを見せる。", "Temporarily skews content according to scroll velocity to expose momentum.", { focus: "速度が上がる間だけ進行方向へ傾き、スクロールが止まると短い減衰で垂直へ戻る。", focusEn: "Content leans toward the direction of travel only while velocity rises, then damps back upright with a short decay when scrolling stops.", caution: "本文全体を大きく歪めると読みにくいため、カード画像や見出しの小さな角度へ制限する。", cautionEn: "Large skew on body content harms reading, so limit it to small angles on cards and headings.", recipe: "skewY=clamp(scrollVelocity×.012,-9,9) / damp to 0 in 180ms", curve: "out", accent: "coral" }),

  referenceMotion("button-fill-hover", "web-interaction", "ボタン塗りホバー", "Button Fill Hover", "buttonFillHover", 1400, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "ポインタ位置から色面を広げ、ボタンのホバー状態を塗り替える。", "Expands a color field from the pointer position to fill a hovered button.", { focus: "円形の色面が入力位置を起点にボタン全体を覆い、文字色は中盤で読みやすい色へ切り替わる。", focusEn: "A circular field grows from the pointer position and text color changes mid-transition to preserve contrast.", caution: "キーボードフォーカスでも同じ選択状態が分かるよう、起点を中央にした代替を用意する。", cautionEn: "Provide a centered equivalent for keyboard focus so the same state is visible without a pointer.", recipe: "radial fill at pointer / Scale 0→420% / text color swap at 45% / 620ms", curve: "out", accent: "purple" }),
  referenceMotion("icon-morph", "web-interaction", "アイコンモーフ", "Icon Morph", "iconMorph", 560, "easeInOutCubic", ["なめらか"], ["UI"], "同じ線分を移動・回転させ、メニューから閉じる記号へ連続変形する。", "Repositions the same strokes to morph a menu icon into a close symbol.", { focus: "中央線が短く消え、上下線が同じ中心へ移動して反対角へ45度ずつ回転する。", focusEn: "The middle stroke quickly disappears while the top and bottom strokes meet at the center and rotate 45° each to opposite diagonals.", caution: "見た目だけで状態を変えず、aria-expandedと操作名も開閉状態に同期させる。", cautionEn: "Do not change visuals alone; synchronize aria-expanded and the accessible control name.", recipe: "3 strokes: middle ScaleX 1→0; outer Y±7→0 rotate ±45 / 560ms", curve: "inOut", accent: "cyan" }),
  referenceMotion("card-spotlight", "web-interaction", "カードスポットライト", "Card Spotlight", "cardSpotlight", 1800, "easeInOutSine", ["なめらか"], ["UI", "3D"], "ポインタ位置に合わせてカード表面の光を追従させ、奥行きを補う。", "Tracks a surface highlight under the pointer to reinforce card depth.", { focus: "柔らかな光の中心だけがカード内を移動し、輪郭とコンテンツ位置は動かず常に読み取れる。", focusEn: "Only the soft highlight center moves inside the card while its content and outline remain stable.", caution: "タッチ端末では追従状態が存在しないため、静的なハイライトと押下反応へ置き換える。", cautionEn: "Touch devices lack hover tracking, so fall back to a static highlight and press feedback.", recipe: "radial-gradient center from pointer local XY / smooth 90ms / opacity 0→55%", curve: "inOut", accent: "yellow" }),
  referenceMotion("drag-snap", "web-interaction", "ドラッグ吸着", "Drag Snap", "dragSnap", 820, "easeOutBack", ["弾む"], ["UI"], "ドラッグ終了後に最寄りのスロットへ吸着し、配置結果を明確にする。", "Snaps a released draggable item into its nearest valid slot.", { focus: "自由移動の終了位置から最短の候補点へ直線移動し、わずかな通り越しで吸着を知らせる。", focusEn: "The item travels from its release point to the nearest slot and confirms the snap with a small overshoot.", caution: "吸着先を予測できるガイドをドラッグ中に表示し、意図しない配置を取り消せるようにする。", cautionEn: "Preview the target while dragging and allow undo when snapping may choose an unintended slot.", recipe: "nearest slot from release XY / translate to target / overshoot 6px / 820ms", curve: "outBack", accent: "coral" }),

  referenceMotion("sidebar-reveal", "web-layout", "サイドバー展開", "Sidebar Reveal", "sidebarReveal", 650, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "画面端からナビゲーションを出し、本文を薄暗くして階層を切り替える。", "Slides navigation from the edge while dimming content to establish a temporary layer.", { focus: "サイドバーが端から定位置へ入り、背景オーバーレイは少し遅れて必要な濃度まで上がる。", focusEn: "The sidebar enters from the edge while the backdrop follows slightly behind to its final dim level.", caution: "開いている間は背景スクロールを止め、閉じる操作とフォーカストラップを必ず用意する。", cautionEn: "Lock background scrolling and provide close behavior plus focus containment while the panel is open.", recipe: "Panel X-100→0 / backdrop opacity 0→62% with 80ms lag / 650ms", curve: "out", accent: "purple" }),
  referenceMotion("command-palette-open", "web-layout", "コマンドパレット展開", "Command Palette Open", "commandPaletteOpen", 520, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "中央上部から検索面を短く拡大し、操作の入力先を即座に示す。", "Expands a command surface from the upper center and immediately exposes the input target.", { focus: "小さな検索面が縦方向に開き、入力欄を先に見せて候補行が短い遅延で追いかける。", focusEn: "The search surface opens vertically, exposing the input first before result rows follow with short delays.", caution: "表示アニメーション中も入力を待たせず、開いた直後に検索欄へフォーカスを移す。", cautionEn: "Do not block typing during animation; focus the search field immediately when the palette opens.", recipe: "Surface Y-18 Scale .94→1 / height 46→150 / rows stagger 35ms / 520ms", curve: "out", accent: "cyan" }),
  referenceMotion("dropdown-origin", "web-layout", "ドロップダウン起点展開", "Dropdown Origin Reveal", "dropdownOrigin", 480, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "押したトリガーの辺を起点にメニュー面を開き、所属関係を示す。", "Opens a menu from the trigger edge to preserve the relationship between control and options.", { focus: "上端を固定して高さと透明度が増え、項目は面が十分開いてから上から順に現れる。", focusEn: "The top edge stays anchored as height and opacity grow, then options appear top to bottom.", caution: "transformだけで縮めた項目をフォーカス可能なまま残さず、閉状態では操作対象から外す。", cautionEn: "Do not leave visually collapsed options focusable; remove them from interaction in the closed state.", recipe: "origin top / ScaleY .08→1 / Opacity 0→100 / option stagger 24ms / 480ms", curve: "out", accent: "yellow" }),
  referenceMotion("detail-expand", "web-layout", "一覧から詳細展開", "List-to-Detail Expand", "detailExpand", 820, "easeInOutCubic", ["なめらか"], ["UI"], "選択カードを大きな詳細面へ広げ、一覧との位置関係を保つ。", "Expands a selected card into a larger detail surface while preserving its list origin.", { focus: "選択カードだけが旧位置の枠から中央へ移動・拡大し、角丸と大きさが詳細面へつながる。", focusEn: "Only the selected card moves from its slot to the center, carrying its corner radius and size into the detail view.", caution: "実DOMを複製して読み上げが二重にならないよう、遷移用スナップショットは非表示扱いにする。", cautionEn: "Hide transition snapshots from assistive technology to avoid duplicate semantic content.", recipe: "FLIP selected rect→detail rect / radius 8→15 / 820ms (fade siblings to 25% in production)", curve: "inOut", accent: "coral" }),

  referenceMotion("success-check", "web-feedback", "成功チェック描画", "Success Check Draw", "successCheck", 760, "easeOutCubic", ["きびきび"], ["UI", "ロゴ"], "円とチェック線を順に描き、処理完了を明確な静止記号へ変える。", "Draws a circle and check mark in sequence, ending on a clear completion symbol.", { focus: "外周円が先に閉じ、その直後に短辺から長辺へチェック線が描かれて静止する。", focusEn: "The outer circle closes first, then the short and long check strokes draw into a stable symbol.", caution: "成功色と記号だけに頼らず、完了内容を示す短いテキストも同時に表示する。", cautionEn: "Do not rely on color and icon alone; include brief text describing what completed.", recipe: "Circle dash 100→0 / Check dash 100→0 with 260ms delay / 760ms", curve: "out", accent: "cyan" }),
  referenceMotion("bar-chart-stagger", "web-feedback", "棒グラフ順次成長", "Staggered Bar Chart", "barChartStagger", 1100, "easeOutCubic", ["なめらか"], ["UI", "3D"], "棒を基準線から順に伸ばし、項目ごとの差を段階的に見せる。", "Grows bars from a common baseline with a short sequence across categories.", { focus: "すべての棒が同じ基準線から異なる高さへ伸び、左から右の遅延だけで比較順をつくる。", focusEn: "Every bar grows from one baseline to its data height, with left-to-right delay defining reveal order.", caution: "棒の到着順に意味がない場合は比較を遅らせるだけなので、短い遅延か即時表示を選ぶ。", cautionEn: "If reveal order has no meaning, keep delays tiny or show data immediately to avoid delaying comparison.", recipe: "5 bars ScaleY 0→data / origin bottom / stagger 75ms / 1100ms", curve: "out", accent: "purple" }),
  referenceMotion("donut-segments", "web-feedback", "ドーナツ分割描画", "Donut Segment Draw", "donutSegments", 1200, "easeInOutCubic", ["なめらか"], ["UI", "3D"], "円グラフの区分を順に伸ばし、構成比の合計を見せる。", "Draws donut segments in sequence to expose how parts form the whole.", { focus: "12時位置から各区分が隙間を保って連続描画され、最後に中央の合計値が表示される。", focusEn: "Segments draw from twelve o'clock with consistent gaps, then the total appears in the center.", caution: "細かな割合は円弧だけで比較しにくいため、凡例と数値を常に併記する。", cautionEn: "Small proportions are hard to compare by arc alone, so always include labels and values.", recipe: "4 SVG arcs dashoffset 1→0 / stagger 95ms / center value fade at 78%", curve: "inOut", accent: "yellow" }),
  referenceMotion("optimistic-update", "web-feedback", "楽観的更新", "Optimistic Update", "optimisticUpdate", 900, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "操作直後に仮の完了状態へ切り替え、通信確定後に静かな確認を返す。", "Shows a provisional success state immediately, then confirms quietly after the request resolves.", { focus: "押した行がすぐ完了色へ変わり、短い待機点の後にチェックが表示されて確定状態になる。", focusEn: "The row changes to a provisional success color immediately, then a check confirms after a short pending beat.", caution: "通信失敗時に元へ戻す動きと具体的な再試行案内を用意し、成功を確定表示し続けない。", cautionEn: "On failure, reverse the state and provide a specific retry path rather than leaving false success visible.", recipe: "Row state idle→pending at 0ms→confirmed at 620ms / color+icon morph / 900ms", curve: "out", accent: "coral" })
];

window.MOTION_LIBRARY.push(...EXPANDED_MOTIONS);

const ADVANCED_WEB_MOTIONS = [
  referenceMotion("floating-label", "form-state", "フローティングラベル", "Floating Label", "floatingLabel", 520, "easeOutCubic", ["なめらか"], ["UI", "テキスト"], "入力開始に合わせてラベルを枠内上部へ移し、値と項目名を同時に見せる。", "Moves the label to the top inside the field when input begins, so the value and field name are visible together.", { focus: "ラベルが小さくなりながら上端へ移動し、入力値のための空間を確保して静止する。", focusEn: "The label scales down and moves to the top edge, leaving a stable area for the entered value.", caution: "プレースホルダーだけをラベル代わりにせず、入力後も項目名を残す。", cautionEn: "Do not use placeholder text as the only label; keep the field name visible after input.", recipe: "label Y14→-7 / Scale 100→78 / field border neutral→accent / 520ms", curve: "out", trigger: "入力・フォーカス", triggerEn: "Input or focus", inputs: ["キーボード", "タッチ", "マウス"], inputsEn: ["Keyboard", "Touch", "Pointer"], tech: ["CSS", "WAAPI"] }),
  referenceMotion("checkbox-stroke", "form-state", "チェック線描画", "Checkbox Stroke", "checkboxStroke", 480, "easeOutCubic", ["きびきび"], ["UI"], "選択直後に枠を塗り、チェック線を短辺から長辺へ描いて確定を返す。", "Fills the box and draws the check strokes in sequence to confirm selection.", { focus: "背景色の切替後にチェック線が一筆で現れ、選択済みの静止記号へ収まる。", focusEn: "The fill changes first, then one continuous check stroke resolves into a stable selected state.", caution: "チェックの見た目と実際のchecked値を同じイベントで更新する。", cautionEn: "Update the visual check and the actual checked value in the same event.", recipe: "box fill 0→100 / check pathLength 0→1 / 90ms delay / 480ms", curve: "out", trigger: "選択", triggerEn: "Selection", inputs: ["キーボード", "タッチ", "マウス"], inputsEn: ["Keyboard", "Touch", "Pointer"], tech: ["CSS", "SVG"] }),
  referenceMotion("switch-state-spring", "form-state", "スイッチ状態スプリング", "Switch State Spring", "switchStateSpring", 560, "easeOutBack", ["弾む"], ["UI"], "ノブを反対端へ移動しながら少し縮め、到着時に弾性を返す。", "Compresses the knob while traveling to the opposite side and springs on arrival.", { focus: "トラック色とノブ位置が同じ状態を示し、到着時の反動は一度だけで止まる。", focusEn: "Track color and knob position indicate the same state, with only one arrival rebound.", caution: "通信結果を待つ設定では確定前の状態と処理中表示を区別する。", cautionEn: "For server-backed settings, distinguish provisional state from confirmed state.", recipe: "knob X0→30 / ScaleX 1→.76→1 / track color swap / 560ms", curve: "outBack", trigger: "切替", triggerEn: "Toggle", inputs: ["キーボード", "タッチ", "マウス"], inputsEn: ["Keyboard", "Touch", "Pointer"] }),
  referenceMotion("inline-validation", "form-state", "インライン検証", "Inline Validation", "inlineValidation", 620, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "入力欄の直下へ検証結果を短く展開し、対象との関係を保ったまま修正を促す。", "Expands validation feedback below its field while preserving the relationship to the input.", { focus: "枠色の変化と説明行の展開が同時に始まり、エラー位置がずれずに読める。", focusEn: "Border state and message expansion begin together so the error remains anchored and readable.", caution: "入力中に毎文字強く揺らさず、確定時または意味のある区切りで検証する。", cautionEn: "Avoid strong feedback on every keystroke; validate at commit or meaningful pauses.", recipe: "message height 0→28 / Opacity 0→1 / field border to error / 620ms", curve: "out", trigger: "入力検証", triggerEn: "Validation", inputs: ["キーボード", "タッチ"], inputsEn: ["Keyboard", "Touch"], tech: ["CSS", "WAAPI", "ARIA"] }),
  referenceMotion("submit-success", "form-state", "送信成功モーフ", "Submit Success Morph", "submitSuccess", 820, "easeInOutCubic", ["なめらか"], ["UI", "テキスト"], "送信ボタンを進行状態からチェック付き完了状態へ連続して切り替える。", "Morphs a submit button from pending progress into a checked completion state.", { focus: "ボタン幅を保ちながら文字、待機点、チェックの順に状態が入れ替わり、最後は停止する。", focusEn: "Text, pending dots, and the check replace one another without changing button width, then stop.", caution: "成功表示は実際のレスポンス後に確定し、失敗時の戻し方も用意する。", cautionEn: "Confirm success only after the actual response and provide a clear failure reversal.", recipe: "label opacity 1→0 / dots stagger / check Scale .2→1 after response / 820ms", curve: "inOut", trigger: "送信結果", triggerEn: "Submit result", inputs: ["キーボード", "タッチ", "マウス"], inputsEn: ["Keyboard", "Touch", "Pointer"] }),
  referenceMotion("upload-progress-state", "form-state", "アップロード状態遷移", "Upload Progress State", "uploadProgressState", 1400, "easeInOutCubic", ["なめらか"], ["UI", "テキスト"], "ファイル行の進捗を伸ばし、完了時にバーをチェック状態へ収束させる。", "Fills progress on a file row, then resolves the bar into a completed check state.", { focus: "ファイル名を動かさず、進捗バーと数値が一致して100パーセントで完了記号へ変わる。", focusEn: "The filename stays fixed while bar and value agree, resolving into completion at one hundred percent.", caution: "実測進捗を使い、処理時間が読めない場合は架空の一定進行を見せない。", cautionEn: "Use measured progress and avoid fake linear progress when duration is unknown.", recipe: "bar ScaleX .04→1 / percent 0→100 / check fade at complete / 1400ms", curve: "inOut", trigger: "処理進捗", triggerEn: "Task progress", tech: ["CSS", "WAAPI", "Fetch"] }),
  referenceMotion("password-strength", "form-state", "強度メーター", "Password Strength", "passwordStrength", 720, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "入力条件に応じて分割バーを順に点灯し、強度と次の改善点を示す。", "Activates segmented bars from password rules to show strength and the next improvement.", { focus: "区分が左から連続して増え、色だけでなく強度ラベルも同じ段階へ更新される。", focusEn: "Segments activate continuously from the left while a text label updates to the same level.", caution: "強度の演出で入力値を送信・保存せず、判定規則を端末内で扱う。", cautionEn: "Do not transmit or save the password for animation; evaluate rules locally.", recipe: "4 segments opacity .2→1 / active count from rules / label crossfade / 720ms", curve: "out", trigger: "入力条件", triggerEn: "Input rules", inputs: ["キーボード"], inputsEn: ["Keyboard"] }),
  referenceMotion("skeleton-resolve", "form-state", "スケルトン解決", "Skeleton Resolve", "skeletonResolve", 860, "easeOutCubic", ["やわらかい"], ["UI", "テキスト"], "読み込み骨格を実データへ交差させ、位置を保ったまま内容を確定する。", "Crossfades a loading skeleton into real data without moving the surrounding layout.", { focus: "骨格と実内容の形が重なり、骨格が消えた後に実文字だけが残って静止する。", focusEn: "Skeleton and content align; once the skeleton fades, only the real text remains in a stable layout.", caution: "実コンテンツと異なる高さの骨格を作らず、レイアウトシフトを抑える。", cautionEn: "Match skeleton dimensions to real content to minimize layout shift.", recipe: "skeleton opacity 1→0 / content opacity 0→1・Y+6→0 / 860ms", curve: "out", trigger: "読込完了", triggerEn: "Load complete" }),

  referenceMotion("swipe-dismiss", "gesture", "スワイプ退場", "Swipe Dismiss", "swipeDismiss", 700, "easeOutCubic", ["きびきび"], ["UI"], "横ドラッグ量に追従してカードを移し、閾値を超えたら画面外へ退場させる。", "Tracks horizontal drag and dismisses the card after crossing a threshold.", { focus: "指の移動とカード位置が一対一で対応し、確定後だけ加速して画面外へ抜ける。", focusEn: "Card position matches the finger one-to-one, then accelerates away only after commit.", caution: "取り消し操作とボタンによる同等機能を用意し、誤操作を回復可能にする。", cautionEn: "Provide undo and an equivalent button action so accidental dismissal is recoverable.", recipe: "drag X follows pointer / threshold 35% / release X→110vw or spring to 0", curve: "out", trigger: "横ドラッグ", triggerEn: "Horizontal drag", inputs: ["タッチ", "マウス"], inputsEn: ["Touch", "Pointer"], tech: ["Pointer Events", "WAAPI"] }),
  referenceMotion("swipe-actions", "gesture", "スワイプ操作露出", "Swipe Actions Reveal", "swipeActions", 640, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "行を横へずらして背面の操作を段階的に見せ、選択前に結果を予告する。", "Offsets a row to reveal actions underneath before the user commits.", { focus: "前面の行だけが指に追従し、背面ボタンは固定されたまま露出幅に応じて読めるようになる。", focusEn: "Only the foreground row tracks input while fixed actions become readable as the reveal widens.", caution: "横スクロールと競合する領域では方向判定を早め、意図しない捕捉を避ける。", cautionEn: "Resolve gesture direction early in horizontally scrollable areas to avoid stealing input.", recipe: "row X0→-96 following drag / actions opacity .3→1 / snap points 0,-96", curve: "out", trigger: "横ドラッグ", triggerEn: "Horizontal drag", inputs: ["タッチ", "マウス"], inputsEn: ["Touch", "Pointer"] }),
  referenceMotion("long-press-progress", "gesture", "長押し進行", "Long Press Progress", "longPressProgress", 1000, "linear", ["重い"], ["UI"], "押している時間だけ円周を進め、完了前に離すと即座に元へ戻す。", "Fills a ring only while held and resets immediately when released before completion.", { focus: "押下中だけ進捗円が一定速で伸び、完了点と操作確定の瞬間が一致する。", focusEn: "The ring advances only while held, and completion aligns exactly with the committed action.", caution: "重要操作では長押しだけに頼らず、確認画面やアクセシブルな代替を用意する。", cautionEn: "For important actions, supplement long press with confirmation and an accessible alternative.", recipe: "pointerdown start ring 0→100 / pointerup cancel / complete at 1000ms", curve: "linear", trigger: "長押し", triggerEn: "Press and hold", inputs: ["タッチ", "マウス", "キーボード"], inputsEn: ["Touch", "Pointer", "Keyboard"] }),
  referenceMotion("pull-to-refresh", "gesture", "引いて更新", "Pull to Refresh", "pullToRefresh", 920, "easeOutBack", ["弾む"], ["UI"], "一覧上端を下へ引く量に合わせて更新記号を回し、解放後に処理状態へ切り替える。", "Rotates a refresh indicator with top-edge pull distance and switches to loading after release.", { focus: "一覧と記号が同じ距離感で下がり、閾値到達時だけ記号が確定形へ変わる。", focusEn: "List and indicator move with matching distance, and the icon changes state only at the threshold.", caution: "ブラウザ本来の更新操作と競合するため、アプリ領域とスクロール先頭でのみ捕捉する。", cautionEn: "Because this can conflict with browser refresh, capture it only in an app region at scroll top.", recipe: "pull Y clamp 0..88 / icon rotate progress×240 / release spring + refresh", curve: "outBack", trigger: "上端ドラッグ", triggerEn: "Top-edge drag", inputs: ["タッチ"], inputsEn: ["Touch"], tech: ["Pointer Events", "WAAPI"] }),
  referenceMotion("drag-pickup", "gesture", "ドラッグ持ち上げ", "Drag Pickup", "dragPickup", 540, "easeOutCubic", ["なめらか"], ["UI"], "ドラッグ開始時に要素を少し拡大して影を深くし、操作対象を面から浮かせる。", "Scales and deepens the shadow at drag start to lift the active item from its surface.", { focus: "位置追従の開始と同時に影とスケールが変わり、離した直後に面へ戻る。", focusEn: "Scale and shadow change as tracking begins, then settle back immediately on release.", caution: "拡大で周囲の当たり判定を変えず、見た目だけをtransformで調整する。", cautionEn: "Use transforms so visual pickup does not change surrounding hit targets or layout.", recipe: "pointerdown Scale 1→1.045 / shadow 8→28px / release settle 180ms", curve: "out", trigger: "ドラッグ開始", triggerEn: "Drag start", inputs: ["タッチ", "マウス"], inputsEn: ["Touch", "Pointer"] }),
  referenceMotion("reorder-drag", "gesture", "並べ替えドラッグ", "Reorder Drag", "reorderDrag", 900, "easeInOutCubic", ["なめらか"], ["UI"], "持ち上げた行の移動先へ空きを作り、周囲の行を連続的に押し分ける。", "Opens a destination gap and continuously shifts neighboring rows around the dragged item.", { focus: "ドラッグ対象は指に追従し、他の行だけが一定距離ずつ動いて挿入位置を示す。", focusEn: "The dragged row tracks input while neighboring rows shift by equal steps to preview insertion.", caution: "並べ替え結果を読み上げ、キーボードでも移動先を選べる操作を用意する。", cautionEn: "Announce the new order and provide keyboard controls for choosing the destination.", recipe: "pickup row / placeholder follows nearest index / siblings FLIP to new slots", curve: "inOut", trigger: "縦ドラッグ", triggerEn: "Vertical drag", inputs: ["タッチ", "マウス", "キーボード"], inputsEn: ["Touch", "Pointer", "Keyboard"], tech: ["Pointer Events", "FLIP"] }),
  referenceMotion("bottom-sheet-drag", "gesture", "ボトムシート追従", "Bottom Sheet Drag", "bottomSheetDrag", 760, "easeOutCubic", ["なめらか"], ["UI", "テキスト"], "シートを縦ドラッグへ追従させ、速度と位置から最寄りの高さへ吸着する。", "Tracks vertical drag and snaps the sheet to the nearest height from release position and velocity.", { focus: "シート上端が指に追従し、背景の暗さも開き具合と同じ進行率で変化する。", focusEn: "The sheet edge tracks the finger while backdrop opacity follows the same open progress.", caution: "シート内スクロールと閉じるドラッグの境界を、スクロール位置で明確に分ける。", cautionEn: "Separate sheet scrolling from dismiss drag according to the inner scroll position.", recipe: "sheet Y follows drag / backdrop opacity=progress / snap 25,60,100%", curve: "out", trigger: "縦ドラッグ", triggerEn: "Vertical drag", inputs: ["タッチ", "マウス"], inputsEn: ["Touch", "Pointer"] }),
  referenceMotion("pinch-zoom", "gesture", "ピンチズーム", "Pinch Zoom", "pinchZoom", 820, "easeOutCubic", ["なめらか"], ["UI", "3D"], "二点間距離を拡大率へ対応させ、中心点を保ちながら面を拡縮する。", "Maps the distance between two touches to scale while preserving the gesture center.", { focus: "二本指の中心位置が視覚上の固定点になり、指の距離と拡大率が連続して対応する。", focusEn: "The midpoint between touches remains visually fixed while finger distance maps continuously to scale.", caution: "ブラウザやOSのズームを妨げない領域で使い、ボタンによる拡大縮小も用意する。", cautionEn: "Avoid blocking browser zoom and provide explicit zoom buttons as an alternative.", recipe: "scale=currentDistance/startDistance / transform-origin gesture center / clamp 1..3", curve: "out", trigger: "二本指操作", triggerEn: "Two-finger gesture", inputs: ["タッチ"], inputsEn: ["Touch"], tech: ["Pointer Events", "CSS Transform"] }),

  referenceMotion("svg-stroke-draw", "svg-path", "SVG線描画", "SVG Stroke Draw", "svgStrokeDraw", 1100, "easeOutCubic", ["なめらか"], ["ロゴ", "UI"], "線の長さを先頭から増やし、輪郭を一筆で描くように見せる。", "Reveals a stroke from its start to make the outline appear hand-drawn.", { focus: "線端がパス順に進み、終点へ着いた瞬間に輪郭全体が欠けなく残る。", focusEn: "The stroke head follows path order and leaves a complete outline at the endpoint.", caution: "複数サブパスでは描画順を分け、意味のある順番へ遅延を設定する。", cautionEn: "Split multiple subpaths and assign delays in a meaningful drawing order.", recipe: "pathLength=1 / dasharray 1 / dashoffset 1→0 / 1100ms", curve: "out", trigger: "表示", triggerEn: "Reveal", tech: ["SVG", "CSS", "GSAP DrawSVG"] }),
  referenceMotion("svg-path-morph", "svg-path", "SVGパスモーフ", "SVG Path Morph", "svgPathMorph", 1000, "easeInOutCubic", ["なめらか"], ["ロゴ", "UI"], "同じ意味の二形状を中間パスで連続変形し、状態のつながりを保つ。", "Morphs between related shapes through an interpolated path to preserve state continuity.", { focus: "輪郭点が交差せず近い位置へ移動し、中間形状でも対象の中心を保つ。", focusEn: "Contour points travel to nearby positions without crossing while the shape center stays stable.", caution: "点対応が崩れる場合はパス方向と開始点を揃え、複雑な形状を分割する。", cautionEn: "When point mapping twists, align path direction and start points or split complex shapes.", recipe: "path d A→B / align direction+start point / easeInOut / 1000ms", curve: "inOut", trigger: "状態切替", triggerEn: "State change", tech: ["SVG", "GSAP MorphSVG"] }),
  referenceMotion("svg-trim-path", "svg-path", "区間トリム", "SVG Segment Trim", "svgTrimPath", 900, "easeInOutCubic", ["きびきび"], ["ロゴ", "UI"], "パス上の可視区間だけを移動し、線の先端が経路を走る表現をつくる。", "Moves a visible segment along the path so a stroke head travels the route.", { focus: "線全体ではなく一定長の区間が始点から終点まで移動し、尾側も同時に消える。", focusEn: "A fixed-length segment travels start to end while its trailing edge disappears at the same rate.", caution: "区間が短すぎるとちらつきに見えるため、表示サイズに合わせて長さを決める。", cautionEn: "A segment that is too short reads as flicker, so tune length for the display size.", recipe: "visible stroke 0..24%→76..100% using dasharray+dashoffset / 900ms", curve: "inOut", trigger: "進行", triggerEn: "Progress", tech: ["SVG", "CSS", "GSAP DrawSVG"] }),
  referenceMotion("svg-motion-path", "svg-path", "モーションパス追従", "SVG Motion Path", "svgMotionPath", 1200, "easeInOutCubic", ["なめらか"], ["UI", "キャラクター"], "SVG曲線に沿って対象を移動し、必要に応じて接線方向へ向きを揃える。", "Moves an object along an SVG curve and optionally aligns its rotation to the tangent.", { focus: "対象の中心が常にパス上を通り、曲率の変化に合わせて向きが滑らかに変わる。", focusEn: "The object center stays on the path and rotates smoothly with curvature changes.", caution: "文字や人物の向きが反転すると読みにくいため、自動回転の範囲を制限する。", cautionEn: "Limit auto-rotation when text or characters would become inverted or unreadable.", recipe: "offset-path path(...) / offset-distance 0→100% / rotate auto / 1200ms", curve: "inOut", trigger: "時間・進行", triggerEn: "Time or progress", tech: ["SVG", "CSS Motion Path", "GSAP MotionPath"] }),
  referenceMotion("svg-mask-reveal", "svg-path", "SVGマスクリビール", "SVG Mask Reveal", "svgMaskReveal", 980, "easeOutCubic", ["やわらかい"], ["ロゴ", "テキスト"], "線または面のSVGマスクを広げ、形状に沿って内容を見せる。", "Expands an SVG mask to reveal content along a designed shape.", { focus: "内容自体は動かず、マスクの境界だけが形状に沿って広がって完全表示になる。", focusEn: "Content remains still while only the mask boundary expands to a complete reveal.", caution: "重要な本文を初期状態で隠し切らず、縮小動作では最初から表示する。", cautionEn: "Do not fully hide essential content initially; show it immediately in reduced motion.", recipe: "mask path Scale .05→1.2 / origin center / content fixed / 980ms", curve: "out", trigger: "表示", triggerEn: "Reveal", tech: ["SVG Mask", "CSS", "WAAPI"] }),
  referenceMotion("svg-gradient-flow", "svg-path", "グラデーション流動", "SVG Gradient Flow", "svgGradientFlow", 1300, "linear", ["なめらか"], ["ロゴ", "3D"], "線に沿うグラデーション位置を動かし、エネルギーが流れる方向を示す。", "Moves a gradient along a stroke to communicate directional energy flow.", { focus: "線幅と輪郭を保ったまま明るい色帯だけが始点から終点へ連続して流れる。", focusEn: "Stroke width and outline stay fixed while only the bright color band travels start to end.", caution: "常時ループは視線を奪うため、処理中や選択中など意味のある状態に限定する。", cautionEn: "Continuous loops attract attention, so reserve them for meaningful active states.", recipe: "linearGradient x1/x2 translate -100→100% / stroke fixed / 1300ms loop", curve: "linear", trigger: "処理中", triggerEn: "Active state", tech: ["SVG Gradient", "WAAPI"] }),
  referenceMotion("svg-gooey-merge", "svg-path", "グーイーマージ", "Gooey Merge", "svgGooeyMerge", 1050, "easeInOutCubic", ["やわらかい"], ["ロゴ", "3D"], "二つの円形を近づけ、フィルターの閾値で液体のように連結して一体化する。", "Brings two circles together and uses a filter threshold to merge them like liquid.", { focus: "円同士の間に細い橋が生まれ、中心が重なるにつれて一つの輪郭へ滑らかに統合される。", focusEn: "A narrow bridge forms between circles and smoothly resolves into one contour as centers overlap.", caution: "大きなぼかし領域は描画負荷が高いため、面積と同時表示数を小さく保つ。", cautionEn: "Large blur regions are expensive, so keep paint area and simultaneous objects small.", recipe: "two circles X±44→0 / SVG blur + color-matrix alpha threshold / 1050ms", curve: "inOut", trigger: "結合", triggerEn: "Merge", tech: ["SVG Filter", "WAAPI"], cost: "描画注意", costEn: "Paint-sensitive" }),
  referenceMotion("svg-signature", "svg-path", "署名ストローク", "Signature Stroke", "svgSignature", 1500, "easeInOutCubic", ["なめらか"], ["ロゴ", "テキスト"], "筆順に合わせて複数パスをつなぎ、署名や手書き線を段階的に完成させる。", "Sequences multiple paths in writing order to complete a signature or hand-drawn mark.", { focus: "各ストロークの終点から次の始点へ自然につながり、最後の払いまで連続して見える。", focusEn: "Each stroke leads naturally into the next start and remains continuous through the final flourish.", caution: "長い文字列を待たせず、短いロゴや装飾署名だけに使用する。", cautionEn: "Avoid delaying long text; use only for short marks and decorative signatures.", recipe: "3 paths dashoffset 1→0 / delays from path length / round caps / 1500ms", curve: "inOut", trigger: "表示", triggerEn: "Reveal", tech: ["SVG", "CSS", "GSAP DrawSVG"] }),

  referenceMotion("popover-transition", "web-layout", "ポップオーバー出入り", "Popover Enter and Exit", "popoverTransition", 520, "easeOutCubic", ["きびきび"], ["UI", "テキスト"], "トリガー辺を起点にポップオーバーを展開し、閉じるときも同じ関係を逆再生する。", "Opens a popover from its trigger edge and reverses the relationship on exit.", { focus: "トリガーに近い角を固定して面が拡大し、閉じる間もdisplay前に退場動作を完了する。", focusEn: "The nearest corner stays anchored, and exit completes before the element leaves display.", caution: "見た目と別にフォーカス移動、外側クリック、Escapeの閉じる操作を実装する。", cautionEn: "Implement focus movement, outside click, and Escape behavior independently of visuals.", recipe: "@starting-style opacity 0 Scale .94 / transition-behavior allow-discrete / 520ms", curve: "out", trigger: "開閉", triggerEn: "Open or close", tech: ["CSS", "Popover API"] }),
  referenceMotion("dialog-top-layer", "web-layout", "トップレイヤーダイアログ", "Top Layer Dialog", "dialogTopLayer", 620, "easeOutCubic", ["なめらか"], ["UI", "テキスト"], "背景を暗くしながらダイアログ面を短く持ち上げ、操作階層の変更を示す。", "Dims the backdrop while lifting a dialog surface to communicate a new interaction layer.", { focus: "背景と面が別の速度で現れ、面が静止した時点で入力先がダイアログ内に限定される。", focusEn: "Backdrop and surface enter at different rates, then input is confined when the surface settles.", caution: "dialog要素のモーダル挙動とフォーカストラップを視覚効果より優先する。", cautionEn: "Prioritize native dialog modal behavior and focus containment over visual treatment.", recipe: "dialog opacity 0→1 Y18→0 / ::backdrop 0→.65 / allow-discrete", curve: "out", trigger: "ダイアログ表示", triggerEn: "Dialog open", tech: ["CSS", "Dialog API"] }),
  referenceMotion("view-transition-circle", "web-layout", "円形ビュー遷移", "Circular View Transition", "viewTransitionCircle", 760, "easeInOutCubic", ["きびきび"], ["UI"], "押した位置から円形クリップを広げ、新しいビューを起点付きで表示する。", "Expands a circular clip from the activation point to reveal the new view with a clear origin.", { focus: "クリック位置を中心に円が画面対角まで広がり、新旧ビューの切替起点が明確に残る。", focusEn: "A circle grows from the click point to the viewport diagonal, preserving the transition origin.", caution: "未対応環境では即時切替へフォールバックし、ナビゲーションを止めない。", cautionEn: "Fall back to an immediate navigation in unsupported environments.", recipe: "startViewTransition / new(root) clip-path circle(0→max at click XY) / 760ms", curve: "inOut", trigger: "画面遷移", triggerEn: "View change", tech: ["View Transition API", "CSS"] }),
  referenceMotion("discrete-exit", "web-layout", "離散プロパティ退場", "Discrete Property Exit", "discreteExit", 480, "easeInCubic", ["きびきび"], ["UI"], "opacityと移動を終えてからdisplayを切り替え、退場アニメーションを失わず非表示にする。", "Finishes opacity and travel before changing display so exit motion can complete.", { focus: "面が縮小・減衰した最後のフレームまで描画され、その直後だけ操作対象から外れる。", focusEn: "The surface remains rendered through the final fade frame and leaves interaction immediately after.", caution: "非表示中のフォーカス残留を防ぎ、支援技術からも状態を正しく外す。", cautionEn: "Prevent focus from remaining in hidden content and update assistive state correctly.", recipe: "transition opacity,transform,display / allow-discrete / display none after exit", curve: "in", trigger: "閉じる", triggerEn: "Close", tech: ["CSS", "Discrete Transitions"] }),
  referenceMotion("auto-height-expand", "web-layout", "自動高さ展開", "Intrinsic Height Expand", "autoHeightExpand", 650, "easeOutCubic", ["なめらか"], ["UI", "テキスト"], "内容量に依存する高さへ展開し、固定値を持たずに周囲のレイアウトを押し下げる。", "Expands to content-dependent height without hardcoding the final size.", { focus: "見出し位置を保ったまま内容面と周囲の項目が同じ進行で移動し、自然な最終高さへ止まる。", focusEn: "The heading stays anchored while content and surrounding items move together to intrinsic height.", caution: "対応状況を確認し、未対応環境ではgrid行または測定値による代替を用意する。", cautionEn: "Check support and provide a grid-row or measured-height fallback where needed.", recipe: "height 0→calc-size(auto) / overflow clip / opacity delay 80ms / 650ms", curve: "out", trigger: "展開", triggerEn: "Expand", tech: ["CSS", "calc-size()"] }),
  referenceMotion("page-transition-stack", "web-layout", "ページスタック遷移", "Page Stack Transition", "pageTransitionStack", 720, "easeInOutCubic", ["なめらか"], ["UI", "テキスト"], "新しいページ面を前方へ積み、戻るときは元の面を奥から復元して階層を示す。", "Stacks a new page in front and restores the previous surface from behind on back navigation.", { focus: "前進では新画面が下から入り旧画面が少し縮み、戻る操作では正確に逆方向へ再生される。", focusEn: "Forward motion brings the new view up while shrinking the old, and back navigation reverses it exactly.", caution: "無関係なページに階層方向を付けず、履歴の前後関係がある遷移だけに使う。", cautionEn: "Use this only for true history hierarchy, not unrelated pages with no spatial relationship.", recipe: "old Scale 1→.94 Y0→-10 / new Y100%→0 / reverse on back / 720ms", curve: "inOut", trigger: "履歴遷移", triggerEn: "History navigation", tech: ["View Transition API", "CSS"] })
];

window.MOTION_LIBRARY.push(...ADVANCED_WEB_MOTIONS);
