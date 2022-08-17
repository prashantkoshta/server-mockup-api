export const middlewareFirst = (req: any, res: any, next: any) => {
	console.log('middlewareFirst');
	if(req.url === '/test-middleware1') {
		res.end('Hello');
	} else {
		next();
	}
};