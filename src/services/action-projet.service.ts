import { CreateProjetDto } from '@/dtos/projet.dto';
import { DefautCarburantEntity } from '@/entities/defaut-carburant.entity';
import { DetailVehiculeEntity } from '@/entities/details-vehicule.entity';
import { PieceVehiculeEntity } from '@/entities/pieces-vehicule.entity';
import { PorteurVehiculeEntity } from '@/entities/porteur-veicule.entity';
import { ProjetEntity, StatusProjet, TestRoutiers } from '@/entities/projet.entity';
import { VehiculeEntity } from '@/entities/vehicule.entity';
import DefautCarburantService from './defaut-carburant.service';
import DetailVehiculeService from './detail-vehicule.service';
import PieceVehiculeService from './pieces-vehicule.service';
import ClientService from './client.service';
import ProjetService from './projet.service';
import VehiculeService from './vehicule.service';
import PorteurVehiculeService from './porteur-vehicule.service';
import UploadFile, { DirFile } from '@/middlewares/upload/upload-file';

class ActionProjetService {
  public vehiculeService = new VehiculeService();

  public detailVehiculeService = new DetailVehiculeService();

  public porteurVehiculeService = new PorteurVehiculeService();

  public defautCarburantService = new DefautCarburantService();

  public pieceVehiculeService = new PieceVehiculeService();

  public projetService = new ProjetService();

  public clientService = new ClientService();

  public uploadFile = new UploadFile();

  /**
   * create vehicule and projet
   */
  public async createProjetVehicule(createProjetDto: CreateProjetDto) {
    // creation details vehicule
    const detail = await this.detailVehiculeService.createDetailVehicule(createProjetDto.detailVehicules);

    // creation porteur vehicule
    let porteurVehicule = null;
    if (createProjetDto.isPorteur === true) {
      porteurVehicule = await this.porteurVehiculeService.createPorteurVehicule(createProjetDto.porteurVehicule);
    }

    // cration defaut et carburant vehicule
    const defautCarburant = await this.defautCarburantService.createDefautCarburant(createProjetDto.defautCarburants);

    // creation piece vehicule
    const piecesVehicule = await this.pieceVehiculeService.createPieceVehicule(createProjetDto.pieceVehicules);

    // creation vehicule
    const vehicule = await this.createVehicule(detail, porteurVehicule, defautCarburant, piecesVehicule, createProjetDto);

    // cration projet
    const projetSave = await this.createProjet(vehicule, createProjetDto);

    return projetSave;
  }

  /**
   * creation vehicule
   */
  public async createVehicule(
    detail: DetailVehiculeEntity,
    porteurVehicule: PorteurVehiculeEntity,
    defautCarburant: DefautCarburantEntity,
    piecesVehicule: PieceVehiculeEntity,
    createProjetDto: CreateProjetDto,
  ) {
    const vehicule = new VehiculeEntity();
    // champs non relation
    vehicule.photo = createProjetDto.photo;
    if (createProjetDto.isAssurance === true) {
      vehicule.assurances = createProjetDto.assurances;
    }
    vehicule.isPorteur = createProjetDto.isPorteur;
    // champs relation
    if (createProjetDto.isNewClient === true) {
      // creation nouveau client
      const newClient = await this.clientService.createClient(createProjetDto.clients);
      vehicule.clients = newClient;
    } else {
      // client existant
      vehicule.clients = createProjetDto.clients;
    }
    vehicule.detailVehicules = detail;
    vehicule.porteurVehicule = porteurVehicule;
    vehicule.defautCarburants = defautCarburant;
    vehicule.pieceVehicules = piecesVehicule;
    // save vehicule
    const vehiculeSave = this.vehiculeService.createVehicule(vehicule);
    return vehiculeSave;
  }

  /**
   * creation projet
   */
  public async createProjet(vehicule: VehiculeEntity, createProjetDto: CreateProjetDto) {
    const projet = new ProjetEntity();
    //association vehicule
    projet.vehicules = vehicule;
    // champs non relation
    projet.dateDebut = createProjetDto.dateDebut;
    projet.dateFin = createProjetDto.dateFin;
    projet.satus = StatusProjet[createProjetDto.satus];
    projet.testRoutier = TestRoutiers[createProjetDto.testRoutier];
    const projetSave = await this.projetService.createProjet(projet);
    return projetSave;
  }

  /**
   * supprimer projet et vehicule
   */
  public async deleteProjetvehicule(idProjet: number) {
    // supprimer projet
    const projet = await this.projetService.deleteProjet(idProjet);
    if (projet) {
      // supprimer vehicule
      await this.vehiculeService.deleteVehicule(projet.vehicules.idVehicule);
      // supprimer detail vehicule
      await this.detailVehiculeService.deleteDetailVehicule(projet.vehicules.detailVehicules.idDetailVehicule);
      // supprimer porteur vehicule
      if (projet.vehicules.isPorteur === true) this.porteurVehiculeService.deletePorteurVehicule(projet.vehicules.porteurVehicule.idPorteurVehicule);
      // supprimer pieces vehicule
      await this.pieceVehiculeService.deletePieceVehicule(projet.vehicules.pieceVehicules.idPieceVehicule);
      // suppimer default et carburant
      await this.defautCarburantService.deleteDefautCarburant(projet.vehicules.defautCarburants.idDefautCarburant);
      // supprimer photo telecherger
      if (projet.vehicules.photo) this.uploadFile.deleteFile(DirFile.vehicule, projet.vehicules.photo);
    }
    return projet;
  }
}

export default ActionProjetService;
