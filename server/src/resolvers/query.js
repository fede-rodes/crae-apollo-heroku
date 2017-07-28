import _ from 'lodash';
import { Author } from '../models';

const Query = {
  authors: () => (Author.find({})),
  author: (root, args) => {
    // In case firstName or lastName is '', just remove field from the query
    // in order to avoid empty results.
    const query = {};
    _.each(['firstName', 'lastName'], (fieldName) => {
      if (args[fieldName] && args[fieldName].trim().length > 0) {
        _.extend(query, { [fieldName]: args[fieldName].trim() });
      }
    });

    if (_.isEmpty(query)) {
      return null;
    }
    return Author.findOne(query);
  },
};

export default Query;
