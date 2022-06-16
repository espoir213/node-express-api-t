import { FactureEntity } from '@/entities/facture.entity';
import { InfosFactureEntity } from '@/entities/infos-facture.entity';

export class CreateFactureDto {
  factures: FactureEntity;
  infosFacture: [InfosFactureEntity];
}
