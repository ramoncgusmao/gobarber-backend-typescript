import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('ListProviderAppointmentsService', () => {
  let listProviderAppointmentsService: ListProviderAppointmentsService;
  let fakeAppointmentsRepository: FakeAppointmentsRepository;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list appointments on a specific day', async () => {
    const appointments1 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12221221',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12221221',
      date: new Date(2020, 4, 21, 9, 0, 0),
    });
    const appointments2 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '12221221',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    const availability = await listProviderAppointmentsService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual([appointments1, appointments2]);
  });
});
