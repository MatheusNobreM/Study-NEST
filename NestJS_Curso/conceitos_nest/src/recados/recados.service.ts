import { Injectable, NotFoundException } from "@nestjs/common";
import { Recado } from "./entities/recado.entity";
import { CreateRecadoDto } from "./dto/create-recado.dto";
import { UpdateRecadoDto } from "./dto/update-recados.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}

  // private lastId = 1;
  // private recados: Recado[] = [
  //   {
  //     id: 1,
  //     texto: 'Este é um recado de teste',
  //     de: 'Joana',
  //     para: "João",
  //     lido: false,
  //     data: new Date(),
  //   },
  // ];

  throwNotFoundError(){
    //throw new HttpException('Recado não encontrado.', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll() {
    const recado = await this.recadoRepository.find();
    return recado;
  }

  async findOne(id: number) {
    //const recado = this.recados.find(item => item.id === +id);
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      }
    })

    if (recado) return recado;

    this.throwNotFoundError();
  }

  async create( createRecadoDto: CreateRecadoDto) {
  
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);

    return this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDTO = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    }
    const recado = await this.recadoRepository.preload({
      id,
      ...updateRecadoDto,
    });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.save(recado);
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.remove(recado);
    
  }

  
}
