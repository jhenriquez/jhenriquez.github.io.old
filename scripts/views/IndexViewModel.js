define(function () {
	$('nav a').click(function () {
		var section = $(this).attr('href');
		$('html, body').animate({'scrollTop': $(section).offset().top }, 500, 'swing');
	});
});