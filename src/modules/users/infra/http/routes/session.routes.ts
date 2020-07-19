import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { container } from 'tsyringe';

const sessionRouter = Router();
sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authenticateUserService = container.resolve(AuthenticateUserService);
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;
  return response.json({ user, token });
});

export default sessionRouter;
