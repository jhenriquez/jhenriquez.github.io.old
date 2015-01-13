define(function () {
	var sections = [];

	$('div .row').each(function () {
		sections.push('#' + $(this).attr('id'));
	});

	$('nav a').click(function () {
		var section = $(this).attr('href');
		scrollTo($(section).offset().top);
	});

	$(window).on('scroll', scrolling);

	function scrolling (e) {
		var section = $(window.location.hash || '#Section1');		
		var currentSectionTop = section.offset().top;		
		var newTop = $(window).scrollTop();

		if (newTop == currentSectionTop) {
			return; // Nothing to do here!
		}

		var nextSection = newTop > currentSectionTop ? $(section).next() : $(section).prev();

		if (nextSection.length === 0) {
			return; // Nothing to do here!
		}

		scrollTo(nextSection.offset().top);
		window.location.hash = nextSection.attr('id');
	}
	
	$('div .row').swipe({ swipe: handleSwipeUpDown }, 0);

	var upOrDown = /(down|up)/i;

	function handleSwipeUpDown (event, direction) {
		if (!upOrDown.test(direction)) {
			return; // Dude, can't handle this!
		}

		var section = window.location.hash || '#Section1';
		var index = sections.indexOf(section);
		var nextSection = direction === 'up' ? 
						   index === sections.length - 1 ? sections[index] : sections[++index]
						 : index === 0 ? sections[index] : sections[--index];

		scrollTo($(nextSection).offset().top);
		window.location.hash = nextSection;
	}

	function scrollTo(top) {
		$(window).off('scroll', scrolling);
		$('html, body').animate({'scrollTop': top }, 500, 'swing', function () {
			$(window).on('scroll', scrolling);
		});
	}
});