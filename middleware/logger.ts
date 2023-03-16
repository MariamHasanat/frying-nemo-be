import express from 'express';

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`method: ${req.method}, url: ${req.originalUrl}, time: ${new Date().toISOString()}`);
    next();
};

export default logger;