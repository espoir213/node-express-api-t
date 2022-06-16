import { InventaireEntity } from '@/entities/inventaire.entity';
import { InputPagination } from '@/entities/pagination';
import Validator from '@/middlewares/validator';
import InventaireService from '@/services/inventaire.service';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

class InventaireController {
  public serviceInventaire = new InventaireService();
  public validation = new Validator();

  public getAllInventaire = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllInventaireData = await this.serviceInventaire.findAllInventaire();

      res.status(200).json({ data: findAllInventaireData });
    } catch (error) {
      next(error);
    }
  };

  public getInventaireById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inventaireId = Number(req.params.id);
      const findOneInventaireData = await this.serviceInventaire.findInventaireById(inventaireId);

      res.status(200).json({ data: findOneInventaireData });
    } catch (error) {
      next(error);
    }
  };

  public createInventaire = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inventaire: InventaireEntity = req.body;
      const errors = await validate(inventaire);
      if (errors.length > 0) {
        res.status(422).json(await this.validation.validationEntity(errors));
      } else {
        const createInventaireData = await this.serviceInventaire.createInventaire(inventaire);
        res.status(200).json({ data: createInventaireData, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateInventaire = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inventaireId = Number(req.params.id);
      const InventaireData: InventaireEntity = req.body;
      const updateUserData = await this.serviceInventaire.updateInventaire(inventaireId, InventaireData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInventaire = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inventaireId = Number(req.params.id);
      const deleteInventaireData = await this.serviceInventaire.deleteInventaire(inventaireId);
      res.status(200).json({ data: deleteInventaireData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getInventairePaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.serviceInventaire.findInventairePaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };
}

export default InventaireController;
