requirejs(['../main'], function() {
	requirejs(['jquery', 'touchswipe'], function () {
		requirejs(['bootstrap'], function () {
			requirejs(['views/IndexViewModel']);
		});
	});
});