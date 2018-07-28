# Node - Express - Mongoose - GraphQL (Apollo) - Create React App boilerplate ready to be deployed to Heroku

This project is the result of putting together some really nice articles ([see](#further-reading)) to create a dead simple Node - Express - Mongoose - GraphQL (Apollo) - Create React App boilerplate. The app is deployed to Heroku:
[https://crae-apollo-heroku.herokuapp.com/](https://crae-apollo-heroku.herokuapp.com/)

This project includes the following libraries/functionality
- Express
- Apollo 2
- React 16
- ES6 syntax
- material-ui
- styled components
- jest
- basscss
- service workers

## Setup MongoDB provider
Before doing anything, we need to setup a Mongo provider to hold our database for us. I'll describe two ways of doing this; choose the one you like the most.

### Install Mongo locally
The first approach is to install Mongo locally. In order to so, go to [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/) and follow the instructions based on your operating system. After that, open a new terminal and start the mongo service; in my case, I'm on Ubuntu, so I run ```sudo service mongod start```. This will start the Mongo service in the background on port 27017.

### Get a Sandbox Mongo instance on mLab
The second option is to create a FREE database hosted on mLab and then connect your application to the remote instance. To do so, go to [mLab](http://mlab.com/) and create a sandbox Mongo instance. Then, go to the Users tab in your mLab-sandbox-MongoDB-instance-dashboard and click on the 'add a database user' button; setup username and password. Remember those values, we'll need them shortly!

## Running the app locally in dev mode
Once we have our Mongo provider, these are the next steps that we need to follow to run the app locally in dev mode:

1. Clone the project and move to the project's folder
```
>> git clone https://github.com/fede-rodes/crae-apollo-heroku.git
>> cd crae-apollo-heroku
```

2. Setup your MONGO_URL env variable to connect the app with your recently created Mongo instance. In order to do so, first create a .env file in your root directory by copying the content of the provided .sample.env file. Then, setup the MONGO_URL env variable to connect to your mongoDB instance. In case you are using mLab, remember to use your credentials. In case your are running mongo locally, you can use the default value for MONGO_URL.

3. Install project dependencies, and run the app locally.
```
>> yarn install
>> yarn start
```
The app should be running on port 3000 --> http://localhost:3000

Please notice, when running the app locally, there will be two servers running simultaneously: one for serving the create-react-app (CRA) and another one for the Express app. The CRA should be accessible via [http://localhost:3000/](http://localhost:3000/), and the Express app via [http://localhost:3001/](http://localhost:3001/). The GraphQL playground should be running on [http://localhost:3001/graphql](http://localhost:3001/graphql) (only accessible in dev mode).

## Running the app locally in production mode
1. Follow the steps above to setup your Mongo service.

2. Install heroku cli: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

3. Clone the project and move to the project's folder
```
>> git clone https://github.com/fede-rodes/crae-apollo-heroku.git
>> cd crae-apollo-heroku
```

4. Setup your MONGO_URL env variable as describe above.

5. Install dependencies and run the app locally in production mode.
```
>> yarn install && yarn build
>> heroku local
```
This should launch the app on port 5000 --> http://localhost:5000. As far as I understand, the port (process.env.PORT) is setup by heroku and can't be changed.

Please notice, during the build process the CRA is converted into a static asset and injected into the Express app, in this way, there will be only one server running (the one hosting the Express app).

## Deploy to heroku
1. Follow the steps above to setup a Mongo service on mLab.

2. Install heroku cli: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

3. Clone the project and move to the project's folder
```
>> git clone https://github.com/fede-rodes/crae-apollo-heroku.git
>> cd crae-apollo-heroku
```

4. Initiate Heroku cli and create a new app
```
>> heroku login (enter your credentials)
>> heroku create <YOUR_APP_NAME>
```

5. Install buildpacks (probably not necessary if you don't use yarn) and set MONGO_URL env variable.
```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn
heroku config:set MONGO_URL=mongodb://<dbuser>:<dbpassword>@<something>.mlab.com:<port>/<dbname>
```
TODO: we should been able to define .env.production and make Heroku to pick the env variables from there.

6. Push the code to Heroku.
```
>> git push heroku master
```

Comment: if you want to deploy from a branch different than master run:
```
>> git push heroku <BRANCH_NAME>:master
```

Please notice, similar to the previous case, when the app is deployed to heroku, the CRA is converted into a static asset during the build process and injected into the Express app, ie, there will be only one server running; the port is randomly chosen by heroku and, as far as I understand, this behavior cannot be changed.

## Further reading
1. https://originmaster.com/running-create-react-app-and-express-crae-on-heroku-c39a39fe7851
2. https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b
3. https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928
4. https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15
5. https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
6. https://caveofcode.com/2016/10/apollo-server-using-the-graphql-schema-language/
7. https://caveofcode.com/2016/11/the-connector-and-model-layer-in-your-graphql-apollo-server/
8. https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
