requirejs.config({
	baseUrl: './scripts',
	paths: {
		jquery: 'jquery.min',
		bootstrap: 'bootstrap.min'
	}
});

requirejs(['jquery'], function() {
	requirejs(['bootstrap']);
});
