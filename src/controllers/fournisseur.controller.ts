import { FournisseurEntity } from '@/entities/fournisseur.entity';
import { InputPagination } from '@/entities/pagination';
import Validator from '@/middlewares/validator';
import FournisseurService from '@/services/fournisseur.service';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

class FournisseurController {
  public serviceFournisseur = new FournisseurService();
  public validation = new Validator();

  public getAllFournisseur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllFournisseurData = await this.serviceFournisseur.findAllFournisseur();

      res.status(200).json({ data: findAllFournisseurData });
    } catch (error) {
      next(error);
    }
  };

  public getFournisseurById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fournisseurId = Number(req.params.id);
      const findOneFournisseurData = await this.serviceFournisseur.findFournisseurById(fournisseurId);

      res.status(200).json({ data: findOneFournisseurData });
    } catch (error) {
      next(error);
    }
  };

  public createFournisseur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const Fournisseur: FournisseurEntity = req.body;
      const errors = await validate(Fournisseur);
      if (errors.length > 0) {
        res.status(422).json(await this.validation.validationEntity(errors));
      } else {
        const createFournisseurData = await this.serviceFournisseur.createFournisseur(Fournisseur);
        res.status(200).json({ data: createFournisseurData, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public updateFournisseur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fournisseurId = Number(req.params.id);
      const FournisseurData: FournisseurEntity = req.body;
      const updateUserData = await this.serviceFournisseur.updateFournisseur(fournisseurId, FournisseurData);
      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFournisseur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fournisseurId = Number(req.params.id);
      const deleteFournisseurData = await this.serviceFournisseur.deleteFournisseur(fournisseurId);
      res.status(200).json({ data: deleteFournisseurData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getFournisseurPaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.serviceFournisseur.findFournisseurPaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };
}

export default FournisseurController;
