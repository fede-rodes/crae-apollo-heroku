import React from 'react';
import PropTypes from 'prop-types';

class AuthorForm extends React.Component {
  state = {
    firstName: '',
    lastName: '',
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
      <form onSubmit={this.handleSubmit}>
        <input
          name="firstName"
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={this.handleChange}
        />
        <input
          name="lastName"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={this.handleChange}
        />
        <button
          type="submit"
        >
          Submit
        </button>
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
