window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-CZ9D25LCPT');

(function () {
	var links = Array.from(document.querySelectorAll('.nav-list a'));
	var sections = links.map(function (a) {
		return document.querySelector(a.getAttribute('href'));
	}).filter(Boolean);

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
	window.addEventListener('scroll', function () {
		btn.classList.toggle('show', window.scrollY > 400);
	});

	function sendEvent(name, params) {
		if (typeof gtag === 'function') {
			gtag('event', name, params || {});
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

	var linkedIn = document.querySelector('a[href*="linkedin.com"]');
	if (linkedIn) {
		linkedIn.addEventListener('click', function () {
			sendEvent('linkedin_click', {
				link_url: linkedIn.href
			});
		});
	}
})();
