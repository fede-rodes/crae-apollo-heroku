import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { PWABtnProps, FormProps } from '../../render-props';
import { withUser } from '../../global-data-provider';
import userFragment from '../../graphql/user/fragment/user';
import LogoutBtn from '../../components/auth/logout-btn';
import SubscribeBtn from '../../components/pwa/subscribe-btn';
import UnsubscribeBtn from '../../components/pwa/unsubscribe-btn';
import PushBtn from '../../components/pwa/push-btn';
import Title from '../../components/common/title';
import Feedback from '../../components/common/feedback';
import Alert from '../../components/common/alert';
import Loading from '../../components/common/loading';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Json = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ curUser }) => (
  <div>
    <Title>Home Page</Title>
    <div className="mb1" />
    <h3>Current User</h3>
    <Json>
      {JSON.stringify(curUser, null, 2)}
    </Json>
    <div className="mb2" />
    <LogoutBtn />
    <div className="mb2" />
    <PWABtnProps>
      {(pwaBtnProps) => {
        const {
          supported,
          subscribed,
          handleSubscriptionChange,
        } = pwaBtnProps;

        return (
          <FormProps>
            {({
              disabled,
              errorMsg,
              successMsg,
              handleBefore,
              handleClientCancel,
              handleServerError,
              handleSuccess,
            }) => {
              // Display loading indicator while checking for push support
              if (supported === 'loading') {
                return <Loading />;
              }

              // Do not render subscribe and push notification buttons in case
              // notifications aren't supported
              if (!supported) {
                return (
                  <Alert
                    type="error"
                    content="Your browser doesn't support service workers"
                  />
                );
              }

              return (
                <React.Fragment>
                  <p>Enable Push notifications</p>
                  {subscribed ? (
                    <UnsubscribeBtn
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onClientCancelHook={handleClientCancel}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={() => {
                        handleSubscriptionChange({ subscribed: false });
                        handleSuccess();
                      }}
                    />
                  ) : (
                    <SubscribeBtn
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onClientCancelHook={handleClientCancel}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={() => {
                        handleSubscriptionChange({ subscribed: true });
                        handleSuccess();
                      }}
                    />
                  )}
                  <div className="my1" />
                  {subscribed && (
                    <PushBtn
                      disabled={disabled}
                      onBeforeHook={handleBefore}
                      onClientCancelHook={handleClientCancel}
                      onServerErrorHook={handleServerError}
                      onSuccessHook={handleSuccess}
                    />
                  )}
                  <div className="my1" />
                  <Feedback
                    className="mb2"
                    loading={disabled}
                    errorMsg={errorMsg}
                    successMsg={successMsg}
                  />
                </React.Fragment>
              );
            }}
          </FormProps>
        );
      }}
    </PWABtnProps>
  </div>
);

HomePage.propTypes = {
  curUser: propType(userFragment).isRequired,
};

export default withUser(HomePage);
