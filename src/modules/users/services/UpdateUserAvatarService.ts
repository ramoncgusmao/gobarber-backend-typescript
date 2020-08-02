import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    user.avatar = await this.storageProvider.saveFile(avatarFileName);

    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;