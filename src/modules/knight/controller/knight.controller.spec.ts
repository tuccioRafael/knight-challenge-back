import { Test, TestingModule } from '@nestjs/testing';
import { KnightController } from './knight.controller';
import { KnightService } from '../service/knight.service';
import { Knight } from 'src/schemas/knight.schema';
import { knightListMock, knightUpdateMock } from '../knightMock';

describe('KnightController', () => {
  let knightController: KnightController;
  let knightService: KnightService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnightController],
      providers: [{
        provide: KnightService,
        useValue: {
          create: jest.fn().mockResolvedValue(knightListMock[0]),
          findAll: jest.fn().mockResolvedValue(knightListMock),
          getById: jest.fn().mockResolvedValue(knightListMock),
          hallOfHeroes: jest.fn().mockResolvedValue([knightListMock]),
          becomeAHero: jest.fn().mockResolvedValue(knightListMock[0]),
          updateNickName: jest.fn(),
        }
      }],
    }).compile();

    knightController = module.get<KnightController>(KnightController);
    knightService = module.get<KnightService>(KnightService);
  });

  it('should be defined', () => {
    expect(knightController).toBeDefined();
    expect(knightService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all knights list successfully', async () => {
      const result = await knightController.getAllKnights();
      expect(knightService.findAll).toHaveBeenCalled();
      expect(knightService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(await knightService.findAll());
    });

    it('should return all knights become a Hero list successfully with filter', async () => {
      const result = await knightController.getAllKnights('heroes');
      expect(knightService.findAll).toHaveBeenCalled();
      expect(result).toEqual(await knightService.findAll('heroes'));
    })

    it('shold throw an exception', () => {
      jest.spyOn(knightService, 'findAll').mockRejectedValueOnce(new Error());

      expect(knightController.getAllKnights()).rejects.toThrow();
    })

    it('should throw an error when filter is invalid', async () => {
      try {
        await knightController.getAllKnights('invalid');
      } catch (error) {
        expect(error.message).toEqual('Invalid filter');
      }
    });
  });

  describe('getKnightById', () => {
    it('should return a knight by id successfully', async () => {
      const knightId = '1';
      const result = await knightController.getKnightById(knightId);
      expect(knightService.getById).toHaveBeenCalled();
      expect(result).toEqual(await knightService.getById(knightId));
    });
  });

  describe('createKnight', () => {
    it('should create a knight successfully', async () => {
      const result = await knightController.createKnight(knightListMock[0]);
      expect(knightService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(await knightService.create(knightListMock[0]));
    });
  });

  describe('becomeAHero', () => {
    it('should become a hero successfully', async () => {
      const knightId = knightUpdateMock._id;
      const result = await knightController.deleteKnight(knightId);
      expect(knightService.becomeAHero).toHaveBeenCalled();
      expect(result).toEqual(await knightService.becomeAHero(knightId));
    });

    
    it('should throw an error when knight not found', async () => {
      const knightId = '1';
      jest.spyOn(knightService, 'becomeAHero').mockRejectedValueOnce(new Error(`Cavaleiro com ID ${knightId} não encontrado`));
      const nickname = 'Lance alterado';
      try {
        await knightController.deleteKnight(knightId);
      } catch (error) {
        expect(error.message).toEqual(`Cavaleiro com ID ${knightId} não encontrado`);
      }
    });
  
  });

  describe('updateNickName', () => {
    it('should update a knight nickname successfully', async () => {
      const knightId = '1';
      const nickname = 'Lancinha';
      const knightUpdate: Knight = {
        ...knightUpdateMock,
        nickname,
        updatedAt: new Date(),
      }

      jest.spyOn(knightService, 'updateNickName').mockResolvedValue(knightUpdate);

      const result = await knightController.updateKnight(knightId, nickname);
      expect(knightService.updateNickName).toHaveBeenCalled();
      expect(result).toEqual(knightUpdate); 
    });
  
    // it('should throw an error when knight not found', async () => {
    //   const knightId = '1';
    //   jest.spyOn(knightService, 'updateNickName').mockRejectedValueOnce(new Error(`Cavaleiro com ID ${knightId} não encontrado`));
    //   const nickname = 'Lance alterado';
    //   try {
    //     await knightController.updateKnight(knightId, nickname);
    //   } catch (error) {
    //     expect(error.message).toEqual(`Cavaleiro com ID ${knightId} não encontrado`);
    //   }
    // });
  });

});

