import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorHandling from 'error-handling-utils';
import isEmail from 'validator/lib/isEmail';
import sendPassCodeMutation from '../../graphql/user/mutation/send-pass-code';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EmailAuthView extends React.Component {
  state = {
    email: '',
    errors: { email: [] },
  }

  handleChange = ({ target }) => {
    const { id: field, value } = target;
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [field]: value,
      errors: ErrorHandling.clearErrors(errors, field),
    });
  }

  validateFields = ({ email }) => {
    // Initialize errors
    const errors = {
      email: [],
    };

    const MAX_CHARS = 155;

    // Sanitize input
    const _email = email && email.trim(); // eslint-disable-line no-underscore-dangle

    if (!_email) {
      errors.email.push('Email is required!');
    } else if (!isEmail(_email)) {
      errors.email.push('Please, provide a valid email address!');
    } else if (_email.length > MAX_CHARS) {
      errors.email.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    return errors;
  }

  clearFields = () => {
    this.setState({ email: '' });
  }

  clearErrors = () => {
    this.setState({ errors: { email: [] } });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSuccessHook,
      sendPassCode,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const { email } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const err1 = this.validateFields({ email });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(err1)) {
      this.setState({ errors: err1 });
      onClientErrorHook(err1);
      return;
    }

    try {
      await sendPassCode({ variables: { email } });
      this.clearFields();
      onSuccessHook({ email });
    } catch (exc) {
      console.log(exc);
      onServerErrorHook(exc);
    }
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { email, errors } = this.state;

    const emailErrors = ErrorHandling.getFieldErrors(errors, 'email');

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          error={emailErrors.length > 0}
          helperText={emailErrors || ''}
        />
        <div className="mb2" />
        <Button
          type="submit"
          variant="raised"
          color="primary"
          fullWidth
          disabled={disabled}
        >
          {btnLabel}
        </Button>
      </form>
    );
  }
}

EmailAuthView.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  sendPassCode: PropTypes.func.isRequired,
};

EmailAuthView.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

// Apollo integration
const withMutation = graphql(sendPassCodeMutation, { name: 'sendPassCode' });

export default withMutation(EmailAuthView);
