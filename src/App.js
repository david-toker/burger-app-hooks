import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/layout/layout';
import BurgerBuilder from './containers/burger-builder/burger-builder';
// import Checkout from './components/checkout/checkout';
// import Orders from './components/orders/orders';
// import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import * as actions from './store/actions';

const Checkout = React.lazy(() => {
  return import('./containers/checkout/checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/orders/orders');
});
const Auth = React.lazy(() => {
  return import('./containers/auth/auth');
});

const App = (props) => {

  useEffect(()=> {
    props.onTryAutoSignup();
     // eslint-disable-next-line
  },[]);


  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />}/> 
        <Route path="/orders" render={(props) => <Orders {...props} />}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" render={(props) => <Auth {...props} />}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
