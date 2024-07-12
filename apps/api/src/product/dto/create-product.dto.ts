import { IsArray, IsDefined, IsJSON, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  properties: { key: string; value: string }[];}
