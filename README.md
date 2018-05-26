# Amy's Timesheet Calculator

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# build docker container
npm run docker-build

# run docker container
npm run docker

# push docker image to docker hub
# replace enigmacurry with your login name
docker login
docker tag atc:latest enigmacurry/atc:latest
docker push enigmacurry/atc:latest
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
