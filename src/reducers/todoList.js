
export default (state = [], action) => {
    switch (action.type) {
        case 'SET_TODO_LIST':
            return action.todoList;
        case 'ADD_TODO_LIST':
            return [...state,action.todoList];
        default:
            return state
    }
}