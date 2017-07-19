export default (state = " ",action) => {
    switch(action.type){
        case 'ADD_TOKEN_TO_PROPS':
        debugger;
        return action.token;
        default:
         return state;
    }
}