import { Test, TestingModule } from '@nestjs/testing';
import { KnightService } from './knight.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Knight, KnightDocument } from '../../../schemas/knight.schema';
import { CreateKnightDto, WeaponDto } from '../dto/knight.dto';
import { KnightFindByIdMock, knightListMock, knightUpdateMock } from '../knightMock';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AttributeKey } from '../../../enums/attributs.enum';

describe('KnightService', () => {
  let knightService: KnightService;
  let knightModel: Model<KnightDocument>;
  let validationPipe: ValidationPipe;


  beforeEach(async () => {
    validationPipe = new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightService,
        {
          provide: getModelToken(Knight.name),
          useValue: {
            create: jest.fn().mockResolvedValue(knightListMock[0]),
            find: jest.fn().mockResolvedValue(knightListMock),
            findById: jest.fn().mockResolvedValue(KnightFindByIdMock),
            findByIdAndUpdate: jest.fn()
          },
        },
      ],
    }).compile();

    knightService = module.get<KnightService>(KnightService);
    knightModel = module.get<Model<KnightDocument>>(getModelToken(Knight.name));
  });

  it('should be defined', () => {
    expect(knightService).toBeDefined();
    expect(knightModel).toBeDefined();
  });

  describe('create', () => {
    it('should create a new knight', async () => {
      const result = await knightService.create(knightListMock[0] as CreateKnightDto);
      expect(knightModel.create).toHaveBeenCalledWith(knightListMock[0]);
      expect(result).toEqual(knightListMock[0]);
    });


    it('should return an error message if there is no name in the body', async () => {
      const dto = new CreateKnightDto();
      dto.name = '';
      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("O name do Cavaleiro é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if there is no date of birth in the body', async () => {
      const dto = new CreateKnightDto();
      dto.birthday = null;
      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("A birthday é obrigatória");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if the date of birth is in the future', async () => {
      const dto = new CreateKnightDto();
      dto.birthday = new Date('2039-01-01');
      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("A birthday não pode ser uma data futura");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if there is no nickname in the body', async () => {
      const dto = new CreateKnightDto();
      dto.nickname = null;
      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("O nickname do Cavaleiro é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if there is no attributeKey in the body', async () => {
      const dto = new CreateKnightDto();
      dto.keyAttribute = null;
      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("O keyAttribute é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });
    
    it('should return an error message if there are no attributes in the body', async () => {
      const dto = new CreateKnightDto();
      dto.attributes = null;
      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("O atributes é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if there are no weapons on the body', async () => {
      const dto = new CreateKnightDto();
      dto.weapons = null;
      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("O weappons é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });


    it('should return an error message if there is no name on the weapon', async () => {
      const weapon = new WeaponDto();
      weapon.name = null;
      weapon.mod = 10;
      weapon.attr = AttributeKey.STRENGTH;
      weapon.equipped = true;

      const dto = new CreateKnightDto();
      dto.name = 'Sir Lancelot';
      dto.nickname = 'The Brave';
      dto.birthday = new Date('1990-01-01');
      dto.weapons = [weapon];
      dto.attributes = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      };
      dto.keyAttribute = AttributeKey.STRENGTH;

      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("weapons.0.o name da arma é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if there is no mod on the weapon', async () => {
      const weapon = new WeaponDto();
      weapon.name = 'espada';
      weapon.mod = null;
      weapon.attr = AttributeKey.STRENGTH;
      weapon.equipped = true;

      const dto = new CreateKnightDto();
      dto.name = 'Sir Lancelot';
      dto.nickname = 'The Brave';
      dto.birthday = new Date('1990-01-01');
      dto.weapons = [weapon];
      dto.attributes = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      };
      dto.keyAttribute = AttributeKey.STRENGTH;

      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("weapons.0.o mod da arma é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if there is no attribute on the weapon', async () => {
      const weapon = new WeaponDto();
      weapon.name = 'espada';
      weapon.mod = 1;
      weapon.attr = null;
      weapon.equipped = true;

      const dto = new CreateKnightDto();
      dto.name = 'Sir Lancelot';
      dto.nickname = 'The Brave';
      dto.birthday = new Date('1990-01-01');
      dto.weapons = [weapon];
      dto.attributes = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      };
      dto.keyAttribute = AttributeKey.STRENGTH;

      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("weapons.0.o attr da arma é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    });

    it('should return an error message if the weapon is not equipped', async () => {
      const weapon = new WeaponDto();
      weapon.name = 'espada';
      weapon.mod = 1;
      weapon.attr = AttributeKey.STRENGTH;
      weapon.equipped = null;

      const dto = new CreateKnightDto();
      dto.name = 'Sir Lancelot';
      dto.nickname = 'The Brave';
      dto.birthday = new Date('1990-01-01');
      dto.weapons = [weapon];
      dto.attributes = {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      };
      dto.keyAttribute = AttributeKey.STRENGTH;

      try {
        await validationPipe.transform(dto, {
          type: 'body',
          metatype: CreateKnightDto,
        });
      } catch (error) {
        expect(error.getResponse().message).toContain("weapons.0.o equipped da arma é obrigatório");
        expect(error.getStatus()).toBe(422);
      }
    })
  });

  describe('findAll', () => {
    it('should return all knights', async () => {
      jest.spyOn(knightModel, 'find').mockResolvedValue([knightListMock[0]]);
      const result = await knightService.findAll();
      expect(knightModel.find).toHaveBeenCalledWith({ deletedAt: null });
      expect(result).toEqual([knightListMock[0]]);
    });

    it('should return all heroes', async () => {
      jest.spyOn(knightModel, 'find').mockResolvedValue([knightListMock[1]]);
      const result = await knightService.hallOfHeroes();
      expect(knightModel.find).toHaveBeenCalledWith({ deletedAt: { $ne: null } });
      expect(knightModel.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual([knightListMock[1]]);
    });
  });

  describe('getById', () => {
    it('should return a knight by id', async () => {
      const id = KnightFindByIdMock._id;
      jest.spyOn(knightModel, 'findById').mockResolvedValue(KnightFindByIdMock);
      const result = await knightService.getById(id);
      expect(knightModel.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual(KnightFindByIdMock);
    });
  });


  describe('becomeAHero', () => {
    it('should update a knight to be a hero', async () => {
      const id = knightUpdateMock._id;
      jest.spyOn(knightModel, 'findByIdAndUpdate').mockResolvedValue(knightUpdateMock);
      const result = await knightService.becomeAHero(id);
      expect(knightModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id, {
        deletedAt: new Date(),
        updatedAt: new Date()
      },
        { new: true });
      expect(result).toEqual(knightUpdateMock);
    });
  });

  describe('updateNickName', () => {
    it('should update a knight nickname', async () => {
      const id = knightUpdateMock._id;
      const nickname = 'O Grandão';

      const knightUpdate: Knight = {
        ...knightUpdateMock,
        nickname,
        updatedAt: new Date(),
      }

      jest.spyOn(knightModel, 'findByIdAndUpdate').mockResolvedValue(knightUpdate);
      const result = await knightService.updateNickName(id, nickname);
      expect(knightModel.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: id },
        { nickname, updatedAt: new Date() },
        { new: true }
      );
      expect(result.nickname).toEqual(nickname);
    });
  });

});
