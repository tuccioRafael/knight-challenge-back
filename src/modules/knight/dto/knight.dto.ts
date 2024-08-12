import { IsString, IsDate, IsArray, ValidateNested, IsEnum, IsNotEmpty, IsObject, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { AttributeKey } from '../../../enums/attributs.enum';
import { Optional } from '@nestjs/common';
import { IsDateNotInFuture } from '../../../decorators/birthday-validator.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class WeaponDto {
  @ApiProperty({ description: 'Nome da arma' })
  @IsString({ message: 'deve ser uma string' })
  @IsNotEmpty({ message: 'o name da arma é obrigatório' })
  name: string;

  @Optional()
  @ApiProperty({ description: 'Descrição da arma' })
  @IsNotEmpty({ message: 'o mod da arma é obrigatório' })
  mod: number;

  @IsEnum(AttributeKey)
  @ApiProperty({ description: 'Atributo chave da arma' })
  @IsNotEmpty({ message: 'o attr da arma é obrigatório' })
  attr: AttributeKey;

  @ApiProperty({ description: 'Equipado' })
  @IsNotEmpty({ message: 'o equipped da arma é obrigatório' })
  equipped: boolean;
}

export class AttributesDto {

  @ApiProperty({ description: 'Força do Cavaleiro' })
  @IsNumber()
  strength: number;

  @ApiProperty({ description: 'Destreza do Cavaleiro' })
  @IsNumber()
  dexterity: number;

  @IsNumber()
  @ApiProperty({ description: 'Constituição do Cavaleiro' })
  constitution: number;

  @ApiProperty({ description: 'Inteligência do Cavaleiro' })
  @IsNumber()
  intelligence: number;

  @IsNumber()
  @ApiProperty({ description: 'Sabedoria do Cavaleiro' })
  wisdom: number;

  @IsNumber()
  @ApiProperty({ description: 'Carisma do Cavaleiro' })
  charisma: number;
}

export class CreateKnightDto {

  @ApiProperty({ description: 'Nome do Cavaleiro' })
  @IsString({ message: 'O name deve ser uma string' })
  @IsNotEmpty({ message: 'O name do Cavaleiro é obrigatório' })
  name: string;

  @ApiProperty({ description: 'Apelido do Cavaleiro' })
  @IsString({ message: 'O nickname deve ser uma string' })
  @IsNotEmpty({ message: 'O nickname do Cavaleiro é obrigatório' })
  nickname: string;

  @IsDate()
  @ApiProperty({ description: 'Data de nascimento do Cavaleiro' })
  @IsNotEmpty({ message: 'A birthday é obrigatória' })
  @Type(() => Date)
  @IsDateNotInFuture({ message: 'A birthday não pode ser uma data futura' })
  birthday: Date;

  @ApiProperty({ description: 'Armas do Cavaleiro' })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty({ message: 'O weappons é obrigatório' })
  @Type(() => WeaponDto)
  weapons: WeaponDto[];

  @IsObject()
  @ApiProperty({ description: 'Atributos do Cavaleiro' })
  @ValidateNested()
  @IsNotEmpty({ message: 'O atributes é obrigatório' })
  @Type(() => AttributesDto)
  attributes: AttributesDto;

  @IsEnum(AttributeKey)
  @ApiProperty({ description: 'Atributo chave do Cavaleiro' })
  @IsNotEmpty({ message: 'O keyAttribute é obrigatório' })
  keyAttribute: AttributeKey;
  
}
