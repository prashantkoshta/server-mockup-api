/* eslint-disable @typescript-eslint/no-explicit-any */
import JsonServer from 'json-server';
import { Application } from 'express';
import Utils from './utils';
import { middleware } from './middleware';
import https from 'https';
import fs from 'fs';

export default class ServerMockApi {
	private readonly expressApp: Application;

	constructor(readonly port: number, readonly dbPath: string, readonly routePath: string, readonly dealyInResponse?: number, enableHttps?:boolean, certFilePath?:string, keyFilePath?:string) {
		this.expressApp = JsonServer.create();

		const mergedDBJson:JSON = new Utils().readAllFiles(this.dbPath, JSON.parse('{}'));
		const mergedRoutesJson:any = new Utils().readAllFiles(this.routePath, JSON.parse('{}'));
		const router = JsonServer.router(mergedDBJson);

		this.expressApp.use(JsonServer.rewriter(mergedRoutesJson));
		this.expressApp.use((req, res, next) => {
			setTimeout(next, this.dealyInResponse);
		});
		this.expressApp.use(middleware);
		this.expressApp.use(router);
		
		if(enableHttps && keyFilePath && certFilePath) {
			https.createServer( {
				key: fs.readFileSync(keyFilePath),
				cert: fs.readFileSync(certFilePath)},
			this.expressApp
			).listen(this.port, () => {
				console.info(`Started ServerMockApi at https://localhost:${this.port}/`);
			});
		} else {
			this.expressApp.listen(this.port, () => {
				console.info(`Started ServerMockApi at http://localhost:${this.port}/`);
			});
		}
        
	}

}