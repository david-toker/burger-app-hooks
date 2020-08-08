import React from 'react';
import Aux from '../../../hoc/Auxx-hoc';
import Button from '../../UI/button/button';

const OrderSummary = (props) => {
    // const ingredientSummary = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         return (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)
    //     });
    // return(
    // <Aux>
    //     <h3>Your Order</h3>
    //     <p>A delicious burger with the following ingredients:</p>
    //     <ul>
    //         {ingredientSummary}
    //     </ul>
    //     <p>Continue to Checkout</p>
    // </Aux>
    // )

    const ingredientSummary = Object.keys( props.ingredients )
        .map( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li> );
        } );

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Button Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Button Success" clicked={props.purhaseContinued}>CONTINUE</Button>
        </Aux>
    );

};

export default OrderSummary;