/* =====================================================================
   ads.js — كل ما يخص الإعلانات في ملف واحد (يعمل مع أي منصة إعلانية)
   عدّل ADS_CODES و ADS_CONFIG فقط.

   ملخص الأماكن (في كل شاشة لا يتكرر نفس الكود أبداً):

   • الرئيسية قبل الاستخراج  = تبويب API بعد الاستخراج = التصدير:
        بانر صغير فوق البطاقة  +  إعلانان تحت بعض تحتها
        + عمودان جانبيان (160×300 يسار، 160×600 يمين) على الشاشات العريضة فقط
   • الإحصائيات: بانر صغير بعد بطاقة القناة + إعلانان تحت بعض في النهاية (3)
   • الفيديوهات: إعلان واحد تحت الجدول

   لا يظهر أي إعلان: داخل الجدول أو الكروت أو شريط الفلاتر والبحث، ولا فوق
   شريط التبويب السفلي، ولا في وضع التركيز (Focus).

   قاعدة المقاسات: لا يُصغَّر أي إعلان ولا يُضغط أبداً. كل موضع يختار النسخة التي
   يتسع لها مكانها بمقاسها الأصلي (الهاتف: نسخة الهاتف أولاً، الحاسوب: نسخة الحاسوب
   أولاً)، وإن لم تتسع أي نسخة يُخفى الموضع. الـ Native فقط يأخذ عرض المكان المتاح
   (حتى w) لأنه مرن بطبيعته.

   حمايات تلقائية:
   • إن لصقت نفس الكود في موضعين ظاهرين معاً، يُخفى الثاني تلقائياً.
   • الإعلان الذي يختفي بتغيير التبويب يُزال من الصفحة ويُنشأ من جديد عند العودة.
   • الأعمدة الجانبية لا تظهر إلا إذا اتسع الجانبان لها (عرض ≥ 1140px وارتفاع ≥ 720px للـ 600).
   • الإعلانات تُدرج مباشرة (isolate:false) كي يرى مصدر الإعلان نطاق موقعك. للعودة للعزل اجعلها true.
   • تُحمَّل الإعلانات واحداً تلو الآخر حتى لا يتعارض متغير atOptions بين إعلان وآخر.
   • الإنشاء بعد أول تفاعل أو 4 ثوانٍ، وعند اقتراب الإعلان من الشاشة فقط.

   تحذيرات:
   • كثافة الإعلانات هنا عالية؛ راقب الارتداد (Bounce) وسرعة الصفحة. إن لاحظت
     هروباً من الأداة فألغِ إعلان export2 أو home2 أولاً (code: `` يلغي الإعلان).
   • لا تستخدم صيغ Popunder / Social Bar / Direct Link داخل الأداة.
   • أضف في privacy.html فقرة عن إعلانات الأطراف الثالثة وملفات الارتباط.
   ===================================================================== */

/* أكواد المنصة (الصق كل كود مرة واحدة هنا؛ الأسماء بالمقاس) */
window.ADS_CODES = {
  // b728x90
  b728x90: `<script>
  atOptions = {
    'key' : 'b438ca159fef3619cd01dd89663463be',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/b438ca159fef3619cd01dd89663463be"></script>`,
  // b468x60
  b468x60: `<script>
  atOptions = {
    'key' : '1e423ba61e8df2d60437276587320065',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/1e423ba61e8df2d60437276587320065"></script>`,
  // b320x50
  b320x50: `<script>
  atOptions = {
    'key' : '7ba3e4b2562ec32fe469244d1c937d74',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/7ba3e4b2562ec32fe469244d1c937d74"></script>`,
  // b300x250
  b300x250: `<script>
  atOptions = {
    'key' : '729c9fd7aa7322cef370e2d2f67a5788',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/729c9fd7aa7322cef370e2d2f67a5788"></script>`,
  // s160x300
  s160x300: `<script>
  atOptions = {
    'key' : 'fabddc7a40461c7b942294ab544c4344',
    'format' : 'iframe',
    'height' : 300,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/fabddc7a40461c7b942294ab544c4344"></script>`,
  // s160x600
  s160x600: `<script>
  atOptions = {
    'key' : 'd6d837601ee8eae05c4e2f5180e6638d',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/d6d837601ee8eae05c4e2f5180e6638d"></script>`,
  // native
  native: `<script async="async" data-cfasync="false" src="https://bauval.org/21/7d74d287d7c8907ca009698fb7e174e7"></script>
<div id="container-7d74d287d7c8907ca009698fb7e174e7"></div>`
};

