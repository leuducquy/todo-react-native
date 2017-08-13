const initialState = {
    isOpen : false
}
export default (state = initialState,action) => {
    switch(action.type){
        case 'TOGGLE':
        
        return action.isOpen;
      
        default:
         return state;
    }
}