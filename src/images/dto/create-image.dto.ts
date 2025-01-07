import { IsString, IsNumber, IsOptional, Min, Max, IsUrl } from 'class-validator';

export class CreateImageDto {
  @IsString()
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  subcategory1?: string;

  @IsString()
  @IsOptional()
  subcategory2?: string;

  @IsString()
  @IsOptional()
  subcategory3?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  discount?: number;
}
