import {
  Body,
  Controller,
  Post,
  UsePipes,
  Put,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import { Roles } from 'src/auth/role/role.guard';
import {
  CategoryValidator,
  CreateCatValidation,
  QueryCategories,
  SearchByName,
} from 'src/validations';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipAccessAuth } from 'src/auth/jwt/access.jwt';
import { CreateCategoryData } from 'src/interfaces';
import { MultiPartDataPipe } from 'src/pipes';
import { User } from 'src/decorators';
import { CommonService } from 'src/common/common.service';
import * as _ from 'lodash';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private commonService: CommonService,
  ) {}

  @Get()
  @SkipAccessAuth()
  getCategory(@Query() query: QueryCategories) {
    const paginationOptions = _.pick(query, ['limit', 'page']);
    const where = _.pick(query, ['id']);
    return this.commonService.queryData('category', paginationOptions, {
      where,
    });
  }

  @Post()
  @Roles(UserRole.admin)
  @FormDataRequest()
  @UsePipes(new MultiPartDataPipe(CategoryValidator))
  createCategory(@User() user, @Body() body: CreateCatValidation) {
    const data: CreateCategoryData = Object(body.data);
    return this.categoryService.createCategory(data, body.file, user);
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

  @Delete(':id')
  @Roles(UserRole.admin)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.deleteCategoryById(id);
    return { success: true };
  }

  @Get('name-list')
  async nameList(@Query() query: SearchByName) {
    return this.categoryService.searchByName(query.name);
  }
}
