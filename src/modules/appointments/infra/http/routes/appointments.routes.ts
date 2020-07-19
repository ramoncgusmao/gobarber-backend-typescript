import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   console.log(request.user);
//   const appointments = await appointmentRepository.find();

//   response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointmentService = container.resolve(CreateAppointmentService);
  const appointment = await createAppointmentService.execute({
    date: parseDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
