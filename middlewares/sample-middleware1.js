"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareFirst = void 0;
const middlewareFirst = (req, res, next) => {
    console.log('middlewareFirst');
    if (req.url === '/test-middleware1') {
        res.end('Hello');
    }
    else {
        next();
    }
};
exports.middlewareFirst = middlewareFirst;
