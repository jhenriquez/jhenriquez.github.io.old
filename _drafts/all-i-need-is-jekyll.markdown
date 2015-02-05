---
layout: post
title: "All I Need Is Jekyll"
sub: "...or... How I am costumizing my Github Page, blog and loving it."
categories: Jekyll Web Development
author: Julio
---

I remember telling a friend some time ago I was going back to blogging and was planning on building a small engine. His advice, after some consideration changed my mind about writing my own thing. He basically argued that writting being my actual intention I probably was not considering the *energy, time and effort* I'd need to deviate from it and, in passing, metioned *Jekyll*.
<!--excerpt-->

At the time a couple of things were motivating me towards a custom solution: NodeJS Fever. I wanted a personal page AND a blog.

I wanted a fully customizable personal page, preferibly written from scratch and I didn't think any available blogging solution would truely allow me that. The basic idea was to build a simple app with express or hapi, serve my static web page and write some basic content management functionality for a blog. Lets be honest, it didn't sound simple at all. Again, NodeJS fever :)

Then, I didn't know anything about it but I guess Github Pages was promising enough for me. 

>Jekyll is a simple, blog-aware, static site generator... Think of it like a file-based CMS, without all the complexity.

In other words, Jekyll generates static sites based on flexible, simple rules applied over a file structure. Add a template engine and some configuration to the mix and you've got an amazingly powerful tool. I don't plan to go into details on its capabilities, since they already provide very nice [documentation][Jekyll Docs]. I'd like to talk a little bit about my experience costumizing it as a Github page. Installation and requirements are beyond this post. That said, let's get down to business:

Initializing a new document structure with `jekyll new <path>`, provides us with a fully functional deployment. We can run `jekyll build` on the root and we'll get our static content on a new directory named `_site`, we could even start a local server using `jekyll serve`. Not much fun if you ask me, but it all depends on what you're looking for. It's worth mentioning there are plenty of *ready to wear* themes around the web. A quick search should land you on an archive in no time.

In summary, a `build` will essentially do two things:

* Copy all folders not prefixed with an underscore (unless excluded in the config) to the output directory (`_site` being default).
* Pre-processed files that start with `Front Matter` (a block of valid YAML).

`Front Matter` is where all the fun begins. As mentioned before, it is a block of valid YAML within two sets of three dashes introduced in the beginning of a file:

{% highlight YAML %}
---
# I am valid YAML comment.
some_variable: "I am a valid string YAML value."
---
{% endhighlight %}

The implications vary for our different type of files. In the case of our assets, for instance our `main.scss`, only adding a block tells Jekyll we want to process our sass, it would gladly do the same for our coffee. Ain't this beautiful? For our sass and coffee files the dashes would suffice, as far as I know any variable we declare in the YAML is useless.

Markdown being a first class citizen, we use it for our posts or simply to generate pages. To these files, variables declared may have meaning (predifined) or serve as properpties (custom) and passed along to the template engine (Liquid, another valuable companion) so you can use then as you please. Default values can be set for all variables. HTML files can also be processed if Front Matter is included. This can be of great use, since you'll get the power of the templating language with partials and layout composition. Unfortunately, Liquid's syntax is also out of the scope of this article.

Armed with this basic knowledge I went on to create my personal site and blog, different entities under the same roof. Unconcerned with the blog at first, I literarily put it aside by moving the default `index.html` into a `blog` directory, created a blank new index and added a scripts directory to store my JavaScript. Using basic behavior of Jekyll (and the asumption that most web servers will render index by default) we can create better looking routes using directories.

To facilitate things I also added Grunt and Bower into the mix. That's how unintrusive Jekyll is. I only excluded a couple of directories and some files.

{% highlight YAML %}
# _config.yml
exclude: ['components', 'node_modules', 'Gruntfile.js', 'package.json', 'bower.json']
{% endhighlight %}

Tah dah! Now I have a very flexible development environment where almost anything is possible. The limitations I've found so far are of some significance but rather circunstancial at the momment.

One that is bugging me is that I've not figure out how to create *"Post by Category"* listing. My first approach failed miserably, it involved creating a page that listed the post filed under a given category. The page would receive this category on the querystring and that's where all fell down to pieces. Liquid does not provide a way to grab those values and since templates are processed before the page is ever loaded JavaScript can't help me. Well, what did I expect, it's an static site after all. Still, I feel there is something I could be missing.

A more significant matter I've encountered is optimization and bundling. As it stands I'm using some JavaScript libraries and a couple of fonts. Naturally, there are plugins that help you handle this but I'm running on GitHub Page, which for obvious security reasons overrides the `safe:true` setting, disabling plugins.

Since I'm using requirejs, I believe my best bet will be using one of the available Grunt packages and setup a task. Even though I've kept everything simple and small, I feel I'd be doing the user a favor in optimizing the site. On the other hand it will be a good exercise to have it as a non-intrusive step. Until that time comes, I'll have to do with the `sass compress` [settings][Jekyll Assets], and using the minified versions.

In conclusion I'm very happy with what I've been able to achieve with *Jekyll*. I've safe a lot of time and effort by concentrating only providing my site the look and feel I wanted. I'm sure improvements will be made, but to the moment the experience has been great.

[Jekyll Docs]: http://jekyllrb.com/docs/home/
[Jekyll Assets]: http://jekyllrb.com/docs/assets/
[Developmentseed Jekyll]: http://www.developmentseed.org/blog/2011/09/09/jekyll-github-pages/