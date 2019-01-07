import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import EmailForm from '.';

describe('EmailForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmailForm />, div);
  });

  it('renders Submit if not button label is provided', () => {
    const wrapper = shallow(<EmailForm />);
    expect(wrapper.find({ type: 'submit' }).children().text()).toBe('Submit');
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<EmailForm btnLabel="Some label" />);
    expect(wrapper.find({ type: 'submit' }).children().text()).toBe('Some label');
  });

  it('errors when form is submitted without email', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(<EmailForm onClientErrorHook={handleClientError} />);

    // Sanity check
    expect(wrapper.find({ id: 'email' }).props().value).toBe('');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.find({ id: 'email' }).props().error).toEqual(true);
    expect(wrapper.find({ id: 'email' }).props().helperText).toMatch(/is required/);
    expect(handleClientError).toBeCalled();
  });

  it('errors when form is submitted with invalid email', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(<EmailForm onClientErrorHook={handleClientError} />);

    expect(wrapper.find({ id: 'email' }).props().value).toBe('');

    wrapper.find({ id: 'email' }).simulate('change', { target: { id: 'email', value: 'invalid@email' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.find({ id: 'email' }).props().error).toEqual(true);
    expect(wrapper.find({ id: 'email' }).props().helperText).toMatch(/valid/);
    expect(handleClientError).toBeCalled();
  });

  it('clears errors when email input field is modified after error', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(<EmailForm onClientErrorHook={handleClientError} />);

    expect(wrapper.find({ id: 'email' }).props().value).toBe('');

    wrapper.find({ id: 'email' }).simulate('change', { target: { id: 'email', value: 'invalid@email' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.find({ id: 'email' }).props().error).toEqual(true);
    expect(wrapper.find({ id: 'email' }).props().helperText).toMatch(/valid/);
    expect(handleClientError).toBeCalled();

    wrapper.find({ id: 'email' }).simulate('change', { target: { id: 'email', value: 'other_invalid@email' } });

    expect(wrapper.find({ id: 'email' }).props().error).toEqual(false);
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EmailForm
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    expect(wrapper.find({ id: 'email' }).props().value).toBe('');

    wrapper.find({ id: 'email' }).simulate('change', { target: { id: 'email', value: 'valid@email.com' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('calls onSuccessHook when valid email and onBeforeHook doesn\'t throw', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <EmailForm
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    expect(wrapper.find({ id: 'email' }).props().value).toBe('');

    wrapper.find({ id: 'email' }).simulate('change', { target: { id: 'email', value: 'valid@email.com' } });

    expect(wrapper.state().email).toBe('valid@email.com');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({ email: 'valid@email.com' }),
    );
  });
});
