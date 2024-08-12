import { Module } from '@nestjs/common';
import { KnightController } from './controller/knight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightSchema } from '../../schemas/knight.schema';
import { KnightService } from './service/knight.service';
import { WeaponSchema } from '../../schemas/weapon.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Knight', schema: KnightSchema }]),
    MongooseModule.forFeature([{ name: 'Weapon', schema: WeaponSchema }]),
],
  controllers: [KnightController],
  providers: [KnightService],
})
export class KnightModule {}