import {
  Body,
  Controller,
  Post,
  UsePipes,
  Get,
  Put,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { Roles } from 'src/auth/role/role.guard';
import { UserRole } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import {
  CreateSubCatValidation,
  SubCategoryValidator,
} from 'src/validations/subcategory.validation';
import { SubcategoryService } from './subcategory.service';
import { SubCategoryInterface } from 'src/interfaces';
import { SkipAccessAuth } from 'src/auth/jwt/access.jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { MultiPartDataPipe } from 'src/pipes';
import { RequestProcessor } from 'src/decorators';
import {
  SubCatCrtDataPipe,
  subCategoryCreateProcessor,
} from './subcategory.util';

@Controller()
export class SubcategoryController {
  constructor(private subCategoryService: SubcategoryService) {}

  @Get()
  @SkipAccessAuth()
  getSubCategory() {
    return this.subCategoryService.getSubCategories();
  }

  @Post()
  @Roles(UserRole.admin)
  @UsePipes(new SubCatCrtDataPipe())
  @UsePipes(
    new MultiPartDataPipe(SubCategoryValidator, subCategoryCreateProcessor),
  )
  @FormDataRequest()
  createSubCategory(
    @Body() _: CreateSubCatValidation,
    @RequestProcessor() processedRequest,
  ) {
    const { body } = processedRequest;
    const data = Object(processedRequest.body.data);
    return this.subCategoryService.createSubCategory(data, body.file);
  }

  @Put('image/:id')
  @Roles(UserRole.admin)
  @UseInterceptors(FileInterceptor('file'))
  updateSubCategoryImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.subCategoryService.updateSubcategoryImg(id, file);
  }

  @Put(':id')
  @Roles(UserRole.admin)
  updateSubCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SubCategoryInterface,
  ) {
    return this.subCategoryService.updateSubCategory(id, body);
  }
}
