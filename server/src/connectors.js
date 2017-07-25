import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

casual.seed(11);
db.sync({ force: true }).then(() => {
  _.times(10, () => (
    AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then(author => (
      author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      })
    ))
  ));
});

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post };
