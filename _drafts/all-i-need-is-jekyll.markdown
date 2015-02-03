---
layout: post
title: "All I Need Is Jekyll"
sub: "...or... How I am costumizing my Github Page, blog and loving it."
categories: Jekyll Web Development
author: Julio
---

I remember telling a friend some time ago I was going back to blogging and was planning on building a small engine. His advice, after some consideration changed my mind about writing my own thing. He basically argued that blogging being my actual intention I probably was not considering the *energy, time and effort* I'd need to deviate from my original endevour and, in passing, metioned how he started using *Jekyll* at some point for similar reasons.
<!--excerpt-->

At the time a couple of things motivated me towards a custom solution: NodeJS Fever. I wanted a personal page AND a blog.

I wanted a fully customizable personal page, preferibly written from scratch. I didn't think any available blogging solution would truely allow me that. The basic idea was to build a simple app with express or hapi that would essentially serve my static web page and provide me some basic content management functionality for a blog. Lets be honest, it didn't sound simple at all. Again, NodeJS fever :)

Luckily, I remembered my friend's reference to Jekyll. Then, the only thing I knew was that there was some tool with that name and there was support for it on Github Pages. Promising enough, for me.

>Jekyll is a simple, blog-aware, static site generator... Think of it like a file-based CMS, without all the complexity.

In other words, Jekyll generates static sites based on flexible, simple rules applied over a file structure. Add a template engine and some configuration to the mix and you've got an amazingly powerful tool. I don't plan to go into details on its capabilities, since they already provide very nice documentation. I'd like to talk a little bit about my experience costumizing it as a Github page.
 
It's worth mentioning that there are plenty of ready made themes for Jekyll around the web. A quick search should land you on an archive in no time. Also, Jekyll's installation and it's requirements are beyond this post. That said, let's get down to business:

When you start a new vanilla project with `jekyll new site` ("site" being just a name), a new folder is created.