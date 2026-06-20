(function () {
  var navLinks = Array.from(document.querySelectorAll('.nav-list a'));
  var sectionLinks = navLinks.filter(function (a) {
    var href = a.getAttribute('href') || '';
    return href.startsWith('#');
  });

  var sections = sectionLinks
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

    sectionLinks.forEach(function (a) {
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

  document.querySelectorAll('.resume-btn').forEach(function (link) {
    link.addEventListener('click', function () {
      sendEvent('resume_click', {
        link_text: link.textContent.trim(),
        link_url: link.href
      });
    });
  });

  document.querySelectorAll('a[href*="linkedin.com"]').forEach(function (linkedIn) {
    linkedIn.addEventListener('click', function () {
      sendEvent('linkedin_click', {
        link_url: linkedIn.href,
        link_text: linkedIn.textContent.trim()
      });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (mail) {
    mail.addEventListener('click', function () {
      sendEvent('email_click', {
        link_url: mail.href,
        link_text: mail.textContent.trim()
      });
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (phone) {
    phone.addEventListener('click', function () {
      sendEvent('phone_click', {
        link_url: phone.href,
        link_text: phone.textContent.trim()
      });
    });
  });

  document.querySelectorAll('.tracked-project-link').forEach(function (projectLink) {
    projectLink.addEventListener('click', function () {
      sendEvent('project_link_click', {
        link_name: projectLink.dataset.linkName || '',
        link_url: projectLink.href,
        link_text: projectLink.textContent.trim()
      });
    });
  });
})();
