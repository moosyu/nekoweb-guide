---
title: 11ty
updated: 2025-11-16
layout: /main.njk
description: The Unofficial Nekoweb Documentaton
---
## Getting started with Eleventy/11ty
*Last updated: <span class="lastupd">{{page.date | formatDate}}</span>*
*Author: <a class="lastupd" href="https://moosyu.github.io/">Moosyu</a>*

## Disclaimer

This guide assumes at least some basic knowledge of HTML and JS even though it's been written with the intention of being able to be understood by anyone. I highly recommend getting a grasp on common programming and HTML concepts before attempting to use a SSG. A terminal will also be used here, though all the commands needed will be told to you. This is being written primarily for Windows 10/11 users, if you're on Linux/Mac some instructions may have to be followed differently (mainly in the installation process).

## Overview

Eleventy for the uninitiated is a popular <span title="Static site generator" class="help">SSG</span>. Eleventy (and SSGs in general) provide options to automate aspects of web development that may be tedious. For example, I use Eleventy to keep a consistent navbar throughout my site that can be modified by editing a single file, as well as to implement pagination without the viewer of my site being required to load any JS. This guide will outline the basics of setting up Eleventy, creating a simple blog and hosting your Eleventy site on Nekoweb.

## Installation

The only prerequisite Eleventy has is [NodeJS](https://nodejs.org/en) (or alternatives like [Bun](https://bun.com/) or [Deno](https://deno.com/)). If you've never heard of any of these it is best that you download NodeJS, which is what the rest of this guide will be based around. Eleventy recommends downloading at least version 18 of NodeJS. Once installed run <code>node -v</code> and <code>npm -v</code> in your console. If they both return their versions you can continue. If not I recommend restarting your computer, if the issue persists (and you're on Windows) look into your system environment variables and see if path contains a NodeJS/NPM variable.

Now you can create a new folder for your Eleventy project. <span class="help" title="Shift-right-click inside of your project folder and click 'Open in Terminal' if you're using Windows">Inside</span> of this folder, open a terminal and run the following commands: <code>npm init -y</code> and <code>npm i @11ty/eleventy</code>.

The first command will create a basic package.json file for you. You can omit the -y or edit the file later in your file editor if you'd like to change the content, however for your actual site most of this file doesn't matter. The second command installs Eleventy into your project. This is all the setup required to begin working on an Eleventy project.

## Creating a basic site with Eleventy

Firstly, to ensure everything is working you can create an index.md file (could also be HTML/Nunjucks file, this is just personal preference) in the root of your project. Eleventy has out of the box markdown support so all you need to do in here is write something. Then with a terminal with a working directory inside of your project's root run <code>npx @11ty/eleventy --serve</code>.

Something along the lines of the following output should be produced:

```bash
[11ty] Writing ./_site/index.html from ./index.md (liquid)
[11ty] Wrote 1 file in 0.15 seconds (v3.1.2)
[11ty] Watching…
[11ty] Server at http://localhost:8080/
```

The first part of this command, <code>npx @11ty/eleventy</code> is building your site and then the flag <code>serve</code> added onto it is creating a <span class="help" title="A server that runs on your computer and allows you to test your website as it would behave on a public server like Nekoweb">local web server</span> to easily view it. If you open the server's URL in your browser you should see whatever you wrote in your index file displayed. The default behaviour is to watch for any changes (e.g. when a file is saved) and rebuild your site after such a change, so the web server it creates should always be up to date (though it has some issues mentioned later). If localhost:8080 is correctly displaying your index.md file we can continue. Do CTRL + C in your terminal to stop Eleventy from running.

Create a file named (exactly) <span class="help" title="You can also call it eleventy.config.js and it'll act the same">.eleventy.js</span>. This will be the most important file in your Eleventy project. If you don't quite understand JS just yet, don't worry. This guide won't be getting into anything too complex and I'll be including code examples, however if you'd like to be able to use everything Eleventy has to offer (like <span class="help" title="Used to transform values during build with JS">custom filters</span>) you're going to need to learn it at some point. Inside of your new .eleventy.js file include the following code:

```js
module.exports = function(eleventyConfig) {
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
```

This is setting an input folder of the name src and an output folder of the name _site (which is the default). Technically, you could leave the input folder as the root but I find that ends up messy and is generally advised against. If you choose to set src as your input (as I'll assume you've done moving forward), you'll need to create a folder named src or you'll get an error. Unless you put your index.md inside that folder, Eleventy will no longer be able to find it and this goes for every new file unless specified otherwise. Both input and output folders can really be anything, but common names for input are "src" and "content" and common names for output are "_site" and "dist". You may even want to change your output to your site's name if you just want to be upload everything at once from the root of your Nekoweb dashboard.

## Using layouts with Eleventy

Layouts allow you stitch parts of your site (navbars, footers, headers, etc) onto content in order to create new stuff quickly without worrying about things like your navbar staying consistent between pages. The templating language I prefer is Nunjucks but using Eleventy leaves you in no way [starved for choice](https://www.11ty.dev/docs/languages/). I've only ever used Nunjucks, however, so I don't know whether some parts of this guide will work for anyone using another template language, so bare that in mind. Create a folder named <span class="help" title='This is just the default name, you can change it putting includes: "INCLUDES_FOLDER_NAME" inside dir in your .eleventy.js file.'>_includes</span> inside your previously created src folder and inside the _includes folder, create a file named base.njk. Before editing this, if you're using VS Code I highly recommend downloading the [Nunjucks Template](https://marketplace.visualstudio.com/items?itemName=eseom.nunjucks-template) extension. It provides code snippets and syntax highlighting, though it's completely optional. Nunjucks is basically HTML with some fancy things like variables, for loops and if statements you'd find in a real programming language that make it useful for our purposes. I won't go over everything Nunjucks specific here, so if you'd like to learn more I recommend giving the [Nunjucks Docs](https://mozilla.github.io/nunjucks/templating.html) a read. Now, open your base.njk.

When setting up a base layout like this, I generally set it up mostly like one would a normal HTML page. For this guide this is my base.njk layout:

{% raw %}
```njk
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title or "My website"}}</title>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
    </nav>
        {{ content | safe }}
</body>
</html>
```

The Eleventy specific changes here are <code>{{title or "My website"}}</code> and <code>{{ content | safe }}</code>.

{% endraw %}

In Nunjucks two curly brackets indicate a variable. The first part is trying to find a "title" variable and if it can't, the title will fall back to "My website". It's doing this using the Nunjucks logical operator "or" which checks the left operand first and if it doesn't exist (returns false) it will use the right operand instead. The second part is looking for page content and injecting it into the layout. In Nunjucks the pipe (|) (which isn't an uppercase i) denotes a filter. In this layout we are using the safe filter. Without it, by default, instead of rendering your content properly, it will escape the HTML and your content will display with their tags/attributes converted as seen below:

![safe vs no safe side-by-side](/assets/eleventy/safe.png)

Now you can go to your index.md and add this directly at the top of your file:

```
---
title: home page
layout: base.njk
---
```

If the three dashes aren't on the first line it will break. This is one way to define data in Eleventy. Title isn't a built-in piece of data, we created it ourselves and when our site is generated our base.njk layout will look for it and display it in the title if it finds it. Layout, however, is built-in and automatically searches inside the _includes folder, unless you changed the includes folder in your .eleventy.js file. You can [click here](https://www.11ty.dev/docs/data-configuration/) to view all Eleventy built-in data keys and their functions.

## Assets and external stylesheets

In Eleventy, if you were to do the usual method of linking a stylesheet or displaying an image you'd find your file can't be found, even if the file seems to be there on your end. The solution to this is rather simple. First make two folders in your src folder, one for your css and the other for your assets (images, fonts, etc). Go into your .eleventy.js file and add these lines somewhere inside the <code>module.exports = function(eleventyConfig)</code>'s curly brackets:

```js
eleventyConfig.addPassthroughCopy("src/css/*");
eleventyConfig.addPassthroughCopy("src/assets/*");
```

This is ~what your .eleventy.js would look like now if you're confused:

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/*.css");
    eleventyConfig.addPassthroughCopy("src/assets/*");

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
```

This change will make Eleventy look inside of these folders and any .css file it finds inside your CSS folder will be available in your built site, the same will be applied to any file in the assets folder. This will NOT search subfolders. If you want that behaviour you'll need to use a glob pattern like so: <code>eleventyConfig.addPassthroughCopy("src/css/**/*.css");</code>. If you want to access these images don't link to the src folder, the passthrough copies will be in the root of your built version of your site. E.g. for an image do <code>src="/assets/image.png"</code> not <code>src="/src/assets/image.png"</code>.

## Partials/components

I'll be referring to partials/components as just partials here, but the name can change depending on who you're talking to, likely because they're quite similar to Astro's components. Partials allow you to further break up components of your site and can be important if you want to maintain consistency between layouts while not using the somewhat janky method of extending your layouts. Partials will be important for a later section of this guide.

Firstly create a new folder inside _includes and name it partials. Inside this folder create two new files, head.njk and nav.njk. These will store the generic content of your head and nav that you want to be consistent between pages. All you need to do in these is copy the the content of your head and nav into them like so:

head.njk:

```njk
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{title or "My website"}}</title>
```

nav.njk

```njk
<nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
</nav>
```

Now in the place of where the content of head and nav were in your base.njk once were add {% raw %}<code>{% include "partials/head.njk" %}</code> and <code>{% include "partials/nav.njk" %}</code> respectively.{% endraw %}

Your base.njk should look something like this now:

{% raw %}
```njk
<!DOCTYPE html>
<html lang="en">
<head>
    {% include "partials/head.njk" %}
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    {% include "partials/nav.njk" %}
    {{ content | safe }}
</body>
</html>
```
{% endraw %}

I've left the stylesheet link out of the head.njk partial in case you want to use a completely separate stylesheet for a page, but if that's not a concern it should work fine if left in.

## Collections

Collections in Eleventy allow you to group content, most commonly this is used to create blogs so I'll instruct you on doing that, though they are quite varied in their possible use-cases. Personally I use collections to display an interactive calendar of my thoughts as well as my sitemap.

Firstly create a new folder named <span class="help" title="It actually doesn't matter what you call it, if it's inside your input folder (src) Eleventy will be able to find it. You technically don't even need a folder at all, I just like to organize">blog-posts</span> in src. Inside your folder create a new file called blog-posts.11tydata.json. This is a special file that will apply the <span class="help" title='Front matter data is the data we placed between two sets of dashes on our homepage.'>front matter data</span> we put inside of it to every blog post inside that folder or its subdirectories:

```json
{
"tags": "posts",
"layout": "base.njk"
}
```

When making an 11tydata file it's important the file's name corresponds with the folder it's inside of. If you named the folder you store your blog posts inside something other than blog-posts, make sure to modify accordingly. These 11tydata files can also be JS if you'd like, [it's just personal preference](https://www.11ty.dev/docs/data-template-dir/) and for simple things like this it doesn't matter. Now, create a document inside your new blog-posts folder, it can be any supported file type but for writing-heavy pages like blogs I prefer to use markdown so I'll be creating first-post.md. Inside this new file I'll be adding this data like we did earlier with our index:

```
---
title: My first blog post
date: 2026-01-17
---
```

The date data key is special, just like layout from earlier and can have either a date written in the YYYY-MM-DD format, Created, git Created, git Last Modified or Last Modified. Personally I avoid using Create or Last Modified as I've found them to end up broken especially with all the compressing and moving of my site I've done, though they're technically options. The git versions are good but require you to have a git repository for your site. Because of our blog-posts.11tydata.json file this blog post is automatically placed into the posts collection. Now we can create a blog.njk file that will display a list of our blog posts. This file will need to be out of the blog-posts folder or it will be given the posts tag and be displayed as a blog post. Ensure this is a Nunjucks file or the following code won't work:

```njk
---
title: blog posts
layout: base.njk
---

<ul>{% raw %}
    {% for post in collections["posts"] | reverse %}
        <a href="{{ post.url }}"><li>{{ post.data.title }} - {{ post.date.toLocaleDateString('en-US', { dateStyle: 'medium' }) }}</li></a>
    {% endfor %}
{% endraw %}</ul>
```

This code is using a Nunjucks for loop to go through the posts collection (which is just an glorified array) and displays the data of each list item. The reverse filter is used as Eleventy displays oldest first by default. It's recommended by Eleventy's creator to use a [library instead of Node's built-in toLocaleDateString](https://github.com/11ty/eleventy/issues/1157#issuecomment-629695501), Luxon is actually already a dependency so you'll have it when you install Eleventy, however for simplicity's sake I haven't used it here. If the list is empty, try restarting Eleventy's web server (CTRL + C in your console and run <code>npx @11ty/eleventy --serve</code> again). Eleventy can act weirdly with detecting changes made if collections, changes to the config file or filters are involved.

## Pagination

This part is on using pagination, collections and permalinks to categorise blog posts into "tags". Much of it is using code I made years ago while following [this guide on the Eleventy website](https://www.11ty.dev/docs/quicktips/tag-pages/).

Firstly go your previously made blog post and update the top data section to look somewhat like this:

```
---
title: blog post
date: 2026-01-17
tags:
    - art
    - gaming
    - movies
---
```

You can add as many or as few tags as you'd like to a post in this format and you can choose any name you'd like. Now inside src (but not inside blog-posts) create a new Nunjucks file to display all posts under a certain tag. I'm naming mine tags.njk. Then add this to the tags.njk file:

{% raw %}
```njk
---
layout: base.njk
pagination:
    data: collections
    size: 1
    alias: tag
    filter:
        - posts
        - all
permalink: /tags/{{ tag | slugify }}/
---

<h3>Blog posts tagged "{{ tag }}"</h3>

{% for post in collections[tag] | reverse %}
    <a href="{{ post.url }}"><li>{{ post.data.title }} - {{ post.date.toLocaleDateString('en-US', { dateStyle: 'medium' }) }}</li></a>
{% endfor %}
```
{% endraw %}

You may notice that most of the Nunjucks code is identical to the blog posts list we created earlier, the main difference is that the collection is now tag not posts and quotation marks aren't used, as it's now a variable being created in the pagination section of the front matter data not a string. Pagination is fortunately very simple in Eleventy. We're first setting our dataset as the built-in "collections", we're splitting each tag into it's own page by setting the size to one, we're setting an alias of tag because it's a lot cleaner than writing pagination.items and we're filtering out posts and all because they're both not needed and just display unnecessary information. Then we're using Eleventy's permalink feature to set where each of these pages will end up with their own specially named URLs and not just /tags/0-.../. We're also using slugify which is a built-in filter in order to convert the tag to a slug, which will cause things like whitespace to become dashes. The default slugify filter does however currently [ignore most non-latin characters](https://github.com/sindresorhus/transliterate/issues/1). This means that any tags with no unicode characters in their name will not work (eg a tag entirely in Chinese). If this is an issue I'd consider looking into creating your own slugify filter.

Now, for users to access these tag lists I like displaying them on blog posts. If you'd prefer having just a list of all your tags (or both), you can put this code somewhere in a Nunjucks file:

{% raw %}
```
<ul>
{% for tag, posts in collections %}
  {% if tag != "all" and tag != "posts" %}
    <li>
      <a href="/tags/{{ tag }}/">{{ tag }}</a>
    </li>
  {% endif %}
{% endfor %}
</ul>
```
{% endraw %}

for tag, posts in collections iterates through all Eleventy collections in the collections object which looks something like:

```js
collections = {
  "all": [...],
  "posts": [...],
  "another-tag": [...]
}
```

The "tag" variable symbolises the key (all, posts, another-tag) and posts symbolises the value (the posts in that collection). Even though we don't use posts we'll still need it as without it Nunjucks won't know what to do and won't be able to iterate over the object. In this we're also filtering out "all" and "posts" as once again they aren't necessary.

If you want to display the tags each blog post has inside of the post itself I recommend making a new layout. Go into your _includes folder and make a Nunjucks file, I'm calling mine blog-layout.njk. Inside your new layout do the usual setup we did in our base.njk but in the body we can adding this:

{% raw %}
```njk
{% for tag in tags %}
    {% if tag != "posts" %}
        <a href="/tags/{{ tag }}">#{{ tag }}</a>
    {% endif %}
{% endfor %}
```
{% endraw %}

This is a for loop that will loop through the tags array we created in our post's front matter. If the tag it's currently iterating through is "posts" it will skip to the next tag in the array without adding anything as it's unnecessary. No need to filter out all this time as it's not a tag in the tags array.

My blog-layout.njk looked like this:

{% raw %}
```njk
<!DOCTYPE html>
<html lang="en">
<head>
    {% include "partials/head.njk" %}
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    {% include "partials/nav.njk" %}

    {% for tag in tags %}
        {% if tag != "posts" %}
            <a href="/tags/{{ tag }}">#{{ tag }}</a>
        {% endif %}
    {% endfor %}

    {{ content | safe }}
</body>
</html>
```
{% endraw %}

Update your blog-post.11tydata.json file to use this layout instead of base.njk and now each post will now display its tags and links to the list of every post under that particular tag:

![blog post with tags](/assets/eleventy/completed.png)

## Adding scripts to package.json

If you think writing <code>npx @11ty/eleventy --serve</code> is a pain you can save time by adding custom scripts to your package.json. My scripts look like:

```json
"scripts": {
    "dev": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy"
},
```

You can write any command you'd put in the terminal here and give it a name however. Just make sure you remember to put a comma before every separate script or it will break. You can run these scripts with the command <code>npm run SCRIPT_NAME</code>. For example if I want to run the dev script you can run <code>npm run dev</code>. In most terminals you can also press the up arrow to go to previously ran commands to save even more time. 

## Getting your site onto Nekoweb

Now that we've set up the foundations of our new Eleventy site it's time to upload it onto Nekoweb. In your terminal run the command <code>npx @11ty/eleventy</code> to build your project to its output folder.

<details>
  <summary>If your output folder is named something other than your Nekoweb site url/custom url open this</summary>
  <span>Go into your output folder and zip everything up. It has to be a zip not 7z or rar and make sure your zipped file doesn't have the output folder itself inside, just the contents of it. If you don't know how and you're on Windows you can select all the files, click "Send to" which should be in your right-click menu somewhere and select "Compressed (zipped) folder". Now go to your Nekoweb dashboard, go into the site you'd like to import into (not the root) and click "Import ZIP". Select your zipped output contents and you're done! Do bear in mind that any files currently on your Nekoweb site with the same names as those you're importing will be overwritten, so be sure to backup beforehand by clicking "Export ZIP" if you're worried about losing things.</span>
</details>

<details>
  <summary>If your output folder is the name of your Nekoweb site url/custom url connected to your Nekoweb site open this</summary>
  <p>Go to your output folder and zip it up. It has to be a zip not 7z or rar and make sure your zipped file has the output folder itself inside. If you don't know how and you're on Windows you can select all the files, click "Send to" which should be in your right-click menu somewhere and select "Compressed (zipped) folder". Now go to your Nekoweb dashboard, go into your root and click "Import ZIP". Select your zipped output contents and you're done! Do bear in mind that any files currently on your Nekoweb site with the same names as those you're importing will be overwritten, so be sure to backup beforehand by clicking "Export ZIP" if you're worried about losing things.</p>
</details>

If you were hoping to use the Nekoweb terminal for this I'd highly recommend against it, unless you have an awful computer it's going to build slower than you could on your own, node_modules takes up space and only balloons over time if you intend to add new packages and you'll still need to upload your files regardless to be able to build the site.

If you'd like to download the project we created it's hosted on [github.com/moosyu/moosyu.github.io/examples/11ty-blog](https://github.com/moosyu/moosyu.github.io/examples/11ty-blog).

## Bonus stuff (more advanced)

If you're just getting started with Eleventy and especially if you don't have a grasp of JS I don't recommend reading ahead. It's not going to be anything super advanced but I'll be doing less explanation so proceed with caution.

## Custom filters - Word count/read time

You can create your own filters using JS, we'll make one that displays the word count on your blog posts and the estimated time to read. Go into your eleventy config file (.eleventy.js) and add this filter inside the eleventyConfig export function:

```js
eleventyConfig.addFilter("readTime", (content) => {
    let wordCount = content.trim().split(/\s+/).length;
    let timeToRead = Math.ceil(wordCount / 200);
    return `${wordCount} words (${timeToRead} min read)`;
});
```

I'd expect your .eleventy.js file to look something like this:

```js
module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/**/*.css");
    eleventyConfig.addPassthroughCopy("src/assets/*");

    eleventyConfig.addFilter("readTime", (content) => {
        let wordCount = content.split(/\s+/).length - 1;
        let timeToRead = Math.ceil(wordCount / 200);
        return `${wordCount} words (${timeToRead} min read)`;
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
```

This adds a filter named readTime that is trims input of leading/trailing whitespace which always seems to end up in Eleventy's output and offsets the word count by one or two words. Then the input is split up at every <span class="help" title="A whitespace character is a character that represents white (blank) space. The most common is just a normal space.">whitespace character</span> (or set of whitespace characters) into an array, before getting the length of this array which will come out to be the word count of the input. Then that count is divided by 200 (a low end estimate of average WPM reading speed), rounds up and returns a string with this information. You can edit the returned string to say whatever you'd want, we're using template literals in order to include the wordCount and timeToRead variables inside a string of text cleanly so it can be easily moved around, just make sure the dollar signs stay before the curly brackets or the variables will break.

It's fortunately quite easy to get the input content from your blog posts too with the built in content aka templateContent data. If you'll remember we also use this in our layouts. Applying this to your blog.njk looks something like like:

{% raw %}
```njk
<ul>
{% for post in collections["posts"] | reverse %}
    <a href='{{ post["url"] }}'><li>{{ post["data"]["title"] }} - {{ post["date"].toLocaleDateString('en-US', { dateStyle: 'medium' }) }} - {{ post["content"] | readTime }}</li></a>
{% endfor %}
</ul>
```
{% endraw %}

## Adding new NPM packages and ESM

A benefit of having a Node based SSG is being able to use the giant library of packages people have created on your site. Obviously many won't be applicable but if it sounds like it would be able to work, odds are it will. If you're already comfortable with the install process feel free to skip this part, but if you aren't, follow along. For future sections I won't explain installing these packages as thoroughly so consider this an introduction to that process. We'll be adding the uwuifier package to our site, using it in a filter and then removing it. First we're going to go to the [npmjs.com](https://www.npmjs.com/) website and search for the package we want, for this it'll be [uwuifier](https://www.npmjs.com/package/uwuifier). On most packages' npmjs page you'll be able to find information on how to set them up as well as some stats. You can also see how many <span title="How many other packages they require that'll need to be installed along side them" class="help">dependencies</span> they have. When you download a package it will automatically download its dependencies, however try if you can to avoid packages with unnecessarily huge amounts of dependencies as it can cause your node_modules folder to balloon in size. For something as simple as this uwuifier it shouldn't need any dependencies so I chose this one accordingly. Now we're going to run the command <code>npm i uwuifier</code> in our terminal inside of the root directory of our Eleventy site. The "i" is shorthand for install. This will install the package into our node_modules folder so we can use it. When installing packages it's important to watch the terminal output for any vulnerabilities, generally for a static Eleventy site that won't matter as we're building locally and not running a Node server publicly but it can be a sign the package you're downloading is poorly maintained.

Now we can import our new package into our .eleventy.js file by putting <code>const uwuify = require("uwuifier");</code>. You can call the constant whatever you want, but you have to make sure the name in the require is the exact name of the package. Now, to use this as a filter we're going to follow steps much like what we did earlier with our last filter. Inside of the eleventyConfig export function adding this code:

```js
eleventyConfig.addFilter("uwuifyText", (content) => {
    const uwuifier = new uwuify.default();
    return uwuifier.uwuifySentence(content);
});
```

Most of this code was pulled straight from the example on uwuifier's NPM page. The reason we have to add the <code>.default()</code> is a bit complicated but in sort we're using CommonJS for our project, a somewhat older <span class="help" title="A system that defines the syntax and rules of modules (code we load with require)">module formatting system</span> for Javascript as well as the default for a NodeJS project, while the package we're using is using ESM. For simple purposes like ours they're almost interchangeable however sometimes small hiccups like this spring up. You could also put this .default() in when we import the package. If you're using VS Code it will actually warn you if the package you're importing is ESM but if you miss it you could also deduce this issue if you get an error something along the lines of <code> Original error stack trace: TypeError: PACKAGE_NAME is not a constructor</code>.

If you'd like to switch to using ESM in your Eleventy project, it's quite simple. First go into your package.json and set "type" (which you can add if not there) from "commonjs" to "module". Then there are two changes needed to be made to your .eleventy.js, firstly you now import packages with the syntax: <code>import variable_name from "package_name";</code> and instead of <code>module.exports = function()</code> you should now use  <code>export default function()</code>. You'd also no longer need to add .default() to packages made using ESM. Your .eleventy.js would then look something like:

```js
import uwuify from "uwuifier";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/*.css");
    eleventyConfig.addPassthroughCopy("src/assets/*");

    eleventyConfig.addFilter("uwuifyText", (content) => {
        const uwuifier = new uwuify;
        return uwuifier.uwuifySentence(content);
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
```

To test our new filter we can go to our blog layout and apply it to our content like {% raw %}<code>{{ content | uwuifyText | safe }}</code>{% endraw %}. If your blog posts have been sufficiently uwuified you completed the process successfully (do note that if your blog post is only a couple words it may not trigger, have at least a little content in there). Now that we know how to use NPM packages we can remove uwuifier, first remove the filter from your layout, then remove the code adding the filter from your .eleventy.js before finally running the command <code>npm r uwuifier</code> to completely remove the package from your project. The "r" is shorthand for remove.

## Adding plugins - Syntax highlighting

Eleventy has an [official syntax highlighting plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/) that allows code you've written in markdown to have it's syntax highlighted without any fuss or client JS. Firstly as this is a separate NPM package we'll need to run the command <code>npm i @11ty/eleventy-plugin-syntaxhighlight</code> inside of our Eleventy project folder to download it. Once installed import the package (I'll be setting its variable's name to <code>syntaxHighlight</code>) before putting <code>eleventyConfig.addPlugin(syntaxHighlight);</code> inside our export function. I'd expect your .eleventy.js file to look something like this if you're still using CommonJS:

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/**/*.css");
    eleventyConfig.addPassthroughCopy("src/assets/*");

    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
```

That's all you need to set the plugin up. To declare a codeblock in markdown you need to add three backticks and the targeted language's name, then add the code and close with another three backticks e.g:

&#96;&#96;&#96;js
console.log("hi!");
&#96;&#96;&#96;

However you'll find it's not actually highlighted. That's because you then need to download a [Prism.js (or equivalent) CSS theme](https://github.com/PrismJS/prism-themes). Once a stylesheet has been imported it should work like a charm:

![working prism](/assets/eleventy/prism.png)

If you aren't seeing a similar result without getting console errors its highly likely that either: your stylesheet isn't being imported properly, your stylesheet isn't valid or your chosen language isn't valid (though you should still be able to see a background on your code at least).

## Transforms - Minifying

Eleventy transforms let you modify a template's output at build. I've seen it used for <span class="help" title="Removing unnecessary whitespace and comments at build to speed up your site by decreasing its filesize">minifying</span> HTML and that's about it. To do that we first need to install the NPM package html-minifier-terser with the command <code>npm i html-minifier-terser</code> in your console. Then we'll import the package (I'll be setting its variable's name to <code>htmlmin</code>) to our .eleventy.js and add this code into our export function:

```js
eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
        return htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
        });
    }

    return content;
});
```

If you're using CommonJS your .eleventy.js should look something like this:

```js
const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/**/*.css");
    eleventyConfig.addPassthroughCopy("src/assets/*");

    eleventyConfig.addTransform("htmlmin", function (content) {
        if ((this.page.outputPath || "").endsWith(".html")) {
            return htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            });
        }

        return content;
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
```

That's all you need to do, now your built HTML will be minified. Do note that this won't minify any imported CSS or JS. The options you can choose [are available on html-minify-terser's Github page](https://github.com/terser/html-minifier-terser?tab=readme-ov-file#options-quick-reference). My personal choice of options are in the code snippet. You can add or remove these options in the section of code where these are:

```js
useShortDoctype: true,
removeComments: true,
collapseWhitespace: true,
minifyCSS: true,
minifyJS: true
```

Make sure to add commas between the lines though or else you'll get an error.

Note: this example was [taken from the Eleventy docs](https://www.11ty.dev/docs/transforms/#minify-html-output).

## amendLibrary - Markdown footnotes

The amendLibrary method can be used to customize a library after it's been created by Eleventy prior to it being used to render your site. It's most often used for adding plugins to markdown-it, Eleventy's default markdown parser. For this example I'll be adding [markdown-it-footnote](https://www.npmjs.com/package/markdown-it-footnote) however there any many popular choices. It might be worth your time to also check out [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) and VS Code's fork of [markdown-it-katex](https://www.npmjs.com/package/@vscode/markdown-it-katex) as they're both pretty cool. The following instructions work for every markdown-it plugin I've tried so don't worry if you'd like to use another.

Install markdown-it-footnote by running the command <code>npm i markdown-it-footnote</code> in your terminal to install the package before importing the package to our .eleventy.js file (I'll be setting its variable's name to <code>markdownItFootnote</code>). Inside of the exports section add:

```js
eleventyConfig.amendLibrary("md", (mdIt) => {
    mdIt.use(markdownItFootnote);
});
```

Your .eleventy.js should now look something like if you're using CommonJS:

```js
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/**/*.css");
    eleventyConfig.addPassthroughCopy("src/assets/*");

    eleventyConfig.amendLibrary("md", (mdIt) => {
        mdIt.use(markdownItFootnote);
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
```

In order to add a footnote in markdown the syntax is:

```
something something something [^1]

[^1]: this is a footnote
```

If you'd like to add more markdown-it plugins you can chain them onto the same amendLibrary method like so:

```js
eleventyConfig.amendLibrary("md", (mdIt) => {
    mdIt.use(markdownItFootnote).use(markdownItKatex);
});
```

## Getting your site onto Nekoweb - Github Workflow

Github is a free cloud-based <span style="cursor: help; font-weight: bold;" title="Git is a popular version control system used mainly to manage different versions of the same code so developers can collaborate">Git</span> server. Even if you never use Github's collaboration features I'd recommend it just for its ability to back up your code and view your code's version history, though it should be noted that Github isn't the only Git server out there. Nekoweb even has its own, however I've never used the alternatives so I have no way of knowing if the following would work on them. Github has a feature called Github Actions, which, in conjunction with [deploy2nekoweb](https://deploy.nekoweb.org/) allows Github to be a kind of middle-man between you and Nekoweb, building your project for you and uploading it to Nekoweb. This means you no longer have to deal with zipping your project up, you can just commit your changes and it will be updated automatically.

First create a Github account and create a repository for your site. I highly recommend then downloading [Github Desktop](https://desktop.github.com/), though you could always just download only [Git](https://git-scm.com/). Github Desktop lacks the control of using Git but it's very easy to use and will let you get your bearings a little. Now, assuming you chose Github Desktop, log into your Github account through it and clone your empty repository you created earlier by pressing the "Add" dropdown. Go to your new repository's location in your file manager by pressing "Show in Explorer" in Github Desktop. Inside this folder a new file named .gitignore (no file extension, just that). Inside .gitignore you're going to want to add the following:

```
_site/
node_modules/
package-lock.json
```

This will prevent these files from being added to your repository when you upload as they'd just be unnecessary bloat. If you'd like to maintain your site at a specific version of your packages however, you may want to remove package-lock.json from your .gitignore, but for most I'd just leave it like that. Next copy and paste over all the files from your Eleventy project's current directory into your newly cloned and almost empty repository's folder on your computer, this will be where you work on your site from now on. If you go into Github Desktop you'll likely see a huge list of changed files, that means you're doing this correctly.

Next create a new folder inside your Github repository's folder on your computer and name it .github. Inside the .github folder create another folder, call this one workflows. Finally inside workflows create a new file, it can have any name as long as it has the .yml file extension. I've named mine build.yml. You can name the YAML file anything but the folders have to be named exactly.

The file structure of your repository should look something like:

```
.
├── .github/
│   └── workflows/
│       └── build.yml
├── _site
├── node_modules
├── src
├── .eleventy.js
├── .gitignore
├── package.json
└── package-lock.json
```

Inside of your new YAML file add this:

{% raw %}
```yml
name: Build and Deploy to Nekoweb

on:
  push:
    branches: ["main"]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
        - uses: actions/checkout@v4

        - uses: actions/setup-node@v3
          with:
            node-version: 20.x

        - run: npm install

        - run: npx @11ty/eleventy

        - uses: indiefellas/deploy2nekoweb@main
          with:
            nekoweb-api-key: ${{ secrets.NEKOWEB_API_KEY }}
            nekoweb-domain: 'yoursite.nekoweb.org'
            nekoweb-username: 'yourname'
            directory: 'youroutputfolder'
```
{% endraw %}

If your master branch isn't called main (which it probably will be if you followed this guide word for word) then you need to change that. Otherwise, change the last three lines accordingly. For nekoweb-domain it's whatever you domain is, if you have a custom domain write that, if not use your nekoweb.org domain. For nekoweb-username it's just your username on Nekoweb whether you have a custom domain or not. The directory is whatever folder you set as your output in your .eleventy.js, for me it's _site. Now, go into Github, go to your repository, click "Settings", look at the settings sidebar and click "Secrets and variables", click "Actions" and then create a "New repository secret". Set this secret's name as NEKOWEB_API_KEY. Now go to [nekoweb.org/api](https://nekoweb.org/api) and under "API Key" click regenerate and copy the string of text given to you. Don't let anyone have this or they'll be able to modify your site. Now, past your API key into the secret text area in Github and finally press Add Secret. That's it!

However, before creating your first commit to your Github repository its important to note that this Github workflow first deletes everything inside the folder it's uploading into. This means if you have something like an elements.css file you'd like to keep, you're going to want to add it somewhere in your Eleventy site and add a passthrough copy in your .eleventy.js's export function to send it to the output. I just put my elements.css inside of the already made CSS folder so it's passed through with the rest of the CSS files.

Now, still assuming you're using Github Desktop, inside the textbox in the bottom left saying "Summary required" enter a short summary of the changes you made (or whatever you want, that gets messy fast though if you look through your version history). Now you can add a further description or just click the blue commit button. At the top you'll see something that says "Publish branch" with a one and a little up arrow beside it. Click that and you'll have made your first Github commit to your site! Within the next minute or so your Nekoweb site will have been updated if you've done this correctly. In the future the "Publish branch" button will say "Push origin" instead but that's just about the only difference to this process. Now when you edit your site from inside the repository's folder on your computer, Git will see these changes and you'll be able to commit them.