export default (state = {},action) => {
    switch(action.type){
        case 'ADD_TOKEN_TO_PROPS':
        return action.token;
         case 'LOG_OUT':
        return '';
        default:
         return state;
    }
}