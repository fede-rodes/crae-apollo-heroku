import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthSuccessPage from '../pages/auth-success-page';
// import NotFoundPage from '../pages/not-found-page';

/**
 * @summary List of all facebook auth routes.
 */
// TODO: implement /auth/facebook/success and /auth/facebook/fail
const AuthFacebookRoutes = () => (
  <Switch>
    <Route path="/auth/facebook/success/:token" exact component={AuthSuccessPage} />
  </Switch>
);

export default AuthFacebookRoutes;
