import express from 'express';
import testRouter from './testRouter';

const apiRouter = express.Router();

apiRouter.use('/test', testRouter);

export default apiRouter;
