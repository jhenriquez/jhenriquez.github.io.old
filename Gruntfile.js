module.exports = function (g) {
	g.initConfig({
		bower: {
			copy: {
				options: {
					targetDir: './',
					install: false,
					layout: function (type) { return type; }
				}
			}
		}
	});

	g.loadNpmTasks('grunt-bower-task');
};