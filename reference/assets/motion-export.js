/* Code examples are derived from the rendered demo, including every animated layer. */
(() => {
  const cache = new Map();
  const escape = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const kebab = value => value.startsWith("--") ? value : value.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);

  function capture(item) {
    const key = `${item.id}/${state.previewMode}/${state.language}`;
    if (cache.has(key)) return cache.get(key);
    const holder = document.createElement("div");
    holder.className = "dialog-stage motion-export-probe";
    holder.style.cssText = "position:fixed;left:-10000px;top:0;width:520px;height:300px;visibility:hidden;pointer-events:none;";
    holder.innerHTML = stageMarkup(item, true);
    document.body.append(holder);
    const stage = holder.querySelector(".motion-stage");
    const animations = buildAnimations(stage, item, false, 1);
    const tracks = [];
    const nodes = new Map();
    animations.forEach(animation => {
      animation.pause();
      const target = animation.effect.target;
      if (!nodes.has(target)) nodes.set(target, nodes.size);
      target.dataset.motionNode = String(nodes.get(target));
      const timing = animation.effect.getTiming();
      const frames = animation.effect.getKeyframes().map(({computedOffset, composite, ...frame}) => ({...frame, offset: computedOffset}));
      const still = Boolean(target.closest(".baseline-pane"));
      tracks.push({ selector: `[data-motion-node="${nodes.get(target)}"]`, keyframes: frames,
        timing: { duration: timing.duration, easing: timing.easing, fill: "both" }, still });
      animation.cancel();
    });
    const data = { html: stage.outerHTML, tracks, duration: item.duration, reducedProgress: window.MotionRuntime.representative(item) };
    holder.remove();
    cache.set(key, data);
    return data;
  }

  function snippets(item) {
    const data = capture(item);
    const payload = JSON.stringify(data.tracks, null, 2);
    const setup = `const tracks = ${payload};\nconst root = document.querySelector(".motion-stage");\nconst reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;\nconst animations = tracks.map(track => {\n  const animation = root.querySelector(track.selector).animate(track.keyframes, {\n    ...track.timing, iterations: reduce || track.still ? 1 : Infinity\n  });\n  if (reduce || track.still) {\n    animation.pause();\n    animation.currentTime = track.timing.duration * ${data.reducedProgress};\n  }\n  return animation;\n});`;
    const cleanup = `\n\n// Call when removing this view, not immediately after creating it.\nfunction dispose() { animations.forEach(animation => animation.cancel()); }`;
    const keyframeCSS = data.tracks.map((track, index) => {
      const name = `motion-${index}`;
      const frames = track.keyframes.map(frame => {
        const properties = Object.entries(frame).filter(([name]) => !["offset","easing","composite"].includes(name));
        const declarations = properties.map(([name,value]) => `    ${kebab(name)}: ${value};`).join("\n");
        return `  ${Math.round(frame.offset * 10000) / 100}% {\n${declarations}\n    animation-timing-function: ${frame.easing || "linear"};\n  }`;
      }).join("\n");
      // WAAPI's outer easing cannot be represented by CSS segment easings without baking.
      const note = track.timing.easing === "linear" ? "" : `/* Outer timing in the live demo: ${track.timing.easing}.\n   Use WAAPI/HTML export for the exact outer-timeline interpolation. */\n`;
      return `${note}@keyframes ${name} {\n${frames}\n}`;
    }).join("\n\n");
    const groups = new Map();
    data.tracks.forEach((track, index) => {
      if (!groups.has(track.selector)) groups.set(track.selector, []);
      groups.get(track.selector).push({...track, index});
    });
    const css = keyframeCSS + "\n\n" + [...groups].map(([selector, tracks]) => {
      const declarations = tracks.map(track => `motion-${track.index} ${track.timing.duration}ms linear ${track.still ? "1" : "infinite"} both`).join(",\n    ");
      const paused = tracks.map(track => track.still ? "paused" : "running").join(", ");
      const initialDelays = tracks.map(track => `${track.still ? -track.timing.duration * data.reducedProgress : 0}ms`).join(", ");
      const stillDelays = tracks.map(track => `${-track.timing.duration * data.reducedProgress}ms`).join(", ");
      return `.motion-stage ${selector} {\n  animation: ${declarations};\n  animation-play-state: ${paused};\n  animation-delay: ${initialDelays};\n}\n@media (prefers-reduced-motion: reduce) {\n  .motion-stage ${selector} { animation-iteration-count: 1; animation-play-state: paused; animation-delay: ${stillDelays}; }\n}`;
    }).join("\n\n");
    const gsap = `${setup}\n\n// GSAP controls the clock; WAAPI renders the exact SVG/CSS keyframes.\nanimations.forEach(animation => animation.pause());\nconst clock = { ms: 0 };\nconst tween = reduce ? null : gsap.to(clock, {\n  ms: ${data.duration}, duration: ${data.duration / 1000}, ease: "none", repeat: -1,\n  onUpdate: () => animations.forEach((animation, index) => {\n    if (!tracks[index].still) animation.currentTime = clock.ms;\n  })\n});\n\n// Call on view teardown.\nfunction dispose() { tween?.kill(); animations.forEach(animation => animation.cancel()); }`;
    const react = `import { useEffect, useRef } from "react";\nconst tracks = ${payload};\nconst html = ${JSON.stringify(data.html)};\n\nexport function MotionExample() {\n  const ref = useRef(null);\n  useEffect(() => {\n    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;\n    const animations = tracks.map(track => {\n      const animation = ref.current.querySelector(track.selector).animate(track.keyframes, {\n        ...track.timing, iterations: reduce || track.still ? 1 : Infinity\n      });\n      if (reduce || track.still) { animation.pause(); animation.currentTime = track.timing.duration * ${data.reducedProgress}; }\n      return animation;\n    });\n    return () => animations.forEach(animation => animation.cancel());\n  }, []);\n  // html is this fixed local demo, never user input. Include the demo stylesheet.\n  return <div ref={ref} className="dialog-stage" dangerouslySetInnerHTML={{__html: html}} />;\n}`;
    return {html:data.html, css, waapi:setup+cleanup, gsap, react};
  }

  function documentFor(item) {
    const data = capture(item);
    const css = [...document.styleSheets].flatMap(sheet => {
      try { return [...sheet.cssRules].map(rule => rule.cssText); } catch { return []; }
    }).join("\n");
    const fit = `document.querySelectorAll(".motion-stage.is-legacy").forEach(stage => {\n  const canvas = stage.querySelector(".legacy-canvas");\n  const fit = () => canvas.style.setProperty("--canvas-scale", String(Math.min(stage.clientWidth / 320, stage.clientHeight / 180, 2.4)));\n  fit();\n  addEventListener("resize", fit);\n});\n`;
    const script = `${fit}${snippets(item).waapi}\ndocument.querySelector("#replay").onclick = () => { animations.forEach((a,i) => { if (!tracks[i].still && !reduce) { a.currentTime=0; a.play(); } }); };\n`;
    return `<!doctype html><html lang="${state.language}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(localTitle(item))}</title><style>${css.replace(/<\/style/gi,"<\\/style")}\nbody{margin:0;padding:24px;background:#080d16;color:#eee;font-family:system-ui}main{padding:0;max-width:760px;margin:auto}h1{font-size:22px}.dialog-stage{height:380px;margin:24px 0}.export-note{font-size:14px;line-height:1.8}button{padding:10px 18px;border:1px solid #6a7392;border-radius:8px;background:#182033;color:white}</style><main><h1>${escape(localTitle(item))}</h1><p class="export-note">${escape(state.language === "en" ? item.descriptionEn : item.description)}</p><div class="dialog-stage">${data.html}</div><button id="replay">${escape(I18N[state.language].replayLabel)}</button></main><script>${script.replace(/<\/script/gi,"<\\/script")}<\/script></html>`;
  }

  function download(item) {
    const atlas = atlasDemo(item);
    const source = atlas && item.engine === "text"
      ? window.TEXTMOTION.documentFor(atlas, { title: localTitle(item), lang: state.language, description: state.language === "en" ? item.descriptionEn : item.description, replay: I18N[state.language].replayLabel, accent: item.accent })
      : atlas
      ? window.ATLAS.documentFor(item, atlas, localTitle(item), state.language, state.language === "en" ? item.descriptionEn : item.description, I18N[state.language].replayLabel)
      : documentFor(item);
    const url = URL.createObjectURL(new Blob([source], {type:"text/html;charset=utf-8"}));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.id}.html`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  window.MotionExport = {capture, snippets, documentFor, download};
})();
