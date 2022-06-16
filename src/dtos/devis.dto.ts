import { DevisEntity } from '@/entities/devis.entity';
import { InfosDevisEntity } from '@/entities/infos-devis.entity';

export class CreateDevisDto {
  devis: DevisEntity;
  infosDevis: [InfosDevisEntity];
}
