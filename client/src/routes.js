import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { withUser } from './global-data-provider';
import userFragment from './graphql/user/fragment/user';
import { ScrollToTop, LoggedInRoute } from './components/route-wrappers';
import HomePage from './pages/home-page';
import NotFoundPage from './pages/not-found-page';

const Routes = props => (
  <ScrollToTop>
    <Switch>
      <LoggedInRoute path="/" exact component={HomePage} {...props} />
      <Route component={NotFoundPage} />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null,
};

export default withUser(Routes);
