define(function () {
	var sections = [];

	$('div .row').each(function () {
		sections.push('#' + $(this).attr('id'));
	});

	$('nav a').click(function () {
		var section = $(this).attr('href');
		scrollTo($(section).offset().top);
	});
	
	$('div .row').swipe({ swipe: handleSwipeUpDown }, 0);

	function handleSwipeUpDown (event, direction) {
		if (!/(down|up)/.test(direction)) {
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
		$('html, body').animate({'scrollTop': top }, 500, 'swing');
	}
});