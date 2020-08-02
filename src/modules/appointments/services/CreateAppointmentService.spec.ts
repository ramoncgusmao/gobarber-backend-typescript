import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '122121212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('122121212');
  });

  it('should be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 6, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '122121212',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});