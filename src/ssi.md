---
title: SSI
updated: 2026-03-10
layout: /main.njk
description: Creating a site with Nekoweb's SSI
---
## Nekoweb SSI
*Last updated: <span class="lastupd">{{updated | formatDate}}</span>*
*Author: <a class="lastupd" href="https://moosyu.nekoweb.org/">Moosyu</a> and <a class="lastupd" href="https://rice.place/">rice</a>*

## Disclaimer

While Nekoweb's <span title="Server Side Includes" class="help">SSI</span> are powerful tools for building a site on Nekoweb, it does come with some caveats. The most important of these caveats is that the code you write will only reliably work on a site hosted on Nekoweb's servers. Therefore if you prefer to edit your site locally, unless you're using something like WebDAV, you won't be able to preview your site with any conventional option like LiveServer. Some of the directives like `include` are shared with popular SSI solutions like <span title="A popular web server software" class="help">Apache</span>'s SSI however you shouldn't take it as a given that the code you write for it would be able to go with you if you were to switch hosts. Even if they share the same name and function they could still have been implemented differently. If this is something you're worried about I'd consider checking out <span title="Static site generators, there is a guide for a popular one, Eleventy, on this site!" class="help">SSGs</span> as you can achieve the functionality of the SSI in a more portable way, but this generally will increase the complexity of your site. It is also important to recognize that some of the directives usable in Nekoweb's SSI will be only accessible to those with Cute Kitty or Neko tier of Nekoweb premium, though when we reach them I'll point it out.

## Getting started, the layout directive

This is my site (I hope you like it, I worked really hard on it):

![blank page with nav and text](/assets/ssi/firstpage.png)

However I've come to find it annoying to need to add the same code for my `<head>` and `<nav>` on every page when it'll be nearly identical on each one. The solution for this is the `layout` directive, where we can create the HTML to wrap your content in so you don't have to write redundant HTML. First, we're going to create a new folder in the root of our site and name it `layouts` and inside of this folder we're going to create a new file named `base.html`. This will be the base layout that all my pages use.

Currently index.html is the following code:

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
        <a href="/pages/blog-posts.html">Blog posts</a>
    </nav>
    <p>This is for a guide on how to use Nekoweb's SSI</p>
</body>
</html>
```

From this file we're going to take everything but the content of the page (the text in `<p>`) and put it into the `base.html` file. However where we want the main content to be we can add the `block` directive like so: `<!--# block name="content" --><!--# endblock -->`. The `<!--# -->` is the syntax for a SSI directive, it is nearly identical to a comment in HTML or XML but with a hashtag after the second dash. Blocks also must be named to be used, we named this one content as thats what it'll be wrapped around but there are no hard and fast naming rules; we could've named it John and as long as we accessed it correctly later it'd still work the same (though it does need some name). You can also create multiple blocks in different places (e.g. one in the body and one in the head). You can think of blocks in the same way you would for something like a div, it needs to be open and closed and can store other elements inside it (but you can't nest other blocks in a block). It is also somewhat unique in that it's the only directive that needs to be closed.

{% note %}
Content blocks don't append the content inside one block to another when the same name attribute is reused, the previous content is overwritten. We can take advantage of this to add something like `<!--# block name="content" --><p>Oops! I must've forgotten to add content to this page!</p><!--# endblock -->` inside our content block so when we import the layout without adding content this warning is displayed.
{% endnote %}

