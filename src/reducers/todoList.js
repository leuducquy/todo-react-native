
export default  (state = [], action) => {
    switch (action.type) {
        case 'SET_TODO_LIST':
            return action.todoList;
        default:
            return state
    }
}