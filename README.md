### Get started
1- git clone https://github.com/fede-rodes/crae2.git
2- cd crae2
3- yarn install
4- run the app locally: yarn start
5- yarn build
6- run the app locally in production mode: heroku local
7- heroku login
8- heroku create my-app-name
9- heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn
10- git push heroku master
11- heroku open

### Changes
Every time you make a change to the code, run:
1- yarn run clean (to clean node_modules and build folders)
2- yarn install
3- yarn build
4- git add .
5- git commit -m "something new"
6- git push heroku master