window.ADS_CONFIG = {
  enabled: true,         // المفتاح الرئيسي: false لإيقاف كل الإعلانات
  preview: false,        // true = مربعات تجريبية لترى الأماكن بدون أي منصة
  provider: 'custom',    // 'custom' = أي منصة (الصق الكود) | 'adsense' = أدسنس (client + رقم الوحدة)
  isolate: false,        // false = الإعلان يُدرج مباشرة في الصفحة فيرى مصدر الإعلان موقعك (مطلوب لظهور إعلانات Adsterra)
  client: '',            // adsense فقط: ca-pub-XXXXXXXXXXXXXXXX

  // لكل موضع: إعلان للسطح المكتب وآخر للهاتف (الهاتف = عرض شاشة ≤ 600px).
  // w/h = مقاس الإعلان (يحجز المكان قبل التحميل) — auto:true = الارتفاع يتبع الإعلان (Native).
  // code فارغ ('') = لا إعلان في ذلك الجهاز.
  slots: {
    homeTop: { desktop: { w: 468, h: 60, code: ADS_CODES.b468x60 }, mobile: { w: 320, h: 50, code: ADS_CODES.b320x50 } },   // الرئيسية (قبل الاستخراج): بانر صغير فوق
    home: { desktop: { w: 728, h: 90, code: ADS_CODES.b728x90 }, mobile: { w: 300, h: 250, code: ADS_CODES.b300x250 } },      // + إعلانان تحت بعض
    home2: { desktop: { w: 300, h: 250, code: ADS_CODES.b300x250 }, mobile: { w: 728, h: 250, auto: true, code: ADS_CODES.native } },
    apiTop: { desktop: { w: 320, h: 50, code: ADS_CODES.b320x50 }, mobile: { w: 320, h: 50, code: ADS_CODES.b320x50 } },    // تبويب API بعد الاستخراج
    api: { desktop: { w: 728, h: 250, auto: true, code: ADS_CODES.native }, mobile: { w: 728, h: 250, auto: true, code: ADS_CODES.native } },
    api2: { desktop: { w: 728, h: 90, code: ADS_CODES.b728x90 }, mobile: { w: 300, h: 250, code: ADS_CODES.b300x250 } },
    exportTop: { desktop: { w: 468, h: 60, code: ADS_CODES.b468x60 }, mobile: { w: 320, h: 50, code: ADS_CODES.b320x50 } },  // تبويب التصدير
    export: { desktop: { w: 300, h: 250, code: ADS_CODES.b300x250 }, mobile: { w: 300, h: 250, code: ADS_CODES.b300x250 } },
    export2: { desktop: { w: 728, h: 250, auto: true, code: ADS_CODES.native }, mobile: { w: 728, h: 250, auto: true, code: ADS_CODES.native } },
    statsTop: { desktop: { w: 320, h: 50, code: ADS_CODES.b320x50 }, mobile: { w: 320, h: 50, code: ADS_CODES.b320x50 } },  // الإحصائيات: 3 إعلانات
    stats: { desktop: { w: 728, h: 90, code: ADS_CODES.b728x90 }, mobile: { w: 728, h: 250, auto: true, code: ADS_CODES.native } },
    stats2: { desktop: { w: 300, h: 250, code: ADS_CODES.b300x250 }, mobile: { w: 300, h: 250, code: ADS_CODES.b300x250 } },
    results: { desktop: { w: 728, h: 250, auto: true, code: ADS_CODES.native }, mobile: { w: 300, h: 250, code: ADS_CODES.b300x250 } },     // تحت جدول الفيديوهات
    railL: { desktop: { w: 160, h: 300, code: ADS_CODES.s160x300 } },   // عمود جانبي يسار (شاشات عريضة فقط)
    railR: { desktop: { w: 160, h: 600, code: ADS_CODES.s160x600 } }    // عمود جانبي يمين
  },

  // سكربتات عامة (ليست داخل مكان محدد) — مُعطّلة افتراضياً.
  // الصيغ التي تفتح نوافذ (Popunder) أو تطفو فوق الصفحة (Social Bar) تؤذي الأداة؛
  // فعّلها بمسؤوليتك بتغيير enabled إلى true بعد التأكد من نوعها.
  global: [
    { enabled: false, src: 'https://bauval.org/14/959f77deac27dba936e9c02e98bc911c', note: 'الإعلان الخامس (بلا مقاس ولا حاوية)' }
  ]
};

