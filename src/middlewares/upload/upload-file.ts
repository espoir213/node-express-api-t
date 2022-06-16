import fs from 'fs';
import multer from 'multer';
//emplacement deossier file
export enum DirFile {
  vehicule = './uploads/photos-vehicule',
  factures = './uploads/factures',
  logosSociete = './uploads/logos-societe',
}

class UploadFile {
  /**
   * configuratuon upload
   * @param path
   * @returns
   */
  public configStorage(path: DirFile) {
    const fileObj = {
      'image/png': '.png',
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
      'image/gif': '.gif',
    };
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path);
      },
      filename: (req, file, cb) => {
        const fileName = file.fieldname + '-' + Date.now() + fileObj[file.mimetype];
        cb(null, fileName);
      },
    });
    return storage;
  }

  /**
   * function create file
   * @param path
   * @returns
   */
  public uploadFile(path: DirFile) {
    const uploadFileImage = multer({
      storage: this.configStorage(path),
      fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/gif') {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
      },
    });
    return uploadFileImage;
  }

  /**
   * supprimer file
   */
  public async deleteFile(dirFile: DirFile, photo: string) {
    const fileName = photo.split('\\').pop();
    fs.unlink(`${dirFile}/${fileName}`, err => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  }
  /**
   *
   * save photo vehicule
   */
  public uploadPhotoVehicule() {
    return this.uploadFile(DirFile.vehicule);
  }

  /**
   *
   * save photo factures
   */
  public uploadPhotoFacture() {
    return this.uploadFile(DirFile.factures);
  }

  /**
   *
   * save logos Societe
   */
  public uploadLogoSociete() {
    return this.uploadFile(DirFile.logosSociete);
  }

  /**
   * creer dossier pour upload file
   */
  public verifierIfDirectory() {
    for (const key of Object.keys(DirFile)) {
      const locale: string = DirFile[key];
      if (!fs.existsSync(locale)) {
        fs.mkdirSync(locale);
      }
    }
  }
}

export default UploadFile;
