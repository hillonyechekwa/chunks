module.exports = function(eleventyConfig){
	eleventyConfig.addPassthroughCopy("./src/css/")
	eleventyConfig.addWatchTarget("./src/_includes/css/")
	eleventyConfig.addPassthroughCopy("./src/images/")
	eleventyConfig.addPassthroughCopy("./src/scripts/")
	eleventyConfig.addPassthroughCopy({"./src/favicons" : "/"})
	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)
	return{
	   dir: { input: "src", output: "dist"}
	}
}
