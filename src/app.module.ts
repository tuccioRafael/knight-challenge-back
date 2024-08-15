import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightModule } from './modules/knight/knight.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URL as string), KnightModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
