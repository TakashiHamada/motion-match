/* Each study encodes its named mechanism. Timelines are illustrative, not simulations. */
(() => {
  const demos = window.MOTION_DEMOS ||= {};
  const node = (cls, text = '', style = '') => `<div class="mxe-node stage-object web-motion-object ${cls}" style="${style}">${text}</div>`;
  const box = (cls, text = '', style = '') => node(`mxe-card ${cls}`, text, style);
  const dot = (cls, style = '') => node(`mxe-dot ${cls}`, '', style);
  const svg = (content) => `<svg class="mxe-svg" viewBox="0 0 260 154" aria-hidden="true">${content}</svg>`;
  const path = (cls, d, extra = '') => `<path class="stage-object web-motion-object ${cls}" d="${d}" ${extra}/>`;
  const text = (cls, value, style = '') => node(`mxe-text ${cls}`, value, style);
  const frames = (...stops) => stops.map(([offset, props]) => ({offset, ...props}));
  const track = (selector, keyframes, delay = 0) => ({selector, keyframes, delay});
  const fade = (at = .18, end = .35) => frames([0,{opacity:0}],[at,{opacity:0}],[end,{opacity:1}],[1,{opacity:1}]);
  const pulse = (at = .35) => frames([0,{opacity:0,transform:'scale(.4)'}],[at,{opacity:0,transform:'scale(.4)'}],[at+.05,{opacity:.8,transform:'scale(.65)'}],[at+.24,{opacity:0,transform:'scale(1.6)'}],[1,{opacity:0,transform:'scale(1.6)'}]);
  const draw = (at = .12, end = .6) => frames([0,{strokeDashoffset:1}],[at,{strokeDashoffset:1}],[end,{strokeDashoffset:0}],[1,{strokeDashoffset:0}]);
  const letters = (word, cls='letter') => [...word].map((c,i)=>node(`mxe-letter ${cls}`,c,`left:${34+i*27}px;top:58px`)).join('');
  const rings = () => node('mxe-ring ring-a')+node('mxe-ring ring-b');
  const axis = svg('<path d="M30 25V121H234" fill="none" stroke="#354052"/><path d="M30 73H234" fill="none" stroke="#1a2531" stroke-dasharray="3 4"/>');
  const meta = {
    'ui-spatial': ['奥行きは階層や選択状態の説明に使う','遠近変形中も操作対象を見失わないようにする','移動を減らす設定では最終配置を直接表示する'],
    'ui-material': ['接触・変形・復元の順を読み取れる間隔にする','素材表現は実際の物理計算とは分けて考える','変形後もラベルと状態が読める形に戻す'],
    'kinetic-type': ['読字順に沿って文字を動かす','文字を読める静止時間を十分に残す','本文には同じ強さの演出を繰り返さない'],
    'game-impact-fx': ['命中や確定の瞬間にアクセントを合わせる','衝撃の後は減衰させて情報を読ませる','反復する点滅や大きな揺れは避ける'],
    'data-story': ['このデモの数値は説明用の架空データ','実装では実データの比率と位置を保つ','推定値と確定値を区別して表示する']
  };
  const metaEn = {
    'ui-spatial': ['Use depth to explain hierarchy or selection state','Keep the interactive target trackable during perspective changes','With reduced motion, show the final layout directly'],
    'ui-material': ['Space contact, deformation, and recovery so their order is readable','Treat the material look separately from real physics','Return to a shape where the label and state stay readable'],
    'kinetic-type': ['Move letters in reading order','Leave enough still time to read the text','Do not repeat the same intensity in body text'],
    'game-impact-fx': ['Align the accent with the moment of a hit or confirmation','Let the effect decay after impact so the information can be read','Avoid repeated flashing and large shakes'],
    'data-story': ['The values in this demo are illustrative, not real data','In production, keep the ratios and positions of the real data','Distinguish estimates from confirmed values']
  };
  function define(group,key,html,tracks,description,focus,options={}) {
    demos[`catalog-${group}-${key}`] = {
      html:`<div class="mxe-scene mxe-${group} mxe-${key}">${html}</div>`, tracks,
      duration:4200, easing:'linear', description, descriptionEn:options.descriptionEn || description,
      focus, focusEn:options.focusEn || focus,
      caution:group==='data-story'?'図中の値は説明用の架空データ。位置や面積の変化は実データに合わせ、装飾で意味を変えない。':'自動再生による動きの見本。実装時は入力や状態更新に接続し、動きを減らす設定では最終状態を表示する。',
      cautionEn:group==='data-story'?'Values are illustrative. Map geometry to real data without distorting its meaning.':'This is an autoplay study. Connect the motion to a real event and provide a reduced-motion final state.',
      tips:meta[group], tipsEn:metaEn[group], recipe:`開始状態 → ${focus} → 完了状態を保持`, ...options
    };
  }

  // Spatial UI: depth belongs to an explicit layer, target, or navigation relation.
  define('ui-spatial','cursor-depth-pull', box('pull-card','CARD')+dot('cursor','left:196px;top:100px'), [
    track('.cursor',frames([0,{transform:'translate(0,0)'}],[.2,{transform:'translate(-43px,-37px)'}],[.65,{transform:'translate(-43px,-37px)'}],[.8,{transform:'translate(0,0)'}],[1,{transform:'translate(0,0)'}])),
    track('.pull-card',frames([0,{transform:'perspective(360px) rotateX(0) rotateY(0) translateZ(0)'}],[.2,{transform:'perspective(360px) rotateX(9deg) rotateY(-13deg) translateZ(24px)'}],[.65,{transform:'perspective(360px) rotateX(9deg) rotateY(-13deg) translateZ(24px)'}],[.8,{transform:'perspective(360px) rotateX(0) rotateY(0) translateZ(0)'}],[1,{transform:'perspective(360px) rotateX(0) rotateY(0) translateZ(0)'}]))
  ],'カーソルが近づくとカードが手前に起き上がり、離れると平面へ戻る。','カーソル移動に続いて回転とZ方向移動が応答する。');
  define('ui-spatial','focus-portal',node('portal-window',box('portal-content','DETAIL')), [
    track('.portal-window',frames([0,{clipPath:'circle(2% at 50% 50%)'}],[.15,{clipPath:'circle(2% at 50% 50%)'}],[.48,{clipPath:'circle(76% at 50% 50%)'}],[1,{clipPath:'circle(76% at 50% 50%)'}])),
    track('.portal-content',frames([0,{transform:'scale(.72)',opacity:.2}],[.2,{transform:'scale(.72)',opacity:.2}],[.55,{transform:'scale(1)',opacity:1}],[1,{transform:'scale(1)',opacity:1}]))
  ],'円形の開口が拡大して、奥に置いた詳細面を手前へ導く。','開口の拡大と内容面の接近を少しずらす。');
  define('ui-spatial','radial-command-bloom',node('mxe-hub','＋')+['✦','⌕','▣','↗','○'].map((s,i)=>box(`radial-command command-${i}`,s)).join(''),[
    track('.radial-command',(i)=>{const a=(-90+i*72)*Math.PI/180,x=Math.cos(a)*59,y=Math.sin(a)*48;return frames([0,{transform:'translate(0,0) scale(.25)',opacity:0}],[.14+i*.035,{transform:'translate(0,0) scale(.25)',opacity:0}],[.4+i*.035,{transform:`translate(${x}px,${y}px) scale(1)`,opacity:1}],[1,{transform:`translate(${x}px,${y}px) scale(1)`,opacity:1}]);})
  ],'中心ボタンから五つのコマンドが放射状に開く。','同じ中心から異なる方向へ展開し、メニューの関係を保つ。');
  define('ui-spatial','spatial-breadcrumb',['HOME','FILES','ITEM'].map((s,i)=>box(`crumb crumb-${i}`,s,`left:${30+i*68}px;top:56px`)).join(''),[
    track('.crumb',(i)=>frames([0,{transform:'perspective(280px) translateZ(0)',opacity:1}],[.24,{transform:`perspective(280px) translateZ(${-70+i*35}px) translateY(${(2-i)*10}px)`,opacity:.35+i*.3}],[.6,{transform:`perspective(280px) translateZ(${-70+i*35}px) translateY(${(2-i)*10}px)`,opacity:.35+i*.3}],[1,{transform:`perspective(280px) translateZ(${-70+i*35}px) translateY(${(2-i)*10}px)`,opacity:.35+i*.3}]))
  ],'上位階層ほど奥へ退き、現在地が手前に残るパンくず。','階層の深さと見かけの距離を対応させる。');
  define('ui-spatial','perspective-dock',node('dock-base')+['◆','●','■','✦','▲'].map((s,i)=>box('dock-icon',s,`left:${37+i*40}px;top:68px`)).join(''),[
    track('.dock-icon',(i)=>{const scale=1.55-Math.abs(2-i)*.22;return frames([0,{transform:'translateY(0) scale(.85)'}],[.32,{transform:`translateY(${-12+(Math.abs(2-i)*4)}px) scale(${scale})`}],[.66,{transform:`translateY(${-12+(Math.abs(2-i)*4)}px) scale(${scale})`}],[.85,{transform:'translateY(0) scale(.85)'}],[1,{transform:'translateY(0) scale(.85)'}]);})
  ],'ドックの中心アイコンを持ち上げ、隣のアイコンも距離に応じて拡大する。','選択位置からの距離に応じた連続的な拡大。');
  define('ui-spatial','layer-peel',box('peel-under','DETAIL')+box('peel-top','COVER'),[
    track('.peel-top',frames([0,{transform:'perspective(400px) rotateY(0deg)'}],[.16,{transform:'perspective(400px) rotateY(0deg)'}],[.52,{transform:'perspective(400px) rotateY(-145deg)'}],[1,{transform:'perspective(400px) rotateY(-145deg)'}]))
  ],'上の面を左端からめくり、背後の情報面を見せる。','回転の支点を左端に固定し、下層を動かさない。');
  define('ui-spatial','tooltip-orbit',node('mxe-hub','i')+box('orbit-tooltip','DETAIL'),[
    track('.orbit-tooltip',frames([0,{transform:'translate(-57px,-36px)'}],[.22,{transform:'translate(50px,-37px)'}],[.45,{transform:'translate(60px,30px)'}],[.65,{transform:'translate(-51px,32px)'}],[.85,{transform:'translate(-57px,-36px)'}],[1,{transform:'translate(-57px,-36px)'}]))
  ],'対象を中心にツールチップの位置を移し、画面端を避ける配置変更を示す。','内容は回転させず、位置だけを対象の周囲へ移す。');
  define('ui-spatial','depth-lens',node('lens-grid')+node('depth-lens','ZOOM'),[
    track('.depth-lens',frames([0,{transform:'translateX(-64px) scale(.75)'}],[.25,{transform:'translateX(-15px) scale(1.1)'}],[.55,{transform:'translateX(55px) scale(1)'}],[.8,{transform:'translateX(0) scale(1.1)'}],[1,{transform:'translateX(0) scale(1.1)'}]))
  ],'格子の上を拡大窓が移動し、窓内だけ大きい格子で表示する。','窓内外の格子間隔の差で拡大を伝える。',{caution:'拡大窓の見せ方を示すCSSデモ。実コンテンツでは窓内に対象の拡大描画を同期する。'});
  define('ui-spatial','magnetic-constellation',svg(path('magnet-lines','M52 110L96 43L167 34L209 104L130 118Z','fill="none" stroke="#35505c" vector-effect="non-scaling-stroke"'))+[[52,110],[96,43],[167,34],[209,104],[130,118]].map(([x,y])=>dot('magnet-node',`left:${x-6}px;top:${y-6}px`)).join('')+dot('magnet-center','left:124px;top:70px'),[
    track('.magnet-node',(i)=>{const pos=[[52,110],[96,43],[167,34],[209,104],[130,118]][i];return frames([0,{transform:'translate(0,0)'}],[.38,{transform:`translate(${(130-pos[0])*.38}px,${(77-pos[1])*.38}px)`}],[.67,{transform:`translate(${(130-pos[0])*.38}px,${(77-pos[1])*.38}px)`}],[.88,{transform:'translate(0,0)'}],[1,{transform:'translate(0,0)'}]);}),
    track('.magnet-lines',frames([0,{transform:'scale(1)'}],[.38,{transform:'scale(.62)'}],[.67,{transform:'scale(.62)'}],[.88,{transform:'scale(1)'}],[1,{transform:'scale(1)'}]))
  ],'周辺ノードが中心に引かれ、関係を残しながら集まる。','各点の中心までの距離に比例させて移動する。');
  define('ui-spatial','infinite-canvas-jump',node('canvas-world',box('canvas-a','A','left:30px;top:25px')+box('canvas-b','B','left:210px;top:98px')+box('canvas-c','C','left:355px;top:20px')),[
    track('.canvas-world',frames([0,{transform:'translate(0,0) scale(1)'}],[.16,{transform:'translate(0,0) scale(1)'}],[.32,{transform:'translate(-85px,-15px) scale(.7)'}],[.53,{transform:'translate(-174px,-63px) scale(1)'}],[1,{transform:'translate(-174px,-63px) scale(1)'}]))
  ],'広いキャンバスを一度引いてから目的カードへ移動する。','途中で引くことで離れた二地点の位置関係を見せる。');
  define('ui-spatial','z-notification',box('z-back','WORKSPACE')+box('z-toast','✓ SAVED'),[
    track('.z-toast',frames([0,{transform:'perspective(380px) translateZ(-180px)',opacity:0}],[.15,{transform:'perspective(380px) translateZ(-180px)',opacity:0}],[.4,{transform:'perspective(380px) translateZ(18px)',opacity:1}],[.5,{transform:'perspective(380px) translateZ(0)',opacity:1}],[1,{transform:'perspective(380px) translateZ(0)',opacity:1}]))
  ],'作業面の奥から通知が手前に現れ、一定の奥行きで止まる。','接近後の小さな戻りと、読める停止時間。');
  define('ui-spatial','camera-dolly-ui',node('dolly-world',box('dolly-far','BACK')+box('dolly-near','FRONT')),[
    track('.dolly-near',frames([0,{transform:'translate(8.7px,-4px) scale(.8)'}],[.15,{transform:'translate(8.7px,-4px) scale(.8)'}],[.6,{transform:'translate(-15.2px,7px) scale(1.35)'}],[1,{transform:'translate(-15.2px,7px) scale(1.35)'}])),
    track('.dolly-far',frames([0,{transform:'translate(-12.2px,7.1px) scale(.66)',opacity:.4}],[.15,{transform:'translate(-12.2px,7.1px) scale(.66)',opacity:.4}],[.6,{transform:'translate(-6.5px,3.8px) scale(.82)',opacity:.62}],[1,{transform:'translate(-6.5px,3.8px) scale(.82)',opacity:.62}]))
  ],'前後に離れた二枚の面へ視点を寄せ、手前ほど大きく広がる遠近を見せる。','前景と背景の拡大率の差。');
  define('ui-spatial','volumetric-menu',['ONE','TWO','THREE'].map((s,i)=>box('volume-plane',s,`top:${31+i*18}px;left:${53+i*12}px`)).join(''),[
    track('.volume-plane',(i)=>frames([0,{transform:'perspective(400px) rotateX(0deg) translateZ(0)'}],[.42,{transform:`perspective(400px) rotateX(42deg) translateZ(${(1-i)*34}px) translateY(${(i-1)*14}px)`}],[1,{transform:`perspective(400px) rotateX(42deg) translateZ(${(1-i)*34}px) translateY(${(i-1)*14}px)`}]))
  ],'重なったメニューを上下の奥行きへ展開し、層として見せる。','同じ角度の面を深さだけ変えて分離する。');
  define('ui-spatial','parallax-inspector',['BG','CONTENT','UI'].map((s,i)=>box('inspect-plane',s,`left:${44+i*13}px;top:${30+i*13}px;opacity:${.45+i*.25}`)).join(''),[
    track('.inspect-plane',(i)=>frames([0,{transform:'translateX(0) rotateY(0deg)'}],[.32,{transform:`translateX(${[8,20,36][i]}px) rotateY(-10deg)`}],[.65,{transform:`translateX(${[-7,-17,-30][i]}px) rotateY(9deg)`}],[.86,{transform:'translateX(0) rotateY(0deg)'}],[1,{transform:'translateX(0) rotateY(0deg)'}]))
  ],'背景・内容・UIを異なる量だけ横へ動かし、レイヤーの距離を見せる。','前の層ほど大きく動く相対差。');
  define('ui-spatial','spatial-search',box('search-field','⌕  DESIGN')+['A','B','C'].map((s,i)=>box('search-result',s,`left:${37+i*65}px;top:72px`)).join(''),[
    track('.search-result',(i)=>frames([0,{transform:'perspective(300px) translateZ(-100px) translateY(-30px)',opacity:0}],[.19+i*.09,{transform:'perspective(300px) translateZ(-100px) translateY(-30px)',opacity:0}],[.41+i*.09,{transform:'perspective(300px) translateZ(0) translateY(0)',opacity:1}],[1,{transform:'perspective(300px) translateZ(0) translateY(0)',opacity:1}]))
  ],'検索欄の奥から結果カードを順に引き出す。','検索欄を起点にし、読字順に結果を並べる。');
  define('ui-spatial','orbit-context',node('orbit-guide')+node('mxe-hub','EDIT')+['↗','◆','⌫'].map((s,i)=>box(`context-node context-${i}`,s)).join(''),[
    track('.context-node',(i)=>{const a=i*120;return frames([0,{transform:`rotate(${a-60}deg) translateX(62px) rotate(${-a+60}deg)`,opacity:0}],[.18,{transform:`rotate(${a-60}deg) translateX(62px) rotate(${-a+60}deg)`,opacity:0}],[.5,{transform:`rotate(${a}deg) translateX(62px) rotate(${-a}deg)`,opacity:1}],[1,{transform:`rotate(${a}deg) translateX(62px) rotate(${-a}deg)`,opacity:1}]);})
  ],'対象の周囲の軌道に沿って文脈コマンドが滑り込み、定位置に止まる。','公転と逆回転を組み合わせ、アイコンの向きを保つ。');
  define('ui-spatial','depth-stack-reorder',['01','02','03'].map((s,i)=>box(`reorder-card reorder-${i}`,s,`left:${66+i*10}px;top:${31+i*17}px`)).join(''),[
    track('.reorder-2',frames([0,{transform:'translate(0,0)',zIndex:6}],[.24,{transform:'translate(58px,-10px) rotate(8deg)',zIndex:6}],[.25,{transform:'translate(58px,-10px) rotate(8deg)',zIndex:2}],[.48,{transform:'translate(-20px,-34px) rotate(0deg)',zIndex:2}],[1,{transform:'translate(-20px,-34px) rotate(0deg)',zIndex:2}])),
    track('.reorder-0',frames([0,{transform:'translate(0,0)'}],[.48,{transform:'translate(10px,17px)'}],[1,{transform:'translate(10px,17px)'}])),track('.reorder-1',frames([0,{transform:'translate(0,0)'}],[.48,{transform:'translate(10px,17px)'}],[1,{transform:'translate(10px,17px)'}]))
  ],'最前面のカードを横へ抜いて奥に差し込み、残りを一段ずつ送る。','交差前に外へ退避する経路と、並べ替え後の順序。');
  define('ui-spatial','calendar-fold',box('calendar-base','25')+box('calendar-page','24'),[
    track('.calendar-page',frames([0,{transform:'perspective(350px) rotateX(0deg)',opacity:1}],[.18,{transform:'perspective(350px) rotateX(0deg)',opacity:1}],[.57,{transform:'perspective(350px) rotateX(-170deg)',opacity:0}],[1,{transform:'perspective(350px) rotateX(-170deg)',opacity:0}]))
  ],'カレンダーの上端を支点に日付面がめくれ、翌日を表示する。','支点の位置と、めくった後に現れる新しい日付。');
  define('ui-spatial','cursor-raycast',svg(path('selection-ray','M28 128L151 70','fill="none" stroke="#78efd0" stroke-width="2" pathLength="1" stroke-dasharray="1"'))+box('ray-target','TARGET','left:151px;top:26px')+dot('ray-origin','left:22px;top:122px'),[
    track('.selection-ray',draw(.1,.4)),track('.ray-target',frames([0,{borderColor:'#34404f',backgroundColor:'#111b26'}],[.4,{borderColor:'#34404f',backgroundColor:'#111b26'}],[.46,{borderColor:'#a6ffe3',backgroundColor:'#254e49'}],[1,{borderColor:'#a6ffe3',backgroundColor:'#254e49'}]))
  ],'起点から対象へレイを伸ばし、到達した瞬間に対象を選択表示する。','レイの到着と選択ハイライトを同じ時刻にする。',{caution:'選択レイの視覚例。実際の3D交差判定は含まず、対象位置は固定。'});
  define('ui-spatial','spatial-audio-locator',node('audio-map')+dot('audio-source','left:190px;top:45px')+node('audio-bearing')+node('audio-listener','◉')+node('audio-wave wave-1')+node('audio-wave wave-2'),[
    track('.audio-wave',(i)=>frames([0,{transform:'scale(.2)',opacity:0}],[.12+i*.16,{transform:'scale(.2)',opacity:.9}],[.44+i*.16,{transform:'scale(2.96)',opacity:.55}],[.54+i*.16,{transform:'scale(3.8)',opacity:0}],[1,{transform:'scale(3.8)',opacity:0}])),
    track('.audio-bearing',frames([0,{opacity:0}],[.43,{opacity:0}],[.47,{opacity:1}],[.88,{opacity:1}],[.96,{opacity:0}],[1,{opacity:0}]))
  ],'音源位置から波が広がり、中央のリスナーへ届く方向を示す。','波の起点を音源に固定する。',{caution:'方向を可視化する無音デモ。空間オーディオ処理や音の距離減衰計算は行わない。'});

  // Materials: deliberately small CSS/SVG studies, with stylization called out.
  define('ui-material','liquid-tab-bridge',node('liquid-rail','<span>A</span><span>B</span>')+node('liquid-bridge')+node('liquid-knob'),[
    track('.liquid-bridge',frames([0,{clipPath:'inset(0 94px 0 0 round 6px)',transform:'scaleY(1)'}],[.23,{clipPath:'inset(0 47px 0 0 round 6px)',transform:'scaleY(.9)'}],[.35,{clipPath:'inset(0 12px 0 30px round 6px)',transform:'scaleY(.42)'}],[.42,{clipPath:'inset(0 0 0 94px round 6px)',transform:'scaleY(.2)'}],[1,{clipPath:'inset(0 0 0 94px round 6px)',transform:'scaleY(.2)'}])),
    track('.liquid-knob',frames([0,{transform:'translateX(0)',borderRadius:'50%'}],[.23,{transform:'translateX(47px) scaleX(1.4)',borderRadius:'45%'}],[.42,{transform:'translateX(94px)',borderRadius:'50%'}],[1,{transform:'translateX(94px)',borderRadius:'50%'}]))
  ],'選択タブが移る途中で細い液体の橋が伸び、到着時に切れる。','つながりを伸ばしてから細め、移動先へ収束させる。');
  define('ui-material','gel-button-split',box('gel gel-a','A')+box('gel gel-b','B')+node('gel-neck'),[
    track('.gel-a',frames([0,{transform:'translateX(0)',borderRadius:'46%'}],[.4,{transform:'translateX(-45px)',borderRadius:'50%'}],[1,{transform:'translateX(-45px)',borderRadius:'50%'}])),
    track('.gel-b',frames([0,{transform:'translateX(0)',borderRadius:'46%'}],[.4,{transform:'translateX(45px)',borderRadius:'50%'}],[1,{transform:'translateX(45px)',borderRadius:'50%'}])),
    track('.gel-neck',frames([0,{transform:'scaleX(.2) scaleY(1)'}],[.25,{transform:'scaleX(1) scaleY(.45)'}],[.4,{transform:'scaleX(1) scaleY(0)'}],[1,{transform:'scaleX(1) scaleY(0)'}]))
  ],'一つのジェル塊が左右へ引かれ、中央の首が細くなって二つに分かれる。','分裂前に両側と接続部を同時に伸ばす。');
  define('ui-material','glass-refraction',node('glass-grid')+node('glass-lens')+node('glass-highlight'),[
    track('.glass-lens',frames([0,{transform:'translateX(-58px)'}],[.55,{transform:'translateX(58px)'}],[.85,{transform:'translateX(0)'}],[1,{transform:'translateX(0)'}])),
    track('.glass-highlight',frames([0,{transform:'translateX(-58px)',opacity:.35}],[.55,{transform:'translateX(58px)',opacity:.75}],[.85,{transform:'translateX(0)',opacity:.5}],[1,{transform:'translateX(0)',opacity:.5}]))
  ],'ガラス風の窓を動かし、内部の格子を拡大して境界のずれを見せる。','窓の縁で背景格子が不連続になる見え方。',{title:'ガラス風屈折ホバー',titleEn:'Stylized Glass Refraction Hover',caution:'CSSの背景拡大による様式化。屈折率・視線・厚みを使った光学シミュレーションではない。'});
  define('ui-material','ink-adhesion',node('ink-pool')+[0,1,2].map(i=>dot('ink-drop',`left:${72+i*56}px;top:${28+i*8}px`)).join(''),[
    track('.ink-drop',(i)=>frames([0,{transform:'translateY(0) scale(1)'}],[.2+i*.09,{transform:'translateY(0) scale(1)'}],[.4+i*.09,{transform:'translateY(43px) scale(.7,1.4)'}],[.48+i*.09,{transform:'translateY(55px) scale(1.9,.4)',opacity:1}],[.57+i*.09,{transform:'translateY(56px) scale(1.9,.4)',opacity:0}],[1,{opacity:0,transform:'translateY(56px)'}])),
    track('.ink-pool',frames([0,{transform:'scaleX(.62)'}],[.7,{transform:'scaleX(1)'}],[1,{transform:'scaleX(1)'}]))
  ],'落ちたインク滴が面に付着して横に広がり、下のインク溜まりへ合流する。','縦に伸びた滴が接触時に横へつぶれる。');
  define('ui-material','metallic-foil',box('foil-card','FOIL'),[
    track('.foil-card',frames([0,{transform:'perspective(350px) rotateY(-22deg)',backgroundPosition:'0% 50%'}],[.35,{transform:'perspective(350px) rotateY(22deg)',backgroundPosition:'100% 50%'}],[.7,{transform:'perspective(350px) rotateY(0deg)',backgroundPosition:'55% 50%'}],[1,{transform:'perspective(350px) rotateY(0deg)',backgroundPosition:'55% 50%'}]))
  ],'箔カードの傾きに合わせて細いハイライトが横断する。','傾きと反射帯の位置を同期させる。',{caution:'金属箔の印象を作るグラデーション表現。照明を計算した物理ベース材質ではない。'});
  define('ui-material','soft-body-toggle',node('soft-rail')+node('soft-knob'),[
    track('.soft-knob',frames([0,{transform:'translateX(0) scale(1,1)'}],[.2,{transform:'translateX(0) scale(.8,1.15)'}],[.35,{transform:'translateX(86px) scale(1.3,.82)'}],[.46,{transform:'translateX(86px) scale(.93,1.06)'}],[.56,{transform:'translateX(86px) scale(1)'}],[1,{transform:'translateX(86px) scale(1)'}]))
  ],'トグルのつまみが押し縮み、横移動中に伸び、到着時に復元する。','移動方向と変形方向を一致させる。');
  define('ui-material','viscous-progress',node('viscous-track',node('viscous-fill')+node('viscous-head')),[
    track('.viscous-fill',frames([0,{transform:'scaleX(.02)'}],[.18,{transform:'scaleX(.02)'}],[.48,{transform:'scaleX(.74)'}],[.64,{transform:'scaleX(1)'}],[1,{transform:'scaleX(1)'}])),
    track('.viscous-head',frames([0,{transform:'translateX(0) scale(.7,1)'}],[.18,{transform:'translateX(0) scale(.7,1)'}],[.48,{transform:'translateX(115px) scale(1.4,.75)'}],[.64,{transform:'translateX(160px) scale(.7,1)'}],[1,{transform:'translateX(160px) scale(.7,1)'}]))
  ],'丸い液体の先端が伸び縮みしながら進捗バーを満たす。','平坦な後方と丸い先端を別に動かす。');
  define('ui-material','chromatic-glass-edge',box('prism-body','PRISM')+node('prism-edge red-edge')+node('prism-edge cyan-edge'),[
    track('.red-edge',frames([0,{transform:'translateX(0)',opacity:0}],[.3,{transform:'translateX(-5px)',opacity:.9}],[.6,{transform:'translateX(5px)',opacity:.9}],[.82,{transform:'translateX(0)',opacity:.3}],[1,{transform:'translateX(0)',opacity:.3}])),
    track('.cyan-edge',frames([0,{transform:'translateX(0)',opacity:0}],[.3,{transform:'translateX(5px)',opacity:.9}],[.6,{transform:'translateX(-5px)',opacity:.9}],[.82,{transform:'translateX(0)',opacity:.3}],[1,{transform:'translateX(0)',opacity:.3}]))
  ],'透明面の左右の縁に赤とシアンの輪郭が分離して現れ、中央へ戻る。','面全体でなく輪郭に色ずれを限定する。',{title:'色分離ガラスエッジ',titleEn:'Chromatic Glass Edge',caution:'縁の色分離をデザインしたCSS表現。波長別の屈折を計算する分光表現ではない。'});
  define('ui-material','paper-fold',box('paper-base','INSIDE')+box('paper-back','<i></i><i></i><i></i>')+box('paper-flap','OPEN'),[
    track('.paper-flap',frames([0,{transform:'perspective(380px) rotateY(0deg)',filter:'brightness(1)',opacity:1}],[.18,{transform:'perspective(380px) rotateY(0deg)',filter:'brightness(1)',opacity:1,easing:'cubic-bezier(.55,0,1,.5)'}],[.36,{transform:'perspective(380px) rotateY(-90deg)',filter:'brightness(.6)',opacity:1}],[.361,{transform:'perspective(380px) rotateY(-90deg)',filter:'brightness(.6)',opacity:0}],[1,{transform:'perspective(380px) rotateY(-90deg)',filter:'brightness(.6)',opacity:0}])),
    track('.paper-back',frames([0,{transform:'perspective(380px) rotateY(90deg)',filter:'brightness(.6)',opacity:0}],[.36,{transform:'perspective(380px) rotateY(90deg)',filter:'brightness(.6)',opacity:0}],[.361,{transform:'perspective(380px) rotateY(90deg)',filter:'brightness(.6)',opacity:1,easing:'cubic-bezier(0,.5,.45,1)'}],[.55,{transform:'perspective(380px) rotateY(0deg)',filter:'brightness(.9)',opacity:1}],[1,{transform:'perspective(380px) rotateY(0deg)',filter:'brightness(.9)',opacity:1}]))
  ],'紙の中央の折り目を固定し、右半分を左へ折り開いて中面を見せる。','平面の折り目を支点に回転し、角度に合わせて面を暗くする。');
  define('ui-material','cloth-wave',Array.from({length:12},(_,i)=>node('cloth-strip','',`left:${40+i*15}px;top:43px;background-position:${-i*15}px 0`)).join(''),[
    track('.cloth-strip',(i)=>frames([0,{transform:'translateY(0) rotateY(0deg)'}],[.16+i*.026,{transform:'translateY(-13px) rotateY(12deg)'}],[.34+i*.026,{transform:'translateY(11px) rotateY(-12deg)'}],[.56+i*.026,{transform:'translateY(0) rotateY(0deg)'}],[1,{transform:'translateY(0) rotateY(0deg)'}]))
  ],'細い帯に分けた面を時間差で上下に動かし、布の波が横へ伝わる。','隣り合う帯の位相差による一方向の波。',{caution:'分割面による布の近似。張力や衝突を解くクロスシミュレーションではない。'});
  define('ui-material','bubble-merge',node('merge-bubble bubble-left','A')+node('merge-bubble bubble-right','B')+node('merged-label','A + B'),[
    track('.bubble-left',frames([0,{transform:'translateX(-50px) scale(1)'}],[.35,{transform:'translateX(-12px) scale(1.1)'}],[.52,{transform:'translateX(0) scale(1.18)'}],[1,{transform:'translateX(0) scale(1.18)'}])),
    track('.bubble-right',frames([0,{transform:'translateX(50px) scale(1)',opacity:1}],[.35,{transform:'translateX(12px) scale(1.1)',opacity:1}],[.52,{transform:'translateX(0) scale(1.18)',opacity:0}],[1,{transform:'translateX(0) scale(1.18)',opacity:0}])),track('.merged-label',fade(.5,.56))
  ],'二つのバブルが近づき、一つの大きな選択面へ結合する。','接触してから大きい面へ変わり、統合ラベルを表示する。');
  define('ui-material','frost-melt',box('frost-content','UNLOCKED')+box('frost-cover','LOCKED'),[
    track('.frost-cover',frames([0,{clipPath:'circle(100% at 50% 50%)',opacity:1}],[.2,{clipPath:'circle(100% at 50% 50%)',opacity:1}],[.62,{clipPath:'circle(0% at 50% 50%)',opacity:0}],[1,{clipPath:'circle(0% at 50% 50%)',opacity:0}]))
  ],'霜模様の覆いが周縁から縮み、透明な情報面が現れる。','覆いの面積が減ることでロック解除を伝える。',{caution:'霜の融解を円形マスクで様式化した表現。温度分布や実際の融解を再現するものではない。'});
  define('ui-material','membrane-press',svg(path('membrane','M35 76Q130 76 225 76','fill="none" stroke="#81e5d4" stroke-width="4"'))+dot('press-finger','left:124px;top:25px'),[
    track('.press-finger',frames([0,{transform:'translateY(0)'}],[.3,{transform:'translateY(64px)'}],[.42,{transform:'translateY(64px)'}],[.6,{transform:'translateY(0)'}],[1,{transform:'translateY(0)'}])),
    track('.membrane',frames([0,{d:'path("M35 76Q130 76 225 76")'}],[.15,{d:'path("M35 76Q130 76 225 76")'}],[.3,{d:'path("M35 76Q130 120 225 76")'}],[.42,{d:'path("M35 76Q130 120 225 76")'}],[.58,{d:'path("M35 76Q130 58 225 76")'}],[.7,{d:'path("M35 76Q130 82 225 76")'}],[.8,{d:'path("M35 76Q130 76 225 76")'}],[1,{d:'path("M35 76Q130 76 225 76")'}]))
  ],'両端が固定された膜の中央を押し、離した後に減衰しながら戻す。','両端を動かさず、中央だけをたわませる。');
  define('ui-material','sand-dissolve',Array.from({length:30},(_,i)=>node('sand-cell','',`left:${70+(i%6)*20}px;top:${35+Math.floor(i/6)*16}px`)).join('')+text('sand-done','NEXT','left:90px;top:61px'),[
    track('.sand-cell',(i)=>frames([0,{transform:'translate(0,0)',opacity:1}],[.18+(i%6)*.025,{transform:'translate(0,0)',opacity:1}],[.58+(i%6)*.025,{transform:`translate(${(i%6-2.5)*9}px,${65+Math.floor(i/6)*3}px) scale(.15)`,opacity:0}],[1,{transform:'translateY(80px) scale(.15)',opacity:0}])),track('.sand-done',fade(.5,.7))
  ],'面を小さな粒の格子に分け、下へ崩して次の状態を見せる。','粒ごとの開始差と下向きの落下を合わせる。');
  define('ui-material','oil-slick',box('oil-card','SELECTED'),[
    track('.oil-card',frames([0,{backgroundPosition:'0% 50%',borderRadius:'24% 35% 27% 31%'}],[.35,{backgroundPosition:'100% 25%',borderRadius:'36% 23% 39% 25%'}],[.7,{backgroundPosition:'50% 75%',borderRadius:'24% 35% 27% 31%'}],[1,{backgroundPosition:'50% 75%',borderRadius:'24% 35% 27% 31%'}]))
  ],'油膜風の多色帯が面を流れ、選択された領域だけゆっくり変形する。','複数の細い色帯を面内で動かす。',{caution:'油膜の干渉色を連想させるグラデーション。薄膜干渉の光学計算ではない。'});
  define('ui-material','magnetic-fluid',node('ferro-core')+Array.from({length:12},(_,i)=>node('ferro-spike','',`transform:rotate(${i*30}deg);--angle:${i*30}deg`)).join('')+dot('ferro-magnet','left:190px;top:71px'),[
    track('.ferro-spike',(i)=>frames([0,{transform:`rotate(${i*30}deg) scaleY(.3)`}],[.4,{transform:`rotate(${i*30}deg) scaleY(${.35+Math.max(0,Math.cos((i*30-90)*Math.PI/180))*.85})`}],[.7,{transform:`rotate(${i*30}deg) scaleY(.3)`}],[1,{transform:`rotate(${i*30}deg) scaleY(.3)`}]))
  ],'磁石側の突起が伸び、磁性流体らしい尖った輪郭を作る。','外力方向に近い突起ほど長くする。',{caution:'磁性流体の輪郭を様式化した図形表現。磁場や流体力学のシミュレーションではない。'});
  define('ui-material','glass-crack-recover',box('crack-glass','')+svg(path('crack-lines','M130 77L91 29M130 77L172 33M130 77L196 103M130 77L145 123M130 77L61 105M94 34L75 42M173 92L184 70','fill="none" stroke="#b5e8ee" stroke-width="1.5" pathLength="1" stroke-dasharray="1"')),[
    track('.crack-lines',frames([0,{strokeDashoffset:1,opacity:0}],[.2,{strokeDashoffset:1,opacity:1}],[.3,{strokeDashoffset:0,opacity:1}],[.58,{strokeDashoffset:0,opacity:1}],[.8,{strokeDashoffset:1,opacity:0}],[1,{strokeDashoffset:1,opacity:0}]))
  ],'中心から亀裂線が広がり、逆順に収束して面が修復される。','破損は外向き、修復は内向きの線描画。');
  define('ui-material','neon-tube-draw',svg(path('neon-tube','M38 100V50L70 100V50M90 100V50H118M90 75H114M90 100H120M155 50A17 25 0 1 1 155 100A17 25 0 1 1 155 50M190 100V50L222 100V50','fill="none" stroke="#94fff0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1"')),[track('.neon-tube',draw(.08,.62))],
    '曲がったネオン管の経路に沿って光が進み、文字を描き終える。','線の始点から終点までの描画と、描画済み区間の発光。');
  define('ui-material','chrome-ripple',box('chrome-surface')+node('chrome-ring ring-small')+node('chrome-ring ring-large'),[
    track('.chrome-ring',(i)=>frames([0,{transform:'scale(.05)',opacity:0}],[.18+i*.12,{transform:'scale(.05)',opacity:.9}],[.64+i*.12,{transform:'scale(2)',opacity:0}],[1,{transform:'scale(2)',opacity:0}]))
  ],'クローム風の面に接触点から同心円の反射が広がる。','強弱を付けた輪郭で水面のような波紋を表す。',{caution:'金属反射と波紋を合成したCSS表現。環境の反射や実際の面変形は計算しない。'});
  define('ui-material','clay-icon-morph',node('clay-shape'),[
    track('.clay-shape',frames([0,{borderRadius:'18%',transform:'rotate(0) scale(1)'}],[.2,{borderRadius:'18%',transform:'rotate(0) scale(.88,1.12)'}],[.42,{borderRadius:'50%',transform:'rotate(90deg) scale(1.12,.9)'}],[.57,{borderRadius:'50%',transform:'rotate(90deg) scale(1)'}],[1,{borderRadius:'50%',transform:'rotate(90deg) scale(1)'}]))
  ],'柔らかな角丸の塊が一度つぶれ、回転しながら球状へ変わる。','形の変化の前後に体積を感じるつぶれを置く。');

  // Typography: actual glyph positions, masks, baselines and strokes are animated.
  define('kinetic-type','glyph-slot-roll',Array.from({length:4},(_,i)=>node('slot-window',node('slot-reel',`<span>${['M','O','V','E'][i]}</span><span>${['T','Y','P','E'][i]}</span><span>${['M','O','V','E'][i]}</span>`),`left:${58+i*36}px;top:54px`)).join(''),[
    track('.slot-reel',(i)=>frames([0,{transform:'translateY(0)'}],[.15+i*.06,{transform:'translateY(0)'}],[.48+i*.06,{transform:'translateY(-42px)'}],[1,{transform:'translateY(-42px)'}]))
  ],'窓内の文字列を縦に送り、各文字が時間差で次の単語へ切り替わる。','固定窓の中だけで文字を送って着地位置をそろえる。');
  define('kinetic-type','variable-font-pulse',text('weight-type','WEIGHT','left:25px;top:53px'),[
    track('.weight-type',frames([0,{fontWeight:200,letterSpacing:'3px'}],[.3,{fontWeight:900,letterSpacing:'-1px'}],[.6,{fontWeight:200,letterSpacing:'3px'}],[.82,{fontWeight:650,letterSpacing:'0px'}],[1,{fontWeight:650,letterSpacing:'0px'}]))
  ],'文字の太さを細字から太字へ連続的に変え、同時に字間を整える。','字幅の跳ねを抑えながらストロークの太さを変える。',{caution:'font-weightの補間例。端末のフォントが可変ウェイトに対応しない場合、太さは段階的に切り替わる。'});
  define('kinetic-type','text-path-orbit',svg('<defs><path id="mxe-orbit-text-path" d="M130 27a50 50 0 1 1 -.1 0"/></defs><circle cx="130" cy="77" r="37" fill="none" stroke="#29404a"/><text class="orbit-text stage-object web-motion-object" fill="#a1f3df" font-size="14" letter-spacing="3"><textPath href="#mxe-orbit-text-path" startOffset="0" textLength="312" lengthAdjust="spacing">TYPE ON A PATH · TYPE ON A PATH · </textPath></text>'),[
    track('.orbit-text',frames([0,{transform:'rotate(0deg)'}],[1,{transform:'rotate(360deg)'}]))
  ],'文字を円形のパスに沿わせ、その円を一周させる。','字の向きがパスの接線に沿って変わる。',{duration:6500,recipe:'円形SVGパス → textPathで文字を配置 → 中心を支点に360°回転',recipeEn:'Circular SVG path → place text with textPath → rotate 360° around the center'});
  define('kinetic-type','word-gravity',letters('DROP','drop-letter')+node('type-floor'),[
    track('.drop-letter',(i)=>frames([0,{transform:'translateY(-70px) rotate(-12deg)',opacity:0}],[.12+i*.035,{transform:'translateY(-70px) rotate(-12deg)',opacity:1}],[.31+i*.035,{transform:'translateY(24px) rotate(4deg)',opacity:1}],[.41+i*.035,{transform:'translateY(2px) rotate(-2deg)',opacity:1}],[.5+i*.035,{transform:'translateY(24px) rotate(0deg)',opacity:1}],[1,{transform:'translateY(24px) rotate(0deg)',opacity:1}]))
  ],'文字が上から落下し、床で小さく跳ねて基線上に並ぶ。','落下の加速と跳ね返りの高さを段階的に減らす。');
  define('kinetic-type','character-magnetize',letters('ALIGN','magnet-letter'),[
    track('.magnet-letter',(i)=>frames([0,{transform:`translate(${[21,-15,11,-23,7][i]}px,${[-38,30,-21,36,-29][i]}px) rotate(${[-30,20,15,-15,25][i]}deg)`,opacity:.5}],[.48,{transform:'translate(0,0) rotate(0)',opacity:1}],[1,{transform:'translate(0,0) rotate(0)',opacity:1}]))
  ],'ばらばらの位置と角度にある文字が、共通の基線と字間へ吸着する。','各文字の移動先を固定し、最後に単語として読める状態を作る。');
  define('kinetic-type','line-break-reflow',node('reflow-frame')+['MAKE','IT','MOVE'].map((s,i)=>text(`reflow-word word-${i}`,s,`left:${[33,107,139][i]}px;top:48px`)).join(''),[
    track('.reflow-frame',frames([0,{width:'221px'}],[.12,{width:'221px'}],[.24,{width:'195px'}],[.48,{width:'143px'}],[1,{width:'143px'}])),track('.word-2',frames([0,{transform:'translate(0,0)'}],[.24,{transform:'translate(0,0)'}],[.4,{transform:'translate(-106px,36px)'}],[1,{transform:'translate(-106px,36px)'}]))
  ],'コンテナが狭くなったときに末尾の単語を次行へ移し、改行前後をつなぐ。','各単語の旧位置と新位置を補間して読み順を保つ。',{caution:'固定文の改行前後を補間するデモ。実装ではFLIPなどで実際のレイアウト位置を計測する。'});
  define('kinetic-type','terminal-decode',text('decode-noise','7#Q_2?','left:44px;top:58px')+letters('DECODE','decode-letter'),[
    track('.decode-noise',frames([0,{opacity:1}],[.55,{opacity:0}],[1,{opacity:0}])),track('.decode-letter',(i)=>fade(.15+i*.06,.19+i*.06))
  ],'雑音文字が消え、左から順に正しい文字が確定する。','既に確定した文字を動かさず、未確定領域を減らす。');
  define('kinetic-type','counterweight-headline',node('balance-beam',text('balance-left','LIGHT')+text('balance-right','HEAVY'))+node('balance-pivot'),[
    track('.balance-beam',frames([0,{transform:'rotate(-13deg)'}],[.24,{transform:'rotate(7deg)'}],[.41,{transform:'rotate(-3deg)'}],[.56,{transform:'rotate(0deg)'}],[1,{transform:'rotate(0deg)'}]))
  ],'二つの見出しを天秤の両端に置き、揺れを減らして水平に釣り合わせる。','中央の支点に対して左右の文字が反対方向へ動く。');
  define('kinetic-type','echo-caption',[0,1,2].map(i=>text(`echo-copy echo-${i}`,'ECHO','left:74px;top:56px')).join(''),[
    track('.echo-copy',(i)=>frames([0,{transform:'translateX(-70px)',opacity:0}],[.1+(2-i)*.07,{transform:'translateX(-70px)',opacity:0}],[.36+(2-i)*.07,{transform:'translateX(0)',opacity:i===2?1:.3}],[.61,{transform:'translateX(0)',opacity:i===2?1:0}],[1,{transform:'translateX(0)',opacity:i===2?1:0}]))
  ],'字幕と同形の残像を時間差で追従させ、最後は本文だけを残す。','残像を最終位置で消し、文字を重ねたままにしない。');
  define('kinetic-type','kinetic-kerning',letters('SPACE','kern-letter'),[
    track('.kern-letter',(i)=>frames([0,{transform:`translateX(${(i-2)*13}px)`}],[.44,{transform:'translateX(0)'}],[1,{transform:'translateX(0)'}]))
  ],'広がった文字間隔を中央へ向けて縮め、単語のまとまりを作る。','中央の文字を基準に、両側を対称に移す。');
  define('kinetic-type','vertical-type-cascade',['動','き','の','形'].map((s,i)=>node('vertical-letter',s,`left:114px;top:${12+i*32}px`)).join(''),[
    track('.vertical-letter',(i)=>frames([0,{transform:'translateY(-18px)',opacity:0}],[.12+i*.1,{transform:'translateY(-18px)',opacity:0}],[.28+i*.1,{transform:'translateY(0)',opacity:1}],[1,{transform:'translateY(0)',opacity:1}]))
  ],'縦組みの文字を上から下の順に現し、日本語の読み順を動きで示す。','上の文字が着地し始めてから次の文字を出す。');
  define('kinetic-type','baseline-wave',node('baseline-mask',letters('WAVES','wave-letter')),[
    track('.wave-letter',(i)=>frames([0,{transform:'translateY(44px)'}],[.08+i*.055,{transform:'translateY(44px)'}],[.28+i*.055,{transform:'translateY(-7px)'}],[.4+i*.055,{transform:'translateY(0)'}],[1,{transform:'translateY(0)'}]))
  ],'基線の下に隠した文字を一文字ずつ持ち上げ、波のように出現させる。','文字の出現境界を固定マスクでそろえる。');
  define('kinetic-type','letter-collision',text('collision-a','A','left:66px;top:52px')+text('collision-b','B','left:146px;top:52px'),[
    track('.collision-a',frames([0,{transform:'translateX(-40px) scaleX(1)',easing:'cubic-bezier(.5,0,1,1)'}],[.28,{transform:'translateX(45px) scaleX(1)'}],[.32,{transform:'translateX(47px) scaleX(.88)'}],[.44,{transform:'translateX(36px) scaleX(1)'}],[1,{transform:'translateX(36px) scaleX(1)'}])),
    track('.collision-b',frames([0,{transform:'translateX(0) scaleX(1)'}],[.28,{transform:'translateX(0) scaleX(1)'}],[.32,{transform:'translateX(-2px) scaleX(.88)',easing:'cubic-bezier(.2,.8,.3,1)'}],[.46,{transform:'translateX(42px) scaleX(1)'}],[.57,{transform:'translateX(38px) scaleX(1)'}],[1,{transform:'translateX(38px) scaleX(1)'}]))
  ],'走ってきた文字が隣の文字にぶつかり、受けた側が押し出される。','衝突前に相手を動かさず、接触後に速度を渡す。');
  define('kinetic-type','type-tunnel',[0,1,2,3].map(i=>text('tunnel-copy','TYPE','left:80px;top:54px')).join(''),[
    track('.tunnel-copy',(i)=>frames([0,{transform:`scale(${.25+i*.25})`,opacity:.15+i*.2}],[.55,{transform:`scale(${.7+i*.5})`,opacity:Math.max(0,.8-i*.25)}],[1,{transform:`scale(${.7+i*.5})`,opacity:Math.max(0,.8-i*.25)}]))
  ],'同じ文字を奥から手前へ段階的に拡大し、文字のトンネルを進む感覚を作る。','中心をそろえ、手前の大きな文字ほど薄くする。');
  define('kinetic-type','chapter-index-scrub',node('chapter-window',node('chapter-reel','<span>01</span><span>02</span><span>03</span><span>04</span>'))+node('scrub-track')+dot('scrub-thumb','left:41px;top:119px'),[
    track('.chapter-reel',frames([0,{transform:'translateY(0)'}],[.2,{transform:'translateY(-48px)'}],[.39,{transform:'translateY(-96px)'}],[.58,{transform:'translateY(-144px)'}],[1,{transform:'translateY(-144px)'}])),
    track('.scrub-thumb',frames([0,{transform:'translateX(0)'}],[.58,{transform:'translateX(165px)'}],[1,{transform:'translateX(165px)'}]))
  ],'スクラブ位置の進行に対応して章番号を縦に送る。','つまみの位置と番号の送り量を同じ進行率にする。',{caution:'自動再生でスクラブ位置を模したデモ。実装では入力位置を進行率に変換する。'});
  define('kinetic-type','type-hinge',letters('HINGE','hinge-letter'),[
    track('.hinge-letter',(i)=>frames([0,{transform:'perspective(160px) rotateX(-90deg)',opacity:0}],[.1+i*.045,{transform:'perspective(160px) rotateX(-90deg)',opacity:0}],[.36+i*.045,{transform:'perspective(160px) rotateX(12deg)',opacity:1}],[.46+i*.045,{transform:'perspective(160px) rotateX(0deg)',opacity:1}],[1,{transform:'perspective(160px) rotateX(0deg)',opacity:1}]))
  ],'各文字が上端の蝶番で起き上がり、少し行き過ぎて正面に止まる。','文字ごとに同じ上端支点を使い、読字順に遅らせる。');
  define('kinetic-type','focus-word-explosion',text('focus-main','FOCUS','left:64px;top:55px')+['IDEA','TYPE','MOVE','LOOK'].map((s,i)=>text('focus-satellite',s,'left:105px;top:69px')).join(''),[
    track('.focus-main',frames([0,{transform:'scale(.65)',opacity:.3}],[.29,{transform:'scale(1.12)',opacity:1}],[.42,{transform:'scale(1)',opacity:1}],[1,{transform:'scale(1)',opacity:1}])),
    track('.focus-satellite',(i)=>{const v=[[-74,-45],[77,-42],[-70,43],[71,43]][i];return frames([0,{transform:'translate(0,0) scale(.4)',opacity:0}],[.21,{transform:'translate(0,0) scale(.4)',opacity:0}],[.45,{transform:`translate(${v[0]}px,${v[1]}px) scale(1)`,opacity:.6}],[.7,{transform:`translate(${v[0]*1.15}px,${v[1]*1.15}px) scale(1)`,opacity:0}],[1,{opacity:0}]);})
  ],'中心の注目語が拡大すると同時に、周辺の小さな語が外へ散る。','中央の語は最後に残し、周辺語を減衰させる。');
  define('kinetic-type','mono-data-shuffle',Array.from({length:6},(_,i)=>node('data-slot',node('data-reel',`<span>${i%2}</span><span>${(i+1)%2}</span><span>${i%2}</span><span>${'204826'[i]}</span>`),`left:${38+i*31}px;top:55px`)).join(''),[
    track('.data-reel',(i)=>frames([0,{transform:'translateY(0)'}],[.12+i*.035,{transform:'translateY(0)'}],[.55+i*.035,{transform:'translateY(-108px)'}],[1,{transform:'translateY(-108px)'}]))
  ],'等幅の数字列が各桁ごとに送られ、新しいデータへ確定する。','桁位置を固定し、更新しても周囲の配置を動かさない。');
  define('kinetic-type','stroke-catchup',svg(path('hand-stroke','M35 93C55 25 49 113 67 86S82 64 87 86S103 50 110 72S117 105 133 85S149 61 154 80S176 92 182 69S184 103 218 70','fill="none" stroke="#a5f3de" stroke-width="3" stroke-linecap="round" pathLength="1" stroke-dasharray="1"')),[track('.hand-stroke',draw(.12,.68))],
    '一筆書きの曲線を始点からたどり、手書き風の線を描き終える。','一定距離ごとの線の出現で筆の進行を見せる。');
  define('kinetic-type','headline-ribbon',node('ribbon-fold fold-left')+node('headline-ribbon','MAKE IT MOVE')+node('ribbon-fold fold-right'),[
    track('.headline-ribbon',frames([0,{transform:'scaleX(0)'}],[.36,{transform:'scaleX(1)'}],[1,{transform:'scaleX(1)'}])),
    track('.ribbon-fold',(i)=>frames([0,{transform:`perspective(200px) rotateY(${i?-100:100}deg)`,opacity:0}],[.28,{transform:`perspective(200px) rotateY(${i?-100:100}deg)`,opacity:0}],[.48,{transform:'perspective(200px) rotateY(0)',opacity:1}],[1,{transform:'perspective(200px) rotateY(0)',opacity:1}]))
  ],'見出しの帯を中央から伸ばし、左右の折り返しを最後に開く。','前面の文字帯と背面の折り返しを順に展開する。');

  // Impact FX: one event per cycle; long readable rests avoid repeated flashing.
  const combatScene = () => node('combat-floor')+node('impact-attacker','◆')+node('impact-target','■');
  define('game-impact-fx','hit-stop',combatScene()+text('hitstop-label','CONTACT / HOLD','left:65px;top:24px'),[
    track('.impact-attacker',frames([0,{transform:'translateX(0)'}],[.12,{transform:'translateX(0)'}],[.29,{transform:'translateX(81px)'}],[.43,{transform:'translateX(81px)'}],[.6,{transform:'translateX(105px)'}],[1,{transform:'translateX(105px)'}])),
    track('.impact-target',frames([0,{transform:'translateX(0)'}],[.43,{transform:'translateX(0)'}],[.6,{transform:'translateX(36px) rotate(15deg)'}],[1,{transform:'translateX(36px) rotate(15deg)'}])),track('.hitstop-label',frames([0,{opacity:0}],[.285,{opacity:0}],[.29,{opacity:1}],[.43,{opacity:1}],[.44,{opacity:0}],[1,{opacity:0}]))
  ],'攻撃が命中した瞬間に双方の移動を止め、短い停止の後に相手を押し出す。','命中直後の同じ位置が続く停止区間。',{duration:4000,reducedProgress:.75,caution:'停止の構造を読めるよう保持時間を長めにしたデモ。実ゲームでは数フレームに調整し、操作受付と分けて管理する。'});
  define('game-impact-fx','shockwave-type',text('shock-type','BOOM','left:70px;top:53px')+rings(),[
    track('.shock-type',frames([0,{transform:'scale(.7)',opacity:0}],[.22,{transform:'scale(.7)',opacity:0}],[.28,{transform:'scale(1.18)',opacity:1}],[.43,{transform:'scale(1)',opacity:1}],[1,{transform:'scale(1)',opacity:1}])),track('.ring-a',pulse(.27)),track('.ring-b',pulse(.35))
  ],'文字が着地した瞬間を起点に、外向きの衝撃波が広がる。','文字の最大サイズの直後に波を広げる。');
  define('game-impact-fx','slash-reveal',text('slash-title','SLASH','left:66px;top:54px')+node('slash-line'),[
    track('.slash-title',frames([0,{clipPath:'polygon(0 0,0 0,0 100%,0 100%)'}],[.23,{clipPath:'polygon(0 0,0 0,0 100%,0 100%)'}],[.4,{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}],[1,{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'}])),
    track('.slash-line',frames([0,{transform:'translateX(-120px) rotate(-25deg)',opacity:0}],[.2,{transform:'translateX(-120px) rotate(-25deg)',opacity:0}],[.24,{transform:'translateX(-95px) rotate(-25deg)',opacity:1}],[.43,{transform:'translateX(125px) rotate(-25deg)',opacity:0}],[1,{opacity:0,transform:'translateX(125px) rotate(-25deg)'}]))
  ],'斜めの斬撃線が通過した部分から文字が現れる。','斬撃の通過位置と表示マスクの境界を同期させる。');
  define('game-impact-fx','freeze-color-drain',node('freeze-world',node('freeze-player','◆')+node('freeze-orb','●')+node('freeze-block','■'))+text('freeze-label','PAUSED','left:90px;top:112px'),[
    track('.freeze-world',frames([0,{transform:'translateX(-35px)',filter:'saturate(1)'}],[.3,{transform:'translateX(0)',filter:'saturate(1)'}],[.34,{transform:'translateX(0)',filter:'saturate(0)'}],[1,{transform:'translateX(0)',filter:'saturate(0)'}])),track('.freeze-label',fade(.3,.34))
  ],'移動中の構図を止めると同時に色を抜き、停止した瞬間を強調する。','位置の停止と彩度の低下を重ねる。');
  define('game-impact-fx','combo-heat',node('heat-meter',node('heat-fill'))+['1 HIT','3 HIT','6 HIT'].map((s,i)=>text(`heat-number heat-${i}`,s,'left:71px;top:47px')).join(''),[
    track('.heat-fill',frames([0,{transform:'scaleX(.167)',backgroundColor:'#64c9c1'}],[.3,{transform:'scaleX(.167)',backgroundColor:'#64c9c1'}],[.36,{transform:'scaleX(.5)',backgroundColor:'#f2bf78'}],[.6,{transform:'scaleX(.5)',backgroundColor:'#f2bf78'}],[.66,{transform:'scaleX(1)',backgroundColor:'#ff7969'}],[1,{transform:'scaleX(1)',backgroundColor:'#ff7969'}])),
    ...[[0,.3],[.3,.6],[.6,1]].map(([on,off],i)=>track(`.heat-${i}`,frames([0,{opacity:on===0?1:0,transform:'scale(1)'}],...(on>0?[[on,{opacity:0,transform:'scale(1)'}],[on+.005,{opacity:1,transform:'scale(1.25)'}],[on+.06,{opacity:1,transform:'scale(1)'}]]:[]),...(off<1?[[off,{opacity:1,transform:'scale(1)'}],[off+.005,{opacity:0,transform:'scale(1)'}]]:[]),[1,{opacity:off<1?0:1,transform:'scale(1)'}])))
  ],'コンボ数の増加に合わせてゲージが伸び、寒色から暖色へ変わる。','数値の段階と熱量の高さを対応させる。');
  define('game-impact-fx','edge-damage',node('damage-vignette')+node('hud-center','HP 24')+node('mxe-crosshair'),[
    track('.damage-vignette',frames([0,{opacity:0}],[.17,{opacity:0}],[.24,{opacity:.9}],[.36,{opacity:.28}],[.7,{opacity:0}],[1,{opacity:0}]))
  ],'画面の端だけを赤く脈動させ、中央の視認性を保ったまま被弾を伝える。','最大の赤い縁からゆっくり減衰させる。',{reducedProgress:.25});
  define('game-impact-fx','armor-crack',node('armor-plate')+svg(['M130 77L100 38','M130 77L168 44','M130 77L164 108','M130 77L106 122','M130 77L84 82'].map(d=>path('armor-line armor-main',d,'fill="none" stroke="#fac497" stroke-width="2" stroke-linecap="round" pathLength="1" stroke-dasharray="1"')).join('')+['M115 57.5L118 36','M147 92.5L172 86'].map(d=>path('armor-line armor-sub',d,'fill="none" stroke="#fac497" stroke-width="1.5" stroke-linecap="round" pathLength="1" stroke-dasharray="1"')).join(''))+dot('armor-impact','left:124px;top:71px'),[track('.armor-main',draw(.22,.32)),track('.armor-sub',draw(.27,.36)),track('.armor-impact',pulse(.2))],
    '装甲の命中点から枝分かれする亀裂が一気に広がる。','亀裂の全ての枝を一つの衝撃点へ接続する。');
  define('game-impact-fx','critical-compress',node('critical-world',node('critical-mark','✦')+node('critical-lines'))+text('critical-title','CRITICAL','left:48px;top:112px'),[
    track('.critical-world',frames([0,{transform:'scale(1)'}],[.23,{transform:'scale(.72,1.2)'}],[.3,{transform:'scale(1.15,.88)'}],[.43,{transform:'scale(1)'}],[1,{transform:'scale(1)'}])),track('.critical-title',fade(.27,.32))
  ],'画面内の対象を横に圧縮してから広げ、強い命中の瞬間を作る。','圧縮・反発・復元の順に全体を同時変形させる。',{title:'クリティカル画面圧縮',titleEn:'Critical Screen Compression',caution:'レンズの実挙動ではなく、画面の非等方スケールによるインパクト表現。'});
  define('game-impact-fx','phase-shatter',Array.from({length:6},(_,i)=>node('phase-shard',String(i+1),`left:${70+i%3*40}px;top:${37+Math.floor(i/3)*40}px`)).join('')+text('phase-next','PHASE 02','left:58px;top:61px'),[
    track('.phase-shard',(i)=>frames([0,{transform:'translate(0,0) rotate(0)',opacity:1}],[.23,{transform:'translate(0,0) rotate(0)',opacity:1}],[.57,{transform:`translate(${(i%3-1)*90}px,${(Math.floor(i/3)-.5)*140}px) rotate(${(i-2)*26}deg)`,opacity:0}],[1,{opacity:0,transform:`translate(${(i%3-1)*90}px,${(Math.floor(i/3)-.5)*140}px)`}])),track('.phase-next',fade(.46,.66))
  ],'現在フェーズの面が分割されて外へ散り、次のフェーズ名が現れる。','破片の退場が進んでから次のラベルを読ませる。');
  define('game-impact-fx','speedline-tunnel',Array.from({length:12},(_,i)=>node('speed-ray','',`--angle:${i*30}deg`)).join('')+text('speed-word','RUSH','left:78px;top:60px'),[
    track('.speed-ray',(i)=>frames([0,{transform:`rotate(${i*30}deg) translateY(-20px) scaleY(.15)`,opacity:0}],[.18,{transform:`rotate(${i*30}deg) translateY(-20px) scaleY(.15)`,opacity:.5}],[.5,{transform:`rotate(${i*30}deg) translateY(-62px) scaleY(1.5)`,opacity:.8}],[.7,{transform:`rotate(${i*30}deg) translateY(-90px) scaleY(1.7)`,opacity:0}],[1,{opacity:0}])),track('.speed-word',frames([0,{transform:'scale(.7)'}],[.5,{transform:'scale(1.15)'}],[.7,{transform:'scale(1)'}],[1,{transform:'scale(1)'}]))
  ],'消失点の周囲の線が外へ伸び、前進するスピード感を作る。','線の角度を保ちながら中心から遠ざける。');
  define('game-impact-fx','parry-time-slice',node('parry-blade blade-a')+node('parry-blade blade-b')+node('parry-spark','✦'),[
    track('.blade-a',frames([0,{transform:'translateX(-45px) rotate(-35deg)'}],[.28,{transform:'translateX(0) rotate(-35deg)'}],[.43,{transform:'translateX(0) rotate(-35deg)'}],[.62,{transform:'translateX(-55px) rotate(-65deg)'}],[1,{transform:'translateX(-55px) rotate(-65deg)'}])),
    track('.blade-b',frames([0,{transform:'translateX(45px) rotate(35deg)'}],[.28,{transform:'translateX(0) rotate(35deg)'}],[.43,{transform:'translateX(0) rotate(35deg)'}],[.62,{transform:'translateX(45px) rotate(65deg)'}],[1,{transform:'translateX(45px) rotate(65deg)'}])),track('.parry-spark',frames([0,{opacity:0,transform:'scale(.3)'}],[.28,{opacity:0,transform:'scale(.3)'}],[.3,{opacity:1,transform:'scale(1)'}],[.43,{opacity:1,transform:'scale(1)'}],[.59,{opacity:0,transform:'scale(1.3)'}],[1,{opacity:0}]))
  ],'交差する二本の刃を接触時に止め、火花を残して互いに弾く。','接触・短い停止・反対方向への離反。',{reducedProgress:.36});
  define('game-impact-fx','element-burst',node('element-core','✦')+Array.from({length:8},(_,i)=>dot('element-particle',`left:125px;top:72px;--tone:${i%2?'#ffad76':'#88deef'}`)).join(''),[
    track('.element-particle',(i)=>{const a=i*Math.PI/4;return frames([0,{transform:'translate(0,0) scale(.3)',opacity:0}],[.25,{transform:'translate(0,0) scale(.3)',opacity:0}],[.3,{transform:'translate(0,0) scale(.5)',opacity:1}],[.59,{transform:`translate(${Math.cos(a)*77}px,${Math.sin(a)*55}px) scale(1)`,opacity:0}],[1,{opacity:0}]);}),track('.element-core',frames([0,{transform:'scale(.75)'}],[.28,{transform:'scale(1.4)'}],[.42,{transform:'scale(1)'}],[1,{transform:'scale(1)'}]))
  ],'二属性の色を持つ粒が同じ衝撃点から交互に放射する。','発生源とタイミングを共有し、色で属性を分ける。');
  define('game-impact-fx','camera-kick',node('kick-world',node('kick-grid')+node('kick-target','TARGET'))+node('kick-hud','+  AMMO 08'),[
    track('.kick-world',frames([0,{transform:'translateY(0) rotate(0)'}],[.21,{transform:'translateY(0) rotate(0)'}],[.24,{transform:'translateY(10px) rotate(-2deg)'}],[.38,{transform:'translateY(-3px) rotate(.6deg)'}],[.51,{transform:'translateY(0) rotate(0)'}],[1,{transform:'translateY(0) rotate(0)'}]))
  ],'背景とターゲットに一方向の反動を与え、手前のHUDは固定する。','画面内の世界だけを動かし、照準情報を安定させる。');
  define('game-impact-fx','afterimage-dash',[0,1,2,3].map(i=>node(`dash-body dash-${i}`,'◆')).join(''),[
    track('.dash-body',(i)=>frames([0,{transform:'translateX(0)',opacity:i===3?1:0}],[.18+(3-i)*.035,{transform:'translateX(0)',opacity:i===3?1:0}],[.35+(3-i)*.035,{transform:'translateX(142px)',opacity:i===3?1:.35}],[.61,{transform:'translateX(142px)',opacity:i===3?1:0}],[1,{transform:'translateX(142px)',opacity:i===3?1:0}]))
  ],'高速移動する本体の通過経路を時間差の残像で示す。','本体の後ろへ残像を置き、停止後に残像だけを消す。');
  define('game-impact-fx','victory-hold',node('victory-rule')+text('victory-word','VICTORY','left:43px;top:55px'),[
    track('.victory-word',frames([0,{transform:'scale(1.8)',opacity:0}],[.2,{transform:'scale(1.8)',opacity:0}],[.29,{transform:'scale(.94)',opacity:1}],[.39,{transform:'scale(1)',opacity:1}],[1,{transform:'scale(1)',opacity:1}])),track('.victory-rule',frames([0,{transform:'scaleX(0)'}],[.29,{transform:'scaleX(0)'}],[.45,{transform:'scaleX(1)'}],[1,{transform:'scaleX(1)'}]))
  ],'勝利タイトルを一度強く着地させ、長い静止で結果を読ませる。','着地の短さと、その後の静止の長さを対比する。',{duration:5200});
  define('game-impact-fx','loot-beam',node('loot-floor')+node('loot-beam')+node('loot-object','◆'),[
    track('.loot-beam',frames([0,{transform:'scaleY(0)',opacity:0}],[.25,{transform:'scaleY(0)',opacity:0}],[.48,{transform:'scaleY(1)',opacity:.8}],[.62,{transform:'scaleY(1)',opacity:.55}],[1,{transform:'scaleY(1)',opacity:.55}])),track('.loot-object',frames([0,{transform:'translateY(0)',opacity:0}],[.2,{transform:'translateY(0)',opacity:0}],[.47,{transform:'translateY(-14px)',opacity:1}],[.65,{transform:'translateY(-10px)',opacity:1}],[1,{transform:'translateY(-10px)',opacity:1}]))
  ],'地面の獲得物から上へ光柱を立て、ドロップ位置を遠目に示す。','光柱の根元を獲得物の位置へ固定する。');
  define('game-impact-fx','warning-stripe',node('warning-strip strip-top')+node('warning-strip strip-bottom')+text('warning-word','WARNING','left:45px;top:60px'),[
    track('.strip-top',frames([0,{transform:'translateX(-260px)'}],[.31,{transform:'translateX(0)'}],[1,{transform:'translateX(0)'}])),track('.strip-bottom',frames([0,{transform:'translateX(260px)'}],[.31,{transform:'translateX(0)'}],[1,{transform:'translateX(0)'}])),track('.warning-word',fade(.3,.38))
  ],'上下の警告帯を左右の逆方向から入れ、中央の文字を挟む。','帯が着地してから警告文を出す。');
  define('game-impact-fx','shield-recharge',svg('<circle cx="130" cy="77" r="48" fill="none" stroke="#29384b" stroke-width="7"/>'+`<circle class="shield-arc stage-object web-motion-object" cx="130" cy="77" r="48" fill="none" stroke="#84e7ea" stroke-width="7" pathLength="1" stroke-dasharray="1" transform="rotate(-90 130 77)"/>`)+node('shield-symbol','◇'),[
    track('.shield-arc',draw(.1,.67)),track('.shield-symbol',frames([0,{opacity:.35}],[.67,{opacity:.35}],[.73,{opacity:1}],[1,{opacity:1}]))
  ],'円周を一周する充填スイープが終わると、中央の盾が有効になる。','円の完了と盾の点灯を同じ状態へつなぐ。');
  define('game-impact-fx','mission-stamp',box('mission-sheet','MISSION 07')+node('mission-stamp','CLEARED'),[
    track('.mission-stamp',frames([0,{transform:'scale(2) rotate(-12deg)',opacity:0}],[.23,{transform:'scale(2) rotate(-12deg)',opacity:0}],[.32,{transform:'scale(.93) rotate(-8deg)',opacity:1}],[.41,{transform:'scale(1) rotate(-8deg)',opacity:1}],[1,{transform:'scale(1) rotate(-8deg)',opacity:1}]))
  ],'ミッション面の上へ完了印が手前から押し込まれ、印字が残る。','印の縮小を着地で止め、結果を消さずに残す。');
  define('game-impact-fx','finisher-cut',node('finisher-slice slice-top','FINISH')+node('finisher-slice slice-bottom','FINISH')+node('finisher-cutline'),[
    track('.slice-top',frames([0,{transform:'translateX(-180px)'}],[.32,{transform:'translateX(0)'}],[1,{transform:'translateX(0)'}])),track('.slice-bottom',frames([0,{transform:'translateX(180px)'}],[.32,{transform:'translateX(0)'}],[1,{transform:'translateX(0)'}])),track('.finisher-cutline',frames([0,{transform:'scaleX(0)',opacity:0}],[.32,{transform:'scaleX(0)',opacity:1}],[.41,{transform:'scaleX(1)',opacity:1}],[.57,{transform:'scaleX(1)',opacity:0}],[1,{opacity:0}]))
  ],'上下に分けた決着タイトルが逆方向から合流し、境界を斬撃線が走る。','分割した文字の上下を同時に定位置へそろえる。');

  // Data stories: geometry communicates sample values, not arbitrary decoration.
  define('data-story','sankey-flow',svg('<rect x="28" y="42" width="10" height="70" fill="#88e7d2"/><rect x="222" y="25" width="10" height="42" fill="#88e7d2"/><rect x="222" y="97" width="10" height="28" fill="#b3a4f7"/>'+path('sankey-upper','M38 63C125 63 133 46 222 46','fill="none" stroke="#88e7d2" stroke-opacity=".5" stroke-width="42" pathLength="1" stroke-dasharray="1"')+path('sankey-lower','M38 98C125 98 133 111 222 111','fill="none" stroke="#b3a4f7" stroke-opacity=".5" stroke-width="28" pathLength="1" stroke-dasharray="1"')+'<g fill="#d7e6ec" font-size="10" font-family="monospace"><text x="18" y="31">100</text><text x="218" y="17">60</text><text x="218" y="140">40</text></g>'),[
    track('.sankey-upper',draw(.1,.57)),track('.sankey-lower',draw(.17,.64))
  ],'合計100の流れを太さ60:40で二つの行き先へ分岐させる。','流れの帯幅と数値を一致させ、入口と出口の合計を保つ。');
  define('data-story','odometer-cascade',Array.from({length:3},(_,i)=>node('metric-window',node('metric-reel',Array.from({length:[2,3,9][i]},(_,n)=>`<span>${n}</span>`).join('')),`left:${57+i*40}px;top:46px`)).join('')+text('metric-unit','K','left:181px;top:52px'),[
    track('.metric-reel',(i)=>frames([0,{transform:'translateY(0)'}],[.1+i*.06,{transform:'translateY(0)'}],[.52+i*.06,{transform:`translateY(${-48*[1,2,8][i]}px)`}],[1,{transform:`translateY(${-48*[1,2,8][i]}px)`}]))
  ],'指標の各桁を縦に回し、128Kで順番に停止する。','桁位置を固定し、下位桁ほど長く回す。');
  define('data-story','threshold-wave',axis+svg('<path d="M31 60H232" fill="none" stroke="#efb179" stroke-dasharray="4 4"/>'+path('threshold-line','M32 107L66 97L100 88L134 67L168 48L203 39L230 29','fill="none" stroke="#8bdfd5" stroke-width="3" pathLength="1" stroke-dasharray="1"'))+node('threshold-ring')+text('threshold-label','LIMIT','left:37px;top:37px'),[
    track('.threshold-line',draw(.08,.65)),track('.threshold-ring',pulse(.4))
  ],'上昇する値が閾値線を超える交点から波を出して警告する。','線全体ではなく閾値を通過した地点を強調する。');
  define('data-story','confidence-fog',axis+svg('<path d="M32 103L71 88L109 93L138 76" fill="none" stroke="#91e6d8" stroke-width="3"/>'+path('confidence-band','M138 76L180 34L225 20L225 105L180 88Z','fill="#8ab4f5" fill-opacity=".2"')+path('forecast-line','M138 76L180 61L225 50','fill="none" stroke="#a9c5fa" stroke-width="2" stroke-dasharray="4 4"'))+text('forecast-label','FORECAST','left:160px;top:119px'),[
    track('.confidence-band',frames([0,{clipPath:'inset(0 100% 0 0)',opacity:0}],[.2,{clipPath:'inset(0 100% 0 0)',opacity:0}],[.6,{clipPath:'inset(0 0% 0 0)',opacity:1}],[1,{clipPath:'inset(0 0% 0 0)',opacity:1}])),track('.forecast-line',fade(.25,.55))
  ],'実測線の先に予測線と幅のある不確実性帯を表示する。','未来ほど帯を広くし、実測は実線・予測は破線で分ける。');
  define('data-story','signal-pulse-map',svg('<path d="M26 57L71 25L113 47L163 22L227 57L218 102L164 130L118 116L59 132L30 98Z" fill="#102029" stroke="#294551"/><path d="M76 47L167 90L200 50" fill="none" stroke="#35515c"/>')+[[76,47],[167,90],[200,50]].map(([x,y])=>dot('signal-point',`left:${x-4}px;top:${y-4}px`)+node('signal-ring','',`left:${x-15}px;top:${y-15}px`)).join(''),[
    track('.signal-ring',(i)=>pulse(.12+i*.15))
  ],'地図上の観測点が時間差で発信し、データが届く位置を示す。','地理的な位置を固定して、その場から波を広げる。',{reducedProgress:.43});
  define('data-story','delta-split',text('delta-a','40','left:53px;top:48px')+text('delta-b','64','left:160px;top:48px')+node('delta-bar-a')+node('delta-bar-b')+text('delta-label','+24','left:109px;top:15px'),[
    track('.delta-bar-a',frames([0,{transform:'scaleY(0)'}],[.42,{transform:'scaleY(1)'}],[1,{transform:'scaleY(1)'}])),track('.delta-bar-b',frames([0,{transform:'scaleY(0)'}],[.57,{transform:'scaleY(1)'}],[1,{transform:'scaleY(1)'}])),track('.delta-label',fade(.55,.65))
  ],'二つの値を共通の基準線から伸ばし、差分24を後から表示する。','40と64の高さの比率を保って比較する。');
  define('data-story','timeline-trail',svg('<path d="M30 93L78 83L121 101L162 49L220 34" fill="none" stroke="#233846" stroke-width="2"/>'+path('timeline-drawn','M30 93L78 83L121 101L162 49L220 34','fill="none" stroke="#8ae9d8" stroke-width="3" pathLength="1" stroke-dasharray="1"'))+dot('timeline-head','left:25px;top:88px'),[
    track('.timeline-drawn',draw(.1,.68)),track('.timeline-head',frames([0,{transform:'translate(0,0)'}],[.1,{transform:'translate(0,0)'}],[.24,{transform:'translate(48px,-10px)'}],[.37,{transform:'translate(91px,8px)'}],[.52,{transform:'translate(132px,-44px)'}],[.68,{transform:'translate(190px,-59px)'}],[1,{transform:'translate(190px,-59px)'}]))
  ],'時間位置を示す点が折れ線をたどり、通過した区間を残す。','現在点と既読区間の終点を同じ位置にする。');
  define('data-story','topology-bloom',svg(path('topology-links','M130 77L57 42M130 77L207 39M130 77L202 120M130 77L55 118','fill="none" stroke="#6e9d9c" stroke-width="1.5" pathLength="1" stroke-dasharray="1"'))+node('topology-hub','A')+['B','C','D','E'].map((s,i)=>node('topology-node',s,`left:${[45,195,190,43][i]}px;top:${[30,27,108,106][i]}px`)).join(''),[
    track('.topology-links',draw(.15,.4)),track('.topology-node',(i)=>fade(.3+i*.055,.42+i*.055))
  ],'中心ノードから接続線を伸ばし、各端点に接続先ノードを表示する。','線の到達後にノードを出し、関係から情報へ視線を導く。');
  define('data-story','milestone-firefly',node('milestone-track')+node('milestone-fill')+[0,1,2,3].map(i=>dot('milestone-dot',`left:${35+i*61}px;top:71px`)).join('')+dot('milestone-firefly','left:33px;top:69px')+text('milestone-value','75%','left:97px;top:101px'),[
    track('.milestone-fill',frames([0,{transform:'scaleX(0)'}],[.62,{transform:'scaleX(.75)'}],[1,{transform:'scaleX(.75)'}])),track('.milestone-firefly',frames([0,{transform:'translateX(0)'}],[.62,{transform:'translateX(137px)'}],[1,{transform:'translateX(137px)'}])),track('.milestone-value',fade(.6,.7))
  ],'光点が進捗バーの先端を進み、75%の地点で止まる。','移動する光点と実際のバーの終端を一致させる。');
  define('data-story','heatmap-ripple',Array.from({length:35},(_,i)=>node('heatmap-cell','',`left:${36+i%7*27}px;top:${21+Math.floor(i/7)*24}px;--heat:${[.18,.4,.72,.9,.65,.32,.2][i%7]}`)).join(''),[
    track('.heatmap-cell',(i)=>{const d=Math.abs(i%7-3)+Math.abs(Math.floor(i/7)-2);return frames([0,{transform:'scale(1)',outlineColor:'transparent'}],[.12+d*.045,{transform:'scale(1)',outlineColor:'transparent'}],[.2+d*.045,{transform:'scale(1.15)',outlineColor:'#b1fff0'}],[.34+d*.045,{transform:'scale(1)',outlineColor:'transparent'}],[1,{transform:'scale(1)',outlineColor:'transparent'}]);})
  ],'注目セルを中心に周囲へハイライトが伝播し、元の濃淡へ戻る。','データの色を変えず輪郭とサイズで注目領域を示す。');
  define('data-story','stream-breathe',svg(path('stream-one','M25 77Q77 27 130 53Q182 80 235 64L235 77Q182 65 130 77Q77 89 25 77Z','fill="#76bbae" fill-opacity=".8"')+path('stream-two','M25 77Q77 89 130 77Q182 65 235 77L235 96Q182 120 130 107Q77 125 25 77Z','fill="#8d8fc3" fill-opacity=".8"')),[
    track('.stream-one',frames([0,{d:'path("M25 77Q77 27 130 53Q182 80 235 64L235 77Q182 65 130 77Q77 89 25 77Z")'}],[.4,{d:'path("M25 77Q77 30 130 45Q182 65 235 50L235 77Q182 95 130 77Q77 64 25 77Z")'}],[.75,{d:'path("M25 77Q77 27 130 53Q182 80 235 64L235 77Q182 65 130 77Q77 89 25 77Z")'}],[1,{d:'path("M25 77Q77 27 130 53Q182 80 235 64L235 77Q182 65 130 77Q77 89 25 77Z")'}])),
    track('.stream-two',frames([0,{d:'path("M25 77Q77 89 130 77Q182 65 235 77L235 96Q182 120 130 107Q77 125 25 77Z")'}],[.4,{d:'path("M25 77Q77 64 130 77Q182 95 235 77L235 108Q182 130 130 112Q77 98 25 77Z")'}],[.75,{d:'path("M25 77Q77 89 130 77Q182 65 235 77L235 96Q182 120 130 107Q77 125 25 77Z")'}],[1,{d:'path("M25 77Q77 89 130 77Q182 65 235 77L235 96Q182 120 130 107Q77 125 25 77Z")'}]))
  ],'二つの流れの帯が共有境界付近で幅を変え、構成の変化を表す。','帯として連続した形を保ち、棒グラフへ置き換えない。',{caution:'帯形状の変化を説明する架空データ。実装時は共通境界を再計算し、積み上げ面積を実値へ対応させる。'});
  define('data-story','rank-ladder',['A · 82','B · 76','C · 90'].map((s,i)=>box(`rank-row rank-${i}`,s,`top:${27+i*36}px`)).join(''),[
    track('.rank-2',frames([0,{transform:'translate(0,0)',borderColor:'#344653'}],[.22,{transform:'translate(13px,0)',borderColor:'#91efd3'}],[.5,{transform:'translate(13px,-72px)',borderColor:'#91efd3'}],[.63,{transform:'translate(0,-72px)',borderColor:'#91efd3'}],[1,{transform:'translate(0,-72px)',borderColor:'#91efd3'}])),
    track('.rank-0',frames([0,{transform:'translateY(0)'}],[.22,{transform:'translateY(0)'}],[.5,{transform:'translateY(36px)'}],[1,{transform:'translateY(36px)'}])),track('.rank-1',frames([0,{transform:'translateY(0)'}],[.22,{transform:'translateY(0)'}],[.5,{transform:'translateY(36px)'}],[1,{transform:'translateY(36px)'}]))
  ],'90点へ更新した項目Cを一位へ移し、元の一位と二位を下げる。','追い越す項目を横へ少し避け、順位の変化を見失わせない。');
  define('data-story','cluster-merge',Array.from({length:12},(_,i)=>dot('cluster-dot',`left:${i<6?49+i%3*17:165+i%3*17}px;top:${46+Math.floor(i%6/3)*29}px;--tone:${i<6?'#8be6d4':'#b6a7f4'}`)).join('')+text('cluster-label','12 ITEMS','left:102px;top:100px'),[
    track('.cluster-dot',(i)=>{const t=`translate(${i<6?34:-31}px,${i%6<3?6:-6}px)`;return frames([0,{transform:'translate(0,0)'}],[.14,{transform:'translate(0,0)'}],[.52,{transform:t}],[1,{transform:t}]);}),track('.cluster-label',fade(.5,.64))
  ],'二つの点群を中央へ移し、色と点数を維持したまま一群にまとめる。','合流しても元の所属と総数が分かる色を残す。');
  define('data-story','event-domino',['IN','RUN','SAVE','OUT'].map((s,i)=>box('event-card',s,`left:${27+i*55}px;top:50px`)).join(''),[
    track('.event-card',(i)=>frames([0,{transform:'perspective(180px) rotateY(-72deg)',opacity:.25}],[.13+i*.12,{transform:'perspective(180px) rotateY(-72deg)',opacity:.25}],[.26+i*.12,{transform:'perspective(180px) rotateY(8deg)',opacity:1}],[.34+i*.12,{transform:'perspective(180px) rotateY(0deg)',opacity:1}],[1,{transform:'perspective(180px) rotateY(0deg)',opacity:1}]))
  ],'処理イベントのカードが左から順に起き上がり、連鎖した因果を表す。','前段が確定した後に次段を開始する時間差。');
  define('data-story','kpi-relay',['72','128','96'].map((s,i)=>box(`kpi-box kpi-${i}`,`<small>${['VIEW','CLICK','SAVE'][i]}</small>${s}`,`left:${27+i*70}px;top:47px`)).join(''),[
    track('.kpi-box',(i)=>frames([0,{borderColor:'#263b49',backgroundColor:'#101a24'}],[.1+i*.2,{borderColor:'#263b49',backgroundColor:'#101a24'}],[.18+i*.2,{borderColor:'#9ef3dc',backgroundColor:'#24473f'}],[.31+i*.2,{borderColor:'#9ef3dc',backgroundColor:'#24473f'}],[.39+i*.2,{borderColor:'#263b49',backgroundColor:'#101a24'}],[1,{borderColor:'#263b49',backgroundColor:'#101a24'}]))
  ],'三つの指標を左から順に照らし、値を動かさず注目先だけを渡す。','スポットライトの移動と指標の位置を分離する。',{reducedProgress:.5});
  define('data-story','budget-bloom',svg('<circle cx="130" cy="77" r="45" fill="none" stroke="#1e303b" stroke-width="18"/>'+`<circle class="budget-a stage-object web-motion-object" cx="130" cy="77" r="45" fill="none" stroke="#8be4d2" stroke-width="18" pathLength="100" stroke-dasharray="50 100" transform="rotate(-90 130 77)"/><circle class="budget-b stage-object web-motion-object" cx="130" cy="77" r="45" fill="none" stroke="#aaa1ed" stroke-width="18" pathLength="100" stroke-dasharray="30 100" transform="rotate(90 130 77)"/><circle class="budget-c stage-object web-motion-object" cx="130" cy="77" r="45" fill="none" stroke="#e9b680" stroke-width="18" pathLength="100" stroke-dasharray="20 100" transform="rotate(198 130 77)"/>`)+text('budget-total','100','left:104px;top:61px'),[
    track('.budget-a',frames([0,{strokeDasharray:'0 100'}],[.4,{strokeDasharray:'50 100'}],[1,{strokeDasharray:'50 100'}])),track('.budget-b',frames([0,{strokeDasharray:'0 100'}],[.2,{strokeDasharray:'0 100'}],[.52,{strokeDasharray:'30 100'}],[1,{strokeDasharray:'30 100'}])),track('.budget-c',frames([0,{strokeDasharray:'0 100'}],[.38,{strokeDasharray:'0 100'}],[.62,{strokeDasharray:'20 100'}],[1,{strokeDasharray:'20 100'}]))
  ],'予算を50・30・20の三つの円弧に分け、全周100まで順に満たす。','円弧の長さで割合を示し、合計を一周に一致させる。');
  define('data-story','calendar-density',Array.from({length:28},(_,i)=>node('calendar-cell',String(i+1),`left:${37+i%7*27}px;top:${24+Math.floor(i/7)*27}px;--density:${[.08,.3,.6,.16,.8,.45,.1][i%7]}`)).join(''),[
    track('.calendar-cell',(i)=>frames([0,{opacity:.18,transform:'translateY(5px)'}],[.1+Math.floor(i/7)*.12,{opacity:.18,transform:'translateY(5px)'}],[.24+Math.floor(i/7)*.12,{opacity:1,transform:'translateY(0)'}],[1,{opacity:1,transform:'translateY(0)'}]))
  ],'日ごとの件数を背景の濃淡で示し、週ごとにカレンダーを公開する。','週の単位で展開し、日付の配置を維持する。');
  define('data-story','queue-compress',['01','02','03','04'].map((s,i)=>box(`queue-item queue-${i}`,s,`left:${31+i*52}px;top:56px`)).join('')+text('queue-label','PROCESS → DONE','left:70px;top:112px'),[
    track('.queue-0',frames([0,{transform:'translateY(0)',opacity:1}],[.2,{transform:'translateY(0)',opacity:1}],[.38,{transform:'translateY(-40px)',opacity:0}],[1,{transform:'translateY(-40px)',opacity:0}])),
    ...[1,2,3].map(i=>track(`.queue-${i}`,frames([0,{transform:'translateX(0)'}],[.33,{transform:'translateX(0)'}],[.57,{transform:'translateX(-52px)'}],[1,{transform:'translateX(-52px)'}])))
  ],'処理済みの先頭項目が抜け、残るキューが一枠ずつ前へ詰まる。','退場が済んでから隣の項目を移動させる。');
  define('data-story','sentiment-spectrum',node('sentiment-track')+node('sentiment-pointer','▲')+text('sentiment-low','−','left:36px;top:99px')+text('sentiment-high','＋','left:207px;top:99px')+text('sentiment-value','+0.6','left:102px;top:22px'),[
    track('.sentiment-pointer',frames([0,{transform:'translateX(0)'}],[.2,{transform:'translateX(-47px)'}],[.57,{transform:'translateX(56px)'}],[1,{transform:'translateX(56px)'}])),track('.sentiment-value',fade(.56,.66))
  ],'負から正の連続した尺度上を指標が移動し、+0.6の位置へ止まる。','連続値を色だけでなく位置と符号でも表示する。');
  define('data-story','goal-projection',axis+svg('<path d="M32 109L68 99L103 80L137 69" fill="none" stroke="#8de6d4" stroke-width="3"/>'+path('goal-projected','M137 69Q180 58 222 27','fill="none" stroke="#b6a7f4" stroke-width="2" stroke-dasharray="5 4"')+'<circle cx="222" cy="27" r="6" fill="#0b151e" stroke="#e6bd81" stroke-width="2"/>')+text('goal-label','GOAL','left:192px;top:9px'),[
    track('.goal-projected',frames([0,{clipPath:'inset(0 100% 0 0)'}],[.18,{clipPath:'inset(0 100% 0 0)'}],[.6,{clipPath:'inset(0 0 0 0)'}],[1,{clipPath:'inset(0 0 0 0)'}]))
  ],'実績の折れ線から目標点へ破線の予測軌道を伸ばす。','実績と予測の境界を明確にし、目標は固定する。');
})();
