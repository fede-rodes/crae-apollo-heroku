import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorHandling from 'error-handling-utils';
import isEmail from 'validator/lib/isEmail';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EmailForm extends React.Component {
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

    // Sanitize input
    const _email = email && email.trim(); // eslint-disable-line no-underscore-dangle

    if (!_email) {
      errors.email.push('Email is required!');
    } else if (!isEmail(_email)) {
      // OBS: max chars is handled by isEmail function
      errors.email.push('Please, provide a valid email address!');
    }

    return errors;
  }

  clearErrors = () => {
    this.setState({ errors: { email: [] } });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const {
      onBeforeHook,
      onClientCancelHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Get field values
    const { email } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ email });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      onClientErrorHook(errors);
      return;
    }

    // Pass event up to parent component
    onSuccessHook({ email });
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
          variant="contained"
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

EmailForm.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

EmailForm.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default EmailForm;
