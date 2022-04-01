#!/usr/bin/env node
import minimist, { ParsedArgs } from 'minimist';
import ServerMockApi from '../server/server-mock-api';
const argv: ParsedArgs = minimist(process.argv.slice(2));
if(!argv) {
	throw Error('Invalid argument value. --port --db --routes --delayInResponse --enableHttps --cert --key');
	process.exit(1);
} else {
	if(argv.enableHttps) {
		if(!argv.cert) throw Error('Privide certificate file path.');
		if(!argv.key) throw Error('Privide key file path.');
	}
	new ServerMockApi(argv.port || 6100, argv.db || './mock-json/db', argv.routes|| './mock-json/routes', argv.dealyInResponse || 0, argv.enableHttps || false, argv.cert || null, argv.key || null);
}
