
const client = algoliasearch('5XD540C63X', '4b1575728f3f89f2d79a1c977f8f0559')

const index = client.initIndex('dev_search')

const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')

searchInput.addEventListener('input', handleSearch)


async function handleSearch() {
	const query = searchInput.value
	
	if(query.trim().length === 0){
		searchResults.innerHTML = ""
		return;
	}
	
	
	try{
		const {hits} = await index.search(query)
		
		const resultsHTML = hits.map((hit) => `<li><a href="${hit.url}">${hit.title}</a></li>`)
		.join('')
		
		searchResults.innerHTML = resultsHTML
	}catch(error){
		console.error('Error performing search', error)
	}
}
