requirejs.config({
	baseUrl: './scripts',
	paths: {
		jquery: 'jquery/jquery.min',
		fullpage: 'jquery/jquery.fullPage.min',
    momentjs: 'moment-with-locales.min',
    react: 'react'
	},
  shim: {
    fullpage: { deps: ['jquery'] }
  }

});