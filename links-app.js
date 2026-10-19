(function () {
  var C = window.KT_LINKS || {};
  var VI = C.lang === 'vi';
  var T = VI ? {
    add: 'Thêm', name: 'Tên khách', intro: 'Tên ở phần mở đầu', inside: 'Tên trong thiệp (tuỳ chọn)',
    paste: 'Dán nhiều tên', pasteHint: C.dual ? 'Mỗi dòng một khách: tên mở đầu | tên trong thiệp' : 'Mỗi dòng một tên', addAll: 'Thêm tất cả', cancel: 'Huỷ',
    all: 'Tất cả', todo: 'Chưa gửi', done: 'Đã gửi', copy: 'Chép lời mời', copyLink: 'Link', copied: 'Đã chép', del: 'Xoá', sent: 'Đã gửi',
    copyAll: 'Chép tất cả', csv: 'Tải CSV', empty: 'Chưa có khách nào. Thêm tên ở trên.', emptyF: 'Không có khách trong mục này.',
    of: 'đã gửi', confirmDel: 'Xoá khách này?', clearDone: 'Xoá khách đã gửi', open: 'Mở', dup: 'Tên này đã có trong danh sách.'
  } : {
    add: 'Add', name: 'Guest name', intro: 'Intro name', inside: 'Inside name (optional)',
    paste: 'Paste many', pasteHint: C.dual ? 'One guest per line: intro name | inside name' : 'One name per line', addAll: 'Add all', cancel: 'Cancel',
    all: 'All', todo: 'To send', done: 'Sent', copy: 'Copy message', copyLink: 'Link', copied: 'Copied', del: 'Delete', sent: 'Sent',
    copyAll: 'Copy all', csv: 'Download CSV', empty: 'No guests yet. Add a name above.', emptyF: 'No guests in this view.',
    of: 'sent', confirmDel: 'Delete this guest?', clearDone: 'Clear sent', open: 'Open', dup: 'This name is already on the list.'
  };

  var css = "body{margin:0;background:#f3ede2;color:#3a2417;font-family:'Cormorant Garamond',serif;-webkit-font-smoothing:antialiased}"
    + "*{box-sizing:border-box}a,a:hover{color:#5C2018}"
    + ".w{max-width:760px;margin:0 auto;padding:44px 20px 96px}"
    + ".eb{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:#5C2018}"
    + "h1{font-weight:500;font-size:38px;line-height:1.1;margin:8px 0 24px;text-wrap:balance}"
    + ".card{background:#fbf8f1;border:1px solid rgba(92,32,24,.18);border-radius:4px}"
    + ".add{display:flex;gap:10px;padding:12px;flex-wrap:wrap}"
    + ".in{flex:1 1 200px;min-width:0;font-family:inherit;font-size:20px;color:#3a2417;background:transparent;border:none;border-bottom:1px solid rgba(92,32,24,.3);padding:10px 4px;outline:none}"
    + ".in:focus{border-bottom-color:#5C2018}.in::placeholder{color:rgba(58,36,23,.45)}"
    + ".b{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:12px 18px;border-radius:2px;cursor:pointer;border:1px solid rgba(92,32,24,.45);background:transparent;color:#5C2018;white-space:nowrap}"
    + ".b:hover{border-color:#5C2018}.b.p{background:#5C2018;color:#f3ede2;border-color:#5C2018}.b.p:hover{background:#3a2417}"
    + ".b.s{padding:9px 12px;font-size:10px}.b.g{border-color:transparent}.b.g:hover{border-color:rgba(92,32,24,.3)}"
    + ".lnk{background:none;border:none;padding:0;font:inherit;font-size:16px;color:#5C2018;text-decoration:underline;text-underline-offset:3px;cursor:pointer}"
    + ".bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:28px 0 12px}"
    + ".tabs{display:flex;gap:4px;background:#ebe3d4;border-radius:999px;padding:3px}"
    + ".tab{font-family:'Cinzel',serif;font-size:10px;letter-spacing:.16em;text-transform:uppercase;border:none;background:transparent;color:#5C2018;padding:8px 14px;border-radius:999px;cursor:pointer;display:flex;gap:6px;align-items:center}"
    + ".tab.on{background:#5C2018;color:#f3ede2}.tab i{font-style:normal;opacity:.7}"
    + ".prog{font-size:17px;opacity:.8}"
    + ".pbar{height:3px;background:rgba(92,32,24,.12);border-radius:2px;overflow:hidden;margin-bottom:14px}.pbar>div{height:100%;background:#5C2018;transition:width .3s ease}"
    + ".row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:14px;align-items:center;padding:14px 16px;border-top:1px solid rgba(92,32,24,.12)}"
    + ".row:first-child{border-top:none}"
    + ".chk{width:24px;height:24px;border:1.5px solid rgba(92,32,24,.55);border-radius:50%;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;color:#f3ede2;font-size:13px}"
    + ".chk.on{background:#5C2018;border-color:#5C2018}"
    + ".nm{font-size:21px;line-height:1.2;overflow-wrap:anywhere}.nm small{display:block;font-size:15px;opacity:.65;margin-top:2px}"
    + ".url{font-size:14px;opacity:.6;overflow-wrap:anywhere;margin-top:4px;font-family:ui-monospace,Menlo,monospace}"
    + ".row.dn .nm{opacity:.5}.row.dn .url{opacity:.35}"
    + ".acts{display:flex;gap:6px;align-items:center}"
    + ".x{width:34px;height:34px;border:none;background:transparent;color:#5C2018;opacity:.45;cursor:pointer;font-size:18px;border-radius:50%}.x:hover{opacity:1;background:rgba(92,32,24,.08)}"
    + ".empty{padding:36px 16px;text-align:center;font-size:19px;opacity:.6}"
    + ".foot{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}"
    + ".paste{padding:12px;border-top:1px solid rgba(92,32,24,.12);display:grid;gap:10px}"
    + ".paste textarea{width:100%;font-family:inherit;font-size:19px;line-height:1.4;color:#3a2417;background:#fff;border:1px solid rgba(92,32,24,.25);border-radius:2px;padding:10px;resize:vertical;outline:none}"
    + ".hint{font-size:15px;opacity:.65}"
    + ".msg{font-size:15px;color:#7a2231;padding:0 16px 10px}"
    + "@media (max-width:560px){.row{grid-template-columns:auto minmax(0,1fr);}.acts{grid-column:2;}h1{font-size:30px}}";
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var KEY = C.key;
  function enc(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function load() {
    try { var d = JSON.parse(localStorage.getItem(KEY) || 'null'); if (Array.isArray(d)) return d; } catch (_) {}
    var old = C.oldKey && localStorage.getItem(C.oldKey);
    if (old) return parseLines(old);
    return [];
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S.items)); } catch (_) {} }
  function parseLines(txt) {
    return txt.split('\n').map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) {
      var p = C.dual ? l.split('|') : [l];
      return { id: Math.random().toString(36).slice(2, 9), name: p[0].trim(), inside: (p[1] || '').trim(), sent: false };
    }).filter(function (x) { return x.name; });
  }
  function message(it) {
    var u = url(it);
    return VI
      ? 'Trân trọng kính mời ' + it.name + ' đến dự tiệc lễ thành hôn của hai con chúng tôi cùng gia đình.\nBấm vào link sau đây để mở thiệp mời:\n' + u
      : 'Dear ' + it.name + ',\nYou are warmly invited to our wedding. Tap the link below to open your invitation:\n' + u;
  }
  function url(it) { return location.origin + C.prefix + enc(it.name + (C.dual && it.inside ? '||' + it.inside : '')); }

  var S = { items: load(), filter: 'all', pasting: false, copied: null, msg: '' };
  save();

  var app = document.getElementById('app');
  app.innerHTML = '<div class="w"><div class="eb">Khoa &amp; Thi' + (C.sub ? ' · ' + esc(C.sub) : '') + '</div><h1>' + esc(C.title) + '</h1>'
    + '<div class="card"><form class="add" id="f">'
    + '<input class="in" id="n" autocomplete="off" placeholder="' + esc(C.dual ? T.intro : T.name) + '">'
    + (C.dual ? '<input class="in" id="n2" autocomplete="off" placeholder="' + esc(T.inside) + '">' : '')
    + '<button class="b p" type="submit">' + T.add + '</button></form>'
    + '<div id="m"></div>'
    + '<div style="padding:0 16px 12px;"><button class="lnk" id="pt" type="button">' + T.paste + '</button></div>'
    + '<div id="pa"></div></div>'
    + '<div class="bar"><div class="tabs" id="tb"></div><div class="prog" id="pg"></div></div>'
    + '<div class="pbar"><div id="pb" style="width:0"></div></div>'
    + '<div class="card" id="ls"></div>'
    + '<div class="foot"><button class="b" id="ca" type="button">' + T.copyAll + '</button><button class="b" id="cv" type="button">' + T.csv + '</button><button class="b g" id="cd" type="button">' + T.clearDone + '</button></div></div>';

  var $ = function (id) { return document.getElementById(id); };
  function copy(text, done) { (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(done, function () { var t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (_) {} t.remove(); done(); }); }

  function render() {
    var n = S.items.length, d = S.items.filter(function (x) { return x.sent; }).length;
    $('tb').innerHTML = [['all', T.all, n], ['todo', T.todo, n - d], ['done', T.done, d]].map(function (t) {
      return '<button class="tab' + (S.filter === t[0] ? ' on' : '') + '" data-f="' + t[0] + '">' + t[1] + ' <i>' + t[2] + '</i></button>';
    }).join('');
    $('pg').textContent = n ? d + ' / ' + n + ' ' + T.of : '';
    $('pb').style.width = n ? (d / n * 100) + '%' : '0';
    $('m').innerHTML = S.msg ? '<div class="msg">' + esc(S.msg) + '</div>' : '';
    var list = S.items.filter(function (x) { return S.filter === 'all' || (S.filter === 'done' ? x.sent : !x.sent); });
    $('ls').innerHTML = list.length ? list.map(function (x) {
      var u = url(x);
      return '<div class="row' + (x.sent ? ' dn' : '') + '" data-id="' + x.id + '">'
        + '<button class="chk' + (x.sent ? ' on' : '') + '" data-a="t" title="' + T.sent + '" aria-label="' + T.sent + '">' + (x.sent ? '&#10003;' : '') + '</button>'
        + '<div><div class="nm">' + esc(x.name) + (C.dual && x.inside ? '<small>→ ' + esc(x.inside) + '</small>' : '') + '</div><div class="url">' + esc(u.replace(/^https?:\/\//, '')) + '</div></div>'
        + '<div class="acts"><button class="b s' + (S.copied === x.id ? ' p' : '') + '" data-a="c">' + (S.copied === x.id ? T.copied : T.copy) + '</button>'
        + '<button class="b s g" data-a="l">' + (S.copiedL === x.id ? T.copied : T.copyLink) + '</button>'
        + '<a class="b s g" href="' + esc(u) + '" target="_blank" rel="noopener">' + T.open + '</a>'
        + '<button class="x" data-a="d" title="' + T.del + '" aria-label="' + T.del + '">&#10005;</button></div></div>';
    }).join('') : '<div class="empty">' + (n ? T.emptyF : T.empty) + '</div>';
    $('pa').innerHTML = S.pasting ? '<div class="paste"><div class="hint">' + T.pasteHint + '</div><textarea id="tx" rows="6"></textarea><div style="display:flex;gap:10px;"><button class="b p" id="pa1" type="button">' + T.addAll + '</button><button class="b g" id="pa0" type="button">' + T.cancel + '</button></div></div>' : '';
    $('pt').style.display = S.pasting ? 'none' : '';
    $('cd').style.display = d ? '' : 'none';
    $('ca').style.display = $('cv').style.display = n ? '' : 'none';
  }

  function exists(name, inside) { return S.items.some(function (x) { return x.name.toLowerCase() === name.toLowerCase() && (x.inside || '').toLowerCase() === (inside || '').toLowerCase(); }); }

  $('f').addEventListener('submit', function (e) {
    e.preventDefault();
    var nm = $('n').value.trim(), ins = C.dual ? $('n2').value.trim() : '';
    if (!nm) { $('n').focus(); return; }
    if (exists(nm, ins)) { S.msg = T.dup; render(); return; }
    S.msg = '';
    S.items.unshift({ id: Math.random().toString(36).slice(2, 9), name: nm, inside: ins, sent: false });
    if (S.filter === 'done') S.filter = 'all';
    save(); $('n').value = ''; if (C.dual) $('n2').value = ''; $('n').focus(); render();
  });
  if (C.dual) $('n').addEventListener('keydown', function (e) { if (e.key === 'Enter' && !$('n2').value) { e.preventDefault(); if ($('n').value.trim()) $('n2').focus(); } });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-f]'); if (t) { S.filter = t.getAttribute('data-f'); render(); return; }
    if (e.target.id === 'pt') { S.pasting = true; render(); $('tx').focus(); return; }
    if (e.target.id === 'pa0') { S.pasting = false; render(); return; }
    if (e.target.id === 'pa1') {
      var add = parseLines($('tx').value).filter(function (x) { return !exists(x.name, x.inside); });
      S.items = add.concat(S.items); S.pasting = false; S.msg = ''; save(); render(); return;
    }
    if (e.target.id === 'ca') {
      var b = e.target, list = S.items.filter(function (x) { return S.filter === 'all' || (S.filter === 'done' ? x.sent : !x.sent); });
      copy(list.map(function (x) { return x.name + (C.dual && x.inside ? ' → ' + x.inside : '') + '\t' + url(x); }).join('\n'), function () { b.textContent = T.copied; setTimeout(function () { b.textContent = T.copyAll; }, 1400); });
      return;
    }
    if (e.target.id === 'cv') {
      var head = C.dual ? (VI ? 'Tên mở đầu,Tên trong thiệp,Đã gửi,Link' : 'Intro name,Inside name,Sent,Link') : (VI ? 'Tên,Đã gửi,Link' : 'Name,Sent,Link');
      var q = function (s) { return '"' + String(s).replace(/"/g, '""') + '"'; };
      var data = '\ufeff' + head + '\n' + S.items.map(function (x) { return (C.dual ? [q(x.name), q(x.inside || x.name)] : [q(x.name)]).concat([x.sent ? 'x' : '', url(x)]).join(','); }).join('\n');
      var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'text/csv' })); a.download = C.csv || 'guest-links.csv'; a.click();
      return;
    }
    if (e.target.id === 'cd') { S.items = S.items.filter(function (x) { return !x.sent; }); save(); render(); return; }
    var act = e.target.closest('[data-a]'); if (!act) return;
    var row = act.closest('[data-id]'), id = row && row.getAttribute('data-id');
    var it = S.items.find(function (x) { return x.id === id; }); if (!it) return;
    var a2 = act.getAttribute('data-a');
    if (a2 === 't') { it.sent = !it.sent; save(); render(); }
    else if (a2 === 'd') { if (confirm(T.confirmDel)) { S.items = S.items.filter(function (x) { return x.id !== id; }); save(); render(); } }
    else if (a2 === 'l') { copy(url(it), function () { S.copiedL = id; render(); setTimeout(function () { if (S.copiedL === id) { S.copiedL = null; render(); } }, 1400); }); }
    else if (a2 === 'c') { copy(message(it), function () { S.copied = id; render(); setTimeout(function () { if (S.copied === id) { S.copied = null; render(); } }, 1400); }); }
  });

  render();
})();
