import { JWT_ACCESS_TOKEN_SECRET } from '@/config';
import { RoleMembre } from '@/entities/membre.entity';
import { UserEntity } from '@/entities/user.entity';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const AdminOnly = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = JWT_ACCESS_TOKEN_SECRET;
      const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const findUser = await UserEntity.findOne(id);
      if (findUser.membres.role === RoleMembre.admin) {
        const userCompar = {
          id: findUser.idUser,
          email: findUser.membres.email,
          role: findUser.membres.role,
        };
        req.user = userCompar;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default AdminOnly;