Now lets import our new layout into an HTML file. To make sure it works we can import it into our `index.html` by deleting everything inside it and adding the layout directive like so `<!--# layout file="./layouts/base.html" -->` at the <span class="help" title="The layout directive cannot be inside other directives for it to work but apart from that can be placed anywhere. I just place mine right at the top of my file for clarity.">top of our `index.html` file</span>, leaving our page empty aside from it. The valid path types are:
* relative to the current working directory (as we're doing here) accessed with `./` or nothing at all.
* within the parent directory relative to the current working directory which can be accessed with the `../` (can be chained to go up multiple folders).
* absolute from the root of your account, access with `/` e.g. `<!--# layout file="/sitename.nekoweb.org/layouts/base.html" -->`.
* absolute from the root of your site, accessed with `~/` e.g. `<!--# layout file="~/layouts/base.html" -->`.

In my opinion accessing your files with `./` or `~/` are the best and most clear options even if some of these can supersede the others

{% note %}
When a file contains no `<!DOCTYPE html>` within itself the Nekoweb editor freaks out, however assuming your layout is formatted correctly, the version of the page seen by the users will contain that boilerplate. Therefore this warning can be ignored.
{% endnote %}


That aside, if you've followed correctly you should now see whatever was inside your layout on the page you imported it into. If you don't see anything you've likely used the directive incorrectly (probably a misspelling of layout or missing a #). If it says "File not found" then something in your file path is likely incorrect.

Now, if everything is working and we want to add content to our content block just add the same `<!--# block name="content" --><!--# endblock -->` directive as before (with the content name) and anything inside will be added wherever the content block was defined in your layout. This is what the code of my `index.html` looks like now:

```html
<!--# layout file="./layouts/base.html" -->

<!--# block name="content" -->
	<p>This is for a guide on how to use Nekoweb's SSI</p>
<!--# endblock -->
```

{% note %}
Technically when a layout with a content block is imported but no block is defined, all content becomes part of the content block. I've seen a few people opt to not add content blocks to their pages using a layout, however if just for clarity's sake I'd still add one.
{% endnote %}

## Includes with the include directive

Includes allow you to further break up components of your site and can be important if you want to maintain consistency between lots of layouts or if you just want reusable combinations of HTML that you use commonly on your site. We'll be creating includes for our meta tags and navbar by taking advantage of the include directive, which inserts the code contained in the imported file wherever the directive has been placed.

Firstly we're going to create a new folder in the root of our site named `includes` and inside of it we'll create `meta.html` and `navbar.html`. We'll do `navbar.html` first as it will be the easiest. Inside of it we can put just the code:

```html
<nav>
    <a href="/">Home</a>
    <a href="/pages/blog-posts.html">Blog posts</a>
</nav>
```

{% note %}
As we're be importing this into our base layout, boilerplate isn't needed, just the navbar-specific code.
{% endnote %}

Now, inside of our `base.html` layout we can add `<!--# include file="../includes/navbar.html" -->` where our navbar code once was. If all has gone well, pages with the base layout will look unchanged from when the navbar was code placed right in our base layout.

For the meta include the process will be much the same. Cut the code in `base.html` from the head and add it to `meta.html`, however as we'll want to be able to change our page title specifically for every page, where the `<title>` tags were we can add `<title><!--# block name="title" -->My awesome site<!--# endblock --></title>`. Now "My awesome site" will be the default title, but if we wish to change it we just have to add `<!--# block name="title" -->Unique title<!--# endblock -->` to a page with `meta.html` imported. As I want this includes to be imported in every page with the `base.html` layout though we'll add `<!--# include file="../includes/meta.html" -->` to the head in base.html.

This is one way to get this functionality but another could be not having title in the meta.html at all and instead having a block inside your `<head>` tags (e.g. `<!-- block name="head-content")`) and you can then add things to your head on a page-by-page basis. Whether you should make a block specifically for the title or a proper block for the head depends on what you're doing. If you're okay with needing to write `<title>` every time you make use of the head block, it save you some trouble in the long-run if you ever need to modify your head in a page-specific manner.

In the end our `base.html` layout should look something like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!--# include file="../includes/meta.html" -->
</head>
<body>
    <!--# include file="../includes/navbar.html" -->
    <!--# block name="content" --><p>Oops! I must've forgotten to add content to this page!</p><!--# endblock -->
</body>
</html>
```

{% note %}
Using includes in this way won't be all that helpful unless you end up making multiple layouts, however includes are versatile enough to have a fair few use-cases, these are just examples of what you could do with them. They can also be used anywhere, not just in layouts even though we didn't use them outside layouts during this guide. If you're having issues using relative paths for includes you may need to read [this](#file-attribute) note.
{% endnote %}

## Displaying site stats with views, updates and followers directives

If you're somewhat familiar with Nekoweb's ecosystem you're likely aware of [Max's script](https://maxpixels.moe/resources/nekoweb-stats/) to display your site stats, however the SSI also have the capabilities to display view count, update count and follower count. By writing HTML like so:

```html
<p>This site has: <!--# views --> views.</p>
<p>This site has been updated <!--# updates --> times </p>
<p>This site has: <!--# followers --> followers.</p>
```

Displaying your stats this way has three benefits over the traditional JS approach. Firstly it's (a tiny bit) faster. Secondly it's easier to deal with especially if you aren't familiar with JS. Lastly and by far most importantly, it allows these stats to be displayed to users who have JS disabled, which is more common than you'd expect amongst people who browse the indie-web so it solves that as an accessability concern.

{% note %}
Displaying site stats this way cause them to be slightly out of date, depending on how often you update the page Cloudflare may cache the values for up to five days. As Nekoweb uses Cloudflare this caching is largely out of your control.
{% endnote %}

## Making a blog with render and list

There are three premium Neko tier directives: render, error and list. Render and list are often used in conjunction to make things like blogs. Render allows you to display the contents of a <span class="help" title="A markup language used for writing and formatting plain text with a simple syntax, making markdown popular for creating things like blog posts">markdown</span> file rendered in HTML without using a <span class="help" title="A tool that reads markdown and converts it to another format (HTML for us)">Markdown parser</span> like [marked](https://github.com/markedjs/marked) and list returns a JSON array of files in a folder and some information about them encoded in <span class="help" title="An popular method of encoding data, making transferring it less complex">Base64</span>.

To start, we'll need to create a new folder called `posts` to store our posts. Inside it it we can make a file called `post-1.md` and inside put some random text for testing purposes. Now, inside the `posts` folder we will create a new file named `post-1.html` which has our base layout imported, a title and also the directive `<!--# render file="../posts/post-1.md" -->` placed inside the `content` block. If you view this page hopefully the markdown will be converted to HTML and inserted in our content block.

{% note "file-attribute" %}
Here I've used `../` instead of `./` which may seem odd when `post-1.md` is in the same directory as `post-1.html`. However this is because the `file` attribute is actually relative to wherever the block was defined, not where the block being used. In this case the `content` block was defined in `/layouts` in the `base.html` layout so I'm actually navigating from the `/layouts` directory to the `/posts` directory. For base HTML tags like `img` that require a file path this behavior doesn't occur. You can avoid this issue by using absolute paths (`~/` or `/`).
{% endnote %}

{% note %}
If you're unfamiliar with markdown you might want to consider checking out the [cheat sheet](https://www.markdownguide.org/cheat-sheet/). The render directive converts markdown to HTML so a heading made with `#` is surrounded by `<h1>`, text made bold using `**` is surrounded by `<strong>` etc. From a test the markdown elements that will work are: headings, bold, italic, blockquotes ordered lists, unordered lists, code, horizontal rules, links, images, tables, fenced code blocks, strikethroughs and task lists.
{% endnote %}

However as I'm sure you've noticed this method is lame, creating an HTML file for each post? Who has time for that? Fortunately there is a way to solve this issue, `_catchall.html`, which is available for everyone with cute kitty tier and above as well as the `{% raw %}{{filename}}{% endraw %}` variable which returns the last section of the viewed page's URL with the file extension removed (e.g. in https://sitename.nekoweb.org/posts/post-1.html `{% raw %}{{filename}}{% endraw %}` would return "post-1"). First we're going to create a file named `_catchall.html` inside our posts folder. This file acts much like not_found.html however it acts before it, so if someone goes to a page inside the posts folder that doesn't exist, _catchall.html will be displayed instead. This can be used to dynamically render markdown files, similarly to how you could in an SSG like Astro or Eleventy. The code we can need to put in `_catchall.html` is rather simple, like so:

```
<!--# layout file="../layouts/base.html" -->
<!--# block name="content" -->
    <!--# render file="../posts/{% raw %}{{filename}}{% endraw %}.md" notfound="Page not found" -->
<!--# endblock -->
```

Now if we delete our `post-1.html` file, if someone was to visit that page post-1 will now be automatically rendered! The one issue with this approach is that now we can't set a title properly. {% raw %}{{filename}}{% endraw %} doesn't work as plain text as far as I know (and there's no echo directive) so the only option that I could think of is the following JS code being put in a `<script>` tag at the bottom of the content block (or using the defer attribute) `document.title = document.querySelector("h1").textContent`.

I hate this solution however and if anyone knows a better way, please contact me (moosyu). This assumes you're titling every blog post with text within an `<h1>` tag (a single `#` in Markdown) and that the title is the first instance of an `<h1>`.

You can also use the `flastmod` directive if you'd like to display the last modified date of that particular post. Generally you'd do something like `<!--# flastmod file="../posts/{% raw %}{{filename}}{% endraw %}}.md" -->` however flastmod also has two optional additional attributes, fmt which is how you format the string and timezone which uses the [TZ identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). The default for these attributes looks like `<!--# flastmod file="" fmt="%Y-%MM-%dd %HH:%mm:%ss" timezone="UTC" -->`. The format specifiers can be seen in the table below (courtesy of Dimden):

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

With the actual posts set up properly can use the `list` directive to automatically generate a list of our blog posts. The list directive returns a JSON array encoded with Base64. The decoded output will look something like:

```json
[
    {
        "name": "_catchall.html",
        "isDirectory": false,
        "created_time": 1772911350510,
        "modified_time": 1772913735145,
        "size": 276,
        "preview": "PCEtLSMgbGF5b3V0IGZpbGU9Ii4uL2xheW91dHMvYmFzZS5odG1sIiAtLT4NCjwhLS0jIGJsb2NrIG5hbWU9ImNvbnRlbnQiIC0tPg0KICAgIDwhLS0jIGZsYXN0bW9kIGZpbGU9In4vbW9vc3l1L3Bvc3RzL3t7ZmlsZW5hbWV9fS5tZCIgZm10PSIlWS0lTU0tJWRkIiB0aW1lem9uZT0iVVRDIiAtLT4NCiAgICA8IS0tIyByZW5kZXIgZmlsZT0ifi9tb29zeXUvcG9zdHMve3tmaWxlbmFtZX19Lm1kIiBub3Rmb3VuZD0iUGFnZSBub3QgZm91bmQiIC0tPg=="
    },
    {
        "name": "post1.md",
        "isDirectory": false,
        "created_time": 1772911350510,
        "modified_time": 1772911350510,
        "size": 42,
        "preview": "IyB0aGlzIGlzIHBvc3Qgb25lDQoNCnRoaXMgaXMgc29tZSBjb250ZW50"
    },
    {
        "name": "post2.md",
        "isDirectory": false,
        "created_time": 1772911350510,
        "modified_time": 1772911350510,
        "size": 45,
        "preview": "IyB0aGlzIGlzIHBvc3QgMg0KDQpoZXJlIGlzIHNvbWUgbW9yZSBjb250ZW50"
    },
    {
        "name": "post3.md",
        "isDirectory": false,
        "created_time": 1772911350510,
        "modified_time": 1772921846717,
        "size": 868,
        "preview": "IyB0aGlzIGlzIHBvc3QgMw0KDQpoZXJlIGlzIHNvbWUgbW9yZSBjb250ZW50IGFuZCBiZWxvdyBpcyB0ZXN0aW5nIHdoYXQgcmVuZGVyIGNhbiBkbw0KDQojIEgxDQoNCiMjIEgyDQoNCiMjIyBIMw0KDQoqKmJvbGQgdGV4dCoqDQoNCippdGFsaWNpemVkIHRleHQqDQoNCj4gYmxvY2txdW90ZQ0KDQoxLiBGaXJzdCBpdGVtDQoNCjIuIFNlY29uZCBpdGVtDQoNCjMuIFRoaXJkIGl0ZW0NCg0KLSBGaXJzdCBpdGVtDQoNCi0gU2Vjb25kIGl0ZW0NCg0KLQ=="
    },
    {
        "name": "post4.md",
        "isDirectory": false,
        "created_time": 1772913274699,
        "modified_time": 1772913274699,
        "size": 0,
        "preview": ""
    }
]

```

The entries contain:

* name, the name of the file/folder
* isDirectory, boolean which is true if the entry is a folder
* created_time, the time the entry was created in unix ms
* modified_time, the time the entry was last modified in unix ms
* size, the size of the file in bytes (but only if the file isn't a folder)
* preview, the first 256 bytes of the file encoded as Base64

Unfortunately due to how this works we'll need to use JS to display the list contents, fortunately we don't need all that much to make it work. We can create a `pages` folder in the root of our site and inside create a file named `blog-posts.html`. After importing the base layout we can add a set of `script` tags and use the following code to display a list of items in the folder `posts` (provided you also have an element with the id attribute set to `postsList`):

```js
const postsList = document.getElementById("postsList");
const posts = JSON.parse(atob('<!--# list dir="../posts" -->'));

posts.filter(post => !post.isDirectory && post.name.endsWith(".md")).sort((a, b) => b.modified_time - a.modified_time).forEach(post => {
    const baseName = post.name.slice(0, -3);
    const title = atob(post.preview).match(/^#\s+(.+)/m)?.[1] || baseName;
    const listItemEl = document.createElement("li");
    listItemEl.innerHTML = `<a href="/posts/${baseName}.html">${title}</a>`;
    postsList.append(listItemEl);
});
```

For the name displayed this script assumes at the start of every post you're doing `# Post name` (though if you're up for it you can change the match accordingly depending on what you're doing). If you aren't or something went wrong and this value can't be found, the name of the file is used instead. The posts are sorted by date modified, however if you'd prefer date created you can just switch uses of `modified_time` to `created_time`. Be sure to also change the dir path in the list directive if your file with that script in it is placed somewhere differently to mine. If you want to edit how the list item looks you'll need to change the code the backticks on line 8.

The final file structure of our project should look something along the lines of:

```
├───index.html
│
├───includes
│       meta.html
│       navbar.html
│
├───layouts
│       base.html
│
├───pages
│       blog-posts.html
│
└───posts
        post-1.md
        post-2.md
        post-3.md
        post-4.md
        _catchall.html
```

If you'd like to view or download the project we created it's hosted at [github.com/moosyu/nekoweb-ssi-example-project](https://github.com/moosyu/nekoweb-ssi-example-project).

## Bonus directives that didn't fit in naturally (fsize, follow and error)

The `fsize` directive displays the size of the specified file and can be used like so: `<!--# fsize file="" -->`. It has three attributes. The only required one is file which is the path to the file you want to display the size of. Like render, it only seems to display properly if you use an absolute path. The `unit` attribute is optional and defaults to auto and bases its choice on the whether the file's size is closest to a byte, kilobyte, megabyte or gigabyte. You can also manually specify the unit with `unit=""`, b (byte), kb (kilobyte), mb (megabyte), gb (gigabyte) or auto. The final attribute is `format` which is optional and a boolean, if true the number returned has commas added as group separators.

The `follow` directive is just an alias for `<iframe src="https://nekoweb.org/frame/follow" frameborder="0" width="170" height="28"></iframe>` and should be used accordingly. The button can be styled by using the .follow and .following classes in your elements.css.

The error directive (`<!--# error -->`) has no attributes and is mainly designed for password-protected pages (which you can use if you have Neko tier of Nekoweb premium). It seems to display the last server error so you could also make use of it in post forms other than those for password-protected pages.

## Cachebusting with flastmod

If you don't know what caching or cachebusting is I'd advise you to check out [PetraPixel's guide on it](https://petrapixel.neocities.org/coding/cachebusting) but because of the way the `flastmod` directive behaves you can use it to (semi) automatically cachebust. This is good because without using an SSG your options are to manually add `?v=` to the end of every file you'll need to cachebust or to do it automatically with JS which basically forcefully disables cache and is going to pointlessly slow down your site for repeat visitors.

There is fortunately a compromise you can reach using Nekoweb's SSI. Firstly, we're going to create a file named something along the lines of `cache.txt` in our site's root. We'll need to modify this file every time you want to reset the cache (we don't have to do much, even changing a 1 to a 2 would count as modifying it). Now lets say we want to cachebust some CSS file named `styles.css`. All we need to do is change `<link rel="stylesheet" href="/css/styles.css">` to `<link rel="stylesheet" href="/styles.css?v=<!--# flastmod file='~/cache.txt' fmt='%u' -->">`. Now, every time `cache.txt` is modified the value after ?v= (which is just the current time in UNIX milliseconds) will be updated and the cachebusting will be completed.

Make sure to check out [the official Nekoweb SSI details page](https://nekoweb.org/ssi). There's also some further details on limitations and notes in that page as well as an example for using the `list` directive to generate a gallery which you may find helpful.