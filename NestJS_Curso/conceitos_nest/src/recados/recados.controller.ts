import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recados.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import { Request } from 'express';

//@UseInterceptors(SimpleCacheInterceptor)
//@UseInterceptors(ChangeDataInterceptor)
@UseInterceptors(AuthTokenInterceptor) // Interceptor para autenticação
@Controller('recados')
@UsePipes(ParseIntIdPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  //@UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Req() req: Request) {
    console.log('User:', req['user']); // Acessa o usuário adicionado pelo middleware
    //return `Retorna todos os recados. Limit=${limit}, Offset=${offset}`;
    const recado = await this.recadosService.findAll(paginationDto);
    return recado;
  }

  @Get(':id')
  //@UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)//cabeçalho
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
