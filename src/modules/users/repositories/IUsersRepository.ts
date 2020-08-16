import User from '../infra/typeorm/entities/User';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;

  create(data: ICreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
