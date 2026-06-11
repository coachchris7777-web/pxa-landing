/* Pre-compiled from the former inline <script type="text/babel"> block.
   Same logic, plain JavaScript — no Babel or in-browser JSX transform needed.
   `e` is shorthand for React.createElement. */
(function () {
'use strict';

const e = React.createElement;
const { useState, useEffect, useRef } = React;

/* ───────────────────── shared pieces ───────────────────── */

function Mark({ size = 20 }) {
  return e('span', { className: 'nav-mark', style: { fontSize: size } },
    'P', e('span', { className: 'x' }, 'X'), 'A'
  );
}

/* ───────────────────── nav ───────────────────── */

function Nav({ surveyUrl }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const scrollTo = (id) => (ev) => {
    ev.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    setMenuOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (ev) => { if (ev.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    const ids = ['premise', 'fieldtests', 'research', 'speaking'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const links = [
    { id: 'premise', label: 'The Premise' },
    { id: 'fieldtests', label: 'Field Tests' },
    { id: 'research', label: 'Research' },
    { id: 'speaking', label: 'Speaking' },
  ];

  return e('nav', { className: 'nav' },
    e('div', { className: 'wrap' },
      e('div', { className: 'nav-inner' },
        e('a', { href: '#top', onClick: scrollTo('top'), className: 'nav-brand' },
          e(Mark, null),
          e('span', { className: 'nav-divider', 'aria-hidden': 'true' }),
          e('span', { className: 'nav-name' },
            'Plan · Execute · Achieve',
            e('span', { className: 'tm' }, '™')
          )
        ),
        e('style', null, '.nav-inner { padding: 14px 0; }'),
        e('div', { className: 'nav-links' },
          links.map((l) =>
            e('a', {
              key: l.id,
              href: '#' + l.id,
              onClick: scrollTo(l.id),
              className: activeId === l.id ? 'is-active' : ''
            }, l.label)
          )
        ),
        e('div', { className: 'nav-mobile' },
          e('button', {
            type: 'button',
            className: 'nav-toggle' + (menuOpen ? ' is-open' : ''),
            'aria-expanded': menuOpen,
            'aria-controls': 'nav-mobile-menu',
            'aria-label': menuOpen ? 'Close navigation menu' : 'Open navigation menu',
            onClick: () => setMenuOpen((v) => !v)
          },
            e('span', { className: 'nav-toggle-bars', 'aria-hidden': 'true' },
              e('span', null), e('span', null), e('span', null)
            )
          )
        )
      ),
      e('div', {
        id: 'nav-mobile-menu',
        className: 'nav-menu' + (menuOpen ? ' is-open' : ''),
        hidden: !menuOpen
      },
        links.map((l) =>
          e('a', { key: l.id, href: '#' + l.id, onClick: scrollTo(l.id) }, l.label)
        )
      )
    )
  );
}

/* ───────────────────── hero ───────────────────── */

function Hero({ tweaks }) {
  const surveyUrl = tweaks.surveyUrl;
  return e('section', { id: 'top', className: 'hero', 'data-screen-label': '01 Hero' },
    e('div', { className: 'wrap hero-content' },
      e('div', { className: 'hero-single' },
        e('h1', { className: 'serif hero-headline' },
          'The way you deliver is about to', ' ',
          tweaks.accentItalicChange ? e('em', null, 'change.') : 'change.'
        ),
        e('p', { className: 'hero-sub' }, tweaks.heroSubhead),
        e('div', { className: 'cta-row' },
          e('a', {
            href: surveyUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'btn btn-primary'
          },
            'Shape the research ', e('span', { className: 'arrow' }, '→')
          )
        )
      )
    )
  );
}

/* ───────────────────── manifesto ───────────────────── */

function Manifesto() {
  return e('section', { id: 'manifesto', className: 'section manifesto-section', 'data-screen-label': '02 The Shift' },
    e('div', { className: 'wrap' },
      e('p', { className: 'manifesto-lede' },
        'Everything is ', e('em', null, 'compressing'), '.'
      ),
      e('div', { className: 'manifesto-lines' },
        e('p', { className: 'manifesto-line' },
          e('strong', null, 'Cycles.'), ' ', e('strong', null, 'Timelines.'),
          ' The distance between idea and outcome.'
        ),
        e('p', { className: 'manifesto-line' },
          'AI has compressed execution. The teams that lead from here will be the ones that turn faster motion into clearer ',
          e('strong', null, 'signal'), '.'
        )
      )
    )
  );
}

/* ───────────────────── the premise ───────────────────── */

function Premise() {
  const pillars = [
    {
      num: '01',
      label: 'Direction',
      word: 'Plan',
      hook: 'Direction before motion.',
      body: 'Define intent, assumptions, constraints, and the signal you are looking for before fast work becomes random work.',
    },
    {
      num: '02',
      label: 'Evidence',
      word: 'Execute',
      hook: 'Evidence through action.',
      body: 'Identify and manage signal as it emerges through execution. Decisions, handoffs, exceptions, and outcomes become evidence teams can use to keep people and agents advancing intent.',
    },
    {
      num: '03',
      label: 'Proof',
      word: 'Achieve',
      hook: 'Proof for what comes next.',
      body: 'Ask what the work proved, what changed because of it, and what should happen next.',
    },
  ];

  return e('section', { id: 'premise', className: 'section section-panel', 'data-screen-label': '03 The Premise' },
    e('div', { className: 'wrap' },
      e('div', { className: 'premise-intro' },
        e('div', { className: 'section-head' },
          e('h2', { className: 'serif section-title' },
            'Turn speed into ', e('em', null, 'signal'), '.'
          ),
          e('p', { className: 'section-lede' },
            'AI is changing delivery: from tasks assigned to people, to outcomes pursued by people and agents together. When execution gets compressed, direction becomes the constraint. Teams need a way to know, quickly and clearly, whether work is advancing strategic intent or drifting from it. That evidence is signal. Everything else becomes noise.'
          )
        ),
        e('div', { className: 'premise-visual', 'aria-hidden': 'true' },
          e('img', {
            src: 'assets/images/premise-signal.jpg',
            alt: 'Abstract visualization of data streams converging into actionable signal',
            loading: 'lazy',
            decoding: 'async'
          })
        )
      ),
      e('div', { className: 'premise-grid' },
        pillars.map((p) =>
          e('div', { key: p.num, className: 'premise-cell' },
            e('div', { className: 'serif premise-word' },
              e('span', { className: 'premise-num' }, p.num),
              p.word
            ),
            e('div', { className: 'premise-right' },
              e('p', { className: 'premise-hook' }, p.hook),
              e('p', { className: 'premise-body' }, p.body)
            )
          )
        )
      )
    )
  );
}

/* ───────────────────── research ───────────────────── */

function Research({ tweaks }) {
  return e('section', { id: 'research', className: 'section', 'data-screen-label': '05 Research' },
    e('div', { className: 'wrap' },
      e('div', { className: 'research-card' },
        e('div', { className: 'research-left' },
          e('div', { className: 'eyebrow-text', style: { color: 'var(--mint)' } }, '— State of Delivery 2026'),
          e('h3', { className: 'research-title' },
            'An anonymous survey for the people doing the work.'
          ),
          e('p', { className: 'research-body' },
            'We are mapping how delivery actually works now: where teams are gaining speed, where signal is breaking down, and what new operating patterns are emerging.'
          )
        ),
        e('div', { className: 'research-right' },
          e('a', {
            href: tweaks.surveyUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'btn btn-primary'
          },
            'Take the survey ', e('span', { className: 'arrow' }, '→')
          ),
          e('div', { className: 'research-meta' },
            '10 questions', e('span', { className: 'sep' }, '·'),
            'Anonymous', e('span', { className: 'sep' }, '·'),
            'Under 3 min'
          )
        )
      )
    )
  );
}

/* ───────────────────── field tests ───────────────────── */

function FieldTests({ tweaks }) {
  const hypotheses = [
    {
      num: '01',
      gap: 'The Decision Gap',
      headline: 'Teams can now build faster than their organizations can decide what to build.',
      body: "Execution has compressed. Governance hasn't. Decision structures designed for a slower era can't produce answers at the speed the work now demands. Either decisions get rubber-stamped without real examination, or teams sit idle waiting on approvals that take longer than the build itself.",
    },
    {
      num: '02',
      gap: 'The Validation Gap',
      headline: 'Teams can now ship faster than they can prove they built the right thing.',
      body: "AI tools compressed the generation phase. They didn't compress — and most teams haven't rebuilt — the judgment layer that catches whether the right thing was built. Validation used to happen implicitly, through the friction of slower cycles. That friction is gone. What's left is teams shipping fast, looking productive, and accumulating unverified work whose cost shows up later.",
    },
    {
      num: '03',
      gap: 'The Measurement Gap',
      headline: "The metrics we inherited are measuring the thing that's become cheapest.",
      body: "Velocity, utilization, on-time delivery — all designed for an era when execution capacity was the binding constraint. When the constraint moves up the stack, these metrics measure the wrong thing. Teams optimizing for them are optimizing for the part of the work that's disappearing. The dashboards look healthy while the work drifts.",
    },
  ];

  return e('section', { id: 'fieldtests', className: 'section section-panel', 'data-screen-label': '04 Field Tests' },
    e('div', { className: 'wrap' },
      e('div', { className: 'section-head' },
        e('h2', { className: 'serif section-title' },
          'Where speed loses ', e('em', null, 'signal'), '.'
        ),
        e('p', { className: 'section-lede' },
          'Three working reads on the gaps opening as delivery cycles compress.'
        )
      ),
      e('div', { className: 'ft-grid' },
        hypotheses.map((h) =>
          e('div', { key: h.num, className: 'ft-cell' },
            e('div', { className: 'ft-gap' }, h.gap),
            e('h3', { className: 'ft-headline' }, h.headline),
            e('p', { className: 'ft-body' }, h.body)
          )
        )
      )
    )
  );
}

/* ───────────────────── speaking ───────────────────── */

function Speaking({ tweaks }) {
  return e('section', { id: 'speaking', className: 'section', 'data-screen-label': '06 Speaking' },
    e('div', { className: 'wrap' },
      e('div', { className: 'speaking-wrap' },
        e('div', { className: 'speaking-rule' }),
        e('h2', { className: 'serif speaking-title' }, 'Invite the conversation.'),
        e('p', { className: 'speaking-body' },
          'Talks, panels, and workshops for delivery leaders navigating the shift.'
        ),
        e('a', {
          href: tweaks.speakingFormUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'btn btn-primary speaking-cta'
        },
          'Inquire ', e('span', { className: 'arrow' }, '→')
        )
      )
    )
  );
}

/* ───────────────────── footer ───────────────────── */

function Footer() {
  const mailUser = 'info';
  const mailHost = ['planexecuteachieve', 'com'].join('.');
  const mailHref = 'mailto:' + mailUser + '@' + mailHost;
  return e('footer', { className: 'footer' },
    e('div', { className: 'wrap' },
      e('div', { className: 'footer-inner' },
        e('div', { className: 'footer-mark' },
          e('span', { className: 'footer-name' },
            'Plan Execute Achieve',
            e('span', { className: 'tm' }, '™')
          )
        ),
        e('div', { className: 'footer-meta' },
          e('span', { className: 'footer-co' }, '© 2026 Plan Execute Achieve LLC'),
          e('span', { className: 'sep' }, '·'),
          'Tennessee',
          e('span', { className: 'sep' }, '·'),
          e('a', { href: 'privacy-policy.html', className: 'footer-link' }, 'Privacy Policy'),
          e('span', { className: 'sep' }, '·'),
          e('a', { href: mailHref, className: 'footer-link' }, 'Contact')
        )
      )
    )
  );
}

/* ───────────────────── app ───────────────────── */

function BackToTop() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return e('button', {
    className: 'back-to-top' + (shown ? ' is-shown' : ''),
    onClick: goTop,
    'aria-label': 'Back to top'
  },
    e('svg', { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
      e('path', {
        d: 'M8 13V3M8 3L3 8M8 3l5 5',
        stroke: 'currentColor',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      })
    )
  );
}

function App() {
  const tweaks = window.__CONFIG__;

  return e(React.Fragment, null,
    e('a', { href: '#main-content', className: 'skip-link' }, 'Skip to content'),
    e(Nav, { surveyUrl: tweaks.surveyUrl }),
    e('main', { id: 'main-content' },
      e(Hero, { tweaks: tweaks }),
      e(Manifesto, null),
      e(Premise, null),
      e(FieldTests, { tweaks: tweaks }),
      e(Research, { tweaks: tweaks }),
      e(Speaking, { tweaks: tweaks })
    ),
    e(Footer, null),
    e(BackToTop, null)
  );
}

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App, null));
// Signal that React has rendered — used by animation script
setTimeout(function () { window.__REACT_READY__ = true; }, 0);

})();
