import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";


@Controller('knights')
export class KnightController {

  @Get()
  getAllKnights(): string {
    return 'retorna todos os cavaleiros';
  }

  @Get(':id')
  getKnightById(@Param('id') id: string): string {
    return `retorna cavaleiro do ${id}`;
  }

  @Post()
  createKnight(): string {
    return 'cria um cavaleiro';
  }

  @Delete(':id')
  deleteKnight(@Param('id') id: string): string {
    return `deleta o cavaleiro do ${id}`;
  }

  @Put(':id')
  updateKnight(@Param('id') id: string): string {
    return `edita o cavaleido de id ${id}`;
  }
}