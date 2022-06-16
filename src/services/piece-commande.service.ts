import { PieceCommandeEntity } from '@/entities/piece-commande.entity';
import { HttpException } from '@/exceptions/HttpException';
import UploadFile from '@/middlewares/upload/upload-file';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class PieceCommandeService extends Repository<PieceCommandeEntity> {
  public uploadFile = new UploadFile();

  /**
   * fonction lister tous les PieceCommande
   */
  public async findAllPieceCommande() {
    const PieceCommandes = await PieceCommandeEntity.find();
    return PieceCommandes;
  }

  /**
   * fonction prendre PieceCommande par id
   * @param pieceCommandeId
   */
  public async findPieceCommandeById(pieceCommandeId: number) {
    if (isEmpty(pieceCommandeId)) throw new HttpException(400, "You're not pieceCommandeId");

    const findPieceCommande = await PieceCommandeEntity.findOne({ where: { idPiece: pieceCommandeId } });
    if (!findPieceCommande) throw new HttpException(409, "You're not PieceCommande");

    return findPieceCommande;
  }

  /**
   * fonction supprimer PieceCommande
   * @param pieceCommandeId
   */
  public async deletePieceCommande(pieceCommandeId: number) {
    if (isEmpty(pieceCommandeId)) throw new HttpException(400, "You're not pieceCommandeId");

    const findPieceCommande = await PieceCommandeEntity.findOne({ where: { idPiece: pieceCommandeId } });
    if (!findPieceCommande) throw new HttpException(409, "You're not PieceCommande");
    await PieceCommandeEntity.delete({ idPiece: pieceCommandeId });

    return findPieceCommande;
  }

  /**
   * fonction ajouter PieceCommande
   * @param PieceCommandeEntity
   */
  public async createPieceCommande(pieceCommandeData: PieceCommandeEntity) {
    const createPieceCommandeData = await PieceCommandeEntity.create(pieceCommandeData).save();
    return createPieceCommandeData;
  }

  /**
   * function modifier PieceCommande
   * @param pieceCommandeId
   */
  public async updatePieceCommande(pieceCommandeId: number, pieceCommandeData: PieceCommandeEntity) {
    if (isEmpty(pieceCommandeData)) throw new HttpException(400, "You're not PieceCommande");

    const findPieceCommande = await PieceCommandeEntity.findOne({ where: { idPiece: pieceCommandeId } });
    if (!findPieceCommande) throw new HttpException(409, "You're not PieceCommande");

    await PieceCommandeEntity.update(pieceCommandeId, pieceCommandeData);

    const updatePieceCommande = await PieceCommandeEntity.findOne({ where: { idPiece: pieceCommandeId } });
    return updatePieceCommande;
  }
}

export default PieceCommandeService;
