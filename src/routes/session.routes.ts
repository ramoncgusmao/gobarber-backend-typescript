import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    return response.json({ ok: true });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionRouter;
