import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { createBrotliCompress } from 'zlib';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

export const multerConfig = {
  dest: 'uploads',
};

function uuidRandom(file): string {
  const result = `${uuid()}${extname(file.originalname)}`;
  return result;
}

export const multerOptions = {
  fileFilter(req: any, cb: any, file: any) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException('Unsoported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
  storage: diskStorage({
    destination(req: any, file: any, cb: any) {
      const uploadPath = multerConfig.dest;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, uuidRandom(file));
    },
  }),
};
