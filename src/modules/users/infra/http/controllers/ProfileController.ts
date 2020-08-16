import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfileService = container.resolve(ShowProfileService);
    const user_id = request.user.id;

    const user = await showProfileService.execute({
      user_id,
    });
    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password, old_password } = request.body;
    const updateProfileService = container.resolve(UpdateProfileService);
    const user_id = request.user.id;

    const userUpdate = await updateProfileService.execute({
      email,
      name,
      password,
      old_password,
      user_id,
    });

    return response.json(userUpdate);
  }
}
