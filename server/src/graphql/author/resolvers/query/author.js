const isEmpty = require('lodash/isEmpty');
const { Author } = require('../../../../models');

const author = async (root, args) => {
  const fields = ['firstName', 'lastName'];

  // In case firstName or lastName is '', just remove field from the query
  // in order to avoid empty results.
  const query = {};
  fields.forEach((fieldName) => {
    const fieldValue = args[fieldName] ? args[fieldName].trim() : '';
    if (fieldValue.length > 0) {
      query[fieldName] = fieldValue;
    }
  });

  if (isEmpty(query)) {
    return null;
  }

  try {
    return await Author.findOne(query);
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = author;
