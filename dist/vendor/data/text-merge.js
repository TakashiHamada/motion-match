/* テキストモーション（228項目）をモーションリファレンスへ統合する。
   data/text/items.js・assets/text-bundle.js・data/atlas-merge.js のあとに読み込む。
   - 既存の「テキスト」「キネティック文字」カテゴリはテキストモーションの 22 カテゴリへまとめ直す
   - 同じ動きが重複していた既存項目は外し、旧 id はテキストモーション側の項目へ転送する（共有リンク用） */
(() => {
  const library = window.MOTION_LIBRARY || [];
  const categories = window.MOTION_CATEGORIES || [];
  const textItems = window.TEXT_MOTION_ITEMS || [];
  const textCategories = window.TEXT_MOTION_CATEGORIES || [];
  const merge = window.TEXT_MOTION_MERGE || { duplicates: {}, keep: {} };
  const aliases = window.MOTION_ALIASES = window.MOTION_ALIASES || {};
  const merged = window.MOTION_MERGED_DEMOS = window.MOTION_MERGED_DEMOS || [];

  // 重複していた既存項目を外す
  for (let i = library.length - 1; i >= 0; i--) {
    const target = merge.duplicates[library[i].id];
    if (target) { aliases[library[i].id] = `tx-${target}`; merged.push(library[i].demoId || library[i].id); library.splice(i, 1); }
  }
  // 残す既存項目はテキストモーションのカテゴリへ
  library.forEach(item => { const cat = merge.keep[item.id]; if (cat) item.category = `tx-${cat}`; });

  // カテゴリ：旧「テキスト」「キネティック文字」を外し、テキストモーションの 22 カテゴリを末尾にまとめる
  // （サイドバーでは group: "text" の見出し「テキストモーション」の下に並ぶ）
  for (let i = categories.length - 1; i >= 0; i--) if (categories[i].id === "text" || categories[i].id === "kinetic-type") categories.splice(i, 1);
  categories.push(...textCategories);

  library.push(...textItems);
})();
