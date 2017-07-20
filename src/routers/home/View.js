import React , {Component}from 'react';
import {View} from 'react-native';
import TodoForm from './components/TodoForm';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Actions} from 'react-native-router-flux';
import {Button } from "react-native-elements";
class Home extends Component {

    componentDidMount() {
        console.log(this.props);
       this.props.subscribeToNewTodos();
    }
    render() {
        return (
            <View>
                <TodoForm {...this.props}/> 
                <Button 
                title ='Go to login'
                onPress={() =>Actions.login({})}
                />
            </View>
            
        );
    }
}
const subscriptionGraphql = gql`
subscription{
    todoAdded {
        id
        text
        complete
    }
}
`;
const viewerQuery  = gql`
query($token : String!) {
    viewer(token : $token){
        todos {
            text
        }
    }
}
`;
const getViewer = graphql(viewerQuery, {
      name: 'viewer',
   options: ({ token }) => ({
    variables: {
        token,
    },
  }),
     props: props => {
        return {
            subscribeToNewTodos: params => {
                return props.viewer.subscribeToMore({
                    document: subscriptionGraphql,
                    updateQuery: (prev, {subscriptionData}) => {
                        console.log('new data receive');
                         console.log(prev);
                          console.log(subscriptionData);
                          return prev;
                    }
                });
            }
        };
    },
});

export default getViewer(Home);