import { Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { KnightService } from "../service/knight.service";



@Controller('knights')
export class KnightController {

  constructor(private readonly knightService: KnightService) { }

  @Get()
  getAllKnights(): string {
    return this.knightService.findAll();
  }

  @Get(':id')
  getKnightById(@Param('id') id: string): string {
    return this.getKnightById(id);
  }

  @Post()
  createKnight(): string {
    return this.knightService.create();
  }

  @Delete(':id')
  deleteKnight(@Param('id') id: string): string {
    return this.knightService.becomeAHero(id);
  }

  @Put(':id')
  updateKnight(@Param('id') id: string): string {
    return this.knightService.updateNickName(id);
  }
}