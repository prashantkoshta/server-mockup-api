#!/usr/bin/env node
import minimist, { ParsedArgs } from 'minimist';
import ServerMockApi from '../server/server-mock-api';
const argv: ParsedArgs = minimist(process.argv.slice(2));
if(!argv) {
	throw Error('Invalid argument value. --port --db --routes --delayInResponse');
	process.exit(1);
} else {
	new ServerMockApi(argv.port || 6100, argv.db || './mock-json/db', argv.routes|| './mock-json/routes', argv.dealyInResponse || 0);
}
