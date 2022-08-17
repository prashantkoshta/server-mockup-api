/* eslint-disable @typescript-eslint/no-explicit-any */
import JsonServer from 'json-server';
import { Application } from 'express';
import Utils from './utils';
import { middleware } from './middleware';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
// import { middlewareA } from './../../sample-middleware';

export default class ServerMockApi {
	private readonly expressApp: Application;

	constructor(readonly port: number, readonly dbPath: string, 
		readonly routePath: string, readonly delayInResponse?: number, 
		readonly enableHttps?:boolean, readonly certFilePath?:string, 
		readonly keyFilePath?:string, readonly customMiddlewares?:string[]) {
		this.expressApp = JsonServer.create();

		const mergedDBJson:JSON = new Utils().readAllFiles(this.dbPath, JSON.parse('{}'));
		const mergedRoutesJson:any = new Utils().readAllFiles(this.routePath, JSON.parse('{}'));
		const router = JsonServer.router(mergedDBJson);

		this.expressApp.use(cors({
			origin: '*'
		}));
		this.expressApp.use(JsonServer.rewriter(mergedRoutesJson));
		this.expressApp.use((req, res, next) => {
			setTimeout(next, this.delayInResponse);
		});
		this.expressApp.use(middleware);
		if(customMiddlewares) {
			const arPr: any[] = [];
			for(const index in customMiddlewares) {
				arPr[index] = import(customMiddlewares[index]);
			}
			Promise.all(arPr).then((values) => {
				values.map(item => {
					for(const i in item) {
						this.expressApp.use(item[i]);
					}
				});
				this.includeAll(router);
			});
		} else {
			this.includeAll(router);
		}
	}

	private includeAll(router: any) {
		this.expressApp.use(router);
			
		if(this.enableHttps && this.keyFilePath && this.certFilePath) {
			https.createServer( {
				key: fs.readFileSync(this.keyFilePath),
				cert: fs.readFileSync(this.certFilePath)},
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