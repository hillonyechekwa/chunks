const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
require('dotenv').config()
const algoliasearch = require('algoliasearch');
const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const algoliaIndex = searchClient.initIndex('dev_search')


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
	eleventyConfig.addCollection('algolia', collectionApi => {
		const index = collectionApi.getAll().filter(item => {
			let extension = item.inputPath.split(".").pop();
			return extension === 'md'
		}).map(item => {
			return {
				objectID: item.data.page.url,
				title: item.data.title,
				author: item.data.author,
				description: item.data.description,
				url: item.data.page.url,
				content: JSON.stringify(item.template.frontMatter.content)
			}
		})
		
		return algoliaIndex.saveObjects(index)
		
	})
	return{
	   dir: { input: "src", output: "dist"}
	}
}
