const initialState = {
    id: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ID':
            return {
                ...state,
                id: action.payload
            };
        default:
            return state;
    }
};

export default reducer;  