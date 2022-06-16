import ProjetController from '@/controllers/projet.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import UploadFile from '@/middlewares/upload/upload-file';
import { Router } from 'express';

class ProjetRoute {
  public path = '/projet';
  public router = Router();
  public projetController = new ProjetController();
  public uploadFile = new UploadFile();
  public path2 = '/projet-remarque';
  public path3 = '/projet-vehicule';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      authMiddleware,
      this.uploadFile.uploadPhotoVehicule().single('photo'),
      this.projetController.createProjetVehicule,
    );

    this.router.delete(`${this.path}/:id`, authMiddleware, this.projetController.deleteProjetVehicule);

    this.router.get(`${this.path}/page/:pageSize/:page`, authMiddleware, this.projetController.getProjetPaginate);

    this.router.get(`${this.path}/:id`, authMiddleware, this.projetController.getProjetById);

    this.router.get(`${this.path}`, authMiddleware, this.projetController.getAllProjet);

    this.router.get(`${this.path}/by-status/:status`, authMiddleware, this.projetController.getAllProjetByStatus);

    this.router.put(`${this.path}/:id`, authMiddleware, this.projetController.updateProjet);

    this.router.get(`${this.path}-status`, authMiddleware, this.projetController.getAllStatusProjet);

    //remarques projet
    this.router.post(`${this.path2}`, authMiddleware, this.projetController.createRemarqueProjet);

    this.router.delete(`${this.path2}/:idRermaque`, authMiddleware, this.projetController.deleteRemarqueProjet);

    // vehicule
    this.router.put(`${this.path3}/:id`, authMiddleware, this.projetController.updateVehicule);

    // defaut et carburant
    this.router.put(`${this.path3}/defaut-carburant/:id`, this.projetController.updateDefautCarburant);

    // dedatail vehicule
    this.router.put(`${this.path3}/details/:id`, this.projetController.updateDetailVehicule);

    // pices vehicule
    this.router.put(`${this.path3}/pieces-vehicule/:id`, this.projetController.updatePiecesVehicule);

    // porteur
    this.router.post(`${this.path3}/porteur-vehicule`, authMiddleware, this.projetController.createPorteurVehicule);

    this.router.delete(`${this.path3}/porteur-vehicule/:id`, authMiddleware, this.projetController.deletePorteurVehicule);
  }
}

export default ProjetRoute;
