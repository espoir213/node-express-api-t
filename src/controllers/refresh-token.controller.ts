import RefreshTokenService from '@/services/refresh-token.service';
import { NextFunction, Request, Response } from 'express';

class RefreshTokenController {
  public refreshTonService = new RefreshTokenService();

  public getAllRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRefreshToken = await this.refreshTonService.findAllRefreshToken();
      res.status(200).json({ data: findAllRefreshToken });
    } catch (error) {
      next(error);
    }
  };

  public getRefreshTokenById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refrehTokenId = Number(req.params.id);
      const findOneRefreshToken = await this.refreshTonService.findRefreshTokenById(refrehTokenId);
      res.status(200).json({ data: findOneRefreshToken });
    } catch (error) {
      next(error);
    }
  };

  public deleteRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshTokenId = Number(req.params.id);
      const deleteRefrechTokenData = await this.refreshTonService.deleteRefreshToken(refreshTokenId);

      res.status(200).json({ data: deleteRefrechTokenData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public createRefreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshToken = req.body;
      const createFreshTokenData = await this.refreshTonService.createRefreshToken(refreshToken);
      res.status(200).json({ data: createFreshTokenData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
export default RefreshTokenController;
