import React from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends React.Component {
    //сделано классовым исключительно для теста не должен быть классовым
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children
    }
    // componentWillUpdate() {
    //     console.log('[MODAL] componentWillUpdate')
    // }
    render() {
        return (
            <Auxiliary>
                <Backdrop showModal={this.props.showModal} closeModal={this.props.closeModal} />
                <div className={classes.Modal}
                    style={{
                        opacity: this.props.showModal ? 1 : 0,
                        transform: this.props.showModal ? "translateY(0)" : "translateY(-100vh)"
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}
export default Modal;