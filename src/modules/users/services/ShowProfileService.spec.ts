import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('ShowProfileService', () => {
  let fakeUserRepository: FakeUserRepository;

  let showProfileService: ShowProfileService;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updateUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(updateUser.name).toBe('jonh doe');
    expect(updateUser.email).toBe('johndoe@example.com');
  });
  it('should be not able to show the profile with user id not found', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'id-not-found',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
