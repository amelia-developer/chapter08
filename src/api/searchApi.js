import axios from 'axios'

export const fetchSearchWord = async(query, country = 'KR', entity = 'software', media='software') => {
    const response = await axios.get(`https://itunes.apple.com/search`, {
        params: {term: query, country, entity, media}
    })
// console.log(`response는 = ${JSON.stringify(response.data.results)}`);
    return response.data.results
}