import { Injectable } from '@nestjs/common';
import { FileElementResponce } from './dto/file-element.responce';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { Event } from 'src/events/entities/events.entity';

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
    event: Event,
  ): Promise<FileElementResponce[]> {
    const dateFolder = format(new Date(event.date), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${event.name}/${dateFolder} `;
    await ensureDir(uploadFolder);
    const res: FileElementResponce[] = [];
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      const url = `${event.name}/${dateFolder}/${file.originalname}`;
      res.push({
        url: url,
        name: file.originalname,
      });
    }
    return res;
  }
}
