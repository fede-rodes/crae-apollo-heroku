import casual from 'casual';
import _ from 'lodash';
import { Author, Post } from './models';

// Populate DB.
const fixtures = () => {
  casual.seed(11);

  _.times(10, () => (
    new Author({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).save().then(author => (
      new Post({
        authorId: author._id, // eslint-disable-line
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      }).save()
    ))
  ));
};

export default fixtures;
