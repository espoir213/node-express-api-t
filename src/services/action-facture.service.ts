import { CreateFactureDto } from '@/dtos/facture.dto';
import { FactureEntity } from '@/entities/facture.entity';
import FactureService from './facture.service';
import InfosFactureService from './infos-facture.service';

class ActionFactureService {
  public factureSevice = new FactureService();
  public infoFactureSevice = new InfosFactureService();

  /**
   * create Facture + infos
   */
  public async creactFactureAndInfos(createFactureDto: CreateFactureDto) {
    const Facture = await this.factureSevice.createFacture(createFactureDto.factures);
    if (Facture) await this.saveMultiInfoFacture(Facture, createFactureDto);
    return Facture;
  }

  /**
   * save multi info Facture
   */
  public async saveMultiInfoFacture(facture: FactureEntity, createFactureDto: CreateFactureDto) {
    for (const infos of createFactureDto.infosFacture) {
      infos.factures = facture;
      await this.infoFactureSevice.createInfoFacture(infos);
    }
  }
}

export default ActionFactureService;
