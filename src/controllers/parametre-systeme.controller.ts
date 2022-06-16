import { ParametreSystemeEntity } from '@/entities/parametre-systeme.entity';
import ParametreSystemeService from '@/services/parametre-systeme.service';
import { NextFunction, Request, Response } from 'express';

class ParametreSystemeController {
  public serviceParametreSysteme = new ParametreSystemeService();

  public updateParametreSysteme = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ParametreSystemeId = Number(req.params.id);
      const ParametreSystemeData: ParametreSystemeEntity = req.body;
      const updateParametreSystemeData = await this.serviceParametreSysteme.updateParametreSysteme(ParametreSystemeId, ParametreSystemeData);
      res.status(200).json({ data: updateParametreSystemeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getParametreSystemeByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.idUser);
      const findOneParametreSystemeData = await this.serviceParametreSysteme.findParametreSystemeByUser(userId);
      res.status(200).json({ data: findOneParametreSystemeData });
    } catch (error) {
      next(error);
    }
  };
}
export default ParametreSystemeController;
