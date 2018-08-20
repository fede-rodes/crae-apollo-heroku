import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from './graphql/user/fragment/user';
import { ScrollToTop, LoggedInRoute } from './components/route-wrappers';
import LoginPage from './pages/login-page';
import HomePage from './pages/home-page';
import NotFoundPage from './pages/not-found-page';

const Routes = props => (
  <ScrollToTop>
    <Switch>
      {/* HOME */}
      <LoggedInRoute
        exact
        path="/"
        component={HomePage}
        overlay={LoginPage}
        {...props}
      />
      {/* NOT FOUND */}
      <Route
        component={NotFoundPage}
      />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
