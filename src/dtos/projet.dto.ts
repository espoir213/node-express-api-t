import { AssuranceEntity } from '@/entities/assurances.entity';
import { ClientEntity } from '@/entities/client.entity';
import { DefautCarburantEntity } from '@/entities/defaut-carburant.entity';
import { DetailVehiculeEntity } from '@/entities/details-vehicule.entity';
import { PieceVehiculeEntity } from '@/entities/pieces-vehicule.entity';
import { PorteurVehiculeEntity } from '@/entities/porteur-veicule.entity';

export class CreateProjetDto {
  dateDebut: Date;
  dateFin: Date;
  satus: string;
  testRoutier: string;
  clients: ClientEntity;
  porteurVehicule: PorteurVehiculeEntity;
  assurances: AssuranceEntity;
  defautCarburants: DefautCarburantEntity;
  pieceVehicules: PieceVehiculeEntity;
  detailVehicules: DetailVehiculeEntity;
  photo: string;
  isPorteur: boolean;
  isAssurance: boolean;
  isNewClient: boolean;
}
