
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { KnightService } from "../service/knight.service";
import { CreateKnightDto } from "../dto/knight.dto";
import { Knight } from "../../../schemas/knight.schema";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('knights')
@Controller('knights')
export class KnightController {

  constructor(private readonly knightService: KnightService) { }

  @ApiOperation({ summary: 'Listar todos os cavaleiros' })
  @Get()
  async getAllKnights(@Query('filter') filter?: string): Promise<Knight[]> {
    return this.knightService.findAll(filter);
  }

  @ApiOperation({ summary: 'Buscar cavaleiro por id' })
  @Get(':id')
  async getKnightById(@Param('id') id: string): Promise<Knight | null> {
    return await this.knightService.getById(id);
  }

  @ApiOperation({ summary: 'Criar um cavaleiro' })
  @Post()
  async createKnight(@Body() createKnightDto: CreateKnightDto): Promise<Knight> {
    return this.knightService.create(createKnightDto);
  }

  @ApiOperation({ summary: 'Torna o cavaleiro em um herói' })
  @Delete(':id')
  async deleteKnight(@Param('id') id: string): Promise<Knight> {
    return this.knightService.becomeAHero(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza o apelido do cavaleiro' })
  async updateKnight(@Param('id') id: string, @Body('nickname') nickName: string): Promise<Knight> {
    return this.knightService.updateNickName(id, nickName)
  }
}