(function () {
  var r = document.getElementById('ripple');
  if (!r) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saved = null;
  try { saved = sessionStorage.getItem('rp'); sessionStorage.removeItem('rp'); } catch (e) {}

  if (saved && !reduce) {
    var p = saved.split(',');
    r.style.setProperty('--x', p[0] + 'px');
    r.style.setProperty('--y', p[1] + 'px');
    r.classList.add('instant', 'go');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { r.classList.remove('instant', 'go'); });
    });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-t]');
    if (!a || reduce || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    var b = a.getBoundingClientRect();
    var x = b.left + b.width / 2, y = b.top + b.height / 2;
    r.style.setProperty('--x', x + 'px');
    r.style.setProperty('--y', y + 'px');
    r.classList.add('go');
    try { sessionStorage.setItem('rp', x + ',' + y); } catch (_) {}
    setTimeout(function () { location.href = a.href; }, 650);
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) r.classList.remove('go');
  });
})();
