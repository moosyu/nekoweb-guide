---
title: Getting Around
updated: 2026-02-23
layout: /main.njk
description: The Unofficial Nekoweb Documentaton
---
# Getting started - Elements.css, the sitebox and the postbox
*Last updated: <span class="lastupd">{{updated | formatDate}}</span>*

**elements.css** is used for both your sitebox and your postbox. Your sitebox is the box on the explore page that can be customised to look how you want, while the postbox is the box your posts sit on in [the nekoweb feed](https://nekoweb.org/feed). The elements.css file has an image size restriction of 1MB, please make sure that your images are compressed and/or resized to appropriate sizes so it works in elements.css. If any of your images within your sitebox doesn't load, your css is reversed to default. Please also note that elements.css is rather restricted in what it allows, below is a list of things that do not work in elements.css:

- any custom fonts (aka @font-face)
- animations using @keyframes

The default elements.css file can be found below:
```
/*
    Don't use this file to edit your site style! Create a different CSS file for that.
    This file defines how custom elements (like sitebox) will look like.
    Setting CSS that breaks main nekoweb site on purpose is prohibited and may result in ban and site deletion!
*/

/* Must start with ".site-box". Change how your website will appear on main nekoweb site: https://nekoweb.org/assets/siteboxes.png */
.site-box {
    text-align: center;
    background-image: url(/assets/cookiebox.png); /* Only your-username.nekoweb.org URLs allowed, use FULL url to your file like https://your-username.nekoweb.org/your-username.nekoweb.org/bg.png */
    background-repeat: no-repeat;
    color: #b08271;
    font-size: 12px;
}
.site-box > a > p {
    color: var(--darkbrown);
    font-weight: bold;
}
.site-box > a > span {
    color: var(--darkbrown);
}

/* Style for your 'Follow on Nekoweb' button (<iframe src="https://nekoweb.org/frame/follow" frameborder="0" width="170" height="28"></iframe>) */
.follow {

}

/* Style for your post box (must start with ".post-box") */
.post-box {
    background-color: #fff2cc;
    border: 4px solid #ecbfa6;
    padding: 15px;
    border-radius: 5px;
    color: #634c53;
    font-weight: normal;
}

.post-box .post-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 0px;
}
```
As mentioned in the file itself, changing aspects in the sitebox must start with using the class `.site-box` and all aspects changing the postbox must start using the class `.post-box`. For a guide on how to set up an rss feed and thus utilise the postbox, you can see [Joosh's RSS Tutorial](https://help.joo.sh/rss). It is also important to note the difference in `.follow` and the follow button on your sitebox, edited with `.site-box .follow`, .follow is used specifically for the follow iframe (implemented with `<iframe src="https://nekoweb.org/frame/follow" frameborder="0" width="170" height="28"></iframe>`), this is a customisable iframe that adds the follow button to your site. Meanwhile, .site-box .follow is used to customise the follow symbol on your sitebox, this is originally shown as the [+] symbol. There is a second alternative method to add a follow link to your site, as well. This is by using an a href link to 'https://nekoweb.org/follow/username.nekoweb.org', which will redirect you to a page asking if you would like to follow that user. If you use a custom domain, you should use that in place of the nekoweb subdomain.

Below are some quick common codes that are frequently asked for to hide sections of the sitebox.

Hiding the website screenshot on sitebox:
```
.site-box .sitefeature {
    display: none;
}
```

Making the follow "\[+]" button an image:
```
.site-box .follow {
content: url ("image url");
top: 10px;
left: 10px;
padding: 0px;
}
```
the top and left can be used to adjust the placement of the image.

Adding extra images to your site-box can be done with the use of ::before and ::after in css, below is an example of how I added the logo to the sitebox for my main site:
```
.site-box::after {
    content: url(image url);
    position: absolute;
    background-size: contain;
    top: -30px;
    right: 160px;
    width: 10px;
    height: 10px;
    z-index: 1;
}
```
<img src="/assets/getting-started/added-image-sitebox.png" alt="a screennshot of my sitebox, in the top right corner it has a logo added onto it">

Additionally, there is [an unofficial testing space for your elements.css configiration hosted by jb](https://jbc.lol/utils/nekobox/), while it doesn't test to check for the image limits (at least as of writing), it is good resource to adjust how your sitebox and postbox look.