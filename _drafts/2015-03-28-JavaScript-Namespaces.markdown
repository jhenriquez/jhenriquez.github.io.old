---
layout: post
title: "JavaScript Namespaces: Protospace"
sub: "...or... How I am exporting big libraries in NodeJS"
categories: NodeJS Development CommonJS
author: Julio
---

Using objects to simulate namespaces is an ancient, and [universally preferable][2], JavaScript practice. It's a simple and arguably elegant workaround to a major downside of the language. Building these objects in the browser, when working with multiple files, is painless. When it comes to NodeJS modules, creating these objects could turn out to be very unpleaseant, specially as the list of exported elements grow. Personally, I decided to try and tackle it once and for all (yeah right, like this is not software) with a little library.
<!--excerpt-->

The functionality provided by [protospace][1] is quite simple:

* It allows you to register individual functions and objects under a given namespace from within a module (file).
* It provides a mechanism to retrieve these namespaces.

Repectively protospace exposes [register](#register) and [bundling](#bundle) functions for these cases.

### <a href="#register"></a> Registries ###

{% highlight JavaScript %}
// Filename: module-A.js

var protospace = require('protospace');

function A() { }

protospace.register(A); // => { "A" : A }

protospace.register(A, 'Some.Namespace'); // => { "Some": { "Namespace": { "A": A } } }

protospace.register(A, 'Some.Namespace', 'PropertyName'); // => { "Some": { "Namespace": { "PropertyName": A } } }

module.exports = A;

{% endhighlight %}


### <a href="#bundle"></a> Bundles ###

{% highlight JavaScript %}
// Filename: index.js

var protospace = require('protospace');
require('path/to/module-A');

module.exports = protospace.bundle(); 

/* =>  
  {
   "A" : A,
   "Some": {
      "Namespace": {
        "A": A,
        "PropertyName": A     
      }  
    }
  }

*/
{% endhighlight %}


[1]: https://github.com/jhenriquez/protospace
[2]: https://developer.mozilla.org/en-US/Add-ons/Overlay_Extensions/XUL_School/JavaScript_Object_Management
[3]: http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
[4]: https://github.com/colin-jack/require-namespace
[5]: https://www.npmjs.com/package/simple-namespace