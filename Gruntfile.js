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
		},
		mocha: {
			specs: {
				src: ['_specs/**/*.html']
			}
		}
	});

	g.loadNpmTasks('grunt-bower-task');
	g.loadNpmTasks('grunt-mocha');
};