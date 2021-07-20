import express from 'express';

const testRouter = express.Router();

testRouter.get('/', (req, res) => {
  console.log('Call to test api received');
  res.status(301).send({ res: 'Success' });
});

export default testRouter;
