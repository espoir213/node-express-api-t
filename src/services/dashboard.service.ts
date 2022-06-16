import { ClientEntity } from '@/entities/client.entity';

class DashboardService {
  /**
   *function get nombre total client
   */
  public async findNbTotalClient() {
    const countClientActif = await ClientEntity.count({ where: { status: true } });
    const countClientNoActif = await ClientEntity.count({ where: { status: false } });
    const total = countClientActif + countClientNoActif;
    return { countClientActif, countClientNoActif, total };
  }
}
export default DashboardService;
