
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AddChildCategoryDto {
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  parentId?: string;
}



class ChildCategoryDto {
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  parentId?: string;
}

export class CreateCategoryDto {
  @IsString()
  name: string;
  
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChildCategoryDto)
  children?: ChildCategoryDto[];
}
