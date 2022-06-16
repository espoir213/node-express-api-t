import { MembreEntity, RoleMembre, StatusMembre, TaperMembre } from '@/entities/membre.entity';
import { InputPagination } from '@/entities/pagination';
import MembreService from '@/services/membre.service';
import { NextFunction, Request, Response } from 'express';

class MembreController {
  public membreService = new MembreService();

  public getMembres = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMembresData = await this.membreService.findAllMembre();

      res.status(200).json({ data: findAllMembresData });
    } catch (error) {
      next(error);
    }
  };

  public getMembreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const MembreId = Number(req.params.id);
      const findOneMembreData = await this.membreService.findMembreById(MembreId);

      res.status(200).json({ data: findOneMembreData });
    } catch (error) {
      next(error);
    }
  };

  public createMembre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const MembreData: MembreEntity = req.body;

      const createMembreData = await this.membreService.createMembre(MembreData);

      res.status(200).json({ data: createMembreData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMembre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const MembreId = Number(req.params.id);
      const MembreData: MembreEntity = req.body;
      const updateMembreData = await this.membreService.updateMembre(MembreId, MembreData);

      res.status(200).json({ data: updateMembreData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMembre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const MembreId = Number(req.params.id);
      const deleteMembreData = await this.membreService.deleteMembre(MembreId);

      res.status(200).json({ data: deleteMembreData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getAllRoleMembre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: RoleMembre });
    } catch (error) {
      next(error);
    }
  };

  public getAllStatusMembre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: StatusMembre });
    } catch (error) {
      next(error);
    }
  };

  public getAllTaperMembre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: TaperMembre });
    } catch (error) {
      next(error);
    }
  };

  public getMembrePaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findMembre = await this.membreService.findMembrePaginate(inputPagination);
      res.status(200).json({ data: findMembre });
    } catch (error) {
      next(error);
    }
  };
}

export default MembreController;
