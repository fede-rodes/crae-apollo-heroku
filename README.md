## Create-React-App-Apollo-Express-SQL boilerplate ready to be deploy to Heroku
This project is the result of putting together the following really nice articles (thanks!):

1. https://originmaster.com/running-create-react-app-and-express-crae-on-heroku-c39a39fe7851
2. https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b
3. https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928
4. https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15

This helped me to setup a dead-simple create-react-app + apollo + express boilerplate and deploy it to heroku: https://crae-apollo-heroku.herokuapp.com/

### Updates of the mongo branch
The master branch of this project contains the simplest version of this app with the features described in the articles above. For the current branch, mongo, we added MongoDB as our database using mongoose plus split the schema definition using .graphql file extension.

Please, read the following articles to understand the changes:
1. https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
2. https://caveofcode.com/2016/10/apollo-server-using-the-graphql-schema-language/
3. https://caveofcode.com/2016/11/the-connector-and-model-layer-in-your-graphql-apollo-server/

### Getting started, run the app locally in dev mode
Clone the project, install dependencies and run the app locally.
```
git clone https://github.com/fede-rodes/crae-apollo-heroku.git
cd crae-apollo-heroku
yarn install && yarn start
```
When running the app locally, there will be two servers running simultaneously: one for serving the create-react-app (CRA) and another one for the express app. The CRA app should be accessible via http://localhost:3000/, and the express app via http://localhost:3001/. Graphiql should be running on http://localhost:3001/graphiql (only accessible in dev mode).

### Run the app locally in production mode
Clone the project, install dependencies, build the project and run the 'heroku local' command. This will launch the app on http://localhost:5000 (the port is set by heroku and, as far as I understand, it can't be changed). During the build process the CRA is converted into a static asset and injected into the express app, in this way, there will be only one server running (the one hosting the express app).
```
git clone https://github.com/fede-rodes/crae-apollo-heroku.git
cd crae-apollo-heroku
yarn install && yarn build
heroku local
```

### Deploy to heroku
Clone the project, choose a name for your app, set your REACT_APP_GRAPHQL_URI env variable (this is the location of the GraphQL enpoint that depends on you app's name), and deploy the code to heroku. Similar to the previous case, when the app is deployed to heroku, the CRA is converted into a static asset during the build process and injected into the express app, ie, there will be only one server running; the port is randomly chosen by heroku and, as far as I understand, this behavior cannot be changed.
```
git clone https://github.com/fede-rodes/crae-apollo-heroku.git
cd crae-apollo-heroku
heroku login (enter your credentials)
heroku create <YOUR_APP_NAME>
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn
heroku config:set REACT_APP_GRAPHQL_URI=https://<YOUR_APP_NAME>.herokuapp.com/graphql
git push heroku master
heroku open
```

### Last comments
Be aware that, sometimes, you need to refresh the page after you deploy some changes; there must be some caching problem somewhere!
