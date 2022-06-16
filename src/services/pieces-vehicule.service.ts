import { PieceVehiculeEntity } from '@/entities/pieces-vehicule.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class PieceVehiculeService extends Repository<PieceVehiculeEntity> {
  /**
   * fonction prendre PieceVehicule par id
   * @param pieceVehiculeId
   */
  public async findPieceVehiculeById(pieceVehiculeId: number) {
    if (isEmpty(pieceVehiculeId)) throw new HttpException(400, "You're not pieceVehiculeId");

    const findPieceVehicule = await PieceVehiculeEntity.findOne({ where: { idPieceVehicule: pieceVehiculeId } });
    if (!findPieceVehicule) throw new HttpException(409, "You're not PieceVehicule");

    return findPieceVehicule;
  }

  /**
   * fonction supprimer PieceVehicule
   * @param pieceVehiculeId
   */
  public async deletePieceVehicule(pieceVehiculeId: number) {
    if (isEmpty(pieceVehiculeId)) throw new HttpException(400, "You're not pieceVehiculeId");

    const findPieceVehicule = await PieceVehiculeEntity.findOne({ where: { idPieceVehicule: pieceVehiculeId } });
    if (!findPieceVehicule) throw new HttpException(409, "You're not PieceVehicule");

    await PieceVehiculeEntity.delete({ idPieceVehicule: pieceVehiculeId });
    return findPieceVehicule;
  }

  /**
   * fonction ajouter PieceVehicule
   * @param PieceVehiculeEntity
   */
  public async createPieceVehicule(PieceVehiculeData: PieceVehiculeEntity) {
    const createPieceVehiculeData = await PieceVehiculeEntity.create(PieceVehiculeData).save();
    return createPieceVehiculeData;
  }

  /**
   * function modifier PieceVehicule
   * @param pieceVehiculeId
   * @param PieceVehiculeEntity
   */
  public async updatePieceVehicule(pieceVehiculeId: number, PieceVehiculeData: PieceVehiculeEntity) {
    if (isEmpty(PieceVehiculeData)) throw new HttpException(400, "You're not PieceVehiculeData");

    const findPieceVehicule = await PieceVehiculeEntity.findOne({ where: { idPieceVehicule: pieceVehiculeId } });
    if (!findPieceVehicule) throw new HttpException(409, "You're not PieceVehicule");

    await PieceVehiculeEntity.update(pieceVehiculeId, PieceVehiculeData);

    const updatePieceVehicule = await PieceVehiculeEntity.findOne({ where: { idPieceVehicule: pieceVehiculeId } });
    return updatePieceVehicule;
  }
}

export default PieceVehiculeService;
