import {
  API_URL,
  JWT_ACCESS_TOKEN_EXPIRETIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_EMAIL_TOKEN_EXPIRETIME,
  JWT_EMAIL_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRETIME,
  JWT_REFRESH_TOKEN_SECRET,
} from '@/config';
import { LoginDto } from '@/dtos/users.dto';
import { RefreshTokenEntity } from '@/entities/refresh-token.entity';
import { UserEntity } from '@/entities/user.entity';
import { HttpException } from '@/exceptions/HttpException';
import { compare, hash } from 'bcrypt';
import { isEmpty } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import EmailService from './email.service';
import MembreService from './membre.service';
import PaginationService from './pagination.service';
import RefreshTokenService from './refresh-token.service';

@EntityRepository()
class UserService extends Repository<UserEntity> {
  public paginationService = new PaginationService();
  public membreService = new MembreService();

  /**
   * appel des service utiliser
   */
  public refreshTokenService = new RefreshTokenService();
  public emailService = new EmailService();

  /**
   *
   * @param userId
   * @returns get user by id
   */
  public async findUserById(userId: number) {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser = await UserEntity.findOne({ where: { idUser: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  /**
   *
   * @param userData
   * @returns creation user
   */
  public async createUser(userData: UserEntity) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    //verifier existe
    const findUser = await UserEntity.findOne({ where: { membres: { idMembre: userData.membres } } });
    if (findUser) throw new HttpException(409, `You're id user ${userData.membres} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    let accessToken = null;
    let refreshToken = null;
    if (createUserData) {
      // creer access token
      accessToken = await this.refreshTokenService.createAccessRefreshToken(createUserData, JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRETIME);
      // creer refresh token
      refreshToken = await this.refreshTokenService.createAccessRefreshToken(createUserData, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRETIME);

      const refToken = new RefreshTokenEntity();
      refToken.token = refreshToken.token;
      await this.refreshTokenService.createRefreshToken(refToken);

      // creer email token pour confirmation email
      const userFind = await this.findUserById(createUserData.idUser);

      this.sendEmailConfirmation(userFind);
    }
    return {
      message: 'Auth Successful, a link have been sent to you to confirm your email',
      accessToken,
      refreshToken,
      createUserData,
    };
  }

  /**
   *
   * @param userId
   * @param userData
   * @returns modifier user
   */
  public async updateUser(userId: number, userData: any) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await UserEntity.findOne({ where: { idUser: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      await UserEntity.update(userId, { ...userData, password: hashedPassword });
    } else {
      await UserEntity.update(userId, userData);
    }

    const updateUser = await UserEntity.findOne({ where: { idUser: userId } });
    return updateUser;
  }

  /**
   *
   * @param userId
   * @returns supprimer users
   */
  public async deleteUser(userId: number) {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser = await UserEntity.findOne({ where: { idUser: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await UserEntity.delete({ idUser: userId });
    return findUser;
  }

  /**
   * function send email confirmation
   * @param createUserData (idUser, email)
   */
  public async sendEmailConfirmation(createUserData: any) {
    const emailToken = await this.refreshTokenService.createAccessRefreshToken(createUserData, JWT_EMAIL_TOKEN_SECRET, JWT_EMAIL_TOKEN_EXPIRETIME)
      .token;
    const url = `${API_URL}/users/confirmation/${emailToken}`;
    // envoyer email
    await this.emailService.sendEmail({ url: url, email: createUserData.membres.email, typeEmail: 1, subject: 'Confirm Email', sendUrl: true });
    return url;
  }

  /**
   * get user by email
   * @param email
   */
  public async getUserByEmail(email: string) {
    const findUser = await UserEntity.findOne({ relations: ['membres'], where: { membres: { email: email } } });
    return findUser;
  }

  /**
   * resend email confirmation
   * @param email
   */
  public async resendEmailCofirmation(email: string) {
    const findUser = await this.getUserByEmail(email);
    if (findUser) {
      this.sendEmailConfirmation(findUser);
    } else {
      throw new HttpException(409, `Youre email is not exists`);
    }
  }

  public async login(userData: LoginDto) {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await UserEntity.findOne({ relations: ['membres'], where: { membres: { email: userData.email }, confirmed: true } });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    // creer access token
    const accessToken = await this.refreshTokenService.createAccessRefreshToken(findUser, JWT_ACCESS_TOKEN_SECRET, JWT_ACCESS_TOKEN_EXPIRETIME);
    // creer refresh token
    const refreshToken = await this.refreshTokenService.createAccessRefreshToken(findUser, JWT_REFRESH_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRETIME);

    return {
      user: findUser,
      refreshToken: refreshToken,
      accessToken: accessToken,
    };
  }

  public async modifierMotPasse(userId: number, userData: any) {
    // get user by email
    const findUser = await this.findUserById(userId);
    if (findUser) {
      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
      else {
        const user = new UserEntity();
        user.password = userData.newPassword;
        return await this.updateUser(findUser.idUser, user);
      }
    }
  }
}

export default UserService;
