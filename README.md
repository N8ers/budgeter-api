# budgeter-api

## Setup

### Create needed databases

Create two postgres databasaes, one named `budgeter` and `budgeter_test`.
`budgeter` will be the development database, `budgeter_test` will be used by jest.
They need to be seperated because jest will migrate the db all the way down, and backup again.
Meaning all data will be blown away each time you run tests.

### Setup database configs

Explain how the config package works....

### Migrate database

You will need to update your new `budgeter` database to match the latest migration.
This can be done my running `npm run migrate up`.
`npm run migrate up`
`npm run migrate down`

`budgeter-api` relies heavily on the following dependencies.
[pg](https://www.npmjs.com/package/pg)
[pgm](https://www.npmjs.com/package/node-pg-migrate)
[config](https://www.npmjs.com/package/config)
[joi](https://www.npmjs.com/package/joi)
