import { FormuleReservationEntity } from '@/entities/formule-reservation.entity';
import FormuleReservationService from '@/services/formule-reservation.service';
import { NextFunction, Request, Response } from 'express';

class FormuleReservationController {
  public serviceFormuleReservation = new FormuleReservationService();

  public updateFormuleReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const formuleReservationId = Number(req.params.id);
      const formuleReservationData: FormuleReservationEntity = req.body;
      const updateFormuleReservationData = await this.serviceFormuleReservation.updateFormuleReservation(
        formuleReservationId,
        formuleReservationData,
      );
      res.status(200).json({ data: updateFormuleReservationData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getFormuleReservationByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.idUser);
      const findOneFormuleReservationData = await this.serviceFormuleReservation.findFormuleReservationByUser(userId);
      res.status(200).json({ data: findOneFormuleReservationData });
    } catch (error) {
      next(error);
    }
  };
}
export default FormuleReservationController;
