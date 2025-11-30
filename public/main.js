document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('nav-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
  });

  document.addEventListener('click', function (event) {
    const nav = document.querySelector('nav');
    if (!nav) return;
    const target = event.target;
    const isClickInsideNav = nav.contains(target) || toggle.contains(target);
    if (!isClickInsideNav && document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
    }
  });
});
