import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';

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
  '/:provider_id/month-availability',

  monthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: { provider_id: Joi.string().uuid().required },
  }),
  dayAvailabilityController.index,
);

export default providersRouter;
