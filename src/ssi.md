---
title: SSI
updated: 2026-03-06
layout: /main.njk
description: Creating a site with Nekoweb's SSI
---
## Nekoweb SSI
*Last updated: <span class="lastupd">{{updated | formatDate}}</span>*
*Author: <a class="lastupd" href="https://moosyu.github.io/">Moosyu</a>*

## Disclaimer

While the Nekoweb's <span title="Server Side Includes" class="help">SSI</span> are powerful tools for building a site on Nekoweb and using some tools you may find in a SSG like templating rendering Markdown into HTML, it does come with some caveats. The most important of these caveats is that the code you write will only reliably work on a site hosted on Nekoweb. Some of the directives are shared with popular SSI solutions like Apache's SSI however you shouldn't take it as a given that the code you write for it would be able to go with you if you were to switch hosts. If this is something you're worried about I'd consider checking out SGGs as you can achieve the functionality of the SSI in a more portable way, however this generally will also increase the complexity of your site. Also important to recognize is that some of the directives usable in Nekoweb's SSI will be only accessible to those with cute kitty of Neko tier of Nekoweb premium.

## Getting started, the layout directive

This is my site (I hope you like it, I worked really hard on it):

![blank page with nav and text](/assets/ssi/firstpage.png)

However I've come to find it annoying to need to add the same code for my `<head>` and `<nav>` on every page when it'll be nearly identical on each one. The solution for this is the `layout` directive where you can create the HTML to wrap your content in so you don't have to write redundant code like this. First I'm going to create a new folder in the root of my site and name it `layouts` and inside of this folder I'm going to create a new file named `base.html` which will be the base layout that all my pages use.

I'm going to look inside index.html which is currently the following:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nekoweb SSI!</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/pages/about.html">About</a>
    </nav>
    <p>This is for a guide on how to use Nekoweb's SSI</p>
</body>
</html>
```

and from this file I'm going to take everything but the content of the page (the text in `<p>`) and put it into my `base.html` file. However where I want the main content to be I'm going to put the `block` directive like so: `<!--# block name="content" --><!--# endblock -->`. It could be noted that when a layout is imported any content outside a block is placed at the bottom of the `<body>` so if your layout just has stuff to be placed above the content you don't strictly need a block for content however if just for clarity's sake I'd still add one. This is the syntax for an SSI directive, nearly identical to a comment in HTML or XML but with a hashtag after the second dash. Blocks also must be named to be used, I named this one content as thats what it'll be wrapped around but there are no hard and fast naming rules, I could've named it John and as long as I accessed it correctly later it'd still work the same. You can think of blocks as you would for something like a div, it needs to be open and closed and can store other elements inside it. You can even add something like `<!--# block name="content" --><p>Oops! I must've forgotten to add content to this page!</p><!--# endblock -->` inside your content block and now when you import the layout without overwriting the content blocks content this message will be displayed instead.

