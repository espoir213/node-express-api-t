import { InputPagination } from '@/entities/pagination';
import { PayementEntity } from '@/entities/payement.entity';
import Validator from '@/middlewares/validator';
import PayementService from '@/services/payement.service';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

class PayementController {
  public servicePayement = new PayementService();
  public validation = new Validator();

  public getAllPayement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPayementData = await this.servicePayement.findAllPayement();

      res.status(200).json({ data: findAllPayementData });
    } catch (error) {
      next(error);
    }
  };

  public getPayementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const PayementId = Number(req.params.id);
      const findOnePayementData = await this.servicePayement.findPayementById(PayementId);

      res.status(200).json({ data: findOnePayementData });
    } catch (error) {
      next(error);
    }
  };

  public createPayement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Payement: PayementEntity = req.body;
      const errors = await validate(Payement);
      if (errors.length > 0) {
        res.status(422).json(await this.validation.validationEntity(errors));
      } else {
        const createPayementData = await this.servicePayement.createPayement(Payement);
        res.status(200).json({ data: createPayementData, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public updatePayement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const PayementId = Number(req.params.id);
      const PayementData: PayementEntity = req.body;
      const updateUserData = await this.servicePayement.updatePayement(PayementId, PayementData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePayement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const PayementId = Number(req.params.id);
      const deletePayementData = await this.servicePayement.deletePayement(PayementId);
      res.status(200).json({ data: deletePayementData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getPayementPaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.servicePayement.findPayementPaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };
}

export default PayementController;
