export const middleware = (req: any, res: any, next: any) => {
    if(req.method === 'GET' 
    || req.method === 'POST' 
    || req.method === 'PUT' 
    || req.method === 'DELTE' 
    || req.method === 'PATCH') {
        req.method = 'GET'
    }
    next();
};