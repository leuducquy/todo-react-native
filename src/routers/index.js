
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import View from './View';
import * as localActions from './actions';
import * as globalActions from '../actions';
const mapStateToProps = (state, ownProps) => ({
    logout: state.logout,
    isOpen: state.isOpen 
});

function mapDispatchToProps(dispatch) {
    return {

        localActions: bindActionCreators(localActions, dispatch),
        globalActions: bindActionCreators(globalActions, dispatch)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(View);