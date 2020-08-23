import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentcontroller = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);
//   const appointments = await appointmentRepository.find();

//   response.json(appointments);
// });

appointmentsRouter.post('/', appointmentcontroller.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);
export default appointmentsRouter;
