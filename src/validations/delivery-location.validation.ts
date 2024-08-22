import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class DeliveryAreaValidation {
  @Min(1000, { message: 'Area must be atleast 1 km in radius' })
  @IsNumber()
  radius: number;

  @Min(-90)
  @Max(90)
  @IsNumber()
  latitude: number;

  @Min(-180)
  @Max(180)
  @IsNumber()
  longtitude: number;
}

export class UpdateAreaValidation extends DeliveryAreaValidation {
  @Min(1)
  @IsInt()
  id: number;
}

export class UpdateMapState {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => DeliveryAreaValidation)
  created: DeliveryAreaValidation[];

  @ArrayUnique((area) => area.id)
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => UpdateAreaValidation)
  update: UpdateAreaValidation[];

  @ArrayUnique((id) => id)
  @Min(1, { each: true })
  @IsInt({ each: true })
  @IsArray()
  deleted: number[];
}