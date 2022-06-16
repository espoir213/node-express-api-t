import DashboardService from '@/services/dashboard.service';
import { NextFunction, Request, Response } from 'express';

class DashboardController {
  public dashboardSevice = new DashboardService();

  public getNbTotalClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findTotal = await this.dashboardSevice.findNbTotalClient();
      res.status(200).json({ data: findTotal });
    } catch (error) {
      next(error);
    }
  };
}
export default DashboardController;
