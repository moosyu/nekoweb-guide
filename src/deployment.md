---
title: Deployment
updated: 2026-01-19
layout: /main.njk
description: The Unofficial Nekoweb Documentaton
---
## Deploying to Nekoweb
*Last updated: <span class="lastupd">{{updated | formatDate}}</span>*
*Authors: <a class="lastupd" href="https://jbc.lol/">JB</a> and <a class="lastupd" href="https://moosyu.github.io/">Moosyu</a>*

## Disclaimer
We will try to deploy the site you created on the [Eleventy guide](/eleventy) as an example, but you can do this on all other SSGs/frameworks with zero or some slight modification to the guide.

Some SSGs or frameworks (like Astro and Svelte) might have their own deployment libraries that is more integrated to the framework itself. Check your framework's integrations/libraries repository first and use that instead of following this, as it can have more features than the things shown here.

[//]: # (UNCOMMENT THIS WHEN NEKOWEB ADDS DYNAMIC PAGES:)
[//]: # (If you're have Nekoweb Neko Tier and wants to use your framework's SSR feature for Nekoweb's Dynamic Pages, **do not follow this guide, and check your framework's integrations library for a more integrated solution.** This guide assumes you want to deploy a statically-built website.)

## Overview
If you've been editing your site locally for a while, you may want to know how to upload it directly after building it. This is especially useful if you have switched to a SSG for example but are still manually uploading your files to the Nekoweb dashboard. This guide will outline automating your deployment workflow so you can either run a command or push it to your GitHub repository, then using your Github repository to automaticallly deploy your site to Nekoweb.

This guide consists of 2 seperate ways to deploy your Nekoweb site, [using deploy2nekoweb](#using-deploy2nekoweb), and [creating your own using the Nekoweb API library](#creating-your-own-using-the-nekoweb-api-library).

## Prerequisites
This are the things you need for both methods:
- A Nekoweb account
- A SSG project, in this guide we will use the site you created with the [Eleventy guide](/eleventy)
- A Nekoweb API key (you can get one by going to [Nekoweb API page](https://nekoweb.org/api) and pressing 'Regenerate')
- The folder name of your site

Each way has it's own prerequisites you need to follow alongside the above.

## Using deploy2nekoweb
Github is a free cloud-based <span class="help" title="Git is a popular version control system used mainly to manage different versions of the same code so developers can collaborate">Git</span> server. Even if you have never use Github's collaboration features I'd recommend it just for its ability to back up your code and view your code's version history, though it should be noted that Github isn't the only Git server out there. Nekoweb even has its own git server, however I have only used Github so I have no way of knowing if the following deployment methods would work on the alternative Git servers. Github has a feature called Github Actions, which, in conjunction with [deploy2nekoweb](https://deploy.nekoweb.org/) allows Github to be a kind of middle-man between you and Nekoweb, building your project for you and uploading it to Nekoweb. This means you no longer have to deal with zipping your project up, you can just commit your changes and it will be updated automatically.

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

If your master branch isn't called main (which it probably will be if you followed this guide word for word) then you need to change that. Otherwise, you only need to fill in the last three lines accordingly. For nekoweb-domain it's whatever you domain is, if you have a custom domain write that, if not use your nekoweb.org domain. For nekoweb-username it's just your username on Nekoweb whether you have a custom domain or not. The directory is whatever folder you set as your output in your .eleventy.js, for me it's _site. Now, go into Github, go to your repository, click "Settings", look at the settings sidebar and click "Secrets and variables", click "Actions" and then create a "New repository secret". Set this secret's name as NEKOWEB_API_KEY, and put the API key you got from the Nekoweb API page.

However, before creating your first commit to your Github repository its important to note that this Github workflow first deletes everything inside the folder it's uploading into. This means if you have something like an elements.css file you'd like to keep, you're going to want to add it somewhere in your Eleventy site and add a passthrough copy in your .eleventy.js's export function to send it to the output. I just put my elements.css inside of the already made CSS folder so it's passed through with the rest of the CSS files.

Now, still assuming you're using Github Desktop, inside the textbox in the bottom left saying "Summary required" enter a short summary of the changes you made (or whatever you want, that gets messy fast though if you look through your version history). Now you can add a further description or just click the blue commit button. At the top you'll see something that says "Publish branch" with a one and a little up arrow beside it. Click that and you'll have made your first Github commit to your site! Within the next minute or so your Nekoweb site will have been updated if you've done this correctly. In the future the "Publish branch" button will say "Push origin" instead but that's just about the only difference to this process. Now when you edit your site from inside the repository's folder on your computer, Git will see these changes and you'll be able to commit them.

## Creating your own using the Nekoweb API library

If you don't want to dabble with Git, you can interface directly to the Nekoweb API and upload using that. Note that this requires some knowledge of JavaScript, but this guide will give you a code example to copy and paste on.

### Setting up
To start, we need a couple libraries, one to interface with the Nekoweb API, and one to zip up our website. We can install it using `npm`:

```
> npm install @indiefellas/nekoweb-api adm-zip @types/adm-zip
```

After that, create a `deploy.json` file on the root of the project (the folder that contains your `.eleventy.js` file), and add this content:
```json
{
  "nekowebApiKey": "YOUR_NEKOWEB_API_KEY",
  "nekowebFolder": "/example.nekoweb.org"
}
```

Edit `YOUR_NEKOWEB_API_KEY` to the API key provided by the Nekoweb API page and `/example.nekoweb.org` to your site's domain folder.

> Note: If you have tracked your site to git, add `deploy.json` to `.gitignore` to prevent it from being tracked by Git and exposing your Nekoweb API key. If you accidentally commited it, regenerate a new API key.

Now, create a `deploy.js` file on the root of your project, and add this:
<details>
<summary><strong>For ES Modules</strong> (if your <code>package.json</code> has <code>"type": "module"</code>)</summary>
{% raw %}
```
import NekowebAPI from "@indiefellas/nekoweb-api";
import AdmZip from "adm-zip";
import Deploy from "./deploy.json" with { type: "json" }

/**
* Deploys 11ty site to Nekoweb
* @param {string} outFolder
*/
export default async function deploySite(outFolder) {
  console.log('[Deploy] Deploying to Nekoweb...')
  const zip = new AdmZip();
  var folder = Deploy.nekowebFolder
  if (!folder.startsWith("/")) folder = "/" + Deploy.nekowebFolder
  zip.addLocalFolder(outFolder, folder)
  const nekowebApi = new NekowebAPI({
    apiKey: Deploy.nekowebApiKey,
    logging: (t, m) => console.log(`[Deploy] ${m}`)
  })
  const zipBuffer = await zip.toBufferPromise()
  const bigFile = await nekowebApi.createBigFile()
  await bigFile.append(zipBuffer)
  try {
    await nekowebApi.delete(folder)
  } catch (error) {
    console.log('[Deploy] No existing folder to delete (this is fine for first deploy)')
  }
  await bigFile.import("/")
  const siteInfo = await nekowebApi.getSiteInfo(folder.replace(/^\//, "").split("/")[0])
  console.log('[Deploy] Done! You can now check it on', 'https://' + siteInfo.domain)
}
```
{% endraw %}
</details>

<details>
<summary><strong>For CommonJS</strong> (if your <code>package.json</code> does NOT have <code>"type": "module"</code>)</summary>
{% raw %}
```
const NekowebAPI = require("@indiefellas/nekoweb-api").default;
const AdmZip = require("adm-zip");
const Deploy = require("./deploy.json");

/**
* Deploys 11ty site to Nekoweb
* @param {string} outFolder
*/
async function deploySite(outFolder) {
  console.log('[Deploy] Deploying to Nekoweb...')
  const zip = new AdmZip();
  let folder = Deploy.nekowebFolder
  if (!folder.startsWith("/")) folder = "/" + Deploy.nekowebFolder
  zip.addLocalFolder(outFolder, folder)
  const nekowebApi = new NekowebAPI({
    apiKey: Deploy.nekowebApiKey,
    logging: (t, m) => console.log(`[Deploy] ${m}`)
  })
  const zipBuffer = await zip.toBufferPromise()
  const bigFile = await nekowebApi.createBigFile()
  await bigFile.append(zipBuffer)
  try {
    await nekowebApi.delete(folder)
  } catch (error) {
    console.log('[Deploy] No existing folder to delete (this is fine for first deploy)')
  }
  await bigFile.import("/")
  const siteInfo = await nekowebApi.getSiteInfo(folder.replace(/^\//, "").split("/")[0])
  console.log('[Deploy] Done! You can now check it on', 'https://' + siteInfo.domain)
}
module.exports = deploySite;
```
{% endraw %}
</details>

After that, let's go to your `.eleventy.js` file and we add this on the config, above the file:
```js
import deploySite from "./deploy.js";
```

or if you're using CommonJS,
```js
const deploySite = require("./deploy.js")
```

and this inside your eleventyConfig function:
```js
eleventyConfig.on('eleventy.after', async ({ runMode, dir, results }) => {
  if (runMode === 'build' && results && results.length > 0) {
    await deploySite(dir.output)
  }
})
```

Now, run `npm run build`, and it should build your site!