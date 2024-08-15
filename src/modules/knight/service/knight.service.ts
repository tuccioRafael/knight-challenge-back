import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Knight, KnightDocument } from '../../../schemas/knight.schema';
import { CreateKnightDto } from '../dto/knight.dto';

@Injectable()
export class KnightService {

  constructor(@InjectModel(Knight.name) private knightModel: Model<KnightDocument>) { }

  async create(createKnightDto: CreateKnightDto): Promise<Knight> {
    return await this.knightModel.create(createKnightDto);
  }

  async findAll(filter?: string): Promise<Knight[]> {
    if (filter === 'heroes') {
      return this.hallOfHeroes();
    }
    return this.knightModel.find({ deletedAt: null });
  }

  async hallOfHeroes(): Promise<Knight[]> {
    return await this.knightModel.find({ deletedAt: { $ne: null } });
  }

  async getById(id: string): Promise<Knight | null> {
    const knight = await this.knightModel.findById(id);
    if (!knight) {
      throw new NotFoundException(`Cavaleiro com ID ${id} não encontrado`);
    }
    return knight
  }

  async becomeAHero(id: string): Promise<Knight> {
    const knight = await this.knightModel.findByIdAndUpdate(id, { deletedAt: new Date(), updatedAt: new Date() }, { new: true });
    
    if(!knight) {
      throw new NotFoundException(`Cavaleiro com ID ${id} não encontrado`);
    }
    return knight;
  }

  async updateNickName(id: string, nickname: string): Promise<Knight> {
    const knight = await this.knightModel.findByIdAndUpdate({ _id: id }, { nickname: nickname, updatedAt: new Date() }, { new: true });
    
    if(!knight) {
      throw new NotFoundException(`Cavaleiro com ID ${id} não encontrado`);
    }
    return knight;
  }
}