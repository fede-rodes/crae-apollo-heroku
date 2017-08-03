## Create-React-App-Apollo-Express-MongoDB boilerplate ready to be deployed to Heroku
The current branch, mongo, is an extension of the master branch that incorporates MongoDB support using mongoose for easier collection manipulation. Additionally, we split the schema definition using .graphql file extension.

Please, read the following articles to understand the new code:
1. https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
2. https://caveofcode.com/2016/10/apollo-server-using-the-graphql-schema-language/
3. https://caveofcode.com/2016/11/the-connector-and-model-layer-in-your-graphql-apollo-server/

Here you can find the mongo-branch-app deployed to heroku: https://crae-apollo-mongo-heroku.herokuapp.com/

### Getting started, run the app locally in dev mode
Before cloning the project, go to [mLab](http://mlab.com/) and create a sandbox MongoDB instance (it's FREE). Then go to the Users tab in your mLab-sandbox-MongoDB-instance-dashboard and click on the 'add a database user' button; set username and password. Remember those values, we'll need it in a few minutes!

Next steps: clone the 'mongo' branch from this project, connect the app with your recently created MongoDB sandbox instance, install project dependencies, and run the app locally.
```
git clone https://github.com/fede-rodes/crae-apollo-heroku.git crae-apollo-mongo-heroku --branch mongo --single-branch
cd crae-apollo-mongo-heroku
set your mLab mongoDB sandbox instance credentials in /server/.env
yarn install && yarn start
```
When running the app locally, there will be two servers running simultaneously: one for serving the create-react-app (CRA) and another one for the express app. The CRA app should be accessible via http://localhost:3000/, and the express app via http://localhost:3001/. Graphiql should be running on http://localhost:3001/graphiql (only accessible in dev mode).

### Run the app locally in production mode
Clone the 'mongo' branch from this project, connect the app with the MongoDB sandbox instance, install dependencies, build the project and run the 'heroku local' command. This will launch the app on http://localhost:5000 (the port is set by heroku and, as far as I understand, it can't be changed). During the build process the CRA is converted into a static asset and injected into the express app, in this way, there will be only one server running (the one hosting the express app).
```
git clone https://github.com/fede-rodes/crae-apollo-heroku.git crae-apollo-mongo-heroku --branch mongo --single-branch
cd crae-apollo-mongo-heroku
set your mLab mongoDB sandbox instance credentials in /server/.env as described above
yarn install && yarn build
heroku local
```

### Deploy to heroku
Clone the 'mongo' branch from this project, connect the app with the MongoDB sandbox instance, choose a name for your app, set your REACT_APP_GRAPHQL_URI env variable (this is the location of the GraphQL endpoint that depends on you app's name), and deploy the code to heroku. Similar to the previous case, when the app is deployed to heroku, the CRA is converted into a static asset during the build process and injected into the express app, ie, there will be only one server running; the port is randomly chosen by heroku and, as far as I understand, this behavior cannot be changed.
```
git clone https://github.com/fede-rodes/crae-apollo-heroku.git crae-apollo-mongo-heroku --branch mongo --single-branch
cd crae-apollo-mongo-heroku
set your mLab mongoDB sandbox instance credentials in /server/.env as described above
heroku login (enter your credentials)
heroku create <YOUR_APP_NAME>
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn
heroku config:set REACT_APP_GRAPHQL_URI=https://<YOUR_APP_NAME>.herokuapp.com/graphql
git push heroku mongo:master
heroku open
```

### Last comments
Be aware that, sometimes, you need to refresh the page after you deploy some changes; there must be some caching problem somewhere!
