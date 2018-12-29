import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorHandling from 'error-handling-utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// export const PASS_CODE_LENGTH = 6;

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PasscodeForm extends React.Component {
  state = {
    passcode: '',
    errors: { passcode: [] },
  }

  handleChange = ({ target }) => {
    const { errors } = this.state;
    const { id: field, value } = target;

    // Update value and clear errors for the given field
    this.setState({
      [field]: value,
      errors: ErrorHandling.clearErrors(errors, field),
    });
  }

  validateFields = ({ passcode }) => {
    // Initialize errors
    const errors = {
      passcode: [],
    };

    // Sanitize input
    const _passcode = passcode && passcode.trim(); // eslint-disable-line no-underscore-dangle

    if (!_passcode) {
      errors.passcode.push('Pass code is required!');
    } /* else if (_passcode.length !== PASS_CODE_LENGTH) {
      errors.passcode.push(`Pass code must be ${PASS_CODE_LENGTH} characters long`);
    } */

    return errors;
  }

  clearErrors = () => {
    this.setState({ errors: { passcode: [] } });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const {
      onBeforeHook,
      onClientErrorHook,
      onClientCancelHook,
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
    const { passcode } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ passcode });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      onClientErrorHook(errors);
      return;
    }

    // Pass event up to parent component
    onSuccessHook({ passcode });
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { passcode, errors } = this.state;

    const passcodeErrors = ErrorHandling.getFieldErrors(errors, 'passcode');

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="passcode"
          type="text"
          label="Pass Code"
          value={passcode}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          error={passcodeErrors.length > 0}
          helperText={passcodeErrors || ''}
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

PasscodeForm.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

PasscodeForm.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default PasscodeForm;
