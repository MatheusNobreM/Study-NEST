import { IsEmail, IsStrongPassword } from "class-validator";

export class CreatePessoaDto {
  @IsEmail()
  email: string;
  
  @IsStrongPassword({
    
  })
  passwordHash: string;
  
  nome: string;
}
