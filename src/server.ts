import App from '@/app';
import UserRoute from '@/routes/user.route';
import validateEnv from '@utils/validateEnv';
import ClientRoute from '@routes/client.route';
import PieceCommandeRoute from './routes/piece-commande.route';
import FournisseurRoute from './routes/fournisseur.route';
import InventaireRoute from './routes/inventaire.route';
import MembreRoute from './routes/membre.route';
import CampagneRoute from './routes/campagne.route';
import AssuranceRoute from './routes/assurance.route';
import ProjetRoute from './routes/projet.route';
import CarteTravailClientRoute from './routes/carte-travail-client.route';
import DevisRoute from './routes/devis.route';
import InfosDevisRoute from './routes/infos-devis.route';
import FactureRoute from './routes/facture.route';
import InfosFactureRoute from './routes/infos-facture.route';
import PayementRoute from './routes/payement.route';
import DashboardRoute from './routes/dashboard.route';

validateEnv();

const app = new App([
  new FournisseurRoute(),
  new InventaireRoute(),
  new UserRoute(),
  new ClientRoute(),
  new PieceCommandeRoute(),
  new MembreRoute(),
  new CampagneRoute(),
  new AssuranceRoute(),
  new ProjetRoute(),
  new CarteTravailClientRoute(),
  new DevisRoute(),
  new InfosDevisRoute(),
  new FactureRoute(),
  new InfosFactureRoute(),
  new PayementRoute(),
  new DashboardRoute(),
]);
app.listen();
