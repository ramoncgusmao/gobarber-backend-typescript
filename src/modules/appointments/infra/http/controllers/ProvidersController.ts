import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const createAppointmentService = container.resolve(ListProvidersService);
    const providers = await createAppointmentService.execute({
      user_id,
    });
    return response.json(providers);
  }
}
