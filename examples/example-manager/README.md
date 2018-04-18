# Example Manager

The manager shows the board and handles the reporting submitted
by `reflow-reporter`.

The manager is basically an express server that uses both `reflow-circuit`
and `reflow-board` express middlewares.

# Getting started
To get the manager started, you need to do the following simple steps

## Create a `config.json` file

The configs are loaded from a `config.json` file located in the root of this
project. For development, you can copy the `config.example.json` file.

```sh
$ cp config.example.json config.json
```


## Start connection
You only need to setup one connection as a preferred database storage based on what suites your project.

### Cassandra
This step is not required if you have a cassandra cluster running.


### Elasticsearch
This step is not required if you have an already running elasicsearch cluster.
Here we use `docker` to run a containarized elasticsearch cluster.

```
$ docker-compose up
```

## Install Dependencies

```
$ npm install
```

_For contributors, this step should be done with lerna for linking packages._

## Run the setup

You need to setup elasticsearch cluster before starting. This step is required
to be ran only once for the lifetime of the project.

```
$ npm run setup
```

## Launch the Manager!

Launch the manager and head straight to your browser to see the board!

```
$ npm run start
```
