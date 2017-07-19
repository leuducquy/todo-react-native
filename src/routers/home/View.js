import React , {Component}from 'react';
import TodoForm from './components/TodoForm';

class Home extends Component {

    componentWillMount() {
        this.props.checkIfSignedIn();
        debugger;
    }
    render() {
        return (
            <TodoForm {...this.props}/> 
        );
    }
}

export default Home;