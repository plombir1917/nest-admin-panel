// import {
//   Controller,
//   HttpCode,
//   Post,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { Roles } from 'src/auth/decorators/roles-auth.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { FileElementResponce } from './dto/file-element.responce';
// import { FilesService } from './files.service';

// @Controller('files')
// export class FilesController {
//   constructor(private readonly filesService: FilesService) {}

//   @Post('Upload')
//   @HttpCode(200)
//   @Roles('ADMIN')
//   @UseGuards(RolesGuard)
//   @UseInterceptors(FileInterceptor('files'))
//   async uploadFile(
//     @UploadedFile() file: Express.Multer.File,
//   ): Promise<FileElementResponce[]> {
//     return this.filesService.saveFiles([file]);
//   }
// }
