// 액션타입정의
export const INPUT_SEARCH_WORD = "INPUT_SEARCH_WORD"

// 액션생성자
export const inputSearchWord = (searchWord) => ({
    type: INPUT_SEARCH_WORD,
    payload: searchWord
})