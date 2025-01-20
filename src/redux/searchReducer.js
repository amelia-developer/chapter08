import { combineReducers } from 'redux';

const initialState = {
    searchWord: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INPUT_SEARCH_WORD":
console.log('Action received in reducer:', action)
            return {...state, searchWord: action.payload}    
        default:
            return state
    }
}

const rootReducer = combineReducers ({
    search: searchReducer
})

export default rootReducer