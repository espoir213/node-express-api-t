import { Router } from 'express';
import UserController from '@controllers/user.controller';
import { LoginDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import UploadFile from '@/middlewares/upload/upload-file';
import authMiddleware from '@/middlewares/auth.middleware';
import AdminOnly from '@/middlewares/auth-admin.middleware';
import InfoSocieteController from '@/controllers/info-societe.controller';
import FormuleReservationController from '@/controllers/formule-reservation.controller';
import ParametreSystemeController from '@/controllers/parametre-systeme.controller';

class UserRoute implements Routes {
  public path = '/users';
  public path2 = '/users-roles';
  public path3 = '/info-societe';
  public path4 = '/formule-reservation';
  public path5 = '/parametre-systeme';
  public router = Router();
  public userController = new UserController();
  public infoSociete = new InfoSocieteController();
  public formuleControler = new FormuleReservationController();
  public parametreSistemeCtrl = new ParametreSystemeController();
  public uploadFile = new UploadFile();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/:id`, authMiddleware, this.userController.getUserById);

    this.router.post(`${this.path}`, this.userController.createUser);

    this.router.put(`${this.path}/:id`, this.userController.updateUser);

    this.router.delete(`${this.path}/:id`, AdminOnly, this.userController.deleteUser);

    this.router.get(`${this.path}/confirmation/:token`, this.userController.confirmEmail);

    this.router.post(`${this.path}/resend-confirmation-email`, this.userController.resendConfirmationEmail);

    this.router.post(`${this.path}/refresh-token`, this.userController.refreshToken);

    this.router.post(`${this.path}/forgot-password`, this.userController.forgotPassword);

    this.router.post(`${this.path}/reset-password/:token`, this.userController.resetPassword);

    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto, 'body'), this.userController.login);

    this.router.put(`${this.path}/edit-password/:id`, authMiddleware, this.userController.updatePasswordUser);

    /**
     * info Societe
     */
    this.router.get(`${this.path3}/:idUser`, authMiddleware, this.infoSociete.getInfoSocieteByUserId);

    this.router.put(`${this.path3}/:id`, authMiddleware, this.uploadFile.uploadLogoSociete().single('logos'), this.infoSociete.updateInfoSociete);
    /**
     * Formule Reservation
     */
    this.router.get(`${this.path4}/:idUser`, authMiddleware, this.formuleControler.getFormuleReservationByUserId);

    this.router.put(`${this.path4}/:id`, authMiddleware, this.formuleControler.updateFormuleReservation);
    /**
     * parametre systeme
     */
    this.router.get(`${this.path5}/:idUser`, authMiddleware, this.parametreSistemeCtrl.getParametreSystemeByUserId);

    this.router.put(`${this.path5}/:id`, authMiddleware, this.parametreSistemeCtrl.updateParametreSysteme);
  }
}

export default UserRoute;
