import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorHandling from 'error-handling-utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PassCodeForm extends React.Component {
  state = {
    passCode: '',
    errors: { passCode: [] },
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

  validateFields = ({ passCode }) => {
    // Initialize errors
    const errors = {
      passCode: [],
    };

    const PASS_CODE_LENGTH = 6;

    // Sanitize input
    const _passCode = passCode && passCode.trim(); // eslint-disable-line no-underscore-dangle

    if (!_passCode) {
      errors.passCode.push('Pass code is required!');
    } else if (_passCode.length !== PASS_CODE_LENGTH) {
      errors.passCode.push(`Pass code must be ${PASS_CODE_LENGTH} characters long`);
    }

    return errors;
  }

  clearFields = () => {
    this.setState({ passCode: '' });
  }

  clearErrors = () => {
    this.setState({ errors: { passCode: [] } });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const { onBeforeHook, onClientErrorHook, onSuccessHook } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const { passCode } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ passCode });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      onClientErrorHook(errors);
      return;
    }

    // Pass event up to parent component
    onSuccessHook({ passCode });
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { passCode, errors } = this.state;

    const passCodeErrors = ErrorHandling.getFieldErrors(errors, 'passCode');

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="passCode"
          type="text"
          label="Pass Code"
          value={passCode}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
          error={passCodeErrors.length > 0}
          helperText={passCodeErrors || ''}
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

PassCodeForm.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

PassCodeForm.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default PassCodeForm;
