# server-mockup-api

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
server-mockup-api --port=8081 --db=./mock-json/db --routes=./mock-json/routes --delayInResponse=0 --middlewares='./../../middlewares/sample-middleware1,./../../middlewares/sample-middleware2'
```
OR
To enable https

```bash
server-mockup-api --port=8081 --db=./mock-json/db --routes=./mock-json/routes --delayInResponse=0  --enableHttps=true --cert=./RootCA.cert --key=./RootCA.key --middlewares='./../../middlewares/sample-middleware1,./../../middlewares/sample-middleware2'
```

Where

- **port**: Application running port number.
- **db**: Directory path where all response json file saved.
- **routes**: Directory path where all api endpoit routes json file saved.
- **middlewares**: Middleware extension ability

It is extension on top of [JSON-SERVER](https://www.npmjs.com/package/json-server)

## Version History

- = 0.0.6 Support http
- >= 0.0.7 Adeed https feature
- >= 0.0.8 Added suppport for middleware chaining

## Demo Application

[server-mockup-api-demo](https://github.com/prashantkoshta/server-mockup-api-demo#readme)

[![Analytics](https://ga-beacon.appspot.com/G-ZFJEZW08DP/chromeskel_a/readme)](https://www.npmjs.com/package/server-mockup-api)