/* 元サイトの公開描画エンジンをクイズのステージへ接続する。 */
(() => {
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const engine = item => item.engine === 'text' ? window.TEXTMOTION : window.ATLAS;
  window.QuizRenderer = {
    engine,
    markup(item) {
      return `<div class="motion-stage is-atlas" data-stage-id="${item.id}"><canvas class="atlas-canvas" aria-hidden="true"></canvas></div>`;
    },
    fit() {},
    animate(stage, item, speed = 1, allowMotion = false) {
      const source = engine(item);
      const demo = source.get(item.demoId || item.id);
      if (!demo) throw new Error(`デモがありません: ${item.id}`);
      const paused = reduced() && !allowMotion;
      return [new source.Clip(stage.querySelector('canvas'), demo, {
        accent: item.accent, loop: true, rate: speed, paused,
        startMs: paused ? source.stillTime(demo) * 1000 : 0
      })];
    }
  };
})();
