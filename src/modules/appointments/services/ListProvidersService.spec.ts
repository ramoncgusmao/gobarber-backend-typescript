import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

describe('ListProvidersService', () => {
  let fakeUserRepository: FakeUserRepository;

  let listProvidersService: ListProvidersService;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const user2 = await fakeUserRepository.create({
      name: 'jonh tres',
      email: 'johntres@example.com',
      password: '123456',
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'jonh quad',
      email: 'johnquad@example.com',
      password: '123456',
    });

    const updateUser = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(updateUser).toEqual([user1, user2]);
  });
});
