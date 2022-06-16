import { AssuranceEntity } from '@/entities/assurances.entity';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository()
class AssuranceService extends Repository<AssuranceEntity> {
  /**
   * fonction lister tous les Assurances
   */
  public async findAllAssurance() {
    const assurances = await AssuranceEntity.find();
    return assurances;
  }

  /**
   * fonction prendre Assurance par id
   * @param AssuranceId
   */
  public async findAssuranceById(AssuranceId: number) {
    if (isEmpty(AssuranceId)) throw new HttpException(400, "You're not AssuranceId");

    const findAssurance = await AssuranceEntity.findOne({ where: { idAssurance: AssuranceId } });
    if (!findAssurance) throw new HttpException(409, "You're not Assurance");

    return findAssurance;
  }

  /**
   * fonction supprimer Assurance
   * @param AssuranceId
   */
  public async deleteAssurance(AssuranceId: number) {
    if (isEmpty(AssuranceId)) throw new HttpException(400, "You're not AssuranceId");

    const findAssurance = await AssuranceEntity.findOne({ where: { idAssurance: AssuranceId } });
    if (!findAssurance) throw new HttpException(409, "You're not Assurance");

    await AssuranceEntity.delete({ idAssurance: AssuranceId });
    return findAssurance;
  }

  /**
   * fonction ajouter Assurance
   * @param AssuranceEntity
   */
  public async createAssurance(AssuranceData: AssuranceEntity) {
    const createAssuranceData = await AssuranceEntity.create(AssuranceData).save();
    return createAssuranceData;
  }

  /**
   * function modifier Assurance
   * @param AssuranceId
   * @param AssuranceEntity
   */
  public async updateAssurance(AssuranceId: number, AssuranceData: AssuranceEntity) {
    if (isEmpty(AssuranceData)) throw new HttpException(400, "You're not AssuranceData");

    const findAssurance = await AssuranceEntity.findOne({ where: { idAssurance: AssuranceId } });
    if (!findAssurance) throw new HttpException(409, "You're not Assurance");

    await AssuranceEntity.update(AssuranceId, AssuranceData);

    const updateAssurance = await AssuranceEntity.findOne({ where: { idAssurance: AssuranceId } });
    return updateAssurance;
  }
}

export default AssuranceService;
