import React from 'react'
import classes from './ContactData.module.css';
import Button from '../../Components/UI/Button/Button';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { updatedObject, checkValidity } from '../../shared/utility';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your name"
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your street"
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your country"
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your ZIP code"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Your email"
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: "Fastest" },
                        { value: 'cheapest', displayValue: "Cheapest" },
                    ]
                },
                value: 'fastest',
                validation: {},
                isValid: true
            },

        },
        formIsValid: false,

    }

    orderHandler = (event) => {
        event.preventDefault()
        let date = new Date();
        let fullDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
        const formData = {}
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            userId: this.props.userId,
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData,
            date: fullDate
        }
        this.props.onOrderBurger(order, this.props.token)

    }

    inputChangeHandler = (event, inputId) => {

        const updatedFormElement = updatedObject(this.state.orderForm[inputId], {
            value: event.target.value,
            isValid: checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        })
        const updatedOrderForm = updatedObject(this.state.orderForm, {
            [inputId]: updatedFormElement
        })

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].isValid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        let inputsArray = [];
        for (let key in this.state.orderForm) {
            inputsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {inputsArray.map(inEl => (
                    <Input
                        key={inEl.id}
                        value={inEl.config.value}
                        elementConfig={inEl.config.elementConfig}
                        elementtype={inEl.config.elementType}
                        invalid={!inEl.config.isValid}
                        shouldValidate={inEl.config.validation}
                        touched={inEl.config.touched}
                        changed={(event) => this.inputChangeHandler(event, inEl.id)}
                    />))}

                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contacts please</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.isLoading,
    token: state.auth.token,
    userId: state.auth.userId
})
const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
