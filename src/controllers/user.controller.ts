import {
  CLIENT_URL,
  JWT_ACCESS_TOKEN_EXPIRETIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_EMAIL_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_RESET_EXPIRY,
  JWT_RESET_PASSWORD_SECRET,
} from '@/config';
import { LoginDto } from '@/dtos/users.dto';
import { UserEntity } from '@/entities/user.entity';
import { HttpException } from '@/exceptions/HttpException';
import EmailService from '@/services/email.service';
import RefreshTokenService from '@/services/refresh-token.service';
import UserService from '@/services/user.service';
import { isEmpty } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

class UserController {
  public userService = new UserService();
  public refreshTokenService = new RefreshTokenService();
  public emailService = new EmailService();

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserEntity = req.body;

      const createUserData = await this.userService.createUser(userData);

      res.status(200).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: UserEntity = req.body;
      const updateUserData = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public confirmEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      type MyToken = {
        email: string;
        id: number;
        iat: number;
        exp: number;
        role: string;
      };
      const data: any = verify(req.params.token, JWT_EMAIL_TOKEN_SECRET) as MyToken;
      const user = await this.userService.updateUser(data.id, { confirmed: true });
      if (user) {
        res.status(200).json({ data: user, message: 'Email confirmed' });
      } else {
        res.status(500).json({ message: data });
      }
    } catch (error) {
      next(error);
    }
  };

  public resendConfirmationEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (isEmpty(req.body)) throw new HttpException(400, 'Youre email is not exists');
      const email = req.body.email;
      await this.userService.resendEmailCofirmation(email);
      res.status(200).json({ message: 'Confirmation email sent' });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refresh_token = req.body;
      if (!refresh_token) {
        res.status(403).json({ error: 'Access denied,token missing!' });
      } else {
        const refToken = await this.refreshTokenService.getReFreshTokenByToken(refresh_token.refresh_token);
        if (!refToken) {
          res.status(401).json({ error: 'Token expired!' });
        } else {
          const payload: any = verify(refToken.token, JWT_REFRESH_TOKEN_SECRET);
          const accessToken: any = sign({ user: payload }, JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRETIME,
          });
          res.status(200).json({ accessToken });
        }
      }
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.body.email;
      const findUser = await this.userService.getUserByEmail(email);
      if (!findUser) {
        res.status(409).json(`You're email ${email} not found`);
      } else {
        const password_reset_token = await this.refreshTokenService.createAccessRefreshToken(findUser, JWT_RESET_PASSWORD_SECRET, JWT_RESET_EXPIRY)
          .token;
        const url = `${CLIENT_URL}/users/password-reset-form/${password_reset_token}`;
        this.emailService.sendEmail({ url: url, email: findUser.membres.email, typeEmail: 2, subject: 'Confirm Email', sendUrl: true });
        res.status(200).json({ message: 'Link to reset password have been sent to specified email' });
      }
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const password = req.body.password;
      type MyToken = {
        email: string;
        id: number;
        iat: number;
        exp: number;
        role: string;
      };
      const data = verify(req.params.token, JWT_RESET_PASSWORD_SECRET) as MyToken;
      if (data) {
        this.userService.updateUser(data.id, { password: password });
        res.status(200).json({ message: 'Your password has been changed successfully.' });
      } else {
        res.status(409).json(data);
      }
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: LoginDto = req.body;
      const loginUserData = await this.userService.login(userData);

      res.status(200).json({ data: loginUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePasswordUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: any = req.body;
      const updateUserData = await this.userService.modifierMotPasse(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
