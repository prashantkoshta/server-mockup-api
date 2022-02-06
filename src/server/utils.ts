/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
export default class Utils {

	public readAllFiles(sourcePath: string, jsonContent: JSON ): JSON {
		const dirs: string[] = fs.readdirSync(sourcePath);
		dirs.forEach((val: string) => {
			const pth: string = path.join(sourcePath, val);
			const stats: fs.Stats = fs.statSync(pth);
			if(stats.isFile()) {
				jsonContent = {...jsonContent, ...this.readFileContent(pth)};
			} else if(stats.isDirectory()) {
				jsonContent = {...jsonContent, ...this.readAllFiles(pth, jsonContent)};
			} 
			return jsonContent;
		});
		return jsonContent;
	}

	private readFileContent(filePath: string): JSON {
		const buf: Buffer = fs.readFileSync(filePath);
		try {
			return JSON.parse(buf.toString());
		} catch( e: any) {
			throw new Error(`Invalid Json Format in ${filePath}`);
		}
	}
}