Now lets import our new layout into an HTML file. I'm going to import it into my `index.html` by deleting everything from it and adding the `<!--# layout file="./layouts/base.html" -->` directive, leaving my page empty aside from it. The valid path types are:
* relative to the current working directory (as we're doing here) accessed with `./` or nothing at all
* within the parent directory of the current page which can be accessed with the `../` (can be chained to go up multiple folders)
* absolute from the root of your account so you'd do something like `<!--# layout file="/sitename.nekoweb.org/layouts/base.html" -->`
* absolute from the root of your site, accessed with `~/`.

In my opinion accessing your files with `./` or `~/` are the best options and if anything the latter is a direct upgrade to using a `/` however it's of course up to you when and where to use these different options.

That aside, if you've followed correctly you should now see whatever was inside your layout on the page you imported it into. If you don't see anything you've likely used the directive incorrectly (probably a misspelling). If it says "File not found" then something in your file path is likely incorrect. You should also note that unlike blocks, layout directives don't need to be closed. Now, if I want to add content to my block just add the same `<!--# block name="content" --><!--# endblock -->` directive as before (with the content name) and anything inside will be added wherever the content block was defined in your layout. This is what the code of my `index.html` looks like now:

```html
<!--# layout file="./layouts/base.html" -->

<!--# block name="content" -->
	<p>This is for a guide on how to use Nekoweb's SSI</p>
<!--# endblock -->
```

It's important for the layout directive specifically that it's at the top of your file or it won't work.

## Partials with the include directive

Partials allow you to further break up components of your site and can be important if you want to maintain consistency between lots of layouts, I'll be creating partials for my meta tags and my nav by taking advantage of the include directive which inserts the code contained in the imported file wherever the directive has been placed.

Firstly I'm going to create a new folder in the root of my site named `partials` and inside of it I'll create `meta.html` and `navbar.html`. I'll do `navbar.html` first as it will be the easiest. Inside of it I'll put just the code:

```html
<nav>
    <a href="/">Home</a>
    <a href="/pages/about.html">About</a>
</nav>
```

Note that as with the pages you import the layout into, as I'll be importing this into my base layout boilerplate isn't needed, just the navbar specific code. Now, inside of my `base.html` I'll add `<!--# include file="../partials/navbar.html" -->` where my navbar code once was. Include directives also don't need to be closed. Now if all has gone well, pages with the base layout will look unchanged from when the navbar was code placed right in my base layout.

Now for the meta partial I'll do the same process as the navbar, cut the code in `base.html` from the head and add it to meta, however as I'll want to be able to change my page title specifically for every page, inside the `<title>` tags I'll add `<!--# block name="title" -->Nekoweb SSI!<!--# endblock -->`, now "Nekoweb SSI will be the default title but if I wish to change it I just have to add `<!--# block name="title" -->Unique title<!--# endblock -->` to a page with the partial included. As I want this partial to be imported in every page with the layout though I'll just add `<!--# include file="../partials/meta.html" -->` in the head. This is one way to get this functionality but another could be not having title in the meta.html at all and instead having a block inside your `<head>` tags so you can modify it how you want on a page-by-page basis.

I should note that using partials in this way won't be all that helpful unless you 

## Displaying site stats without JS

If you're somewhat familiar with Nekoweb's ecosystem you're likely aware of Max's script to display your site stats however fortunately enough the SSI also has the capabilities to display view count, update count and follower count. By writing HTML like so:

```html
<p>This site has: <!--# views --> views.</p>
<p>This site has been updated <!--# updates --> times </p>
<p>This site has: <!--# followers --> followers.</p>
```

Now I can find out the unfortunate truth that my new site has zero followers with style. When the Nekoweb server sends the contents of the page to the browser these directives are replaced with the number values of your site. Displaying your stats this way has three benefits over the traditional JS approach. Firstly it's (a tiny bit) faster, secondly it's easier to deal with especially if you aren't familiar with JS and lastly and by far most importantly it allows these stats to be displayed to users who have JS disabled which is more common than you'd expect amongst people who browse the indie-web.

## Making a blog with premium directives

There are three Neko tier directives, render, error and list. Render and list are often used in conjunction to make things like blogs however both give you a fair few options, especially list which can be used for not just listing blog posts but could be used for an image gallery, to view a random file in a folder or to generate a sitemap and those are just off the top of my head. Render allows you to display the contents of a markdown file rendered in HTML without using a JS parser like [marked](https://github.com/markedjs/marked). To use this first I'd need to create a markdown file, I've created one in a new folder called `posts`. I've named the markdown file `post-1.md` and inside is some random markdown. Now inside the posts folder once more I'm going to create a new file named `post-1.html` which has my layout imported, a title and also `<!--# render file="./post-1.md" -->` placed inside the "content" block. Now inside this page markdown will be converted to HTML and inserted in my content block.

However as I'm sure you've noticed this method is lame, creating an HTML file for each post? Who has time for that? Fortunately there is a way to solve this issue, `_catchall.html`, which is available for everyone with cute kitty tier and above as well as the `{{filename}}` variable which returns the last section of the viewed page's URL with the file extension removed (e.g. in https://sitename.nekoweb.org/posts/post-1.html `{{filename}}` would be "post-1"). First I'm going to create a file named `_catchall.html` inside of my posts folder. This file acts much like not_found.html however it acts before it, so if someone goes to a page inside the posts folder that doesn't exist, _catchall.html will be displayed instead. This can be used to dynamically render markdown files as one could in an SSG like Astro or Eleventy. The code used in _catchall.html is rather simple, like so:

```
<!--# layout file="../layouts/base.html" -->
<!--# block name="content" -->
    <!--# render file="./{{filename}}.md" notfound="This post can't be found!" -->
<!--# endblock -->
```

Now if I delete my `post-1.html` file, if someone was to visit that page post-1 would now be automatically rendered! You can also use the `flastmod` directive if you'd like to display the last modified date of that particular post. Generally you'd do something like `<!--# flastmod file="./{{filename}}.md" -->` however flastmod also has two optional attributes, fmt which is how you format the string and timezone which uses the [TZ identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). The default for these attributes would look like `<!--# flastmod file="index.html" fmt="%Y-%MM-%dd %HH:%mm:%ss" timezone="UTC" -->`. The format specifiers can be seen in the table below (courtesy of Dimden)

| Specifier | Meaning                                    |
|-----------|--------------------------------------------|
| %a        | Abbreviated day of week (e.g. Mon)         |
| %A        | Full day of week (e.g. Monday)             |
| %b        | Abbreviated month (e.g. Feb)               |
| %B        | Full month (e.g. February)                 |
| %d, %dd   | Day of month (dd = zero padded)            |
| %H, %HH   | Hour in 24-hour format (HH = zero padded)  |
| %h, %hh   | Hour in 12-hour format (hh = zero padded)  |
| %M, %MM   | Month as number (MM = zero padded)         |
| %m, %mm   | Minute (mm = zero padded)                  |
| %p        | AM or PM                                   |
| %s, %ss   | Second (ss = zero padded)                  |
| %i, %ii   | Millisecond (ii = zero padded to 3 digits) |
| %y        | Last 2 digits of year                      |
| %Y        | Full year                                  |
| %u        | Unix time in milliseconds                  |

If I wanted to generate a list of my blog posts as I mentioned earlier, the list directive can be used. The list directive returns a JSON array encoded with Base64. The decoded output will look something like:
```json
[
    {
        "name": "post1.md",
        "isDirectory": false,
        "preview": "IyBibG9nIHBvc3QgMQoKd2h5IGFyZSB5b3UgcmVhZGluZyB0aGlzPw",
        "created_time": 1772786319228,
        "modified_time": 1772786319228,
        "size": 42
    },
    {
        "name": "post2.md",
        "isDirectory": false,
        "preview": "IyBibG9nIHBvc3QgMgoKbWFrZSBzdXJlIHRvIHNtYXNoIGxpa2UgYW5kIHN1YnNjcmliZQ",
        "created_time": 1772786332171,
        "modified_time": 1772786402531,
        "size": 54
    }
]
```

The entries contain:

* name, the name of the file/folder
* isDirectory, boolean which is true if the entry is a folder
* preview, the first 256 bytes of the file encoded as Base64
* created_time, the time the entry was created in unix ms
* modified_time, the time the entry was last modified in unix ms
* size, the size of the file in bytes (but only if the file isn't a folder)

Unfortunately due to how this works I'll need to use JS to display the list contents, fortunately you don't need all that much to make it work. I've created a file named `blog-posts.html` in my `pages` folder and with the following code will display a list of items in the folder `posts`.

```js
const postsList = document.getElementById("postsList");
const posts = JSON.parse(atob(`<!--# list dir="../posts"`));
posts.sort((a, b) => b.modified_time - a.modified_time);

for (let post of posts) {
  if (post.isDirectory) continue;

  const postName = post.name.split(".")[0];
  const postItem = document.createElement("li");
  const preview = atob(post.preview);
  const match = preview.match(/^#\s+(.+)/m);
  const postTitle = (match && match[1]) || postName;

  postItem.innerHTML = `<a href="/posts/${postName}.html">${postTitle}</a>`;
  postsList.append(postItem);
}
```

For the name it assumes at the start of every post you're doing `# Post name`. If this value doesn't exist it uses the name of the file instead. The posts are sorted by date modified however if you'd prefer date created you can just switch uses of `modified_time` to `created_time`.

## Notes

Make sure to check out [the official Nekoweb SSI details page](https://nekoweb.org/ssi), I left out the `fsize`, `follow` and `error` directives as I couldn't figure out a good way to fit them in. There's also some details on limitations and notes in that page as well as an example for using the `list` directive to generate a gallery which you may find helpful.