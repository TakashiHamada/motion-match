/* クイズの抽選・採点。画面に依存しない学習ロジック。 */
(function (root) {
  function shuffle(values, random = Math.random) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function makeSession(pool, rounds = 5, random = Math.random) {
    // 名前が同じ項目を同じ問題に混ぜない。1セット内の重複出題も避ける。
    const unique = [...new Map(pool.map(item => [item.title, item])).values()];
    const chosen = shuffle(unique, random).slice(0, rounds * 3);
    const groups = [];
    for (let i = 0; i < chosen.length; i += 3) groups.push(chosen.slice(i, i + 3).map(x => x.id));
    return { groups, names: groups.map(ids => shuffle(ids, random)), round: 0,
      assignments: {}, graded: false, results: [], mode: 'all', category: 'basic' };
  }
  function assign(assignments, motionId, nameId) {
    const next = { ...assignments };
    for (const id of Object.keys(next)) if (next[id] === nameId) delete next[id];
    next[motionId] = nameId;
    return next;
  }
  function grade(ids, assignments) {
    return ids.map(id => ({ id, correct: assignments[id] === id, chosen: assignments[id] }));
  }
  function record(stats, results, date) {
    const next = JSON.parse(JSON.stringify(stats));
    next.items ||= {}; next.days ||= {};
    next.days[date] = (next.days[date] || 0) + results.length;
    for (const result of results) {
      const entry = next.items[result.id] ||= { attempts: 0, correct: 0, streak: 0, weak: false };
      entry.attempts++;
      if (result.correct) { entry.correct++; entry.streak++; if (entry.streak >= 2) entry.weak = false; }
      else { entry.streak = 0; entry.weak = true; }
    }
    return next;
  }
  const api = { shuffle, makeSession, assign, grade, record };
  if (typeof module !== 'undefined') module.exports = api;
  else root.QuizCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
