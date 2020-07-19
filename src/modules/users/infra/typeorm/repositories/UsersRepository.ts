import { Repository, getRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async create({
    name,
    password,
    email,
  }: ICreateUsersDTO): Promise<User> {
    const users = this.ormRepository.create({
      name,
      password,
      email,
    });

    await this.ormRepository.save(users);
    return users;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
