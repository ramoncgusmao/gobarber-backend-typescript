import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('UpdateProfile', () => {
  let fakeUserRepository: FakeUserRepository;
  let fakeHashProvider: FakeHashProvider;
  let updateProfileService: UpdateProfileService;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'jonho jonho',
      email: 'jhontre@example.com',
    });

    expect(updateUser.name).toBe('jonho jonho');
    expect(updateUser.email).toBe('jhontre@example.com');
  });

  it('should be able to change to another user email', async () => {
    const user = await fakeUserRepository.create({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await fakeUserRepository.create({
      name: 'text',
      email: 'text@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'jonho jonho',
        email: 'text@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'jonho jonho',
      email: 'text@example.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'jonho jonho',
        email: 'text@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'jonho jonho',
        email: 'text@example.com',
        password: '123123',
        old_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the profile with user id not found', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'id-not-found',
        name: 'jonho jonho',
        email: 'text@example.com',
        password: '123123',
        old_password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
