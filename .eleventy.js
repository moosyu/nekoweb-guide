const nunjucks = require("nunjucks");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {

// i like my 11ty being nice to me
  eleventyConfig.on("beforeBuild", () => {
    console.log("⏳ Build starting...");
  });


  ///////////////////////////////// MARKDOWN CONFIG /////////////////////////////////
  const md = markdownIt({
    html: true, // allows html in md files
    breaks: true,
    linkify: false, // turns pasted links into clickable links
    typographer: true // changes stuff like -- to –
  }).use(markdownItAttrs); // adds markdown attributes plugin used below to adjust shit

// adjust markdown so *this* makes <i>this</i> so its not emphasised on screenreaders but only visually italics
  md.renderer.rules.em_open = () => '<i>';
  md.renderer.rules.em_close = () => '</i>';
// adjust markdown so **this** makes <b>this</b> so its not emphasised on screenreaders but only visually bold
  md.renderer.rules.strong_open = () => '<b>';
  md.renderer.rules.strong_close = () => '</b>';

// adjust md smart punctuation
  md.core.ruler.push('disable_smart_punctuation', state => {
    state.tokens.forEach(token => {
      if (token.type === 'inline' && token.children) {
        token.children.forEach(child => {
          if (child.type === 'text') {
            child.content = child.content.replace(/…/g, '...');
            child.content = child.content.replace(/[“”]/g, '"');
            child.content = child.content.replace(/[‘’]/g, "'");
          }
        });
      }
    });
  });

  // tells 11ty to use my markdownit config
  eleventyConfig.setLibrary("md", md);

  ///////////////////////////////// REST OF CONFIG /////////////////////////////////

  //formats dates to be nicey
  eleventyConfig.addNunjucksFilter("formatDate", (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
});


  // stop the default behaviour of foo.html being turned into foo/index.html
  // however can go back to the original behaviour if you have permalinkStyle: default in frontmatter
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      if (data?.permalinkStyle === "default") return;
      return `${data.page.filePathStem}.html`;
    }
  });

  // copy over site assets to public folder
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/css/");

  // uses collections api to get all pages on your site, this is used to spit out site map
  eleventyConfig.addCollection("allPages", function(collectionApi) {
    return collectionApi.getAll().filter(page => {
      return !page.url.startsWith("/assets/js/") && !blockedPages.includes(page.url);
    });
  });

  // blocked pages I do not want to appear in sitemap
  const blockedPages = [
    "/random",
    "/home",
    "/sitemap"
  ];

  // i like my 11ty being nice to me
  eleventyConfig.on("afterBuild", () => {
    console.log("✅ Build complete. Have a nice day!");
  });

  return {
    dir: {
      input: "src",
      output: "docs.layercake.moe",
    },
    markdownTemplateEngine: "njk", // basically lets me use njk template stuff in markdown
  };
};