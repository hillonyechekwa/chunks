const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");


module.exports = function(eleventyConfig){
	eleventyConfig.addPassthroughCopy("./src/fonts/ClashGrotesk-Variable.woff2")
	eleventyConfig.addWatchTarget("./src/_includes/css/")
	eleventyConfig.addPassthroughCopy("./src/images/")
	eleventyConfig.addPassthroughCopy("./src/scripts/")
	eleventyConfig.addPassthroughCopy("./src/prism-shades-of-purple.css")
	eleventyConfig.addPassthroughCopy("./src/admin/")
	eleventyConfig.addPassthroughCopy({"./src/favicons" : "/"})
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)
	eleventyConfig.addPlugin(syntaxHighlight);
	return{
	   dir: { input: "src", output: "dist"}
	}
}
