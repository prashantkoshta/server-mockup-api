# server-mockup-api

## Description

To get full fake REST API with no efforts. Add/Modify API endpoint and response through JSON file.

## Installation

```bash
npm i server-mockup-api
```

OR

```bash
yarn add server-mockup-api
```

## Run server-mockup-api

```bash
server-mockup-api --port=8081 --db=./mock-json/db --routes=./mock-json/routes --delayInResponse=0
```

Where

- **port**: Application running port number.
- **db**: Directory path where all response json file saved.
- **routes**: Directory path where all api endpoit routes json file saved.

It is extension on top of [JSON-SERVER](https://www.npmjs.com/package/json-server)