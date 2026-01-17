---
title: getting around
updated: 2025-11-16
layout: /main.njk
description: The Unofficial Nekoweb Documentaton
---
# Getting started - Exploring Nekoweb Dashboard and Settings
*Last updated: <span class="lastupd">{{page.date | formatDate}}</span>*

Nekoweb, especially for those who haven't used a website host before, may be hard to get around, this will cover a basic guide to how to navigate the website and a bunch of information on general Nekoweb features. Please note that Nekoweb is under active development, and depending on when you have made your account and if you have migrated it to the new routing system (released on 26th July, 2025) there may be some issues. This guide focuses on newer accounts and assumes migration to the current routing system.

## The Dashboard
When creating a website, there are three files you may find inside of your dashboard, these are
prettier.json, a cursor image and a folder which follows the structure USERNAME.nekoweb.org.

**prettier.json** is the configuration for the format button and is what makes it work inside the Nekoweb editor work. below is the default configuration for it:
```
{
    "useTabs": true,
    "tabWidth": 4,
    "html": {
        "htmlWhitespaceSensitivity": "ignore"
    }
}
```

**the cursor image** is what your cursor is across Nekoweb (not personal sites, but the host itself), you can change this to another cursor as long as it is:
- Max 1KB and 12x17 pixels for free users
- Max 5KB and 16x21 for donators
- the file must be named "cursor.png" for it to work

**USERNAME.nekoweb.org** this is the folder that holds all your site files, anything for your website USERNAME.nekoweb.org will be in this folder, this is important as if you are a donator, if you had a second site, SECOND.nekoweb.org, it will have its own folder and files.

Inside your website folder by default you will find three more files, these are elements.css, index.html and not_found.html.

