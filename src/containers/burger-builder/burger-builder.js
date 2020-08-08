import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxx-hoc';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/build-controls/build-controls';
import Modal from '../../components/UI/modal/modal';
import OrderSummary from '../../components/burger/order-summary/order-summary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/spinner';
import WithErrorHandler from '../../hoc/with-error-handler/with-error-handler';
import * as actions from '../../store/actions';



const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
         // eslint-disable-next-line
    },[]);

    const updatePurhaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0;
    }


    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }
    const purchaseContinuelHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    
    const disabledInfo = {
        ...props.ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings}/>
                <BuildControls
                    ingredientAdded={props.onIngredientAdded} ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurhaseState(props.ings)}
                    price={props.price}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}/>
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={props.ings}
            price={props.price}
            purchaseCancelled={purchaseCancelHandler}
            purhaseContinued={purchaseContinuelHandler}/>;
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));