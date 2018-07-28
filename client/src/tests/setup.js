const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const toJson = require('enzyme-to-json');

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
const { shallow, render, mount } = Enzyme;

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
