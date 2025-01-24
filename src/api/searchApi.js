import axios from 'axios'

// export const fetchSearchWord = async(query, country = 'KR', entity = 'software', media='software', limit=10) => {
//     const response = await axios.get(`https://itunes.apple.com/search`, {
//         params: {term: query, country, entity, media, limit}
//     })
// // console.log(`response는 = ${JSON.stringify(response.data.results)}`);
//     return response.data.results
// }

let currentData = []; // 받은 데이터를 저장할 변수
let currentLimit = 10; // 요청할 데이터의 개수

export const fetchSearchWord = async (query, country = 'KR', entity = 'software', media = 'software', limit = currentLimit) => {
    const response = await axios.get(`https://itunes.apple.com/search`, {
        params: { term: query, country, entity, media, limit }
    });

    // 받은 데이터를 현재 데이터에 추가
    currentData = [...currentData, ...response.data.results];

    return response.data.results;
}
