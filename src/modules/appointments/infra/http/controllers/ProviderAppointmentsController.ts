import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.body;
    const provider_id = request.user.id;
    const listProviderDayAvailabilityService = container.resolve(
      ListProviderAppointmentsService,
    );
    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      month,
      year,
      day,
    });
    return response.json(availability);
  }
}
