import {
  Body,
  Controller,
  Post,
  UsePipes,
  Request,
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
import { MultiPartDataPipe } from 'src/validations';
import {
  CreateSubCatValidation,
  SubCategoryValidatior,
} from 'src/validations/subcategory.validation';
import { SubcategoryService } from './subcategory.service';
import { CreateSubCategoryData } from 'src/interfaces';
import { SkipAccessAuth } from 'src/auth/jwt/access.jwt';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('subcategory')
export class SubcategoryController {
  constructor(private subCategoryService: SubcategoryService) {}

  @Get()
  @SkipAccessAuth()
  getSubCategory() {
    return this.subCategoryService.getSubCategories();
  }

  @Post()
  @Roles(UserRole.admin)
  @FormDataRequest()
  @UsePipes(new MultiPartDataPipe(SubCategoryValidatior))
  createSubCategory(@Body() body: CreateSubCatValidation, @Request() req) {
    const data: CreateSubCategoryData = Object(body.data);
    return this.subCategoryService.createSubCategory(data, body.file, req.user);
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
    @Body() body: SubCategoryValidatior,
  ) {
    return this.subCategoryService.updateSubCategory(id, body);
  }
}
