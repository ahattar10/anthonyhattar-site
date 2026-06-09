(function () {
  var links = Array.from(document.querySelectorAll('.nav-list a'));
  var sections = links
    .map(function (a) {
      return document.querySelector(a.getAttribute('href'));
    })
    .filter(Boolean);

  function setActiveByScroll() {
    var nav = document.querySelector('nav');
    var navHeight = nav ? nav.offsetHeight : 0;
    var marker = window.scrollY + navHeight + 24;
    var currentId = sections[0] ? sections[0].id : '';

    sections.forEach(function (section) {
      if (marker >= section.offsetTop) {
        currentId = section.id;
      }
    });

    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
    });
  }

  setActiveByScroll();
  window.addEventListener('scroll', setActiveByScroll, { passive: true });
  window.addEventListener('resize', setActiveByScroll);

  var btn = document.querySelector('.to-top');
  if (btn) {
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 400);
    });
  }

  function sendEvent(name, params) {
    if (typeof gtag === 'function') {
      gtag('event', name, Object.assign({ transport_type: 'beacon' }, params || {}));
    }
  }

  function trackLinkClick(event, eventName, params) {
    var link = event.currentTarget;
    var href = link && link.href;
    if (!href) {
      return;
    }

    // For mail/phone links, fire event and let browser/app handle immediately.
    if (/^(mailto:|tel:)/i.test(href)) {
      sendEvent(eventName, params);
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      sendEvent(eventName, params);
      return;
    }

    event.preventDefault();

    var target = link.target;
    var didNavigate = false;

    function navigate() {
      if (didNavigate) {
        return;
      }
      didNavigate = true;

      if (link.hasAttribute('download')) {
        window.location.href = href;
        return;
      }

      if (target === '_blank') {
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }

      window.location.href = href;
    }

    if (typeof gtag === 'function') {
      gtag(
        'event',
        eventName,
        Object.assign({}, params, {
          event_callback: navigate
        })
      );
      setTimeout(navigate, 500);
    } else {
      navigate();
    }
  }

  document.querySelectorAll('.resume-btn').forEach(function (link) {
    link.addEventListener('click', function (event) {
      trackLinkClick(event, 'resume_click', {
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    });
  });

  document.querySelectorAll('a[href*="linkedin.com"]').forEach(function (linkedIn) {
    linkedIn.addEventListener('click', function (event) {
      trackLinkClick(event, 'linkedin_click', {
        link_url: linkedIn.href,
        link_text: linkedIn.textContent.trim()
      });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (mail) {
    mail.addEventListener('click', function (event) {
      trackLinkClick(event, 'email_click', {
        link_url: mail.href,
        link_text: mail.textContent.trim()
      });
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (phone) {
    phone.addEventListener('click', function (event) {
      trackLinkClick(event, 'phone_click', {
        link_url: phone.href,
        link_text: phone.textContent.trim()
      });
    });
  });
})();
