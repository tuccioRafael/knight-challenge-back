import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightModule } from './modules/knight/knight.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/knigts'), KnightModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
