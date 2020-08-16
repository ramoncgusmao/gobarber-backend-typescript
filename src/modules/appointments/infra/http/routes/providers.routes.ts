import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProvidersController';

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);
const appointmentcontroller = new ProviderController();

providersRouter.get('/', appointmentcontroller.index);

export default providersRouter;
