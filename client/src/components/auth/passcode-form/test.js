import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import PasscodeForm from '.';

describe('PasscodeForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PasscodeForm />, div);
  });

  it('renders Submit if not button label is provided', () => {
    const wrapper = shallow(<PasscodeForm />);
    expect(wrapper.find({ type: 'submit' }).children().text()).toBe('Submit');
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<PasscodeForm btnLabel="Some label" />);
    expect(wrapper.find({ type: 'submit' }).children().text()).toBe('Some label');
  });

  it('errors when form is submitted without passcode', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(<PasscodeForm onClientErrorHook={handleClientError} />);

    expect(wrapper.find({ id: 'passcode' }).props().value).toBe('');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.find({ id: 'passcode' }).props().error).toEqual(true);
    expect(wrapper.find({ id: 'passcode' }).props().helperText).toMatch(/is required/);
    expect(handleClientError).toBeCalled();
  });

  // it('errors when form is submitted with invalid passcode length', () => {
  //   const handleClientError = jest.fn();
  //   const wrapper = shallow(<PasscodeForm onClientErrorHook={handleClientError} />);

  //   expect(wrapper.find({ id: 'passcode' }).props().value).toBe('');

  //   wrapper.find({ id: 'passcode' }).simulate('change', { target: { id: 'passcode', value: 'invalid@email' } });
  //   wrapper.find('form').simulate('submit', { preventDefault: () => {} });

  //   expect(wrapper.find({ id: 'passcode' }).props().error).toEqual(true);
  //   expect(wrapper.find({ id: 'passcode' }).props().helperText).toMatch(/valid/);
  //   expect(handleClientError).toBeCalled();
  // });

  it('clears errors when passcode input field is modified after error', () => {
    const handleClientError = jest.fn();
    const wrapper = shallow(<PasscodeForm onClientErrorHook={handleClientError} />);

    expect(wrapper.find({ id: 'passcode' }).props().value).toBe('');

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(wrapper.find({ id: 'passcode' }).props().error).toEqual(true);
    expect(wrapper.find({ id: 'passcode' }).props().helperText).toMatch(/is required/);
    expect(handleClientError).toBeCalled();

    wrapper.find({ id: 'passcode' }).simulate('change', { target: { id: 'passcode', value: 'bla' } });

    expect(wrapper.find({ id: 'passcode' }).props().error).toEqual(false);
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <PasscodeForm
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    expect(wrapper.find({ id: 'passcode' }).props().value).toBe('');

    wrapper.find({ id: 'passcode' }).simulate('change', { target: { id: 'passcode', value: '123456' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('calls onSuccessHook when valid passcode and onBeforeHook doesn\'t throw', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <PasscodeForm
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    expect(wrapper.find({ id: 'passcode' }).props().value).toBe('');

    wrapper.find({ id: 'passcode' }).simulate('change', { target: { id: 'passcode', value: '123456' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({ passcode: '123456' }),
    );
  });
});
