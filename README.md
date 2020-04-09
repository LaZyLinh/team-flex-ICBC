# Team Flex

## Dependencies
- React
- Node.js
- MySQL

## [REST API](https://gitlab.com/cpsc319-2019w2/icbc/team-flex/team-flex/-/blob/master/shared/api/openapi.yaml)

## Setup

### Frontend
- `npm install` to install all dependencies
- `npm start` to start the React app
- `npm run win-start` to start the React app locally at http://localhost:3000 hooked up to AWS backend https://icbcflexwork.me
- `npm run local-start` to start the React app locally at http://localhost:3000 hooked up to local backend https://localhost:8080

### Backend
- `npm install` to install all dependencies
- `npm start` to start the Express server
- accessible on https://localhost:8080/
- `npm test` to run tests in /test
- Probably requires `npm i -g mocha` (i.e. Mocha installed globally)
- `npm run gen` to create up-to-date .sql script at /sql/generated/insert_data.sql (5000 employees & workspaces, 1000 availabilities & bookings)
- documentation file is statically at X:8080/api.html
- X:8080/version tells you what version is deployed
- X:8080/admin/latest-error tells you what the single most recent HTTP status 400/500 response was

### Shared
- shared/api contains the latest openapi.yaml specification along with info on how to update it
- shared/flexwork-common is the source for [some functions in an NPM package. Click it for info.](https://www.npmjs.com/package/flexwork-common)
