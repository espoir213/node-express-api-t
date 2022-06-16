import { CreateDevisDto } from '@/dtos/devis.dto';
import { DevisEntity } from '@/entities/devis.entity';
import DevisService from './devis.service';
import InfosDevisService from './infos-devis.service';

class ActionDevisService {
  public devisSevice = new DevisService();
  public infoDevisSevice = new InfosDevisService();

  /**
   * create devis + infos
   */
  public async creactDevisAndInfos(createDevisDto: CreateDevisDto) {
    const devis = await this.devisSevice.createDevis(createDevisDto.devis);
    if (devis) await this.saveMultiInfoDevis(devis, createDevisDto);
    return devis;
  }

  /**
   * save multi info devis
   */
  public async saveMultiInfoDevis(devis: DevisEntity, createDevisDto: CreateDevisDto) {
    for (const infos of createDevisDto.infosDevis) {
      infos.devis = devis;
      await this.infoDevisSevice.createInfoDevis(infos);
    }
  }
}

export default ActionDevisService;