**elements.css** is used for both your sitebox and your postbox. Your sitebox is the box on the explore page that can be customised to look how you want, while the postbox is the box your posts sit on in [the nekoweb feed](https://nekoweb.org/feed). The elements.css file has an image size restriction of 1MB, please make sure that your images are compressed and/or resized to appropriate sizes so it works in elements.css. If any of your images within your sitebox doesn't load, your css is reversed to default. Please also note that elements.css is rather restricted in what it allows, below is a list of things that do not work in elements.css:

- any custom fonts (aka @font-face)
- animations using @keyframes

The basic elements.css file can be found below:
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
As mentioned in the file itself, changing aspects in the sitebox must start with using the class .site-box and all aspects changing the postbox must start using the class .post-box. For a guide on how to set up an rss feed and thus utilise the postbox, you can see [Joosh's RSS Tutorial](https://help.joo.sh/rss).

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

Additionally, there is [an unofficial testing space for your elements.css configiration hosted by jb](https://jbc.lol/utils/nekobox/), while it doesn't test to check for the image limits (at least as of writing), it is good resource to adjust how your sitebox and postbox look.

**index.html** is the main page of your website, when you make the homepage of your site, all the code goes into this file. On nekoweb, all index.html pages are initially created with this structure:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Nekoweb site!</title>
    <style>
        body {
            font-family: sans-serif;
        }
    </style>
</head>
<body>
    <div>
        <p>
            This is <b>your</b> page! Fill it up with your content!!!!
        </p>
        <p>
            Helpful resources:
            <ul>
                <li><a href="https://www.w3schools.com/html/">HTML tutorial (W3Schools)</a></li>
                <li><a href="https://www.w3schools.com/css/">CSS tutorial (W3Schools)</a></li>
                <li><a href="https://www.w3schools.com/js/">JavaScript tutorial (W3Schools)</a></li>
                <li><a href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web">Getting started with the web by Mozilla</a></li>
                <li>Press F12 (or right-click and select "Inspect" in most browsers) to open the developer tools and see the page source. This is a great way to look how other pages are made. It's also <i>very</i> useful while creating your own page.</li>
            </ul>
        </p>
        <a href="https://nekoweb.org/"><img src="https://nekoweb.org/assets/buttons/button5.gif"></a>
    </div>
</body>
</html>
```

**not_found.html** is the error page of your site, the default structure for this is:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Not found.</title>
</head>
<body>
    Page was not found.
</body>
</html>
```

other than files, there are a few other buttons and links around the dashboard. Some of these are donator features and will be marked with a \* at the start of their name. Here will be a quick run through of what they all do:

<img src="/assets/getting-started/dropdown.png" alt="an image of an unopened dropdown, it has a nekoweb username in it">
this is the drop down, if someone has added your account to their 'team' you can use this dropdown to switch between dashboards and edit someone else's website. <br><br>
<img src="/assets/getting-started/filestats.png" alt="an image showing how much file space is in the nekoweb dashboard, it reads: 3.48KB out of 500mb. (upgrade) with a link to the subscription page. 5 files. 1 folders">
This shows how much space you are using as well as how many foldlers and files you have. <b>please note, it is recommended to host all your files on nekoweb!!!</b> This gives you the most control over your files, and prevents issues like other hosts such as filegarden, catbox or imgur giving you issues like your files not working due to an error on their end, additionally some of these services are not available in some countries.

**Export ZIP** - what it says on the tin, exports your files as a zip.
**Import ZIP** - allows you to upload a zip of your files, it will replace anything that has the same name, e.g if you already had a file called about.html it will use the about.html in the zip you are uploading and remove the old one.
\***Nekode** - Nekoweb's website editor for donators.
\***Git** - or NekoGit, allows version control for your site, for donators.
**VM** - Nekoweb's Terminal, recommended for those who have more advanced coding knowledge. It's used for things like utilising frameworks or static site generators to build your site.
\***FTP** - Lets you upload, edit and manage your website from your computer, the page itself outlines some of the features.

**new file** - add a new file to your website
**new folder** - add a new folder to your website
**upload files** - upload files from your device to your website

<img src="/assets/getting-started/pathbar.png" alt="a screenshot of an input field, it has the text 'username.nekoweb.org'">
the path bar, shows which folder you are currently in, you can also type inside it to go to your path location as long as the files are uploaded within your dashboard.<br><br>
<img src="/assets/getting-started/listview.png" alt="a screenshot of a button, showing items organised in a list">
<img src="/assets/getting-started/gridview.png" alt="a screenshot of a button, showing items organised in a grid">
these are used to switch between how you view your files in the dashbord.<br><br>
<img src="/assets/getting-started/azbutton.png" alt="a button that opens a dropdown, it shows three ways you can choose to sort your files; Name, Size and Last Modified">
the a-z button allows you to change how your files are sorted. you can choose between sorting by name, size and last modified.<br><br>
<img src="/assets/getting-started/confirmdelete.png" alt="a tickbox, asking if you want to cofirm any deletions made on your website">
this allows you to check if you want to delete a file or not, to save you from accidentally deleting something. with this enabled, when you attempt to delete a file an alert like below will show
<img src="/assets/getting-started/deleteprompt.png" alt="a popup, it says: 'Are you sure you want to delete prettier.json?'">

## General Settings
Nekoweb settings may be a little difficult to navigate at first, but like above I'll detail every aspect of what are within the settings and point out some options you can toggle.

<img src="/assets/getting-started/sitelist.png" alt="a screenshot that shows the title 'sites', under it is a table, under Status it has Main. Under domain it has username.nekoweb.org. Under title it has 'My nekoweb site', under folder it has '/username.nekoweb.org', it also shows statistics, it has 0 followers, 0 views and 1 update. at the very right hand side is a settings link that takes you to the site settings.">
<b>the sites list</b> - this is the basic information for each site you own, it covers the status (if the page is your main site or an active site) as well as other aspects like your domain name, your website title (which can be changed in your index html), the folder the site is held in as well as statistics like your followers, views and updates. Additionally each site has it's own settings menu, which we'll dive into later.<br><br>
<img src="/assets/getting-started/team.png" alt="the team list, it shows a list of usernames and beside the username that's added is a remove button. there is also a field to add usernames to your team.">
<b>team</b> - here you can add others to your account, this allows them to also edit and change your files. <b>if you are a donator and have multiple websites, this gives them access to ALL of your websites</b> make sure you trust someone before giving them access.<br><br>
<img src="/assets/getting-started/appearance.png" alt="the appearance settings settings, it has two checkboxes, one for multiplayer cursors and one for sitebox styles. both are ticked.">
<b>appearance</b> allows you to toggle two settings:
<ul>
    <li><b>Multiplayer cursors</b> - This is seeing other people's cursors around Nekoweb and the chatting feature.</li>
    <li><b>Sitebox styles</b> - This is the custom styles in elements.css, turning this off reduces them all to default.</li>
</ul>

## Website Specific Settings
These are accessed under the general settings in the site section, beside each site when you click settings it will take you to this page.

### site settings tab
**Enable Nice Links** - As stated, this will make pages like **/page.html** show as **/page** (like Neocities). Keep in mind that turning this on shouldn't break anything, but turning this back off will most likely break your links if you already use links without .html and will hurt your site in Google (for pages that were already indexed without .html), so if you enable this it's not recommended to turn it off, unless you just wanted to experiment for a bit.

**Show this site in Explore and Follows pages.** - Allows you to toggle if people can see your site on these respective pages.

**Show this site's RSS posts in global feed.** - Allows you to toggle if people can see your posts in the Nekoweb Feed page, please also note that if you have issues being added to the feed there are some internal criteria, such as a minimum follower count, needed to be visible on the global feed.

**This site contains NSFW content.** - For you to toggle if your site has NSFW content, please make sure to label your website accordingly! If you have this toggled, someone from the UK for example will only see the text "This site is not available in your country due to UK Online Safety Act.".

### \*domain settings tab
This is largely a donator only feature, It mainly shows your domain status and allows you to change your website domain through an input box at the bottom. If you are looking for a guide or struggling adding a custom domain, I highly recommend [Joosh's Custom Domain Tutorial](https://help.joo.sh/domains)!

### tag settings
this is where you can add tags for your site, these are used to find your site on the explore page, you can add up to 10 tags. Below is an example screenshot with ten tags added:
<img src="/assets/getting-started/tags.png" alt="an image showing what it looks like with ten tags added to your tag list, they are all in a list with a column beside them to 'delete' them from your list. below the list is an input field where you can add tags.">

### RSS settings
This primarily manages how your RSS feed is shown on Nekoweb's Global Feed. Nekoweb automatically checks your file for updates to display on the feed.

<img src="/assets/getting-started/manageposts.png" alt="a button that says 'manage posts'">
The manage posts button is used to show your feed posts, **to remove a post from the feed, you need to use this manage posts feature rather than delete it from your rss file**, this is as it cache's old posts displayed on nekoweb's feed. The manage post feed looks like the screenshot below:
<img src="/assets/getting-started/rssmanageposteg.png" alt="a screenshot of the manage posts page, it has the title 'manage posts for layercake.moe' and underneath is each rss post, it shows the GUID, the title the date and an option to delete the post">

<img src="/assets/getting-started/setrss.png" alt="a screenshot that shows a section where you can set your rss feed through the input field">
This is the input file where you set your rss feed, following the routing migration, you need to make sure to list your **username.nekoweb.org** file when linking your RSS feed file.

### \*Headers settings
The headers tab used for custom http headers is a donator perk. This is a topic I am not as knowledgeable about but I will try my best to explain. Custom HTTP headers are like extra snippets of information for your website that helps your website communicate with other clients or servers better. On this page you can add headers such as content security policy to your website using the add header section. The screenshot below shows what the header page looks like, with an example added header:
<img src="/assets/getting-started/headers.png" alt="an image showing the headers page, it has an added html header which is displayed like a table, showing a section for the header, value and folder. beside it is a button to remove each header added. below the table is a section where you can add a new header">

### Followers
This is less a setting and more shows every website that follows you, in a similar display to the explore page.

### Stats
These show your website statistics, there are three graphs: Visits, Followers and Updates. As a free user, you can only see your statistics for the month, if you are a donator (Cute cat tier) you can see your statistics for the year and if you are a donator (Neko tier) you can see the statistics for all time.