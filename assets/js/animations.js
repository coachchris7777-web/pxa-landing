(function () {
  function initAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.manifesto-section, .premise-cell, .ft-cell, .research-card').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;

        if (el.dataset.stagger) {
          var children = el.querySelectorAll(el.dataset.stagger);
          children.forEach(function (child, i) {
            child.style.animationDelay = (i * 120) + 'ms';
            child.classList.add('is-visible');
          });
        } else {
          el.classList.add('is-visible');
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.manifesto-section, .research-card').forEach(function (el) {
      observer.observe(el);
    });

    document.querySelectorAll('.premise-cell').forEach(function (cell, i) {
      var delay = i * 700;
      var cellObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, delay);
          cellObserver.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      cellObserver.observe(cell);
    });

    var ftGrid = document.querySelector('.ft-grid');
    if (ftGrid) {
      ftGrid.dataset.stagger = '.ft-cell';
      observer.observe(ftGrid);
    }
  }

  // Poll until React has rendered
  function setup() {
    if (!window.__REACT_READY__) {
      setTimeout(setup, 100);
      return;
    }
    initAnimations();
  }
  setup();
})();
