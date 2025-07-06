import { IsEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRecadoDto {
  @IsString()
  @IsEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsString()
  @IsEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly de: string;

  @IsString()
  @IsEmpty()
  @MinLength(2)
  @MaxLength(50)
  readonly para: string;
}
