import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorHandling from 'error-handling-utils';

const { NODE_ENV } = process.env;
const isNotProduction = NODE_ENV !== 'production';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PassCodeAuthView extends React.Component {
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
      errors.passCode.push('Code is required!');
    } else if (_passCode.length !== PASS_CODE_LENGTH) {
      errors.passCode.push(`Pass code length must be ${PASS_CODE_LENGTH} characters long`);
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

    const {
      email,
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

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
    const err1 = this.validateFields({ passCode });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(err1)) {
      this.setState({ errors: err1 });
      onClientErrorHook(err1);
      return;
    }

    const data = {
      method: 'post',
      // TODO: define based on process
      mode: isNotProduction ? 'cors' : 'same-origin', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, passCode }),
    };

    try {
      const res = await fetch('/api/login', data);
      console.log('\nres', res);
      if (res.status !== 200) {
        const resText = await res.text();
        console.log('resText', resText);
        onServerErrorHook({ message: resText });
        return;
      }
      // const json = await res.body.json();
      
      // console.log('\njson', json);
      console.log('\nres.headers', res.headers);
      console.log('\nres.body', res.body);
      console.log('res.headers.entries()', res.headers.entries());
      let token = '';
      for (let pair of res.headers.entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
        if (pair[0] === 'x-auth-token') {
          token = pair[1];
        }
      }
      console.log('\nTOKEN', token);
      this.clearFields();
      onSuccessHook({ token });
    } catch (exc) {
      console.log(exc);
      onServerErrorHook(exc);
    }

    /* Meteor.loginWithPasswordless({ passCode }, (err) => {
      if (err) {
        onServerErrorHook(err);
      } else {
        this.clearFields();
        onSuccessHook();
      }
    }); */
  }

  render() {
    const { btnLabel, disabled } = this.props;
    const { passCode, errors } = this.state;

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
          error={ErrorHandling.getFieldErrors(errors, 'passCode').length > 0}
          helperText={
            ErrorHandling.getFieldErrors(errors, 'passCode').length > 0
              ? ErrorHandling.getFieldErrors(errors, 'passCode')
              : ''
          }
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

PassCodeAuthView.propTypes = {
  email: PropTypes.string.isRequired,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

PassCodeAuthView.defaultProps = {
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default PassCodeAuthView;
