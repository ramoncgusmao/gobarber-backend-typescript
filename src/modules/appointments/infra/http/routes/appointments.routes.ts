import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);
const appointmentcontroller = new AppointmentsController();

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);
//   const appointments = await appointmentRepository.find();

//   response.json(appointments);
// });

appointmentsRouter.post('/', appointmentcontroller.create);

export default appointmentsRouter;
