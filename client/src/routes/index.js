import React from 'react';
import { Switch } from 'react-router-dom';
import {
  ScrollToTop,
  LoggedOutRoute,
  LoggedInRoute,
} from '../components/route-wrappers';
import AuthPage from '../pages/auth-page';
import AuthFacebookRoutes from './auth-facebook-routes';
import LoggedInRoutes from './logged-in-routes';

/**
 * @summary Entry point for logged in routes.
 */

const Routes = () => (
  <ScrollToTop>
    <Switch>
      <LoggedOutRoute
        path="/auth/facebook"
        component={AuthFacebookRoutes}
        redirectTo="/" // in case user IS logged in, redirect to home page
      />
      <LoggedInRoute
        path="/"
        component={LoggedInRoutes} // in case user IS logged in, display this component
        authComponent={AuthPage} // in case user is NOT logged in, display the auth component
      />
    </Switch>
  </ScrollToTop>
);

export default Routes;
