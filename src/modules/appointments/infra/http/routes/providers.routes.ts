import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);
const appointmentcontroller = new ProviderController();
const monthAvailabilityController = new ProviderMonthAvailabilityController();
const dayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.get('/', appointmentcontroller.index);
providersRouter.get(
  '/:provider-id/mount-availability',
  monthAvailabilityController.index,
);
providersRouter.get(
  '/:provider-id/day-availability',
  dayAvailabilityController.index,
);
providersRouter.get(
  '/:provider-id/day-appointment',
  dayAvailabilityController.index,
);

export default providersRouter;
