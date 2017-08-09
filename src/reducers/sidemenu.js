const initialState = {
    isOpen : false
}
export default (state = initialState,action) => {
    switch(action.type){
        case 'TOGGLE':
        console.log('reducer',action);
        
        return action.isOpen;
      
        default:
         return state;
    }
}