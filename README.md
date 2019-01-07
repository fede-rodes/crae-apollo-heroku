[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web) [![Greenkeeper badge](https://badges.greenkeeper.io/fede-rodes/crae-apollo-heroku.svg)](https://greenkeeper.io/) [![Maintainability](https://api.codeclimate.com/v1/badges/5129dc03085d3d84c537/maintainability)](https://codeclimate.com/github/fede-rodes/crae-apollo-heroku/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5129dc03085d3d84c537/test_coverage)](https://codeclimate.com/github/fede-rodes/crae-apollo-heroku/test_coverage)

# Node - Express - Mongoose - GraphQL (Apollo) - Create React App boilerplate ready to be deployed to Heroku

This project is the result of putting together some really nice articles ([see](#further-reading)) to create a dead simple Node - Express - Mongoose - GraphQL (Apollo) - Create React App boilerplate. The app is deployed to Heroku:
[https://crae-apollo-heroku.herokuapp.com/](https://crae-apollo-heroku.herokuapp.com/)

This project includes the following libraries/functionality
- React 16 (Create React App)
- Apollo 2
- Express
- Mongoose
- Authentication: passwordless via JWT
- ES6 syntax
- service workers

Testing:
- Apollo Client Mock
- jest
- enzyme
- storybook
- storyshots

Styling:
- material-ui
- styled-components
- storybook
- basscss

## Step by step guide to get started with this boilerplate

### 1. Setup MongoDB provider
Before doing anything, we need to setup a Mongo provider to hold our database for us. I'll describe two ways of doing this; choose the one you like the most.

#### Install Mongo locally
The first approach is to install Mongo locally. In order to so, go to [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/) and follow the instructions based on your operating system. After that, open a new terminal and start the mongo service; in my case, I'm on Ubuntu, so I run ```sudo service mongod start```. This will start the Mongo service in the background on port 27017.

#### Get a Sandbox Mongo instance on mLab
The second option is to create a FREE database hosted on mLab and then connect your application to the remote instance. To do so, go to [mLab](http://mlab.com/) and create a sandbox Mongo instance. Then, go to the Users tab in your mLab-sandbox-MongoDB-instance-dashboard and click on the 'add a database user' button; setup username and password. Remember those values, we'll need them shortly!

### 2. Create your .env files:
Inside both 'server' and 'client' folders there is a .sample.env file. Create a new file called ```.env``` based on the provided ```.sample.env```.

### 3. Register the app on Mailgun:
Mailgun allows you to send emails from your app.

In order to get started, first access your [Mailgun](https://www.mailgun.com/) account. Then, grab your sandbox domain smtp username and password and copy said values into your /server/.env file. Finally, add your email address to the list of [Auhtorized Recipients](https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients).

### 4. Setup Push Notifications Service
1. create a new file called ```manifest.json``` based on the provided ```manifest.sample.json``` (see ```/public``` folder).
2. get your Google Cloud Message (GCM) server key and sender id from Firebase as follows:
  * first, got to your Firebase account: https://console.firebase.google.com/;
  * click on 'Add project';
  * click on 'settings' ('gear' icon, top left);
  * move to the 'CLOUD MESSAGING' tab at the top;
  * you should be able to see both server key and sender id;
3. copy your sender id to your manifest.json and your server key to GCM_PRIVATE_KEY (/server/.env);
4. open a terminal and install 'web-push' globally: ```sudo npm i -g web-push```;
5. generate VAPID keys: ```web-push generate-vapid-keys --json```;
6. copy-paste your VAPID keys into your VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY (/server/.env) and REACT_APP_VAPID_PUBLIC_KEY (/client/.env);

### 5. Running the app locally in dev mode
Once we have our Mongo provider, these are the next steps that we need to follow to run the app locally in dev mode:

1. Clone the project and move to the project's folder
```
>> git clone https://github.com/fede-rodes/crae-apollo-heroku.git
>> cd crae-apollo-heroku
```

2. Setup your MONGO_URL env variable inside /server/.env to connect the app with your recently created Mongo instance. In case you are using mLab, remember to use your credentials. In case your are running mongo locally, you can use the default value for MONGO_URL.

3. Install project dependencies, and run the app locally.
```
>> yarn install
>> yarn start
```
The app should be running on port 3000 --> http://localhost:3000

Please notice, when running the app locally, there will be two servers running simultaneously: one for serving the create-react-app (CRA) and another one for the Express app. The CRA should be accessible via [http://localhost:3000/](http://localhost:3000/), and the Express app via [http://localhost:3001/](http://localhost:3001/). The GraphQL playground should be running on [http://localhost:3001/graphql](http://localhost:3001/graphql) (only accessible in dev mode).

### 6. Running the app locally in production mode
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

### 7. Deploy to heroku
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

6. Push the code to Heroku.
```
>> git push heroku master
```

Comment: if you want to deploy from a branch different than master run:
```
>> git push heroku <BRANCH_NAME>:master
```

Please notice, similar to the previous case, when the app is deployed to heroku, the CRA is converted into a static asset during the build process and injected into the Express app, ie, there will be only one server running; the port is randomly chosen by heroku and, as far as I understand, this behavior cannot be changed.

### 8. Heroku deploy troubleshooting

In case your build fails with an error ```/bin/sh: 1: <SOME-DEP>: not found``` and you are building the project with yarn, try setting the following env variable:
```
heroku config:set NPM_CONFIG_PRODUCTION=false
```

## Further reading

### GraphQL / Apollo
- https://www.apollographql.com/docs
- https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b
- https://dev-blog.apollodata.com/react-graphql-tutorial-part-2-server-99d0528c7928
- https://dev-blog.apollodata.com/react-graphql-tutorial-mutations-764d7ec23c15
- https://dev-blog.apollodata.com/tutorial-building-a-graphql-server-cddaa023c035
- https://caveofcode.com/2016/10/apollo-server-using-the-graphql-schema-language/
- https://caveofcode.com/2016/11/the-connector-and-model-layer-in-your-graphql-apollo-server/
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
- https://www.robinwieruch.de
- https://codewithmosh.com/p/the-complete-node-js-course

### Progressive Web Apps / Service Workers
- https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12
- https://dzone.com/articles/introduction-to-progressive-web-apps-offline-first
- https://dzone.com/articles/introduction-to-progressive-web-apps-instant-loadi
- https://dzone.com/articles/introduction-to-progressive-web-apps-push-notifica
- https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0
- https://www.made-on-mars.com/blog/how-to-pwa-an-introduction-on-progressive-web-app-and-a-tutorial-to-create-one-with-full-features-push-notification-service-worker-offline-mode/
- https://jakearchibald.com/2014/offline-cookbook/
- https://youtu.be/cmGr0RszHc8
- https://classroom.udacity.com/courses/ud899
- https://developers.google.com/web/fundamentals/codelabs/push-notifications/
- https://dzone.com/articles/web-push-notifications-1
- https://medium.com/@firt/pwas-are-coming-to-ios-11-3-cupertino-we-have-a-problem-2ff49fd7d6ea
- https://serviceworke.rs
- https://ada.is/progressive-web-apps-talk/
- https://web-push-book.gauntface.com
- https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
- https://developers.google.com/web/fundamentals/app-install-banners/?hl=en#deferring_or_cancelling_the_prompt
- https://developers.google.com/web/tools/workbox/

### PWA off-line support
- https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c
- https://codelabs.developers.google.com/codelabs/your-first-pwapp/#1
- https://googlechrome.github.io/samples/service-worker/custom-offline-page/index.html

### Service Workers Scripts
- https://github.com/mozilla/serviceworker-cookbook
- https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker
- https://github.com/jakearchibald/isserviceworkerready/tree/gh-pages/demos
- https://github.com/NitroBAY/meteor-service-worker
- https://github.com/saurshaz/pwa-meteor/blob/master/client/serviceWorker.js

### styled-components
- https://youtu.be/qu4U7lwZTRI


### React / Render Props
- https://www.youtube.com/watch?v=BcVAq3YFiuc

### Deployment / Heroku
- https://originmaster.com/running-create-react-app-and-express-crae-on-heroku-c39a39fe7851

### Testing on real devices
- https://developers.google.com/web/tools/chrome-devtools/remote-debugging/?hl=en