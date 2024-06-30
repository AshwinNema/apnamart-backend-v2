import {
  Body,
  Controller,
  Post,
  Request,
  UsePipes,
  Put,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import { Roles } from 'src/auth/role/role.guard';
import {
  CategoryValidator,
  CreateCatValidation,
  MultiPartDataPipe,
} from 'src/validations';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipAccessAuth } from 'src/auth/jwt/access.jwt';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @SkipAccessAuth()
  getCategory() {
    return this.categoryService.getCategories();
  }

  @Post()
  @Roles(UserRole.admin)
  @FormDataRequest()
  @UsePipes(new MultiPartDataPipe(CategoryValidator))
  uploadFileValidation(@Body() body: CreateCatValidation, @Request() req) {
    const data = Object(body.data);
    return this.categoryService.createCategory(data, body.file, req.user);
  }

  @Put('image/:id')
  @Roles(UserRole.admin)
  @UseInterceptors(FileInterceptor('file'))
  updateCategoryImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoryService.updateCategoryImg(id, file);
  }

  @Put(':id')
  @Roles(UserRole.admin)
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CategoryValidator,
  ) {
    return this.categoryService.updateCategory(id, body);
  }
}
