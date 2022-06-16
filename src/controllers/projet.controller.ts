import { API_URL } from '@/config';
import { DefautCarburantEntity } from '@/entities/defaut-carburant.entity';
import { DetailVehiculeEntity } from '@/entities/details-vehicule.entity';
import { InputPagination } from '@/entities/pagination';
import { PieceVehiculeEntity } from '@/entities/pieces-vehicule.entity';
import { PorteurVehiculeEntity } from '@/entities/porteur-veicule.entity';
import { ProjetEntity, StatusProjet } from '@/entities/projet.entity';
import { RemarqueProjetEntity } from '@/entities/remarque-projet.entity';
import { VehiculeEntity } from '@/entities/vehicule.entity';
import Validator from '@/middlewares/validator';
import ActionProjetService from '@/services/action-projet.service';
import DefautCarburantService from '@/services/defaut-carburant.service';
import DetailVehiculeService from '@/services/detail-vehicule.service';
import PieceVehiculeService from '@/services/pieces-vehicule.service';
import PorteurVehiculeService from '@/services/porteur-vehicule.service';
import ProjetService from '@/services/projet.service';
import VehiculeService from '@/services/vehicule.service';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

class ProjetController {
  public serviceActionProjet = new ActionProjetService();

  public serviceProjet = new ProjetService();

  public validation = new Validator();

  public vehiculeService = new VehiculeService();

  public defautCarburantService = new DefautCarburantService();

  public piecesVehiculeService = new PieceVehiculeService();

  public detailVehiculeService = new DetailVehiculeService();

  public porteurVehiculeService = new PorteurVehiculeService();

  public createProjetVehicule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let projet = req.body;
      Object.keys(projet).forEach(value => {
        if (projet[value].indexOf(':') > -1) {
          const formatted = JSON.parse(projet[value]);
          projet = {
            ...projet,
            [value]: formatted,
          };
        }
      });
      projet.defautCarburants.travauxDemmander = JSON.stringify(projet.defautCarburants.travauxDemmander);
      projet.pieceVehicules.verificationPieces = JSON.stringify(projet.pieceVehicules.verificationPieces);
      projet.isPorteur = projet.isPorteur === 'true' ? true : false;
      projet.isAssurance = projet.isAssurance === 'true' ? true : false;
      projet.isNewClient = projet.isNewClient === 'true' ? true : false;

      if (req.file) {
        const pathImage = `${API_URL}/${req.file.path}`;
        projet.photo = pathImage;
      }
      const createProjetData = await this.serviceActionProjet.createProjetVehicule(projet);
      res.status(200).json({ data: createProjetData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProjetVehicule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projetVehiculeId = Number(req.params.id);
      const deleteProjetVehiculetData = await this.serviceActionProjet.deleteProjetvehicule(projetVehiculeId);

      res.status(200).json({ data: deleteProjetVehiculetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getProjetPaginate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const inputPagination = new InputPagination();
      inputPagination.page = Number(req.params.page);
      inputPagination.pageSize = Number(req.params.pageSize || 10);

      const findUser = await this.serviceProjet.findProjetPaginate(inputPagination);
      res.status(200).json({ data: findUser });
    } catch (error) {
      next(error);
    }
  };

  public getProjetById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projetId = Number(req.params.id);
      const findOneProjetData = await this.serviceProjet.findProjetById(projetId);

      res.status(200).json({ data: findOneProjetData });
    } catch (error) {
      next(error);
    }
  };

  public getAllProjet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllProjetData = await this.serviceProjet.findAllProjet();

      res.status(200).json({ data: findAllProjetData });
    } catch (error) {
      next(error);
    }
  };

  public getAllProjetByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const status = String(req.params.status);
      const findOneProjetData = await this.serviceProjet.getAllProjetByStatus(status);

      res.status(200).json({ data: findOneProjetData });
    } catch (error) {
      next(error);
    }
  };

  public getAllStatusProjet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ data: StatusProjet });
    } catch (error) {
      next(error);
    }
  };

  public updateProjet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const projetId = Number(req.params.id);
      const projetData: ProjetEntity = req.body;
      const updateProjetData = await this.serviceProjet.updateProjet(projetId, projetData);
      res.status(200).json({ data: updateProjetData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // partie remarque
  public createRemarqueProjet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const remarque: RemarqueProjetEntity = req.body;
      const errors = await validate(remarque);
      if (errors.length > 0) {
        res.status(422).json(await this.validation.validationEntity(errors));
      } else {
        const createRemarqueProjetData = await this.serviceProjet.createRemarqueProjet(remarque);
        res.status(200).json({ data: createRemarqueProjetData, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public deleteRemarqueProjet = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const remarqueId = Number(req.params.idRermaque);
      const deleteProjetData = await this.serviceProjet.deleteRemarqueProjet(remarqueId);
      res.status(200).json({ data: deleteProjetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  // partie vehicule
  public updateVehicule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehiculeId = Number(req.params.id);
      const vehicule: VehiculeEntity = req.body;
      const updateVehiculetData = await this.vehiculeService.updateVehicule(vehiculeId, vehicule);
      res.status(200).json({ data: updateVehiculetData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // defaut carburant
  public updateDefautCarburant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const defautCarburantId = Number(req.params.id);
      const defautCarburant: DefautCarburantEntity = req.body;
      if (defautCarburant.travauxDemmander) defautCarburant.travauxDemmander = JSON.stringify(defautCarburant.travauxDemmander);
      const updatedefautCarburanttData = await this.defautCarburantService.updateDefautCarburant(defautCarburantId, defautCarburant);
      res.status(200).json({ data: updatedefautCarburanttData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // pieces vehicule
  public updatePiecesVehicule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const piecesVehiculetId = Number(req.params.id);
      const piecesVehiculet: PieceVehiculeEntity = req.body;
      if (piecesVehiculet.verificationPieces) piecesVehiculet.verificationPieces = JSON.stringify(piecesVehiculet.verificationPieces);
      const updatepiecesVehiculettData = await this.piecesVehiculeService.updatePieceVehicule(piecesVehiculetId, piecesVehiculet);
      res.status(200).json({ data: updatepiecesVehiculettData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // details vehiculle
  public updateDetailVehicule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const detailVehiculetId = Number(req.params.id);
      const detailVehiculet: DetailVehiculeEntity = req.body;
      const updatedetailVehiculettData = await this.detailVehiculeService.updateDetailVehicule(detailVehiculetId, detailVehiculet);
      res.status(200).json({ data: updatedetailVehiculettData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // create porteur vehicule
  public createPorteurVehicule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const porteurVehicule: PorteurVehiculeEntity = req.body;
      const errors = await validate(porteurVehicule);
      if (errors.length > 0) {
        res.status(422).json(await this.validation.validationEntity(errors));
      } else {
        const createPorteurVehiculeData = await this.porteurVehiculeService.createPorteurVehicule(porteurVehicule);
        res.status(200).json({ data: createPorteurVehiculeData, message: 'created' });
      }
    } catch (error) {
      next(error);
    }
  };

  public deletePorteurVehicule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const porteurId = Number(req.params.id);
      const deleteProjetData = await this.porteurVehiculeService.deletePorteurVehicule(porteurId);
      res.status(200).json({ data: deleteProjetData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
export default ProjetController;
