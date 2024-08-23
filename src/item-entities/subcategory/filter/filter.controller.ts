import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { SubCatFltrService } from './filter.service';
import { Roles } from 'src/auth/role/role.guard';
import { UserRole } from '@prisma/client';
import { BodyPipe } from 'src/pipes';
import {
  FilterUpdateValidation,
  SubCatFltrBodyValidation,
} from 'src/validations';
import { FilterBodyTransformer, createFilterTransformer } from './filter.utils';
import { RequestProcessor } from 'src/decorators';
import { SkipAccessAuth } from 'src/auth/jwt/access.jwt';

@Controller('filter')
export class SubCatFltrController {
  constructor(private subCatFltrService: SubCatFltrService) {}

  @Get(':id')
  @SkipAccessAuth()
  getFilter(@Param('id', ParseIntPipe) id: number) {
    return this.subCatFltrService.getOneFilter({ id });
  }

  @Post()
  @Roles(UserRole.admin)
  @UsePipes(new FilterBodyTransformer())
  @UsePipes(new BodyPipe(SubCatFltrBodyValidation, createFilterTransformer))
  createFilter(@Body() _, @RequestProcessor() processedRequest) {
    return this.subCatFltrService.createFilter(processedRequest.body);
  }

  @Put(':id')
  @Roles(UserRole.admin)
  updateFilter(
    @Body() body: FilterUpdateValidation,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.subCatFltrService.updateFilter(id, body);
  }
}
