<p align="center">
  <img alt="reflow logo" src="https://github.com/Bamieh/reflow/raw/master/reflow.png?v=1" width="230" height="80" />
</p>

<p align="center">
  The Framework for Complete Automated E2E Testing.
</p>

<p align="center">
  <a href="https://codecov.io/gh/Bamieh/reflow"><img alt="Coverage Status" src="https://codecov.io/gh/Bamieh/reflow/branch/master/graph/badge.svg?maxAge=43200"></a>
  <a href="https://codeclimate.com/github/Bamieh/reflow/maintainability"><img src="https://api.codeclimate.com/v1/badges/28111714f1d4d3e08279/maintainability" /></a>
  <a href="https://lernajs.io/"><img alt="Maintained with Lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg"></a>
</p>

## Intro

> This Framework is still in its early stages of active development.

Reflow is a framework to writing e2e tests for enterprise projects. Huge efforts and time are being committed on this project to bring it to maturity. Currently, the only way to use this project is to dig into the code and the `README` files of each package.

The Main testing tool `reflow|core` is built on top of [Mocha](https://github.com/mochajs/mocha) ❤️.

## Getting Started

```
$ npm install
$ npm run lerna:bootstrap
```

### Reflow Architecture

<p align="center">
  <a href="#reflow-architecture">
    <img alt="reflow architecture" src="https://github.com/Bamieh/reflow/raw/master/reflow_arch.png?v=1" />
  </a>
</p>

### Components

Reflow is made to work at scale. Each individual component of the framework is designed to work in a distributed environment and scale individually.

Board:
- reflow|board: a board to display e2e projects, jobs, flows, and test results.

Hub:
- reflow|grid: connects and manages devices. currently uses selenium hub.

Client Nodes:
- reflow|appium: a wrapper around appium to discover and connect iOS and android devices to reflow|grid.

Storage:
- reflow|cassandra-connection: express middleware to persist test results to Cassandra.

Circuit:
- reflow|circuit: an express middleware providing graphQL api to query and save test results.

E2E Project:
- reflow|core: a wrapper on top of mocha, connects to the client, provides test flows, and manages multi-flows to run across devices or in multi-threads.
- reflow|reporter: a custom mocha reporter for running projects.
- reflow|page-objects: manage page objects in e2e projects.
- reflow|cli: the command line interface to run the e2e project.
- reflow|client: provides the client api of the connected device.


## License

[MIT](LICENSE)
