import { bucketName } from '@/config/upload';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './multer';

class ProfilUpload {
  public upload: any = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, file.originalname);
      },
    }),
    // filtre pour que le fichier uploader est une image seulement
    fileFilter: (req: any, file: any, callback: any) => {
      const ext: string = file.mimetype.split('/')[1];
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
        return callback(null, false);
      }
      callback(null, true);
    },
    limits: { fileSize: 26214400 }, // In bytes: 26214400 bytes = 25 MB
  }).fields([{ name: 'photo', maxCount: 1 }]);

  public profil_uploader = (req: Request, res: Response, next: NextFunction): void => {
    this.upload(req, res, function (error: any) {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Erreur lors de l'upload",
          errors: error,
        });
      }
      next();
    });
    next();
  };
}

export default ProfilUpload;
