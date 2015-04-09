---
layout: post
title: "JavaScript Namespaces: Protospace"
sub: "...or... How I am exporting big libraries in NodeJS"
categories: NodeJS Development CommonJS
author: Julio
---

Using objects to simulate namespaces is an ancient, and [universally preferable][2], JavaScript practice. It's a simple and arguably elegant workaround to a major downside of the language. Building these objects in the browser, when working with multiple files, is relatively painless. When it comes to NodeJS modules, creating these objects could turn out to be very unpleasant, specially as the list of exported elements grow. I decided to try and tackle it once and for all (yeah right, like this is not software) with a little library.
<!--excerpt-->

The functionality provided by [protospace][1] is quite simple:

* It allows you to register individual functions and objects under a given namespace.
* It provides a mechanism to retrieve these namespaces anywhere else.

Respectively protospace exposes registry and bundling functions for these cases.

### Registries ###

Registries store information about the functions (or objects) and the desired namespace. This is done with the Register method. This method not only stores the information, but also returns the built object.

{% highlight JavaScript %}
// Filename: module-A.js

var protospace = require('protospace');

function A() { }

protospace.register(A); // => { "A" : A }

protospace.register(A, 'Some.Namespace'); // => { "Some": { "Namespace": { "A": A } } }

protospace.register(A, 'Some.Namespace', 'PropertyName'); // => { "Some": { "Namespace": { "PropertyName": A } } }

module.exports = A;

{% endhighlight %}


By default, we are using a Global domain for these namespaces, but we also have named domains, with these we can further segrate our namespaces.


{% highlight JavaScript %}
// Filename: module-A.js

// ...

protospace.registerNamed('BDomain', B); // => { "B" : B }

// Use of the namespace and nameOverride parameters omitted for brevity.

module.exports = B;

{% endhighlight %}

### Bundles ###

Bundling is the process of merging these registered components into a single object (or domain). The following example illustrates it and also adds up the the actual impact and use of domains (or named registries):

{% highlight JavaScript %}
// Filename: index.js

var protospace = require('protospace');
require('path/to/module-A');

module.exports = protospace.bundle(); // => { "A" : A, "Some": { "Namespace": { "A": A, "PropertyName": A } } }

// Or... From a named domain:

module.exports = protospace.bundleFrom('BDomain'); // => { "B": B }

{% endhighlight %}

### What's next? ###

I still unsure about actually having to register the objects within the modules, since a bit intrusive. But I definitively dilike having to actually *require* the modules before I can actually bundle them. The [require-namespace][3] library has given me some inpiration as to where I can go. Having the library actually navigate the file system and *automatically* require any module that references protospace could be a start.

### In conclusion ###

[Protospace][1] has alleviated some of my pains when keeping sync of the files I'm exporting and has definitely made this aspect more maintenable.

[1]: https://github.com/jhenriquez/protospace
[2]: https://developer.mozilla.org/en-US/Add-ons/Overlay_Extensions/XUL_School/JavaScript_Object_Management
[3]: https://github.com/colin-jack/require-namespace