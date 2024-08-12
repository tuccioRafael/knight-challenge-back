import { Injectable } from '@nestjs/common';

@Injectable()
export class KnightService {

  create(): string {
    return 'cria um cavaleiro';
  }

 findAll(filter?: string): string {
    if (filter === 'heroes') {
      return this.hallOfHeroes();
    }
    return 'retorna todos os cavaleiros';
  }

  hallOfHeroes(): string {
    return 'retorna os cavaleiros com o filtro'
  }

  getById(id: string): string {
    
    return `retorna cavaleiro do ${id}`;
  }

  becomeAHero(id: string): string {
    return `torna o cavaleiro do ${id} um herói`;
  }

  updateNickName(id: string): string {
    return `edita o cavaleido de id ${id}`;
  }
}
