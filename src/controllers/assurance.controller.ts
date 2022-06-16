import { AssuranceEntity } from '@/entities/assurances.entity';
import Validator from '@/middlewares/validator';
import AssuranceService from '@/services/assurance.service';
import { NextFunction, Request, Response } from 'express';

class AssuranceController {
  public serviceAssurance = new AssuranceService();
  public validation = new Validator();

  public getAllAssurance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllassuranceData = await this.serviceAssurance.findAllAssurance();
      res.status(200).json({ data: findAllassuranceData });
    } catch (error) {
      next(error);
    }
  };

  public getAssuranceById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const assuranceId = Number(req.params.id);
      const findOneAssuranceData = await this.serviceAssurance.findAssuranceById(assuranceId);
      res.status(200).json({ data: findOneAssuranceData });
    } catch (error) {
      next(error);
    }
  };

  public createAssurance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Assurance: AssuranceEntity = req.body;
      const createassuranceData = await this.serviceAssurance.createAssurance(Assurance);
      res.status(200).json({ data: createassuranceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAssurance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const assuranceId = Number(req.params.id);
      const assuranceData: AssuranceEntity = req.body;
      const updateassuranceData = await this.serviceAssurance.updateAssurance(assuranceId, assuranceData);
      res.status(200).json({ data: updateassuranceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAssurance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const assuranceId = Number(req.params.id);
      const deleteAssurancetData = await this.serviceAssurance.deleteAssurance(assuranceId);

      res.status(200).json({ data: deleteAssurancetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default AssuranceController;
