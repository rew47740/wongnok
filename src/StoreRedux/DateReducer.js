const DateReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_DATE':
            return state.concat([action.d]);
        case 'CLEAR_LIST':
            return [];
        default:
            return state;
    }
}

export default DateReducer;