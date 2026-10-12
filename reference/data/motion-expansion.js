(() => {
  const c = (key, ja, en, glyph, haptic = false) => ({ key, ja, en, glyph, haptic });

  const families = [
    {
      id: "ui-button", label: "UIボタン", labelEn: "UI Buttons", icon: "pointer", family: "button",
      trigger: "押下・長押し・完了", triggerEn: "Press, hold, or completion", inputs: ["タッチ", "マウス", "キーボード"], inputsEn: ["Touch", "Pointer", "Keyboard"],
      concepts: [
        c("bounce-press", "バウンスプレス", "Bounce Press", "TAP", true), c("jelly-squash", "ジェリースカッシュ", "Jelly Squash", "JELLY", true),
        c("tap-ripple", "タップリップル", "Tap Ripple", "RIPPLE", true), c("pulse-glow", "パルスグロー", "Pulse Glow", "PULSE", true),
        c("error-shake", "エラーシェイク", "Error Shake", "ERROR", true), c("fill-sweep", "フィルスイープ", "Fill Sweep", "FILL", true),
        c("send-morph", "送信モーフ", "Send Morph", "SEND", true), c("push-3d", "3Dプッシュ", "3D Push", "PUSH", true),
        c("confetti-burst", "紙吹雪バースト", "Confetti Burst", "YEAH", true), c("hold-confirm", "長押し確定", "Hold to Confirm", "HOLD", true),
        c("border-draw", "ボーダードロー", "Border Draw", "TRACE", true), c("shine-sweep", "シャインスイープ", "Shine Sweep", "SHINE", true),
        c("loading-success", "読込から成功", "Loading to Success", "DONE", true), c("icon-swap", "アイコンスワップ", "Icon Swap", "SWAP", true),
        c("heartbeat", "ハートビート", "Heartbeat", "LOVE", true), c("wobble-tilt", "ウォブルチルト", "Wobble Tilt", "WOBBLE", true),
        c("elastic-drag", "エラスティックドラッグ", "Elastic Drag", "DRAG", true), c("inner-press", "インナープレス", "Inner Press", "PRESS", true),
        c("color-splash", "カラースプラッシュ", "Color Splash", "COLOR", true), c("breathing-gradient", "呼吸グラデーション", "Breathing Gradient", "AURORA", true)
      ]
    },
    {
      id: "ui-control", label: "選択・コントロール", labelEn: "Selection & Controls", icon: "form", family: "control",
      trigger: "選択・状態切替", triggerEn: "Selection or state change", inputs: ["タッチ", "マウス", "キーボード"], inputsEn: ["Touch", "Pointer", "Keyboard"],
      concepts: [
        c("spring-switch", "スプリングスイッチ", "Springy Switch", "ON", true), c("day-night", "昼夜トグル", "Day and Night", "DAY", true),
        c("liquid-stretch", "リキッドストレッチ", "Liquid Stretch", "LIQ", true), c("check-draw", "チェック描画", "Check Draw", "CHECK", true),
        c("heart-like", "ハートいいね", "Heart Like", "LIKE", true), c("lock-unlock", "ロック解除", "Lock and Unlock", "LOCK", true),
        c("mute-pop", "ミュートポップ", "Mute Pop", "MUTE", true), c("play-pause", "再生停止モーフ", "Play and Pause", "PLAY", true),
        c("sliding-underline", "スライド下線", "Sliding Underline", "TAB", true), c("pill-indicator", "ピルインジケーター", "Pill Indicator", "PILL", true),
        c("bubble-expand", "バブル展開", "Bubble Expand", "BUBBLE", true), c("jumping-dot", "ジャンプドット", "Jumping Dot", "DOT", true),
        c("liquid-blob", "リキッドブロブ", "Liquid Blob", "BLOB", true), c("tint-shift", "ティントシフト", "Tint Shift", "TINT", true)
      ]
    },
    {
      id: "ui-navigation", label: "ナビ・オーバーレイ", labelEn: "Navigation & Overlays", icon: "layout", family: "navigation",
      trigger: "画面・階層の切替", triggerEn: "View or hierarchy change", inputs: ["タッチ", "マウス", "キーボード"], inputsEn: ["Touch", "Pointer", "Keyboard"],
      concepts: [
        c("hero-expand", "ヒーロー展開", "Hero Expand", "HERO", true), c("spring-sheet", "スプリングシート", "Spring Sheet", "SHEET", true),
        c("card-flip", "カードフリップ", "Card Flip", "FLIP", true), c("circular-reveal", "円形リビール", "Circular Reveal", "REVEAL", true),
        c("parallax-push", "パララックスプッシュ", "Parallax Push", "PUSH", true), c("staggered-reveal", "段階リビール", "Staggered Reveal", "STEPS", true)
      ]
    },
    {
      id: "ui-loading", label: "ローダー・進捗", labelEn: "Loading & Progress", icon: "data", family: "loading",
      trigger: "待機・処理進捗", triggerEn: "Waiting or processing progress", inputs: ["自動"], inputsEn: ["Automatic"],
      concepts: [
        c("bouncing-dots", "バウンドドット", "Bouncing Dots", "•••", true), c("gradient-arc", "グラデーションアーク", "Gradient Arc", "ARC", true),
        c("progress-success", "進捗から成功", "Progress to Success", "100", true), c("skeleton-shimmer", "スケルトンシマー", "Skeleton Shimmer", "LOAD", true),
        c("typing-indicator", "入力インジケーター", "Typing Indicator", "TYPE", true), c("equalizer-bars", "イコライザーバー", "Equalizer Bars", "EQ", true),
        c("orbit-trail", "オービットトレイル", "Orbit Trail", "ORBIT", true)
      ]
    },
    {
      id: "ui-feedback", label: "通知・リアクション", labelEn: "Feedback & Reactions", icon: "focus", family: "feedback",
      trigger: "成功・評価・リアクション", triggerEn: "Success, rating, or reaction", inputs: ["タッチ", "マウス", "自動"], inputsEn: ["Touch", "Pointer", "Automatic"],
      concepts: [
        c("heart-burst", "ハートバースト", "Heart Burst", "♥", true), c("star-rating", "星評価", "Star Rating", "★", true),
        c("clap-counter", "拍手カウンター", "Clap Counter", "+1", true), c("emoji-bar", "絵文字バー", "Emoji Bar", "WOW", true),
        c("number-ticker", "数値ティッカー", "Number Ticker", "128", true), c("confetti-rain", "紙吹雪レイン", "Confetti Rain", "NICE", true)
      ]
    },
    {
      id: "game-hud", label: "ゲームHUD", labelEn: "Game HUD", icon: "grid", family: "hud",
      trigger: "値・対象・位置の更新", triggerEn: "Value, target, or position update", inputs: ["自動", "ゲーム入力"], inputsEn: ["Automatic", "Game input"],
      concepts: [
        c("coin-collect", "コイン回収", "Coin Collect", "+25", true), c("hp-ghost-bar", "HPゴーストバー", "HP Ghost Bar", "HP", true),
        c("cooldown-ability", "クールダウン", "Cooldown Ability", "CD", true), c("score-rollup", "スコアロールアップ", "Score Roll-up", "999", true),
        c("stamina-pulse", "スタミナ脈動", "Stamina Pulse", "SP"), c("ammo-reload", "弾薬リロード", "Ammo Reload", "12/30"),
        c("compass-lock", "コンパスロック", "Compass Lock", "N 45"), c("minimap-ping", "ミニマップピン", "Minimap Ping", "PING"),
        c("objective-marker", "目標マーカー", "Objective Marker", "OBJ"), c("resource-cap", "資源上限警告", "Resource Cap", "MAX"),
        c("party-status", "パーティ状態", "Party Status", "TEAM"), c("buff-timer", "バフタイマー", "Buff Timer", "BUFF")
      ]
    },
    {
      id: "game-combat", label: "戦闘・ヒット表現", labelEn: "Combat & Hit FX", icon: "wave", family: "combat",
      trigger: "攻撃・防御・命中", triggerEn: "Attack, defense, or hit", inputs: ["ゲーム入力", "自動"], inputsEn: ["Game input", "Automatic"],
      concepts: [
        c("damage-numbers", "ダメージ数値", "Damage Numbers", "-248", true), c("combo-counter", "コンボカウンター", "Combo Counter", "12 HIT", true),
        c("critical-flash", "クリティカルフラッシュ", "Critical Flash", "CRIT", true), c("hit-confirm", "ヒット確認", "Hit Confirm", "HIT"),
        c("guard-break", "ガードブレイク", "Guard Break", "BREAK"), c("perfect-dodge", "ジャスト回避", "Perfect Dodge", "DODGE"),
        c("parry-window", "パリィ成功", "Parry Window", "PARRY"), c("status-ailment", "状態異常付与", "Status Ailment", "POISON")
      ]
    },
    {
      id: "game-reward", label: "報酬・獲得演出", labelEn: "Rewards & Loot", icon: "light", family: "reward",
      trigger: "獲得・開封・達成", triggerEn: "Earn, open, or achieve", inputs: ["ゲーム入力", "自動"], inputsEn: ["Game input", "Automatic"],
      concepts: [
        c("level-up", "レベルアップ", "Level Up Burst", "LEVEL UP", true), c("chest-open", "宝箱オープン", "Chest Open", "OPEN", true),
        c("three-star", "三つ星クリア", "Three Star Clear", "★★★", true), c("gacha-pull", "ガチャ排出", "Gacha Pull", "SSR", true),
        c("new-record", "新記録スタンプ", "New Record Stamp", "NEW", true), c("loot-rarity", "レア度確定", "Loot Rarity", "EPIC"),
        c("achievement", "実績解除", "Achievement Unlock", "UNLOCK"), c("daily-bonus", "デイリーボーナス", "Daily Bonus", "DAY 7"),
        c("currency-rain", "通貨レイン", "Currency Rain", "+500"), c("reward-card", "報酬カード公開", "Reward Card Reveal", "CARD")
      ]
    },
    {
      id: "game-progress", label: "成長・クエスト", labelEn: "Progression & Quests", icon: "arrow", family: "progress",
      trigger: "成長・解放・進捗更新", triggerEn: "Growth, unlock, or progress update", inputs: ["ゲーム入力", "自動"], inputsEn: ["Game input", "Automatic"],
      concepts: [
        c("quest-banner", "クエストバナー", "Quest Banner", "QUEST", true), c("skill-unlock", "スキル解放", "Skill Unlock", "SKILL", true),
        c("login-streak", "連続ログイン", "Login Streak", "7 DAYS", true), c("energy-refill", "エネルギー回復", "Energy Refill", "FULL", true),
        c("xp-overflow", "XP繰り上がり", "XP Overflow", "XP"), c("battle-pass", "バトルパス進行", "Battle Pass", "TIER 8"),
        c("mission-step", "ミッション段階", "Mission Step", "3/5"), c("rank-up", "ランク昇格", "Rank Up", "RANK A"),
        c("collection-complete", "収集コンプリート", "Collection Complete", "100%")
      ]
    },
    {
      id: "game-cinematic", label: "ゲーム演出・警告", labelEn: "Game Cinematics", icon: "fx", family: "cinematic",
      trigger: "イベント・警告・局面切替", triggerEn: "Event, warning, or phase change", inputs: ["自動", "ゲーム入力"], inputsEn: ["Automatic", "Game input"],
      concepts: [
        c("lucky-roulette", "ラッキールーレット", "Lucky Roulette", "LUCK", true), c("countdown-go", "カウントダウンGO", "Countdown GO!", "GO!", true),
        c("boss-warning", "ボス警告", "Boss Warning", "WARNING", true), c("victory-title", "勝利タイトル", "Victory Title", "VICTORY"),
        c("defeat-dissolve", "敗北ディゾルブ", "Defeat Dissolve", "DEFEAT"), c("chapter-intro", "チャプター導入", "Chapter Intro", "CHAPTER 4"),
        c("raid-start", "レイド開始", "Raid Start", "RAID"), c("letterbox-focus", "シネマ帯フォーカス", "Letterbox Focus", "SCENE")
      ]
    }
  ];

  const experimentalFamilies = [
    {
      id: "ui-spatial", label: "空間UI・奥行き", labelEn: "Spatial UI & Depth", icon: "expand", family: "spatial",
      trigger: "ポインタ・フォーカス・階層移動", triggerEn: "Pointer, focus, or hierarchy movement", inputs: ["タッチ", "マウス", "キーボード"], inputsEn: ["Touch", "Pointer", "Keyboard"],
      concepts: [
        c("cursor-depth-pull", "カーソル奥行きプル", "Cursor Depth Pull", "DEPTH"), c("focus-portal", "フォーカスポータル", "Focus Portal", "PORTAL"),
        c("radial-command-bloom", "放射コマンドブルーム", "Radial Command Bloom", "MENU"), c("spatial-breadcrumb", "空間パンくず", "Spatial Breadcrumb", "PATH"),
        c("perspective-dock", "遠近ドック", "Perspective Dock", "DOCK"), c("layer-peel", "レイヤーピール", "Layer Peel", "PEEL"),
        c("tooltip-orbit", "ツールチップ軌道", "Tooltip Orbit", "TIP"), c("depth-lens", "奥行きレンズ", "Depth Lens", "LENS"),
        c("magnetic-constellation", "磁気コンステレーション", "Magnetic Constellation", "NODES"), c("infinite-canvas-jump", "無限キャンバスジャンプ", "Infinite Canvas Jump", "JUMP"),
        c("z-notification", "Z軸通知", "Z-axis Notification", "NOTICE"), c("camera-dolly-ui", "カメラドリーUI", "Camera Dolly UI", "DOLLY"),
        c("volumetric-menu", "ボリュームメニュー", "Volumetric Menu", "VOLUME"), c("parallax-inspector", "パララックス検査面", "Parallax Inspector", "LAYERS"),
        c("spatial-search", "空間検索リビール", "Spatial Search Reveal", "SEARCH"), c("orbit-context", "軌道コンテキストメニュー", "Orbiting Context Menu", "CONTEXT"),
        c("depth-stack-reorder", "奥行きスタック並べ替え", "Depth Stack Reorder", "STACK"), c("calendar-fold", "遠近カレンダーフォールド", "Perspective Calendar Fold", "DATE"),
        c("cursor-raycast", "カーソルレイキャスト選択", "Cursor Raycast Select", "SELECT"), c("spatial-audio-locator", "空間オーディオロケーター", "Spatial Audio Locator", "AUDIO")
      ]
    },
    {
      id: "ui-material", label: "質感・マテリアル変形", labelEn: "Material & Surface Motion", icon: "light", family: "material",
      trigger: "選択・接触・状態変化", triggerEn: "Selection, contact, or state change", inputs: ["タッチ", "マウス", "自動"], inputsEn: ["Touch", "Pointer", "Automatic"],
      concepts: [
        c("liquid-tab-bridge", "液体タブブリッジ", "Liquid Tab Bridge", "LIQUID"), c("gel-button-split", "ジェルボタン分裂", "Gel Button Split", "GEL"),
        c("glass-refraction", "ガラス屈折ホバー", "Glass Refraction Hover", "GLASS"), c("ink-adhesion", "インク吸着", "Ink Adhesion", "INK"),
        c("metallic-foil", "メタリック箔チルト", "Metallic Foil Tilt", "FOIL"), c("soft-body-toggle", "ソフトボディトグル", "Soft Body Toggle", "SOFT"),
        c("viscous-progress", "粘性プログレス", "Viscous Progress", "FLOW"), c("chromatic-glass-edge", "色分散ガラスエッジ", "Chromatic Glass Edge", "PRISM"),
        c("paper-fold", "ペーパーフォールド", "Paper Fold Reveal", "FOLD"), c("cloth-wave", "クロスウェーブパネル", "Cloth Wave Panel", "CLOTH"),
        c("bubble-merge", "バブル結合メニュー", "Bubble Merge Menu", "MERGE"), c("frost-melt", "フロスト融解アンロック", "Frost Melt Unlock", "MELT"),
        c("membrane-press", "メンブレンプレス", "Elastic Membrane Press", "PRESS"), c("sand-dissolve", "砂状ステート切替", "Sand Dissolve State", "SAND"),
        c("oil-slick", "オイルスリック選択", "Oil Slick Selection", "SLICK"), c("magnetic-fluid", "磁性流体バッジ", "Magnetic Fluid Badge", "FERRO"),
        c("glass-crack-recover", "ガラス亀裂リカバー", "Glass Crack Recover", "CRACK"), c("neon-tube-draw", "ネオン管ドロー", "Neon Tube Draw", "NEON"),
        c("chrome-ripple", "クローム面リップル", "Chrome Ripple Surface", "CHROME"), c("clay-icon-morph", "クレイアイコンモーフ", "Clay Morph Icon", "CLAY")
      ]
    },
    {
      id: "kinetic-type", label: "キネティック文字", labelEn: "Kinetic Typography", icon: "text", family: "typemotion",
      trigger: "見出し表示・値更新・スクロール", triggerEn: "Heading reveal, value update, or scroll", inputs: ["自動", "スクロール"], inputsEn: ["Automatic", "Scroll"],
      concepts: [
        c("glyph-slot-roll", "グリフスロットロール", "Glyph Slot Roll", "GLYPH"), c("variable-font-pulse", "可変フォントパルス", "Variable Font Pulse", "WEIGHT"),
        c("text-path-orbit", "文字パス軌道", "Text Path Orbit", "ORBIT"), c("word-gravity", "ワード重力落下", "Word Gravity Drop", "GRAVITY"),
        c("character-magnetize", "文字マグネット整列", "Character Magnetize", "MAGNET"), c("line-break-reflow", "改行リフロー", "Line Break Reflow", "REFLOW"),
        c("terminal-decode", "ターミナルデコード", "Terminal Decode", "DECODE"), c("counterweight-headline", "カウンターウェイト見出し", "Counterweight Headline", "BALANCE"),
        c("echo-caption", "エコートレイル字幕", "Echo Trail Caption", "ECHO"), c("kinetic-kerning", "キネティックカーニング", "Kinetic Kerning", "KERN"),
        c("vertical-type-cascade", "縦組みカスケード", "Vertical Type Cascade", "VERTICAL"), c("baseline-wave", "ベースラインウェーブ", "Masked Baseline Wave", "WAVE"),
        c("letter-collision", "文字衝突バウンス", "Letter Collision Bounce", "COLLIDE"), c("type-tunnel", "文字遠近トンネル", "Perspective Type Tunnel", "TUNNEL"),
        c("chapter-index-scrub", "章番号スクラブ", "Scrubbed Chapter Index", "CH.04"), c("type-hinge", "文字ヒンジフリップ", "Type Hinge Flip", "HINGE"),
        c("focus-word-explosion", "注目語エクスプロージョン", "Focus Word Explosion", "FOCUS"), c("mono-data-shuffle", "等幅データシャッフル", "Monospace Data Shuffle", "0101"),
        c("stroke-catchup", "手書き線キャッチアップ", "Handwritten Stroke Catch-up", "WRITE"), c("headline-ribbon", "見出しリボンラップ", "Headline Ribbon Wrap", "RIBBON")
      ]
    },
    {
      id: "game-impact-fx", label: "ゲーム瞬間FX", labelEn: "Game Impact FX", icon: "fx", family: "impactfx",
      trigger: "命中・警告・決着・報酬", triggerEn: "Hit, warning, finisher, or reward", inputs: ["ゲーム入力", "自動"], inputsEn: ["Game input", "Automatic"],
      concepts: [
        c("hit-stop", "ヒットストップフレーム", "Hit-stop Frame", "STOP"), c("shockwave-type", "衝撃波タイポ", "Shockwave Typography", "BOOM"),
        c("slash-reveal", "方向スラッシュリビール", "Directional Slash Reveal", "SLASH"), c("freeze-color-drain", "静止色抜き", "Freeze-frame Color Drain", "FREEZE"),
        c("combo-heat", "コンボ熱量上昇", "Combo Heat Escalation", "HEAT"), c("edge-damage", "画面端ダメージ脈動", "Screen-edge Damage Pulse", "DANGER"),
        c("armor-crack", "アーマー亀裂網", "Armor Crack Network", "CRACK"), c("critical-compress", "クリティカルレンズ圧縮", "Critical Lens Compression", "CRITICAL"),
        c("phase-shatter", "ボスフェーズ破砕", "Boss Phase Shatter", "PHASE"), c("speedline-tunnel", "スピードライントンネル", "Speedline Tunnel", "RUSH"),
        c("parry-time-slice", "パリィ時間スライス", "Parry Time Slice", "PARRY"), c("element-burst", "属性アフィニティバースト", "Elemental Affinity Burst", "ELEMENT"),
        c("camera-kick", "カメラキックHUD", "Camera Kick HUD", "KICK"), c("afterimage-dash", "残像ダッシュ", "Afterimage Dash", "DASH"),
        c("victory-hold", "勝利インパクトホールド", "Victory Impact Hold", "WIN"), c("loot-beam", "ルートビーム柱", "Loot Beam Column", "LOOT"),
        c("warning-stripe", "警告ストライプスラム", "Warning Stripe Slam", "ALERT"), c("shield-recharge", "シールド再充填スイープ", "Shield Recharge Sweep", "SHIELD"),
        c("mission-stamp", "ミッションスタンプパンチ", "Mission Stamp Punch", "CLEAR"), c("finisher-cut", "フィニッシャータイトルカット", "Finisher Title Cut", "FINISH")
      ]
    },
    {
      id: "data-story", label: "データ・物語化", labelEn: "Data Storytelling", icon: "data", family: "datastory",
      trigger: "データ更新・比較・進捗", triggerEn: "Data update, comparison, or progress", inputs: ["自動", "スクロール", "マウス"], inputsEn: ["Automatic", "Scroll", "Pointer"],
      concepts: [
        c("sankey-flow", "サンキー流量リビール", "Sankey Flow Reveal", "FLOW"), c("odometer-cascade", "指標オドメーター", "Metric Odometer Cascade", "128K"),
        c("threshold-wave", "閾値アラーム波", "Threshold Alarm Wave", "LIMIT"), c("confidence-fog", "予測信頼度フォグ", "Forecast Confidence Fog", "82%"),
        c("signal-pulse-map", "ライブ信号パルスマップ", "Live Signal Pulse Map", "LIVE"), c("delta-split", "比較デルタ分割", "Comparison Delta Split", "+24"),
        c("timeline-trail", "タイムライン軌跡", "Timeline Scrub Trail", "TIME"), c("topology-bloom", "ネットワークトポロジー展開", "Network Topology Bloom", "NODES"),
        c("milestone-firefly", "進捗マイルストーン蛍", "Progress Milestone Firefly", "75%"), c("heatmap-ripple", "ヒートマップ注目波", "Heatmap Ripple Focus", "HOT"),
        c("stream-breathe", "ストリームグラフ呼吸", "Stream Graph Breathing", "STREAM"), c("rank-ladder", "順位ラダー上昇", "Rank Ladder Climb", "#03"),
        c("cluster-merge", "データクラスタ結合", "Data Cluster Merge", "MERGE"), c("event-domino", "イベント列ドミノ", "Event Sequence Domino", "EVENT"),
        c("kpi-relay", "KPIスポットライトリレー", "KPI Spotlight Relay", "KPI"), c("budget-bloom", "放射予算ブルーム", "Radial Budget Bloom", "BUDGET"),
        c("calendar-density", "カレンダー密度スイープ", "Calendar Density Sweep", "WEEK"), c("queue-compress", "ライブキュー圧縮", "Live Queue Compression", "QUEUE"),
        c("sentiment-spectrum", "感情スペクトラム遷移", "Sentiment Spectrum Shift", "MOOD"), c("goal-projection", "目標予測アーク", "Goal Projection Arc", "GOAL")
      ]
    }
  ];

  const allFamilies = [...families, ...experimentalFamilies];

  const treatments = [
    { key: "precise", ja: "精密", en: "Precise", descriptionJa: "短い移動と明確な停止で情報を最優先にする", descriptionEn: "prioritizes information with short travel and a clean stop", duration: 560, easing: "easeOutCubic", feeling: "きびきび", curve: "out", accent: "cyan", cueJa: "軽い選択感", cueEn: "Light selection", cost: "軽い", costEn: "Light" },
    { key: "spring", ja: "スプリング", en: "Spring", descriptionJa: "押し込みとオーバーシュートで触れた反発を伝える", descriptionEn: "uses compression and overshoot to suggest tactile rebound", duration: 820, easing: "easeOutBack", feeling: "弾む", curve: "outBack", accent: "purple", cueJa: "柔らかな反発", cueEn: "Soft rebound", cost: "軽い", costEn: "Light" },
    { key: "impact", ja: "インパクト", en: "Impact", descriptionJa: "予備動作・衝撃・減衰を分けてゲーム的な強さをつくる", descriptionEn: "separates anticipation, impact, and decay for game-like force", duration: 980, easing: "easeOutExpo", feeling: "重い", curve: "impact", accent: "coral", cueJa: "硬い衝撃", cueEn: "Rigid impact", cost: "標準", costEn: "Moderate" },
    { key: "luminous", ja: "ルミナス", en: "Luminous", descriptionJa: "輪郭光・走査光・残光で状態の価値を高める", descriptionEn: "adds edge light, scanning highlights, and afterglow to raise perceived value", duration: 1280, easing: "easeInOutCubic", feeling: "なめらか", curve: "inOut", accent: "yellow", cueJa: "上昇する成功感", cueEn: "Rising success", cost: "描画注意", costEn: "Paint-sensitive" },
    { key: "kinetic", ja: "キネティック", en: "Kinetic", descriptionJa: "軌道・追従・段階遅延で画面内の流れを可視化する", descriptionEn: "visualizes screen flow with paths, follow-through, and stagger", duration: 1160, easing: "easeInOutCubic", feeling: "なめらか", curve: "inOut", accent: "purple", cueJa: "連続するリズム", cueEn: "Sequenced rhythm", cost: "標準", costEn: "Moderate" }
  ];

  const categoryTips = {
    button: ["押下と反応の開始を同じフレームに揃える", "完了状態ではラベルと役割を読み取れる形に戻す", "連打しても前回の余韻が操作を妨げないようにする"],
    control: ["選択前後の位置関係を保ったまま状態をつなぐ", "色だけでなく形と位置でも選択状態を示す", "キーボード操作時も同じフィードバックを返す"],
    navigation: ["遷移元と遷移先の共通要素を視線の手掛かりにする", "前進と戻る操作で空間方向を正しく反転する", "フォーカス移動は視覚演出とは別に保証する"],
    loading: ["実際の進捗がない場合は確定値に見せない", "待機から完了へ静止状態を明確に切り替える", "常時ループする描画面積と要素数を抑える"],
    feedback: ["原因となる入力の近くから反応を開始する", "成功・失敗・評価を色以外の形でも区別する", "繰り返すほど演出を弱められる設計にする"],
    hud: ["プレイ中の周辺視野でも変化量を判別できるようにする", "数値とゲージの更新タイミングを一致させる", "常時動く要素を重要な値だけに限定する"],
    combat: ["命中フレームと視覚的な衝撃点を一致させる", "強弱をサイズだけでなく速度と減衰でも分ける", "連続発生時に数値とエフェクトが重ならないようにする"],
    reward: ["希少度ごとに予備動作と静止時間を段階化する", "報酬名を読める静止フレームを十分に確保する", "スキップしても獲得結果が失われないようにする"],
    progress: ["現在値・増加量・次の目標を一つの流れで示す", "複数報酬は重要度順に段階表示する", "長い成長演出には短縮またはスキップを用意する"],
    cinematic: ["操作不能になる時間を演出前に明確に区切る", "警告とタイトルは最終フレームで必ず読めるようにする", "繰り返し見る場面には短縮版を用意する"],
    spatial: ["奥行き方向を画面階層や操作対象と一致させる", "遠近変形中も文字が読める角度に制限する", "動きを減らす設定では平面のフェードへ置き換える"],
    material: ["素材らしい変形速度と復元速度を分けて設計する", "ぼかしや合成は対象面積を小さく保つ", "質感効果の後も操作状態を形で判別できるようにする"],
    typemotion: ["読字順と文字の出現順を一致させる", "見出しを読める静止時間を動きより長く確保する", "本文や重要情報では変形量を小さくする"],
    impactfx: ["衝撃の原因と最大変形のフレームを一致させる", "白フラッシュや揺れは短く一度だけ使用する", "連続発生時は強度を自動で下げる"],
    datastory: ["データの増減方向と視覚的な移動方向を揃える", "装飾ではなく比較対象と変化量を最初に読ませる", "実値がない区間を確定進捗のように見せない"]
  };

  const expansionCategories = allFamilies.map(({ id, label, labelEn, icon }) => ({ id, label, labelEn, icon }));
  window.MOTION_CATEGORIES.push(...expansionCategories);

  const treatmentFor = (concept, family, action) => {
    const key = concept.key;
    if (/glow|shine|gradient|foil|glass|prism|neon|beam|spectrum|firefly|signal|loot|rarity|gacha|aurora|frost/.test(key)) return treatments[3];
    if (/impact|critical|damage|break|crack|slam|hit-|shockwave|warning|stamp|finisher|victory|boss|camera-kick|color-drain/.test(key)) return treatments[2];
    if (/spring|bounce|jelly|liquid|gel|soft-body|membrane|bubble|heartbeat|wobble|elastic|cloth|ripple/.test(key)) return treatments[1];
    if (/drag|sweep|orbit|path|parallax|dolly|trail|dash|flow|scrub|cascade|tunnel|reorder|roll|roulette|line|wave/.test(key)) return treatments[4];
    return treatments[(action + family.family.length) % treatments.length];
  };

  const expanded = [];
  let motionSeed = 0;
  allFamilies.forEach(family => {
    family.concepts.forEach((concept, action) => {
      const treatment = treatmentFor(concept, family, action);
      const key = `${family.id}-${concept.key}`;
      const seed = motionSeed++;
      const duration = treatment.duration + ((seed * 47) % 260) - 80;
      const isGame = family.id.startsWith("game-") || family.family === "impactfx";
      const isExperimental = experimentalFamilies.includes(family);
      const sourceJa = concept.haptic ? "HapticLab移植" : isExperimental ? "Web表現追加" : "Web向け追加設計";
      const sourceEn = concept.haptic ? "Ported from HapticLab" : isExperimental ? "Web expression study" : "Designed for web";
      expanded.push({
        id: `catalog-${key}`,
        category: family.id,
        title: concept.ja,
        titleEn: concept.en,
        pattern: `catalog-${key}`,
        duration,
        easing: treatment.easing,
        feelings: [treatment.feeling],
        usages: isGame ? ["UI", "3D"] : family.family === "typemotion" ? ["UI", "テキスト"] : ["UI"],
        description: `${concept.ja}を、${treatment.descriptionJa}固有の見せ方として設計したモーションリファレンス。`,
        descriptionEn: `A distinct ${concept.en} motion study that ${treatment.descriptionEn}.`,
        accent: treatment.accent,
        featured: false,
        focus: `${concept.ja}では、動きの起点・最大変化・静止までの三段階が他の例と異なる固有のリズムになっている点を見る。`,
        focusEn: `In ${concept.en}, watch the unique rhythm across origin, peak change, and final resting state rather than a reused preset.`,
        caution: `${concept.ja}を実装するときは、同じ画面の他要素へ同じ軌道や強度を繰り返さず、この対象だけの意味に限定する。`,
        cautionEn: `When implementing ${concept.en}, reserve its path and intensity for this meaning instead of repeating the same motion across nearby elements.`,
        tips: categoryTips[family.family],
        tipsEn: [
          `Align the ${concept.en} response with the event that caused it`,
          `Keep this distinct motion signature readable at compact UI sizes`,
          `Resolve ${concept.en} into a stable state before the next input`
        ],
        recipe: `signature/${family.family}/${concept.key} · seed ${seed} · ${duration}ms · peak ${42 + seed % 24}% · settle ${76 + seed % 18}%`,
        curve: treatment.curve,
        trigger: family.trigger,
        triggerEn: family.triggerEn,
        tech: treatment.key === "luminous" || ["material", "impactfx"].includes(family.family) ? ["CSS", "WAAPI", "Compositing"] : ["CSS Transform", "WAAPI"],
        cost: treatment.cost,
        costEn: treatment.costEn,
        inputs: family.inputs,
        inputsEn: family.inputsEn,
        reduced: `${concept.ja}の移動・点滅・反復を省き、意味が伝わる最終状態を150msのフェードで直接表示する。`,
        reducedEn: `Remove travel, flashing, and repetition from ${concept.en}; reveal its meaningful final state with a 150ms fade.`,
        sourceLabel: sourceJa,
        sourceLabelEn: sourceEn,
        hapticCue: treatment.cueJa,
        hapticCueEn: treatment.cueEn,
        catalogFamily: family.family,
        catalogAction: action,
        catalogTreatment: treatment.key,
        catalogGlyph: concept.glyph,
        catalogConcept: concept.key,
        motionSeed: seed,
        motionSignature: `${family.family}/${concept.key}`
      });
    });
  });

  if (expanded.length !== 200) throw new Error(`Motion expansion must contain 200 distinct items, found ${expanded.length}`);
  window.MOTION_LIBRARY.push(...expanded);
})();
