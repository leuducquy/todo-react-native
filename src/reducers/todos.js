export default (state=[], action) => {
  switch(action.type) {
    case 'SET_TODOS':
      return action.todos;
    case 'ADD_TODO':
    console.log("action add todo");
      console.log([...state, action.todo]);

      return [...state, action.todo];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    //case 'UPDATE_TODO':
      //return state.map((t) => t.id === action.todo.id ? action.todo : t);
    default:
      return state;
  }
}