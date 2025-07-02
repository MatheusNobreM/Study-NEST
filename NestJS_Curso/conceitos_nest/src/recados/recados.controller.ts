import { Controller, Get, Param } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
    @Get()
    findAll(){
        return "Essa rota enontra todos os Recados"
    }
    
    @Get(':id')
    findOne(@Param('id') id : string){
        return `Essa rota enontra o Recado e o ID: ${id}`
    }
}
