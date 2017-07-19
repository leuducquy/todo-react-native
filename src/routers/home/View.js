import React , {Component}from 'react';
import TodoForm from './components/TodoForm';

class Home extends Component {

    componentWillMount() {
        debugger;
        this.props.checkIfSignedIn();
    }
    render() {
        return (
            <TodoForm {...this.props}/> 
        );
    }
}

export default Home;