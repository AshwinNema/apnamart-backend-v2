import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SubCatFltrOptService } from './filter-option.service';
import { Roles } from 'src/auth/role/role.guard';
import { UserRole } from '@prisma/client';
import {
  FilterOptionCreateValidation,
  SubCatFltrOptionValidation,
} from 'src/validations';
import { User } from 'src/decorators';
import { UserInterface } from 'src/interfaces';

@Controller('filter-option')
export class SubCatFltrOptionController {
  constructor(private subCatOptService: SubCatFltrOptService) {}

  @Post()
  @Roles(UserRole.admin)
  createFilterOption(
    @Body() body: FilterOptionCreateValidation,
    @User() user: UserInterface,
  ) {
    return this.subCatOptService.createSubCatFltrOption({
      createdBy: user.id,
      ...body,
    });
  }

  @Put(':id')
  @Roles(UserRole.admin)
  updateFilterOption(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SubCatFltrOptionValidation,
  ) {
    return this.subCatOptService.update({ id }, body);
  }
}
