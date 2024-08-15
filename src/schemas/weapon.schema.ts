import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeaponDocument = Weapon & Document;

@Schema()
export class Weapon {
  @Prop({ required: true })
  name: string;

  @Prop()
  mod: number;

  @Prop({ required: true })
  attr: string;

  @Prop({ required: true })
  equipped: boolean;
}

export const WeaponSchema = SchemaFactory.createForClass(Weapon);
