import { PieceCommandeEntity } from '@/entities/piece-commande.entity';
import Validator from '@/middlewares/validator';
import PieceCommandeService from '@/services/piece-commande.service';
import { NextFunction, Request, Response } from 'express';

class PieceCommandeController {
  public validation = new Validator();
  public PieceCommandeService = new PieceCommandeService();

  public getAllPieceCommande = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPieceCommandeData = await this.PieceCommandeService.findAllPieceCommande();
      res.status(200).json({ data: findAllPieceCommandeData });
    } catch (error) {
      next(error);
    }
  };

  public getPieceCommandeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pieceCommandeId = Number(req.params.id);
      const findOnePieceCommandeData = await this.PieceCommandeService.findPieceCommandeById(pieceCommandeId);
      res.status(200).json({ data: findOnePieceCommandeData });
    } catch (error) {
      next(error);
    }
  };

  public createPieceCommande = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pieceCommande: PieceCommandeEntity = req.body;

      const createPieceCommandeData = await this.PieceCommandeService.createPieceCommande(pieceCommande);
      res.status(200).json({ data: createPieceCommandeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePieceCommande = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pieceCommandeId = Number(req.params.id);
      const pieceCommandeData = req.body;

      const updatePieceCommandeData = await this.PieceCommandeService.updatePieceCommande(pieceCommandeId, pieceCommandeData);
      res.status(200).json({ data: updatePieceCommandeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePieceCommande = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pieceCommandeId = Number(req.params.id);
      const deletePieceCommandetData = await this.PieceCommandeService.deletePieceCommande(pieceCommandeId);

      res.status(200).json({ data: deletePieceCommandetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default PieceCommandeController;
