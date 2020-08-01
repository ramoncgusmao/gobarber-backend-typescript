import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('jonh doe');
  });

  it('should be able to create two user on the same email', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'jonh doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'jonh ramon',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
