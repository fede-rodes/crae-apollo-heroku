const each = require('lodash/each');
const extend = require('lodash/extend');
const isEmpty = require('lodash/isEmpty');
const { Author } = require('../../../../models');

const author = (root, args) => {
  // In case firstName or lastName is '', just remove field from the query
  // in order to avoid empty results.
  const query = {};
  each(['firstName', 'lastName'], (fieldName) => {
    if (args[fieldName] && args[fieldName].trim().length > 0) {
      extend(query, { [fieldName]: args[fieldName].trim() });
    }
  });

  return !isEmpty(query) ? Author.findOne(query) : null;
};

module.exports = author;
