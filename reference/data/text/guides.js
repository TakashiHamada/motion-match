/* テキストモーションリファレンス — 手法ガイド (Technique guides)
   window.TEXT_GUIDES = [ { id, icon, title, titleEn, lead, leadEn, sections:[{h,hEn,body,bodyEn}], related, sources } ]
   ブロック: {p} | {list} | {code, lang} | {table:{head, rows}} | {note}。インラインは `code` のみ。 */
window.TEXT_GUIDES = [

/* ───────────────────────── 1. 分割 ───────────────────────── */
{
  id: "splitting",
  icon: "split",
  title: "文字の分け方（Splitting）",
  titleEn: "Splitting text",
  lead: "テキストモーションの大半は「どの単位に分けて、どの順に動かすか」で決まります。文字・単語・行の分け方と、分割で壊れやすいもの（書記素、日本語の語、カーニング、改行、読み上げ）への対処をまとめます。",
  leadEn: "Most text motion comes down to which unit you split into and in what order you move the pieces. This guide covers splitting by character, word and line, and how to deal with what splitting tends to break: graphemes, Japanese words, kerning, line breaks and screen readers.",
  sections: [
    {
      h: "単位を選ぶ：文字・単語・行",
      hEn: "Choosing a unit: characters, words, lines",
      body: [
        { p: "分割の単位は、動きのリズムと読みやすさの両方を決めます。細かく分けるほど表現は豊かになりますが、要素数・計算量・読み上げの問題も増えます。必要な単位だけを分割するのが原則です（GSAP SplitText の docs も「必要な type だけ分割せよ」と書いています）。" },
        { table: { head: ["単位", "向いている演出", "注意点"], rows: [
          ["文字 (chars)", "見出しの登場、スクランブル、タイプ、波打ち", "要素数が多い。カーニング・合字が失われる。長文には不向き"],
          ["単語 (words)", "本文やリード文の登場、スクロール連動のハイライト、字幕", "日本語は空白が無いので別途区切りが必要"],
          ["行 (lines)", "行マスクのせり上がり、段落単位の登場", "改行位置は幅とフォントで変わる。リサイズ時に再分割が必要"]
        ] } },
        { p: "よく使う組み合わせは「行でマスクし、中身を単語か文字で動かす」です。行の `overflow: clip` で切り口を作り、その中を `translateY(100%)` から戻すと、下からせり上がる定番の登場になります。" }
      ],
      bodyEn: [
        { p: "The unit you split into sets both the rhythm of the motion and how readable it stays. Finer splits allow richer effects but also bring more elements, more work per frame and more screen-reader problems. Split only what you need (the GSAP SplitText docs say the same: split only the types you use)." },
        { table: { head: ["Unit", "Good for", "Watch out for"], rows: [
          ["Characters", "Headline entrances, scrambles, typing, waves", "Many elements. Kerning and ligatures are lost. Poor fit for long text"],
          ["Words", "Body copy and lead text entrances, scroll-linked highlights, captions", "Japanese has no spaces, so it needs its own segmentation"],
          ["Lines", "Line-mask rises, paragraph-level entrances", "Line breaks depend on width and font. Re-split on resize"]
        ] } },
        { p: "A common combination is to mask by line and animate words or characters inside it. Give each line `overflow: clip` as the cut edge and bring the contents back from `translateY(100%)` to get the classic rise-from-below entrance." }
      ]
    },
    {
      h: "書記素と日本語の単語：Intl.Segmenter",
      hEn: "Graphemes and Japanese words: Intl.Segmenter",
      body: [
        { p: "見た目の 1 文字（書記素）は、コードポイント 1 つとは限りません。絵文字の ZWJ 結合、国旗、肌色の修飾子、結合文字の濁点（か + ゛）は、`split('')` はもちろん `[...str]` でも壊れます。`Intl.Segmenter` の `grapheme` を使えば正しく 1 文字ずつに分けられます（Baseline 2024）。" },
        { code: "// 書記素（見た目の 1 文字）に分ける\nconst seg = new Intl.Segmenter('ja', { granularity: 'grapheme' });\nconst chars = Array.from(seg.segment('家族👨‍👩‍👧と🇯🇵'), s => s.segment);\n// → ['家', '族', '👨‍👩‍👧', 'と', '🇯🇵']\n\n// 日本語の単語に分ける。isWordLike で記号・句読点を見分ける\nconst wseg = new Intl.Segmenter('ja', { granularity: 'word' });\nfor (const s of wseg.segment('今日は、晴れです。')) {\n  console.log(s.segment, s.isWordLike);\n}", lang: "js" },
        { p: "日本語の `word` 区切りは形態素に近い細かさで、「は」「です」のような付属語が単独の語になります。モーションの単位として使うなら、`isWordLike` でない記号や短いひらがなの付属語を直前の語にくっつけると、文節に近いまとまりになります（このサイトのデモもこの方法です）。" }
      ],
      bodyEn: [
        { p: "One visible character (a grapheme) is not always one code point. Emoji ZWJ sequences, flags, skin-tone modifiers and combining marks (か + ゛) break with `split('')`, and even with `[...str]`. `Intl.Segmenter` with `grapheme` granularity splits them correctly, one visible character at a time (Baseline 2024)." },
        { code: "// Split into graphemes (visible characters)\nconst seg = new Intl.Segmenter('ja', { granularity: 'grapheme' });\nconst chars = Array.from(seg.segment('家族👨‍👩‍👧と🇯🇵'), s => s.segment);\n// → ['家', '族', '👨‍👩‍👧', 'と', '🇯🇵']\n\n// Split Japanese into words; isWordLike tells punctuation apart\nconst wseg = new Intl.Segmenter('ja', { granularity: 'word' });\nfor (const s of wseg.segment('今日は、晴れです。')) {\n  console.log(s.segment, s.isWordLike);\n}", lang: "js" },
        { p: "Japanese `word` segmentation is close to morpheme level, so particles and auxiliaries such as は or です come out as separate words. For motion, glue non-word-like punctuation and short hiragana particles onto the preceding word to get groups close to bunsetsu (phrases). The demos on this site do exactly that." }
      ]
    },
    {
      h: "文節で区切る：BudouX と word-break: auto-phrase",
      hEn: "Phrase-level splitting: BudouX and word-break: auto-phrase",
      body: [
        { p: "日本語の改行と分割は、文節単位が基本です。BudouX は約 15 KB の機械学習モデルで、日本語・中国語（簡体・繁体）・タイ語の文を文節に区切ります。結果は U+200B（ゼロ幅スペース）区切りの文字列か、`word-break: keep-all; overflow-wrap: anywhere` を付けた span として出力されます。" },
        { code: "import { loadDefaultJapaneseParser } from 'budoux';\nconst parser = loadDefaultJapaneseParser();\nparser.parse('今日は天気です。');\n// → ['今日は', '天気です。']  … この単位で span を作り、stagger する", lang: "js" },
        { p: "表示の改行だけなら、Chrome 119 以降は CSS の `word-break: auto-phrase` で文節改行ができます（`lang=\"ja\"` が必須）。文節単位で改行させておくと、行マスクの演出で語が行の途中で切れません。" },
        { code: "h1:lang(ja) {\n  word-break: auto-phrase; /* 非対応ブラウザは通常の改行 */\n  text-wrap: balance;\n}", lang: "css" }
      ],
      bodyEn: [
        { p: "Japanese line breaking and splitting work best at the bunsetsu (phrase) level. BudouX is a machine-learning model of about 15 KB that splits Japanese, Chinese (Simplified and Traditional) and Thai sentences into phrases. It outputs either a string delimited with U+200B (zero-width space) or spans styled with `word-break: keep-all; overflow-wrap: anywhere`." },
        { code: "import { loadDefaultJapaneseParser } from 'budoux';\nconst parser = loadDefaultJapaneseParser();\nparser.parse('今日は天気です。');\n// → ['今日は', '天気です。']  … make one span per phrase and stagger them", lang: "js" },
        { p: "If you only need display line breaks, Chrome 119+ supports phrase-aware wrapping in CSS with `word-break: auto-phrase` (requires `lang=\"ja\"`). With lines breaking at phrase boundaries, line-mask effects never cut a word in the middle of a line." },
        { code: "h1:lang(ja) {\n  word-break: auto-phrase; /* unsupported browsers fall back to normal breaking */\n  text-wrap: balance;\n}", lang: "css" }
      ]
    },
    {
      h: "分割で失われるもの",
      hEn: "What splitting takes away",
      body: [
        { list: [
          "カーニングと合字：文字ごとに要素を分けると、ペアカーニングと合字（fi・ffi）が効かなくなります。アラビア文字の連結やインド系文字の結合は形が崩れます。こうした文字は単語単位で分けるか、分割しないでください。",
          "transform が効かない：`span` はインライン要素なので、`display: inline-block`（または SplitText の `tag: 'div'`）にしないと transform が効きません。inline-block にすると空白の扱いも変わるので、空白は `white-space: pre` の要素として残します。",
          "入れ子の意味：リンクや強調の中を分割すると、構造と読み上げ名が失われることがあります。分割から除外するか、元のテキストを別に残します。",
          "要素数：1 文字 1 要素だと長文で数百〜数千になり、レイヤーとメモリを圧迫します。長文は単語か行で分けます。",
          "読み上げ：文字ごとの要素はスクリーンリーダーで正しく読まれないことが多い（アクセシビリティのガイドを参照）。"
        ] },
        { note: "アニメーションが終わったら分割を元に戻す（SplitText や anime.js の `revert()`）のが最も確実な後始末です。DOM の量、カーニング、読み上げの問題をまとめて解消できます。" }
      ],
      bodyEn: [
        { list: [
          "Kerning and ligatures: once each character is its own element, pair kerning and ligatures (fi, ffi) stop working. Arabic joining and Indic conjuncts fall apart. Split such scripts by word, or don't split them at all.",
          "Transforms don't apply: `span` is inline, so transforms do nothing until you set `display: inline-block` (or use `tag: 'div'` in SplitText). Inline-block also changes how spaces behave, so keep spaces as `white-space: pre` elements.",
          "Nested meaning: splitting inside links or emphasis can lose structure and accessible names. Exclude them from the split or keep the original text separately.",
          "Element count: one element per character runs into hundreds or thousands on long text, which costs layers and memory. Split long text by word or line.",
          "Screen readers: per-character elements are often read incorrectly (see the accessibility guide)."
        ] },
        { note: "The most reliable cleanup is to undo the split once the animation finishes (`revert()` in SplitText or anime.js). That fixes DOM size, kerning and screen-reader issues in one go." }
      ]
    },
    {
      h: "フォント読み込みとリサイズで再分割",
      hEn: "Re-splitting after font load and on resize",
      body: [
        { p: "行の分割と文字位置の計測は、Web フォントが読み込まれてから行います。読み込み前に分割すると代替フォントの字幅で行が決まり、フォントが差し替わった瞬間に行がずれます。また、幅が変われば改行位置も変わるので、行を分割しているなら再分割が必要です。" },
        { code: "let split;\nfunction build() {\n  split?.revert();           // 先に元へ戻す\n  split = mySplit(el);       // 行・単語・文字に分ける\n  animate(split);\n}\n\ndocument.fonts.ready.then(() => {\n  build();\n  let w = el.clientWidth, timer;\n  new ResizeObserver(() => {\n    if (el.clientWidth === w) return; // 高さだけの変化は無視\n    w = el.clientWidth;\n    clearTimeout(timer);\n    timer = setTimeout(build, 150);   // デバウンス\n  }).observe(el);\n});", lang: "js" },
        { p: "入場前のちらつき（分割前の素のテキストが一瞬見える）を防ぐには、CSS で `visibility: hidden` にしておき、分割して初期状態を当てた直後に visible に戻します（Motion の docs が勧める方法）。" }
      ],
      bodyEn: [
        { p: "Split lines and measure character positions only after web fonts have loaded. If you split earlier, lines are decided with the fallback font metrics and shift the moment the real font swaps in. Line breaks also change with width, so if you split lines you must re-split on resize." },
        { code: "let split;\nfunction build() {\n  split?.revert();           // undo first\n  split = mySplit(el);       // split into lines / words / chars\n  animate(split);\n}\n\ndocument.fonts.ready.then(() => {\n  build();\n  let w = el.clientWidth, timer;\n  new ResizeObserver(() => {\n    if (el.clientWidth === w) return; // ignore height-only changes\n    w = el.clientWidth;\n    clearTimeout(timer);\n    timer = setTimeout(build, 150);   // debounce\n  }).observe(el);\n});", lang: "js" },
        { p: "To avoid a flash of the unsplit text before the entrance, hide it with `visibility: hidden` in CSS and make it visible right after splitting and applying the initial state (the approach recommended in the Motion docs)." }
      ]
    },
    {
      h: "ライブラリの分割機能",
      hEn: "Splitting in libraries",
      body: [
        { p: "GSAP SplitText（3.13 以降は無料）は `autoSplit: true` にすると、フォント読み込み完了時と幅の変化時に自動で再分割します。アニメーションは `onSplit` の中で作って return すると、再分割の前に自動で revert され、進行位置も引き継がれます。`mask: 'lines'` は各行を `overflow: clip` のラッパーで包みます。" },
        { code: "SplitText.create('.title', {\n  type: 'lines,words',\n  mask: 'lines',\n  autoSplit: true,\n  onSplit(self) {\n    return gsap.from(self.lines, {\n      yPercent: 100, duration: 0.8, ease: 'power3.out', stagger: 0.1\n    });\n  }\n});", lang: "js" },
        { p: "Splitting.js は分割だけを行い、`--char-index`・`--word-index`・`--char-total` などの CSS 変数を付けます。アニメーション自体は CSS で書けるので、JS を最小限にしたいときに向いています。anime.js v4 の `splitText()`（v4.1.0 以降）は `wrap: 'clip'` でマスク、`clone: true` で複製を作れ、各行に `data-line` が付きます。" },
        { code: "/* Splitting() 実行後 */\n.char {\n  display: inline-block;\n  animation: rise .6s cubic-bezier(.2,.7,.2,1) both;\n  animation-delay: calc(var(--char-index) * 30ms);\n}\n@keyframes rise { from { transform: translateY(110%); opacity: 0; } }", lang: "css" }
      ],
      bodyEn: [
        { p: "GSAP SplitText (free since 3.13) re-splits automatically when fonts finish loading and when the width changes if you set `autoSplit: true`. Create the animation inside `onSplit` and return it: it is reverted before each re-split and its progress carries over. `mask: 'lines'` wraps each line in an `overflow: clip` wrapper." },
        { code: "SplitText.create('.title', {\n  type: 'lines,words',\n  mask: 'lines',\n  autoSplit: true,\n  onSplit(self) {\n    return gsap.from(self.lines, {\n      yPercent: 100, duration: 0.8, ease: 'power3.out', stagger: 0.1\n    });\n  }\n});", lang: "js" },
        { p: "Splitting.js only splits, adding CSS variables such as `--char-index`, `--word-index` and `--char-total`. The animation itself can stay in CSS, which suits projects that want minimal JavaScript. anime.js v4 `splitText()` (since v4.1.0) can mask with `wrap: 'clip'`, duplicate with `clone: true`, and tags each line with `data-line`." },
        { code: "/* after calling Splitting() */\n.char {\n  display: inline-block;\n  animation: rise .6s cubic-bezier(.2,.7,.2,1) both;\n  animation-delay: calc(var(--char-index) * 30ms);\n}\n@keyframes rise { from { transform: translateY(110%); opacity: 0; } }", lang: "css" }
      ]
    }
  ],
  related: ["fade-up-chars", "fade-up-words", "line-mask-rise", "char-mask-rise", "emoji-grapheme-pop", "bunsetsu-reveal", "balanced-reflow", "alternating-line-direction"],
  sources: [
    { title: "GSAP SplitText docs", url: "https://gsap.com/docs/v3/Plugins/SplitText/" },
    { title: "GSAP 3.13 release notes", url: "https://gsap.com/blog/3-13/" },
    { title: "MDN: Intl.Segmenter", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter" },
    { title: "google/budoux", url: "https://github.com/google/budoux" },
    { title: "Chrome for Developers: CSS i18n features (word-break: auto-phrase)", url: "https://developer.chrome.com/blog/css-i18n-features" },
    { title: "Splitting.js guide", url: "https://splitting.js.org/guide.html" },
    { title: "anime.js: splitText", url: "https://animejs.com/documentation/text/splittext" },
    { title: "Motion: splitText", url: "https://motion.dev/docs/split-text" }
  ]
},

/* ───────────────────────── 2. タイミング ───────────────────────── */
{
  id: "timing-readability",
  icon: "clock",
  title: "タイミングと読みやすさ",
  titleEn: "Timing and readability",
  lead: "文字は「読まれて初めて」役目を果たします。動きの長さ、stagger の総時間、字幕の読み速度、タイトルの保持時間など、読める速さを数字で押さえます。",
  leadEn: "Text only does its job once it has been read. This guide pins down readable speeds in numbers: motion durations, the total time a stagger costs, subtitle reading rates and how long titles should hold.",
  sections: [
    {
      h: "動きの長さの目安",
      hEn: "Typical durations",
      body: [
        { p: "1 つの要素の動きは、UI では 150〜400 ms、テキストの入場では 400〜800 ms 程度がよく使われます。Material Design 3 の時間トークンは 50〜1000 ms の範囲です。見出し全体の登場は、stagger を含めて 1〜1.5 秒以内に収めると、待たされている感じが出にくくなります。" },
        { table: { head: ["対象", "目安", "備考"], rows: [
          ["文字 1 つの入場", "400〜800 ms", "React Bits SplitText は 1.25 s・stagger 50 ms（ゆったり）"],
          ["行マスクのせり上がり", "600〜900 ms / 行", "行の stagger は 80〜150 ms"],
          ["退場", "入場の 1/2〜2/3", "退場は短く。ease-in 系"],
          ["単語の入れ替え（回転テキスト）", "300〜500 ms + 表示 2 s 前後", "React Bits RotatingText の間隔は 2000 ms"],
          ["ホバーの反応", "150〜300 ms", "操作への反応は速く"]
        ] } },
        { note: "表の値は実装例と業界の慣習から取った目安で、規格ではありません。最終的には実際の文章量で読み、確かめてください。" }
      ],
      bodyEn: [
        { p: "A single element typically moves for 150–400 ms in UI and about 400–800 ms for text entrances. Material Design 3 duration tokens span 50–1000 ms. Keeping a whole headline entrance, stagger included, within 1–1.5 seconds avoids the feeling of being made to wait." },
        { table: { head: ["Target", "Typical", "Notes"], rows: [
          ["One character entering", "400–800 ms", "React Bits SplitText uses 1.25 s with a 50 ms stagger (relaxed)"],
          ["Line-mask rise", "600–900 ms per line", "Line stagger 80–150 ms"],
          ["Exit", "1/2 to 2/3 of the entrance", "Keep exits short, with ease-in curves"],
          ["Word swap (rotating text)", "300–500 ms plus about 2 s on screen", "React Bits RotatingText uses a 2000 ms interval"],
          ["Hover response", "150–300 ms", "Respond quickly to input"]
        ] } },
        { note: "These values are rules of thumb drawn from real implementations and industry practice, not standards. Always check them by reading your actual copy." }
      ]
    },
    {
      h: "stagger は総時間で考える",
      hEn: "Budget staggers by total time",
      body: [
        { p: "stagger の総時間は `動きの長さ + (要素数 − 1) × stagger` です。文字 40 個に 50 ms の stagger を付けると、最後の文字が動き出すまでに 1.95 秒、動き終わるまで 2.5 秒以上かかります。短い見出しでは気持ちよい値が、長い文では間延びします。" },
        { p: "よく使われる値は、文字で 20〜60 ms、単語で 50〜120 ms、行で 80〜150 ms です。AE の Expression Selector の例は 1 文字 1 フレーム（24fps で約 42 ms）です。要素数が変わる場合は、1 つあたりの間隔ではなく全体の時間を決めて割り振ります。" },
        { code: "// 全体を 0.6 秒に収める（要素数に関係なく）\ngsap.from(chars, { y: 40, opacity: 0, duration: 0.6, stagger: { amount: 0.6 } });\n\n// 自前で書くなら：上限つきの間隔\nconst each = Math.min(0.05, 0.6 / Math.max(1, n - 1));", lang: "js" },
        { p: "日本語は 1 文字あたりの情報量が多く、文字数も少なめです。同じ stagger でも英語より早く終わりますが、細かすぎる文字単位の stagger は「カタカタ」とした印象になりやすいので、文節単位に切り替えるのも手です。" }
      ],
      bodyEn: [
        { p: "A stagger takes `duration + (count − 1) × stagger` in total. With 40 characters at 50 ms each, the last one starts 1.95 s in and finishes after more than 2.5 s. A value that feels great on a short headline drags on a long sentence." },
        { p: "Common values are 20–60 ms per character, 50–120 ms per word and 80–150 ms per line. The After Effects Expression Selector example uses one frame per character (about 42 ms at 24 fps). When the count varies, decide the total time first and divide it, rather than fixing the per-item gap." },
        { code: "// Fit the whole stagger into 0.6 s, whatever the count\ngsap.from(chars, { y: 40, opacity: 0, duration: 0.6, stagger: { amount: 0.6 } });\n\n// Hand-rolled: a per-item gap with a cap\nconst each = Math.min(0.05, 0.6 / Math.max(1, n - 1));", lang: "js" },
        { p: "Japanese packs more information into each character and usually has fewer of them, so the same stagger finishes sooner than in English. Very fine per-character staggers can feel jittery, though, so switching to phrase-level units is worth considering." }
      ]
    },
    {
      h: "読む速さの基準値",
      hEn: "Reading-speed reference values",
      body: [
        { p: "映像の字幕には、読む速さの明確な基準があります。画面上のテキスト全般の目安としても使えます。" },
        { table: { head: ["項目", "値", "出典"], rows: [
          ["英語字幕（Netflix）", "成人 20 文字/秒、子供 17 文字/秒、1 行 42 文字・2 行まで", "Netflix English (USA) Timed Text Style Guide"],
          ["日本語字幕（Netflix）", "4 文字/秒（SDH は 7）、1 行は横書き 13 文字・縦書き 11 文字、2 行まで、最短 0.5 秒", "Netflix Japanese Timed Text Style Guide"],
          ["字幕の表示時間（Netflix 共通）", "最短 5/6 秒（24fps で 20 フレーム）、最長 7 秒", "Netflix General Requirements / Timing Guidelines"],
          ["字幕間のギャップ", "2 フレーム（3〜11 フレームの隙間は 2 フレームに詰める）", "Netflix Subtitle Timing Guidelines"],
          ["日本の映画字幕の慣習", "1 秒 4 文字（240 文字/分）", "清水俊二の規則として知られる"],
          ["BBC の読み速度", "160〜180 wpm（1 語あたり 0.33〜0.375 秒）", "BBC 字幕ガイドライン（要約）"]
        ] } },
        { note: "英語の cps を「成人 17 / 子供 13」とする古い資料が出回っていますが、現行の Netflix 英語（USA）ガイドは成人 20 / 子供 17 です。" }
      ],
      bodyEn: [
        { p: "Subtitling has explicit reading-speed standards. They also work as a guide for on-screen text in general." },
        { table: { head: ["Item", "Value", "Source"], rows: [
          ["English subtitles (Netflix)", "Adults 20 characters/s, children 17 characters/s; 42 characters per line, up to 2 lines", "Netflix English (USA) Timed Text Style Guide"],
          ["Japanese subtitles (Netflix)", "4 characters/s (7 for SDH); 13 characters per horizontal line, 11 per vertical line; up to 2 lines; minimum 0.5 s", "Netflix Japanese Timed Text Style Guide"],
          ["Subtitle duration (Netflix, all languages)", "Minimum 5/6 s (20 frames at 24 fps), maximum 7 s", "Netflix General Requirements / Timing Guidelines"],
          ["Gap between subtitles", "2 frames (gaps of 3–11 frames are closed to 2)", "Netflix Subtitle Timing Guidelines"],
          ["Japanese film subtitle convention", "4 characters per second (240 per minute)", "Known as Toshikazu Shimizu's rule"],
          ["BBC reading speed", "160–180 wpm (0.33–0.375 s per word)", "BBC subtitle guidelines (summary)"]
        ] } },
        { note: "Older material often quotes 17 cps for adults and 13 for children in English. The current Netflix English (USA) guide says 20 for adults and 17 for children." }
      ]
    },
    {
      h: "タイトルと画面テキストの保持時間",
      hEn: "How long titles and on-screen text should hold",
      body: [
        { p: "画面上のテキストは、遅い読み手（約 200 wpm）が 2 回読める長さだけ表示しておくのが目安です。ロワーサード（名前と肩書き）は 5〜7 秒が標準で、視聴者が目を落とすので約 2 秒で内容が伝わるデザインにします。" },
        { code: "// 実務用の目安（出典の数値から導いた式。規格ではない）\n// 英語：2 回読める長さ、下限 1.5 秒\nconst holdEn = words => Math.max(1.5, words * 0.6);\n// 日本語：1 秒 4 文字を基準に、2 回読むなら 1.5〜2 倍\nconst holdJa = chars => Math.max(1.5, chars / 4 * 1.5);", lang: "js" },
        { p: "入場アニメーションの時間は保持時間に含めません。文字が完全に読める状態になってから、上の時間だけ止めておきます。ループするデモでも「静止 → 動き → 読める保持 → きれいなリセット」の順を守ると、読める時間が確保できます。" }
      ],
      bodyEn: [
        { p: "A good rule is to keep on-screen text up long enough for a slow reader (about 200 wpm) to read it twice. Lower thirds (name and title) usually hold for 5–7 seconds, and because viewers glance down at them they should get their message across in about 2 seconds." },
        { code: "// Working rules of thumb (derived from the sources' numbers, not a standard)\n// English: long enough to read twice, minimum 1.5 s\nconst holdEn = words => Math.max(1.5, words * 0.6);\n// Japanese: base on 4 characters/s, 1.5–2x to read twice\nconst holdJa = chars => Math.max(1.5, chars / 4 * 1.5);", lang: "js" },
        { p: "Don't count the entrance animation as hold time. Hold for the time above only once the text is fully readable. Looping demos should keep the order rest, motion, readable hold, clean reset, so that there is always time to read." }
      ]
    },
    {
      h: "RSVP（1 語ずつ提示）の注意点",
      hEn: "Caveats for RSVP (one word at a time)",
      body: [
        { p: "同じ位置に 1 語ずつ高速表示する RSVP は、目を動かさずに読めるため速く見えます。研究では、横並びの表示が 316 wpm だったのに対し、同じ位置への提示は 585 wpm でした。ただし報告値は 100〜1500 wpm と幅があり、速くするほど理解は落ちます（Carver の目安：理解 300、学習 200、記憶 140、拾い読み 450 wpm）。" },
        { list: [
          "読み返しができないので、長文や重要な情報には向きません。演出として短いフレーズに使います。",
          "句読点や長い語の後で表示時間を延ばすと、理解しやすくなります。",
          "一時停止と速度変更の手段を用意します（自動で動き続ける情報の扱いはアクセシビリティのガイドを参照）。"
        ] }
      ],
      bodyEn: [
        { p: "RSVP flashes one word at a time in the same spot. Because the eyes don't have to move, it feels fast: one study measured 316 wpm for side-by-side text versus 585 wpm for same-position presentation. Reported rates range widely from 100 to 1500 wpm, though, and comprehension falls as speed rises (Carver's guide: comprehension 300, learning 200, memorising 140, skimming 450 wpm)." },
        { list: [
          "Readers cannot look back, so RSVP is a poor fit for long or important text. Use it as an effect on short phrases.",
          "Showing a word longer after punctuation or long words helps comprehension.",
          "Provide pause and speed controls (see the accessibility guide on auto-moving content)."
        ] }
      ]
    },
    {
      h: "流れるテキスト：クレジットロールとティッカー",
      hEn: "Moving text: credit rolls and tickers",
      body: [
        { p: "一定速度で流れるテキストは、1 フレームあたりの移動量を整数ピクセルにしないとジャダー（カクつき）が出ます。3.5 px/フレームのような値は、3 px と 4 px のフレームが交互になって揺れて見えます。60fps は 24fps の 2.5 倍のフレームがあるので、選べる速度の幅が広がります。" },
        { code: "// 60fps・3 px/フレーム → 180 px/秒\nconst fps = 60, pxPerFrame = 3;\nconst y = Math.round(frame) * pxPerFrame; // 小数を使わない\n// Web では transform の値を整数 px に丸め、デバイスのリフレッシュレートに注意する", lang: "js" },
        { p: "白黒の高コントラストは最もちらついて見えます。白を少し落とすか、黒を少し持ち上げると和らぎます。明朝体のような細い横画も、スクロール中はちらつきやすくなります。" }
      ],
      bodyEn: [
        { p: "Text that scrolls at constant speed judders unless it moves a whole number of pixels per frame. A value like 3.5 px/frame alternates 3 px and 4 px frames and looks shaky. At 60 fps there are 2.5 times as many frames as at 24 fps, so you have more speeds to choose from." },
        { code: "// 60 fps at 3 px/frame → 180 px/s\nconst fps = 60, pxPerFrame = 3;\nconst y = Math.round(frame) * pxPerFrame; // no fractions\n// On the web, round transforms to whole px and mind the display refresh rate", lang: "js" },
        { p: "High-contrast black and white flickers the most. Pulling the white down slightly or lifting the black helps. Thin horizontal strokes, as in Mincho typefaces, also tend to flicker while scrolling." }
      ]
    }
  ],
  related: ["jp-subtitle-timing", "rsvp-flash", "credits-roll", "news-ticker", "lower-third", "pop-on-subtitle", "fade-up-chars", "rotating-letters-spring"],
  sources: [
    { title: "Netflix: English (USA) Timed Text Style Guide", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide" },
    { title: "Netflix: Japanese Timed Text Style Guide", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/215767517-Japanese-Timed-Text-Style-Guide" },
    { title: "Netflix: Timed Text Style Guide — General Requirements", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/215758617-Timed-Text-Style-Guide-General-Requirements" },
    { title: "Netflix: Subtitle Timing Guidelines", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/360051554394-Timed-Text-Style-Guide-Subtitle-Timing-Guidelines" },
    { title: "BBC subtitling guidelines (summary, Clevercast)", url: "https://clevercast.com/bbc-subtitling-guidelines" },
    { title: "SSW Rules: enough time to read texts in videos", url: "https://www.ssw.com.au/rules/post-production-do-you-give-enough-time-to-read-texts-in-your-videos" },
    { title: "Lower thirds best practices (Keepthescore)", url: "https://keepthescore.com/blog/posts/lower-thirds/" },
    { title: "RSVP reading research (PMC4835101)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4835101" },
    { title: "Larry Jordan: Create a smooth credit roll", url: "https://larryjordan.com/articles/create-a-smooth-credit-roll/" },
    { title: "Material Design 3 motion tokens", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md" }
  ]
},

/* ───────────────────────── 3. イージング ───────────────────────── */
{
  id: "easing-for-text",
  icon: "font",
  title: "イージングの選び方（文字編）",
  titleEn: "Choosing easing for text",
  lead: "文字は形そのものが情報なので、動きの終わり方が読みやすさを左右します。入場・退場・遊び・スクロール連動で使い分けるカーブと、文字に許されるオーバーシュートの量をまとめます。",
  leadEn: "With text, the shape itself is the information, so how a motion ends decides how readable it is. This guide covers which curves to use for entrances, exits, playful motion and scroll-linked motion, and how much overshoot text can take.",
  sections: [
    {
      h: "入場は ease-out：素早く来て、ゆっくり止まる",
      hEn: "Entrances use ease-out: arrive fast, settle slowly",
      body: [
        { p: "入場は減速カーブ（ease-out）が基本です。動きの大半が最初の短い時間で済み、残りの時間は文字がほぼ止まった状態でゆっくり収まるので、早く読み始められます。文字では cubic〜expo の強めの減速がよく使われます。" },
        { table: { head: ["名前", "CSS", "GSAP"], rows: [
          ["outCubic", "cubic-bezier(.33, 1, .68, 1)", "power2.out"],
          ["outQuart", "cubic-bezier(.25, 1, .5, 1)", "power3.out"],
          ["outExpo", "cubic-bezier(.16, 1, .3, 1)", "expo.out"],
          ["M3 emphasized decelerate", "cubic-bezier(.05, .7, .1, 1)", "CustomEase で再現"]
        ] } },
        { p: "React Bits の SplitText は `power3.out`、Codrops の Stagger Reveal は `Power3.easeOut` で入れています。強い減速ほど「止まった」と感じるまでが早く、同じ長さでもきびきびして見えます。" }
      ],
      bodyEn: [
        { p: "Entrances default to a decelerating curve (ease-out). Most of the travel happens in the first moments and the text spends the rest of the time nearly still, so reading can start early. Text usually gets a fairly strong deceleration, from cubic to expo." },
        { table: { head: ["Name", "CSS", "GSAP"], rows: [
          ["outCubic", "cubic-bezier(.33, 1, .68, 1)", "power2.out"],
          ["outQuart", "cubic-bezier(.25, 1, .5, 1)", "power3.out"],
          ["outExpo", "cubic-bezier(.16, 1, .3, 1)", "expo.out"],
          ["M3 emphasized decelerate", "cubic-bezier(.05, .7, .1, 1)", "recreate with CustomEase"]
        ] } },
        { p: "React Bits SplitText enters with `power3.out`, and the Codrops Stagger Reveal uses `Power3.easeOut`. The stronger the deceleration, the sooner the text feels settled, so the same duration looks snappier." }
      ]
    },
    {
      h: "退場は ease-in で短く",
      hEn: "Exits: ease-in and shorter",
      body: [
        { p: "退場は加速カーブ（ease-in）で、入場の 1/2〜2/3 程度の長さにします。去っていく文字はもう読まれる必要がないので、ゆっくり動き出して一気に消える方が、次の情報へ注意を渡しやすくなります。Codrops の Stagger Reveal も、入場 `Power3.easeOut`・退場 `Power3.easeIn` の組み合わせです。" },
        { list: [
          "入場と退場で同じ向きに動かす（下から入り、上へ抜ける）と、流れが続いて見えます。",
          "退場の stagger は入場より詰めるか、逆順（最後の文字から）にすると締まります。",
          "画面を横切る移動（入って、また出ていく）は ease-in-out を使います。"
        ] }
      ],
      bodyEn: [
        { p: "Exits use an accelerating curve (ease-in) and run about half to two-thirds as long as the entrance. Text that is leaving no longer needs to be read, so starting slowly and vanishing quickly hands attention to what comes next. The Codrops Stagger Reveal pairs `Power3.easeOut` in with `Power3.easeIn` out." },
        { list: [
          "Moving in and out in the same direction (in from below, out through the top) makes the flow feel continuous.",
          "Tighten the exit stagger compared with the entrance, or run it in reverse (from the last character), for a crisper finish.",
          "Moves that cross the screen (entering and then leaving) use ease-in-out."
        ] }
      ]
    },
    {
      h: "スプリング：弾む文字は減衰比で決める",
      hEn: "Springs: set bounce with the damping ratio",
      body: [
        { p: "楽しい・軽い印象にしたいときはスプリングを使います。弾み具合は減衰比 ζ = c / (2√(k·m)) で決まり、ζ が 1 以上なら行き過ぎず、小さいほどよく弾みます。" },
        { table: { head: ["設定", "ζ", "行き過ぎ（目安）"], rows: [
          ["Remotion の既定（mass 1, damping 10, stiffness 100）", "0.50", "約 16%"],
          ["React Bits RotatingText（damping 25, stiffness 300）", "0.72", "約 4%"],
          ["Magic UI NumberTicker（damping 60, stiffness 100）", "3.0", "なし"]
        ] } },
        { p: "文字に使うなら ζ = 0.6〜0.8 くらいが、弾みを感じつつ早く読める範囲です。ζ = 0.5 のような大きな弾みは、1〜2 語の短い強調か、読む必要のない装飾向けです。" }
      ],
      bodyEn: [
        { p: "Use springs for a playful, light feel. Bounciness is set by the damping ratio ζ = c / (2√(k·m)): at ζ ≥ 1 there is no overshoot, and the smaller ζ is, the more it bounces." },
        { table: { head: ["Setting", "ζ", "Overshoot (approx.)"], rows: [
          ["Remotion default (mass 1, damping 10, stiffness 100)", "0.50", "about 16%"],
          ["React Bits RotatingText (damping 25, stiffness 300)", "0.72", "about 4%"],
          ["Magic UI NumberTicker (damping 60, stiffness 100)", "3.0", "none"]
        ] } },
        { p: "For text, ζ around 0.6–0.8 gives a noticeable bounce while staying quick to read. A big bounce like ζ = 0.5 suits short emphasis on one or two words, or decoration nobody needs to read." }
      ]
    },
    {
      h: "linear を使う場面",
      hEn: "When to use linear",
      body: [
        { list: [
          "スクロール連動（scrub）：スクロール位置そのものが緩急になるので、tween 側は `ease: 'none'` にします。ScrollTrigger の `containerAnimation` では親の tween は `ease: 'none'` が必須です。",
          "タイプライター：1 文字ずつの間隔は一定にし、緩急は「揺らぎ（variance）」と句読点での停止で付けます。",
          "マーキー、ティッカー、クレジットロール：一定速度で流します（1 フレームあたり整数 px）。",
          "パスに沿って走る文字：`startOffset` を一定速度で動かします。"
        ] },
        { note: "linear の動きでも、始まりと終わりだけは短いフェードを付けると、急に動き出す印象が和らぎます。" }
      ],
      bodyEn: [
        { list: [
          "Scroll-linked (scrub): the scroll position itself supplies the easing, so the tween uses `ease: 'none'`. With ScrollTrigger `containerAnimation`, the parent tween must use `ease: 'none'`.",
          "Typewriters: keep the per-character interval constant and add character through variance and pauses at punctuation.",
          "Marquees, tickers and credit rolls: run at constant speed (a whole number of px per frame).",
          "Text running along a path: move `startOffset` at constant speed."
        ] },
        { note: "Even with linear motion, a short fade at the start and end softens the abrupt start." }
      ]
    },
    {
      h: "文字のオーバーシュートの予算",
      hEn: "An overshoot budget for text",
      body: [
        { p: "行き過ぎて戻る動き（back、elastic、弱いスプリング）は勢いを出せますが、行き過ぎている間は文字の形や位置が乱れて読みにくくなります。目安として次の範囲に収めます。" },
        { table: { head: ["プロパティ", "行き過ぎの目安"], rows: [
          ["スケール", "最大 10% 程度（GSAP の `back.out` 既定値 1.70158 で約 10%）"],
          ["位置", "0.1〜0.2em 程度"],
          ["回転", "5〜10° 程度"],
          ["不透明度・ブラー・色", "行き過ぎさせない"]
        ] } },
        { list: [
          "オーバーシュートは 1 つのプロパティだけに付けます。位置もスケールも回転も同時に弾むと、文字が暴れて見えます。",
          "テロップの「ポン出し」はスケール 0 → 110 → 100% を 4〜6 フレームで、効果音と同時に出すのが定番です（慣習値）。",
          "elastic は数回振動するので、文字では避けるか、振幅を小さく、周期を短くします（Codrops の例は `elastic.out(.4)`）。"
        ] },
        { note: "この予算は実装例から導いた目安です。文字が大きいほど、同じ割合でも行き過ぎは目立ちます。" }
      ],
      bodyEn: [
        { p: "Motions that overshoot and come back (back, elastic, soft springs) add energy, but while they overshoot the letter shapes and positions are disturbed and harder to read. As a guide, stay within these ranges." },
        { table: { head: ["Property", "Overshoot budget"], rows: [
          ["Scale", "Up to about 10% (GSAP `back.out` with its default 1.70158 gives about 10%)"],
          ["Position", "About 0.1–0.2em"],
          ["Rotation", "About 5–10°"],
          ["Opacity, blur, colour", "No overshoot"]
        ] } },
        { list: [
          "Put overshoot on one property only. If position, scale and rotation all bounce at once, the text looks unruly.",
          "The Japanese TV telop pop-in is classically scale 0 → 110 → 100% over 4–6 frames, timed with a sound effect (a convention).",
          "Elastic oscillates several times, so avoid it for text or keep the amplitude small and the period short (the Codrops example uses `elastic.out(.4)`)."
        ] },
        { note: "This budget is a rule of thumb drawn from real implementations. The larger the text, the more visible the same percentage of overshoot becomes." }
      ]
    }
  ],
  related: ["fade-up-chars", "char-exit-up", "scale-pop-in", "spring-chain", "drop-bounce-in", "caption-spring-pop", "typewriter", "infinite-marquee"],
  sources: [
    { title: "Material Design 3 motion (easing and duration tokens)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md" },
    { title: "Codrops: Making Stagger Reveal Animations for Text", url: "https://tympanus.net/codrops/2020/06/17/making-stagger-reveal-animations-for-text/" },
    { title: "Remotion: spring()", url: "https://www.remotion.dev/docs/spring" },
    { title: "React Bits (source)", url: "https://github.com/DavidHDev/react-bits" },
    { title: "Magic UI (source)", url: "https://github.com/magicuidesign/magicui" },
    { title: "GSAP ScrollTrigger docs", url: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/" },
    { title: "Codrops: OnScrollTypographyAnimations (source)", url: "https://github.com/codrops/OnScrollTypographyAnimations" }
  ]
},

/* ───────────────────────── 4. アクセシビリティ ───────────────────────── */
{
  id: "accessibility",
  icon: "eye",
  title: "アクセシビリティ",
  titleEn: "Accessibility",
  lead: "動く文字は、読み上げ・前庭障害・光過敏性発作・注意の妨げといった問題を起こしやすい表現です。分割テキストの読み上げ、視差効果を減らす設定への対応、点滅と自動再生の制限、動きの途中のコントラストを確認します。",
  leadEn: "Moving text easily causes problems with screen readers, vestibular disorders, photosensitive seizures and distraction. This guide covers how split text is read aloud, honouring reduced-motion settings, limits on flashing and auto-playing motion, and contrast while text is animating.",
  sections: [
    {
      h: "分割テキストはスクリーンリーダーでどう読まれるか",
      hEn: "How screen readers handle split text",
      body: [
        { p: "Adrian Roselli の検証（2026 年 2 月）では、1 文字ずつ要素で包んだテキストを正しく読めたのは NVDA + Firefox と TalkBack + Chrome くらいでした。JAWS は読まず、Narrator は先頭の 1 文字だけ、macOS の VoiceOver は一部の文字を 1 文字ずつ読みました。" },
        { p: "さらに、`aria-label` は div や span のような generic 要素には付けられません（role=generic は名前を持てない）。そのため、div を親にして `aria-label` を付ける方式（GSAP SplitText の既定 `aria: 'auto'` もこれ）は、div に付けた場合は効きません。GSAP はこの指摘（issue #642）を受けて docs を見直すと回答しています。" },
        { note: "「aria-label を付けておけば大丈夫」は成り立ちません。名前を持てる要素か、読み上げ用の原文を別に置く方法を取ります。" }
      ],
      bodyEn: [
        { p: "In Adrian Roselli's tests (February 2026), text wrapped one character per element was read correctly by little more than NVDA with Firefox and TalkBack with Chrome. JAWS didn't read it, Narrator read only the first character, and VoiceOver on macOS spelled some characters out one by one." },
        { p: "On top of that, `aria-label` can't be applied to generic elements such as div and span (role=generic cannot be named). So the pattern of putting `aria-label` on a parent div (which is what GSAP SplitText's default `aria: 'auto'` does) has no effect when that parent is a div. GSAP has said it will revise its docs in response (issue #642)." },
        { note: "Adding an aria-label does not make split text safe on its own. Use an element that can be named, or keep a separate copy of the original text for screen readers." }
      ]
    },
    {
      h: "推奨パターン：隠した原文 + aria-hidden の分割コピー",
      hEn: "Recommended pattern: hidden original plus an aria-hidden split copy",
      body: [
        { p: "最も確実なのは、読み上げ用の原文を視覚的に隠して置き、見た目用の分割コピーを `aria-hidden=\"true\"` にする二重構造です。SplitText なら `aria: 'none'` にして、原文は自分で用意します。" },
        { code: "<h1 class=\"title\">\n  <span class=\"sr-only\">テキストが動く</span>\n  <span class=\"split\" aria-hidden=\"true\">テキストが動く</span>\n</h1>\n\n<style>\n.sr-only {\n  position: absolute; width: 1px; height: 1px;\n  overflow: hidden; clip-path: inset(50%); white-space: nowrap;\n}\n</style>", lang: "html" },
        { list: [
          "見出しなど名前を持てる要素（h1〜h6 など）なら、要素自体に `aria-label` を付け、分割した子を `aria-hidden` にする方法も使えます。",
          "アニメーションが終わったら `revert()` で分割を元に戻します。読み上げ、検索、コピー＆ペーストのすべてが元に戻ります。",
          "iOS VoiceOver が子要素ごとに区切って読む問題は、内側の span に `role=\"text\"` を付けると防げます（見出し要素そのものには付けない）。",
          "リンクなど入れ子の意味を持つ部分は分割から除外する（SplitText の `ignore`）か、原文側に残します。"
        ] }
      ],
      bodyEn: [
        { p: "The most reliable approach is a two-layer structure: keep the original text visually hidden for screen readers, and mark the visual split copy `aria-hidden=\"true\"`. With SplitText, set `aria: 'none'` and supply the original yourself." },
        { code: "<h1 class=\"title\">\n  <span class=\"sr-only\">Text in motion</span>\n  <span class=\"split\" aria-hidden=\"true\">Text in motion</span>\n</h1>\n\n<style>\n.sr-only {\n  position: absolute; width: 1px; height: 1px;\n  overflow: hidden; clip-path: inset(50%); white-space: nowrap;\n}\n</style>", lang: "html" },
        { list: [
          "On elements that can be named, such as h1–h6, you can instead put `aria-label` on the element itself and mark the split children `aria-hidden`.",
          "Once the animation finishes, undo the split with `revert()`. Screen reading, find-in-page and copy-paste all return to normal.",
          "iOS VoiceOver pausing between child elements can be prevented by adding `role=\"text\"` to an inner span (not to the heading element itself).",
          "Exclude parts with nested meaning such as links from the split (SplitText's `ignore`), or keep them in the original copy."
        ] }
      ]
    },
    {
      h: "視差効果を減らす設定（prefers-reduced-motion）",
      hEn: "Reduced motion (prefers-reduced-motion)",
      body: [
        { p: "OS で「視差効果を減らす」を選んでいる人には、動きを止めるのではなく置き換えます。移動・拡大・回転・パララックスをやめて、不透明度のクロスフェードや色の変化に替えるか、完成状態の静止画を見せます。このサイトのデモは時間の関数なので、文字が完全に読める時刻の 1 フレームを静止画として表示しています。" },
        { code: "@media (prefers-reduced-motion: reduce) {\n  .char {\n    animation: fade .3s ease both;   /* 移動をやめてフェードだけに */\n    animation-delay: 0s;             /* stagger も外す */\n  }\n}\n@keyframes fade { from { opacity: 0; } }", lang: "css" },
        { code: "const mq = matchMedia('(prefers-reduced-motion: reduce)');\nfunction setup() { mq.matches ? showFinalState() : playIntro(); }\nsetup();\nmq.addEventListener('change', setup); // 途中で設定が変わっても追従\n\n// GSAP なら gsap.matchMedia()、Motion (React) なら <MotionConfig reducedMotion=\"user\">", lang: "js" },
        { p: "スクランブル、グリッチ、揺れ、ズーム、スクロールに連動するパララックスは、特に置き換えの対象にします。NumberFlow の `respectMotionPreference` や React Bits Shuffle の `respectReducedMotion` のように、既定で設定に従うライブラリもあります。" }
      ],
      bodyEn: [
        { p: "For people who have turned on reduced motion in their OS, replace motion rather than simply stopping it. Drop movement, scaling, rotation and parallax in favour of opacity crossfades or colour changes, or show a still of the finished state. The demos on this site are functions of time, so they show a single frame at a moment when the text is fully readable." },
        { code: "@media (prefers-reduced-motion: reduce) {\n  .char {\n    animation: fade .3s ease both;   /* fade only, no movement */\n    animation-delay: 0s;             /* drop the stagger too */\n  }\n}\n@keyframes fade { from { opacity: 0; } }", lang: "css" },
        { code: "const mq = matchMedia('(prefers-reduced-motion: reduce)');\nfunction setup() { mq.matches ? showFinalState() : playIntro(); }\nsetup();\nmq.addEventListener('change', setup); // follow changes made mid-session\n\n// GSAP: gsap.matchMedia(); Motion (React): <MotionConfig reducedMotion=\"user\">", lang: "js" },
        { p: "Scrambles, glitches, shakes, zooms and scroll-linked parallax are prime candidates for replacement. Some libraries honour the setting by default, such as NumberFlow's `respectMotionPreference` and React Bits Shuffle's `respectReducedMotion`." }
      ]
    },
    {
      h: "点滅とフラッシュの上限（WCAG 2.3.1）",
      hEn: "Limits on flashing (WCAG 2.3.1)",
      body: [
        { p: "WCAG 2.3.1（レベル A）は、どの 1 秒間にも 3 回を超えて点滅するものを置かないこと（または一般閾値・赤色閾値を下回ること）を求めています。テキスト演出では、ネオンの点滅、グリッチ、フラッシュフレームのカット、高速のスクランブル、白黒反転のカードの切り替えが該当しやすい表現です。" },
        { list: [
          "点滅の周期は 1 秒に 3 回以下にします。ネオンのちらつきは、不規則でも合計回数を数えます。",
          "画面の広い範囲が明暗反転するフラッシュは、特に避けます。面積が小さいほど危険は下がります。",
          "飽和した赤の点滅は、別の厳しい閾値（赤色閾値）の対象です。",
          "視差効果を減らす設定では、点滅そのものを止めます。"
        ] }
      ],
      bodyEn: [
        { p: "WCAG 2.3.1 (Level A) requires that nothing flashes more than three times in any one-second period (or that flashes stay below the general and red flash thresholds). In text motion, neon flicker, glitches, flash-frame cuts, fast scrambles and black-and-white inverting cards are the usual suspects." },
        { list: [
          "Keep flashing to three times per second or fewer. Count every flicker, even irregular neon ones.",
          "Avoid flashes that invert large areas of the screen. The smaller the area, the lower the risk.",
          "Flashing saturated red falls under a separate, stricter threshold (the red flash threshold).",
          "Under reduced motion, stop the flashing altogether."
        ] }
      ]
    },
    {
      h: "自動で動き続けるものには停止手段（WCAG 2.2.2）",
      hEn: "Pause controls for auto-playing motion (WCAG 2.2.2)",
      body: [
        { p: "WCAG 2.2.2（レベル A）は、自動で始まり、5 秒より長く続き、他のコンテンツと並んで表示される動き・点滅・スクロールに、一時停止・停止・非表示の手段を求めています。マーキー、ティッカー、ループするタイプライター、入れ替わり続ける単語、背景で回り続ける円形テキストが該当します。" },
        { list: [
          "見える位置に一時停止ボタンを置くか、ホバーとフォーカスで止まるようにします（ホバーだけでは不十分）。",
          "5 秒以内に終わる入場アニメーションはこの基準の対象外ですが、ループさせるなら対象になります。",
          "画面外に出たら止める（IntersectionObserver）と、性能の面でも有利です。",
          "操作をきっかけにした動き（ホバーで文字が飛び散るなど）を無効化できるようにするのは WCAG 2.3.3（レベル AAA）です。"
        ] }
      ],
      bodyEn: [
        { p: "WCAG 2.2.2 (Level A) requires a way to pause, stop or hide moving, blinking or scrolling content that starts automatically, lasts more than five seconds and is shown alongside other content. Marquees, tickers, looping typewriters, endlessly rotating words and circular text spinning in the background all qualify." },
        { list: [
          "Put a visible pause button on the page, or stop the motion on hover and focus (hover alone is not enough).",
          "Entrance animations that finish within five seconds are outside this criterion, but looping them brings them back in.",
          "Stopping motion when it scrolls out of view (IntersectionObserver) also helps performance.",
          "Letting users disable motion triggered by interaction (such as letters scattering on hover) is WCAG 2.3.3 (Level AAA)."
        ] }
      ]
    },
    {
      h: "動きの途中のコントラストと可読性",
      hEn: "Contrast and legibility during animation",
      body: [
        { p: "WCAG 1.4.3 のコントラスト比（通常の文字 4.5:1、大きな文字 3:1）は、少なくとも文字が止まって読まれる状態で満たします。入場の途中に一瞬薄いのは問題になりにくいですが、止まったまま薄い状態は「表示されているテキスト」として扱われます。" },
        { list: [
          "スクロールで単語を明るくする演出の「まだの単語」（不透明度 0.1〜0.2）は、読めない状態のまま長く表示されがちです。最終状態では必ず完全に読めるようにします。",
          "シャインやグラデーションが流れる文字は、最も暗い（明るい）瞬間でもコントラストを保ちます。",
          "`background-clip: text` を使う場合は、背景が読み込めないときのための `color` のフォールバックを残します。",
          "Canvas や WebGL で描いた文字は読み上げられません。DOM に原文を置き、canvas は `aria-hidden` にします。"
        ] }
      ],
      bodyEn: [
        { p: "Meet WCAG 1.4.3 contrast ratios (4.5:1 for normal text, 3:1 for large text) at least whenever the text is at rest and being read. A brief faint moment mid-entrance is rarely a problem, but text that sits faint is treated as displayed text." },
        { list: [
          "In scroll-highlight effects, the not-yet-lit words (opacity 0.1–0.2) often stay unreadable for a long time. Make sure the final state is fully readable.",
          "Text with moving shines or gradients should keep enough contrast even at its darkest (or lightest) moment.",
          "With `background-clip: text`, keep a `color` fallback in case the background doesn't render.",
          "Text drawn with Canvas or WebGL isn't read aloud. Put the original text in the DOM and mark the canvas `aria-hidden`."
        ] }
      ]
    }
  ],
  related: ["fade-up-chars", "scramble-decode", "neon-flicker", "flash-frame-cut", "typewriter-loop", "scroll-word-highlight", "infinite-marquee", "rgb-split-glitch"],
  sources: [
    { title: "Adrian Roselli: You Know What? Just Don't Split Words into Letters (2026)", url: "https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html" },
    { title: "CSS { In Real Life }: How to accessibly split text", url: "https://css-irl.info/how-to-accessibly-split-text/" },
    { title: "Axess Lab: Text splitting", url: "https://axesslab.com/text-splitting/" },
    { title: "Stuff & Nonsense: Splinter.js", url: "https://stuffandnonsense.co.uk/blog/splinter-js-i-made-a-more-accessible-text-splitting-tool/" },
    { title: "GSAP SplitText docs (aria option)", url: "https://gsap.com/docs/v3/Plugins/SplitText/" },
    { title: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" },
    { title: "W3C: Understanding SC 2.3.1 Three Flashes or Below Threshold", url: "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html" },
    { title: "W3C: Understanding SC 2.2.2 Pause, Stop, Hide", url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html" },
    { title: "W3C: Understanding SC 2.3.3 Animation from Interactions", url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html" },
    { title: "W3C: Understanding SC 1.4.3 Contrast (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" }
  ]
},

/* ───────────────────────── 5. 日本語 ───────────────────────── */
{
  id: "japanese",
  icon: "ja",
  title: "日本語のテキストモーション",
  titleEn: "Japanese text motion",
  lead: "日本語には空白が無く、縦書き・ルビ・約物・和欧混植といった欧文に無い要素があります。文節単位の分割から、縦書き、字幕の文字数、テロップの縁取りまで、日本語ならではの扱いをまとめます。",
  leadEn: "Japanese has no spaces between words, and it brings things Latin text lacks: vertical writing, ruby, CJK punctuation and mixed Japanese–Latin typesetting. This guide covers what is specific to Japanese, from phrase-level splitting and vertical text to subtitle lengths and telop outlines.",
  sections: [
    {
      h: "動かす単位：文字か、文節か",
      hEn: "Unit of motion: character or phrase",
      body: [
        { p: "全角の日本語は字幅がほぼ揃っているので、文字単位の stagger が欧文より自然に見えます。一方で、1 文字ずつのリズムは細かすぎて「カタカタ」しやすく、長い文では読みのまとまりと合いません。文節単位でまとめて出すと、読む単位と動く単位が一致します。" },
        { p: "字幕の改行の研究でも、文節や節の境界で改行した方が固定長の改行より大幅に良い結果（F 値 74% 対 21%）でした。動きの単位も同じ考え方で選べます。" },
        { table: { head: ["単位", "向いている場面"], rows: [
          ["文字", "短い見出し（〜10 文字）、タイプ、スクランブル、書き順"],
          ["文節", "リード文、キャッチコピー、字幕、歌詞（リリックモーション）"],
          ["行", "長い本文、縦書きの段落"]
        ] } }
      ],
      bodyEn: [
        { p: "Full-width Japanese characters have nearly uniform widths, so per-character staggers look more natural than in Latin text. A one-character rhythm can still feel too fine and jittery, though, and on long sentences it doesn't match how people read. Grouping by bunsetsu (phrase) makes the unit of motion match the unit of reading." },
        { p: "Research on subtitle line breaks found that breaking at phrase and clause boundaries did far better than fixed-length breaks (F-score 74% versus 21%). The same thinking applies when choosing the unit of motion." },
        { table: { head: ["Unit", "Good for"], rows: [
          ["Character", "Short headlines (up to about 10 characters), typing, scrambles, stroke order"],
          ["Phrase (bunsetsu)", "Lead text, taglines, subtitles, lyric motion"],
          ["Line", "Long body text, vertical paragraphs"]
        ] } }
      ]
    },
    {
      h: "縦書き：writing-mode と縦中横",
      hEn: "Vertical writing: writing-mode and tate-chu-yoko",
      body: [
        { p: "縦書きは `writing-mode: vertical-rl` で、行は右から左へ進みます。欧文や数字は `text-orientation: mixed`（既定）だと横倒し、`upright` だと 1 文字ずつ正立します。2 桁の数字は `text-combine-upright: all` で縦中横（1 文字分に横組み）にします。Netflix の日本語字幕ガイドも、縦書きの 2 桁数字は縦中横と定めています。" },
        { code: ".tate {\n  writing-mode: vertical-rl;\n  text-orientation: mixed;\n}\n.tcy { text-combine-upright: all; } /* <span class=\"tcy\">12</span>月 */", lang: "css" },
        { list: [
          "動きの向きは x と y を入れ替えて考えます。横書きの「下からせり上がる」は、縦書きでは「上から下へ流れ込む」か「右から出る」に置き換えます。",
          "登場の順序は「上 → 下」、行は「右 → 左」です。",
          "transform は書字方向に関係なく画面の座標で効くので、`translateY` は縦書きでも画面の上下に動きます。",
          "縦書きの約物（、。「」ー）は縦書き用の字形に切り替わります。Canvas で描く場合は自分で回転・位置補正が必要です。"
        ] }
      ],
      bodyEn: [
        { p: "Vertical text uses `writing-mode: vertical-rl`, with lines advancing from right to left. Latin letters and digits lie sideways with `text-orientation: mixed` (the default) and stand upright one by one with `upright`. Two-digit numbers use `text-combine-upright: all` for tate-chu-yoko (horizontal-in-vertical, fitting in one character cell). Netflix's Japanese subtitle guide also requires tate-chu-yoko for two-digit numbers in vertical subtitles." },
        { code: ".tate {\n  writing-mode: vertical-rl;\n  text-orientation: mixed;\n}\n.tcy { text-combine-upright: all; } /* <span class=\"tcy\">12</span>月 */", lang: "css" },
        { list: [
          "Swap x and y when thinking about direction. A horizontal rise from below becomes a flow down from the top, or an entrance from the right, in vertical text.",
          "Entrances run top to bottom, and lines run right to left.",
          "Transforms work in screen coordinates regardless of writing mode, so `translateY` still moves up and down the screen in vertical text.",
          "Punctuation (、。「」ー) switches to vertical glyph forms. If you draw with Canvas, you must rotate and offset them yourself."
        ] }
      ]
    },
    {
      h: "ルビ",
      hEn: "Ruby",
      body: [
        { p: "HTML の `<ruby>`・`<rt>`・`<rp>` は主要ブラウザで広く使えます（Baseline Widely available）。位置は `ruby-position: over | under | inter-character` で指定します。ルビは親文字と一緒に動かし、親文字の登場が終わる直前に少し遅れて出すと、読みの補助として自然に見えます。" },
        { code: "<ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>\n\n<style>\nruby rt { animation: rt-in .4s .15s cubic-bezier(.16,1,.3,1) both; }\n@keyframes rt-in { from { opacity: 0; transform: translateY(.3em); } }\n</style>", lang: "html" },
        { list: [
          "Netflix の日本語字幕では、ルビは横書きなら上、縦書きなら右に置き、付けるのは初出のみ（子供向けは毎回）です。",
          "親文字を 1 文字ずつ分割すると、ルビとの対応（どの親文字にかかるか）が崩れます。ルビ付きの語は 1 つの単位として扱います。",
          "After Effects にはルビの機能が無いので、親文字とは別のレイヤーにして、同期させるのが一般的です。"
        ] }
      ],
      bodyEn: [
        { p: "HTML `<ruby>`, `<rt>` and `<rp>` work across major browsers (Baseline Widely available). Set the position with `ruby-position: over | under | inter-character`. Move the ruby together with its base text; bringing it in slightly after the base finishes entering makes it read naturally as a reading aid." },
        { code: "<ruby>漢字<rp>(</rp><rt>かんじ</rt><rp>)</rp></ruby>\n\n<style>\nruby rt { animation: rt-in .4s .15s cubic-bezier(.16,1,.3,1) both; }\n@keyframes rt-in { from { opacity: 0; transform: translateY(.3em); } }\n</style>", lang: "html" },
        { list: [
          "Netflix Japanese subtitles put ruby above horizontal text and to the right of vertical text, and only on the first occurrence (every time in children's content).",
          "Splitting the base text into single characters breaks its pairing with the ruby. Treat a word with ruby as a single unit.",
          "After Effects has no ruby feature, so the usual approach is a separate layer synced to the base text."
        ] }
      ]
    },
    {
      h: "約物（句読点・括弧）の扱い",
      hEn: "Handling punctuation (yakumono)",
      body: [
        { p: "読点・句点・括弧などの約物は、モーションでは「間（ま）」の手がかりになります。約物の直後に少し待ちを入れると、話し言葉のリズムに近づきます。目安は読点の後に +100〜200 ms、句点の後に +250〜400 ms です（慣習値）。" },
        { code: "// 約物の後に待ちを足した遅延を作る\nlet t = 0;\nconst delays = units.map(u => {\n  const d = t;\n  t += 40;                                 // 通常の間隔 (ms)\n  if (/[、，]$/.test(u)) t += 150;         // 読点\n  if (/[。！？!?]$/.test(u)) t += 320;      // 句点・感嘆符\n  return d;\n});", lang: "js" },
        { list: [
          "約物は `text-spacing-trim` や `text-autospace` の詰め処理を受けます。文字ごとに分割すると、詰めが効かなくなって字間が変わることがあります。",
          "行頭に読点や閉じ括弧が来ないようにする禁則処理は、`line-break: strict` で強められます。自前で行分割する場合は禁則も自分で処理します。",
          "Netflix の日本語字幕は句読点を使わず、読点は半角スペース、句点は全角スペースに置き換えます。空白がそのまま間の役目を果たします。"
        ] }
      ],
      bodyEn: [
        { p: "Commas, full stops and brackets serve as cues for pauses in motion. Adding a short wait right after punctuation brings the rhythm closer to speech. A rule of thumb is +100–200 ms after a comma (、) and +250–400 ms after a full stop (。) (convention values)." },
        { code: "// Build delays with extra waits after punctuation\nlet t = 0;\nconst delays = units.map(u => {\n  const d = t;\n  t += 40;                                 // regular gap (ms)\n  if (/[、，]$/.test(u)) t += 150;         // comma\n  if (/[。！？!?]$/.test(u)) t += 320;      // full stop, exclamation\n  return d;\n});", lang: "js" },
        { list: [
          "Punctuation is subject to spacing adjustments such as `text-spacing-trim` and `text-autospace`. Splitting into characters can stop these from applying and change the spacing.",
          "Kinsoku (no comma or closing bracket at the start of a line) can be tightened with `line-break: strict`. If you break lines yourself, you must handle kinsoku yourself too.",
          "Netflix Japanese subtitles drop punctuation, replacing commas with a half-width space and full stops with a full-width space. The space itself serves as the pause."
        ] }
      ]
    },
    {
      h: "書体と和欧混植",
      hEn: "Typefaces and mixed Japanese–Latin setting",
      body: [
        { p: "ゴシック体は縁取りや揺れに強く、小さくても読めるので、テロップや UI の動きに向いています。明朝体は横画が細いため、ブラーや高速の移動、インターレースの映像でちらつきやすく、ゆっくりしたフェードやトラッキングのような静かな演出に向いています。エヴァンゲリオンの極太明朝（マティス EB）は、太さで細線の問題を避けた強調用の例外です。" },
        { list: [
          "和欧混植では、欧文フォントを先、和文フォントを後に並べるのが一般的です（`font-family: Inter, 'Noto Sans JP', sans-serif`）。欧文と和文でベースラインや字面の大きさがずれるので、動かす前に静止状態で揃っているか確認します。",
          "欧文の部分は単語単位、和文の部分は文字か文節単位で分けると、欧文のカーニングを保ったまま日本語のリズムを作れます。",
          "`text-autospace` が使える環境では、和欧の間に自動で小さな空きが入ります。分割するとこの空きが消えることがあるので、空きを span の余白として再現します。"
        ] }
      ],
      bodyEn: [
        { p: "Gothic (sans) typefaces hold up well under outlines and shakes and stay readable at small sizes, so they suit telops and UI motion. Mincho (serif) faces have thin horizontal strokes that flicker under blur, fast movement and interlaced video, so they suit quiet effects such as slow fades and tracking. Evangelion's extra-bold Mincho (Matisse EB) is an exception for emphasis, where the weight sidesteps the thin-stroke problem." },
        { list: [
          "For mixed Japanese–Latin text, list the Latin font first and the Japanese font after (`font-family: Inter, 'Noto Sans JP', sans-serif`). Baselines and apparent sizes differ between the two, so check that they line up at rest before animating.",
          "Splitting Latin runs by word and Japanese runs by character or phrase keeps Latin kerning intact while giving Japanese its own rhythm.",
          "Where `text-autospace` is supported, a small gap is added automatically between Japanese and Latin characters. Splitting can remove that gap, so reproduce it as span margins."
        ] }
      ]
    },
    {
      h: "字幕の文字数とテロップの縁取り",
      hEn: "Subtitle lengths and telop outlines",
      body: [
        { p: "日本語字幕は 1 秒 4 文字が伝統的な基準です。Netflix では 1 行あたり横書き 13 文字・縦書き 11 文字、最大 2 行、最短表示 0.5 秒（24fps で 12 フレーム）です。画面上の文字と重なる場合は縦書きにし、既定は右側に置きます。生放送の字幕は 1 枚 2 行 30 文字程度が使われています。" },
        { p: "バラエティ番組のテロップは、太いゴシック + 白い縁 + 外側の色縁の二重縁 + ドロップシャドウが典型です（縁の太さは文字サイズの 8〜15% が目安）。CSS の `-webkit-text-stroke` は線が字形の中心に描かれて文字が細るので、`paint-order: stroke fill`（対応ブラウザ）で線を塗りの下に回すか、重ねた要素や SVG で縁を作ります。" },
        { code: ".telop {\n  font: 900 64px/1.2 'Noto Sans JP', sans-serif;\n  color: #fff;\n  -webkit-text-stroke: 12px #e6006e;   /* 外側の色縁（太め） */\n  paint-order: stroke fill;            /* 線を塗りの下に */\n  filter: drop-shadow(0 4px 0 rgba(0,0,0,.35));\n}\n/* 白い縁は同じ文字を重ねた要素で作る（線幅は補間されないので注意） */", lang: "css" },
        { note: "`-webkit-text-stroke` の線幅は補間されず、離散的に切り替わります（補間されるのは色だけ）。縁を太らせるアニメーションには SVG の `stroke-width` を使います。" }
      ],
      bodyEn: [
        { p: "The traditional Japanese subtitle standard is four characters per second. Netflix allows 13 characters per horizontal line and 11 per vertical line, up to two lines, with a minimum duration of 0.5 s (12 frames at 24 fps). When subtitles would overlap on-screen text they go vertical, on the right by default. Live captions commonly use about 30 characters over two lines per screen." },
        { p: "Japanese variety-show telops typically use a heavy Gothic face with a white outline, an outer coloured outline (a double outline) and a drop shadow (outline thickness around 8–15% of the font size). CSS `-webkit-text-stroke` draws the stroke centred on the glyph outline and thins the letters, so either push the stroke under the fill with `paint-order: stroke fill` (where supported) or build the outlines from stacked elements or SVG." },
        { code: ".telop {\n  font: 900 64px/1.2 'Noto Sans JP', sans-serif;\n  color: #fff;\n  -webkit-text-stroke: 12px #e6006e;   /* outer coloured outline (thicker) */\n  paint-order: stroke fill;            /* stroke under the fill */\n  filter: drop-shadow(0 4px 0 rgba(0,0,0,.35));\n}\n/* Build the white outline with a stacked copy (stroke width doesn't interpolate) */", lang: "css" },
        { note: "The width of `-webkit-text-stroke` doesn't interpolate; it switches discretely (only the colour interpolates). Animate outline thickness with SVG `stroke-width` instead." }
      ]
    }
  ],
  related: ["bunsetsu-reveal", "tategaki-reveal", "ruby-sync", "yakumono-pause", "phrase-line-break", "jp-subtitle-timing", "vertical-subtitle", "telop-pop-outline"],
  sources: [
    { title: "google/budoux", url: "https://github.com/google/budoux" },
    { title: "Chrome for Developers: CSS i18n features", url: "https://developer.chrome.com/blog/css-i18n-features" },
    { title: "Netflix: Japanese Timed Text Style Guide", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/215767517-Japanese-Timed-Text-Style-Guide" },
    { title: "言語処理学会 2010: 字幕の改行位置に関する研究 (PA2-34)", url: "https://anlp.jp/proceedings/annual_meeting/2010/pdf_dir/PA2-34.pdf" },
    { title: "言語処理学会 2011: 生字幕の表示速度 (A5-7)", url: "https://www.anlp.jp/proceedings/annual_meeting/2011/pdf_dir/A5-7.pdf" },
    { title: "All About: 映画字幕の 1 秒 4 文字", url: "https://allabout.co.jp/gm/gc/452345/" },
    { title: "MDN: <ruby>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/ruby" },
    { title: "MDN: -webkit-text-stroke", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-text-stroke" },
    { title: "Filmora: テロップの種類と作り方", url: "https://filmora.wondershare.jp/video-creativity/how-to-make-subtitle-telop.html" },
    { title: "Otaku Mode: エヴァンゲリオンとマティス EB (Fontworks interview)", url: "https://route2015.otakumode.com/interview/01/2/" }
  ]
},

/* ───────────────────────── 6. CSS ───────────────────────── */
{
  id: "css-only",
  icon: "scroll",
  title: "CSS だけで作る",
  titleEn: "Building it with CSS alone",
  lead: "文字ごとの遅延、光の帯、マスク、可変フォント、スクロール連動まで、多くのテキストモーションは CSS だけで書けます。主な技法と、滑らかに動かすための性能の注意点をまとめます。",
  leadEn: "Per-character delays, light sweeps, masks, variable fonts and even scroll-linked motion can mostly be written in CSS alone. This guide covers the main techniques and what to watch for to keep them smooth.",
  sections: [
    {
      h: "文字ごとの遅延：--i 変数",
      hEn: "Per-character delays with an --i variable",
      body: [
        { p: "分割した各要素に番号の CSS 変数を持たせれば、遅延は `calc()` で書けます。番号は自前の `style=\"--i:3\"`、Splitting.js の `--char-index`、SplitText の `propIndex` のどれでも同じように使えます。総数の変数があれば「中央から」「最後から」の順序も作れます。" },
        { code: ".char {\n  display: inline-block;\n  animation: rise .6s cubic-bezier(.16,1,.3,1) both;\n  animation-delay: calc(var(--i) * 30ms);\n}\n/* 中央から外へ：|i − (n−1)/2| を遅延に */\n.from-center .char {\n  animation-delay: calc(max(var(--i) - (var(--n) - 1) / 2, (var(--n) - 1) / 2 - var(--i)) * 40ms);\n}\n.line { overflow: clip; }   /* 行マスク */\n@keyframes rise { from { transform: translateY(110%); opacity: 0; } }", lang: "css" }
      ],
      bodyEn: [
        { p: "Give each split element a numbered CSS variable and the delay becomes a `calc()`. The number can be your own `style=\"--i:3\"`, Splitting.js `--char-index` or SplitText `propIndex`; they all work the same way. With a total-count variable you can also run the order from the centre or from the end." },
        { code: ".char {\n  display: inline-block;\n  animation: rise .6s cubic-bezier(.16,1,.3,1) both;\n  animation-delay: calc(var(--i) * 30ms);\n}\n/* From the centre out: use |i − (n−1)/2| as the delay */\n.from-center .char {\n  animation-delay: calc(max(var(--i) - (var(--n) - 1) / 2, (var(--n) - 1) / 2 - var(--i)) * 40ms);\n}\n.line { overflow: clip; }   /* line mask */\n@keyframes rise { from { transform: translateY(110%); opacity: 0; } }", lang: "css" }
      ]
    },
    {
      h: "@property で変数そのものを動かす",
      hEn: "Animating custom properties with @property",
      body: [
        { p: "通常の CSS 変数は文字列として扱われ、補間されません。`@property` で型を登録すると、変数自体をアニメーションできます。グラデーションの停止位置、角度、可変フォントの軸を、別々のタイミングで動かすのに使えます。" },
        { code: "@property --x {\n  syntax: '<percentage>';\n  inherits: false;\n  initial-value: 0%;\n}\n.shine {\n  background: linear-gradient(100deg, #9aa 0 calc(var(--x) - 10%), #fff var(--x), #9aa calc(var(--x) + 10%));\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  animation: sweep 2.4s linear infinite;\n}\n@keyframes sweep { from { --x: -20%; } to { --x: 120%; } }", lang: "css" }
      ],
      bodyEn: [
        { p: "Ordinary CSS variables are treated as strings and don't interpolate. Registering a type with `@property` lets the variable itself animate. Use it to move gradient stops, angles or variable-font axes on independent timings." },
        { code: "@property --x {\n  syntax: '<percentage>';\n  inherits: false;\n  initial-value: 0%;\n}\n.shine {\n  background: linear-gradient(100deg, #9aa 0 calc(var(--x) - 10%), #fff var(--x), #9aa calc(var(--x) + 10%));\n  -webkit-background-clip: text;\n  background-clip: text;\n  color: transparent;\n  animation: sweep 2.4s linear infinite;\n}\n@keyframes sweep { from { --x: -20%; } to { --x: 120%; } }", lang: "css" }
      ]
    },
    {
      h: "文字の中を塗る：background-clip: text",
      hEn: "Painting inside letters: background-clip: text",
      body: [
        { p: "`background-clip: text`（古いブラウザ向けに `-webkit-` 版も併記）と `color: transparent` で、背景を文字の形に切り抜けます。グラデーションの流れ、光の帯（shine sweep）、動画やテクスチャの流し込みの土台です。Magic UI の AnimatedShinyText は、`background-position` を `calc(-100% - w) 0` から `calc(100% + w) 0` へ動かしています。" },
        { list: [
          "`text-shadow` は切り抜いた背景の上に重なって見えなくなるので、`text-shadow: none` にし、影が要るなら `filter: drop-shadow()` を使います。",
          "背景が描けない場合に備えて、`@supports not (background-clip: text)` で通常の `color` に戻します。",
          "選択範囲のハイライトが見えにくくなるので、`::selection` の色も確認します。"
        ] }
      ],
      bodyEn: [
        { p: "`background-clip: text` (with the `-webkit-` version for older browsers) plus `color: transparent` clips the background to the letter shapes. It is the basis for flowing gradients, shine sweeps and video or texture fills. Magic UI's AnimatedShinyText moves `background-position` from `calc(-100% - w) 0` to `calc(100% + w) 0`." },
        { list: [
          "`text-shadow` is painted over the clipped background and hides it, so set `text-shadow: none` and use `filter: drop-shadow()` if you need a shadow.",
          "In case the background can't render, fall back to a normal `color` under `@supports not (background-clip: text)`.",
          "Selection highlights can become hard to see, so check `::selection` colours too."
        ] }
      ]
    },
    {
      h: "マスクとクリップで見せる範囲を動かす",
      hEn: "Reveals with masks and clip paths",
      body: [
        { p: "最も軽いのは `overflow: clip` の行マスクです。斜めや円形の切り口が欲しければ `clip-path`、エッジを柔らかくしたければ `mask-image` を使います。`clip-path` は同じ種類の図形同士なら補間され、polygon は頂点数を揃える必要があります。" },
        { code: "/* 左から書き出す（Tyler Gaw の write-on と同じ形） */\n.write {\n  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);\n  animation: write 1.2s cubic-bezier(.65,0,.35,1) forwards;\n}\n@keyframes write { to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n\n/* エッジの柔らかいワイプ */\n.soft {\n  mask-image: linear-gradient(90deg, #000 40%, transparent 60%);\n  mask-size: 250% 100%;\n  mask-position: 100% 0;\n  animation: wipe 1.4s ease-out forwards;\n}\n@keyframes wipe { to { mask-position: 0 0; } }", lang: "css" }
      ],
      bodyEn: [
        { p: "The lightest option is a line mask with `overflow: clip`. Use `clip-path` for diagonal or circular edges and `mask-image` for soft edges. `clip-path` interpolates between shapes of the same type, and polygons need the same number of points." },
        { code: "/* Write on from the left (the same shape as Tyler Gaw's write-on) */\n.write {\n  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);\n  animation: write 1.2s cubic-bezier(.65,0,.35,1) forwards;\n}\n@keyframes write { to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); } }\n\n/* Soft-edged wipe */\n.soft {\n  mask-image: linear-gradient(90deg, #000 40%, transparent 60%);\n  mask-size: 250% 100%;\n  mask-position: 100% 0;\n  animation: wipe 1.4s ease-out forwards;\n}\n@keyframes wipe { to { mask-position: 0 0; } }", lang: "css" }
      ]
    },
    {
      h: "可変フォント",
      hEn: "Variable fonts",
      body: [
        { p: "`font-variation-settings` は軸ごとに補間されます。ただし登録済みの軸（wght・wdth・slnt・ital・opsz）は `font-weight`・`font-stretch`・`font-style`・`font-optical-sizing` で指定するのが推奨で、`font-variation-settings` はカスケードの順序に関係なくそれらを上書きします。軸を個別のタイミングで動かすには、`@property` で数値の変数を登録して入れます。" },
        { code: "@property --wght { syntax: '<number>'; inherits: true; initial-value: 400; }\n.wave span {\n  font-variation-settings: 'wght' var(--wght);\n  animation: w 1.6s ease-in-out infinite alternate;\n  animation-delay: calc(var(--i) * -120ms);\n}\n@keyframes w { to { --wght: 900; } }", lang: "css" },
        { note: "太さや幅が変わると字幅も変わり、周りの文字が押し出されて行が揺れます。揺らしたくない場合は文字ごとに固定幅の箱に入れるか、字幅が変わらない軸だけを動かします。また、軸の変化は毎フレーム再描画を起こすので、対象の文字数を抑えます。" }
      ],
      bodyEn: [
        { p: "`font-variation-settings` interpolates axis by axis. For registered axes (wght, wdth, slnt, ital, opsz), though, the recommended route is `font-weight`, `font-stretch`, `font-style` and `font-optical-sizing`, and `font-variation-settings` overrides those regardless of cascade order. To animate axes on separate timings, register numeric variables with `@property` and feed them in." },
        { code: "@property --wght { syntax: '<number>'; inherits: true; initial-value: 400; }\n.wave span {\n  font-variation-settings: 'wght' var(--wght);\n  animation: w 1.6s ease-in-out infinite alternate;\n  animation-delay: calc(var(--i) * -120ms);\n}\n@keyframes w { to { --wght: 900; } }", lang: "css" },
        { note: "Changing weight or width changes the glyph advance, pushing neighbouring letters and making the line wobble. If you don't want that, put each character in a fixed-width box or animate only axes that keep the advance constant. Axis changes also repaint every frame, so keep the number of animated characters low." }
      ]
    },
    {
      h: "スクロール駆動アニメーション",
      hEn: "Scroll-driven animations",
      body: [
        { p: "`animation-timeline: view()` を使うと、要素が画面に入ってから出るまでの進み具合でアニメーションを進められます。単語ごとに `animation-range` を番号でずらせば、スクロールに合わせて単語が順に明るくなります。対応ブラウザはまだ限られるので、`@supports` で囲み、非対応では完成状態を表示します。" },
        { code: "@supports (animation-timeline: view()) {\n  .reveal .w {\n    animation: lit linear both;\n    animation-timeline: view();\n    animation-range: entry calc(var(--i) * 2%) cover 40%;\n  }\n  @keyframes lit { from { opacity: .15; filter: blur(4px); } }\n}\n@media (prefers-reduced-motion: reduce) {\n  .reveal .w { animation: none; }\n}", lang: "css" },
        { p: "スクロール駆動ではスクロール位置自体が緩急になるので、`linear` を使うのが基本です。JS からは `ViewTimeline` と `rangeStart`・`rangeEnd` を指定した `element.animate()` で同じことができます。" }
      ],
      bodyEn: [
        { p: "`animation-timeline: view()` drives an animation by how far an element has travelled from entering the viewport to leaving it. Offset `animation-range` per word by index and the words light up one after another as you scroll. Browser support is still limited, so wrap it in `@supports` and show the finished state elsewhere." },
        { code: "@supports (animation-timeline: view()) {\n  .reveal .w {\n    animation: lit linear both;\n    animation-timeline: view();\n    animation-range: entry calc(var(--i) * 2%) cover 40%;\n  }\n  @keyframes lit { from { opacity: .15; filter: blur(4px); } }\n}\n@media (prefers-reduced-motion: reduce) {\n  .reveal .w { animation: none; }\n}", lang: "css" },
        { p: "With scroll-driven motion the scroll position supplies the easing, so `linear` is the default choice. From JavaScript, `element.animate()` with a `ViewTimeline` plus `rangeStart` and `rangeEnd` does the same." }
      ]
    },
    {
      h: "改行・View Transitions・性能",
      hEn: "Wrapping, View Transitions and performance",
      body: [
        { list: [
          "`text-wrap: balance` は行の長さを揃えます（Chromium は 6 行以下、Firefox は 10 行以下に適用）。分割した後に当てると行の数え方が変わることがあるので、balance を当ててから行分割します。",
          "`document.startViewTransition()` で文字列を差し替えると、`::view-transition-old(name)` と `::view-transition-new(name)` に独自のキーフレームを当てて、入れ替えを演出できます。",
          "動かすのは `transform` と `opacity` が基本です。これらはコンポジタだけで処理でき、レイアウトも再描画も起こしません。",
          "`filter: blur()` は半径と要素数に比例して重くなります。文字ごとのブラーは単語単位にするか、最大 8〜10px に抑えます。",
          "`will-change` はアニメーション中だけ付けます。数百の要素に常時付けるとメモリを圧迫します。",
          "3D の回転には親に `perspective`（1000〜2000px）を付け、文字は `display: inline-block` にします。"
        ] }
      ],
      bodyEn: [
        { list: [
          "`text-wrap: balance` evens out line lengths (applied up to 6 lines in Chromium and 10 in Firefox). Applying it after splitting can change how lines are counted, so balance first, then split into lines.",
          "Swap text inside `document.startViewTransition()` and you can style the swap with your own keyframes on `::view-transition-old(name)` and `::view-transition-new(name)`.",
          "Animate `transform` and `opacity` by default. They run on the compositor alone and trigger neither layout nor paint.",
          "`filter: blur()` gets heavier with radius and element count. Blur per word rather than per character, or cap it at 8–10px.",
          "Apply `will-change` only while animating. Leaving it on hundreds of elements eats memory.",
          "For 3D rotation, give the parent `perspective` (1000–2000px) and make characters `display: inline-block`."
        ] }
      ]
    }
  ],
  related: ["shiny-sweep", "gradient-flow", "view-timeline-words", "scroll-clip-write", "weight-wave", "soft-mask-wipe", "line-mask-rise", "center-out-reveal"],
  sources: [
    { title: "MDN: @property", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@property" },
    { title: "MDN: background-clip", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip" },
    { title: "MDN: clip-path", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path" },
    { title: "MDN: font-variation-settings", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings" },
    { title: "MDN: animation-timeline view()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view" },
    { title: "Tyler Gaw: CSS scroll-driven write-on", url: "https://tylergaw.com/blog/css-scroll-driven-write-on/" },
    { title: "MDN: text-wrap", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap" },
    { title: "MDN: View Transition API", url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API" },
    { title: "Magic UI (source)", url: "https://github.com/magicuidesign/magicui" }
  ]
},

/* ───────────────────────── 7. JS ライブラリ ───────────────────────── */
{
  id: "js-libraries",
  icon: "code",
  title: "JavaScript ライブラリ",
  titleEn: "JavaScript libraries",
  lead: "GSAP、Motion、anime.js、Typed.js、そして React のコンポーネント集。それぞれ得意な場面が違います。選び方の目安と、テキスト向けの機能を使った最小のコードをまとめます。",
  leadEn: "GSAP, Motion, anime.js, Typed.js and the React component collections each shine in different places. This guide gives a rule of thumb for choosing and minimal code using their text features.",
  sections: [
    {
      h: "どれを使うか",
      hEn: "Which one to use",
      body: [
        { table: { head: ["ライブラリ", "向いている場面", "テキスト向けの機能"], rows: [
          ["GSAP", "タイムラインの組み立て、スクロール連動、細かい制御", "SplitText、ScrambleText、TextPlugin、ScrollTrigger（3.13 以降すべて無料）"],
          ["Motion", "React の宣言的な UI、ジェスチャー、レイアウト", "variants と staggerChildren、Motion+ の splitText・Typewriter・AnimateNumber"],
          ["anime.js v4", "軽量で関数的な記述、分割と stagger", "splitText（v4.1.0 以降）、scrambleText、stagger の from/grid"],
          ["Splitting.js", "分割だけを JS、動きは CSS", "--char-index などの CSS 変数"],
          ["Typed.js", "タイプライターだけが欲しい場合", "typeSpeed、backSpeed、smartBackspace、^1000 の停止記法"],
          ["Web Animations API", "依存を増やしたくない場合", "element.animate、ViewTimeline、Animation.finished"]
        ] } },
        { note: "迷ったら、静的なサイトの見出しは CSS か WAAPI、スクロールで組み立てる演出は GSAP、React の状態に連動する UI は Motion、という分け方が実用的です。" }
      ],
      bodyEn: [
        { table: { head: ["Library", "Good for", "Text features"], rows: [
          ["GSAP", "Building timelines, scroll-linked motion, fine control", "SplitText, ScrambleText, TextPlugin, ScrollTrigger (all free since 3.13)"],
          ["Motion", "Declarative React UI, gestures, layout", "variants with staggerChildren; Motion+ splitText, Typewriter, AnimateNumber"],
          ["anime.js v4", "Lightweight, functional style; splitting and staggers", "splitText (since v4.1.0), scrambleText, stagger from/grid"],
          ["Splitting.js", "Split in JS, animate in CSS", "CSS variables such as --char-index"],
          ["Typed.js", "When all you need is a typewriter", "typeSpeed, backSpeed, smartBackspace, ^1000 pause syntax"],
          ["Web Animations API", "No extra dependencies", "element.animate, ViewTimeline, Animation.finished"]
        ] } },
        { note: "If in doubt: CSS or WAAPI for headlines on static sites, GSAP for scroll-built sequences, and Motion for UI tied to React state." }
      ]
    },
    {
      h: "GSAP：SplitText と ScrollTrigger",
      hEn: "GSAP: SplitText and ScrollTrigger",
      body: [
        { p: "GSAP 3.13（2025 年 4 月）で SplitText を含む全プラグインが商用でも無料になり、SplitText は約 50% 小さく作り直されました。行マスク・自動再分割・スクロール連動を組み合わせた典型例です。" },
        { code: "import gsap from 'gsap';\nimport { SplitText } from 'gsap/SplitText';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\ngsap.registerPlugin(SplitText, ScrollTrigger);\n\nSplitText.create('.headline', {\n  type: 'lines,words',\n  mask: 'lines',\n  autoSplit: true,            // フォント読み込み後・リサイズ時に再分割\n  onSplit(self) {\n    return gsap.from(self.lines, {   // return すると再分割時に引き継がれる\n      yPercent: 100,\n      duration: 0.8,\n      ease: 'power3.out',\n      stagger: 0.1,\n      scrollTrigger: { trigger: '.headline', start: 'top 80%' }\n    });\n  }\n});", lang: "js" },
        { p: "スクロール量で進める場合は `scrub: true`（数値なら追従の遅れの秒数）にし、ease は `'none'` にします。`onUpdate(self)` の `self.getVelocity()`（px/秒）を skew やブラーに写像すると、スクロール速度に反応する文字になります。" }
      ],
      bodyEn: [
        { p: "GSAP 3.13 (April 2025) made every plugin, SplitText included, free for commercial use, and SplitText was rebuilt about 50% smaller. Here is a typical combination of line masks, automatic re-splitting and scroll triggering." },
        { code: "import gsap from 'gsap';\nimport { SplitText } from 'gsap/SplitText';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\ngsap.registerPlugin(SplitText, ScrollTrigger);\n\nSplitText.create('.headline', {\n  type: 'lines,words',\n  mask: 'lines',\n  autoSplit: true,            // re-split after font load and on resize\n  onSplit(self) {\n    return gsap.from(self.lines, {   // returning it carries progress across re-splits\n      yPercent: 100,\n      duration: 0.8,\n      ease: 'power3.out',\n      stagger: 0.1,\n      scrollTrigger: { trigger: '.headline', start: 'top 80%' }\n    });\n  }\n});", lang: "js" },
        { p: "To drive it by scroll distance, use `scrub: true` (a number sets the catch-up lag in seconds) and `ease: 'none'`. Mapping `self.getVelocity()` (px/s) from `onUpdate(self)` to skew or blur makes text react to scroll speed." }
      ]
    },
    {
      h: "GSAP：ScrambleText と TextPlugin",
      hEn: "GSAP: ScrambleText and TextPlugin",
      body: [
        { p: "ScrambleTextPlugin は、ランダムな文字を経由して目的の文字列に着地させます。TextPlugin は文字列を打ち替え、`type: 'diff'` にすると変わった部分だけを打ち直します。`speed` を指定すると、長さが `0.05 / speed × 変化した文字数` 秒になります。" },
        { code: "gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);\n\ngsap.to('.code', {\n  duration: 1.2,\n  scrambleText: { text: 'ACCESS GRANTED', chars: 'upperCase', revealDelay: 0.3, speed: 0.6 }\n});\n\ngsap.to('.price', {\n  text: { value: '¥12,800', type: 'diff', speed: 1 }\n});", lang: "js" },
        { note: "スクランブルは途中の文字が読めず、読み上げにも向きません。原文を別に置き、視差効果を減らす設定では最終の文字列をすぐに表示します。" }
      ],
      bodyEn: [
        { p: "ScrambleTextPlugin lands on the target string by way of random characters. TextPlugin retypes a string, and with `type: 'diff'` it retypes only what changed. Setting `speed` makes the duration `0.05 / speed × number of changed characters` seconds." },
        { code: "gsap.registerPlugin(ScrambleTextPlugin, TextPlugin);\n\ngsap.to('.code', {\n  duration: 1.2,\n  scrambleText: { text: 'ACCESS GRANTED', chars: 'upperCase', revealDelay: 0.3, speed: 0.6 }\n});\n\ngsap.to('.price', {\n  text: { value: '¥12,800', type: 'diff', speed: 1 }\n});", lang: "js" },
        { note: "Scrambled intermediate text is unreadable and unsuitable for screen readers. Keep the original text separately, and under reduced motion show the final string immediately." }
      ]
    },
    {
      h: "Motion（motion.dev）",
      hEn: "Motion (motion.dev)",
      body: [
        { p: "Motion+ の `splitText()`（約 0.7 KB）は chars・words・lines を返し、ARIA も付けます。`animate()` と `stagger()` で順に動かします。React では、親の `staggerChildren` と子の variants という宣言的な書き方が基本で、Magic UI の TextAnimate もこの形です。" },
        { code: "import { animate, stagger } from 'motion';\nimport { splitText } from 'motion-plus';\n\ndocument.fonts.ready.then(() => {\n  const { chars } = splitText('h1');\n  animate(chars, { opacity: [0, 1], y: [10, 0] }, { duration: 1, delay: stagger(0.05) });\n});", lang: "js" },
        { code: "const parent = { show: { transition: { staggerChildren: 0.05 } } };\nconst child = {\n  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },\n  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.3 } }\n};\n\n<motion.h1 variants={parent} initial=\"hidden\" animate=\"show\" aria-label={text}>\n  {words.map((w, i) => (\n    <motion.span key={i} variants={child} aria-hidden style={{ display: 'inline-block' }}>{w} </motion.span>\n  ))}\n</motion.h1>", lang: "jsx" }
      ],
      bodyEn: [
        { p: "Motion+ `splitText()` (about 0.7 KB) returns chars, words and lines and adds ARIA attributes. Animate them in sequence with `animate()` and `stagger()`. In React the core pattern is declarative: `staggerChildren` on the parent and variants on the children, which is also how Magic UI's TextAnimate works." },
        { code: "import { animate, stagger } from 'motion';\nimport { splitText } from 'motion-plus';\n\ndocument.fonts.ready.then(() => {\n  const { chars } = splitText('h1');\n  animate(chars, { opacity: [0, 1], y: [10, 0] }, { duration: 1, delay: stagger(0.05) });\n});", lang: "js" },
        { code: "const parent = { show: { transition: { staggerChildren: 0.05 } } };\nconst child = {\n  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },\n  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.3 } }\n};\n\n<motion.h1 variants={parent} initial=\"hidden\" animate=\"show\" aria-label={text}>\n  {words.map((w, i) => (\n    <motion.span key={i} variants={child} aria-hidden style={{ display: 'inline-block' }}>{w} </motion.span>\n  ))}\n</motion.h1>", lang: "jsx" }
      ]
    },
    {
      h: "anime.js v4 と Typed.js",
      hEn: "anime.js v4 and Typed.js",
      body: [
        { p: "anime.js v4 の `splitText()` は v4.1.0 から使え、v4.2.0 からは `animejs/text` を単体で import できます。`wrap: 'clip'` で各単位をマスクし、各行に付く `data-line` を使えば行ごとに向きを変えられます。" },
        { code: "import { animate, stagger, splitText } from 'animejs';\n\nconst { chars } = splitText('h2', { chars: { wrap: 'clip' } });\nanimate(chars, {\n  y: ['100%', '0%'],\n  duration: 650,\n  ease: 'inOut(3)',\n  delay: stagger(10, { from: 'random' })\n});", lang: "js" },
        { p: "Typed.js はタイプライター専用の小さなライブラリです。`smartBackspace` は前の文字列と共通する部分を消さずに残し、文字列中の `^600` はそこで 600 ms 止まります。" },
        { code: "new Typed('#typed', {\n  strings: ['作る。^600', '動かす。^600', '伝える。'],\n  typeSpeed: 60,\n  backSpeed: 30,\n  backDelay: 700,\n  smartBackspace: true,\n  loop: true\n});", lang: "js" }
      ],
      bodyEn: [
        { p: "anime.js v4 `splitText()` is available from v4.1.0, and from v4.2.0 you can import `animejs/text` on its own. `wrap: 'clip'` masks each unit, and the `data-line` attribute on each line lets you change direction line by line." },
        { code: "import { animate, stagger, splitText } from 'animejs';\n\nconst { chars } = splitText('h2', { chars: { wrap: 'clip' } });\nanimate(chars, {\n  y: ['100%', '0%'],\n  duration: 650,\n  ease: 'inOut(3)',\n  delay: stagger(10, { from: 'random' })\n});", lang: "js" },
        { p: "Typed.js is a small library just for typewriters. `smartBackspace` keeps the part shared with the previous string instead of deleting it, and `^600` inside a string pauses there for 600 ms." },
        { code: "new Typed('#typed', {\n  strings: ['Build.^600', 'Animate.^600', 'Communicate.'],\n  typeSpeed: 60,\n  backSpeed: 30,\n  backDelay: 700,\n  smartBackspace: true,\n  loop: true\n});", lang: "js" }
      ]
    },
    {
      h: "React のコンポーネント集",
      hEn: "React component collections",
      body: [
        { p: "React Bits、Magic UI、Aceternity UI は、ソースをコピーして自分のプロジェクトに取り込む形式のコンポーネント集です。React Bits には SplitText・BlurText・ScrollFloat・TextPressure など、Magic UI には Text Animate・Morphing Text・Number Ticker など、Aceternity UI には Text Generate Effect・Flip Words・Encrypted Text などがあります。" },
        { list: [
          "取り込んだら、まずソースの数値を読みます。例えば React Bits SplitText は `{opacity: 0, y: 40}` から `power3.out`・1.25 秒・stagger 50 ms、BlurText は単語ごとに 3 段のキーフレームです。",
          "アクセシビリティの扱いはコンポーネントごとに違います。分割した要素の読み上げと、視差効果を減らす設定への対応を確認し、足りなければ追加します。",
          "多くは GSAP か Motion に依存しています。既にどちらかを使っているなら、同じ系統のものを選ぶとバンドルが増えません。",
          "演出名は集ごとに違っても中身は同じことが多い（Shiny Text と Animated Shiny Text など）。このサイトの各項目に、対応するコンポーネント名を載せています。"
        ] }
      ],
      bodyEn: [
        { p: "React Bits, Magic UI and Aceternity UI are copy-the-source component collections you bring into your own project. React Bits has SplitText, BlurText, ScrollFloat and TextPressure; Magic UI has Text Animate, Morphing Text and Number Ticker; Aceternity UI has Text Generate Effect, Flip Words and Encrypted Text, among others." },
        { list: [
          "Once imported, read the numbers in the source first. React Bits SplitText, for example, animates from `{opacity: 0, y: 40}` with `power3.out` over 1.25 s and a 50 ms stagger, and BlurText uses a three-step keyframe per word.",
          "Accessibility handling varies by component. Check how split elements are read and whether reduced motion is honoured, and add what's missing.",
          "Most depend on GSAP or Motion. If you already use one of them, choosing components built on it keeps the bundle down.",
          "The same effect often goes by different names across collections (Shiny Text versus Animated Shiny Text, for instance). Each entry on this site lists the matching component names."
        ] }
      ]
    }
  ],
  related: ["fade-up-chars", "line-mask-rise", "scramble-decode", "diff-retype", "typewriter-loop", "alternating-line-direction", "scroll-word-highlight", "rotating-letters-spring"],
  sources: [
    { title: "GSAP SplitText docs", url: "https://gsap.com/docs/v3/Plugins/SplitText/" },
    { title: "GSAP ScrambleTextPlugin docs", url: "https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/" },
    { title: "GSAP TextPlugin docs", url: "https://gsap.com/docs/v3/Plugins/TextPlugin/" },
    { title: "GSAP ScrollTrigger docs", url: "https://gsap.com/docs/v3/Plugins/ScrollTrigger/" },
    { title: "GSAP 3.13 release notes", url: "https://gsap.com/blog/3-13/" },
    { title: "Motion: splitText", url: "https://motion.dev/docs/split-text" },
    { title: "Motion: Typewriter (React)", url: "https://motion.dev/docs/react-typewriter" },
    { title: "anime.js: splitText", url: "https://animejs.com/documentation/text/splittext" },
    { title: "mattboldt/typed.js", url: "https://github.com/mattboldt/typed.js" },
    { title: "React Bits", url: "https://github.com/DavidHDev/react-bits" },
    { title: "Magic UI components", url: "https://magicui.design/docs/components" },
    { title: "Aceternity UI components", url: "https://ui.aceternity.com/components" }
  ]
},

/* ───────────────────────── 8. After Effects ───────────────────────── */
{
  id: "after-effects",
  icon: "ae",
  title: "After Effects のテキストアニメーター",
  titleEn: "After Effects text animators",
  lead: "AE のテキストモーションは「どのプロパティを変えるか（Animator）」と「どの文字にどれだけ効かせるか（Selector）」の組み合わせです。Range・Wiggly・Expression の各セレクター、文字単位の 3D、Source Text の式、Lottie に書き出すときの注意をまとめます。",
  leadEn: "Text motion in After Effects combines what to change (the Animator) with which characters it affects and by how much (the Selector). This guide covers the Range, Wiggly and Expression selectors, per-character 3D, Source Text expressions and caveats for Lottie export.",
  sections: [
    {
      h: "Animator × Selector の構造",
      hEn: "How Animators and Selectors fit together",
      body: [
        { p: "テキストレイヤーの Animate メニューから Animator を追加します。1 つの Animator は複数のプロパティ（Position、Scale、Rotation、Opacity、Fill/Stroke の色、Tracking、Blur、Skew など）と、複数の Selector を持てます。" },
        { p: "定石は「プロパティの値を開始状態にして、セレクターを動かす」です。例えば Opacity 0%・Position (0, 40) にしておき、Range Selector の Start（または Offset）を 0 → 100% へキーフレームすると、選ばれた文字が順に既定の状態へ戻り、登場して見えます。Web の「文字分割 × stagger」と同じ構造です。" },
        { note: "Animator は値を「足す」仕組みです。Position (0, 40) は「40px 下にずらす」の意味で、絶対位置ではありません。" }
      ],
      bodyEn: [
        { p: "Add an Animator from a text layer's Animate menu. One Animator can hold several properties (Position, Scale, Rotation, Opacity, Fill/Stroke colour, Tracking, Blur, Skew and more) and several Selectors." },
        { p: "The standard move is to set the property values to the starting state and animate the selector. For example, set Opacity 0% and Position (0, 40), then keyframe the Range Selector's Start (or Offset) from 0 to 100%: the selected characters return to their default state one by one and appear to enter. It is the same structure as split text plus stagger on the web." },
        { note: "Animators add to values. Position (0, 40) means shift down by 40px, not an absolute position." }
      ]
    },
    {
      h: "Range Selector",
      hEn: "The Range Selector",
      body: [
        { table: { head: ["プロパティ", "意味"], rows: [
          ["Start / End / Offset", "選択範囲。Offset は範囲全体をずらす（−100% → 100% で範囲を流すのが定番）"],
          ["Units", "Percentage / Index"],
          ["Based On", "Characters / Characters Excluding Spaces / Words / Lines"],
          ["Mode", "Add（既定）/ Subtract / Intersect / Min / Max / Difference。Subtract で効果が反転"],
          ["Amount", "効き具合。0% で無効、50% でプロパティ値の半分"],
          ["Shape", "Square / Ramp Up / Ramp Down / Triangle / Round / Smooth"],
          ["Smoothness", "Shape が Square のときの文字間の遷移。0% でタイプライターのような硬い切り替え"],
          ["Ease High / Ease Low", "±100%。100% でなだらか、−100% で急"],
          ["Randomize Order / Random Seed", "適用順をランダムにする。Seed 0 なら Animator グループを基準に決まる"]
        ] } },
        { p: "Shape を Ramp Up にし、Start と End の差でグラデーションの幅を決めると、柔らかい波のような登場になります。Based On を Words にすれば単語単位、Lines にすれば行単位の stagger です。" }
      ],
      bodyEn: [
        { table: { head: ["Property", "Meaning"], rows: [
          ["Start / End / Offset", "The selected range. Offset shifts the whole range (keyframing it from −100% to 100% to sweep the range is the classic move)"],
          ["Units", "Percentage / Index"],
          ["Based On", "Characters / Characters Excluding Spaces / Words / Lines"],
          ["Mode", "Add (default) / Subtract / Intersect / Min / Max / Difference. Subtract inverts the effect"],
          ["Amount", "Strength. 0% disables, 50% applies half the property value"],
          ["Shape", "Square / Ramp Up / Ramp Down / Triangle / Round / Smooth"],
          ["Smoothness", "Transition between characters when Shape is Square. 0% gives a hard, typewriter-like switch"],
          ["Ease High / Ease Low", "±100%. 100% is gentle, −100% is abrupt"],
          ["Randomize Order / Random Seed", "Randomises the order. A seed of 0 is derived from the Animator group"]
        ] } },
        { p: "Set Shape to Ramp Up and use the gap between Start and End to set the width of the gradient for a soft, wave-like entrance. Based On Words gives a per-word stagger, and Lines a per-line one." }
      ]
    },
    {
      h: "Wiggly Selector",
      hEn: "The Wiggly Selector",
      body: [
        { p: "Wiggly Selector は、文字ごとに時間とともに揺れる値を作ります。テロップの「揺れ」はこれで作るのが定番です（目安は ±2〜6px、5〜12 回/秒）。" },
        { list: [
          "Max / Min Amount：揺れの範囲。",
          "Wiggles/Second：1 秒あたりの揺れの回数。",
          "Correlation：100% で全文字が同時に揺れ、0% で文字ごとにばらばらに揺れる。",
          "Temporal / Spatial Phase：時間方向・文字方向の位相。",
          "Lock Dimensions：Scale を揺らすときに縦横比を保つ。"
        ] },
        { note: "Wiggly を Range Selector と同じ Animator に入れると、Range で選んだ範囲だけを揺らせます（Mode は Intersect がよく使われます）。" }
      ],
      bodyEn: [
        { p: "The Wiggly Selector produces values that wobble over time for each character. It is the standard way to build the shaking telop (typically ±2–6px at 5–12 wiggles per second)." },
        { list: [
          "Max / Min Amount: the range of the wobble.",
          "Wiggles/Second: how many wobbles per second.",
          "Correlation: at 100% every character moves together; at 0% each moves independently.",
          "Temporal / Spatial Phase: phase in time and across characters.",
          "Lock Dimensions: keeps the aspect ratio when wiggling Scale."
        ] },
        { note: "Put a Wiggly Selector in the same Animator as a Range Selector to shake only the range it selects (Intersect mode is the usual choice)." }
      ]
    },
    {
      h: "Expression Selector",
      hEn: "The Expression Selector",
      body: [
        { p: "Expression Selector の Amount には式を書けます。`textIndex`（1 始まり）、`textTotal`、`selectorValue` はこのセレクターの中でだけ使えます。既定の式は `selectorValue * textIndex/textTotal` です。文字ごとに一定のフレーム数ずつ遅らせる例です。" },
        { code: "// Amount：1 文字 1 フレーム遅れで、各文字 6 フレームかけて 100 → 0\nvar frames = 1 / thisComp.frameDuration;\nvar delay = 1, dur = 6;\nvar d = textIndex * (delay / frames);\nease(time, d, d + dur / frames, 100, 0);", lang: "expr" },
        { code: "// 文字ごとに固定の乱数（飛散・ランダム順）\nseedRandom(textIndex, true);\nvar start = random(0, 1);           // 0〜1 秒のどこかで開始\nease(time, start, start + 0.4, 100, 0);", lang: "expr" },
        { p: "Range Selector と違って、タイミングを数式で完全に決められるので、文字数が変わっても間隔が一定のままです。オーバーシュートを付けたい場合は、back 系のイージング関数を式の中に自作します。" }
      ],
      bodyEn: [
        { p: "The Expression Selector's Amount takes an expression. `textIndex` (1-based), `textTotal` and `selectorValue` exist only inside this selector. The default is `selectorValue * textIndex/textTotal`. Here is a per-character delay of a fixed number of frames." },
        { code: "// Amount: one frame of delay per character, 100 → 0 over 6 frames each\nvar frames = 1 / thisComp.frameDuration;\nvar delay = 1, dur = 6;\nvar d = textIndex * (delay / frames);\nease(time, d, d + dur / frames, 100, 0);", lang: "expr" },
        { code: "// A fixed random number per character (scatter, random order)\nseedRandom(textIndex, true);\nvar start = random(0, 1);           // start somewhere in 0–1 s\nease(time, start, start + 0.4, 100, 0);", lang: "expr" },
        { p: "Unlike the Range Selector, timing is fully defined by the expression, so the gap stays constant when the character count changes. For overshoot, write a back-style easing function inside the expression yourself." }
      ]
    },
    {
      h: "文字単位の 3D とアンカーポイント",
      hEn: "Per-character 3D and anchor points",
      body: [
        { p: "Animator の Enable Per-character 3D を有効にすると、Position・Anchor・Scale に Z が加わり、X/Y Rotation が使えるようになります（Rotation は Z Rotation に名前が変わります）。文字が奥から飛んでくる、パタパタと裏返るといった演出の土台です。" },
        { list: [
          "Anchor Point Grouping（More Options）：Character / Word / Line / All。回転や拡大の中心をどの単位に置くかを決めます。単語ごとに回すなら Word。",
          "Grouping Alignment：既定では中心がベースライン上にあるので、文字の真ん中で回したいときは縦方向をずらします。目安はすべて大文字なら (0%, −50%)、大小混在なら (0%, −25%)。",
          "Inter-Character Blending：文字が重なったときの合成方法。",
          "Character Offset / Character Value：文字コードをずらす・置き換える。デコーダー演出の核になります。"
        ] }
      ],
      bodyEn: [
        { p: "Turn on Enable Per-character 3D in an Animator and Position, Anchor and Scale gain a Z value, and X/Y Rotation become available (Rotation is renamed Z Rotation). This is the basis for letters flying in from depth or flipping over like a split-flap board." },
        { list: [
          "Anchor Point Grouping (More Options): Character / Word / Line / All. Sets which unit rotation and scaling pivot around. Use Word to rotate word by word.",
          "Grouping Alignment: by default the pivot sits on the baseline, so shift it vertically to rotate around the middle of the letters. As a guide, (0%, −50%) for all caps and (0%, −25%) for mixed case.",
          "Inter-Character Blending: how overlapping characters are composited.",
          "Character Offset / Character Value: shift or replace character codes. The heart of decoder effects."
        ] }
      ]
    },
    {
      h: "Source Text の式",
      hEn: "Source Text expressions",
      body: [
        { p: "Source Text に式を書くと、表示する文字列そのものを時間で変えられます。1 秒あたりの文字数を決めて切り出せばタイプライター、点滅するカーソルを連結すれば入力中の表現になります。" },
        { code: "// 12 文字/秒で増えるタイプライター＋約 1Hz で点滅するカーソル\nvar cps = 12;\nvar n = Math.floor((time - inPoint) * cps);\nvar cursor = Math.floor(time * 2) % 2 ? '|' : '';\ntext.sourceText.substr(0, n) + cursor;", lang: "expr" },
        { p: "Character Value の乱数と組み合わせればスクランブル（デコーダー）、数値を `toFixed()` で整形すればカウントアップも作れます。Source Text のキーフレームは補間されず、ステップで切り替わる点に注意します。" }
      ],
      bodyEn: [
        { p: "An expression on Source Text changes the displayed string itself over time. Slice it by characters per second for a typewriter, and append a blinking cursor for a typing-in-progress look." },
        { code: "// Typewriter at 12 characters/s plus a cursor blinking at about 1 Hz\nvar cps = 12;\nvar n = Math.floor((time - inPoint) * cps);\nvar cursor = Math.floor(time * 2) % 2 ? '|' : '';\ntext.sourceText.substr(0, n) + cursor;", lang: "expr" },
        { p: "Combine it with random Character Values for a scramble (decoder), or format a number with `toFixed()` for a count-up. Note that Source Text keyframes don't interpolate; they switch in steps." }
      ]
    },
    {
      h: "Lottie に書き出すときの注意",
      hEn: "Caveats when exporting to Lottie",
      body: [
        { list: [
          "Range Selector は基本的な設定なら書き出せます（単位、Based On、Shape、Start/End/Offset、Ease、Randomize）。",
          "Expression Selector は書き出せません。キーフレームにベイク（変換）する必要があります。",
          "テキストドキュメント（文字列）のキーフレームはステップで切り替わります。",
          "カスタムフォントはシェイプに変換するか、ランタイム側にフォントを同梱します。日本語フォントは容量が大きいので、シェイプ化か、使う文字だけのサブセットを検討します。",
          "パスに沿ったテキストやエフェクト（Echo など）は再生環境ごとに対応が違うので、実機で確認します。"
        ] },
        { note: "Rive の Text Modifier（Range + Properties、Falloff、Follow Path、可変フォントの軸）は、AE の Range Selector に近い考え方でランタイムでも動きます。インタラクティブにしたい場合の選択肢です。" }
      ],
      bodyEn: [
        { list: [
          "Basic Range Selector settings export (units, Based On, Shape, Start/End/Offset, ease, randomize).",
          "The Expression Selector does not export. Bake it into keyframes first.",
          "Text document (string) keyframes switch in steps.",
          "Convert custom fonts to shapes or ship the font with the runtime. Japanese fonts are large, so consider shapes or a subset containing only the characters you use.",
          "Support for text on a path and effects (such as Echo) varies by player, so test on real devices."
        ] },
        { note: "Rive's Text Modifiers (Range + Properties, Falloff, Follow Path, variable-font axes) work much like AE's Range Selector and run at runtime. They are an option when you want the motion to be interactive." }
      ]
    }
  ],
  related: ["range-soft-wave-reveal", "slide-down-chars", "wiggly-jitter", "typewriter", "char-code-cycle", "flip-up-3d", "raining-characters", "text-along-path"],
  sources: [
    { title: "Adobe: Animating text (After Effects)", url: "https://helpx.adobe.com/after-effects/using/animating-text.html" },
    { title: "After Effects Expression Selector tutorial (DEV)", url: "https://dev.to/kocreative/after-effects-text-animation-and-the-expression-selector-a2l" },
    { title: "After Effects Scripting Guide: text layer match names", url: "https://after-effects-scripting-guide.readthedocs.io/matchnames/layer/textlayer.html" },
    { title: "Workbench: Text Breakup Advanced", url: "https://workbench.tv/blog/2018-04-09_TextBreakupAdvanced/" },
    { title: "ProVideo Coalition: Typewriter effects in After Effects", url: "https://www.provideocoalition.com/typewriter-effects-in-after-effects/" },
    { title: "Adobe: Animate text with presets", url: "https://www.adobe.com/in/learn/after-effects/web/animate-text-presets" },
    { title: "Lottie docs: Text", url: "https://lottiefiles.github.io/lottie-docs/text/" },
    { title: "LottieFiles: After Effects feature compatibility", url: "https://docs.lottiefiles.com/en/integrations/after-effects/09_lottie-compatibility" },
    { title: "Rive: Text modifiers", url: "https://rive.app/docs/editor/text/text-modifiers" }
  ]
},

/* ───────────────────────── 9. Remotion ───────────────────────── */
{
  id: "remotion-video",
  icon: "film",
  title: "Remotion / 動画のテキスト",
  titleEn: "Remotion and text in video",
  lead: "Remotion では、すべての見た目を「いまのフレーム番号」から計算します。文字ごとの interpolate と spring、フォントの計測、文字起こしから作る単語単位の字幕まで、動画用テキストの組み方をまとめます。",
  leadEn: "In Remotion, everything you see is computed from the current frame number. This guide covers per-character interpolate and spring, measuring fonts, and word-level captions built from transcripts.",
  sections: [
    {
      h: "考え方：見た目はフレームの関数",
      hEn: "The model: appearance is a function of the frame",
      body: [
        { p: "Remotion のコンポーネントは `useCurrentFrame()` で現在のフレーム番号を受け取り、そこから位置や不透明度を計算します。状態を積み重ねないので、どのフレームからでも同じ絵が描け、レンダリングを並列化でき、プレビューで自由にシークできます。CSS のアニメーションや `setTimeout` は使わず、すべてフレームから導きます。" },
        { list: [
          "`interpolate(frame, 入力範囲, 出力範囲, { extrapolateLeft, extrapolateRight, easing })` で値を写像します。範囲外は `'clamp'` で止めるのが基本です。",
          "`spring({ frame, fps, config, delay, durationInFrames })` はばねの動きを返します。既定は mass 1・damping 10・stiffness 100 で、約 16% 行き過ぎます。",
          "文字ごとの stagger は、各文字に渡すフレームを `frame - i * stagger` とずらすだけです。"
        ] }
      ],
      bodyEn: [
        { p: "A Remotion component gets the current frame from `useCurrentFrame()` and computes position, opacity and the rest from it. Since nothing accumulates, any frame renders the same picture, rendering can run in parallel and the preview can seek freely. Avoid CSS animations and `setTimeout`; derive everything from the frame." },
        { list: [
          "`interpolate(frame, inputRange, outputRange, { extrapolateLeft, extrapolateRight, easing })` maps values. Clamp outside the range with `'clamp'` as a rule.",
          "`spring({ frame, fps, config, delay, durationInFrames })` returns spring motion. The default is mass 1, damping 10, stiffness 100, which overshoots about 16%.",
          "A per-character stagger is just a matter of offsetting the frame passed to each character: `frame - i * stagger`."
        ] }
      ]
    },
    {
      h: "文字ごとの interpolate と spring",
      hEn: "Per-character interpolate and spring",
      body: [
        { code: "import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';\n\nconst seg = new Intl.Segmenter('ja', { granularity: 'grapheme' });\n\nexport const Title = ({ text }) => {\n  const frame = useCurrentFrame();\n  const { fps } = useVideoConfig();\n  const chars = Array.from(seg.segment(text), s => s.segment);\n  return (\n    <h1 style={{ fontSize: 120, whiteSpace: 'pre' }}>\n      {chars.map((c, i) => {\n        const f = frame - i * 2;                       // 1 文字 2 フレームずつ遅らせる\n        const s = spring({ frame: f, fps, config: { damping: 14 } });\n        const o = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });\n        const y = interpolate(s, [0, 1], [60, 0]);\n        return <span key={i} style={{ display: 'inline-block', opacity: o, transform: `translateY(${y}px)` }}>{c}</span>;\n      })}\n    </h1>\n  );\n};", lang: "jsx" },
        { p: "退場も同じ考え方で、`interpolate(frame, [0, 20, D - 20, D], [0, 1, 1, 0])` のように入場・保持・退場を 1 本の範囲で書けます。保持の区間（20〜D−20）は、タイミングのガイドの保持時間の目安を満たすように取ります。" }
      ],
      bodyEn: [
        { code: "import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';\n\nconst seg = new Intl.Segmenter('en', { granularity: 'grapheme' });\n\nexport const Title = ({ text }) => {\n  const frame = useCurrentFrame();\n  const { fps } = useVideoConfig();\n  const chars = Array.from(seg.segment(text), s => s.segment);\n  return (\n    <h1 style={{ fontSize: 120, whiteSpace: 'pre' }}>\n      {chars.map((c, i) => {\n        const f = frame - i * 2;                       // delay each character by 2 frames\n        const s = spring({ frame: f, fps, config: { damping: 14 } });\n        const o = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });\n        const y = interpolate(s, [0, 1], [60, 0]);\n        return <span key={i} style={{ display: 'inline-block', opacity: o, transform: `translateY(${y}px)` }}>{c}</span>;\n      })}\n    </h1>\n  );\n};", lang: "jsx" },
        { p: "Exits work the same way: `interpolate(frame, [0, 20, D - 20, D], [0, 1, 1, 0])` writes entrance, hold and exit as one range. Make the hold (20 to D−20) long enough to meet the hold-time guidance in the timing guide." }
      ]
    },
    {
      h: "フォントの読み込みと文字の計測",
      hEn: "Loading fonts and measuring text",
      body: [
        { p: "レンダリングは各フレームを別々に描くので、フォントが読み込まれる前のフレームが書き出されると、そのフレームだけ字形が違ってしまいます。`@remotion/google-fonts` の `loadFont()` や `@remotion/fonts` を使えば、読み込みが終わるまでレンダリングを待ちます。" },
        { p: "`@remotion/layout-utils` の `fitText({ text, withinWidth, fontFamily, fontWeight })` は、指定幅に収まるフォントサイズを返します。v5 では `validateFontIsLoaded` が既定で有効なので、フォントを読み込んでから呼びます。長さが変わる字幕やタイトルを、はみ出さずに組むのに使えます。" },
        { code: "import { fitText } from '@remotion/layout-utils';\nconst { fontSize } = fitText({\n  text: title,\n  withinWidth: 1600,\n  fontFamily: 'Noto Sans JP',\n  fontWeight: '900'\n});", lang: "js" }
      ],
      bodyEn: [
        { p: "Rendering draws each frame separately, so any frame rendered before the font loads ends up with different glyphs. `loadFont()` from `@remotion/google-fonts`, or `@remotion/fonts`, holds rendering until loading has finished." },
        { p: "`fitText({ text, withinWidth, fontFamily, fontWeight })` from `@remotion/layout-utils` returns the font size that fits a given width. In v5 `validateFontIsLoaded` is on by default, so call it after the font has loaded. It is handy for laying out subtitles and titles of varying length without overflow." },
        { code: "import { fitText } from '@remotion/layout-utils';\nconst { fontSize } = fitText({\n  text: title,\n  withinWidth: 1600,\n  fontFamily: 'Noto Sans JP',\n  fontWeight: '900'\n});", lang: "js" }
      ]
    },
    {
      h: "字幕：@remotion/captions",
      hEn: "Captions with @remotion/captions",
      body: [
        { p: "`@remotion/captions` の Caption 型は `{ text, startMs, endMs, timestampMs, confidence }` です。`createTikTokStyleCaptions()` はこれを画面ごとのページにまとめ、各ページに単語（トークン）ごとの時間を持たせます。`combineTokensWithinMilliseconds` を小さくするほど 1 画面の語数が減り、1 語ずつに近づきます（例は 1200 ms）。" },
        { code: "import { createTikTokStyleCaptions } from '@remotion/captions';\n\nconst { pages } = createTikTokStyleCaptions({\n  captions,\n  combineTokensWithinMilliseconds: 1200\n});\n\n// ページの開始時刻に置いた <Sequence> の中で\nconst Page = ({ page }) => {\n  const frame = useCurrentFrame();\n  const { fps } = useVideoConfig();\n  const t = page.startMs + (frame / fps) * 1000;\n  return (\n    <div style={{ whiteSpace: 'pre' }}>\n      {page.tokens.map(tk => {\n        const on = tk.fromMs <= t && t < tk.toMs;      // いま話している語\n        return <span key={tk.fromMs} style={{ color: on ? '#FFD400' : '#fff' }}>{tk.text}</span>;\n      })}\n    </div>\n  );\n};", lang: "jsx" },
        { note: "トークンの text は先頭に空白を含むことがあるので、コンテナは `white-space: pre` にします。そうしないと語間の空白が詰まります。" }
      ],
      bodyEn: [
        { p: "The Caption type in `@remotion/captions` is `{ text, startMs, endMs, timestampMs, confidence }`. `createTikTokStyleCaptions()` groups captions into screen-sized pages, each with per-word (token) timings. The smaller `combineTokensWithinMilliseconds` is, the fewer words per page, down to one word at a time (the example uses 1200 ms)." },
        { code: "import { createTikTokStyleCaptions } from '@remotion/captions';\n\nconst { pages } = createTikTokStyleCaptions({\n  captions,\n  combineTokensWithinMilliseconds: 1200\n});\n\n// Inside a <Sequence> placed at the page's start time\nconst Page = ({ page }) => {\n  const frame = useCurrentFrame();\n  const { fps } = useVideoConfig();\n  const t = page.startMs + (frame / fps) * 1000;\n  return (\n    <div style={{ whiteSpace: 'pre' }}>\n      {page.tokens.map(tk => {\n        const on = tk.fromMs <= t && t < tk.toMs;      // the word being spoken now\n        return <span key={tk.fromMs} style={{ color: on ? '#FFD400' : '#fff' }}>{tk.text}</span>;\n      })}\n    </div>\n  );\n};", lang: "jsx" },
        { note: "Token text can include a leading space, so set the container to `white-space: pre`. Otherwise the spaces between words collapse." }
      ]
    },
    {
      h: "文字起こしから語のタイミングを得る",
      hEn: "Getting word timings from a transcript",
      body: [
        { p: "語ごとのタイミングは、音声認識の結果から作ります。Remotion には whisper.cpp を使う `@remotion/install-whisper-cpp`（`transcribe()` の結果を `toCaptions()` で Caption の配列に変換）や、OpenAI の Whisper API の結果を変換するパッケージがあります。語単位のタイムスタンプを有効にして書き起こします。" },
        { list: [
          "日本語は空白で区切られないので、認識結果のトークンが語の途中で切れていることがあります。短いトークンは前後と結合し、文節に近い単位にまとめてから表示します。",
          "認識結果の時刻は、話し始めより少し遅れがちです。表示を数十 ms 早めると、声と文字が揃って見えます。",
          "字幕の基準（最短表示時間、字幕間 2 フレームのギャップ、1 秒あたりの文字数）を満たすように、ページの長さと分け方を調整します。",
          "ショート動画の強調字幕（1 画面 1〜3 語、要点の語を色で強調、ポップは 100〜200 ms）は慣習値です。読みやすさを優先して調整します。"
        ] }
      ],
      bodyEn: [
        { p: "Per-word timings come from speech recognition. Remotion offers `@remotion/install-whisper-cpp`, which uses whisper.cpp (`toCaptions()` turns the `transcribe()` result into a Caption array), and a package that converts results from OpenAI's Whisper API. Transcribe with word-level timestamps turned on." },
        { list: [
          "Japanese isn't separated by spaces, so recognised tokens may split a word in the middle. Merge short tokens with their neighbours into phrase-like units before displaying them.",
          "Recognised timestamps tend to lag the start of speech slightly. Showing text a few tens of milliseconds early makes voice and text look in sync.",
          "Adjust page length and grouping to meet subtitle standards (minimum duration, a two-frame gap between subtitles, characters per second).",
          "Short-form emphasis captions (one to three words per screen, key words coloured, 100–200 ms pops) are conventions. Tune them for readability first."
        ] }
      ]
    },
    {
      h: "書き出しの注意",
      hEn: "Rendering caveats",
      body: [
        { list: [
          "一定速度で流れるテキスト（クレジットロール、ティッカー）は、1 フレームあたり整数 px で動かします。",
          "動画のブラーは自動では付きません。速い文字の動きには `@remotion/motion-blur` を使うか、動き自体を遅くします。",
          "細い文字や彩度の高い色の小さな文字は、動画圧縮（クロマサブサンプリング）でにじみやすくなります。字幕やテロップには縁取りか影を付けます。",
          "乱数は `random(seed)` のようにシード付きで使います。`Math.random()` はフレームごとに値が変わり、レンダリングのたびに結果が変わります。"
        ] }
      ],
      bodyEn: [
        { list: [
          "Move constant-speed text (credit rolls, tickers) a whole number of pixels per frame.",
          "Video gets no motion blur automatically. Use `@remotion/motion-blur` for fast-moving text, or slow the motion down.",
          "Thin strokes and small text in saturated colours bleed under video compression (chroma subsampling). Give subtitles and telops an outline or shadow.",
          "Use seeded randomness such as `random(seed)`. `Math.random()` changes every frame and gives different results on every render."
        ] }
      ]
    }
  ],
  related: ["hormozi-caption", "word-highlight-caption", "highlight-pill", "karaoke-fill", "caption-spring-pop", "fit-text-title", "pop-on-subtitle", "credits-roll"],
  sources: [
    { title: "Remotion: spring()", url: "https://www.remotion.dev/docs/spring" },
    { title: "Remotion: interpolate()", url: "https://www.remotion.dev/docs/interpolate" },
    { title: "Remotion: @remotion/captions", url: "https://www.remotion.dev/docs/captions/" },
    { title: "Remotion: createTikTokStyleCaptions()", url: "https://www.remotion.dev/docs/captions/create-tiktok-style-captions" },
    { title: "Remotion: fitText()", url: "https://www.remotion.dev/docs/layout-utils/fit-text" },
    { title: "Netflix: Subtitle Timing Guidelines", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/360051554394-Timed-Text-Style-Guide-Subtitle-Timing-Guidelines" },
    { title: "SendShort: Hormozi-style captions", url: "https://sendshort.ai/guides/hormozi-captions/" },
    { title: "Larry Jordan: Create a smooth credit roll", url: "https://larryjordan.com/articles/create-a-smooth-credit-roll/" }
  ]
},

/* ───────────────────────── 10. Canvas / WebGL / SVG ───────────────────────── */
{
  id: "canvas-webgl-svg",
  icon: "cpu",
  title: "Canvas / WebGL / SVG",
  titleEn: "Canvas, WebGL and SVG",
  lead: "パーティクル、パスに沿う文字、線で描く文字、シェーダの歪みは、DOM の外で描く方が向いています。このサイトのデモも Canvas で描いています。時間の関数として描く方法、SVG の textPath と線描、WebGL の SDF 文字、そして DOM を離れるときの注意をまとめます。",
  leadEn: "Particles, text on a path, stroke-drawn letters and shader distortion are better drawn outside the DOM. The demos on this site are drawn with Canvas too. This guide covers drawing as a function of time, SVG textPath and stroke drawing, SDF text in WebGL, and what to watch for when you leave the DOM.",
  sections: [
    {
      h: "DOM の外で描くべきとき",
      hEn: "When to draw outside the DOM",
      body: [
        { table: { head: ["手段", "向いている演出", "弱点"], rows: [
          ["DOM + CSS", "見出し・本文の登場、マスク、色", "要素数が多いと重い。ピクセル単位の効果は苦手"],
          ["SVG", "パスに沿う文字、線で描く文字、フィルタでのうねり・グーイー", "フィルタは重い。複雑な文章の組版は苦手"],
          ["Canvas 2D", "パーティクル、文字の大量複製、ピクセルの歪み、時間の関数で描くデモ", "組版・改行・読み上げを自分で扱う"],
          ["WebGL / WebGPU", "3D、数千文字、シェーダの歪み、物理", "文字の描画に SDF などの準備が要る。実装が重い"]
        ] } }
      ],
      bodyEn: [
        { table: { head: ["Medium", "Good for", "Weak spots"], rows: [
          ["DOM + CSS", "Headline and body entrances, masks, colour", "Heavy with many elements. Poor at per-pixel effects"],
          ["SVG", "Text on a path, stroke-drawn letters, filter wobbles and gooey effects", "Filters are expensive. Poor at laying out long text"],
          ["Canvas 2D", "Particles, mass duplication of text, pixel distortion, demos drawn as a function of time", "You handle layout, line breaking and screen readers yourself"],
          ["WebGL / WebGPU", "3D, thousands of glyphs, shader distortion, physics", "Text needs preparation such as SDF. Heavy to implement"]
        ] } }
      ]
    },
    {
      h: "Canvas で文字を組む",
      hEn: "Laying out text in Canvas",
      body: [
        { p: "Canvas には改行も組版も無いので、`measureText()` で文字の幅を測って自分で並べます。書記素ごとに分けて幅を足していけば、各文字の位置が求まります。高解像度の画面では `devicePixelRatio` を掛けてキャンバスを大きくし、フォントの読み込みを待ってから測ります。" },
        { code: "await document.fonts.ready;\nconst dpr = Math.min(2, devicePixelRatio || 1);\ncanvas.width = canvas.clientWidth * dpr;\ncanvas.height = canvas.clientHeight * dpr;\nctx.scale(dpr, dpr);\n\nctx.font = \"800 64px Inter, 'Noto Sans JP', sans-serif\";\nconst seg = new Intl.Segmenter('ja', { granularity: 'grapheme' });\nlet x = 0;\nconst glyphs = Array.from(seg.segment(text), ({ segment }) => {\n  const w = ctx.measureText(segment).width;\n  const g = { ch: segment, x, w };\n  x += w;\n  return g;\n});\nconst m = ctx.measureText(text);\nconst ascent = m.actualBoundingBoxAscent; // 縦位置の調整に使う", lang: "js" },
        { p: "1 文字ずつ測って足すとカーニングが無視されるので、文字列全体の幅（`measureText(text).width`）と合計がずれます。気になる場合は、先頭から i 文字目までの部分文字列の幅を測って位置にすると、カーニング込みの位置になります。" }
      ],
      bodyEn: [
        { p: "Canvas has no line breaking or layout, so measure characters with `measureText()` and position them yourself. Split into graphemes and accumulate widths to get each character's position. On high-density screens, enlarge the canvas by `devicePixelRatio`, and measure only after fonts have loaded." },
        { code: "await document.fonts.ready;\nconst dpr = Math.min(2, devicePixelRatio || 1);\ncanvas.width = canvas.clientWidth * dpr;\ncanvas.height = canvas.clientHeight * dpr;\nctx.scale(dpr, dpr);\n\nctx.font = \"800 64px Inter, 'Noto Sans JP', sans-serif\";\nconst seg = new Intl.Segmenter('en', { granularity: 'grapheme' });\nlet x = 0;\nconst glyphs = Array.from(seg.segment(text), ({ segment }) => {\n  const w = ctx.measureText(segment).width;\n  const g = { ch: segment, x, w };\n  x += w;\n  return g;\n});\nconst m = ctx.measureText(text);\nconst ascent = m.actualBoundingBoxAscent; // use for vertical alignment", lang: "js" },
        { p: "Measuring one character at a time ignores kerning, so the sum drifts from the width of the whole string (`measureText(text).width`). If that matters, use the width of the substring up to the i-th character as its position; that includes kerning." }
      ]
    },
    {
      h: "時間の関数として描く（このサイトの方式）",
      hEn: "Drawing as a function of time (this site's approach)",
      body: [
        { p: "このサイトのデモは、すべて「時刻 t の純粋な関数」として描いています。前のフレームの状態を持たず、文字の位置や不透明度を毎フレーム t から計算します。乱数も文字番号から作る決まった値（ハッシュ）なので、同じ t なら必ず同じ絵になります。" },
        { code: "// demo.f(g, t, o)：t 秒の時点の絵を描く。状態を持たない\nfunction draw(g, t, glyphs) {\n  glyphs.forEach((gl, i) => {\n    const p = clamp01((t - 0.3 - i * 0.04) / 0.6);   // 文字ごとの進み具合\n    const e = 1 - Math.pow(1 - p, 4);                  // outQuart\n    const r = hash(i);                                  // 文字番号から決まる乱数\n    g.globalAlpha = e;\n    g.fillText(gl.ch, gl.x, 100 + (1 - e) * (40 + r * 20));\n  });\n}\n\n// 再生：経過時間を t に。一時停止やシークは t を止めたり変えたりするだけ\nconst t = reduce ? demo.still : ((now - start) / 1000) % demo.dur;", lang: "js" },
        { list: [
          "一時停止・コマ送り・スクラブ（任意の時刻へのシーク）が、t を変えるだけで実現できます。",
          "視差効果を減らす設定では、文字が完全に読める時刻（`still`）の 1 フレームを静止画として表示できます。",
          "動画への書き出しも、t を 1/fps ずつ進めて描けば済みます。Remotion の「フレームの関数」と同じ考え方です。",
          "物理シミュレーションのように状態が要る動きは、閉じた式（ばねの解析解など）で書き直すと t の関数にできます。"
        ] }
      ],
      bodyEn: [
        { p: "Every demo on this site is drawn as a pure function of time t. Nothing is carried over from the previous frame: each character's position and opacity are computed from t every frame. Even the randomness is a fixed value (a hash) derived from the character index, so the same t always produces the same picture." },
        { code: "// demo.f(g, t, o): draw the picture at time t. No state\nfunction draw(g, t, glyphs) {\n  glyphs.forEach((gl, i) => {\n    const p = clamp01((t - 0.3 - i * 0.04) / 0.6);   // per-character progress\n    const e = 1 - Math.pow(1 - p, 4);                  // outQuart\n    const r = hash(i);                                  // randomness fixed by index\n    g.globalAlpha = e;\n    g.fillText(gl.ch, gl.x, 100 + (1 - e) * (40 + r * 20));\n  });\n}\n\n// Playback: elapsed time becomes t. Pausing or seeking just holds or changes t\nconst t = reduce ? demo.still : ((now - start) / 1000) % demo.dur;", lang: "js" },
        { list: [
          "Pause, frame stepping and scrubbing (seeking to any time) all come down to changing t.",
          "Under reduced motion, a single frame at a time when the text is fully readable (`still`) can be shown as a still image.",
          "Exporting to video is just drawing with t advanced by 1/fps each frame. It is the same idea as Remotion's function of the frame.",
          "Motion that seems to need state, such as physics, can often be rewritten in closed form (an analytic spring solution, for example) to become a function of t."
        ] }
      ]
    },
    {
      h: "SVG：textPath と線で描く文字",
      hEn: "SVG: textPath and stroke-drawn text",
      body: [
        { p: "`<textPath>` で文字をパスに沿わせ、`startOffset` を動かすとパスの上を流れます。線で描く表現は、`pathLength=\"1\"` を付けたパスの `stroke-dashoffset` を 1 → 0 にします。" },
        { code: "<svg viewBox=\"0 0 600 200\">\n  <path id=\"curve\" d=\"M20 150 Q300 0 580 150\" fill=\"none\" />\n  <text font-size=\"40\">\n    <textPath href=\"#curve\" startOffset=\"0%\">\n      パスに沿って流れる文字\n      <animate attributeName=\"startOffset\" from=\"-60%\" to=\"100%\" dur=\"6s\" repeatCount=\"indefinite\" />\n    </textPath>\n  </text>\n  <path class=\"stroke\" pathLength=\"1\" d=\"M40 180 C200 120 400 220 560 160\" />\n</svg>\n\n<style>\n.stroke { fill: none; stroke: currentColor; stroke-width: 4;\n  stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.5s ease-out forwards; }\n@keyframes draw { to { stroke-dashoffset: 0; } }\n</style>", lang: "html" },
        { list: [
          "SVG の `<text>` にも dasharray は効きますが、輪郭の始点や順序はフォント次第で、手書きの順にはなりません。手書きに見せるには、文字をアウトライン化したパスか、単線フォントを使います。",
          "漢字の書き順には KanjiVG（1 画 1 パス、書き順どおり、CC BY-SA 3.0）が使えます。各画の長さに比例した時間を割り当て、画と画の間に 50〜150 ms の間を置くと自然です（慣習値）。",
          "`feTurbulence` と `feDisplacementMap` で文字をうねらせ、`feColorMatrix` で alpha を閾値化すると、ぼかした 2 枚がくっつくグーイーなモーフになります。どちらも重いので、範囲を小さく保ちます。"
        ] }
      ],
      bodyEn: [
        { p: "`<textPath>` runs text along a path, and animating `startOffset` makes it flow along the path. For stroke drawing, give the path `pathLength=\"1\"` and take `stroke-dashoffset` from 1 to 0." },
        { code: "<svg viewBox=\"0 0 600 200\">\n  <path id=\"curve\" d=\"M20 150 Q300 0 580 150\" fill=\"none\" />\n  <text font-size=\"40\">\n    <textPath href=\"#curve\" startOffset=\"0%\">\n      Text flowing along a path\n      <animate attributeName=\"startOffset\" from=\"-60%\" to=\"100%\" dur=\"6s\" repeatCount=\"indefinite\" />\n    </textPath>\n  </text>\n  <path class=\"stroke\" pathLength=\"1\" d=\"M40 180 C200 120 400 220 560 160\" />\n</svg>\n\n<style>\n.stroke { fill: none; stroke: currentColor; stroke-width: 4;\n  stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.5s ease-out forwards; }\n@keyframes draw { to { stroke-dashoffset: 0; } }\n</style>", lang: "html" },
        { list: [
          "Dasharray also works on SVG `<text>`, but where each outline starts and in what order depends on the font, not on handwriting order. To look handwritten, use outlined paths or a single-line font.",
          "For kanji stroke order, use KanjiVG (one path per stroke, in stroke order, CC BY-SA 3.0). Giving each stroke time proportional to its length, with 50–150 ms between strokes, looks natural (convention values).",
          "`feTurbulence` with `feDisplacementMap` makes text wobble, and thresholding alpha with `feColorMatrix` makes two blurred layers merge into a gooey morph. Both are expensive, so keep the affected area small."
        ] }
      ]
    },
    {
      h: "WebGL：SDF / MSDF 文字とシェーダの歪み",
      hEn: "WebGL: SDF/MSDF text and shader distortion",
      body: [
        { p: "WebGL で文字を拡大・回転しても滑らかに描くには、符号付き距離場（SDF）や、角がつぶれにくい多チャンネル版（MSDF）のテクスチャを使います。troika-three-text は SDF をその場で生成し、フォントの解析・SDF 生成・組版を Web Worker で行います。カーニング・合字・双方向テキストに対応し、`curveRadius` で円筒状に曲げたり、`outlineWidth` で縁取りしたりできます（woff2 は非対応）。" },
        { list: [
          "頂点シェーダで文字を歪ませる場合は、troika の `glyphGeometryDetail` を上げて頂点を増やします。",
          "文字を PNG テクスチャとして細かく分割した平面に貼り、ポインタの位置から頂点を持ち上げる方法もあります（Codrops の例は 100×100 分割、影響範囲の外側をイーズで減衰）。",
          "日本語は文字数が多く、MSDF のアトラスを事前に作ると巨大になります。使う文字だけのサブセットにするか、troika のようにその場で生成する方式を選びます。"
        ] }
      ],
      bodyEn: [
        { p: "To keep text smooth when scaled or rotated in WebGL, use signed distance field (SDF) textures, or the multi-channel variant (MSDF), which keeps corners sharp. troika-three-text generates SDFs on the fly, doing font parsing, SDF generation and layout in a Web Worker. It supports kerning, ligatures and bidirectional text, bends text into a cylinder with `curveRadius` and outlines it with `outlineWidth` (woff2 isn't supported)." },
        { list: [
          "If you distort glyphs in a vertex shader, raise troika's `glyphGeometryDetail` to add vertices.",
          "Another approach is to put text on a finely subdivided plane as a PNG texture and lift vertices around the pointer (the Codrops example uses 100×100 segments, easing the falloff at the edge of the radius).",
          "Japanese has so many characters that a pre-built MSDF atlas becomes huge. Subset to the characters you use, or generate glyphs on the fly as troika does."
        ] }
      ]
    },
    {
      h: "DOM を離れるときの注意",
      hEn: "What to watch when leaving the DOM",
      body: [
        { list: [
          "読み上げ：Canvas・WebGL の文字は支援技術に届きません。DOM に原文を置き（見出しなら見出し要素で）、canvas は `aria-hidden=\"true\"` にします。",
          "選択・検索・翻訳：ブラウザの文字選択、ページ内検索、自動翻訳も効きません。重要な文章は DOM に残します。",
          "停止：画面外に出たら IntersectionObserver で描画を止め、タブが非表示なら requestAnimationFrame が止まることを前提にします。",
          "解像度：`devicePixelRatio` に合わせますが、上限（2 程度）を設けて描画量を抑えます。",
          "視差効果を減らす設定：時間の関数で描いていれば、静止した 1 フレームを描くだけで対応できます。"
        ] }
      ],
      bodyEn: [
        { list: [
          "Screen readers: Canvas and WebGL text never reaches assistive technology. Put the original text in the DOM (in a heading element if it is a heading) and mark the canvas `aria-hidden=\"true\"`.",
          "Selection, search and translation: browser text selection, find-in-page and automatic translation don't work either. Keep important text in the DOM.",
          "Stopping: halt drawing with IntersectionObserver when off screen, and assume requestAnimationFrame stops in hidden tabs.",
          "Resolution: match `devicePixelRatio`, but cap it (around 2) to limit drawing cost.",
          "Reduced motion: if you draw as a function of time, supporting it is just a matter of drawing one still frame."
        ] }
      ]
    }
  ],
  related: ["particle-text", "text-along-path", "circular-text-spin", "outline-draw", "handwriting", "kanji-stroke-order", "fuzzy-text", "lens-bulge"],
  sources: [
    { title: "MDN: CanvasRenderingContext2D.measureText()", url: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText" },
    { title: "MDN: <textPath>", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/textPath" },
    { title: "MDN: stroke-dashoffset", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset" },
    { title: "KanjiVG", url: "https://kanjivg.tagaini.net/" },
    { title: "troika-three-text", url: "https://protectwise.github.io/troika/troika-three-text/" },
    { title: "Codrops: Animating Letters with Shaders", url: "https://tympanus.net/codrops/2025/03/24/animating-letters-with-shaders-interactive-text-effect-with-three-js-glsl/" },
    { title: "Codrops: Interactive Text Destruction with Three.js, WebGPU and TSL", url: "https://tympanus.net/codrops/2025/07/22/interactive-text-destruction-with-three-js-webgpu-and-tsl/" },
    { title: "React Bits (FuzzyText, CurvedLoop source)", url: "https://github.com/DavidHDev/react-bits" }
  ]
},

/* ───────────────────────── 11. チェックリスト ───────────────────────── */
{
  id: "checklist",
  icon: "check",
  title: "制作チェックリスト",
  titleEn: "Pre-ship checklist",
  lead: "テキストモーションを公開する前に確認したい項目を、組版・読みやすさ・アクセシビリティ・性能・多言語・映像書き出しに分けてまとめました。",
  leadEn: "A list of things to check before you ship text motion, grouped into typesetting, readability, accessibility, performance, localisation and video output.",
  sections: [
    {
      h: "フォントと組版",
      hEn: "Fonts and typesetting",
      body: [
        { list: [
          "フォントの読み込み（`document.fonts.ready`）を待ってから分割・計測している。",
          "読み込み前に分割前のテキストが一瞬見えない（`visibility: hidden` から戻している）。",
          "幅の変化（回転・リサイズ・ズーム）で行を再分割している。",
          "絵文字・結合文字・国旗が 1 文字として扱われている（`Intl.Segmenter`）。",
          "分割した状態でも、カーニング・合字・和欧の空き・約物の詰めが大きく崩れていない。",
          "日本語の改行が文節単位で、行頭禁則が守られている。"
        ] }
      ],
      bodyEn: [
        { list: [
          "Splitting and measuring wait for fonts to load (`document.fonts.ready`).",
          "The unsplit text doesn't flash before the entrance (it starts at `visibility: hidden`).",
          "Lines are re-split when the width changes (rotation, resize, zoom).",
          "Emoji, combining characters and flags count as one character (`Intl.Segmenter`).",
          "Kerning, ligatures, Japanese–Latin spacing and punctuation spacing still look right after splitting.",
          "Japanese lines break at phrase boundaries and respect kinsoku rules."
        ] }
      ]
    },
    {
      h: "読みやすさとタイミング",
      hEn: "Readability and timing",
      body: [
        { list: [
          "stagger の総時間（`長さ + (要素数 − 1) × 間隔`）が、最長の文でも長すぎない。",
          "文字が完全に読める状態で、十分な時間止まっている（遅い読み手が 2 回読める長さ、日本語は 1 秒 4 文字が目安）。",
          "字幕の文字数・表示時間・ギャップが基準を満たしている（日本語 4 文字/秒・横 13 文字、英語 20 cps、最短 5/6 秒、最長 7 秒、ギャップ 2 フレーム）。",
          "オーバーシュートが文字の読みを妨げない範囲に収まっている。",
          "ループするデモは「静止 → 動き → 読める保持 → きれいなリセット」の順になっている。",
          "最終状態のコントラストが基準（4.5:1、大きな文字は 3:1）を満たしている。"
        ] }
      ],
      bodyEn: [
        { list: [
          "The total stagger time (`duration + (count − 1) × gap`) isn't too long even for the longest copy.",
          "Text holds still and fully readable long enough (long enough for a slow reader to read twice; four characters per second for Japanese).",
          "Subtitles meet line-length, duration and gap standards (Japanese 4 characters/s and 13 per horizontal line, English 20 cps, minimum 5/6 s, maximum 7 s, two-frame gaps).",
          "Overshoot stays within limits that don't hurt legibility.",
          "Looping demos follow rest, motion, readable hold, clean reset.",
          "The final state meets contrast requirements (4.5:1, or 3:1 for large text)."
        ] }
      ]
    },
    {
      h: "アクセシビリティ",
      hEn: "Accessibility",
      body: [
        { list: [
          "スクリーンリーダーで原文が 1 回だけ、正しく読まれる（隠した原文 + `aria-hidden` の分割コピー、または名前を持てる要素の `aria-label`）。実際のスクリーンリーダーで確認した。",
          "アニメーション後に分割を元に戻している（`revert()`）、または元に戻さなくても問題ない理由がある。",
          "視差効果を減らす設定で、移動・拡大・揺れ・スクランブルが静止画かクロスフェードに置き換わる。設定の途中変更にも追従する。",
          "1 秒に 3 回を超える点滅が無い。",
          "5 秒より長く自動で動き続けるものに、一時停止の手段がある。",
          "Canvas・WebGL の文字には DOM の原文がある。"
        ] }
      ],
      bodyEn: [
        { list: [
          "Screen readers read the original text once and correctly (hidden original plus an `aria-hidden` split copy, or `aria-label` on an element that can be named). Verified with real screen readers.",
          "The split is undone after the animation (`revert()`), or there is a reason it doesn't need to be.",
          "Under reduced motion, movement, scaling, shaking and scrambling become a still or a crossfade, and changes to the setting mid-session are followed.",
          "Nothing flashes more than three times per second.",
          "Anything that moves automatically for more than five seconds can be paused.",
          "Canvas and WebGL text has the original text in the DOM."
        ] }
      ]
    },
    {
      h: "性能",
      hEn: "Performance",
      body: [
        { list: [
          "動かしているのは主に `transform` と `opacity`。",
          "文字ごとのブラー・可変フォントの軸・`clip-path` は、対象の数を抑えている。",
          "長文は文字ではなく単語か行で分割している。",
          "`will-change` はアニメーション中だけ付けている。",
          "画面外のアニメーションは止まっている（IntersectionObserver）。",
          "低性能の端末（古いスマートフォン）で実際に再生して、フレーム落ちが無いことを確認した。"
        ] }
      ],
      bodyEn: [
        { list: [
          "Mostly `transform` and `opacity` are animated.",
          "Per-character blur, variable-font axes and `clip-path` are limited to a few elements.",
          "Long text is split by word or line, not by character.",
          "`will-change` is applied only while animating.",
          "Off-screen animation is stopped (IntersectionObserver).",
          "Played back on a low-end device (an older phone) without dropped frames."
        ] }
      ]
    },
    {
      h: "多言語・ローカライズ",
      hEn: "Localisation",
      body: [
        { list: [
          "翻訳で長さが変わっても成り立つ（ドイツ語などは英語より 3 割ほど長くなりがち、日本語は文字数が減る代わりに 1 文字が広い）。最も長い言語で確認した。",
          "文字数に比例して総時間が伸びすぎないよう、stagger を全体の時間で割り振っている。",
          "空白の無い言語（日本語・中国語・タイ語）の区切りを、空白で分ける前提にしていない。",
          "アラビア文字やインド系文字を文字単位に分割していない（連結・結合が崩れる）。右から左の言語では、動きの向きも反転させている。",
          "文字を画像や動画に焼き込まず、テキストとして差し替えられるようにしている。"
        ] }
      ],
      bodyEn: [
        { list: [
          "The design survives length changes in translation (German and similar languages often run about 30% longer than English; Japanese uses fewer characters but each is wider). Checked with the longest language.",
          "The stagger is divided from a total time, so overall duration doesn't balloon with character count.",
          "Segmentation doesn't assume spaces for languages without them (Japanese, Chinese, Thai).",
          "Arabic and Indic scripts aren't split into characters (joining and conjuncts would break), and motion direction is mirrored for right-to-left languages.",
          "Text isn't baked into images or video, so it can be replaced as text."
        ] }
      ]
    },
    {
      h: "映像に書き出す場合",
      hEn: "When rendering to video",
      body: [
        { list: [
          "書き出しの全フレームでフォントが読み込まれている。",
          "一定速度で流れる文字は 1 フレームあたり整数 px で動いている。",
          "細い文字・明朝体・彩度の高い小さな文字が、圧縮後にちらつき・にじみを起こしていない（縁取りや影を付けた）。",
          "字幕の位置が画面上の文字と重ならない（重なる場合は縦書きや位置の変更）。",
          "乱数はシード付きで、何度書き出しても同じ結果になる。"
        ] }
      ],
      bodyEn: [
        { list: [
          "Fonts are loaded in every rendered frame.",
          "Constant-speed text moves a whole number of pixels per frame.",
          "Thin strokes, Mincho faces and small saturated text don't flicker or bleed after compression (outlines or shadows added).",
          "Subtitles don't overlap on-screen text (switch to vertical or reposition when they would).",
          "Randomness is seeded, so every render gives the same result."
        ] }
      ]
    }
  ],
  related: ["fade-up-chars", "line-mask-rise", "balanced-reflow", "fit-text-title", "jp-subtitle-timing", "emoji-grapheme-pop", "credits-roll"],
  sources: [
    { title: "GSAP SplitText docs", url: "https://gsap.com/docs/v3/Plugins/SplitText/" },
    { title: "Adrian Roselli: You Know What? Just Don't Split Words into Letters (2026)", url: "https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html" },
    { title: "MDN: prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" },
    { title: "W3C: Understanding SC 2.2.2 Pause, Stop, Hide", url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html" },
    { title: "W3C: Understanding SC 2.3.1 Three Flashes or Below Threshold", url: "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html" },
    { title: "Netflix: Japanese Timed Text Style Guide", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/215767517-Japanese-Timed-Text-Style-Guide" },
    { title: "Netflix: English (USA) Timed Text Style Guide", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide" },
    { title: "Larry Jordan: Create a smooth credit roll", url: "https://larryjordan.com/articles/create-a-smooth-credit-roll/" }
  ]
},

/* ───────────────────────── 12. 用語集 ───────────────────────── */
{
  id: "glossary",
  icon: "book",
  title: "用語集",
  titleEn: "Glossary",
  lead: "このサイトで使う組版・モーション・字幕の用語を短く説明します。",
  leadEn: "Short definitions of the typesetting, motion and subtitling terms used on this site.",
  sections: [
    {
      h: "組版の用語",
      hEn: "Typesetting terms",
      body: [
        { table: { head: ["用語", "意味"], rows: [
          ["トラッキング（字間）", "文字列全体の字間を一律に広げる・詰めること。CSS では `letter-spacing`。広げながら出すと「トラッキング・イン」"],
          ["カーニング", "特定の文字の組み合わせ（AV、To など）の間隔を個別に調整すること。文字ごとに分割すると失われる"],
          ["リーディング（行送り）", "行と行の間隔。CSS では `line-height`"],
          ["ベースライン", "欧文の文字が乗る基準線。和文は仮想ボディの下端や中央を基準にするため、和欧混植でずれやすい"],
          ["合字（リガチャ）", "fi、ffi のように複数の文字を 1 つの字形にまとめたもの"],
          ["書記素", "見た目の 1 文字。絵文字や結合文字は複数のコードポイントで 1 書記素になる"],
          ["可変フォント", "太さ（wght）・幅（wdth）・傾き（slnt）などの軸を連続的に変えられるフォント"],
          ["和欧混植", "和文と欧文を同じ行に組むこと。書体の選び方とベースラインの調整が要る"]
        ] } }
      ],
      bodyEn: [
        { table: { head: ["Term", "Meaning"], rows: [
          ["Tracking", "Uniformly widening or tightening spacing across a run of text. `letter-spacing` in CSS. Entering while spacing changes is a tracking-in"],
          ["Kerning", "Adjusting the space between specific character pairs (AV, To). Lost when text is split into characters"],
          ["Leading", "The distance between lines. `line-height` in CSS"],
          ["Baseline", "The line Latin letters sit on. Japanese uses the bottom or centre of the em box, so baselines drift in mixed Japanese–Latin text"],
          ["Ligature", "Several characters merged into one glyph, such as fi or ffi"],
          ["Grapheme", "One visible character. Emoji and combining sequences are one grapheme made of several code points"],
          ["Variable font", "A font whose axes, such as weight (wght), width (wdth) and slant (slnt), vary continuously"],
          ["Mixed Japanese–Latin setting (wa-ou konshoku)", "Setting Japanese and Latin text on the same line; needs careful typeface pairing and baseline alignment"]
        ] } }
      ]
    },
    {
      h: "モーションの用語",
      hEn: "Motion terms",
      body: [
        { table: { head: ["用語", "意味"], rows: [
          ["スタッガー（stagger）", "複数の要素を少しずつ時間をずらして動かすこと。間隔と順序（先頭・中央・末尾・ランダム）で印象が変わる"],
          ["イージング", "時間に対する進み方の曲線。ease-out は減速、ease-in は加速"],
          ["オーバーシュート", "目標値を行き過ぎてから戻る動き。back、elastic、減衰比の小さいスプリングで生じる"],
          ["スプリング", "質量・剛性・減衰で決まるばねの動き。減衰比 ζ が 1 未満だと弾む"],
          ["マスク / クリップ", "見える範囲を限定すること。行マスクは `overflow: clip` で作る"],
          ["スクラブ", "スクロール量やタイムラインの位置に、アニメーションの進みを直接結び付けること"],
          ["Range Selector", "After Effects のテキストアニメーターで、効果を適用する文字の範囲と強さの分布を決めるセレクター"],
          ["Wiggly Selector", "After Effects で、文字ごとにランダムに揺れる値を作るセレクター"],
          ["seek(t) 方式", "絵を時刻 t の純粋な関数として描く方式。一時停止・スクラブ・静止画が容易になる"]
        ] } }
      ],
      bodyEn: [
        { table: { head: ["Term", "Meaning"], rows: [
          ["Stagger", "Starting several elements one after another with a small time offset. The gap and order (start, centre, end, random) shape the feel"],
          ["Easing", "The curve of progress over time. Ease-out decelerates, ease-in accelerates"],
          ["Overshoot", "Going past the target and coming back. Produced by back, elastic and lightly damped springs"],
          ["Spring", "Motion defined by mass, stiffness and damping. It bounces when the damping ratio ζ is below 1"],
          ["Mask / clip", "Limiting the visible area. A line mask is made with `overflow: clip`"],
          ["Scrub", "Tying animation progress directly to scroll distance or timeline position"],
          ["Range Selector", "The After Effects text-animator selector that sets which characters an effect applies to and how strongly"],
          ["Wiggly Selector", "The After Effects selector that produces randomly wobbling values per character"],
          ["seek(t) approach", "Drawing the picture as a pure function of time t, which makes pausing, scrubbing and stills easy"]
        ] } }
      ]
    },
    {
      h: "字幕と日本語の用語",
      hEn: "Subtitle and Japanese terms",
      body: [
        { table: { head: ["用語", "意味"], rows: [
          ["CPS", "Characters Per Second。字幕の 1 秒あたりの文字数。Netflix の英語は成人 20、子供 17"],
          ["SDH", "聴覚障害者向け字幕。話者名や効果音も含むため、許される文字数が多い"],
          ["ポップオン / ペイントオン / ロールアップ", "字幕の表示方式。1 枚ずつ一括表示 / 文字が順に現れる / 行が下から積み上がる"],
          ["RSVP", "Rapid Serial Visual Presentation。同じ位置に 1 語ずつ高速に表示する方式"],
          ["文節", "日本語で、意味を壊さずに区切れる最小のまとまり（「今日は」「天気です」）。改行や動きの単位に向く"],
          ["約物", "句読点・括弧・感嘆符などの記号類。詰め処理や禁則の対象になる"],
          ["縦中横", "縦書きの中で 2 桁の数字などを横向きに 1 文字分に収めること。CSS では `text-combine-upright`"],
          ["ルビ", "漢字などの読みを示す小さな文字。HTML の `<ruby>` と `<rt>`"],
          ["禁則処理", "行頭に句読点や閉じ括弧が来ないようにするなどの改行の規則"],
          ["テロップ", "映像に重ねて表示する文字の総称（もとは商標 TELOP に由来）。バラエティでは縁取りや色で話者や感情を表す"],
          ["座布団", "テロップの背後に敷く帯状の背景"]
        ] } }
      ],
      bodyEn: [
        { table: { head: ["Term", "Meaning"], rows: [
          ["CPS", "Characters per second, the subtitle reading rate. Netflix English: 20 for adults, 17 for children"],
          ["SDH", "Subtitles for the deaf and hard of hearing. They include speaker labels and sound effects, so higher rates are allowed"],
          ["Pop-on / paint-on / roll-up", "Caption display modes: a whole caption at once, characters appearing in sequence, or lines stacking up from the bottom"],
          ["RSVP", "Rapid Serial Visual Presentation: showing one word at a time, fast, in the same position"],
          ["Bunsetsu (phrase)", "The smallest Japanese unit you can break at without breaking meaning (今日は / 天気です). A good unit for line breaks and motion"],
          ["Yakumono", "Japanese punctuation and brackets. Subject to spacing adjustment and kinsoku rules"],
          ["Tate-chu-yoko", "Setting a two-digit number or similar horizontally within one cell of vertical text. `text-combine-upright` in CSS"],
          ["Ruby", "Small annotation text showing the reading of kanji. `<ruby>` and `<rt>` in HTML"],
          ["Kinsoku", "Japanese line-breaking rules, such as no comma or closing bracket at the start of a line"],
          ["Telop", "Japanese term for any text superimposed on video (from the TELOP trademark). Variety shows use outlines and colour to show speaker and mood"],
          ["Zabuton", "A band-shaped background placed behind a telop (literally a floor cushion)"]
        ] } }
      ]
    }
  ],
  related: ["tracking-in-expand", "tracking-in-contract", "range-soft-wave-reveal", "wiggly-jitter", "bunsetsu-reveal", "yakumono-pause", "telop-zabuton", "roll-up-caption"],
  sources: [
    { title: "Adobe: Animating text (After Effects)", url: "https://helpx.adobe.com/after-effects/using/animating-text.html" },
    { title: "W3C Text Tracks CG: Caption model", url: "https://www.w3.org/community/texttracks/wiki/Caption_Model" },
    { title: "Netflix: English (USA) Timed Text Style Guide", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide" },
    { title: "Netflix: Japanese Timed Text Style Guide", url: "https://partnerhelp.netflixstudios.com/hc/en-us/articles/215767517-Japanese-Timed-Text-Style-Guide" },
    { title: "Wikipedia: Telop", url: "https://en.wikipedia.org/wiki/Telop" },
    { title: "MDN: text-combine-upright", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright" },
    { title: "google/budoux", url: "https://github.com/google/budoux" }
  ]
}
];
