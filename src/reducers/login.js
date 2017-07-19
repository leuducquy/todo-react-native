export default (state = {},action )=>{
    switch(action.type){
        case 'LOGIN_SUCCEEDED':
          console.log(action.type);
        return state;
         case 'LOGIN_FAILED':
        return state;
        default:
        return state;
    }
}