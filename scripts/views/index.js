requirejs(['../main'], function() {
	requirejs(['jquery'], function () {
		requirejs(['bootstrap'], function () {
			requirejs(['views/IndexViewModel']);
		});
	});
});