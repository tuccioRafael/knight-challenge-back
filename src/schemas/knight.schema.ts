import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Weapon, WeaponSchema } from './weapon.schema';
import { AttributesDto } from '../modules/knight/dto/knight.dto';

export type KnightDocument = Knight & Document;

@Schema()
export class Knight {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ type: [WeaponSchema], required: true }) // Subdocumentos de armas
  weapons: Weapon[];

  @Prop({ required: true })
  keyAttribute: string;

  @Prop({ required: true, type: Object })
  attributes: AttributesDto;

  @Prop({ default: null })
  deletedAt: Date;

  @Prop({ default: Date.now })
  createdAt: Date; 

  @Prop({ default: Date.now })
  updatedAt: Date;

  constructor(knight?: Partial<Knight>) {
    this.name = knight?.name;
    this.nickname = knight?.nickname;
    this.birthday = knight?.birthday;
    this.weapons = knight?.weapons;
    this.keyAttribute = knight?.keyAttribute;
    this.attributes = knight?.attributes;
    this.deletedAt = knight?.deletedAt;
    this.createdAt = knight?.createdAt;
    this.updatedAt = knight?.updatedAt;
  }
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
