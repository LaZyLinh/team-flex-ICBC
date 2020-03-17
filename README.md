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
- accessible on http://localhost:3000/

### Backend
- `npm install` to install all dependencies
- `npm start` to start the Express server
- `npm test` to run tests in /test
- `npm run gen` to create up-to-date .sql script at /sql/generated/insert_data.sql (5000 employees & workspaces, 1000 availabilities & bookings)
- accessible on http://localhost:8080/
- openapi.yaml spec file is statically at http://localhost:8080/openapi.yaml

### Shared
- shared/api contains the latest openapi.yaml specification along with info on how to update it
- shared/flexwork-common is the source for [some functions in an NPM package. Click it for info.](https://www.npmjs.com/package/flexwork-common)
