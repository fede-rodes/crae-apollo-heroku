import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AuthorForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    // TODO: add errors field
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    const { firstName, lastName } = this.state;
    // TODO: disable btn on submit
    // TODO: validate fields
    // Pass event up to parent component
    const author = { firstName, lastName };
    onSubmit({ author });
  }

  render() {
    const { firstName, lastName } = this.state;

    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        {/* Material-UI example usage */}
        <TextField
          name="firstName"
          type="text"
          label="First name"
          value={firstName}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          name="lastName"
          type="text"
          label="Last name"
          value={lastName}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>
    );
  }
}

AuthorForm.propTypes = {
  onSubmit: PropTypes.func,
};

AuthorForm.defaultProps = {
  onSubmit: () => {},
};

export default AuthorForm;
