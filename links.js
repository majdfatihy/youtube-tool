/* =====================================================================
   links.js — كل الروابط في مكان واحد. عدّل الجزء العلوي فقط (SITE_LINKS).
   ===================================================================== */
window.SITE_LINKS = {

  /* ---- فيديو الشرح (شرح الأداة + طريقة جلب مفتاح API) ---- */
  // معرّف الفيديو = الـ 11 حرفاً بعد v= في رابط يوتيوب. اتركه فارغاً ليختفي القسم.
  tutorial: { id: '' },
  // الرابط الذي تفتحه علامة ؟ بجوار الثيم. فارغ = يستخدم فيديو الشرح أعلاه،
  // وإن لم يوجد يفتح دليل الاستخدام الداخلي.
  helpVideoUrl: 'https://www.youtube.com/playlist?list=PLaGSQ9Xg8VA4',

  /* ---- الرسالة التي تُرسل عبر واتساب وتليجرام: العنوان + الرابط + النص ---- */
  message: {
    title: { ar: 'أداة يوتيوب الشاملة', en: 'YT Master Tool' },
    text: {
      ar: 'أداة لاستخراج بيانات قناة يوتيوب وتحليلها وتصديرها إلى Excel بسهولة.',
      en: 'A tool to extract, analyse and export YouTube channel data to Excel.'
    },
    url: '' // فارغ = رابط الصفحة الحالية تلقائياً
  },

  /* ---- روابط التواصل (اترك الحقل فارغاً '' لإخفاء الزر) ---- */
  social: {
    youtube:   'https://youtube.com/@majdfatihy',
    facebook:  'https://www.facebook.com/majdfatihyfp',
    instagram: 'https://www.instagram.com/majdfatihy',
    // واتساب: رقمك بالصيغة الدولية بدون + (يفتح محادثة معك برسالة جاهزة)
    //         أو 'share' (يفتح مشاركة الرسالة لأي شخص)
    whatsapp:  '201066732514',
    // تليجرام: 'share' (مشاركة الرسالة الجاهزة) أو اسم مستخدمك بدون @ (يفتح محادثة معك، بدون نص جاهز)
    telegram:  'https://t.me/majdfathy'
  },

  // ترتيب ظهور الأيقونات
  order: ['youtube', 'facebook', 'instagram', 'whatsapp', 'telegram']
};

/* ---------------------------------------------------------------------
   كود عرض أيقونات التواصل في الفوتر (لا حاجة لتعديله)
   --------------------------------------------------------------------- */
(function () {
  var C = window.SITE_LINKS;
  var ICONS = {
    youtube:   '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>',
    facebook:  '<path d="M14 21v-8h2.6l.4-3H14V8.2c0-.9.3-1.5 1.6-1.5H17V4.1C16.7 4.1 15.8 4 14.8 4 12.6 4 11 5.3 11 7.8V10H8.5v3H11v8z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/>',
    whatsapp:  '<path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .7c-1-.4-2-1.4-2.4-2.4l.7-1-1-2z"/>',
    telegram:  '<path d="M21.5 4.5 2.8 11.7c-.8.3-.8 1.4 0 1.7l4.7 1.7 1.8 5.7c.2.6.9.8 1.4.4l2.6-2.2 4.6 3.4c.6.4 1.3.1 1.5-.6l3-14.6c.2-.8-.5-1.4-1.2-1.1z"/><path d="m8 14.6 9.5-7.3"/>'
  };
  var LABEL = {
    youtube:   { ar: 'يوتيوب', en: 'YouTube' },
    facebook:  { ar: 'فيسبوك', en: 'Facebook' },
    instagram: { ar: 'انستجرام', en: 'Instagram' },
    whatsapp:  { ar: 'واتساب', en: 'WhatsApp' },
    telegram:  { ar: 'تليجرام', en: 'Telegram' }
  };

  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function pick(o) { return typeof o === 'string' ? o : (o && (o[lang()] || o.ar)) || ''; }

  function msg() {
    var m = C.message || {};
    var url = m.url || location.href.split('#')[0];
    return { title: pick(m.title), text: pick(m.text), url: url, full: [pick(m.title), url, pick(m.text)].filter(Boolean).join('\n') };
  }

  function href(key) {
    var v = String((C.social || {})[key] || '').trim();
    if (!v) return '';
    var m = msg();
    if (key === 'whatsapp') {
      var phone = v === 'share' ? '' : v.replace(/\D/g, '');
      return 'https://wa.me/' + phone + '?text=' + encodeURIComponent(m.full);
    }
    if (key === 'telegram') {
      if (v === 'share') return 'https://t.me/share/url?url=' + encodeURIComponent(m.url) + '&text=' + encodeURIComponent([m.title, m.text].filter(Boolean).join('\n'));
      return 'https://t.me/' + v.replace(/^@/, '');
    }
    return /^https?:\/\//i.test(v) ? v : '';
  }

  var css = '.social-links{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:18px}'
    + '.social-links:empty{display:none}'
    + '.social-links a{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;color:inherit;border:1px solid rgba(255,255,255,.2);text-decoration:none;transition:transform .2s,background .2s,border-color .2s}'
    + '.social-links a svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}'
    + '.social-links a:hover,.social-links a:focus-visible{transform:translateY(-3px);color:#fff;background:var(--c);border-color:var(--c)}'
    + '.social-links a.youtube{--c:#ff0000}.social-links a.facebook{--c:#1877f2}.social-links a.instagram{--c:#e1306c}.social-links a.whatsapp{--c:#25d366}.social-links a.telegram{--c:#229ed9}';
  var st = document.createElement('style'); st.id = 'links-css'; st.textContent = css; document.head.appendChild(st);

  function render() {
    var box = document.getElementById('socialLinks'); if (!box) return;
    var l = lang(), out = '';
    (C.order || Object.keys(ICONS)).forEach(function (k) {
      var h = href(k); if (!h || !ICONS[k]) return;
      var name = LABEL[k][l];
      out += '<a class="' + k + '" href="' + h.replace(/"/g, '&quot;') + '" target="_blank" rel="noopener noreferrer" aria-label="' + name + '" title="' + name + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[k] + '</svg></a>';
    });
    box.innerHTML = out;
  }

  render();
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