/* ---------------------------------------------------------------------
   كود التشغيل (لا حاجة لتعديله)
   --------------------------------------------------------------------- */
(function () {
  var C = window.ADS_CONFIG || {};
  var adsense = C.provider === 'adsense';
  var live = !!C.enabled && (!adsense || /^ca-pub-\d{10,}$/.test(C.client || ''));
  if (!live && !C.preview) return;

  var HOME = 'body:not(.has-data)', API = 'body.has-data[data-tab="api"]', STATS = 'body.has-data[data-tab="overview"]',
      RES = 'body.has-data[data-tab="videos"]', EXP = 'body.has-data[data-tab="export"]',
      RAIL = HOME + ',' + API + ',' + EXP;
  // before/after = بجوار أي عنصر | afterAd = بعد إعلان آخر | order = ترتيب العرض | show = متى يظهر
  var PLACE = {
    homeTop:   { before: 'apiCard',  order: 0, show: HOME },
    home:      { after: 'helpVid',   order: 2, show: HOME },
    home2:     { after: 'helpVid',   afterAd: 'home', order: 2, show: HOME },
    apiTop:    { before: 'apiCard',  order: 0, show: API },
    api:       { after: 'apiCard',   order: 2, show: API },
    api2:      { after: 'apiCard',   afterAd: 'api', order: 2, show: API },
    statsTop:  { after: 'channelInfoCard', order: 4, show: STATS },
    stats:     { after: 'statsWrap', order: 5, show: STATS },
    stats2:    { after: 'statsWrap', afterAd: 'stats', order: 5, show: STATS },
    results:   { after: 'tableContainer', order: 7, show: RES },
    exportTop: { before: 'exportCard', order: 8, show: EXP },
    export:    { after: 'exportCard', order: 8, show: EXP },
    export2:   { after: 'exportCard', afterAd: 'export', order: 8, show: EXP },
    railL:     { rail: 1, show: RAIL },
    railR:     { rail: 1, show: RAIL }
  };

  var css = '.ad-slot{display:none;position:relative;box-sizing:border-box;width:100%;max-width:970px;margin:28px auto;text-align:center;overflow:hidden}'
    + '.ad-slot .ad-l{display:block;font-size:11px;line-height:1;margin:0 0 6px;color:var(--text-muted,#80868b);letter-spacing:.3px}'
    + '.ad-slot iframe{display:block;margin:0 auto;border:0;max-width:none;background:transparent}'
    + '.ad-slot ins{display:block}'
    + '.ad-slot:has(ins[data-ad-status="unfilled"]){display:none!important}'
    + '.ad-slot .ph-b{display:grid;place-items:center;margin:0 auto;max-width:100%;border:2px dashed var(--border,#dadce0);border-radius:12px;color:var(--text-muted,#80868b);font-size:13px;background:repeating-linear-gradient(45deg,transparent 0 10px,rgba(128,134,139,.06) 10px 20px)}'
    + '.ad-slot[data-ad$="Top"]{margin:12px auto 4px;max-width:760px}'
    + '.ad-slot[data-ad="home"],.ad-slot[data-ad="api"],.ad-slot[data-ad="export"]{margin-top:36px}'
    + '.ad-slot.rail{position:fixed;top:84px;width:160px;margin:0;min-height:0;z-index:5}'
    + '.ad-slot[data-ad="railL"]{left:calc(50% - 556px)}.ad-slot[data-ad="railR"]{left:calc(50% + 396px)}'
    + '.ad-slot.ad-dup,.ad-slot.ad-nofit{display:none!important}'
    + 'body.focus .ad-slot{display:none!important}';
  Object.keys(PLACE).forEach(function (k) {
    var rule = PLACE[k].show.split(',').map(function (x) { return x + ' .ad-slot[data-ad="' + k + '"]'; }).join(',') + '{display:block}';
    css += PLACE[k].rail ? '@media(min-width:1140px){' + rule + '}' : rule;
  });
  css += '@media(min-width:1140px) and (max-height:719px){.ad-slot[data-ad="railR"]{display:none!important}}';
  var st = document.createElement('style'); st.id = 'ads-css'; st.textContent = css; document.head.appendChild(st);

  var mq = window.matchMedia ? matchMedia('(max-width:600px)') : { matches: false };
  function has(c) { return !!(c && c.code && String(c.code).trim()); }
  // اختيار النسخة المناسبة: الهاتف يفضّل نسخة الهاتف والحاسوب يفضّل نسخة الحاسوب،
  // ولا تُستخدم أي نسخة إلا إذا اتسع لها مكانها بحجمها الأصلي (لا تصغير ولا ضغط أبداً).
  // الـ Native فقط (auto) يأخذ عرض المكان المتاح لأنه مرن بطبيعته.
  function pick(k, box) {
    var s = (C.slots || {})[k] || {}, rail = PLACE[k].rail;
    var list = rail ? [s.desktop] : (mq.matches ? [s.mobile, s.desktop] : [s.desktop, s.mobile]);
    var av = box.clientWidth;
    for (var i = 0; i < list.length; i++) {
      var c = list[i]; if (!has(c)) continue;
      var w = +c.w || 300, h = +c.h || 250;
      if (rail || c.auto || w <= av) return { code: String(c.code).trim(), w: c.auto ? Math.min(w, av) : w, h: h, auto: !!c.auto };
    }
    return null;
  }
  function shown(b) { return b.getClientRects().length > 0; }

  var made = [];
  Object.keys(PLACE).forEach(function (k) {
    var P = PLACE[k], s = (C.slots || {})[k] || {};
    var anyCode = has(s.desktop) || has(s.mobile);
    if (!anyCode && !(C.preview && !(P.rail && mq.matches))) return;
    var ref = P.rail ? s.desktop : (mq.matches ? (s.mobile || s.desktop) : (s.desktop || s.mobile)) || {};
    var w = +ref.w || 300, h = +ref.h || 250;
    var box = document.createElement('aside');
    box.className = 'ad-slot' + (P.rail ? ' rail' : ''); box.dataset.ad = k; box.style.order = P.order == null ? '' : P.order;
    if (!P.rail) box.style.minHeight = (h + 20) + 'px';
    box.setAttribute('aria-label', 'advertisement');
    var label = document.documentElement.lang === 'en' ? 'Advertisement' : 'إعلان';
    box.innerHTML = '<span class="ad-l">' + label + '</span>'
      + (live && anyCode ? '<div class="ad-body"></div>' : '<div class="ph-b" style="width:' + w + 'px;height:' + h + 'px">' + k + ' · ' + w + '×' + h + '</div>');
    if (P.rail) { document.body.appendChild(box); }
    else {
      var prev = P.afterAd && made.filter(function (m) { return m.dataset.ad === P.afterAd; })[0];
      var el = P.before ? document.getElementById(P.before) : (prev || document.getElementById(P.after));
      if (!el) return;
      if (P.before) el.parentNode.insertBefore(box, el); else el.parentNode.insertBefore(box, el.nextSibling);
    }
    made.push(box);
  });
  if (!live) return;

  // الإعلانات ذات الارتفاع التلقائي (Native): الإطار يرسل ارتفاعه فنضبطه
  addEventListener('message', function (e) {
    if (!e.data || typeof e.data.adh !== 'number') return;
    made.forEach(function (b) {
      if (b._f && b._f.contentWindow === e.source && b._pick && b._pick.auto) {
        var h = Math.min(e.data.adh, 900) || b._pick.h; b._f.height = h; if (!b.classList.contains('rail')) b.style.minHeight = (h + 20) + 'px';
      }
    });
  });

  // إدراج مباشر: ينسخ الـ script ليعمل، ويلتقط document.write الذي تستخدمه
  // سكربتات الإعلانات (invoke.js) ويضع ناتجه داخل حاوية الإعلان نفسها.
  var queue = [], busy = false;
  function runNext() {
    if (busy) return;
    var job = queue.shift(); if (!job) return;
    busy = true;
    job(function () { busy = false; runNext(); });
  }
  function inject(el, html, done) {
    var pending = 0, finished = false, timer;
    var ow = document.write, owl = document.writeln;
    function fin() {
      if (finished) return; finished = true; clearTimeout(timer);
      document.write = ow; document.writeln = owl;
      if (done) done();
    }
    function check() { if (pending <= 0) fin(); }
    function put(frag) {
      Array.prototype.slice.call(frag.childNodes).forEach(function (node) {
        if (node.nodeName !== 'SCRIPT') { el.appendChild(node); return; }
        var n = document.createElement('script');
        Array.prototype.forEach.call(node.attributes, function (at) { n.setAttribute(at.name, at.value); });
        if (node.src) {
          pending++;
          n.onload = n.onerror = function () { pending--; check(); };
        } else n.text = node.text;
        el.appendChild(n);
      });
    }
    function write() {
      var t = document.createElement('template');
      t.innerHTML = Array.prototype.join.call(arguments, '');
      put(t.content);
    }
    document.write = write; document.writeln = write;
    timer = setTimeout(fin, 8000);   // لا نعطّل بقية الإعلانات إن تأخر هذا
    var tpl = document.createElement('template'); tpl.innerHTML = html;
    put(tpl.content);
    check();
  }

  function activate(box) {
    if (box._done || !shown(box)) return;
    var body = box.querySelector('.ad-body'); if (!body) return;
    var a = pick(box.dataset.ad, box);
    if (!a) { box.classList.add('ad-nofit'); box._done = true; box._pick = null; return; }   // لا يتسع لمقاسه: لا يظهر
    // لا نكرر نفس الكود في نفس الصفحة
    if (made.some(function (o) { return o !== box && o._done && o._pick && !o.classList.contains('ad-dup') && o._pick.code === a.code && shown(o); })) { box.classList.add('ad-dup'); box._done = true; box._pick = a; return; }
    box._done = true; box._pick = a;
    if (!box.classList.contains('rail')) box.style.minHeight = (a.h + 20) + 'px';
    if (adsense) {
      body.innerHTML = '<ins class="adsbygoogle" style="display:block;min-height:' + a.h + 'px" data-ad-client="' + C.client + '" data-ad-slot="' + a.code + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    } else if (C.isolate !== false) {
      var f = document.createElement('iframe');
      box._f = f; f.width = a.w; f.height = a.h; f.scrolling = 'no'; f.title = 'advertisement'; f.loading = 'lazy';
      f.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation');
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      f.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}body{' + (a.auto ? 'display:block' : 'display:flex;justify-content:center') + '}</style></head><body>' + a.code + (a.auto ? '<script>(function(){function r(){parent.postMessage({adh:document.body.scrollHeight},"*")}if(window.ResizeObserver)new ResizeObserver(r).observe(document.body);addEventListener("load",r);setTimeout(r,1500)})()<\/script>' : '') + '</body></html>';
      body.appendChild(f);
    } else { queue.push(function (next) { inject(body, a.code, next); }); runNext(); }
  }

  // إزالة إعلان لم يعد ظاهراً (تغيير التبويب) كي لا يبقى نفس الكود مكرراً في الصفحة
  function reset(box) {
    var body = box.querySelector('.ad-body'); if (body) body.innerHTML = '';
    box._f = null; box._done = false; box._pick = null; box.classList.remove('ad-dup', 'ad-nofit');
  }

  var started = false, io = null;
  function sync() {
    if (!started) return;
    made.forEach(function (b) {
      if (!b._done) return;
      if (!shown(b)) { reset(b); return; }
      // تغيّر عرض الشاشة: أعد اختيار النسخة المناسبة (مثلاً دوران الهاتف)
      var p = pick(b.dataset.ad, b);
      if (!!p !== !!b._pick || (p && b._pick && (p.code !== b._pick.code || p.w !== b._pick.w))) reset(b);
    });
    made.forEach(function (b) { if (!b._done && shown(b) && io) { io.unobserve(b); io.observe(b); } });
  }
  function observe() {
    if (!('IntersectionObserver' in window)) { made.forEach(activate); return; }
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) activate(e.target); }); }, { rootMargin: '300px' });
    made.forEach(function (b) { if (shown(b)) io.observe(b); });
  }
  function start() {
    if (started) return; started = true;
    if (adsense) {
      var s = document.createElement('script'); s.async = true; s.crossOrigin = 'anonymous';
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + C.client;
      s.onload = observe; document.head.appendChild(s);
    } else observe();
    (C.global || []).forEach(function (g) {
      if (!g || !g.enabled || !g.src) return;
      var sc = document.createElement('script'); sc.async = true; sc.src = g.src; sc.setAttribute('data-cfasync', 'false'); document.head.appendChild(sc);
    });
  }
  ['pointerdown', 'keydown', 'scroll'].forEach(function (ev) { addEventListener(ev, start, { once: true, passive: true }); });
  setTimeout(start, 4000);

  var t = 0;
  new MutationObserver(function () { clearTimeout(t); t = setTimeout(sync, 60); })
    .observe(document.body, { attributes: true, attributeFilter: ['class', 'data-tab'] });
  addEventListener('resize', function () { clearTimeout(t); t = setTimeout(sync, 150); });
})();
