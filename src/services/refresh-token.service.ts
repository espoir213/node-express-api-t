import { RefreshTokenEntity } from '@/entities/refresh-token.entity';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

@EntityRepository()
class RefreshTokenService extends Repository<RefreshTokenEntity> {
  /**
   * fonction lister tous les refresh token
   */
  public async findAllRefreshToken() {
    const tokens = await RefreshTokenEntity.find();
    return tokens;
  }

  /**
   * fonction prendre token par id
   * @param idRefreshToken
   */
  public async findRefreshTokenById(refreshTokenId: number) {
    if (isEmpty(refreshTokenId)) throw new HttpException(400, "You're not refreshTokenId");

    const findRefreshToken = await RefreshTokenEntity.findOne({ where: { idRefreshToken: refreshTokenId } });
    if (!findRefreshToken) throw new HttpException(409, "You're not refreshToken");

    return findRefreshToken;
  }

  /**
   * fonction supprimer refresh Token
   * @param refreshTokenId
   */
  public async deleteRefreshToken(refreshTokenId: number) {
    if (isEmpty(refreshTokenId)) throw new HttpException(400, "You're not refreshTokenId");

    const findRefreshToken = await RefreshTokenEntity.findOne({ where: { idRefreshToken: refreshTokenId } });
    if (!findRefreshToken) throw new HttpException(409, "You're not refreshToken");

    await RefreshTokenEntity.delete({ idRefreshToken: refreshTokenId });
    return findRefreshToken;
  }

  /**
   * fonction ajouter refreshToken
   */
  public async createRefreshToken(refreshTokenData: RefreshTokenEntity) {
    const createrefreshTokenData = await RefreshTokenEntity.create(refreshTokenData).save();
    return createrefreshTokenData;
  }

  /**
   * function modifier refreshToken
   * @param refreshTokenId
   */
  public async updaterefreshToken(refreshTokenId: number, refreshTokenData: RefreshTokenEntity) {
    if (isEmpty(refreshTokenData)) throw new HttpException(400, "You're not refreshToken");
    const findRefreshToken = await RefreshTokenEntity.findOne({ where: { idRefreshToken: refreshTokenId } });
    if (!findRefreshToken) throw new HttpException(409, "You're not refreshToken");
    await RefreshTokenEntity.update(refreshTokenId, refreshTokenData);

    const updaterefreshToken = await RefreshTokenEntity.findOne({ where: { idRefreshToken: refreshTokenId } });
    return updaterefreshToken;
  }

  /**
   * function get refreshToken by nom refreshToken
   * @param refreshToken
   */
  public async getReFreshTokenByToken(token: String) {
    const findRefreshToken = await RefreshTokenEntity.findOne({ where: { token: token } });
    return findRefreshToken;
  }

  /**
   *
   * @param user
   * @param tokenSecret
   * @param expiredToken
   * @returns
   */
  public createAccessRefreshToken(user: any, tokenSecret: any, expiredToken: any): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.idUser, email: user.membres.email, role: user.membres.role };
    const secretKey = String(tokenSecret);
    const expiresIn = Number(expiredToken);
    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default RefreshTokenService;
