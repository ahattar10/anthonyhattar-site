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
})();
