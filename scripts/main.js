requirejs.config({
	baseUrl: './scripts',
	paths: {
		jquery: 'jquery/jquery.min',
		bootstrap: 'bootstrap.min',
		fullpage: 'jquery/jquery.fullPage.min',
    react: 'react'
	},
  shim: {
    bootstrap: { deps: ['jquery'] },
    fullpage: { deps: ['jquery'] }
  }

});