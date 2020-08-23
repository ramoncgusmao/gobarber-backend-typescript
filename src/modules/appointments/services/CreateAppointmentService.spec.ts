import AppError from '@shared/errors/AppError';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let fakeNotificationsRepository: FakeNotificationRepository;
  let createAppointment: CreateAppointmentService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 14),
      user_id: '12221221',
      provider_id: '122121212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('122121212');
  });

  it('should be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 6, 11, 10);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '12221221',
      provider_id: '122121212',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '12221221',
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 9);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '12221221',
        provider_id: '1212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const appointmentDate = new Date(2020, 4, 10, 17);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '12221221',
        provider_id: '12221221',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    const appointmentDate = new Date(2020, 4, 10, 7);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 9, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '12221221',
        provider_id: '221221',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 18),
        user_id: '12221221',
        provider_id: '221221',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
