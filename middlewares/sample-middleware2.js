"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareSecond = void 0;
const middlewareSecond = (req, res, next) => {
    console.log('middlewareSecond');
    next();
};
exports.middlewareSecond = middlewareSecond;
