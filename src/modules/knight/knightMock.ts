import { AttributeKey } from "../../enums/attributs.enum";
import { Knight } from "../../schemas/knight.schema";
import { CreateKnightDto } from "./dto/knight.dto";

export const knightListMock: CreateKnightDto[] = [
  {
    name: 'Sir Lancelot',
    birthday: new Date('1990-01-01'),
    nickname: 'Lance',
    weapons: [],
    keyAttribute: AttributeKey.STRENGTH,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  },
  {
    name: 'Sir Galahad',
    birthday: new Date('1992-03-15'),
    nickname: 'Gally',
    weapons: [],
    keyAttribute: AttributeKey.DEXTERITY,
    attributes: {
      strength: 8,
      dexterity: 12,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    }
  },
]

export const knightUpdateMock = {
  _id: '123',
  name: 'Sir Lancelot',
  birthday: new Date('1990-01-01'),
  nickname: 'Lance',
  weapons: [],
  keyAttribute: AttributeKey.STRENGTH,
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
}

export const KnightFindByIdMock = {
  _id: '123',
  name: 'Sir Lancelot',
  birthday: new Date('1990-01-01'),
  nickname: 'Lance',
  weapons: [],
  keyAttribute: AttributeKey.STRENGTH,
  attributes: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
}
