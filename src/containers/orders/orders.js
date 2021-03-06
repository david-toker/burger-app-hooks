import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/order/order';
import axios from '../../axios-orders'
import WithErrorHandler from '../../hoc/with-error-handler/with-error-handler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/spinner/spinner';

const Orders = props => {

    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
        // eslint-disable-next-line
    },[]);
    
    let orders = <Spinner/>;
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
        ))
    }
    return(
        <div>
            {orders}
        </div>
    );
    
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));