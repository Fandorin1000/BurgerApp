import React from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/NavigationItems/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component {
    state = {
        isShowModal: false
    }
    closeBackdropHandler = props => {
        this.setState({ isShowModal: false })
    }
    toggleSideDrawerHandler = props => {
        this.setState((prevState) => {
            return { isShowModal: !prevState.isShowModal }
        })
    }
    render() {
        return (
            <Auxiliary>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    showModal={this.state.isShowModal}
                    toggleSideDrawer={this.toggleSideDrawerHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closeModal={this.closeBackdropHandler}
                    showModal={this.state.isShowModal} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);