/* eslint-disable @typescript-eslint/no-explicit-any */
import JsonServer from 'json-server';
import { Application } from 'express';
import Utils from './utils';
import { middleware } from './middleware';

export default class ServerMockApi {
	private readonly expressApp: Application;

	constructor(readonly port: number, readonly dbPath: string, readonly routePath: string, readonly dealyInResponse?: number) {
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

		this.expressApp.listen(this.port, () => {
			console.info(`Started ServerMockApi at http://localhost:${this.port}/`);
		});
        
	}

}