/*

1. Create (Criação)
Sucesso na Criação
Descrição: Verifique se o recurso é criado corretamente quando todos os dados são válidos.
Teste:
Envie uma solicitação de criação com dados válidos.
Verifique se a resposta contém o recurso criado e se os dados estão corretos.
Verifique se o recurso foi realmente criado no banco de dados.
Falha na Criação
Descrição: Teste a resposta do sistema ao tentar criar um recurso com dados inválidos.
Teste:
Envie uma solicitação com dados incompletos ou inválidos (por exemplo, campos obrigatórios ausentes, dados em formato incorreto).
Verifique se o sistema retorna erros apropriados (código de status HTTP 400, mensagens de erro).
Duplicação
Descrição: Teste a resposta do sistema ao tentar criar um recurso que já existe (se aplicável).
Teste:
Tente criar um recurso com dados que causariam uma duplicação (por exemplo, ID já existente).
Verifique se o sistema retorna um erro de duplicação (código de status HTTP 409, mensagem de erro).
Validação de Dados
Descrição: Verifique se o sistema valida os dados corretamente antes de criar um recurso.
Teste:
Envie solicitações com dados que não atendem aos requisitos (por exemplo, dados fora do intervalo permitido).
Verifique se o sistema retorna mensagens de erro apropriadas.


2. Read (Leitura)
Busca de Todos os Recursos
Descrição: Verifique se todos os recursos são retornados corretamente.
Teste:
Envie uma solicitação para obter todos os recursos.
Verifique se todos os recursos esperados estão presentes na resposta.
Busca de Recurso por ID
Descrição: Teste a recuperação de um recurso específico usando um ID válido.
Teste:
Envie uma solicitação para obter um recurso com um ID específico.
Verifique se a resposta contém o recurso correto.
Busca com Filtros
Descrição: Verifique se a busca com parâmetros de filtro (se aplicável) retorna os recursos corretos.
Teste:
Envie uma solicitação com parâmetros de filtro (por exemplo, buscar por um atributo específico).
Verifique se os recursos retornados correspondem aos critérios de filtro.
Busca de Recursos Não Existentes
Descrição: Teste o comportamento do sistema ao tentar buscar um recurso que não existe.
Teste:
Envie uma solicitação com um ID ou parâmetro de filtro inválido.
Verifique se o sistema retorna um erro apropriado (código de status HTTP 404, mensagem de erro).
Paginação e Ordenação
Descrição: Se aplicável, verifique a funcionalidade de paginação e ordenação.
Teste:
Envie uma solicitação com parâmetros de paginação e ordenação.
Verifique se os dados são retornados corretamente conforme os parâmetros.

3. Update (Atualização)
Sucesso na Atualização
Descrição: Verifique se um recurso é atualizado corretamente quando os dados fornecidos são válidos.
Teste:
Envie uma solicitação de atualização com dados válidos.
Verifique se a resposta contém o recurso atualizado e se os dados são corretos.
Verifique se o recurso foi atualizado corretamente no banco de dados.
Falha na Atualização
Descrição: Teste a resposta do sistema ao tentar atualizar um recurso com dados inválidos.
Teste:
Envie uma solicitação de atualização com dados incompletos ou inválidos.
Verifique se o sistema retorna erros apropriados (código de status HTTP 400, mensagens de erro).
Recurso Não Encontrado
Descrição: Verifique o comportamento do sistema ao tentar atualizar um recurso que não existe.
Teste:
Tente atualizar um recurso com um ID que não existe.
Verifique se o sistema retorna um erro apropriado (código de status HTTP 404, mensagem de erro).
Validação de Dados
Descrição: Assegure-se de que a validação de dados é aplicada durante a atualização e que erros são retornados para dados inválidos.
Teste:
Envie uma solicitação de atualização com dados que não atendem aos requisitos.
Verifique se o sistema retorna mensagens de erro apropriadas.


4. Delete (Remoção)
Sucesso na Remoção
Descrição: Verifique se um recurso é removido corretamente quando o ID é válido.
Teste:
Envie uma solicitação para remover um recurso com um ID válido.
Verifique se a resposta confirma a remoção.
Verifique se o recurso foi realmente removido do banco de dados.
Recurso Não Encontrado
Descrição: Teste o comportamento do sistema ao tentar remover um recurso que não existe.
Teste:
Envie uma solicitação para remover um recurso com um ID que não existe.
Verifique se o sistema retorna um erro apropriado (código de status HTTP 404, mensagem de erro).
Falha na Remoção
Descrição: Verifique como o sistema lida com falhas durante o processo de remoção.
Teste:
Simule uma falha na remoção (por exemplo, problemas de banco de dados).
Verifique se o sistema lida com a falha de forma adequada e retorna um erro apropriado.

 */